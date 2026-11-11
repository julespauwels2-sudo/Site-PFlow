# Rapport : refonte de pflow.fr (branche `refonte-conversion`)

Date : 11 novembre 2026. Rien n'a été mergé, rien n'est en production : pflow.fr est inchangé.

## Liens de prévisualisation (Vercel)

- **Toujours la dernière version de la branche :** https://pflow-site-v7-git-refonte-conversion-pflow.vercel.app
- Ce déploiement précis (commit `74fa961`) : https://pflow-site-v7-q0qi4evbm-pflow.vercel.app
- Pages à regarder : `/` · `/calcul` · `/mentions-legales` · `/demo` (inchangée)

Si Vercel demande de se connecter, c'est la protection des prévisualisations : connectez-vous avec votre compte Vercel.
Pour publier plus tard : merger `refonte-conversion` dans `main` après validation (je ne l'ai pas fait).

## Ce qui a été fait

**Page d'accueil (réécrite, mobile d'abord, vérifiée à 390 px, aucun défilement horizontal)**
En-tête sans menu : P bulle + pill « PFLOW ORDER » + bouton « Tester la démo ». Puis les 9 blocs, dans l'ordre demandé :
1. Haut de page (nuit) : pill, titre « VOS CLIENTS COMMANDENT **SANS APPELER** » (le seul H1), sous-titre, bouton démo, lien WhatsApp avec message pré-rempli, ligne prix, ligne de preuve, ticket « NOUVELLE COMMANDE #128 » (crème, bord dentelé, incliné, ombre plate).
2. Problème (rose) : 3 cartes nuit.
3. Solution (nuit) : 3 étapes, « Pas d'appli à installer », téléphone avec un écran de commande dessiné en attendant la vidéo.
4. Uber Eats ou PFlow (#141D4F) : 2 cartes + mini-calculateur (30 % par défaut, marqué « Estimation ») + bouton démo + lien vers `/calcul`.
5. Livraison (bleu) : « PAS DE LIVREUR ? **ON LIVRE** » + « Nouveau à Jarry et Baie-Mahault ».
6. Preuves (nuit) : 3 emplacements de réels (chargés seulement à l'approche, emplacement visible tant que le fichier manque), emplacement phrase client, bouton démo.
7. Prix (#141D4F) : carte blanche 49 €/mois + inclus + options + bouton démo.
8. FAQ (nuit) : 4 accordéons, sans script.
9. Fin (rose) : « TESTEZ EN **30 SECONDES** », cadre photo incliné, « Une question ? Jules vous répond directement. », les deux boutons.
- Barre collée en bas sur mobile (démo + WhatsApp) : elle apparaît après le haut de page et se cache sur le bloc final (pour ne pas doubler les boutons).

**Page `/calcul`** : commandes par mois (200), panier moyen (20 €), commission (30 %), valeurs d'exemple signalées. Résultat par mois, par an, coût PFlow sur un an et « vous gardez X € par an » (message adapté si la commission coûte moins de 49 €). Un seul bouton « Tester la démo ». Indexée, dans le sitemap.

**Mentions légales** : même contenu, nouvelle DA, infos toujours lues dans `infos-legales.js` (toutes remplies). Une phrase corrigée : l'ancienne disait « aucun outil de mesure d'audience », or Vercel Web Analytics est actif ; elle dit maintenant qu'il fonctionne sans cookie.

**Direction artistique** : fonds en aplat (nuit, #141D4F, rose, bleu), aucun dégradé ni halo, ombres plates `rgba(0,0,0,.28)`, Anton majuscules et Plus Jakarta Sans 700/800 auto-hébergées, un seul segment rose par titre. Sur fond rose ou bleu, le texte est nuit et le segment d'accent est en rose dans une box nuit inclinée (composant « box inclinée » de la charte), pour ne jamais mettre de texte blanc sur rose ou bleu.

**Mesure (Vercel Web Analytics)** : `clic_demo`, `clic_whatsapp`, `calcul_utilise`, chacun avec `emplacement` (hero, barre_mobile, calcul, preuves, prix, final). J'ai ajouté `entete` pour le bouton du haut de l'écran, pour le distinguer de celui du hero. `calcul_utilise` part une seule fois par visite, 1,2 s après la dernière saisie. Testé : chaque bouton envoie le bon événement. Les paramètres UTM de l'adresse (ex. `?utm_source=instagram`) sont transmis aux liens `/demo`.

**SEO local** : title « Prise de commande WhatsApp pour restaurant en Guadeloupe | PFlow », description avec « alternative à Uber Eats en Guadeloupe », un seul H1 par page, données structurées Organization + Product/Offer à 49 €/mois + FAQPage, canonical, images de partage dans la nouvelle DA (`og-accueil.jpg`, `og-calcul.jpg`), `sitemap.xml` à jour (`/calcul` ajoutée, `/suppression-donnees` ajoutée), `robots.txt` déjà correct (tout autorisé + sitemap).

**Ce qui n'a pas bougé** : `/demo` (fichier identique à `main`), les 5 pages SEO, `/cgv`, `/confidentialite`, `/suppression-donnees`, `/test`, `/site/*`, les rewrites `/reviews` et `/r/*`, les logos et favicons. La balise de vérification Facebook de l'accueil est conservée. Les pages SEO pointent vers `/#tarifs`, `/#faq` et `/#solution` : ces ancres existent toujours. Toutes les anciennes URL répondent en 200 (vérifié).

## Scores Lighthouse (mobile, 4G simulée)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | FCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 96 | 100 | 1,4 s | 0,8 s | 0 | 0 ms |
| `/calcul` | 100 | 100 | 96 | 100 | 1,5 s | 0,8 s | 0 | 0 ms |
| `/mentions-legales` | 100 | 100 | 96 | 100 | 1,2 s | 0,9 s | 0,018 | 0 ms |

Objectif LCP < 2,5 s : atteint. Mesuré en local (Lighthouse 12) sur exactement les mêmes fichiers : cette session ne peut pas joindre les adresses `vercel.app`. Le 96 en bonnes pratiques vient uniquement du script Vercel Analytics, absent en local (sur la prévisualisation, il répond bien). À refaire sur la prévisualisation depuis Chrome (Outils de développement, onglet Lighthouse, « Mobile ») pour confirmer.

Poids de l'accueil au premier affichage : environ 90 Ko (HTML, CSS, 3 polices, P bulle, script). Les vidéos ne se téléchargent que quand le visiteur arrive sur le bloc.

## Ce que vous devez fournir

Tant qu'un élément manque, le site affiche son emplacement [entre crochets] : rien ne casse.

1. **Les 3 réels clients** (vertical 9:16, MP4, moins de 4 Mo chacun) + une image d'aperçu WebP pour chacun, dans `videos/` :
   `cookies-an-nou.mp4` + `.webp`, `mexico.mp4` + `.webp`, `ag-pizza.mp4` + `.webp`.
2. **La vidéo courte du parcours de commande** (enregistrement d'écran, sans son, en boucle) : `videos/parcours.mp4` + `videos/parcours.webp`. Uniquement des écrans de démo, aucune vraie donnée de client.
3. **Votre photo** pour le bloc final : `img/jules.webp`, portrait 4:5, 800 × 1000 px.
4. **Une phrase d'un client** (texte exact + prénom + restaurant, avec son accord) : à mettre dans `index.html`, bloc « citation ».
5. **Le vrai P bulle** (`img/charte/p-bulle.png` du CRM) : je n'ai pas pu ouvrir le dépôt du CRM (accès refusé dans cette session). En attendant, le P est détouré automatiquement depuis `favicon-512.png` (rendu propre, mais à remplacer par l'original). Voir `img/LISEZMOI.txt`.
6. **Infos légales** : aucune ne manque dans les mentions légales (éditeur, forme, adresse, SIRET, immatriculation, TVA, e-mail, téléphone, directeur de la publication, hébergeur). Mais **les CGV ne correspondent plus à l'offre affichée**, à mettre à jour (je n'y ai pas touché) :
   - les CGV prévoient **390 € de mise en place** (290 € offre fondateur), le site dit « **sans frais d'installation** » ;
   - les CGV décrivent 3 formules (Socle 49 €, Croissance 69 €, Tout compris 99 €) et d'autres prix d'options ; le site affiche 49 €/mois + options ;
   - l'option **livraison dès 59 €/mois** (Jarry, Baie-Mahault) n'existe pas dans les CGV.
   - La politique de confidentialité ne cite pas Vercel Web Analytics (mesure d'audience sans cookie) : une ligne à ajouter.
7. **Le prix des options** gestion du stock, relance des paniers et avis Google : le site les liste sans prix. Donnez-les si vous voulez les afficher.

## Points à valider

- **FAQ** : les réponses s'appuient sur les CGV (sans engagement, arrêt à la fin du mois en cours) et la charte (installation faite pour vous). Relisez-les.
- **Étape 2** : « Le client choisit sur votre carte » au lieu de « il choisit » (règle de la charte : « le client », jamais « il » seul).
- **Incohérence existante** : `/demo` affiche « Déjà utilisé par 5 restaurants » et la bio Instagram « 5 restos déjà équipés », alors que l'accueil cite 3 clients. Je n'ai pas modifié `/demo` (consigne), à harmoniser de votre côté.
- **Événements personnalisés Vercel** : selon votre offre Vercel, les événements personnalisés peuvent demander un abonnement payant. Vérifiez dans le tableau de bord (Analytics > Events) qu'ils apparaissent après quelques clics sur la prévisualisation.
- Après chaque modification de `css/site.css` ou `js/site.js`, augmenter le `?v=1` dans les pages HTML (ces fichiers sont mis en cache un an).

## Fichiers

Nouveaux : `PLAN_SITE.md`, `RAPPORT_SITE.md`, `CHARTE.md`, `calcul.html`, `css/site.css`, `js/site.js`, `fonts/anton-400.woff2`, `fonts/pjs-700.woff2`, `fonts/pjs-800.woff2`, `img/p-bulle-*.webp`, `img/LISEZMOI.txt`, `videos/LISEZMOI.txt`, `og-accueil.jpg`, `og-calcul.jpg`.
Modifiés : `index.html`, `mentions-legales.html`, `sitemap.xml`, `vercel.json` (cache long pour `/css`, `/js`, `/img`, `/videos`).
