# StoreMind Design

## Design thesis

StoreMind is a working exception **ledger**, not a dashboard of abstract metrics. Its form is a **store-operations clipboard/control desk**, fixed by the signed seed key `CONTRACT-STOREMIND-CONTROL-DESK`. The interface should feel like authored operational paperwork: warm paper, navy ink, ruled ledger lines, Bodoni numerals, compact labels, shelf evidence on navy, and an obvious next valid command.

> **v2 (this revision)** moves the visual system onto the StoreMind deck tokens (warm paper `#FFFEF3`, ink `#000`, navy `#0E1D40`, grey `#888`). The form, structure, behaviour, authority model and accessibility contract are unchanged; the cool-blue palette and operational-blue actions are retired by owner decision.

The visual system exists to keep four things legible at once: ordered work, the selected exception, evidence required before action, and the durable record of what the server accepted. It is dense by design, but never ornamental or analytics-led.

## Own-world visual language

The shipped world is a control room with a paper ledger:

- Warm paper is the only ground. Wells and quiet fills are derived tints of paper (`--paper-sunk`, `--paper-deep`), never new hues.
- A navy operations rail anchors identity and navigation; navy also marks selection, the decision bar, primary actions and evidence scenes.
- Rules carry structure: 2px navy for sections and panes, 1px translucent navy for rows. No card grids, no depth shadows beyond the off-canvas rail.
- **Phase discs** are the recurring motif. A solid disc is "in progress or done", a half disc is "current", a dashed ring is "not yet". They mark shift presence, lifecycle steps and record state, always with a text label.
- **Solid vs dashed**: solid line = recorded or confirmed; dashed line = pending, unproven, or not yet authorized (empty proof boxes, snooze, the assistant-unavailable note, empty-state wells).
- Display type is Bodoni/Didot for titles and numerals (ranks, clocks, metrics); text type is Helvetica Neue/Segoe UI. Labels are small uppercase tracked sans.
- Severity is a shape plus a word (diamond critical, triangle high, circle medium, ring low). Red/amber/green are functional signals only and never the sole carrier of meaning.
- Fictional shelf, product, scanner and proof illustrations are evidence fixtures on navy or paper, drawn in the same palette. No photography.
- Square geometry (`.125rem` radius) throughout; the only round shapes are discs, the sequence stamp and avatars-as-ledger-boxes.

## Layout and first viewport

### Sign-in

The sign-in view is a full-height split composition: the credential and product statement panel on the left, and an illustrated store-operations desk on the right. It states that credentials are fictional and local, authority comes from the authenticated account, and the environment contains no customer data.

### Authenticated control desk

On wide screens the first viewport is a fixed operational composition:

1. A left operations rail.
2. A header with current section, working-store selector, store-role shift control when applicable, refresh, and capability-gated reset.
3. An ordered queue on the left of the workspace.
4. A large selected-exception work sheet in the center.
5. A narrow evidence desk on the right.

The center work sheet presents, in order: exception identity and location; rank terms; policy rationale; compact source, custody, and consequence evidence; bounded response controls; recorded timeline; and server command admission state. The next server-authorized command belongs in this surface, not in a detached toolbar or generic modal.

Store oversight and audit lifecycle are separate rail destinations. Oversight uses a ruled table of authorized store summaries and, when capabilities permit, the class-policy/proof console. Audit uses a chronological cross-store activity reading with a visible sequence stamp.

### Stage B escalation response

Escalation remains part of the selected work sheet rather than becoming a dashboard or detached case-management surface. An active or historically closed escalation appears between evidence and bounded response as one amber ruled strip containing reason, severity, trend, and server-authored response deadline. **ACTIVE**, **OVERDUE**, and timestamped **CLOSED** labels state operational truth in text; color only reinforces it.

The escalation form uses three bounded selects. De-escalation replaces them with one required written justification. Hidden command fields must not retain native validation constraints that block another command. Successful verified closure clears the active escalation strip's state while its original fields remain recoverable from the durable timeline.

