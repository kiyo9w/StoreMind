#!/bin/bash
# Rebuild dist/app.js + offline.html — a single-script bundle that runs from file://
# (no server). Needs node + esbuild:  npm i -g esbuild   (or: npx esbuild)
# Run this after ANY source edit, and before the talk.
set -e
cd "$(dirname "$0")/.."
ESB="${ESBUILD:-npx --yes esbuild}"
$ESB js/main.js --bundle --minify --format=iife --target=es2020 --outfile=dist/app.js \
  --alias:three=./vendor/three/three.module.js --alias:three/addons=./vendor/three/addons --log-level=warning
python3 - <<'PY'
import re
s=open('index.html').read()
s=re.sub(r'<script type="importmap">.*?</script>\n','',s,flags=re.S)
s=s.replace('<script type="module" src="js/main.js"></script>','<script src="dist/app.js"></script>')
s=s.replace('<title>StoreMind</title>','<title>StoreMind (offline build)</title>')
open('offline.html','w').write(s)
PY
echo "built dist/app.js ($(du -h dist/app.js | cut -f1)) and offline.html"
