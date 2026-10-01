# Presentation-day runbook

For: the presenter, tomorrow, in a room with no Wi-Fi. Everything below works offline.

## 1. Before you leave (do this tonight, on the laptop you will present from)

1. Open the folder in Finder: `storemind/showcase/`.
2. Double-click **`run-demo.command`** (macOS may ask once: right-click → Open). A browser tab opens at `http://localhost:8080/`.
   - Prefer **Chrome** (what this was verified in). Safari 16.4+ should work but was not tested.
   - Turn the Wi-Fi off and reload once. The demo must look identical. (It makes no network requests; the only external things are your system fonts.)
3. Press **F** for full screen. Press **?** to see the shortcuts. Press **P** to see the speaker notes.
4. Run the whole film once with **A** (autoplay, about 2 minutes). Press **A** again to stop. Press **R** to reset.
5. Plug in the projector/monitor you will use, repeat step 3 on it. The layout scales to the screen; 1920×1080 and 1440×900 were checked.
6. **Record a backup video** (QuickTime → File → New Screen Recording, or ⌘⇧5) of one autoplay run in full screen. If anything ever fails live, you play the video.
7. Leave the laptop on power and disable sleep/notifications (Do Not Disturb).

### If `run-demo.command` does not work

- Open **`showcase/offline.html`** directly (double-click). It is a pre-built single-script copy and needs no server.
  - If you changed any source, rebuild it first: `showcase/tools/build-offline.sh` (needs Node once).
- No Python? `cd showcase && npx serve .` also works.
- No 3D (very old GPU / blocked WebGL)? The demo detects it and runs without the store model. Force it with `?nogl=1` to see what it looks like. Lower quality with `?q=low`.

## 2. Keys

| Key | Does |
|---|---|
| **Enter / → / Space** | Do the next scripted thing in the scene; if the scene is finished, go to the next scene |
| **←** | Previous scene |
| **1–5** | Jump to a scene |
| **A** | Autoplay the whole film hands-free (stop with A or Esc) |
| **P** | Speaker notes (Japanese talking points per scene) |
| **H** | Hide the header/clock (clean screen) |
| **F** | Full screen |
| **M** | Sound on/off (off by default) |
| **R** | Reset to the start |
| **?** | Help |
| **Esc** | Stop autoplay, close overlays |

A small `⏎ …` label at the top of the screen always tells you what the next Enter will do.

Tip: do not click buttons and then press Enter expecting the next beat — clicks are fine, the demo releases focus, but if something looks stuck press **R**.

## 3. The path, with timings and what to say

Times are for a calm live run. Each scene stays as long as you talk; nothing times out except the night run (≈ 25 s).

| Scene | Press | What happens | Say (see also speaker notes **P**) | Deck slide |
|---|---|---|---|---|
| 01 閉店後 | (wait 4 s) → **Enter** | Camera settles, three facts appear on the store | 明日は雨。弁当が少し残り、傘の在庫は少ない。何を、どれだけ補充するか。 | 2 |
| 02 夜に準備する | (runs by itself, ≈ 25 s) | Data sources tick → LLM drafts with reasons → **code catches two mistakes** (umbrella 36→24 over the shelf limit; milk SKU not in the catalogue → sent back to the LLM) → 04:12 done | ここがスライドの流れです。既存データ → LLMが下書き → コードで確認 → 管理者が承認。 | 6 |
| | **Enter** while running | Skips to the result | | |
| | **Enter** when done | Dawn wipe to the morning sheet | | |
| 03 朝に判断する | **Enter** ×4 | 1) opens 弁当 2) types a question about 牛乳 → tool traces → 5→8 ケース, row flashes 3) "if it did not rain?" → slider falls to 20%, all quantities recompute 4) 承認 seal stamps, five purchase orders listed | 朝、管理者は理由つきの案から始めます。数量は直せます。最終判断は管理者です。 | 5 |
| 04 日中に確認する | **Enter** ×5 | 1) 傘の在庫 → 19本 + camera flies to the stand 2) 温かいお茶はどこ → register warmer 3) 次の入荷 4) AR shelf scan (concept) 5) stock heat map | 日中は、スタッフが同じデータをチャットで確認できます。 | 3 |
| 05 次のステップ | **Enter** or leave it | Dawn, OPEN sign, the pilot grid, four KPIs (three dashed = to be measured) | 次は1店舗・1カテゴリで、今の発注と並べて試します。 | 7–8 |

Free play (any time, not scripted): drag nothing — **click a shelf** on the store model to ask about it; type in the chat (try `5番を48にして`, `傘の理由を教えて`, `温かいお茶はどこ？`, `期限が近い商品は？`); drag the 降水確率 slider; use the − / + steppers (hold to repeat); press the mic icon (voice is a concept: it fakes listening, then types a question).

## 4. What is real and what is a concept (say this if asked)

- **Running in the prototype (per the deck):** Code → LLM → Code draft flow; nightly draft; manager review/approval.
- **Concept screens in this demo:** the 3D store model, shelf-scan AR, voice input, the what-if slider, supplier purchase-order grouping, stock heat map. They are shown with a dashed `コンセプト` tag or live behind a control that carries it.
- **Not measured:** time saved, waste, stock-outs. The last scene shows these as `—` on purpose.
- Everything in this demo is mock data on this laptop. No LLM is called; no network is used.

## 5. If something goes wrong

| Symptom | Do |
|---|---|
| Page does not load | Open `offline.html`. Else play the backup video. |
| Animation looks stuck | Press **R**. If still stuck, reload (⌘R) and press **Enter**. |
| Screen is black / 3D missing | Reload with `?nogl=1` appended to the URL; the rest of the demo still works. |
| Japanese looks wrong | The demo uses Hiragino on macOS. On another machine, install a Japanese font or use this Mac. |
| Chat answers something odd | The chat is rule-based. Say "the demo answers scripted questions"; use the suggestion chips. |
| Laptop is slow | Reload with `?q=low`. Close other tabs/apps. |
| You lose your place | Press **1–5** to jump; the clock at the bottom shows where the story is. |
