#!/bin/bash
# 1. Run Service (Background)
pkill -f Kiyo9w.StoreMind.Service || true
dotnet run --project src/Kiyo9w.StoreMind.Service/Kiyo9w.StoreMind.Service.csproj --no-build -- --environment Development --urls "http://localhost:5200" > /dev/null 2>&1 &
echo "Service starting on http://localhost:5200 (Background PID: $!)"
