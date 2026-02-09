<project_context>
  <system_purpose>
    StoreMind is an AI-powered retail inventory management system.
    Goal: Unify a legacy Flutter Chat UI ("Insider") with a new Multi-Agent .NET Backend.
    Philosophy: "Deterministic Foundation, Probabilistic Refinement."
  </system_purpose>

  <critical_constraints>
    <rule priority="high">NO DEEP REFACTORING. Do not rename classes, move folders, or change existing architectural patterns unless strictly required for API connection.</rule>
    <rule priority="high">UI PRESERVATION. The existing chat interface is the "Source of Truth" for design. New features must match its aesthetic exactly.</rule>
    <rule priority="medium">PROTOCOL ALIGNMENT. Backend uses SSE (Server-Sent Events) for chat. Frontend must parse `agent-step` (thought) vs `text-chunk` (answer) events.</rule>
  </critical_constraints>

  <architecture_map>
    <frontend tech="Flutter" state="Bloc/Cubit" di="GetIt" nav="GoRouter">
      <path alias="@features">lib/features/</path>
      <path alias="@core">lib/core/</path>
      <module name="chat">lib/features/chat/ - Handles LLM interactions. Needs SSE parser update.</module>
      <module name="auth">lib/features/auth/ - Handles JWT & Roles.</module>
      <module name="plans">lib/features/plans/ - (New/Placeholder) Target for "Manager Approval" dashboard.</module>
    </frontend>

    <backend tech=".NET 9" framework="Semantic Kernel">
      <path alias="@contracts">src/Kiyo9w.StoreMind.Core/Contracts/</path>
      <concept name="Plan">Overnight inventory proposal. Contains list of `Proposals`.</concept>
      <concept name="Orchestrator">Chat agent. Emits specific SSE events.</concept>
    </backend>
  </architecture_map>

  <code_style>
    <frontend_rules>
      - Use `UIStatus` (Freezed Union) over boolean `isLoading`.
      - Use `Assets.gen.dart` for all images/icons.
      - Map Backend DTOs -> Domain Entities (create `toDomain()` extensions).
    </frontend_rules>
    <backend_rules>
      - Respect the strict `Manager` vs `Staff` role separation.
    </backend_rules>
  </code_style>

  <migration_strategy>
    1. ANALYZE: Read backend `Contracts/` to understand data structures.
    2. MAP: Create matching DTOs in Flutter.
    3. BRIDGE: Implement SSE listening in `ChatRepository`.
    4. EXPAND: Build "Plan Review" UI reusing existing widget styles.
  </migration_strategy>

  <CRITICAL_INSTRUCTIONS>
    This prompt instruction was made by an agent without the access to reading the code inside the actual codebase, so it could very well be wrong, deeply verify all the information before making any changes to the codebase, fix this file once you get access to the codebase and you find its information incorrect or outdated.
  </CRITICAL_INSTRUCTIONS>
</project_context>
