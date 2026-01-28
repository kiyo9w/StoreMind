# StoreMind

小売店向けの在庫管理AI。夜のうちに発注リストを下書きして、朝はマネージャーが確認・承認するだけ。
日中はスタッフが在庫について質問できます。

> **Note**: This is the Japanese version of the README. For English, please scroll down.
> **[English version below](#storemind-english)**

## 📉 課題

東京のあるコンビニでは、毎週 **30,000円** 分の弁当が廃棄されています。同じ店舗なのに、雨が降ると傘が品切れになります。マネージャーは毎朝2時間かけて在庫スプレッドシートを見直し、何を発注するべきかを推測しています。

こうした判断は繰り返しが多く、精神的にも消耗します。毎朝、同じ問いが浮かびます: *何が期限切れ間近か？何が少ないか？何を発注するべきか？いくつ？* 食料品の小売マージンは **2-5%** 程度のため、判断を誤るコストは積み重なります。

StoreMindは「考える」部分を自動化します。在庫DB・売上記録・天気API・サプライヤーカタログへ、ツール経由でアクセスできるエージェントが、夜間に推奨案を下書きします。マネージャーは確認して承認するだけです。

## 仕組み

### 🌑 夜間

店舗が閉まっている間に、**OvernightPlanner** が `Code → LLM → Code` のパイプラインで動作します:

まず、プログラムが在庫切れになりそうな商品を探して、基本的な発注リストを自動で作ります。
次に、AIがそのリストを調整します。「週末は雨だから傘を増やそう」とか「こっちの業者のほうが安いから切り替えよう」といった、状況に合わせた提案をしてくれます。
最後に、システムがその提案にミスがないか自動でチェックします。あまりに多すぎる発注など、おかしな提案はここで却下されます。

> 🤖 **Agent:** "SKU #BNT-042 の弁当 30個に20%割引を提案。あと18時間で期限切れ、過去データではこの割引で販売速度が2倍" <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"サプライヤーAから傘を50本発注推奨（1本4.5$）。木曜〜土曜は降水確率89%の予報" <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...

### 🌅 朝

マネージャーはアプリを開き、昨夜のプラン案を確認します。チャットで質問したり、変更を依頼したり、項目を承認できます。

裏側では4つのエージェントが連携しています:

1. **Orchestrator**（GPT-5.2）はマネージャーのメッセージを読み、どのエージェントが対応すべきか判断します。会話を管理し、最終回答を出力します。

2. **Stocker**（Llama 3.3 70B via Groq）は在庫データを取得します。「牛乳はどれだけある？」と聞かれると、在庫数・販売速度・期限切れ日を返します。

3. **Planner**（Llama 3.3 70B via Groq）は夜間プランを修正します。発注数の調整、サプライヤー価格の確認、新規アイテムの追加が可能です。マネージャーのみ利用可。

4. **Reviser**（GPT-5.2）は、変な注文が入らないか最後にチェックします。例えば、すぐに腐るものを大量に頼もうとしたり、業者の締め切りを忘れていたりすると、ストップをかけます。

Orchestratorがリクエストを振り分け、担当エージェントの回答を待ち、Reviserに確認を依頼し、最終回答を返します。

> 🗣️ **Manager:** "判断 #3 を再確認して: 340mlの牛乳24本入りを5箱発注ってあるけど、もっと必要だと思う"
>
> 🤖 **Agent:**  確認しました。そうですね、足りないので、5箱から10箱に増やしました。

### 🕒 日中

スタッフは作業中にシステムへ質問できます。ただし、プランの変更はできません。

スタッフは在庫のことしか聞けないので、**Stocker** だけが対応します。プランをいじる Planner にはアクセスできません。

> 🗣️ **Staff:** "週末用の日本酒、足りる？"
>
> 🤖 **Agent:** \*現在庫（24本）を確認し、直近4週末の販売（平均18本）を参照して回答\* "はい。現在庫24本、週末の平均販売は18本です。イベントがなければ問題ないはずです。"

> 🗣️ **Staff:** "新しく入荷したせんべい、どこに置いた？"
>
> 🤖 **Agent:** \*入荷ログを確認して回答\* "3列目の奥の棚です。火曜 2:30 PM 受領、12箱。"

## エージェント構成

| エージェント | モデル | 何をするか |
|---|---|---|
| **Orchestrator** | GPT-5.2 | チャットの全体的な管理。どの担当者に頼むか決めて、最後に返事をまとめます。 |
| **Stocker** | Llama 3.3 70B (Groq) | 今の在庫がどれくらいあるか調べたり、最近の売れ行きを確認したりします。 |
| **Planner** | Llama 3.3 70B (Groq) | 発注する数を選び直したり、安い仕入れ先を探したりします。マネージャー専用。 |
| **Reviser** | GPT-5.2 | 変な注文や間違いがないか、最後にしっかりチェックします。 |

## 技術スタック

| コンポーネント | バージョン |
|-----------|---------|
| **.NET** | `9.0.101` |
| **Microsoft.SemanticKernel** | `1.70.0` |
| **Microsoft.SemanticKernel.Agents.Core** | `1.70.0` |

## クイックスタート

```bash
dotnet build
dotnet run --project src/Kiyo9w.StoreMind.Service
```

Swagger UI は `http://localhost:5000/swagger` で確認できます。

## 📂 プロジェクト構成

```
src/
├── Kiyo9w.StoreMind.Core/
│   ├── Contracts/        # Plan, Proposal, Evidence, Snapshot, SalesPerformance, Verdict, Api
│   ├── Configuration/    # StoreMindOptions
│   └── Interfaces/       # IInventory, ISupplier
└── Kiyo9w.StoreMind.Service/
    ├── Endpoints/        # Manager, Staff
    ├── Plugins/          # Inventory, Supplier, Weather, Planning
    └── Services/         # OvernightPlanner, AgentOrchestrator, PlanCritic, PlanStore
```

## 設定

```json
{
  "StoreMind": {
    "StoreId": "store-001",
    "Models": {
      "OpenAiKey": "",
      "GroqApiKey": "",
      "ManagerModelId": "gpt-5.2",
      "SpecialistModelId": "llama-3.3-70b-versatile"
    }
  }
}
```

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

StoreMind automates the thinking part. Agents with tool access to inventory databases, sales records, weather APIs, and supplier catalogs draft recommendations overnight. The manager just reviews and approves.

## How It Works

### 🌑 Overnight

While the store is closed, the **OvernightPlanner** runs a `Code → LLM → Code` pipeline:

First, a script scans the database for low items and builds a simple restock list.
Next, the AI looks at that list and tweaks it. It might notice a rain forecast and add more umbrellas, or spot a better price from a different supplier.
Finally, the code double-checks the LLM's suggestions. If the AI tries to order 1,000 boxes of milk for a small shelf, the system blocks the order automatically.

> 🤖 **Agent:** "Suggest 20% markdown on 30x bento boxes, SKU #BNT-042, expires in 18 hours, historically sells 2x faster at this discount"<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Recommend ordering 50x umbrellas from Supplier A at 4.5$ each, rain forecast shows 89% chance Thursday through Saturday"<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...

### 🌅 Morning

The manager opens the app and reviews last night's draft plan. They can ask questions, request changes, or approve items through chat.

Behind the scenes, four agents work together:

1. **Orchestrator** (GPT-5.2) reads the manager's message and decides which agent should handle it. It keeps track of the conversation and produces the final answer.

2. **Stocker** (Llama 3.3 70B via Groq) pulls live inventory data. When the manager asks "how much milk do we have?", Stocker runs the query and returns stock counts, sales velocity, and expiry dates.

3. **Planner** (Llama 3.3 70B via Groq) modifies the overnight plan. It can adjust order quantities, check supplier pricing, or add new items. Only managers can trigger this agent.

4. **Reviser** (GPT-5.2) acts as a final safety check. It looks for obvious mistakes, like ordering a mountain of fresh produce that will rot in two days, or ignoring a supplier's lead time.

The Orchestrator routes the request, waits for the specialist's response, asks the Reviser to check it, then returns the final answer.

> 🗣️ **Manager:** "Can you recheck decision #3: ordering 5x box of 24 packs of milk 340 ml. I think we need more than that, last time I check we almost ran out in stock"
>
> 🤖 **Agents:** \*recheck and adjust the number to 10x instead.\* You're right, let's order more milk, we only have 10 boxes left and they are expiring soon.

### 🕒 Daytime

Staff can ask the system questions while working. However, they cannot modify retail plans.

> 🗣️ **Staff:** "Do we have enough sake for the weekend?"
>
> 🤖 **Agent:** \*checks current stock (24 bottles), looks at last 4 weekend sales (avg 18 bottles sold)\* "Yes, 24 in stock, average weekend sales is 18. Should be fine unless there's an event."

> 🗣️ **Staff:** "Where did we put the new shipment of rice crackers?"
>
> 🤖 **Agent:** \*checks receiving logs\* "Row 3, back shelf, received Tuesday 2:30 PM, 12 boxes."

## Agent Configuration

| Agent | Model | What it does |
|-------|-------|------|
| **Orchestrator** | GPT-5.2 | Manages the conversation, picks which agent to call next, and gives the final answer. |
| **Stocker** | Llama 3.3 70B (Groq) | Checks current stock levels and looks at how fast items are selling. |
| **Planner** | Llama 3.3 70B (Groq) | Changes order amounts and looks for better prices. Only for managers. |
| **Reviser** | GPT-5.2 | Looks for mistakes or risky orders before anything is finalized. |

## Tech Stack

| Component | Version |
|-----------|---------|
| **.NET** | `9.0.101` |
| **Microsoft.SemanticKernel** | `1.70.0` |
| **Microsoft.SemanticKernel.Agents.Core** | `1.70.0` |

## Quick Start

```bash
dotnet build
dotnet run --project src/Kiyo9w.StoreMind.Service
```

Swagger UI opens at `http://localhost:5000/swagger`.

## 📂 Project Layout

```
src/
├── Kiyo9w.StoreMind.Core/
│   ├── Contracts/        # Plan, Proposal, Evidence, Snapshot, SalesPerformance, Verdict, Api
│   ├── Configuration/    # StoreMindOptions
│   └── Interfaces/       # IInventory, ISupplier
└── Kiyo9w.StoreMind.Service/
    ├── Endpoints/        # Manager, Staff
    ├── Plugins/          # Inventory, Supplier, Weather, Planning
    └── Services/         # OvernightPlanner, AgentOrchestrator, PlanCritic, PlanStore
```

## Configuration

```json
{
  "StoreMind": {
    "StoreId": "store-001",
    "Models": {
      "OpenAiKey": "",
      "GroqApiKey": "",
      "ManagerModelId": "gpt-5.2",
      "SpecialistModelId": "llama-3.3-70b-versatile"
    }
  }
}
```

## Author

Ngo Thanh Trung (kiyo9w)

Contact via email: [ngokapikapi@gmail.com](mailto:ngokapikapi@gmail.com)
