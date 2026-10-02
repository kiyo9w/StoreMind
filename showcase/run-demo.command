#!/bin/bash
# Double-click to start the demo (macOS). Works with no network.
cd "$(dirname "$0")"
exec python3 serve.py 8080
