# Handoff for implementation agents

Read `DESIGN-VISION.md` first (what it is and why), then this file (how to extend it without breaking it), then `MOCK-CONTRACT.md` (the seam you will replace).

## 1. Ground rules

- **What this is:** a concept demo for one presentation. Visual quality and a reliable offline run are the product. It is not wired to the .NET service or the Flutter app, and it must keep working with no network.
- **No build step.** Plain ES modules + an importmap. After *any* source change run `tools/build-offline.sh` so `offline.html`/`dist/app.js` stay in sync (that is the file:// fallback).
- **Vendored, do not upgrade casually:** `vendor/three` (0.186.1 + a few addons), `vendor/gsap` (3.x, standard free licence). Fonts: `assets/fonts/BodoniModa-*` (OFL). Japanese uses system fonts.
- **Do not touch** `mobile/` (Flutter app), `src/` (.NET service), `storemind-flutter-web/`. They are separate surfaces.
- **Keep the honesty rules** in `DESIGN-VISION.md` §6 (dashed = concept, no measured-looking numbers).
- **Verify with** `node tools/smoke.mjs` (needs Chrome + python3; ~2–4 min; writes screenshots to `docs/screens/`). It must stay green.

## 2. Code map

```
index.html            entry (importmap, css links, #boot, #stage)   offline.html = generated bundle entry
css/                  tokens → base → chrome → open → night → chat → morning → day → end
js/main.js            boot (portraits → 3D world → scenes), keyboard, ?query switches
js/director.js        scene list, transitions, primary()/autoplay
js/state.js           session state (edits, sim, approved …)
js/util.js            helpers, Run (cancellable waits), SPEED (?speed=)
js/scenes/*.js        open · night · morning · day · end   (contract below)
js/three/store3d.js   the world: model, moods, camera shots, locate/heat/scan, pins, rain, bloom
js/three/products3d.js procedural product models, portrait renderer, turntable
js/ui/                chrome (folio + day-arc + presenter/help/toast), chat, cards, charts, icons, type, sound
js/mock/              data.js (data + forecast), llm.js (intents + reply scripts)
tools/                serve.py (launcher), build-offline.sh, cdp.mjs + smoke.mjs (QA)
dev/products.html     product-portrait lab (open via the server)
```

### Scene contract

```js
{ id, title, theme:'night'|'day', clockSub, notes:[...JA talking points],
  mount(root, ctx), enter(prev), leave(next), reset(),
  primary() → 'next' | 'handled'    // what Enter does; 'next' = go to the next scene
  hint() → string                   // label of the next Enter (shown in the folio)
  autoStep?() → 'wait'|'next'|…     // autoplay hook when primary() would skip something
  escape?() → bool }
ctx = { world, chrome, director, state, portraits, sfx }
```

### Switches (query string)

`?scene=open|night|morning|day|end|0-4` jump · `?speed=N` time-scale (0.25–20) · `?beats=N` press Enter N times (5 s apart, scaled) · `?q=low` lower render quality · `?nogl=1` no 3D · `?chrome=0` hide folio/arc.

## 3. Work tracks

Each track can run independently. Tracks 1–2 are what the owner asked to hand off. Prompts are copy-paste ready.

### Track 1 — mock-data realism (data agent)

**Outcome:** the story numbers stay identical, but the data behind them looks real: more SKUs in the ledger (target 24, scrollable), plausible suppliers/lead times, 14-day histories with day-of-week effects, and a second store that can be switched in the folio.
**Owns:** `js/mock/data.js` (+ a new `js/mock/stores.js` if you add stores). **Must not** change `llm.js` event shapes or any scene.
**Acceptance:** `tools/smoke.mjs` green; the invariants table in `MOCK-CONTRACT.md` §2 holds; first 3 rows of the ledger unchanged; all text Japanese and natural; no real brand names.
**Prompt:**
```
Repo /Users/ngotrung/Documents/Projects/storemind, branch feature/showcase-demo, folder showcase/.
Read showcase/docs/MOCK-CONTRACT.md and DESIGN-VISION.md §6. Extend showcase/js/mock/data.js only:
(1) grow `products` from 12 to 24 Japanese convenience-store SKUs (drinks, bento, desserts, household) keeping the first
12 and every invariant in MOCK-CONTRACT §2; give each a `shelf.code` that already exists in the 3D model
(A-03 A-04 C-01 C-02 C-03 D-01 B-01..B-08 F-01) and a model key from showcase/js/three/products3d.js (add a new
model there only if none fits); (2) add weekday seasonality to buildHistory (deterministic, seeded);
(3) keep every number the story depends on. Verify with `node showcase/tools/smoke.mjs` (needs Chrome) and
`node showcase/tools/check-data.mjs` if you add it. Report the invariants you verified and any you had to move.
Do not edit scenes, CSS, llm.js event shapes, or the Flutter/.NET projects.
```

### Track 2 — chat coverage (logic agent)

**Outcome:** typed questions beyond the chips get good, deterministic answers (still no network), including IME input, synonyms, and numbers ("5番を48にして", "傘を2ケース減らして").
**Owns:** `js/mock/llm.js`, `js/ui/cards.js` (new card kinds). **Must not** change event shapes.
**Acceptance:** a table of ≥ 40 JA utterances → intent → expected event types in `docs/CHAT-CASES.md`, with a node test (`tools/check-chat.mjs`) that runs them; the smoke test still green; fallback never claims a capability the demo lacks.
**Prompt:**
```
Repo /Users/ngotrung/Documents/Projects/storemind, branch feature/showcase-demo, folder showcase/.
Read showcase/docs/MOCK-CONTRACT.md §3 and showcase/js/mock/llm.js. Improve parseManager/parseStaff and the reply
scripts so at least 40 realistic Japanese utterances (manager: revise/explain/what-if/approve/status; staff: stock/
where/delivery/expiry/weather/AR) map to the right intent and a good reply. Keep event shapes. Add tools/check-chat.mjs
(pure Node, imports llm.js with a stubbed state) and docs/CHAT-CASES.md. Do not call any network or model.
Typed text goes through an IME: do not submit on composition Enter (already handled in the scenes).
Finish with `node showcase/tools/smoke.mjs` green.
```

### Track 3 — real service wiring (later, optional)

**Outcome:** the same UI driven by the .NET service (or any backend) instead of the mock files, behind a flag (`?api=http://…`), with the mock as default.
**Plan:** (a) add `js/api/client.js` implementing the same exports as `mock/data.js` async-ly (`getProposals`, `getNightRun`, `approve`, `patchProposal`), (b) replace `managerReply`/`staffReply` with a streaming client for the events in `MOCK-CONTRACT.md` §3, (c) keep `mock/` as the offline default, (d) never let the browser decide validity — show the server's `checks`.
**Acceptance:** with the flag off, `smoke.mjs` is unchanged; with it on, a recorded fixture server reproduces the same screens.
**Note:** `src/` currently contains a deterministic "exception desk" service (a different product direction). Decide with the owner whether to reuse its auth/SSE patterns or build a small night-run API.

### Track 4 — presentation hardening (infra agent)

**Outcome:** zero-surprise run on the presenting laptop.
**Tasks:** subset and vendor a Japanese Mincho + Gothic (`pyftsubset`/Google Fonts `text=`) so the demo looks the same on any OS; measure FPS on the presenting laptop at the real projector resolution and tune `NIGHT.bloom`, shadow map size and `_dpr` (in `store3d.js`); add a kiosk launcher (Chrome `--kiosk --app=http://localhost:8080/`); record a 2-minute backup video from autoplay (`A`); check `offline.html` over `file://` in Chrome and Safari.
**Acceptance:** `docs/PERF.md` with measured FPS per scene; backup video committed outside git (large) and path recorded.

### Track 5 — accessibility and reduced motion (design-eng agent)

**Outcome:** the demo can be shown to a mixed audience and later reused as product UI.
**Tasks:** honour `prefers-reduced-motion` (skip camera dollies and char reveals, keep state changes); keyboard operation of every control; visible focus (exists: lamp outline); ARIA for the pipeline and ledger; contrast audit of `--mute-d` on photo backgrounds.
**Acceptance:** `docs/A11Y.md` with findings and fixes; smoke green.

### Track 6 — Flutter token port (optional)

**Outcome:** the Flutter mobile app adopts the same visual identity (paper/ink/navy, Bodoni numerals, Mincho headings) so the real app does not look like a different product.
**Inputs:** `css/tokens.css`, `DESIGN-VISION.md` §3. **Do not** reproduce the 3D scene in Flutter.
**Acceptance:** a `ThemeData` + `TextTheme` in `mobile/lib/core/themes/` using the tokens; Plan Review cards restyled as ledger rows; no behaviour change.

## 4. Known gaps and risks

- Tested in Chrome (real GPU path unverified; headless used SwiftShader). Safari/Firefox untested.
- `offline.html` over `file://` was verified once in headless Chrome; rebuild after every edit.
- Japanese copy was reviewed once by the author of this work; have a native reader check wording before the talk.
- Reduced motion, screen readers and touch are not handled (desktop projector demo).
- 3D store uses procedural geometry; shelf contents are stylised, not real SKUs.
- `window.__sfx` and `window.__demo` are dev handles; remove or guard them if this becomes product code.
- Layout targets 16:9 and 16:10. 4:3 projectors will letterbox the type small.

## 5. Decisions (and what would flip them)

| Decision | Why | Flip if |
|---|---|---|
| Standalone HTML/JS instead of the Flutter web build | Flutter web pulls CanvasKit and CJK fallback fonts from a CDN (Japanese rendered as boxes on this machine with no network), and it cannot do this level of motion/3D. The owner said app code no longer matters for this demo. | The demo must be the same binary as the shipping app. |
| One persistent 3D world, scenes only move camera/light | Gives the story a continuity object and makes day/night literal | GPU budget on the venue laptop is too low (use `?q=low` / `?nogl=1`) |
| Scripted LLM with rule-based intent parsing | No network allowed; deterministic for a live room; typed input still works | A local model is available and fast enough offline |
| System Japanese fonts | Zero payload; matches the deck, which uses Hiragino | Venue machine is not a Mac |
| Night = machine, paper = people | It is the deck's own colour rule | The deck changes |