Authorized district-level oversight uses a compact ruled rollup above store summaries. It exposes only operational counts needed to route response: stores, active work, escalated work, response-overdue work, and oldest response due. It deliberately avoids charts, trends, KPI decoration, or enterprise planning concepts. Each district/store row returns the operator to a scoped queue.

## Typography

- Display: `"Bodoni 72","Didot","Hoefler Text",Baskerville,Georgia,serif` for page titles, pane titles, section headings, ranks, clocks and metric numerals. Numerals are lining and tabular. Display text receives `word-spacing:.14em` because Bodoni's native word space is tight.
- Text: `"Helvetica Neue","Avenir Next","Segoe UI","Hiragino Sans",Arial,sans-serif`, `.9375rem / 1.5`.
- Mono for record IDs, command IDs, digests, sequence stamps: `ui-monospace,"SF Mono",Menlo,Consolas`.
- Labels, table headings, fact terms: `.6875rem–.75rem`, uppercase, tracked `.1em`, bold, `--mute` ink.
- Scale: hero `clamp(2.5rem,4.6vw,4.25rem)` (sign-in), page title `1.875rem`, sheet title `clamp(1.875rem,3.2cqi,2.75rem)`, section title `1.25rem`, clock `2rem`, queue rank `1.75rem`.
- Hierarchy comes from size, weight, case and the display/text split, not from a second expressive face.

## Palette and tokens

The CSS custom properties in `styles.css` are the authority. Brand tokens are shared with the deck; everything else is derived or functional.

| Token | Value | Use |
|---|---:|---|
| `--paper` | `#FFFEF3` | The ground |
| `--paper-sunk` / `--paper-deep` | `#F4F2E4` / `#E8E5D2` | Wells, hover, evidence pane, meter tracks (paper + 4% / 9% ink) |
| `--ink` | `#000000` | Primary text |
| `--navy` | `#0E1D40` | Rail, selection, decision bar, primary actions, section rules, scenes |
| `--gray` | `#888888` | Hairline/decorative only: dashed rings, empty-state icons, low severity ring (never small text on paper) |
| `--mute` / `--mute-d` | `#4F4E4A` / `rgba(255,254,243,.74)` | Secondary text on paper (8.3:1) / on navy (~9:1) |
| `--rule` / `--rule-strong` | `rgba(14,29,64,.2)` / `#0E1D40` | Row rules / section rules |
| `--crit` `--crit-bg` | `#A63235` `#F7E3DC` | Critical, overdue, failure |
| `--warn` `--warn-bg` | `#8F5200` `#FBEFD0` | High severity, escalation, stale/reconnecting, pending review |
| `--ok` `--ok-bg` | `#24704B` `#E1EFE0` | On shift, online, success |
| `--focus` | `#0E1D40` (paper on navy surfaces) | Two-ring focus: 3px outline + 2px paper halo |

No gradients except the hard-stop half disc. No shadows except the off-canvas rail.

## Spacing and geometry

Spacing uses the quarter-rem tokens (`.25rem`, `.5rem`, `.75rem`, `1rem`, `1.5rem`, `2rem`, and `3rem`) as its default cadence. Preserve incumbent component-specific exceptions such as `.625rem` control padding and `1.25rem` responsive heading padding; avoid new near-duplicate values without a concrete layout need. Interactive controls have a minimum height of `2.75rem`. The desktop rail is `13.5rem` before responsive collapse and the header is `5.25rem` before the narrow-phone expansion.

Content density is deliberate. Use compact internal spacing for metadata and facts, larger spacing between work-sheet sections, and borders to make adjacency readable. Avoid floating card grids and excess empty space that would separate evidence from its decision.

## Components

