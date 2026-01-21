# StoreMind

LLM agents orchestration system that draft overnight inventory plans for retail stores.
Managers review and approve in the morning, staff ask questions during the day.

## 📉 The Problem

A convenience store in Tokyo throws away **30,000 yen** worth of bento boxes every week. The same store runs out of umbrellas when it rains. The manager spends two hours each morning reviewing inventory spreadsheets, guessing what to order.

These decisions are repetitive and mentally draining. Every morning, the same questions: *what's expiring? what's running low? what should we order? how much?* Retail margins sit around **2-5%** for groceries, so getting these calls wrong adds up.

StoreMind automates the thinking part, agents with tool access to inventory databases, sales records, weather APIs, and supplier catalogs draft recommendations overnight. The manager just reviews and approves.

## How It Works

### 🌑 Overnight

While the store is closed, AI agents pull inventory snapshots, check expiry dates, fetch weather forecasts, and look at recent sales patterns through tool calls.

They put together a draft plan with specific actions:

> 🤖 **Agent:** "Suggest 20% markdown on 30x bento boxes, SKU #BNT-042, expires in 18 hours, historically sells 2x faster at this discount"<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Recommend ordering 50x umbrellas from Supplier A at 4.5$ each, rain forecast shows 89% chance Thursday through Saturday"<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...

### 🌅 Morning

The manager opens the app, reviews the plan, approves, adjusts or reject agents store decisions suggest with one tap.

Decisions are logged with agents reasoning:

> 🤖 **Agent:** "should order 40x umbrellas because rain probability is 85% and current stock in store is 12 units and provider are offering at 4$, 12.8% cheaper than this week's price range"

Store owners can also querry the agents to revise the decision on real time data:

> 🗣️ **User:** "Can you recheck decision #3: ordering 5x box of 24 packs of milk 340 ml. I think we need more than that, last time I check we almost ran out in stock"
>
> 🤖 **Agent:** recheck and adjust the number to 10x instead.

### 🕒 Daytime

Staff can ask the system questions while working.

> 🗣️ **User:** "Do we have enough sake for the weekend?"
>
> 🤖 **Agent:** \*checks current stock (24 bottles), looks at last 4 weekend sales (avg 18 bottles sold), and responds\* "Yes, 24 in stock, average weekend sales is 18. Should be fine unless there's an event."

> 🗣️ **User:** "Where did we put the new shipment of rice crackers?"
>
> 🤖 **Agent:** \*checks receiving logs and answers\* "Row 3, back shelf, received Tuesday 2:30 PM, 12 boxes."

Response time \*expected to\* stays under 3 seconds because the staff Q&A model runs locally and is operate on a small language model (7B) with reliable tool calls (read-only) to the vector database.

## Model Routing

The overnight planning task needs to reason over 30 days of sales data, multiple supplier catalogs, and weather forecasts. That takes a bigger model. But when a staff member asks *"where's the soy sauce?"*, waiting 10 seconds for a response is not acceptable.

| Task | Model | Why |
|------|-------|-----|
| **Overnight Planning** | Claude Opus 4.5 | Handles 30-day context, strong at structured output |
| **Margin Optimization** | GPT-5.2 | Best math reasoning for profit vs waste tradeoffs |
| **Manager Q&A** | GPT-5.2 Fast | Under 3 second responses |
| **Staff Q&A** | Phi-3-mini | Runs locally, connects to inventory database |

## Current Progress

### Done
- Domain contracts (`Plan`, `Proposal`, `Evidence`, `Snapshot`, `Verdict`)
- Validation logic for plans (date formats, evidence requirements, business rules)
- Configuration system with model aliases
- API endpoints (returning demo data for now)
- Semantic Kernel plugin structure for inventory operations
- Unit tests for plan validation and serialization

### Next
- Connect to OpenAI, Anthropic, and local Phi-3
- Implement the planning loop (sense → propose → critique → persist)
- Wire up Qdrant for inventory search
- Build the manager review interface

## Tech Stack

| Component | Version |
|-----------|---------|
| **.NET** | `9.0.101` |
| **Microsoft.SemanticKernel** | `1.68.0` |
| **Microsoft.ML.OnnxRuntimeGenAI** | `0.7.0` |
| **Qdrant.Client** | `1.12.0` |

## Quick Start

```bash
dotnet build
dotnet test
dotnet run --project src/Kiyo9w.StoreMind.Service
```

Swagger UI opens at `http://localhost:5000/swagger`.

## 📂 Project Layout

```
src/
├── Kiyo9w.StoreMind.Core/
│   ├── Contracts/        # Plan, Proposal, Evidence, Snapshot, Verdict, Log
│   ├── Configuration/    # StoreMindOptions, model aliases
│   └── Interfaces/       # IInventory, ISupplier
└── Kiyo9w.StoreMind.Service/
    ├── Endpoints/        # Staff, Planning, Manager APIs
    └── Plugins/          # Semantic Kernel functions

tests/
└── Kiyo9w.StoreMind.Tests/
    └── PlanTests.cs      # Validation and serialization tests
```

## Configuration

```json
{
  "StoreMind": {
    "StoreId": "store-001",
    "Models": {
      "PlannerModel": "claude-opus-4.5",
      "CriticModel": "gpt-5.2",
      "QuerryModel": "phi-3-mini"
    },
    "Orchestration": {
      "MaxIterations": 3,
      "MaxToolCalls": 10,
      "TimeoutSeconds": 60
    }
  }
}
```

## The Planning Loop

When fully implemented, the overnight job runs through these stages:

| Stage | What Happens |
|-------|--------------|
| **Sense** | Pull current inventory snapshot, group items by expiry buckets, fetch weather for the next 7 days |
| **Propose** | Planner agent (Claude Opus) drafts a `Plan` object with specific markdown and order actions, each with evidence pointers |
| **Critique** | Critic agent (GPT-5.2) reviews the plan against store policies, flags violations like "discount exceeds 50% cap" or "order drops safety stock below 10 units" |
| **Validate** | C# validators do the final check on schema compliance and business rules |
| **Persist** | Approved plan goes into the review queue, manager sees it in the morning, human in the loop process |

## Documentation

*In progress*

## Author

Ngo Thanh Trung (kiyo9w)

contact via email: [ngokapikapi@gmail.com](mailto:ngokapikapi@gmail.com)
