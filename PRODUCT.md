# StoreMind Product

## Product purpose

StoreMind is a deterministic retail exception control desk. It turns fictional source signals into a server-authored, role-scoped, ranked work queue; lets authorized operators take bounded action; requires the policy-specified proof before verification; and rechecks the originating source before the server resolves an exception.

It is an operational work surface, not a reporting dashboard. The core promise is traceable exception handling from ranked signal to owner, action, proof, source recheck, command admission, and durable audit.

## Audiences and roles

The executable has five fictional accounts representing four authority levels:

- **Store clerk:** sees assigned store work within the clerk's server-authorized scope and may issue only commands allowed for that role and exception.
- **Department owner / store lead:** sees the authorized department queue for one store, may claim role-owned work, and can hand claimed work to another on-shift actor in the same store.
- **District manager:** sees authorized stores across the district and can work district-visible exceptions. District roles do not clock in or out.
- **Headquarters:** has tenant-wide visibility and can work authorized exceptions, reset the deterministic demo, preview/publish/unpublish class policy, and view recorded proof and policy-completion metrics. Headquarters does not clock in or out.

Authority is established by the authenticated server account. A browser-selected role is never an authority source. Visibility is enforced for store, department, district, and headquarters scope.

## Platform and operating model

The shipped product is a responsive web control desk served by the .NET 9 service. It supports wide desktop, compact desktop/tablet, and queue-first phone layouts. The application uses authenticated HTTP endpoints and a live server event stream. During temporary connectivity loss it can show cached reads and admit actor-scoped commands to a persistent browser outbox for later replay with the original idempotency key and exception version.

The current executable has no LLM dependency. Assistant availability is optional; it never ranks, authorizes, or commits an action, and the critical workflow remains operational when the assistant is unavailable.

All stores, accounts, signals, products, shelf scenes, proof artifacts, follow-up observations, and outcomes in the demo are fictional deterministic fixtures. No customer data is represented.

## Core workflow

1. **Authenticate.** The operator signs in with a fictional local account. The server returns identity and capabilities.
2. **Enter authorized context.** Store-scoped roles see their working store and current shift state. District and headquarters roles receive their wider authorized store scope without a clock requirement.
3. **Read the ordered queue.** Active, resolved, or all authorized exceptions are shown highest policy score first. The server authors global rank from explicit urgency, impact, confidence, and age terms; the UI labels filtered position separately.
4. **Open an exception.** The work sheet shows lifecycle state, location, owner, deadline, source reference, current metric, resolve target, consequence of inaction, policy rationale, and proof gate.
5. **Choose a bounded command.** Only commands allowed by the server for the current actor, shift, ownership, exception state, and version appear. Command-specific values come from bounded taxonomies or authorized targets.
6. **Record action and proof.** Actions, reasons, snooze windows, suppression reasons, ownership changes, and required proof are submitted with idempotency and version protection. Verification accepts only server-issued proof artifacts of the required type.
7. **Recheck the source.** Proof alone does not close work. Verification consumes the next deterministic observation from the originating source fixture. A failed target leaves or returns the exception to active work; a successful target resolves it.
8. **Trace the result.** Exception timeline, server command admission state, and cross-store audit show recorded actor, role, command, outcome, resulting state, source metric, proof provenance, command identity, and digest where supplied.

## Stage A behavior

### Ownership

- Seeded exceptions begin on a **role queue**, not with a named person. The shipped seed identifies the grocery department owner for the relevant work.
- `Claim` binds the exception to the claiming on-shift actor. Once claimed, `handoff` replaces `claim` in the allowed ownership commands.
- Handoff is limited to another on-shift actor in the same store. Off-shift and cross-store targets are rejected.
- Named ownership and shift presence survive a service restart.

### Shift

- Seeded store roles start on shift. Store-role users see an explicit On shift/Off shift control.
- Clock-out returns every exception named to that actor to its role queue, clears the named owner, records a durable `return_to_role` event, and advances the exception version.
- While off shift, a store actor has no authorized store commands. The command form closes on clock-out, and selected work reports that no commands are authorized for the exception and role.
- Clock-in restores eligibility for commands permitted by role, ownership, and lifecycle state.
- District and headquarters actors are not store-presence roles and do not clock.

### Headquarters policy and proof oversight

- Only headquarters capability can preview, publish, or unpublish exception-class policy.
- Policy preview reports expected generated volume and whether it exceeds the configured volume budget.
- Publishing or unpublishing a class does not erase live exceptions. The setting changes which classes generate exceptions on a later deterministic reset.
- Headquarters can view the recorded proof ledger and policy metrics including open, resolved, proof count, completion rate, and false-positive rate. Store clerks cannot access the proof console.
- Demo reset is capability-gated to headquarters and restores the deterministic starting fixture without making browser state an authority source.

### Command admission

- Every attempted admitted command has a server-side identity and state history.
- Successful synchronous commands expose `accepted`, `running`, then `completed` states, with accepted/completed timestamps and sequence.
- Rejected execution such as an invalid action code produces a durable `failed` admission with an error code and does not mutate the exception version.
- Replaying the same command identity and payload returns the original command identity, sequence, and completed result rather than executing twice.
- Admissions survive restart. They are actor-scoped for ordinary users; headquarters can see admissions for tenant-visible exception work.
- The selected exception displays these states separately from its operational timeline so transport/admission truth is not confused with domain outcome.

## Store oversight and audit

Store oversight summarizes each authorized store by open, overdue, blocked or escalated, suppressed, high-severity, and oldest-open work. Selecting a store summary returns the operator to that store's exception desk.

The audit lifecycle is a role-scoped cross-store reading of recorded exception events. Accepted commands and failed proof checks appear there with the visible server sequence. It complements, rather than replaces, the selected exception's own recorded timeline.

## Connectivity and concurrency

- Live updates are received from the authenticated event stream and refresh authorized queue, store, audit, shift, policy, proof, and admission views.
- Cached reads may be shown as a stale snapshot during an outage.
- Offline commands enter an actor-scoped, browser-persistent outbox with their original idempotency key and expected exception version. Reload, reauthentication, and reconnect can replay the same command.
- Permanent failures and stale-version conflicts stay visible for review. Operators can reopen the current exception state, resubmit an allowed command, or discard the failed queued command.
- Version checks prevent a stale browser state from silently overwriting newer exception state.

## Explicit non-goals

StoreMind Stage A is not:

- An LLM, chatbot, autonomous agent, or assistant-dependent workflow.
- A system in which AI ranks work, grants authority, selects a command, verifies proof, or commits a decision.
- An executive analytics or KPI dashboard. Metrics are limited to operational rank terms, store summaries, policy preview, and headquarters proof/completion reporting already present in the executable.
- A production integration with real point-of-sale, inventory, workforce, customer, photographic, or store systems. Current inputs and outcomes are deterministic fictional fixtures.
- A free-form workflow builder. Commands, action codes, suppression reasons, snooze windows, proof types, and ownership targets are bounded by server policy.
- A substitute for source verification. Selecting or recording proof does not resolve an exception without the server's originating-source recheck.
- A client-side authorization system. The UI reflects server authority and must not infer broader access from visible controls or local state.
- A general employee scheduling product. Shift presence exists to control store command eligibility and named exception ownership.
- A policy editor that rewrites live work. Class publication affects future fixture generation on reset and leaves existing exceptions intact.
