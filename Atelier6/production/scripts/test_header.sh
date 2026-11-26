#!/usr/bin/env bash
# Envoie 20 requêtes au service derrière Traefik.
# Usage : ./test_header.sh [URL]   (par défaut : http://localhost:80/)
URL="${1:-http://localhost:80/}"

for i in {1..20}; do
  curl -s -D - "$URL" -o /dev/null | grep -i HTTP
done
