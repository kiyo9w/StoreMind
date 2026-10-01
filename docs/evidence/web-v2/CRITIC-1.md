# CRITIC-1: StoreMind web v2

Verdict: **ONE MORE PASS**. The system reads as a designed deck sibling and is a large step up from the old UI. It still has real accessibility misses and a few component-consistency and duplication faults.

## Measured
- Smallest text ratio found by script: 5.93:1 ("Online" status, 12px). The rest of the checked text is 6.6:1 or better.
- Lead's working-store select renders grey (#888-class text on paper, about 3.5:1). It fails AA and reads as disabled. The HQ select is black, so the two are inconsistent.
- Targets under 44px: Clock out 89x32, ACTIVE/RESOLVED/ALL tabs 106x40, refresh 44x40, store select 208x43. Phone and tablet use the same sizes.
- Focus ring: 3px solid paper-coloured outline (rgb 255,254,243) on the focused button. On a paper background it is invisible unless a navy ring sits beside it; verify, because the ring may only be visible on navy surfaces. In the 04 screenshot the select shows a double navy ring, which is good.
- "Record action" is navy in 02 and pure black in 04. This is an unexplained state change that breaks the token set.

## Per screen

**01 Sign-in: strong.** There is one question and one button. The headline with the navy highlight is on-brand. The illustration plate is good.
1. The right half is about 55% decorative navy, and the form column is top-heavy with a dead lower third. Vertically centre the form.
2. There is no hint about how to find the credentials ("issued in the server console"), and the empty fields have no focus affordance.
3. Two near-identical reassurance paragraphs say that authority is server-side.

**02 Lead desk: good hierarchy, with duplicated facts.**
1. "25m left" appears three times: the queue row, the hero, and "due in 25m" in the sub-line. Keep the countdown plus the clock time only.
2. The queue header shows a giant "1" (count) next to a row numbered "2" (global rank). The reader sees a contradiction. Label the count ("1 shown") or drop it.
3. The "Policy remains in control / assistant cannot rank" notice appears twice, in the sidebar and in the evidence rail. It is also generic AI-explainer copy. Keep one.
4. Escalate is outlined red. It is a routine bounded command, not destruction, so red misleads. Reserve red for Suppress only.
5. Next valid command shows six equal-weight buttons, with only Record action dominant. The first-time operator cannot tell Claim from Acknowledge as the real first step. Order and weight them by the server's expected next step.
6. The evidence rail shows the shelf plate for a cold-brew exception, and the same generic plate for HQ's pickup-staging item. A wrong image reads as a bug.
7. The "SYNTHETIC" fixture caption is clipped at the plate edge.
8. The phase strip's underlined current label is the only text emphasis, so current and complete need clearer shape distinction (HQ shows complete as solid, which is good).

**03 HQ escalated item: good.** Tag text plus a shape plus an amber band makes the escalated state redundant and legible.
1. Escalation severity "High" and the due time repeat the tag and the hero.
2. The amber panel pushes the Why section below the fold, so the rationale is lost at 900px.
3. "De-escalate" is a bare button with no icon, while its siblings have icons.

**04 Command form:** clear and bounded, and the placeholder is fine. Submit and Cancel are aligned. The form sits below the buttons and the command it belongs to is no longer marked active. Highlight the chosen command (it turns black, but inconsistently).

**05 Oversight: the weakest screen.** It reads as a generic admin table.
1. Two display H1-scale headings (Store oversight, Class policy) compete.
2. The Working store select and Reset demo are irrelevant on a page that has its own store list.
3. The class policy rows show bare numeric inputs "0" and "4" labelled only in the column header. There is no per-field accessible label and no unit.
4. Preview, Publish and Unpublish are three equal buttons per row, so 12 buttons repeat and Unpublish red repeats four times.
5. The proof table at the bottom is empty with a header but no empty state.
6. District-01 and district-02 are raw ids.
7. The metrics strip (open, resolved, proofs, completion, false positive) edges toward KPI dashboard territory, which PRODUCT.md rules out. It is at least restrained.

**06 Audit: clean and well aligned.**
1. Every event uses the same signature icon, so event types cannot be scanned. Use shapes by outcome (accepted solid, failed dashed).
2. All timestamps read 2:16 PM and use a monospace face that is off-token.
3. The tilted SEQUENCE stamp is the only rotated element and feels decorative.

**07/08 Phone: workable but long.**
1. The queue screen is 70% empty.
2. The work sheet is about 2800px tall, with the evidence rail dumped at the bottom, so the proof gate (the thing that closes the work) is the last thing seen. Put "Proof required" directly under the command block.
3. The clock-out control is 32px tall.

**09 Tablet:** good two-pane layout. The hero grid has a stray vertical rule at the right edge of the Respond by / Owner row, and the queue title truncates ("assigned…").

## Eight highest-impact fixes
1. Raise every interactive target to min-height 44px (tabs 40 to 44, clock out 32 to 44, refresh 40 to 44, select 43 to 44).
2. Fix the select colour: set `select{color:var(--ink)}` and drop the grey for enabled state; reserve #888 for disabled only.
3. Use a double focus ring everywhere: `outline:2px solid var(--navy); outline-offset:2px; box-shadow:0 0 0 4px var(--paper)` and invert for navy surfaces.
4. Dedupe facts: drop "due in Xm" from the hero sub-line, keep one assistant notice, remove escalation severity and due from the panel.
5. Restyle Escalate to a navy outline. Keep red only for Suppress and Unpublish. Fix the Record action black state to navy with a pressed underline.
6. On oversight, hide the store select and Reset demo, collapse policy actions to Preview with Publish/Unpublish revealed after preview, add labels and units to the inputs, and add an empty state to the proof table.
7. On phone, move "Proof required" under the commands. Add a sticky bottom action bar showing the next valid command.
8. Differentiate audit icons by outcome shape, use the display font for timestamps, and drop the rotation on the stamp. Add exception-class glyphs to the evidence plate instead of the shelf default.

## Verdict
ONE MORE PASS. The dead states I could not capture (offline, failed verification, snoozed, off-shift) should be checked next time.