- **Brand lockup and operations rail:** StoreMind mark on a paper chip, operator identity, three destinations (active item inverts to paper-on-navy), assistant availability (dashed note), and sign-out.
- **Decision desk (v2):** the first thing under the exception title. A navy bar carries the response clock (Bodoni, live `data-due` countdown, overdue shown as inverted red-on-paper plus the word "Overdue"), the owner, and the consequence of inaction; directly below it, in the same bordered object, the server-authorized commands. The first state-advancing command (verify, act, acknowledge, de-escalate, reopen) is the filled primary; suppress and escalate are red outlines; the rest are navy outlines. Command forms unfold inside the desk.
- **Lifecycle tracker (v2):** five phase discs (Signal, Acknowledged, In progress, Proof & recheck, Resolved) derived from server state, with a text note for snoozed, suppressed, or a failed source recheck. Escalation is stated once, in the escalation strip.
- **Rank terms (v2):** urgency, impact, confidence and age as four numerals with proportional meters from the server's point terms; the written explanation sits in a disclosure ("How the server computed this rank").
- **Sticky command bar (v2):** when the decision desk scrolls out of view, a navy bar keeps the title, clock and primary command available.
- **Queue ledger (v2):** rank numeral, title, location, severity shape + word, and a live countdown; selected row inverts to paper-on-navy; an attention strip counts overdue, escalated and snoozed work; `J`/`K` move through the queue.
- **Shift control:** a disc (solid = off shift, ring = on shift) beside the explicit text status and clock button.
- **Connectivity banner:** Normally withdrawn while online; appears centrally for reconnecting, stale, or offline state and reports queued or failed commands.
- **Header controls:** Working store, store-role clock state, refresh, and capability-gated demo reset.
- **Ordered queue:** Active/resolved/all filters, count, loading skeleton, ranked items, empty and retry states. Selection stays visually explicit and the summary says the queue is highest policy score first.
- **Exception heading and decision strip:** Severity, lifecycle state, record ID, location, fictional product illustration, filtered view position, urgency, impact, confidence, and age.
- **Evidence sections:** Rationale, source diagram, owner, deadline, location, source reference, proof gate, consequence of inaction, current metric, and target.
- **Bounded response:** Only server-returned allowed commands become action buttons. Forms reveal fields specific to the selected command and use server-supplied action codes, same-store on-shift handoff targets, and deterministic proof choices.
- **Outbox review:** Amber inline state for permanently failed queued commands, with review and discard actions.
- **Timelines:** Ruled vertical event records for exception history and command admission states. Audit lifecycle expands this pattern across authorized stores.
- **Store oversight and policy console:** Tabular, numeric, capability-scoped surfaces; policy preview/publish controls remain operational rather than decorative.
- **Escalation response:** An amber ruled fact strip for bounded reason, severity, trend, response deadline, and explicit active/overdue/closed state; command-specific escalation and de-escalation forms remain adjacent to authorized actions.
- **District rollup:** Capability-scoped tabular escalation summary above store rows, with response deadlines and queue navigation but no analytic charts.
- **Feedback:** Inline form messages for actionable errors and success, short-lived toasts for command/system outcomes, explicit loading and empty states.

## Responsive behavior

Responsiveness preserves the same operational hierarchy rather than inventing a separate mobile product.

- Above `80rem`, the three-pane desk remains visible, with a broad center work sheet and narrow evidence desk.
- At `80rem` and below, the rail collapses to icons; the evidence desk moves below the queue/work columns and becomes a three-column evidence band.
- At `62rem` and below, navigation becomes an off-canvas `17rem` rail opened from the header. The desk retains queue and work columns and may require its defined minimum width until the phone breakpoint.
- At `46rem` and below, the header becomes two rows. The desk becomes a queue-first flow: selecting an exception swaps to the work sheet, a back-to-queue control appears, and the evidence desk follows the work. Fact grids and action layouts collapse to one column as needed.
- At `24rem` and below, nonessential product art and some header icon controls hide while queue identity and command access remain.

No responsive state may hide authorization, shift state, command outcome, proof requirements, or the route back to the queue.

## Interaction and motion

Motion is short and functional. Buttons change background/border/color over `.18s` and move down one pixel on press. The navigation rail slides over `.25s`; the connectivity banner moves and fades over `.3s`. Loading placeholders use a restrained horizontal shimmer. Command forms scroll into view and move focus to the first usable field. Mobile selection moves focus to the opened work sheet.

