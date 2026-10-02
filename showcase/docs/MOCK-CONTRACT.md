# Mock contract

Everything the showcase shows comes through two modules. Replacing them with real services is the whole job of wiring; the scenes and UI should not need to change.

```
js/mock/data.js   ← pure data + a small forecast model. No DOM, importable from Node.
js/mock/llm.js    ← intent parser + reply scripts. Yields events; the UI renders them.
```

## 1. Data shapes (`js/mock/data.js`)

```ts
store      { id, name, chain, format, area, orderCutoff, today:{m,d,w,iso,label}, tomorrow:{…} }
weather    { cond, pop, pop2, hi, lo, wind, note, hourly:[{h:'06', p:0..1}], source }
rainDays   number[14]            // 1 = rain, last 14 days
temps      number[14]
Product {
  id, no, name, short, en, cat, unit, pack, price,
  stock,                         // current on-hand at close (cases for milk)
  cap,                           // shelf/storage limit: stock + order ≤ cap
  usual,                         // the order the manager would normally place
  dry, rain, cold, safety,       // seed parameters of the history/forecast model
  sku, supplier, delivery,       // 'HH:MM' truck
  shelf:{code, zone, label},     // code = bay id in the 3D model (A-03, C-01 …)
  model,                         // product 3D model key (products3d.js)
  expiresTonight?, shelfLifeH?,
  // derived at load:
  history:number[14], rainAvg, dryAvg,
  order:{demand, need, raw, qty, capped, room},
  proposed, delta, dir:'up'|'down'|'hold',
  draft, fix:'cap'|'sku'|null, fixNote,     // what the "LLM" wrote first and why code changed it
  checks:[{id:'sku'|'unit'|'cap'|'life', label, detail, state:'ok'|'fixed'}],
}
nightRun   { startedAt, steps:[{t,id,label,detail}], sources:[{id,label,sub,stat}], retry:{wrong,right} }
deliveries [{time, name, items, status:'done'|'next'|'todo'}]
revision   { productId, from, to, question, answer }
```

### Forecast model (deterministic, runs in the browser)

```
coldF   = lo < 13 ? product.cold : 1
demand  = Σ over horizon days ( dryAvg·coldF·(1−pop_d) + rainAvg·pop_d )     // horizon = 2 days, 1 day if expiresTonight
sellable= expiresTonight ? 0 : stock
need    = demand + safety − sellable
order   = ceil(need / pack) · pack, capped at floor((cap − sellable)/pack)·pack
```

`orderForProduct(p, pop, lo, pop2)` implements it. The morning what-if slider calls it live with `pop2 = pop·0.75`.

## 2. Story invariants (do not break; asserted by `tools/smoke.mjs`)

| Fact | Where it is used |
|---|---|
| Umbrella proposes **24** (usual 6, stock 6, cap 30); the LLM draft is **36** and the code corrects it to 24 | night, morning, day |
| Bento proposes **24** (usual 30, 7 left over, expire tonight) | opening, night, morning |
| Milk proposes **5**; chat revises to **8**; the LLM's first SKU is wrong and is sent back | night retry arc, morning chat |
| Exactly **2** code corrections | night summary, ledger flags |
| Stock at 14:20: umbrella **19**, bento **10**, sandwich **7** | day chat cards, AR |
| Slider at 20% → umbrella **12** | morning what-if |
| 12 products; 5 suppliers | approval, purchase-order chips |
| The three headline KPIs are never given values | finale |

If you change a seed parameter, run `node tools/smoke.mjs` and re-tune until these hold.

## 3. Chat events (`js/mock/llm.js`)

Both chats consume an `AsyncGenerator<Event>`:

```ts
{type:'tool',   icon:'db'|'chart'|'rain'|'checks'|'truck'|'pin'|'clock'|'cube', label, arg, result, ms, ok?}
{type:'text',   text}                     // may contain \n → separate paragraphs, streamed
{type:'card',   kind:'revision'|'stock'|'locate'|'delivery'|'expiry'|'weather', data}
{type:'action', name:'setQty'|'select'|'sim'|'approve'|'locate'|'ar', payload}
```

- `parseManager(text, {selected})` → intent `revise | explain | whatif | approve | status | fallback`
- `parseStaff(text, {last})` → intent `stock | where | delivery | expiry | weather | ar | fallback`
- `managerReply(intent)` / `staffReply(intent)` → events

Cards are rendered in `ui/cards.js`; actions are applied by the scene (`morning.action`, `day.action`).

### To wire a real model

Replace the two `*Reply` generators with a client that streams the same events from a server (SSE or fetch-stream). A suggested server surface, mapped to what the deck describes:

| UI need | Endpoint (suggested) | Notes |
|---|---|---|
| Night run state | `GET /api/stores/{id}/night-run/latest` | steps, sources, per-product `draft` + `checks` + `fix` (the Code → LLM → Code trace) |
| Proposals | `GET /api/stores/{id}/proposals?date=` | product fields above |
| Manual edit | `PATCH /api/proposals/{pid}` `{qty}` | server re-runs the code checks and returns the proposal with `checks` |
| Approve | `POST /api/stores/{id}/proposals/approve` | returns supplier-grouped purchase orders |
| Chat (both roles) | `POST /api/chat` (stream) `{role, text, context}` | emits the events above; `action` events are *suggestions* the client applies |
| Stock / deliveries / bays | `GET /api/stores/{id}/stock`, `/deliveries`, `/bays` | `bays` = id, label, centre, size, product ids (for the 3D model) |

Keep two rules from the deck: the LLM drafts, **code verifies** (the server, not the browser, decides a draft is valid); and a person approves.

## 4. Where state lives

`js/state.js` holds the session: manager edits, reviewed set, what-if `sim`, approved flag and times. The finale reads it to show this session's `採用・修正`. `Director.reset()` clears it.
