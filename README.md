# StoreMind

StoreMind is a deterministic retail exception control desk. It turns source signals into a role-scoped, ranked work queue; lets authorized operators record bounded actions; requires typed proof before verification; then rechecks the originating source before resolving an exception.

The current executable does not depend on an LLM or assistant. All demo stores, signals, proof artifacts, follow-up observations, and outcomes are fictional fixtures.

> **Presentation demo:** [`showcase/`](showcase/README.md) is a separate, fully offline concept demo of the deck's story (night run → morning approval → daytime assistant, with a 3D store and a scripted mock LLM). It does not depend on, and does not change, the service below.

## Operator contract

- Store, department, district, and headquarters visibility is enforced by server policy.
- Every exception exposes its owner, deadline, item location, source reference, current metric, resolve target, and consequence of inaction.
- Global rank is server-authored from explicit urgency, impact, confidence, and age terms. Filtered queue position is labeled separately.
- Commands are state-bound and role-bound. Action codes, suppression reasons, and snooze windows come from bounded server taxonomies; snoozed work wakes through a durable policy event.
- Verification accepts only the policy-required artifact references issued in that exception's server-authored proof registry. The server generates deterministic proof IDs, persists provenance, and rejects forged references and proof reuse.
- Proof does not resolve an exception by itself. StoreMind reads the next originating-source observation; a failed target reopens the exception and a successful target resolves it.
- Accepted commands and failed verification attempts record actor, role, reason, outcome, resulting state, source metric, proof provenance, command ID, and digest in both the item timeline and cross-store audit.
- Store oversight summarizes open, overdue, blocked or escalated, suppressed, high-severity, and oldest-open work.
- During a temporary outage, the browser admits commands into an actor-scoped persistent outbox with the original `Idempotency-Key` and exception version. Reload, reauthentication, and reconnect replay the same command; permanent or stale failures remain visible with review, resubmit, and discard controls.


### Stage A ownership, shifts, policy, and admissions

- Seeded exceptions start on a role queue. `Claim` binds named ownership; owner-only `handoff` targets another visible on-shift actor in the same store.
- Clock-out returns all of that actor's named work to its role queue, records durable `return_to_role` events, and removes store commands until clock-in. District and headquarters roles do not clock.
- Named ownership, shift presence, admissions, proofs, and audit state survive service restart.
- Headquarters alone can preview, publish, or unpublish class policy and inspect the proof ledger and completion metrics. Policy changes affect future reset generation without erasing live work.
- Every admitted command records accepted, running, completed, or failed server state. Idempotent replay returns the original result; ordinary admission visibility remains actor-scoped.

### Stage B structured escalation response

- Department owners and wider authorized roles can escalate eligible work with one bounded reason (`inactivity`, `lack_of_progress`, or `customer_deadline`), severity (`high` or `medium`), and trend (`improving`, `same`, or `declining`). Clerks cannot escalate or de-escalate.
- High-severity escalations receive a four-hour response deadline; medium-severity escalations receive eight hours. An exception can have only one active escalation.
- De-escalation requires a written justification. The work sheet retains closed escalation context and the durable timeline retains the original escalation fields.
- Successful source-backed verification clears active escalation state while preserving escalation history in the timeline.
- Store oversight separates escalated and response-overdue counts. Authorized district and headquarters users also receive district rollups with store count, active count, escalated count, response-overdue count, and oldest response deadline.
- Stage B preserves Stage A ownership, command admission, proof, source-recheck, policy, and shift contracts; it does not import ServiceNow enterprise assignment or plan machinery.

Live comparison evidence is stored in `docs/evidence/`. Each shipping PNG carries embedded provenance; the external workflow reference is retained under `docs/reference-materials/servicenow/2026-09-02/`.
## Run locally

The repository pins .NET SDK `9.0.101` in `global.json`.

```bash
export ASPNETCORE_URLS=http://127.0.0.1:5127
export StoreMind__Accounts__hq=hq-secret
export StoreMind__Accounts__district=district-secret
export StoreMind__Accounts__lead=lead-secret
export StoreMind__Accounts__lead-west=lead-west-secret
export StoreMind__Accounts__clerk=clerk-secret
dotnet run --project src/Kiyo9w.StoreMind.Service/Kiyo9w.StoreMind.Service.csproj
```

Open <http://127.0.0.1:5127>. If an account password is not configured, the service generates a one-time local password and writes it only to the startup log. Headquarters users can restore the deterministic fixture through **Reset demo**.

## Verify

```bash
dotnet test tests/Kiyo9w.StoreMind.Tests/Kiyo9w.StoreMind.Tests.csproj
```

`ExceptionServiceContractTests.cs` and `ExceptionApiContractTests.cs` cover authorization scope, lifecycle transitions, source-backed verification, proof identity, idempotency, persistence, replay, reset authority, and HTTP boundaries. `StageAContractTests.cs` covers shifts, claim/handoff, clock-out ownership release, headquarters policy/proof reporting, and command admissions. `StageBContractTests.cs` covers bounded escalation fields, four/eight-hour response deadlines, single-active escalation, justified durable de-escalation, resolution clearing active escalation state, scoped store/district summaries, and snake-case HTTP contracts.

### Stage B browser smoke

1. Reset as `hq`, then sign in as `lead`. Open **Cold brew shelf empty**, choose **Escalate**, select **Lack of progress**, **High**, and **Declining**, then submit. Confirm state **Escalated**, status **ACTIVE**, a response deadline four hours ahead, and a durable timeline entry carrying all three escalation fields.
2. Choose **De-escalate**, enter a non-blank justification, and submit. Confirm state returns to **Active**, the escalation response reads **CLOSED** with its timestamp, and both actions remain in the timeline.
3. Escalate again, sign in as `district`, and open **Store oversight**. Confirm the district rollup reports two visible stores, one escalated item, response-overdue count, and oldest response deadline. Confirm the matching store row reports one escalated item.
4. District/headquarters users must have no clock control. Store roles remain subject to Stage A clock, ownership, and command admission rules.

## Project layout

```text
src/Kiyo9w.StoreMind.Service/
├── AccessPolicy.cs       # role, scope, and command authorization
├── Domain.cs             # exception, proof, command, and audit contracts
├── FixtureSource.cs      # deterministic retail signals and rechecks
├── Program.cs            # authenticated HTTP and event-stream endpoints
├── StateStore.cs         # lifecycle, concurrency, persistence, and replay
└── wwwroot/              # responsive operator control desk

tests/Kiyo9w.StoreMind.Tests/
├── ExceptionServiceContractTests.cs
├── ExceptionApiContractTests.cs
├── StageAContractTests.cs
└── StageBContractTests.cs
```
