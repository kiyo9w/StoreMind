# StoreMind Showcase — design vision

The showcase is a presentation-grade concept demo of the deck's story: **one store, from closing tonight to opening tomorrow.** It is a web page that runs offline on one laptop. It is not the product and does not pretend to be. Everything that looks intelligent is scripted playback of mock data (see `HANDOFF.md`).

## 1. Thesis

> A paper ledger that wakes up at night.

The deck already fixed the world: warm paper, black ink, navy, grey, Bodoni numerals, Mincho headlines, night-shop photography. The showcase keeps that world and adds one idea that the deck only hints at: **time of day is the interface.** The same store is shown at three moods, and each mood has a job.

| Mood | Surface | Who it belongs to | Scenes |
|---|---|---|---|
| Night (navy void, rain, lamp light) | The machine side. Backstage. | The system preparing work | 01 閉店後 · 02 夜に準備する · 05 次のステップ (dawn) |
| Paper | The human side. Decisions, evidence. | The manager and the staff | 03 朝に判断する · 04 日中に確認する |

This is the deck's own rule ("navy = prepared / backstage / machine, paper = the store, people, decisions") made into motion: the screen literally gets lighter when a person takes over. The night→morning change is a paper sheet rising over the navy while the clock runs 04:12 → 07:30.

Three persistent devices carry the story across scenes:

