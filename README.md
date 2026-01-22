# StoreMind

小売店向けに、夜間に在庫計画を下書きするLLMエージェントのオーケストレーションシステム。
朝はマネージャーが確認・承認し、日中はスタッフが質問できます。

> **Note**: This is the Japanese version of the README. For English, please scroll down.
> **[English version below](#storemind-english)**

## 📉 課題

東京のあるコンビニでは、毎週 **30,000円** 分の弁当が廃棄されています。同じ店舗なのに、雨が降ると傘が品切れになります。マネージャーは毎朝2時間かけて在庫スプレッドシートを見直し、何を発注するべきかを推測しています。

こうした判断は繰り返しが多く、精神的にも消耗します。毎朝、同じ問いが浮かびます: *何が期限切れ間近か？何が少ないか？何を発注するべきか？いくつ？* 食料品の小売マージンは **2-5%** 程度のため、判断を誤るコストは積み重なります。

StoreMindは「考える」部分を自動化します。在庫DB・売上記録・天気API・サプライヤーカタログへ、ツール経由でアクセスできるエージェントが、夜間に推奨案を下書きします。マネージャーは確認して承認するだけです。

## 仕組み

### 🌑 夜間

店舗が閉まっている間に、AIエージェントが在庫スナップショットを取得し、賞味期限を確認し、天気予報を取得し、ツール呼び出し経由で直近の売上パターンを確認します。

具体的なアクションを含むドラフトプランを作成します:

> 🤖 **Agent:** "SKU #BNT-042 の弁当 30個に20%割引を提案。あと18時間で期限切れ、過去データではこの割引で販売速度が2倍" <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"サプライヤーAから傘を50本発注推奨（1本4.5$）。木曜〜土曜は降水確率89%の予報" <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...

### 🌅 朝

マネージャーはアプリを開き、プランを確認し、ワンタップで承認・調整・却下できます。

意思決定はエージェントの理由とともに記録されます:

> 🤖 **Agent:** "降水確率が85%で、店舗在庫は12本。仕入先が1本4$で提示しており、今週の価格帯より12.8%安いので、傘を40本発注すべき"

店舗オーナーは、リアルタイムデータに基づいてエージェントに問い合わせて、判断を見直させることもできます:

> 🗣️ **User:** "判断 #3 を再確認して: 340mlの牛乳24本入りを5箱発注ってあるけど、もっと必要だと思う。前回見たとき在庫がほぼ切れそうだった"
>
> 🤖 **Agent:**  再確認して、10箱に調整します。

### 🕒 日中

スタッフは作業中にシステムへ質問できます。

> 🗣️ **User:** "週末用の日本酒、足りる？"
>
> 🤖 **Agent:** \*現在庫（24本）を確認し、直近4週末の販売（平均18本）を参照して回答\* "はい。現在庫24本、週末の平均販売は18本です。イベントがなければ問題ないはずです。"

> 🗣️ **User:** "新しく入荷したせんべい、どこに置いた？"
>
> 🤖 **Agent:** \*入荷ログを確認して回答\* "3列目の奥の棚です。火曜 2:30 PM 受領、12箱。"

スタッフQ&Aモデルはローカルで動作し、ベクトルデータベースへの読み取り専用ツール呼び出しを行う小規模言語モデル（7B）で運用されるため、応答は3秒以内に収まる想定です。

## モデルルーティング

夜間のプランニングは、30日分の売上データ、複数のサプライヤーカタログ、天気予報を推論する必要があり、大きめのモデルが必要です。一方でスタッフの *"醤油はどこ？"* のような質問に10秒待たせるのは現実的ではありません。

| タスク (Task) | モデル (Model) | 選定理由 (Why) |
|---|---|---|
| **夜間プランニング** | Claude Opus 4.5 | 30日分のコンテキストを処理可能、構造化出力に強み |
| **マージン最適化** | GPT-5.2 | 利益と廃棄のトレードオフ計算に最適な数学的推論能力 |
| **マネージャーQ&A** | GPT-5.2 Fast | 3秒以内の応答 |
| **スタッフQ&A** | Phi-3-mini | ローカル動作、在庫DBへ接続 |

## 現在の進捗

### Done
- ドメイン契約（`Plan`, `Proposal`, `Evidence`, `Snapshot`, `Verdict`, `Log`）
- プランの検証ロジック（日時形式、エビデンス要件、業務ルール）
- モデルエイリアス付きの設定システム
- APIエンドポイント（Staff、Planning、Manager）
- Semantic Kernelプラグイン構造（Inventory、Supplier）
- 夜間プランニング（OvernightPlanner + PlanCritic）
- ローカルPhi-3推論（ONNX Runtime）
- ファイルベースのプラン永続化（JSON）
- バックグラウンドスケジュールジョブ（2 AM実行 + 手動トリガー）
- 在庫検索（インメモリ）

### Next
- マネージャー向けレビューUIの構築

## 技術スタック

| コンポーネント | バージョン |
|-----------|---------|
| **.NET** | `9.0.101` |
| **Microsoft.SemanticKernel** | `1.68.0` |
| **Microsoft.ML.OnnxRuntimeGenAI** | `0.7.0` |

## クイックスタート

```bash
dotnet build
dotnet test
dotnet run --project src/Kiyo9w.StoreMind.Service
```

Swagger UI は `http://localhost:5000/swagger` で確認できます。

## 📂 プロジェクト構成

```
src/
├── Kiyo9w.StoreMind.Core/
│   ├── Contracts/        # Plan, Proposal, Evidence, Snapshot, Verdict, Log, Api
│   ├── Configuration/    # StoreMindOptions, ModelOptions, PersistenceOptions
│   └── Interfaces/       # IInventory, ISupplier
└── Kiyo9w.StoreMind.Service/
    ├── Endpoints/        # Staff, Planning, Manager APIs
    ├── Plugins/          # Semantic Kernel functions (Inventory, Supplier)
    └── Services/         # OvernightPlanner, Phi3Chat, PlanCritic, PlanStore, PlanningJob

tests/
└── Kiyo9w.StoreMind.Tests/
    └── PlanTests.cs      # Validation and serialization tests
```

## 設定

```json
{
  "StoreMind": {
    "StoreId": "store-001",
    "VectorStore": {
      "Provider": "InMemory",
      "CollectionName": "inventory"
    },
    "Persistence": {
      "BasePath": "./data",
      "PlansPath": "./data/plans",
      "LogsPath": "./logs"
    },
    "Models": {
      "EdgeModelPath": "./models/phi3-mini-onnx",
      "OpenAiKey": "",
      "AnthropicKey": "",
      "PlannerModel": "claude-opus-4.5",
      "CriticModel": "gpt-5.2"
    },
    "Orchestration": {
      "MaxIterations": 3,
      "MaxToolCalls": 10,
      "TimeoutSeconds": 60
    }
  }
}
```

## プランニングループ

実装が完了すると、夜間ジョブは次の段階で実行されます:

| ステージ | 処理内容 |
|---|---|
| **Sense (認識)** | 現在の在庫スナップショットを取得し、賞味期限ごとにグループ化、今後7日間の天気を取得 |
| **Propose (提案)** | プランナーエージェント (Claude Opus) が、エビデンスへのポインタを含む具体的なマークダウンと発注アクションを持つ `Plan` オブジェクトを作成 |
| **Critique (批評)** | 批評エージェント (GPT-5.2) が店舗ポリシーに照らしてプランをレビュー。「割引率が50%上限を超過」「安全在庫が10個を下回る」などの違反をフラグ付け |
| **Validate (検証)** | C# バリデータがスキーマ準拠とビジネスルールを最終チェック |
| **Persist (保存)** | 承認されたプランがレビューキューに入り、翌朝マネージャーが確認（人間参加型プロセス） |

## ドキュメント

*準備中*

## 著者

Ngo Thanh Trung (kiyo9w)

メール: [ngokapikapi@gmail.com](mailto:ngokapikapi@gmail.com)

---

# StoreMind (English)

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
- Domain contracts (`Plan`, `Proposal`, `Evidence`, `Snapshot`, `Verdict`, `Log`)
- Validation logic for plans (date formats, evidence requirements, business rules)
- Configuration system with model aliases
- API endpoints (Staff, Planning, Manager)
- Semantic Kernel plugin structure for inventory and supplier operations
- Overnight planning (OvernightPlanner + PlanCritic)
- Local Phi-3 inference (ONNX Runtime)
- File-based plan persistence (JSON)
- Background scheduled job (runs at 2 AM + manual trigger)
- In-memory inventory search

### Next
- Build the manager review interface

## Tech Stack

| Component | Version |
|-----------|---------|
| **.NET** | `9.0.101` |
| **Microsoft.SemanticKernel** | `1.68.0` |
| **Microsoft.ML.OnnxRuntimeGenAI** | `0.7.0` |

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
│   ├── Contracts/        # Plan, Proposal, Evidence, Snapshot, Verdict, Log, Api
│   ├── Configuration/    # StoreMindOptions, ModelOptions, PersistenceOptions
│   └── Interfaces/       # IInventory, ISupplier
└── Kiyo9w.StoreMind.Service/
    ├── Endpoints/        # Staff, Planning, Manager APIs
    ├── Plugins/          # Semantic Kernel functions (Inventory, Supplier)
    └── Services/         # OvernightPlanner, Phi3Chat, PlanCritic, PlanStore, PlanningJob

tests/
└── Kiyo9w.StoreMind.Tests/
    └── PlanTests.cs      # Validation and serialization tests
```

## Configuration

```json
{
  "StoreMind": {
    "StoreId": "store-001",
    "VectorStore": {
      "Provider": "InMemory",
      "CollectionName": "inventory"
    },
    "Persistence": {
      "BasePath": "./data",
      "PlansPath": "./data/plans",
      "LogsPath": "./logs"
    },
    "Models": {
      "EdgeModelPath": "./models/phi3-mini-onnx",
      "OpenAiKey": "",
      "AnthropicKey": "",
      "PlannerModel": "claude-opus-4.5",
      "CriticModel": "gpt-5.2"
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