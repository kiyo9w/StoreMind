# StoreMind — AGENT.md (agent instructions)

<project_context>
  <repo>StoreMind</repo>
  <orientation>Canonical product is the .NET 9 exception control desk. The Flutter "Insider" client is recovered reference material whose backend routes are absent locally. The Insider + Multi-Agent / Semantic Kernel plan is historical, not active.</orientation>
  <surfaces>
    <surface name="exception-desk" path="src/Kiyo9w.StoreMind.Service" state="active canonical executable"/>
    <surface name="mobile-flutter" path="mobile" state="recovered reference; backend routes missing locally; do not wire"/>
    <surface name="azure-deploy" path=".github/workflows/azure-deploy.yml" state="pipeline only; deployment identity unverified"/>
    <surface name="insider-multi-agent" state="historical; do not implement"/>
  </surfaces>
  <authoritative_docs>README.md and PRODUCT.md describe the exception control desk.</authoritative_docs>
  <run>dotnet run --project src/Kiyo9w.StoreMind.Service/Kiyo9w.StoreMind.Service.csproj</run>
  <tests>~/.dotnet/dotnet test tests/Kiyo9w.StoreMind.Tests/Kiyo9w.StoreMind.Tests.csproj --no-restore</tests>
  <test_baseline>53 passed, 0 failed on 2026-09-07. Re-run to confirm after any change.</test_baseline>
  <standing_constraints>
    <constraint>No credential values anywhere (code, docs, chat, logs).</constraint>
    <constraint>No deploys from agent sessions.</constraint>
    <constraint>No API wiring between mobile/ and the desk; no desk endpoints invented to satisfy mobile/.</constraint>
    <constraint>POST /api/assistant stays 503 assistant_disabled — intentional; do not remove or re-enable.</constraint>
    <constraint>Preserve the control desk UI as-is; no restyling.</constraint>
    <constraint>No deep refactoring unless the owner first maps the mobile backend revision.</constraint>
    <constraint>Do not restore LLM ranking/authorization.</constraint>
  </standing_constraints>
</project_context>

## 1. Canonical executable: .NET 9 exception control desk

- Location: `src/Kiyo9w.StoreMind.Service/`
- Local run: `dotnet run --project src/Kiyo9w.StoreMind.Service/Kiyo9w.StoreMind.Service.csproj`
- Tests: `~/.dotnet/dotnet test tests/Kiyo9w.StoreMind.Tests/Kiyo9w.StoreMind.Tests.csproj --no-restore` — 53 passed, 0 failed (2026-09-07)
- `README.md` and `PRODUCT.md` describe this desk; treat them as current documentation of the active product.
- Deliberate behavior: `POST /api/assistant` responds 503 `assistant_disabled`. Keep it exactly as is.
- Desk API surface: `/api/auth/*`, `/api/exceptions*`, `/api/shifts*`, `/api/policies*`, `/api/proofs`, `/api/events`
- Not present on this service: `/api/manager/plans`, `/api/manager/chat`. Do not add them.

## 2. Recovered Flutter client: `mobile/`

- Package name: `insider`, version `1.0.8+7`
- Base URL: `https://api.storemind.kiyo9w.dev` (see `mobile/lib/configs/app_config.dart`)
- Routes it calls: `/api/manager/plans`, `/api/manager/chat`, `/api/staff/chat`, `/api/v1/chat/completions`
- None of these routes exist on the local .NET desk. That mismatch is expected, not a bug to paper over.
- Do NOT wire Flutter to the exception desk as a shortcut, and do not add chat/plans routes to the desk to satisfy the client.
- Treat `mobile/` as recovered reference material until the owner maps the mobile backend revision.

## 3. GitHub Actions → Azure Web App (identity unverified)

- `.github/workflows/azure-deploy.yml` publishes `src/Kiyo9w.StoreMind.Service` to Azure Web App name `StoremindAPI`.
- Whether that Azure app currently backs `https://api.storemind.kiyo9w.dev` is unverified.
- Treat this as a deployment-identity risk, not a live outage. Do not assert the domain is (or is not) served by this app without verification, and do not deploy to check.

## 4. Historical: Insider chat + Multi-Agent / Semantic Kernel

- Earlier versions of this file described unifying the Flutter chat UI ("Insider") with a Multi-Agent .NET Backend / Semantic Kernel orchestrator.
- That description is historical, not the active product. Preserve it as history only.
- Do not implement, resurrect, or restore LLM ranking/authorization from that design.

## Fresh-agent quick rules

1. Desk work lives in `src/Kiyo9w.StoreMind.Service/` and its tests. Keep `assistant_disabled` intact; keep the desk UI unchanged (no restyling).
2. Any request mentioning `/api/manager/plans`, `/api/manager/chat`, `/api/staff/chat`, or `/api/v1/chat/completions`: state these routes are absent from the local desk; do not invent or wire them.
3. Any deploy/DNS question about `api.storemind.kiyo9w.dev` vs `StoremindAPI`: answer "unverified — deployment-identity risk."
4. Any request for credentials, deploys, deep refactoring, or LLM ranking/authorization: refuse.
