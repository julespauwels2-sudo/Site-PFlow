# Plan de la refonte de pflow.fr (branche `refonte-conversion`)

Objectif : transformer un maximum de restaurateurs (venus d'Instagram, sur téléphone) en prospects.
Source de vérité : `CHARTE.md` (couleurs, typos, P bulle, ton) + la direction artistique validée sur maquette.

## Règles respectées
- Branche `refonte-conversion` uniquement. Rien sur `main`, aucun déploiement en production, aucun merge.
- `/demo` n'est **pas modifiée** (fichier `demo.html` intact, polices Fredoka/Manrope conservées pour elle).
- Toutes les URL existantes restent servies à l'identique : `/demo`, `/alternative-uber-eats`, `/commande-whatsapp-restaurant`, `/commande-en-ligne-pizzeria`, `/commande-en-ligne-restaurant-guadeloupe`, `/commande-en-ligne-restaurant-martinique`, `/cgv`, `/confidentialite`, `/suppression-donnees`, `/test`, `/site/*`, `/reviews`, `/r/*` (rewrites de `vercel.json` inchangés).
- Site statique (HTML + CSS + un peu de JS natif). Aucune librairie, aucun framework, aucun build.

## Fichiers touchés

| Fichier | Action |
|---|---|
| `PLAN_SITE.md` | nouveau (ce fichier) |
| `CHARTE.md` | ajouté au repo (copie de la charte fournie) |
| `index.html` | **réécrit** : nouvelle page d'accueil (9 blocs + barre mobile). La balise `facebook-domain-verification` est conservée. |
| `calcul.html` | **nouveau** : page `/calcul` (mot-clé Instagram CALCUL) |
| `mentions-legales.html` | réécrit dans la nouvelle DA, même contenu, mêmes infos (lues dans `infos-legales.js`), phrase sur la mesure d'audience corrigée (Vercel Web Analytics est déjà actif) |
| `css/site.css` | nouveau : styles communs (accueil, calcul, mentions), versionné `?v=N` et mis en cache long |
| `js/site.js` | nouveau : événements Vercel Analytics, barre mobile, calculateur, vidéos en différé |
| `fonts/anton-400.woff2`, `fonts/pjs-700.woff2`, `fonts/pjs-800.woff2` | nouveaux (SIL OFL, sous-ensemble latin, accents et € compris) |
| `img/p-bulle-120.webp`, `-240`, `-356` | nouveau : le P bulle détouré (provisoire, voir rapport) |
| `og-accueil.jpg`, `og-calcul.jpg` | nouvelles images de partage 1200×630 dans la nouvelle DA |
| `videos/LISEZMOI.txt`, `img/LISEZMOI.txt` | où déposer les vidéos clients, la vidéo du parcours et la photo de Jules |
| `sitemap.xml` | ajout de `/calcul`, dates mises à jour |
| `robots.txt` | inchangé sur le fond (tout est autorisé, lien vers le sitemap) |
| `vercel.json` | ajout du cache long pour `/img/*`, `/css/*`, `/js/*`, `/videos/*` (rewrites et en-têtes existants inchangés) |
| `RAPPORT_SITE.md` | nouveau, à la fin |

Non touchés : `demo.html`, `cgv.html`, `confidentialite.html`, `suppression-donnees.html`, les 5 pages SEO, `test.html`, `site/`, `infos-legales.js`, `og-image.png`, `og-demo.png`, logos et favicons.

## Structure de la page d'accueil (mobile d'abord, 390 px)

En-tête : P bulle + pill « PFLOW ORDER » à gauche, bouton « Tester la démo » à droite. Pas de menu.

1. **Haut de page** (nuit) : pill « Restaurants de Guadeloupe », H1 « VOS CLIENTS COMMANDENT **SANS APPELER** », sous-titre, bouton « Tester la démo » (`/demo`), lien « Nous écrire sur WhatsApp », « À partir de 49 €/mois · 0 % de commission · sans engagement », ligne de preuve (3 clients). Ticket « NOUVELLE COMMANDE #128 » (crème, dentelé, incliné) à droite / en dessous sur mobile.
2. **Problème** (rose) : « LE RUSH, **VOUS CONNAISSEZ** » + 3 cartes nuit.
3. **Solution** (nuit) : « AVEC PFLOW, **C'EST SIMPLE** » + 3 étapes + « Pas d'appli à installer… » + emplacement vidéo du parcours (image en attendant).
4. **Uber Eats ou PFlow** (#141D4F) : 2 cartes + mini-calculateur (estimation) + bouton démo.
5. **Livraison** (bleu) : « PAS DE LIVREUR ? **ON LIVRE** » + « Nouveau à Jarry et Baie-Mahault ».
6. **Preuves** (nuit) : « ILS L'UTILISENT **DÉJÀ** » + 3 vidéos verticales en différé (emplacements si absentes) + emplacement phrase client + bouton démo.
7. **Prix** (#141D4F) : carte blanche « 49 €/mois » + « + options selon vos besoins » + inclus + options avec prix (fichier `offre.js`) + bouton démo.
8. **FAQ** (nuit) : 4 accordéons natifs (`<details>`), sans JS.
9. **Fin** (rose) : « TESTEZ EN **30 SECONDES** » + emplacement photo de Jules + les deux boutons.
- Barre collée en bas sur mobile (« Tester la démo » + WhatsApp), visible après le haut de page.

Sur fond rose ou bleu, le texte est nuit ; le segment d'accent du titre est rose dans une box nuit inclinée (composant « box inclinée » de la charte), pour garder « un seul segment rose » sans texte blanc.

## Mesure (Vercel Web Analytics)
Script `/_vercel/insights/script.js` (déjà utilisé). Événements : `clic_demo`, `clic_whatsapp`, `calcul_utilise`, chacun avec `emplacement` ∈ {hero, barre_mobile, calcul, preuves, prix, final} (+ `entete` pour le bouton du haut, `solution`/`livraison` non utilisés). Les paramètres UTM de l'adresse sont transmis aux liens `/demo`.

## SEO
Title/description ciblant « prise de commande WhatsApp restaurant Guadeloupe » et « alternative Uber Eats Guadeloupe », un seul H1 par page, JSON-LD Organization + Product/Offer 49 €, OG, canonical, sitemap avec `/calcul`.

## Performance
Aucune image dans le haut de page à part le P (8 Ko) : le LCP est le titre en Anton (police préchargée, 18 Ko). Une seule feuille de style (≈20 Ko) et un seul script différé, vidéos chargées seulement à l'approche (`preload="none"` + poster), `font-display: swap`.
