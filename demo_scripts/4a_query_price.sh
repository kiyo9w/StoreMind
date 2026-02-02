#!/bin/bash
# 4. Explain Fact (Check Price)
PLAN_ID=$(grep -o '"plan_id":"[^"]*"' demo_scripts/output_plan.json | cut -d'"' -f4 | head -n 1)

curl -s -X POST http://localhost:5200/api/manager/explain \
-H "Content-Type: application/json" \
-d "{
  \"question\": \"What is the current supplier price for MILK-001 vs BREAD-001?\",
  \"plan_id\": \"$PLAN_ID\"
}" > demo_scripts/output_price.json
echo "Price fact retrieved: demo_scripts/output_price.json"
