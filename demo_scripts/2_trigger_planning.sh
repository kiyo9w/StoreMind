#!/bin/bash
# 2. Trigger Planning
curl -s -X POST http://localhost:5200/api/manager/run-planning > demo_scripts/output_plan.json
echo "Plan generated: demo_scripts/output_plan.json"
