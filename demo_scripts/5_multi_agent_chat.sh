#!/bin/bash
# 5. Multi-Agent Chat Test
# Sends a query to the AgentOrchestrator (Manager/Stocker/Planner/Reviser)

PLAN_DATE=$(grep -o '"date":"[^"]*"' demo_scripts/output_plan.json | cut -d'"' -f4 | head -n 1)

curl -s -X POST http://localhost:5200/api/manager/chat \
-H "Content-Type: application/json" \
-d "{
  \"message\": \"I'm worried about the expiring Milk. Can you ask the Stocker if we should run a 20% discount instead of ordering 20 more?\",
  \"plan_date\": \"$PLAN_DATE\"
}" > demo_scripts/output_agent_chat.json
echo "Multi-agent response received: demo_scripts/output_agent_chat.json"
