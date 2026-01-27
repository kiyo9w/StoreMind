---
description: Deploy and run the StoreMind 2026 heterogeneous agent stack
---

# StoreMind Agent Deployment (2026 Architecture)

This workflow describes how to configure and run the updated heterogeneous multi-agent system.

## Prerequisites

1.  **Groq API Key**: You need a Groq API key (or compatible OpenAI-format key) for the Llama 3.3 70B specialists.
2.  **OpenAI/Azure Key**: For the GPT-5.2 (Manager) model.

## Configuration

Update `appsettings.json` or Environment Variables:

```json
{
  "StoreMind": {
    "GroqApiKey": "your-groq-key",
    "ManagerModelId": "gpt-5.2", // or "claude-3-5-sonnet-20240620" via shim
    "SpecialistModelId": "llama-3.3-70b-versatile",
    "Orchestration": {
      "MaxIterations": 15
    }
  }
}
```

## Running the System

Start the service:

```powershell
dotnet run --project src/Kiyo9w.StoreMind.Service
```

## Architecture Overview

1.  **Manager (Tier 1)**: Receives user request, thinks in `<thinking>` block, delegates to specialists.
2.  **Specialists (Tier 2)**:
    *   `InventorySpecialist` (Llama 3): Queries stock, expiry.
    *   `PlanningSpecialist` (Llama 3): Modifies purchase orders using `PlanningPlugin`.
3.  **Critic (Reflexion)**: `OperationsCritic` reviews the Manager's proposed answer before it is released.
4.  **Termination**: Conversation ends only when Manager outputs `<status>ready_to_respond</status>`.

## Troubleshooting

-   **Infinite Loops**: If the agents keep talking, the `IntentAwareTerminationStrategy` has a hard cap of 8 manager turns.
-   **Bad Routing**: Check the `AgentOrchestrator.cs` selection prompt.