The shared easing curve is `cubic-bezier(.16,1,.3,1)`. `prefers-reduced-motion: reduce` disables smooth scrolling and reduces animations and transitions to effectively instantaneous behavior. Do not add ambient, celebratory, parallax, or metric-animation motion.

## Accessibility

The incumbent accessibility contract includes:

- Semantic landmarks, headings, ordered lists, tables, forms, labels, fieldsets, and buttons.
- A keyboard skip link to the exception work surface.
- A high-contrast two-ring `:focus-visible` treatment on links and controls.
- A `20rem` minimum page width and `2.75rem` minimum control height.
- `aria-live` status regions for connectivity and toasts, alert roles for form errors, busy states during loading/submission, and expanded state on mobile navigation.
- Explicit accessible names for icon-only controls and meaningful titles/labels for fictional evidence art.
- Text labels and structure alongside color for severity, connection, shift, and command states.
- Reduced-motion support and keyboard focus transfer in the mobile queue-to-work flow.

Future changes must retain these semantics and must not make color, hover, imagery, or motion the only carrier of operational meaning.

## Data and synthetic-fixture truth

The UI is backed by deterministic server behavior, not generated narrative. All demo stores, source signals, product/shelf illustrations, proof artifacts, follow-up observations, and outcomes are fictional fixtures. The sign-in scene explicitly says **FICTIONAL DEMO ENVIRONMENT · NO CUSTOMER DATA**. Proof selectors expose deterministic fixture artifacts issued for the selected exception, and previews label their synthetic origin and persisted proof identity.

Ranking, visibility, allowed commands, owner, proof requirements, targets, action taxonomies, admission state, and audit entries are server-authored. The browser formats and presents them; it does not invent authority or outcomes. Assistant availability is optional presentation state. The critical loop remains operational without it, and the assistant cannot rank, authorize, or commit an action.

## Prohibited drift

Future builders must not:

- Recast StoreMind as an executive KPI dashboard, chat assistant, generic SaaS card grid, or consumer task manager. Do not reintroduce operational blue, cool-grey grounds, large radii, or colourful product art.
- Replace the clipboard/control-desk form, warm paper and navy ink, ruled ledger structure, or compact operational labels with a trend-led visual fashion.
- Move the next valid command away from the selected exception and its evidence.
- Display commands, stores, policies, proofs, owners, or roles that were not authorized by the server.
- Treat browser-selected roles, client calculations, or assistant output as authority.
- Imply that fixtures are real customer, employee, transaction, inventory, or photographic data.
- Turn fictional fixture illustrations into decorative hero art detached from source or proof context.
- Hide shift state, proof gates, failed verification, offline/pending command state, server admission state, or audit provenance.
- Resolve work merely because proof was selected; the originating source recheck and server outcome remain visible truth.
- Add large radii, deep shadows, ornamental gradients, animation, badges, or charts that weaken the flat ruled-paper hierarchy. Incumbent gradients used for the body ground, ruled-paper texture, loading shimmer, and subtle heading depth are functional materials and must remain restrained.
- Break the queue-first mobile flow, keyboard path, focus indicators, live status announcements, reduced-motion behavior, or minimum touch target.

## v2 behavioural fixes shipped with the redesign

- The ranked queue stayed hidden after any reload (`#exception-queue` was hidden by `loadQueue` and never revealed); it is now revealed on render, and the empty state shows when no exceptions match.
- The audit lifecycle was empty until the first live event; it now loads with the session.
- Facts have one home: location in the heading; deadline, owner and consequence in the decision bar; source, recheck target and proof gate in the evidence desk; rank terms in the rationale section.
- Server command state shows accepted → running → completed as one inline sequence.

## Local preview

`tools/web-preview/server.mjs` serves `wwwroot` and mimics the HTTP/SSE contract with the same fictional fixtures, for machines without the .NET SDK (accounts `hq`, `district`, `lead`, `lead-west`, `clerk`; password `demo`). `node tools/web-preview/shots.mjs <dir>` captures review screenshots and `node tools/web-preview/flow.mjs` runs a functional smoke test. The preview server is a development aid, not the product backend.
