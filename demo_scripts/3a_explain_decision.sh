#!/bin/bash
# 3. Explain Reasoning (Why 32 units?)
# Requires a plan_id (extract from previous step or just use latest)
PLAN_ID=$(grep -o '"plan_id":"[^"]*"' demo_scripts/output_plan.json | cut -d'"' -f4 | head -n 1)

curl -s -X POST http://localhost:5200/api/manager/explain \
-H "Content-Type: application/json" \
-d "{
  \"question\": \"Explain the reasoning behind the order for MILK-001.\",
  \"plan_id\": \"$PLAN_ID\"
}" > demo_scripts/output_reasoning.json
echo "Reasoning explained: demo_scripts/output_reasoning.json"
