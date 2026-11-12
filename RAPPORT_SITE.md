# Rapport : refonte de pflow.fr (branche `refonte-conversion`)

Première version le 11 novembre 2026, corrections le 12 novembre 2026 (section « Corrections » plus bas). Rien n'a été mergé, rien n'est en production : pflow.fr est inchangé.

## Liens de prévisualisation (Vercel)

- **Toujours la dernière version de la branche :** https://pflow-site-v7-git-refonte-conversion-pflow.vercel.app
- Pages à regarder : `/` · `/calcul` · `/mentions-legales` · `/cgv` · `/confidentialite` · `/demo` (seul le texte des clients a changé)

Si Vercel demande de se connecter, c'est la protection des prévisualisations : connectez-vous avec votre compte Vercel.
Pour publier plus tard : merger `refonte-conversion` dans `main` après validation (je ne l'ai pas fait).

## Ce qui a été fait (première version, 11 novembre)

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

**Ce qui n'a pas bougé** : `/suppression-donnees`, les rewrites `/reviews` et `/r/*`, le logo complet. (`/demo`, les pages SEO, `/cgv`, `/confidentialite`, `/test`, `/site/*` et les favicons ont été touchés le 12 novembre, voir « Corrections ».) La balise de vérification Facebook de l'accueil est conservée. Les pages SEO pointent vers `/#tarifs`, `/#faq` et `/#solution` : ces ancres existent toujours. Toutes les anciennes URL répondent en 200 (vérifié).

## Scores Lighthouse (mobile, 4G simulée), après les corrections du 12 novembre

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | FCP | Speed Index | CLS | TBT |
|---|---|---|---|---|---|---|---|---|---|
| `/` (avec l'intro) | 100 | 100 | 96 | 100 | 1,5 s | 0,8 s | 0,9 s | 0 | 0 ms |
| `/calcul` | 100 | 100 | 96 | 100 | 1,4 s | 0,8 s | 0,8 s | 0 | 0 ms |
| `/mentions-legales` | 100 | 100 | 96 | 100 | 1,2 s | 0,9 s | 0,9 s | 0 | 0 ms |

- L'accueil a été mesuré comme un premier visiteur : l'intro passe pendant la mesure (vérifié sur la pellicule de Lighthouse). L'élément LCP reste le titre H1, chargé derrière l'intro. Objectif « performance > 90 avec les animations » : atteint (100).
- Mesuré en local (Lighthouse 12) sur exactement les mêmes fichiers. Le 96 en bonnes pratiques vient seulement du script Vercel Analytics, absent en local ; sur la prévisualisation, il répond bien.

## Corrections (12 novembre 2026)

### 1. L'offre
- Mention courte partout : **« À partir de 49 €/mois · 0 % de commission · sans engagement »** : sous les boutons du haut, dans la barre mobile (nouvelle petite ligne au-dessus des boutons), dans les 5 pages SEO (bandeau, descriptions, FAQ, données structurées), dans les données structurées de l'accueil (`Offer` avec `price` 49, `minPrice` 49 et la description « à partir de… options en plus »).
- Carte prix : **« 49 €/mois »** en grand, juste dessous **« + options selon vos besoins »**, puis « 0 % de commission, y compris sur les options · sans engagement · sans frais de mise en place ».
- Inclus dans les 49 € : commandes sur WhatsApp, carte en ligne aux couleurs du resto, paiement en ligne (SumUp ou Stripe), espace de gestion (suivi des commandes, modification de la carte et des prix), installation faite par nous.
- Options avec leurs prix : livraison, gestion du stock, relance des paniers, avis Google. **Les prix se changent dans un seul fichier : `offre.js`** (à la racine). Il alimente la carte prix de l'accueil et l'article 4 des CGV. « sur demande » s'affiche « prix sur demande ». Tant qu'un prix reste `[PRIX_…]`, le site affiche « [prix à venir] ». Ce fichier n'est pas mis en cache : un changement est visible tout de suite après déploiement.
- Carte « PFlow » du comparatif : « À partir de 49 € par mois. Sans commission. » (l'ancien « c'est tout » contredisait les options). Calculateurs : « Avec PFlow : à partir de 49 € » ; sur `/calcul`, le calcul annuel précise « hors options ».
- **Recherche dans tout le repo** : plus aucune mention de 390 €, 290 €, offre Fondateur, offre de lancement, ni formules Socle / Croissance / Tout compris (69 € et 99 €), en dehors du présent rapport (passages des CGV « avant » ci-dessous). Les deux anciennes copies du vieux site (`test.html` et le dossier `site/`), qui contenaient encore ces offres, ont été **supprimées**. Leurs adresses (`/test`, `/site`, `/site/…`) **redirigent** vers les pages actuelles (vérifié sur la prévisualisation). Elles restent dans l'historique git si besoin.
- Pages SEO, en plus des prix : la FAQ Instagram ne parle plus de « formule Tout compris » (réponse : « Les commandes arrivent par WhatsApp et par votre carte en ligne. Vous pouvez mettre le lien de votre carte dans votre bio Instagram : vos abonnés commandent en un clic. ») ; la page pizzeria ne cite plus le programme de fidélité (« En option, PFlow relance automatiquement les paniers oubliés et demande un avis Google après chaque commande. ») ; « Je peux changer mon menu moi-même ? » dit désormais oui, via l'espace de gestion ; la page Martinique liste les 5 éléments inclus dans l'abonnement.

### 2. CGV : passages modifiés, mot pour mot

Seuls l'article 2 (puces « Abonnement mensuel » et « Options »), l'article 4 (Prix) et la date ont changé. Aucune autre clause n'a été touchée.

**Date**
- Avant : « Dernière mise à jour : 1er octobre 2026 »
- Après : « Dernière mise à jour : 12 novembre 2026 »

**Article 2, puce « Abonnement mensuel »**
- Avant : « **Abonnement mensuel**, selon la formule choisie (Socle, Croissance ou Tout compris) : hébergement, fonctionnement du service, maintenance et support. Toutes les formules incluent le paiement en ligne et la gestion de la livraison assurée par les propres livreurs du Client (zones, frais, minimum de commande). »
- Après : « **Abonnement mensuel de base** : prise de commande sur WhatsApp, carte en ligne aux couleurs de l'établissement, paiement en ligne (SumUp ou Stripe), espace de gestion permettant au Client de suivre ses commandes et de modifier sa carte et ses prix, installation réalisée par PFlow, ainsi que l'hébergement, le fonctionnement du service, la maintenance et le support. »

**Article 2, puce « Options »**
- Avant : « **Options** : relance des paniers abandonnés, invitation à laisser un avis Google, programme de fidélité, réponses sur Instagram et Messenger, mini-site, et, dès leur disponibilité, campagnes WhatsApp et livraison déléguée à un service de coursiers (Uber Direct). Les récompenses accordées dans le cadre du programme de fidélité sont définies et financées par le Client. »
- Après : « **Options**, souscrites au choix du Client et facturées en plus de l'abonnement de base : livraison, gestion du stock, relance des paniers abandonnés et invitation à laisser un avis Google. »

**Article 4, liste des prix**
- Avant :
  - « Création et mise en place : 390 €, paiement unique. »
  - « Offre Fondateur : 290 € au lieu de 390 € pour la mise en place, réservée aux 10 premiers établissements clients, dans la limite des places disponibles au jour de la commande. »
  - « Formule Socle : 49 € par mois. »
  - « Formule Croissance : 69 € par mois (Socle, relance des paniers abandonnés et avis Google). »
  - « Formule Tout compris : 99 € par mois (Croissance, programme de fidélité, réponses sur Instagram et Messenger, mini-site, ainsi que les campagnes WhatsApp dès leur disponibilité, sans supplément). »
  - « Options à la carte : relance des paniers 29 € par mois ; avis Google 19 € par mois ; programme de fidélité 19 € par mois ; réponses sur Instagram et Messenger 90 €, une fois ; mini-site 149 €, une fois, puis 9 € par mois. »
  - « Options annoncées « bientôt » : campagnes WhatsApp 39 € par mois, 150 messages inclus, les messages au-delà étant facturés au coût de la messagerie ; livraison déléguée 150 €, une fois, puis 39 € par mois. Elles ne peuvent être commandées qu'à partir de leur mise à disposition. »
- Après :
  - « Abonnement de base : 49 € par mois. »
  - « Création et mise en place : sans frais. »
  - « Options, facturées en plus de l'abonnement de base : livraison : [prix] ; gestion du stock : [prix] ; relance des paniers : [prix] ; avis Google : [prix]. » (chaque [prix] vient de `offre.js` ; aujourd'hui il s'affiche « [prix à venir] »)

**Article 4, paragraphe sous la liste**
- Avant : « … PFlow ne prélève **aucune commission** sur les ventes du Client. Les frais facturés par des services tiers (prestataire de paiement en ligne, coûts éventuels de la messagerie WhatsApp Business, course facturée par le service de livraison déléguée) restent à la charge du Client et sont précisés au devis. … »
- Après : « … PFlow ne prélève **aucune commission** sur les ventes du Client, y compris sur les commandes passées avec les options. Les frais facturés par des services tiers (prestataire de paiement en ligne, coûts éventuels de la messagerie WhatsApp Business) restent à la charge du Client et sont précisés au devis. … » (le début, « Les prix sont exprimés en euros, … », et la fin, sur l'évolution des prix avec 30 jours de préavis, sont inchangés)

**À relire de votre côté (clauses non touchées, comme demandé, mais qui parlent encore de frais de mise en place) :**
- Article 3 : « … et, le cas échéant, le paiement des frais de mise en place. » (reste juste grâce à « le cas échéant », mais devient inutile)
- Article 5 : « Les frais de mise en place sont payables à la commande. » (ces frais n'existent plus)
- Article 6 : « Les sommes versées pour la mise en place correspondent à un travail réalisé et ne sont pas remboursables une fois celui-ci commencé. »
- L'option **livraison** (PFlow livre à Jarry et Baie-Mahault) pourrait demander une clause sur la responsabilité pendant la livraison : à voir avec un juriste.
- Avant, l'abonnement incluait « la gestion de la livraison assurée par les propres livreurs du Client » ; la nouvelle liste des inclus ne la cite plus. Si c'est toujours inclus, dites-le et je l'ajoute.

### 3. Clients affichés
- Partout : **Cookies an nou, Mexico et AG Pizza**, sans ville. Accueil : « Déjà en place chez Cookies an nou, Mexico et AG Pizza. » ; « Sainte-Rose » retiré sous le réel Mexico ; page SEO Guadeloupe : « Déjà en place chez Cookies an nou, Mexico et AG Pizza. » (elle ne citait que Cookies An Nou).
- `/demo` : seule ligne modifiée (vérifié par comparaison avec `main`) : « Déjà utilisé par **5 restaurants** en Guadeloupe » devient « Déjà en place chez **Cookies an nou, Mexico et AG Pizza** ».
- Les données structurées ne citaient aucun client : rien à changer.
- Hors site : `CHARTE.md` (copie de la charte du CRM) dit encore « Mexico (Sainte-Rose) » et contient la bio Instagram « 📍 5 restos déjà équipés en Guadeloupe ». Je ne l'ai pas modifiée, mais **la bio Instagram est à changer**.

### 4. Politique de confidentialité
- Vérifié sur la doc officielle de Vercel : https://vercel.com/docs/analytics/privacy-policy (consultée le 12/11/2026 ; j'ai autorisé `vercel.com` dans le réseau de votre environnement cloud « Site pflow » pour pouvoir la lire). Ce que dit la doc :
  - « without using any third-party cookies, instead end users are identified by a hash created from the incoming request » ; « The lifespan of a visitor session is not stored permanently, it is automatically discarded after 24 hours » ;
  - « The recording of data points (for example, page views or custom events) is anonymous, so you have insight into your data without it being tied to or associated with any individual, customer, or IP address » ;
  - « By default, Vercel Web Analytics allows you to use only aggregated data that can not identify or re-identify customers' end users » ;
  - données enregistrées : date et heure, URL, chemin, site d'origine, paramètres d'URL filtrés, localisation (pays, région, ville), système, navigateur, type d'appareil, version du script.
- Nuance : la doc parle de « cookies tiers ». J'ai vérifié le script réellement servi par votre site : il ne dépose aucun cookie par défaut (une option cookie existe, `enableCookie`, que le site n'active pas). La phrase « sans cookie » est donc exacte pour votre configuration.
- Ligne ajoutée à l'article 12 (date de mise à jour passée au 12 novembre 2026) : « Le Site mesure son audience avec **Vercel Web Analytics** (Vercel Inc.). Cette mesure est **anonyme et agrégée** : elle fonctionne sans cookie et ne recueille aucune donnée permettant d'identifier un visiteur. Les informations enregistrées se limitent à la page consultée, au site d'origine de la visite, à la localisation approximative (pays, région, ville), au type d'appareil, au système et au navigateur, ainsi qu'à certains clics sur le Site (par exemple le bouton « Tester la démo » et son emplacement dans la page). Les visites sont comptées grâce à une empreinte technique calculée à partir de la requête, effacée automatiquement au bout de 24 heures ; elle n'est liée ni à votre identité ni à votre adresse IP. »
- **Important, même page de doc Vercel (« Custom Events ») : les événements personnalisés (`clic_demo`, `clic_whatsapp`, `calcul_utilise`) ne sont disponibles que sur les offres Pro et Enterprise.** Sur l'offre gratuite (Hobby), seules les pages vues sont comptées. Je n'ai pas pu lire l'offre de votre équipe Vercel « Pflow » : vérifiez dans Vercel > Settings > Billing.

### 5. Logo (P bulle)
- Le `p-bulle.png` n'était pas dans `img/` du dépôt. J'ai utilisé l'image du P jointe à votre message (déjà détourée), enregistrée dans `img/p-bulle.png`, puis déclinée en WebP (96, 120, 240 et 356 px) pour l'en-tête, l'intro et le pied de page.
- Favicons refaits (P sur fond nuit) : `favicon.ico`, `favicon-48/96/192/512.png`, `apple-touch-icon.png`. Ils s'appliquent à tout le domaine, `/demo` et pages SEO comprises (ce sont des fichiers communs, pas le contenu de `/demo`).
- Images de partage régénérées avec le vrai P et « À partir de 49 €/mois » : `og-accueil.jpg`, `og-calcul.jpg`. Non touchées : `og-image.png` (pages SEO, logo complet, pas de prix) et `og-demo.png` (`/demo`).

### 6. FAQ
Les 4 réponses ont été remplacées mot pour mot par les vôtres (accordéons et données structurées FAQPage). La 2e question suit votre formulation : « Mes clients doivent installer quelque chose ? ».

### 7. Intro
- Reprise de l'intro du site actuel (bulle client « Bonsoir, je peux commander pour ce soir ? », réponse « Bien sûr ! Commande #128 confirmée… », le P, une phrase), dans la nouvelle DA (fond nuit en aplat, bulles bleu et blanc, Anton, barre de progression rose).
- **Moins de 3 s** (fermeture à 2,55 s, sortie en 0,4 s) ; bouton **« Passer »** visible dès la première image, en haut à droite ; **une seule fois par visite** (sessionStorage, mémorisé dès le début : un rechargement ne la rejoue pas) ; **accueil uniquement** (vérifié : absente sur `/demo`, `/calcul` et les mentions légales) ; **sautée si « réduire les animations »** est activé, ou si le visiteur arrive sur une ancre (ex. `/#tarifs` depuis une page SEO).
- La page se charge derrière : le contenu est déjà affiché sous l'intro, les animations du haut de page attendent la fin de l'intro pour démarrer. Lighthouse reste à 100.

### 8. Animations
CSS et IntersectionObserver uniquement, aucune librairie, chacune ≤ 0,6 s :
- apparition des blocs au défilement (glissement de 22 px + fondu), en décalé pour les cartes, la FAQ et les cartes de prix ;
- le ticket du haut glisse en place, imprime ses lignes une par une, puis la pill « ✓ Reçue sur WhatsApp » apparaît avec un rebond ;
- les gros chiffres comptent quand ils arrivent à l'écran : 30 %, 0 % (descend depuis 30) et 49 € ;
- le résultat des calculateurs (accueil et `/calcul`) compte vers la nouvelle valeur avec un petit « pop » à chaque saisie ;
- les 3 étapes s'allument l'une après l'autre (pastille bleue + contour) ;
- boutons : enfoncement au toucher, l'ombre plate passe de 10 px à 3 px ;
- entrée du P bulle dans l'en-tête (pop), sur toutes les pages en nouvelle DA.
- Tout est désactivé avec « réduire les animations » (contenu affiché directement). Filet de sécurité : si le script ne se charge pas, rien ne reste caché. Aucun dégradé, aucun halo, ombres plates uniquement.

### 9. Réels clients
Les réels **Mexico** et **AG Pizza** que vous avez envoyés sont en ligne (compressés en 720 × 1280 : 2,4 Mo et 3,5 Mo, image d'aperçu à 16 s). Ils ne se chargent que lorsque le visiteur arrive sur le bloc. Les 3 réels du carrousel se chargent ensemble (avant, le 3e attendait d'être balayé).

## Ce que vous devez encore fournir

Tant qu'un élément manque, le site affiche son emplacement [entre crochets] : rien ne casse.

1. **Les prix des 4 options** (livraison, gestion du stock, relance des paniers, avis Google), à écrire dans `offre.js`. Pour mémoire, votre premier message indiquait « livraison dès 59 €/mois » ; je ne l'ai pas repris puisque le nouveau texte laissait `[PRIX_LIVRAISON]`.
2. **Le réel Cookies an nou** : `videos/cookies-an-nou.mp4` (envoyez-le-moi tel quel, je le compresse).
3. **La vidéo courte du parcours de commande** (écran de démo, sans son) : `videos/parcours.mp4`.
4. **Votre photo** pour le bloc final : `img/jules.webp`, portrait 4:5.
5. **Une phrase d'un client** (texte exact + prénom + restaurant, avec son accord).
6. **CGV** : votre décision sur les articles 3, 5 et 6 (frais de mise en place) et sur une éventuelle clause pour l'option livraison (voir plus haut).
7. **Offre Vercel** : Pro ou Hobby ? Sans Pro, les 3 événements de clic ne seront pas enregistrés.

## Points à valider

- Relire la carte prix et la ligne « + options selon vos besoins » sur la prévisualisation.
- Relire les passages des CGV ci-dessus (avant / après).
- Bio Instagram : remplacer « 5 restos déjà équipés ».
- Après chaque modification de `css/site.css` ou `js/site.js`, augmenter le `?v=3` dans les pages HTML (ces fichiers sont mis en cache un an). `offre.js` n'a pas besoin de cette manipulation.

## Fichiers

Nouveaux : `PLAN_SITE.md`, `RAPPORT_SITE.md`, `CHARTE.md`, `calcul.html`, `css/site.css`, `js/site.js`, `fonts/anton-400.woff2`, `fonts/pjs-700.woff2`, `fonts/pjs-800.woff2`, `img/p-bulle-*.webp`, `img/LISEZMOI.txt`, `videos/LISEZMOI.txt`, `og-accueil.jpg`, `og-calcul.jpg`.
Modifiés : `index.html`, `mentions-legales.html`, `sitemap.xml`, `vercel.json` (cache long pour `/css`, `/js`, `/img`, `/videos`).
Ajoutés le 12 novembre : `offre.js`, `img/p-bulle.png`, `img/p-bulle-96.webp`, `videos/mexico.mp4` + `.webp`, `videos/ag-pizza.mp4` + `.webp`. Modifiés : pages SEO, `demo.html` (une ligne), `cgv.html`, `confidentialite.html`, favicons, images de partage, `vercel.json` (redirections `/test` et `/site`). Supprimés : `test.html`, `site/`.
