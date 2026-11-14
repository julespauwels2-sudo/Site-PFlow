#!/usr/bin/env bash
# Signale à Bing (et aux autres moteurs IndexNow) toutes les pages du sitemap.
# À lancer APRÈS la mise en ligne sur www.pflow.fr (pas sur une prévisualisation) :
#   bash scripts/indexnow.sh
# La clé est vérifiée par Bing grâce au fichier https://www.pflow.fr/56805f00c3689eb0819d45f54f421434.txt
set -euo pipefail
CLE="56805f00c3689eb0819d45f54f421434"
HOTE="www.pflow.fr"
URLS=$(curl -fsS "https://$HOTE/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's#</\?loc>##g' | sed 's/.*/"&"/' | paste -sd, -)
curl -fsS -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOTE\",\"key\":\"$CLE\",\"keyLocation\":\"https://$HOTE/$CLE.txt\",\"urlList\":[$URLS]}" \
  -w "Réponse IndexNow : %{http_code} (200 ou 202 = reçu)\n"
