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

**À relire de votre côté (clauses non touchées, comme demandé, mais qui parlent encore de frais de mise en place) :** *(réglé le 12 novembre, voir section 10)*
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

### 10. Dernières corrections avant mise en ligne (12 novembre 2026, suite)

**Livraison : 3 paliers** (dans `offre.js`, en nombres) : Essentiel 59 €/mois (jusqu'à 100 livraisons, puis 0,60 € par livraison), Pro 119 €/mois (jusqu'à 300, puis 0,50 €), Illimité 190 €/mois.
- Accueil, carte « Options en plus » : les 3 paliers et leur prix, chacun avec son volume (« jusqu'à 100 livraisons/mois », « jusqu'à 300 livraisons/mois », « livraisons illimitées ») pour qu'on comprenne la différence, puis « Vous payez toujours le palier le plus avantageux. » Aucun détail des dépassements sur le site.
- CGV, article 4 : le détail complet (paliers, dépassements, règle du palier le plus avantageux, exemple). Le texte est construit à partir de `offre.js` : si vous changez un prix, les CGV suivent, et l'exemple est recalculé tout seul.

**Autres options** (`offre.js`) : gestion du stock 9 €/mois, avis Google 9 €/mois, relance des paniers 19 €/mois, pack des 3 options 29 €/mois avec « au lieu de 37 € » sur l'accueil (9 + 9 + 19 = 37, vérifié). Le pack figure aussi dans l'article 4 des CGV, sans le « au lieu de ».

