#!/bin/bash
# 4. Explain Fact (Check Price)
PLAN_ID=$(grep -o '"plan_id":"[^"]*"' demo_scripts/output_plan.json | cut -d'"' -f4 | head -n 1)

curl -s -X POST http://localhost:5200/api/manager/explain \
-H "Content-Type: application/json" \
-d "{
  \"question\": \"Based on the inventory data, which items are currently under the 10-unit safety stock threshold?\",
  \"plan_id\": \"$PLAN_ID\"
}" > demo_scripts/output_stock.json
echo "Stock facts retrieved: demo_scripts/output_stock.json"
