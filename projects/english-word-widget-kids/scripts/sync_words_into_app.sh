#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cp "$ROOT/data/words.json" "$ROOT/app/EnglishWordKids/Resources/words.json"
echo "Synced data/words.json -> app/EnglishWordKids/Resources/words.json"