**Inclus dans les 49 €** : ajout de « Gestion de vos propres livreurs » (accueil, page SEO Martinique, et article 2 des CGV pour que les CGV restent identiques à l'offre). La FAQ Martinique « Puis-je garder mes livreurs ? » précise maintenant : « Leur gestion est incluse dans l'abonnement. »

**Bloc livraison de l'accueil** : la phrase devient « Vous avez vos livreurs ? Gérez-les depuis PFlow. Vous n'en avez pas ? On livre pour vous. ». Pour ne pas perdre la zone desservie, « Jarry et Baie-Mahault » passe dans la pill du haut du bloc : « Nouveau à Jarry et Baie-Mahault ».

**Frais de mise en place** : retirés des articles 3, 5 et 6 des CGV. Ailleurs sur le site, « mise en place » n'apparaît plus que pour décrire l'installation (« Une mise en place clé en main », « on s'en occupe pendant la mise en place ») ou pour dire « sans frais de mise en place ». Le champ `paiementMiseEnPlace` de `infos-legales.js` (« à la commande »), qui ne servait plus qu'à l'article 5, a été retiré.

#### CGV : passages modifiés, mot pour mot

**Article 2, puce « Abonnement mensuel de base »**
- Avant : « … espace de gestion permettant au Client de suivre ses commandes et de modifier sa carte et ses prix, installation réalisée par PFlow, ainsi que l'hébergement, le fonctionnement du service, la maintenance et le support. »
- Après : « … espace de gestion permettant au Client de suivre ses commandes et de modifier sa carte et ses prix, installation réalisée par PFlow, gestion des propres livreurs du Client, ainsi que l'hébergement, le fonctionnement du service, la maintenance et le support. »

**Article 3 (Commande)**
- Avant : « La commande est formée par l'acceptation écrite du devis par le Client (signature, e-mail ou message WhatsApp) et, le cas échéant, le paiement des frais de mise en place. Le Client fournit ensuite les éléments nécessaires (menu, photos, horaires, logo). … »
- Après : « La commande est formée par l'acceptation écrite du devis par le Client (signature, e-mail ou message WhatsApp). Le Client fournit ensuite les éléments nécessaires (menu, photos, horaires, logo). … » (la phrase suivante, « Les délais de mise en place sont indiqués au devis… », parle du délai d'installation, pas de frais : inchangée)

**Article 4 (Prix), puce des options**
- Avant : « Options, facturées en plus de l'abonnement de base : livraison : [prix à venir] ; gestion du stock : [prix à venir] ; relance des paniers : [prix à venir] ; avis Google : [prix à venir]. »
- Après, deux puces :
  - « Options, facturées en plus de l'abonnement de base : gestion du stock : 9 €/mois ; avis Google : 9 €/mois ; relance des paniers : 19 €/mois ; pack des trois options (gestion du stock, avis Google et relance des paniers) : 29 €/mois. »
  - « Livraison, en supplément de l'abonnement de base, selon trois paliers :
    - Essentiel : 59 € par mois, jusqu'à 100 commandes livrées par mois ; au-delà, 0,60 € par livraison.
    - Pro : 119 € par mois, jusqu'à 300 commandes livrées par mois ; au-delà, 0,50 € par livraison.
    - Illimité : 190 € par mois, sans limite de commandes livrées.

    Le Client paie toujours le montant le moins élevé entre son palier, dépassements compris, et le palier supérieur. Exemple : un Client au palier Essentiel qui fait 250 livraisons dans le mois devrait payer 59 € + 150 × 0,60 € = 149 € ; il paie 119 €, prix du palier Pro. »

**Article 5 (Paiement), premier paragraphe**
- Avant : « Les frais de mise en place sont payables à la commande. L'abonnement est payable mensuellement et d'avance, par virement ou prélèvement SEPA. »
- Après : « L'abonnement est payable mensuellement et d'avance, par virement ou prélèvement SEPA. »

**Article 6 (Durée et résiliation), premier paragraphe**
- Avant : « L'abonnement est sans engagement de durée. Il est reconduit chaque mois et peut être résilié à tout moment par le Client, par écrit (e-mail ou message WhatsApp), avec effet à la fin du mois en cours. Les sommes versées pour la mise en place correspondent à un travail réalisé et ne sont pas remboursables une fois celui-ci commencé. »
- Après : « L'abonnement est sans engagement de durée. Il est reconduit chaque mois et peut être résilié à tout moment par le Client, par écrit (e-mail ou message WhatsApp), avec effet à la fin du mois en cours. »

La date reste « Dernière mise à jour : 12 novembre 2026 ». Rien d'autre n'a changé dans les CGV.

**À trancher (je n'ai rien inventé)** *(réglé le 12 novembre, voir section 11)* : les CGV ne disent pas **quand** les livraisons au-delà du palier sont facturées (avec le mois suivant ? sur la facture du mois en cours ?), ni si le Client peut changer de palier en cours de mois. L'article 5 ne parle que de l'abonnement « payable d'avance ». La clause de responsabilité pendant la livraison faite par PFlow reste aussi à voir avec un juriste.

#### Lighthouse mobile après ces corrections

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` (avec l'intro) | 100 | 100 | 96 | 100 | 1,5 s | 0 | 80 ms |
| `/calcul` | 100 | 100 | 96 | 100 | 1,4 s | 0 | 0 ms |
| `/cgv` | 100 | 93 | 96 | 100 | 1,4 s | 0,021 | 0 ms |

Le 93 en accessibilité des CGV vient de leur ancien style, que je n'ai pas modifié (numéros d'articles et petit titre en rose sur fond blanc, contraste insuffisant). Ce n'est pas lié aux corrections. Je peux passer les CGV et la politique de confidentialité dans la nouvelle DA si vous voulez.

### 11. Série du 12 novembre (suite) : CGV livraison, intro, vidéo de démo, SEO

#### CGV, article 4 : facturation et paliers de livraison
- Avant : (rien ; la puce sur la livraison s'arrêtait à l'exemple du palier le plus avantageux)
- Après, nouvelle puce juste sous le détail de la livraison : « Facturation de l'option livraison : les livraisons effectuées au-delà du palier souscrit sont facturées sur la facture du mois suivant. Le Client peut changer de palier à tout moment ; le changement prend effet au début du mois suivant. »

#### CGV : nouvel article 10 « Option livraison » (à votre relecture)
Inséré après l'article 9 (« Ventes réalisées par le Client »). Les articles suivants sont renumérotés : Responsabilité devient 11, Données personnelles 12, Propriété intellectuelle 13, Force majeure 14, Droit applicable et litiges 15 (aucun article ne renvoyait à un autre par son numéro ; le sommaire a un lien « Livraison » en plus). Le code de la page contient, en tête de l'article, le commentaire `<!-- À FAIRE VALIDER PAR UN JURISTE AVANT ACTIVATION DE L'OPTION LIVRAISON -->`.

Texte complet :

> **10. Option livraison**
>
> Dans le cadre de l'option livraison, PFlow fournit au Client un outil technique de gestion des commandes et de mise en relation entre le Client et des livreurs indépendants. PFlow n'est ni transporteur ni employeur des livreurs, qui exercent leur activité de manière indépendante, sous leur propre statut et sous leur seule responsabilité.
>
> PFlow est tenue d'une obligation de moyens quant au bon fonctionnement de l'outil, notamment la transmission des commandes à livrer et l'information du Client sur leur suivi.
>
> Le livreur indépendant est responsable de la bonne exécution du transport, de la prise en charge de la commande jusqu'à sa remise au client final. Le Client reste seul responsable de ses produits, de leur préparation et de leur emballage, y compris de leur aptitude à être transportés.
>
> Le contrat étant conclu entre professionnels, la responsabilité de PFlow au titre de l'option livraison est limitée aux dommages directs et prouvés résultant d'un manquement à ses propres obligations, et plafonnée au montant des sommes versées par le Client au titre de cette option au cours des 12 derniers mois. PFlow ne répond pas des dommages indirects, tels que perte de chiffre d'affaires, de clientèle ou d'image. Conformément à l'article 1170 du Code civil, cette limitation ne prive pas de sa substance l'obligation essentielle de PFlow, qui est de mettre à la disposition du Client un outil permettant de gérer et de transmettre les commandes à livrer ; elle ne s'applique pas en cas de faute lourde ou dolosive de PFlow.

Points à faire regarder par le juriste : (1) le plafond reprend celui de l'article 11 (12 derniers mois), limité ici aux sommes de l'option ; (2) l'exclusion de la faute lourde ou dolosive est ajoutée parce qu'un plafond ne la couvre de toute façon pas en droit français ; (3) votre accueil dit « On livre pour vous » : il faut vérifier que ce message reste compatible avec le statut de simple intermédiaire décrit dans la clause ; (4) le statut des livreurs (auto-entrepreneurs, contrat de prestation entre eux et PFlow ou le resto) reste à cadrer à part.

#### Intro (accueil)
Refaite autour du ticket de la DA : le ticket « NOUVELLE COMMANDE #128 » tombe, imprime ses lignes une par une (heure, puis 2 plats), la pill « ✓ Reçue sur WhatsApp » rebondit, puis le ticket glisse vers le bas en rapetissant pendant que le fond nuit s'efface sur la page. Fermeture à 2,45 s, fin du fondu à 2,95 s. Bouton « Passer » visible dès la première image ; une fois par visite ; accueil seulement ; sautée si « réduire les animations ». La page est déjà affichée derrière : Lighthouse, qui la voit passer, donne toujours 100.

#### Vidéo de démo (bloc « Avec PFlow, c'est simple »)
- Rien n'était déposé dans `videos/demo-source/`, donc la vidéo a été créée avec **Remotion** dans `video-demo/` : verticale 9:16, 23,5 s, sans voix, dans la DA. Elle montre le parcours sur le resto de démo Mint Bun (resto fictif) : accroche « Vos clients commandent sans appeler », le client écrit sur WhatsApp, ouvre la carte, ajoute un Mint Burger, paie en ligne, puis le resto reçoit la notification et le ticket « NOUVELLE COMMANDE #129 », et la fin « Testez la démo · pflow.fr/demo ». Chaque étape a sa légende courte (« Le client écrit sur WhatsApp. », etc.).
- Export : `videos/parcours.mp4` (720 × 1280, 658 Ko, sans piste son) + `videos/parcours.webp` (image d'aperçu, le ticket). Elle tourne en boucle, sans son, dans le téléphone du bloc, chargée seulement à l'approche ; l'image d'aperçu s'affiche en attendant.
- **Ouvrir Remotion Studio chez vous** (Node.js 18 ou plus) :
  ```bash
  cd video-demo
  npm install
  npm run studio
  ```
  Puis http://localhost:3000. Textes, plats, prix et rythme se changent en haut de `video-demo/src/MintBunDemo.tsx` (`TEXTES`, `CARTE`, `SCENES`). Export et compression : voir `video-demo/LISEZMOI.md`.
- Si vous déposez plus tard une vidéo dans `videos/demo-source/`, dites-le-moi : je la compresse et la mets à la place.

#### Comparaison chiffrée avec livraison (bloc Uber Eats ou PFlow)
« 100 commandes de 20 € livrées par mois : environ 500 € de commission avec une plateforme à 25 %, 108 € avec PFlow (49 € + livraison 59 €). », puis « Soit environ 392 € de plus pour vous chaque mois. » (compteur animé) et la note discrète « Taux public des plateformes de livraison en France en 2026 (formule standard autour de 25 %). Exemple indicatif. ». Tous les chiffres sont calculés par `offre.js` : abonnement de base (nouveau champ `base: 49`), palier de livraison le moins cher pour 100 livraisons (Essentiel, 59 €), et l'exemple de 100 commandes à 20 € et 25 % est écrit dans la page (attributs `data-commandes`, `data-panier`, `data-taux`). Le même bloc est réutilisé sur la page-réponse « alternative à Uber Eats ».

#### Animations en plus
- Profondeur au défilement : le ticket du haut et les 3 cartes du problème glissent légèrement (14 px au plus) par rapport à la page. Je l'ai retirée des cartes « Uber Eats / PFlow », où elle faisait se chevaucher les blocs.
- Soulignement du mot rose des titres : un trait plein rose se dessine de gauche à droite à l'apparition du titre (titre du haut compris). Techniquement, c'est un fond d'une seule couleur, pas un dégradé.
- Bulles WhatsApp une à une à côté du téléphone (« Bonjour, je veux commander », « Voici notre carte 👇 », « ✓ Commande reçue »).
- Compteur de l'économie (0 → 392 €) dans la comparaison.
- Tout est coupé avec « réduire les animations » (vérifié : pas d'intro, pas de déplacement, bulles affichées directement).

#### Version téléphone plus courte (hauteur à 390 px)

| Bloc | Avant | Après |
|---|---|---|
| Haut de page | 1 040 | 918 |
| Problème (cartes en carrousel horizontal) | 606 | 348 |
| Solution (3 étapes sur une ligne, téléphone plus petit, bulles à côté) | 1 230 | 645 |
| Uber Eats ou PFlow (cartes côte à côte, + comparaison chiffrée, calculateur replié derrière « Faire le calcul avec mes chiffres ») | 1 484 | 970 |
| Livraison | 536 | 313 |
| Preuves (réels en carrousel plus étroit) | 936 | 631 |
| Prix (paliers en 3 cases) | 1 633 | 1 243 |
| FAQ (3 questions + « Voir plus de questions ») | 594 | 428 |
| Fin (photo et question côte à côte) | 820 | 428 |
| Pied de page (avec les coordonnées en plus) | 442 | 523 |
| **Page entière** | **9 508 px** | **6 635 px (−30 %)** |

Ces −30 % incluent deux ajouts : la comparaison chiffrée (environ 300 px) et les coordonnées du pied de page. Sans eux, on est à environ −34 %. Hero, comparaison chiffrée, prix et bouton final restent en entier ; la barre collée en bas n'a pas changé. Sur ordinateur, rien ne change à part les ajouts (le calculateur reste ouvert, les 4 questions sont visibles).

#### Contenus ajoutés
- `img/jules.webp` : votre photo, recadrée en portrait 4:5 (800 × 1000, 97 Ko), dans le cadre blanc incliné du bloc final.
- `videos/cookies-an-nou.mp4` (2,5 Mo) + aperçu : les 3 réels clients sont maintenant en ligne.

#### SEO Google et IA
- **Données structurées** : Organization (avec adresse et téléphone), **LocalBusiness** (Le Gosier, Guadeloupe ; zone desservie : Guadeloupe ; « À partir de 49 €/mois »), Product/Offer et FAQPage sur l'accueil. Organization + LocalBusiness aussi sur `/calcul`, les mentions légales et les 3 pages-réponses (qui ont en plus WebPage, FAQPage et fil d'Ariane). Tous les blocs JSON-LD ont été validés.
- **Mêmes nom, adresse, téléphone, description partout** : « PFlow Order · 615 Rue de l'aviation, Saint-Félix, 97190 Le Gosier, Guadeloupe · 0690 93 81 08 » et la description « Prise de commande WhatsApp pour les restaurants de Guadeloupe : vos clients commandent sur WhatsApp, vous recevez la commande écrite. À partir de 49 €/mois, 0 % de commission, sans engagement. ». Ils figurent dans le pied de page de l'accueil, de `/calcul`, des mentions légales et des pages-réponses, ainsi que dans les données structurées et `llms.txt`. Dans `infos-legales.js` (mentions légales, CGV, confidentialité), l'adresse passe de « 615 Rue de l'aviation, Saint-Félix, Gosier, 97190 » à « 615 Rue de l'aviation, Saint-Félix, 97190 Le Gosier, Guadeloupe », et le téléphone de « 0690938108 » à « 0690 93 81 08 » : même adresse, même numéro, seulement écrits pareil partout.
- **robots.txt** : tout est autorisé, avec une autorisation explicite pour Googlebot, Bingbot, Google-Extended, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot et ClaudeBot, plus le lien du sitemap.
- **llms.txt** (racine) : PFlow en quelques lignes (quoi, pour qui, où, prix, contact, pages utiles). Il est écrit à la main : si vous changez un prix dans `offre.js`, changez-le aussi dans `llms.txt`.
- **IndexNow** : clé `56805f00c3689eb0819d45f54f421434`, fichier de vérification `/56805f00c3689eb0819d45f54f421434.txt` à la racine, et script `scripts/indexnow.sh` qui envoie toutes les pages du sitemap à Bing. À lancer **après** la mise en ligne (voir la liste ci-dessous). Je ne pouvais pas l'envoyer d'ici : le site n'est pas encore en production.
- **3 pages-réponses** (titre = la question, réponse courte en 2 phrases dans un encadré, puis les détails, liens vers l'accueil et `/calcul`, bouton démo, ajoutées au sitemap et au pied de page) :
  - `/questions/commandes-whatsapp-restaurant-guadeloupe` : « Comment prendre les commandes de mon restaurant sur WhatsApp en Guadeloupe ? »
  - `/questions/alternative-uber-eats-guadeloupe` : « Quelle alternative à Uber Eats pour un restaurant en Guadeloupe ? »
  - `/questions/prix-commande-en-ligne-sans-commission` : « Combien coûte un système de commande en ligne sans commission ? »
  Les chiffres viennent de `offre.js`, aucun n'est inventé. Les boutons envoient `clic_demo` / `clic_whatsapp` avec l'emplacement `question`.

#### Lighthouse mobile après cette série

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` (avec l'intro) | 100 | 100 | 96 | 100 | 1,5 s | 0 | 20 ms |
| `/calcul` | 100 | 100 | 96 | 100 | 1,4 s | 0 | 0 ms |
| `/questions/alternative-uber-eats-guadeloupe` | 100 | 100 | 96 | 100 | 1,5 s | 0 | 0 ms |
| `/cgv` | 100 | 93 | 96 | 100 | 1,4 s | 0,017 | 0 ms |

(96 en bonnes pratiques : seulement le script Vercel Analytics, absent en local. 93 sur les CGV : leur ancien style, inchangé.)

### 12. Nettoyage après le test sur iPhone (12 novembre)

Objectif : une page propre, aérée, cohérente, en enlevant plutôt qu'en ajoutant. La feuille de style a été **réécrite entièrement** (`css/site.css`, v6) au lieu d'être corrigée une fois de plus : les retouches successives étaient la cause du manque de rigueur.

**Captures à 390 px, toute la page** (dans le dépôt, non publiées sur le site) :
- avant : `rapport/avant-390.jpg`
- après : `rapport/apres-390.jpg`
- côte à côte : `rapport/avant-apres-390.jpg`

**Règles appliquées partout**
- **Une seule carte** : fond #141D4F, arrondi 24 px, marge intérieure 22 px (28 px sur ordinateur), sans bordure ni ombre. Plus aucune carte à contour, à bordure en pointillés ou à ombre propre. Seule exception : la carte prix blanche, avec le même arrondi et la même marge.
- **Une seule échelle d'espacement** : marges latérales de 20 px sur téléphone, 72 px entre deux blocs (104 px sur ordinateur), 24 px entre un titre et son contenu. Deux blocs nuit qui se suivent ne cumulent plus leurs marges.
- **Fonds** : nuit partout, sauf les trois coupures de la DA (rose pour « Le rush » et le bloc final, bleu pour la livraison). Les fonds #141D4F de section ont disparu, puisque c'est la couleur des cartes.
- **Plus aucun carrousel horizontal**. Rien ne dépasse de l'écran : vérifié automatiquement sur l'accueil, `/calcul`, une page-réponse et les mentions légales.
- **Boutons** : 4 boutons « Tester la démo » sur la page (haut de page, carte prix, bloc final, barre du bas), plus celui de l'en-tête. Aucun bloc n'en a plus d'un. Le bouton du bloc « preuves » et celui du calculateur ont été retirés.
- **Animations** : restent l'intro, l'impression du ticket et le compteur de l'économie. Supprimés : l'effet de profondeur, les bulles WhatsApp, le soulignement animé, les étapes qui s'allument, le P qui « pop », les compteurs 30 % / 0 % / 49 €. Les apparitions au défilement sont un simple fondu de 0,35 s, et les titres ne s'animent plus jamais (ils étaient en cause dans le titre « Vos questions » à moitié transparent).

**Bloc par bloc**
1. **Intro** : le ticket avait une animation d'entrée qui l'empêchait de disparaître, d'où le chevauchement avec le titre. Il a maintenant sa propre animation de sortie. Mesuré : ticket complètement invisible à 2,6 s, puis le fond s'efface de 2,6 à 2,85 s, intro retirée à 2,9 s.
2. **Haut de page** : titre, sous-titre, bouton, lien WhatsApp, ligne de prix, « Déjà en place chez… », puis le ticket, une seule fois, plus petit (250 px). Si l'intro vient de jouer, ce ticket ne se « réimprime » pas : plus d'effet de doublon.
3. **Le rush** : une seule carte avec les 3 problèmes en lignes (icône + texte).
4. **Avec PFlow, c'est simple** : les 3 étapes en liste verticale dans une carte, puis le téléphone seul et centré avec la vidéo, puis « Pas d'appli à installer ».
5. **Uber Eats ou PFlow** : une seule carte. « 100 commandes de 20 € livrées par mois », deux gros chiffres côte à côte (500 € environ / 108 €), « Soit environ 392 € de plus pour vous chaque mois » avec le compteur, la note, et le lien « Faire mon calcul » vers `/calcul`. Les cartes 30 % / 0 % et le calculateur de l'accueil sont supprimés (le calculateur reste sur `/calcul`).
6. **Livraison** : inchangé. La page a maintenant un espace en bas égal à la hauteur de la barre (plus la zone de sécurité de l'iPhone) : aucun texte ne reste caché derrière.
7. **Ils l'utilisent déjà** : les 3 réels en grille de 3 colonnes (aucun ne déborde). Chacun montre son image d'aperçu et un bouton lecture blanc ; les commandes de la vidéo n'apparaissent qu'au premier appui. Un réel absent est masqué, pas remplacé par un emplacement. Le bloc témoignage est retiré de la page (gardé en commentaire dans le code, prêt à remplir).
8. **Prix** : la carte blanche à 49 € reste. Les options sont dans un bloc replié « Voir les options et la livraison ». Une fois ouvert : les 3 paliers en 3 lignes, « Vous payez toujours le palier le plus avantageux », puis les 3 options et le pack en lignes. Si un prix manque dans `offre.js`, sa ligne est masquée (plus de « [prix à venir] »).
9. **FAQ** : le titre est toujours opaque. Les 4 questions sont visibles (le « Voir plus » est retiré, une chose de moins).
10. **Bloc final et photo** : la photo existait bien, mais votre iPhone gardait en mémoire l'erreur « fichier introuvable » d'une visite précédente, car les images étaient mises en cache 30 jours, erreurs comprises. Les adresses de la photo et des vidéos portent maintenant un numéro de version (`?v=2`), donc l'iPhone les recharge. Si la photo manque un jour, le cadre est masqué : plus d'emplacement « [Photo de Jules à venir] ». Le bouton WhatsApp devient un lien, pour garder un seul bouton principal.
11. **Barre du bas** : seulement « Tester la démo » et le bouton WhatsApp (la ligne de prix est retirée). Elle disparaît quand le bloc final est à l'écran.
12. **Pied de page** : logo, coordonnées sur 2 lignes (adresse ; téléphone), liens légaux, et une petite section repliable « Ressources » avec les liens SEO. Même pied de page sur `/calcul`, les mentions légales et les pages-réponses.

**Vérifications**
- Aucun texte entre crochets visible (contrôle automatique sur tout le texte affiché de l'accueil, de `/calcul`, d'une page-réponse et des mentions légales). Les CGV affichaient « [prix à venir] » en secours si le script ne se chargeait pas : remplacé par les vrais prix.
- Aucun élément ne dépasse de l'écran à 390 px.
- Photo chargée (800 px), 4 vidéos chargées, aucun réel masqué.
- Hauteur de l'accueil à 390 px : 6 635 px avant ce nettoyage, **6 451 px après**, avec plus d'air entre les blocs.

**Lighthouse mobile**

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` (avec l'intro) | 100 | 100 | 96 | 100 | 1,4 s | 0 |
| `/calcul` | 100 | 100 | 96 | 100 | 1,4 s | 0 |
| `/questions/prix-commande-en-ligne-sans-commission` | 100 | 100 | 96 | 100 | 1,4 s | 0 |
| `/mentions-legales` | 100 | 100 | 96 | 100 | 1,2 s | 0 |

**Mesure** : sur l'accueil, les emplacements `preuves` et `calcul` n'existent plus (boutons retirés). Restent `entete`, `hero`, `prix`, `final`, `barre_mobile`, plus `calcul` sur la page `/calcul` et `question` sur les pages-réponses.

### 13. Série du 14 novembre : vidéo plus rapide, simulateur, chiffres cohérents, domaine

**Captures à 390 px des blocs modifiés** (dans `rapport/`, non publiées) : `bloc-probleme-390.jpg`, `bloc-solution-390.jpg` (téléphone avec la vidéo), `bloc-comparer-390.jpg` (simulateur), `bloc-options-390.jpg` (options ouvertes), `bloc-calcul-390.jpg` (page `/calcul`).

#### 1. Vidéo de démo : 23,5 s → 13,9 s
- Un réglage `VITESSE` (1,75) dans `video-demo/src/MintBunDemo.tsx` accélère toutes les animations, et les scènes sont raccourcies : accroche 1,6 s, WhatsApp 2,3 s, carte 2,8 s, paiement 2,3 s, ticket 3,1 s, fin 1,8 s.
- Chaque texte reste au moins 1,2 s à l'écran : accroche environ 1,3 s, « Paiement accepté » 1,27 s, pill « Reçue sur WhatsApp » 1,3 s, « pflow.fr/demo » 1,2 s, légendes des étapes de 2 à 3 s.
- Export : `videos/parcours.mp4` (502 Ko, sans son) + aperçu `videos/parcours.webp` (le ticket, image à 11,6 s), appelés en `?v=3`.

#### 2. Comparaison « Uber Eats ou PFlow » interactive
- Un seul réglage : un curseur « Vos commandes livrées par mois » de 50 à 500 (par pas de 10, départ 100), avec un rond de 38 px et une zone de 48 px de haut, facile au doigt. Le panier moyen est fixé à 20 € et affiché.
- À gauche, « Avec Uber Eats (30 %) » : coût par mois en très gros, puis « soit 6 € par commande ». À droite, en rose, « Avec PFlow » : 49 € + le palier de livraison le plus avantageux, en très gros, puis « soit X € par commande ».
- En dessous : « Soit environ X € de plus pour vous chaque mois » (le compteur défile à l'arrivée sur le bloc et à chaque mouvement du curseur), la phrase sur les prix gonflés, la note « Grille publique Uber Eats France 2026 : 15 %, 30 % ou 33 % selon la formule… », et le lien « Faire mon calcul détaillé » vers `/calcul`.
- Valeurs vérifiées : 50 commandes → 300 € contre 108 € (192 € de plus) ; 100 → 600 € contre 108 € (492 €) ; 250 → 1 500 € contre 168 € (palier Pro, car Essentiel avec dépassements ferait 149 €) ; 500 → 3 000 € contre 239 € (palier Illimité).
- Tout est calculé dans `offre.js`. Le taux est écrit à **un seul endroit** : `uber: { taux: 30, max: 33 }`. Le même simulateur remplace l'ancien exemple figé sur la page-réponse « alternative à Uber Eats ».

#### 3. Coût par livraison dans les options (bloc prix, replié)
Sous chaque palier : Essentiel 59 €/mois « soit 0,59 € par livraison », Pro 119 €/mois « soit 0,40 € par livraison », Illimité 190 €/mois « plus vous livrez, moins ça coûte ». Puis, en rose : « Avec Uber Eats à 30 %, une commande de 20 € vous coûte 6 €. » Tout est calculé depuis `offre.js`.

#### 4. Cohérence des chiffres
- « Le rush » : « Jusqu'à 33 % pour Uber Eats. » (le 33 vient de `offre.js`).
- Partout ailleurs : 30 % comme référence, « jusqu'à 33 % » comme maximum. Corrigé :
  - la page-réponse « alternative à Uber Eats » (« autour de 25 % » devient « 30 % sur la formule avec livraison, et jusqu'à 33 % selon la formule ») ;
  - l'ancienne page `/alternative-uber-eats` (« jusqu'à 30 % » devient « 30 %, jusqu'à 33 % » ; son curseur allait jusqu'à 35 %, il s'arrête maintenant à 33 %) ;
  - `llms.txt` (ajout du repère 30 % / jusqu'à 33 % et de l'exemple 600 € contre 108 €).
- Recherche dans tout le site : plus aucun 25 % ni 35 %. Les seuls taux de commission restants sont 30 %, 33 % et le 15 % de la grille citée dans la note. Les données structurées ne citent aucun taux de plateforme (seulement « 0 % de commission »).
- `/calcul` : taux par défaut 30 %, lu dans `offre.js` ; la note cite la grille 15 / 30 / 33 %.
- Phrase sur les prix gonflés ajoutée sur l'accueil, sur `/calcul` et sur la page-réponse « Quelle alternative à Uber Eats pour un restaurant en Guadeloupe ? ».

#### 5. Domaine principal (vérifié dans Vercel, rien modifié)
- Domaine principal en production : **www.pflow.fr**. `pflow.fr` redirige vers `www.pflow.fr`.
- Canonical, sitemap, `robots.txt`, `llms.txt`, données structurées, images de partage et script IndexNow utilisent tous exactement `https://www.pflow.fr` (vérifié : aucune autre forme dans le code).
- **À changer dans Vercel** : la redirection de `pflow.fr` est en **308**, pas en 301. Les deux sont des redirections permanentes et Google les traite pareil, mais si vous voulez exactement un 301 : Vercel → projet `pflow-site-v7` → Settings → Domains → ligne `pflow.fr` → Edit → « Redirect to www.pflow.fr », code **301 Moved Permanently** → Save.
- À savoir : l'adresse technique `pflow-site-v7.vercel.app` sert aussi le site de production sans rediriger. Les balises canonical indiquent `www.pflow.fr` à Google, donc pas de doublon. Pour aller plus loin, la même page Domains permet de la rediriger aussi vers `www.pflow.fr`.

#### Lighthouse mobile

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` (avec l'intro) | 100 | 100 | 96 | 100 | 1,4 s | 0 |
| `/calcul` | 100 | 100 | 96 | 100 | 1,4 s | 0 |
| `/questions/alternative-uber-eats-guadeloupe` | 100 | 100 | 96 | 100 | 1,4 s | 0 |
| `/alternative-uber-eats` (ancienne page SEO) | 100 | 96 | 96 | 100 | 1,7 s | 0 |

Vérifications à 390 px : aucun élément ne dépasse de l'écran, aucun texte entre crochets visible (accueil, `/calcul`, page-réponse). Le 96 de l'ancienne page SEO vient de son ancien style (contraste, tableau), que je n'ai pas modifié.

## SEO : ce que vous devez faire vous-même

Après la mise en ligne sur www.pflow.fr :
1. **Google Search Console** (search.google.com/search-console) : ajouter le domaine `pflow.fr`, valider avec l'enregistrement DNS proposé, puis envoyer `https://www.pflow.fr/sitemap.xml` (menu Sitemaps). Demander l'indexation de l'accueil, de `/calcul` et des 3 pages-réponses (outil « Inspection de l'URL »).
2. **Bing Webmaster Tools** (bing.com/webmasters) : importer le site depuis Search Console (1 clic), puis lancer une fois `bash scripts/indexnow.sh` depuis le dossier du site. Bing sert aussi de source à ChatGPT et Copilot. À relancer après chaque grosse mise à jour.
3. **Fiche Google Business Profile** (business.google.com) : créer « PFlow Order », catégorie proche de « Concepteur de logiciels » ou « Service de marketing », avec **exactement** le même nom, la même adresse et le même téléphone que le site. Si vous ne recevez pas de public à cette adresse, choisissez « entreprise de services de proximité », masquez l'adresse et indiquez la zone desservie « Guadeloupe ». Ajoutez le lien `https://www.pflow.fr/`, des photos et la description du site.
4. **Avis Google** : demandez un avis à Cookies an nou, Mexico et AG Pizza sur la fiche. C'est le signal local le plus fort.
5. **Instagram** : bio avec le lien `pflow.fr/demo` (déjà fait) ; remplacez « 5 restos déjà équipés » par les 3 noms ou une formule sans chiffre.
6. **Mêmes coordonnées partout ailleurs** : Pages Jaunes, annuaire de la CCI Îles de Guadeloupe, Facebook, LinkedIn. Même nom, même adresse, même numéro, au caractère près.
7. **Liens vers le site** : demandez aux restos clients un lien « Commandes par PFlow » vers pflow.fr sur leur site ou leur bio. Visez un article dans un média local (ex. une page « entreprises » de la presse de Guadeloupe).
8. **Vérifier les données structurées** : passez l'accueil et une page-réponse dans le test des résultats enrichis de Google (search.google.com/test/rich-results).
9. **Suivi** : dans 4 à 6 semaines, regardez dans Search Console les requêtes « commande whatsapp restaurant », « alternative uber eats guadeloupe », « commande en ligne sans commission ». Dites-moi lesquelles montent : j'écrirai d'autres pages-réponses.
10. **Quand un prix ou le taux Uber Eats change** : modifiez `offre.js` (le site, le simulateur et les CGV suivent), puis `llms.txt` à la main, puis relancez `scripts/indexnow.sh`.
11. **Redirection pflow.fr** : passez-la de 308 à 301 si vous y tenez (section 13).

## Ce que vous devez encore fournir

Tant qu'un élément manque, le site affiche son emplacement [entre crochets] : rien ne casse.

1. **Une phrase d'un client** (texte exact + prénom + restaurant, avec son accord). Le bloc témoignage est masqué tant qu'elle manque ; il est prêt, en commentaire, dans `index.html`.
2. **La relecture d'un juriste** de l'article 10 des CGV (option livraison) avant d'activer l'option.
3. **Votre offre Vercel** : Pro ou Hobby ? Sans Pro, les 3 événements de clic ne sont pas enregistrés.
4. **Facultatif** : une vidéo de démo à vous dans `videos/demo-source/`, si vous préférez votre ancienne vidéo à celle faite avec Remotion.

## Points à valider

- Relire la carte prix et la ligne « + options selon vos besoins » sur la prévisualisation.
- Relire les passages des CGV ci-dessus (avant / après).
- Bio Instagram : remplacer « 5 restos déjà équipés ».
- Après chaque modification de `css/site.css` ou `js/site.js`, augmenter le numéro `?v=` dans les pages HTML (aujourd'hui `css/site.css?v=7` et `js/site.js?v=7`). Même chose pour une photo ou une vidéo remplacée : changer son `?v=` dans `index.html` (ces fichiers sont mis en cache un an). `offre.js` n'a pas besoin de cette manipulation.

## Fichiers

Nouveaux : `PLAN_SITE.md`, `RAPPORT_SITE.md`, `CHARTE.md`, `calcul.html`, `css/site.css`, `js/site.js`, `fonts/anton-400.woff2`, `fonts/pjs-700.woff2`, `fonts/pjs-800.woff2`, `img/p-bulle-*.webp`, `img/LISEZMOI.txt`, `videos/LISEZMOI.txt`, `og-accueil.jpg`, `og-calcul.jpg`.
Modifiés : `index.html`, `mentions-legales.html`, `sitemap.xml`, `vercel.json` (cache long pour `/css`, `/js`, `/img`, `/videos`).
Ajoutés le 12 novembre : `offre.js`, `img/p-bulle.png`, `img/p-bulle-96.webp`, `videos/mexico.mp4` + `.webp`, `videos/ag-pizza.mp4` + `.webp`. Modifiés : pages SEO, `demo.html` (une ligne), `cgv.html`, `confidentialite.html`, favicons, images de partage, `vercel.json` (redirections `/test` et `/site`). Supprimés : `test.html`, `site/`.
Série suivante (12 novembre) : `questions/` (3 pages-réponses), `video-demo/` (projet Remotion, sans `node_modules/` ni `out/`), `videos/parcours.mp4` + `.webp`, `videos/cookies-an-nou.mp4` + `.webp`, `img/jules.webp`, `llms.txt`, `56805f00c3689eb0819d45f54f421434.txt` (clé IndexNow), `scripts/indexnow.sh`. Modifiés : `index.html`, `calcul.html`, `mentions-legales.html`, `cgv.html`, `offre.js`, `infos-legales.js`, `css/site.css`, `js/site.js`, `robots.txt`, `sitemap.xml`.
