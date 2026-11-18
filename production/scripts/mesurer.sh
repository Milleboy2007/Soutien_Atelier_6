#!/usr/bin/env bash
# Usage : ./scripts/mesurer.sh [nombre de requêtes]
N="${1:-100}"
for i in $(seq 1 "$N"); do
  curl -s -o /dev/null -D - http://localhost/ | grep -i -E '^HTTP|^x-version' | tr -d '\r' | paste -sd' ' -
done | sort | uniq -c
