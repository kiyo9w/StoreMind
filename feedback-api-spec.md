# Feedback API — Backend Specification

**Endpoint:** `POST /api/v1/feedback`  
**Auth:** Required (Bearer token / session cookie via `require_login`)  
**Purpose:** Unified endpoint for likes, dislikes, and content reports from the mobile app.

---

## Request Body

```json
{
  "target_type": "message",
  "target_id": "msg_abc123",
  "action": "like",
  "reason": null,
  "metadata": {}
}
```

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `target_type` | `string` | ✅ | `"message"` \| `"article"` \| `"thread"` |
| `target_id` | `string` | ✅ | ID of the content being acted on |
| `action` | `string` | ✅ | `"like"` \| `"dislike"` \| `"report"` |
| `reason` | `string \| null` | Only when `action == "report"` | One of the predefined reasons below |
| `metadata` | `object \| null` | ❌ | Optional extra context (reserved for future use) |

### Report Reasons (mobile sends one of these strings)
- `"Inaccurate Information"`
- `"Offensive or Objectionable"`
- `"Spam or Harmful content"`
- `"Other"`

---

## Responses

| Status | Meaning |
|---|---|
| `200 OK` | Action recorded successfully |
| `400 Bad Request` | Invalid `action`, missing `reason` for report, or invalid `target_type` |
| `401 Unauthorized` | Missing or invalid auth token |
| `404 Not Found` | `target_id` does not exist (optional — can also silently 200) |
| `422 Unprocessable Entity` | Malformed JSON body |

Response body on success can be empty `{}` or a simple ack:
```json
{ "status": "ok" }
```

---

## Suggested Database Schema

```sql
CREATE TABLE feedback (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('message', 'article', 'thread')),
    target_id   TEXT NOT NULL,
    action      TEXT NOT NULL CHECK (action IN ('like', 'dislike', 'report')),
    reason      TEXT,                          -- only populated for reports
    metadata    JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Enforce one like/dislike per user per target (upsert pattern)
    UNIQUE (user_id, target_type, target_id, action)
);

CREATE INDEX idx_feedback_target ON feedback (target_type, target_id);
CREATE INDEX idx_feedback_user ON feedback (user_id);
```

> **Note:** The unique constraint allows upsert — if a user re-likes, it just updates `created_at`. For `report`, allow multiple rows (no unique conflict) since a user might report for different reasons.

---

## Suggested FastAPI Implementation

```python
# src/server/api/v1/feedback/__init__.py

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, field_validator
from sqlalchemy.orm import Session
from typing import Optional, Literal
from src.database.db import get_db
from src.server.core.dependencies import require_login

router = APIRouter()

VALID_TARGET_TYPES = {"message", "article", "thread"}
VALID_ACTIONS = {"like", "dislike", "report"}

class FeedbackRequest(BaseModel):
    target_type: Literal["message", "article", "thread"]
    target_id: str
    action: Literal["like", "dislike", "report"]
    reason: Optional[str] = None
    metadata: Optional[dict] = None

    @field_validator("reason")
    @classmethod
    def reason_required_for_report(cls, v, info):
        if info.data.get("action") == "report" and not v:
            raise ValueError("reason is required when action is 'report'")
        return v


@router.post("", status_code=200)
async def submit_feedback(
    request: FeedbackRequest,
    user=Depends(require_login),
    db: Session = Depends(get_db),
):
    """Submit a like, dislike, or report for a piece of content."""
    from src.database.models.feedback import Feedback  # create this model

    try:
        if request.action in ("like", "dislike"):
            # Upsert: one like/dislike per user per target
            existing = db.query(Feedback).filter_by(
                user_id=user.id,
                target_type=request.target_type,
                target_id=request.target_id,
            ).first()
            if existing:
                existing.action = request.action
            else:
                db.add(Feedback(
                    user_id=user.id,
                    target_type=request.target_type,
                    target_id=request.target_id,
                    action=request.action,
                    metadata=request.metadata,
                ))
        else:
            # Reports are always inserted (allow multiple)
            db.add(Feedback(
                user_id=user.id,
                target_type=request.target_type,
                target_id=request.target_id,
                action=request.action,
                reason=request.reason,
                metadata=request.metadata,
            ))
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to record feedback: {str(e)}",
        )

    return {"status": "ok"}
```

---

## Router Registration

In `src/server/api/v1/__init__.py`, add:

```python
from src.server.api.v1.feedback import router as feedback_router
api_router.include_router(feedback_router, prefix="/feedback", tags=["Feedback"])
```

---

## Mobile Integration (for reference)

The mobile app calls this endpoint via `WorkflowClient.sendFeedback(FeedbackRequest)`.

Example payloads sent by the app:

**Like:**
```json
{ "target_type": "message", "target_id": "<uuid>", "action": "like" }
```

**Dislike:**
```json
{ "target_type": "message", "target_id": "<uuid>", "action": "dislike" }
```

**Report:**
```json
{
  "target_type": "message",
  "target_id": "<uuid>",
  "action": "report",
  "reason": "Inaccurate Information"
}
```

---

## Admin Access

Consider exposing a read endpoint for the admin panel:

```
GET /api/v1/admin/feedback?target_type=message&action=report
```

This lets moderators review flagged AI responses — which is also good practice for Apple Guideline 1.1.6 (AI content moderation).