1. **The 3D store.** One clay-white architectural model (a cut-away convenience store) in a navy void. It never changes identity; only its light does (night → dawn → day) and where the camera looks. It is the continuity object.
2. **The day-arc.** A bottom rule with five stops (22:00 · 04:12 · 07:30 · 14:20 · 翌朝) and a big Bodoni clock. Solid disc = done, dashed ring = not yet (the deck's phase-disc motif). It is both progress and navigation.
3. **Solid vs dashed.** From the deck: *solid = running / confirmed, dashed = concept / hypothesis / unmeasured.* In the demo, the LLM's work is drawn dashed (a probabilistic draft) and the code's checks are drawn solid (deterministic). Concept features carry a dashed `コンセプト` tag. This is the honesty mechanism; do not remove it.

## 2. What the audience should feel, scene by scene

Total live time ≈ 3–5 minutes at presenter pace, ≈ 2 minutes on autoplay. Every scene has one claim.

| # | Scene | Claim (one sentence) | Deck slide it extends |
|---|---|---|---|
| 01 | 閉店後 | Tomorrow is rain, bento is left over, umbrellas are short. What do we order? | 2 |
| 02 | 夜に準備する | The data is gathered, the LLM drafts with reasons, **code checks the draft** before a person sees it. | 5–6 |
| 03 | 朝に判断する | The manager starts from a prepared sheet, talks to it, changes numbers, and decides. | 5 |
| 04 | 日中に確認する | Staff ask the same data: how many, where, when. The store answers on the model. | 3 |
| 05 | 次のステップ | One store, one category, side by side with today's ordering. These four numbers get measured. | 7–8 |

## 3. Design language

### Tokens (authority: `css/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFEF3` | Day ground, text on night |
| `--ink` | `#000000` | Text and rules on paper |
| `--navy` | `#0E1D40` | Night ground, headers, primary buttons, selected row |
| `--gray` | `#888888` | Decoration only |
| `--mute` / `--mute-d` | `#4F4E4A` / paper 74% | Secondary text on paper / on navy |
| `--lamp` | `#FFC46B` | **Night-only light**: window glow, active node, pins, caret. Never used on paper. |
| `--ok` `--warn` `--crit` | `#24704B` `#8F5200` `#A63235` (+ lighter `-d` variants on navy) | Functional signals; always paired with a word or shape |

Only the first four are brand colours. `--lamp` is the single addition, justified as the 3D store's light source.

### Type

- Display and numerals: `Bodoni 72` (macOS) → `Bodoni Moda` (vendored) → Didot. Lining, tabular figures. Every number that matters is Bodoni.
- Japanese headings: Hiragino Mincho ProN bold, `font-feature-settings:"palt"`.
- Text: Helvetica Neue / Hiragino Sans.
- Mono for LLM token counters and code-ish values.
- Sizes are on a rem scale where **1rem = 16 px at 1920×1080** and the root scales with the viewport (`min(.8333vw, 1.4815vh)`), so the layout is identical on any projector. Smallest meaningful label ≈ 0.78rem; body 1.0625–1.25rem; scene titles 2.3–6.2rem.

### Geometry and surfaces

- 2 px rules. Square corners (`.125rem`). No cards-in-cards, no drop shadows except a hard 6 px offset under the paper sheets.
- Night surfaces: navy at 78–90% with a 2 px paper border. Dashed border = LLM.
- Paper surfaces: paper + a fine multiply grain; headers are solid navy bars like the deck's 承認 sheet.
- A film-grain overlay (`#grain`) and a vignette (`#grade`) sit over the canvas.

### Components worth reusing

- **Pipeline node** (night): 5.2 rem icon box, Mincho label, Bodoni time. States: idle / active (lamp glow) / done (paper fill + green badge).
- **Ledger row** (morning): rank numeral, clay-toy portrait, Mincho name, reason clamp, stepper, signed delta. Selected row inverts to navy.
- **Tool-call chip** (chats): dashed → solid + ✓ when finished. It is the visible "agent trace".
- **Result card**: navy header strip + paper body (stock, revision, delivery, expiry, weather).
- **3D pin**: stem + dot + card projected from a bay. Night = paper card on lamp dot; day = navy dot, stock bar, level colour on the left edge.
- **Seal (承認)**: double ring + stacked 承認 with an SVG displacement filter so it prints like ink. It lands with an impact (see motion).

## 4. Motion language

Motion exists to show causality (data → draft → check → decision) and to give the 3D store weight. It is never decoration.

| Token | Value |
|---|---|
| Primary ease | `expo.out` / `cubic-bezier(.16,1,.3,1)` — fast start, long settle (UI) |
| Camera ease | `power3.inOut`, 1.8–4.6 s |
| Mood change | `power2.inOut`, 1.2–2.4 s |
| UI reveal | 0.7–1.2 s, stagger 0.05–0.2 s |
| Text | Mincho headlines rise from an `overflow:hidden` mask per character (0.07 s stagger); LLM text streams at 46–70 chars/s with punctuation pauses |
| Press | 1 px down, ≤ 0.18 s |
| Impact (seal) | scale 2.7 → 1 and rotate −20° → −9° in 0.36 s `power4.in`; then 5 px sheet jolt (2 × 0.07 s), ink ring 0.6 → 0 opacity over 0.8 s, elastic settle |

Choreography highlights (these are the "showreel" moments):

1. **Opening.** Camera dollies in from far and high over 4.6 s while the headline rises per character, three signal rows land, and three pins draw their stems onto the model.
2. **Night run.** The clock fast-forwards 22:00 → 04:12 in step with the pipeline: sources tick, a scan sheet sweeps the store, the LLM streams, drafted quantities appear as pins on the exact shelves, then the **retry arc** draws from "コードで確認" back to "LLMが下書き" when the code rejects a SKU.
3. **Dawn wipe.** Paper rises from the bottom (1.35 s) while the clock runs to 07:30; the sheet and ledger rows then stagger in.
4. **Revision.** A chat message produces tool traces → streamed answer → a 5 → 8 card → the ledger row flashes and its numeral bumps. The change is visible in the list, not only in the chat.
5. **Seal.** See impact above. After it lands, the footer converts to "発注書を送信 ✓" with one chip per supplier.
6. **Locate.** A staff question flies the camera to the bay (2.2 s), a beacon column and halo mark it, and a pin states the count.
7. **Dawn finale.** Mood → .5 (lavender sky, low warm sun), sign flips to OPEN, camera breathes ±0.22 rad.

`prefers-reduced-motion` is not yet honoured. For a live demo this is acceptable; an implementer shipping this as product UI must add it (see `HANDOFF.md` §6).

## 5. 3D art direction

- **Subject:** a convenience store as an architectural model, cut away on two sides, 12 × 8 m, shelves with instanced stock, coolers on the back wall, hot warmer + register on the right, freezer chest, umbrella stand and rain hooks by the entrance, a vending machine and a street lamp outside.
- **Material:** matte clay (paper-warm white), navy plinths, emissive coolers and cove lighting. No textures except a procedural floor checker and the CLOSED/OPEN neon sign.
- **Light:** night = cold moon + warm interior lamps + bloom; dawn = low warm sun, lavender fog; day = overcast softbox, paper-coloured ground. Rain is a GPU line shader; it thins but does not stop in the day (tomorrow is a rainy day).
- **Stock is geometry.** Every bay's visible facings equal its stock ratio. When the morning order is delivered, shelves refill; the umbrella stand shows 6 → 19 umbrellas.
- **Product portraits** are procedural clay-toy models rendered once at boot (12 products) and reused as ledger thumbnails and the live turntable.
- **Camera:** telephoto (fov 23–31) so the model reads as a miniature; pointer parallax ±0.07 rad; `setViewOffset` slides the model under the UI (`world.uiShift`) so text never covers it.

## 6. Honesty rules (keep these when extending)

1. Anything that is a concept (AR shelf scan, voice input, 3D heat map) carries a dashed `コンセプト` tag or is only reachable through a control that does.
2. The four pilot KPIs on the last scene show `—` and `パイロットで計測`. The one live number (採用・修正) is labelled `このデモの記録`. Never show measured-looking effect numbers (hours saved, % waste) — the deck states those are not yet measured.
3. The folio carries a permanent `デモデータ` tag. Names, SKUs, stock and sales are fictional and generated in `js/mock/data.js`.
4. Photography credit stays on the last scene (Wikimedia CC BY-SA photo used in the AR concept).

## 7. What not to do

- Do not add a fourth brand colour. Do not use `--lamp` on paper.
- Do not turn the chat into a free-floating chatbot window: both chats live inside the surface they act on (drawer on the sheet; panel beside the model).
- Do not hide the code-check step to make the LLM look smarter; the deck's differentiator is that code verifies the draft.
- Do not add a dashboard of generic KPI tiles.
