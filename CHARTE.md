# Charte de contenu PFlow Order — Instagram @pflow.gp

> **Pour Claude Code.** Ce fichier est la source de vérité de tout le contenu Instagram de PFlow Order (stories, carrousels, couvertures de réels, scripts de réels, légendes). Tout contenu généré automatiquement par le CRM (onglet *Contenu Instagram*) doit respecter **chaque règle** ci-dessous. En cas de doute : on applique la règle la plus stricte et on demande validation à Jules.
>
> **Intégration :** le CRM tourne sur Supabase + Vercel (order.pflow.fr) et il est déjà très chargé. Avant de coder quoi que ce soit, lis la structure existante (onglet *Contenu Instagram > Charte*, tables, composants) et intègre proprement **sans rien casser**. Propose un plan des fichiers modifiés avant de coder.
>
> Dossier `assets/` : P bulle et icônes en verre (PNG transparents). Dossier `exemples/` : rendus validés par Jules — la référence visuelle à imiter.
>
> **Dans le CRM :** ce fichier vit dans `docs/charte-instagram/CHARTE.md` ; les assets dans `img/charte/` (`p-bulle.png`, `icones/`) et les exemples dans `img/charte/exemples/`. Le code lit la charte depuis `api/_instagram/charte.js`, qui en reprend chaque règle (à garder synchrone).

---

## 1. Positionnement

- **Produit :** PFlow Order — prise de commande WhatsApp pour restaurants. Le client commande seul sur WhatsApp via un mini-site aux couleurs du resto ; le resto reçoit la commande écrite (ticket + tableau de bord). 49 €/mois, 0 % de commission, sans engagement.
- **Zone :** Guadeloupe en priorité, puis Martinique, Saint-Martin, Saint-Barthélemy.
- **Cible :** 75 % restaurateurs (pizzerias, fast-food, burgers, snacks), 25 % grand public (visibilité, « parlez-en à votre resto préféré »).
- **Objectif :** 5 000 abonnés **qualifiés** sur @pflow.gp. Un abonné qui n'est ni restaurateur ni client potentiel d'un resto local ne compte pas.
- **Promesse centrale :** *« Vos clients commandent sans vous appeler. »*
- **Le visage :** Jules, 20 ans, étudiant en droit, qui construit PFlow pour les restos de Guadeloupe.

## 2. Ton et rédaction

- **Vouvoiement partout** (visuels, bio, légendes, scripts, DM automatiques).
- Phrases courtes, concrètes, ton direct et chaleureux, jamais corporate. Parler des vraies situations du resto (samedi 20 h, le rush, la ligne occupée, la commande mal notée).
- **Mots interdits :** « chatbot » (on dit « prise de commande WhatsApp », « système de commande »), « solution innovante », « révolutionnaire », jargon tech.
- **Pas d'em dash (—)** dans les textes publiés, pas de tournures « IA ».
- Toujours **un seul appel à l'action** par contenu.
- **PFlow, jamais « Jules » à la troisième personne (09/11)** : la voix off et les textes des réels motion et des carrousels parlent de PFlow (« PFlow vous installe tout », jamais « Jules vous installe ça »). Seules les vidéos face caméra de Jules parlent de lui, à la première personne. Contrôle automatique : « Jules » devient « PFlow » avant la voix off et avant « à valider ».
- **Jamais un sujet déjà traité (09/11)** : avant chaque brief, le sujet est comparé à tout ce qui est publié ou programmé sur 30 jours (avant et après) ; trop proche, il est changé. Le texte des slides est comparé de même ; un carrousel de secours déjà utilisé sur 30 jours n'est jamais repris.
- **« Le client », jamais « il » tout seul (09/11)** : toujours « le client » (ou « la cliente »), jamais « il » ou « elle » seul ; avec le gérant et le client dans la même histoire, on ne sait pas qui est « il ». Les tournures impersonnelles (« il faut », « il y a », « il est 23 h ») restent permises. Contrôle automatique : refait avant « à valider ».
- **Ponctuation obligatoire (09/11)** : dans les textes à l'écran et dans la voix off, des points, des virgules, des deux-points. Chaque titre, chaque texte de slide et chaque phrase de la voix finit par un point, un point d'interrogation ou deux-points ; la voix off marque une vraie pause à chaque point. Contrôle automatique : refait avant « à valider ».
- **Concepts réalistes (09/11)** : chaque situation correspond à un vrai comportement de client de resto en Guadeloupe et à ce que vit un vrai gérant (exemple d'erreur : un client qui écrit à 23 h veut commander tout de suite, pas pour le lendemain). Avant chaque brief, l'agent se demande : « Est-ce qu'un vrai client ferait ça ? Est-ce qu'un vrai gérant le vivrait ? » ; sinon, il change de sujet.
- **Voix off contrôlée à l'écoute (09/11)** : chaque voix générée est transcrite (ElevenLabs Speech to Text) et comparée au texte prévu ; un mot ou un début de phrase répété (« il commande », « il choisit une pizza »), une hésitation, des mots en trop ou une pause anormale au milieu d'une phrase : elle est refaite avant le rendu (stabilité « Naturel », puis « Robuste »), y compris sur les phrases courtes.
- **« PFlow » se dit « Pé-Flow » (09/11)** : dans le texte envoyé à la voix (jamais à l'écran, qui garde « PFlow »), « PFlow » est écrit « Pé-Flow », avec une virgule devant au milieu d'une phrase pour une courte pause : prononcé trop vite, il ne se comprend pas. Vaut pour toutes les voix off.
- **Une voix off, une prise (09/11)** : une voix off n'est jamais recollée phrase par phrase (voix saccadée, coupures) ; une retouche de la voix refait TOUTE la voix en une seule prise continue, même texte, stabilité « Naturel » (0,5), écoutée par transcription sur toute la prise, puis les visuels sont recalés dessus sans être modifiés.
- **Ponctuation normale** : un titre peut finir par un point (« SAMEDI 20 H. »). **Une idée par bloc** : jamais le problème et la solution dans le même bloc (le problème sur une slide ou une ligne, la solution sur la suivante).

### Étiquettes (04/11)

- **L'étiquette correspond toujours au contenu.**
- **« Conseil rapide »** = une action concrète que le restaurateur peut appliquer **seul, sans PFlow, dès ce soir** (ex. activer le message d'absence WhatsApp Business avec sa carte et ses horaires). PFlow peut apparaître seulement à la fin, en CTA. Un texte qui décrit PFlow ou ses résultats (« la commande arrive écrite », « zéro erreur ») n'est jamais un conseil.
- **Un contenu qui parle de PFlow prend l'étiquette de sa série** : « LE COUP DE FEU », « CARNET », « COULISSES », « J'AUTOMATISE VOTRE RESTO ».
- Contrôle automatique : un « Conseil rapide » sans action à l'impératif, ou qui vend PFlow, est rejeté et regénéré ; une 2e lecture par l'IA vérifie que le restaurateur peut l'appliquer seul, sans PFlow, dès ce soir.

### Erreurs à ne plus faire (04/11)

- À chaque refus dans le CRM, Jules coche une raison (Étiquette fausse, Trop de texte, Hors charte visuelle, Pas utile pour un resto, Ton pas bon) et/ou écrit une phrase.
- L'IA la reformule en règle générale ; Jules la valide ou la corrige dans l'onglet Charte. Les doublons sont fusionnés.
- Les 15 règles actives les plus fréquentes sont injectées dans les consignes de l'agent à chaque génération ; au-delà, le CRM propose de les regrouper.
- Chiffres : uniquement des chiffres vrais (clients réels, prix réels). Les exemples de calcul sont signalés comme exemples.
- Faits produit validés : 49 €/mois · 0 % de commission · sans engagement · installation faite par Jules · inclus : prise de commande WhatsApp 24h/24, mini-site aux couleurs du resto, tableau de bord des commandes · **options payantes :** gestion du stock, relance des paniers, avis Google (d'autres à venir).
- Clients affichables : **Cookies an nou, Mexico (Sainte-Rose), AG Pizza.** Ne jamais afficher un resto qui n'est pas client ou n'a pas donné son accord.

## 3. Couleurs

| Token | Hex | Usage |
|---|---|---|
| `nuit` | `#0A1236` | Fond principal, texte sur fonds clairs |
| `rose` | `#FF4FB5` | Accent : 1 mot-clé par titre, CTA, highlights |
| `bleu` | `#2AABFF` | Fond secondaire, numéros, puces |
| `creme` | `#F3EEE6` | **Réservé** au ticket de commande et aux maquettes de l'interface de commande |
| `reflet` | `#74DDFB` | Texte d'accent sur fond `nuit` uniquement |
| blanc | `#FFFFFF` | Texte sur `nuit`, cartes, cadres photo |

**Règles strictes :**
- **Aucun dégradé.** Fonds en aplat uniquement (`nuit`, `bleu` ou `rose`). Aucun halo, aucune lueur, aucun flou coloré en arrière-plan.
- Un fond = une couleur. Alterner `nuit` / `bleu` / `rose` d'une slide à l'autre pour rythmer.
- Dans un titre : le texte principal est blanc (sur `nuit`) ou `nuit` (sur `bleu`/`rose`), et **un seul segment** passe en `rose` (sur `nuit`) ou en blanc (sur `bleu`/`rose`).
- Ombres : uniquement une ombre plate décalée `rgba(0,0,0,.28)` (décalage ~20 px), jamais d'ombre floue.

## 4. Typographie

- **Titres : Anton**, toujours en MAJUSCULES, interligne 1.0. Tailles story : 150 px (court), 124 px (moyen), 104 px (long). Couvertures de réels : 140–150 px.
- **Interligne des titres de carrousel (10/11)** : 1,28 pour toutes les lignes d'un titre Anton, quelle que soit leur couleur (un mot rose ou blanc ne crée jamais un bloc à part) : la capitale, l'accent au-dessus (É, È, À) et la virgule ou la cédille dessous tiennent sans que deux lignes se touchent. Contrôle automatique avant « à valider » : la boîte réelle de chaque ligne est mesurée (accents compris) ; tout contact ou chevauchement entre deux lignes, et tout écart irrégulier de plus de 10 %, est refusé.
- **Texte : Plus Jakarta Sans** — 700 pour le corps (40–54 px en story), 800 pour les étiquettes et pills (30–36 px, majuscules, espacement 2–3 px), 400 rarement.
- Fichiers déjà dans le repo : `/fonts/anton-400.woff2`, `/fonts/pjs-400.woff2`, `pjs-700`, `pjs-800`.
- **Interdit :** toute police serif ou italique (type Instrument Serif), les polices manuscrites.

## 5. Le P bulle = la mascotte

Le P en verre liquide (`assets/p-bulle.png`) est la mascotte. À chaque fois qu'on pense commande ou nourriture, on doit penser à PFlow.

- **Placement fixe** sur tout visuel : en haut à gauche, ~115 px de large, à `x=80, y≈250–300`, suivi d'une **pill blanche** (étiquette de section, Plus Jakarta 800, 30 px, majuscules) : « PFLOW ORDER », « FAQ · 1/5 », « L'OFFRE »…
- En haut à droite : une **grille de points** (24 px d'écart, opacité 35 %) en couleur du texte.
- **En réel, 4 états :** il **entre** avec un « pop » sur le mot-clé de la vidéo · il **réagit** (petit sursaut) au moment du problème · il **brille** au moment de la solution · il **tient** le mot-clé à la fin.
- Le P et les icônes en verre sont les **seuls éléments 3D**. Tout le reste est plat.
- Exception : en photo de profil Instagram, le logo complet PFlow Order reste (validé par Jules).

## 6. L'élément récurrent : le ticket de commande

Le ticket de cuisine qui sort quand une commande arrive. Il dit « PFlow = une commande qui arrive, écrite, sans erreur ».

- Fond `creme`, texte `nuit`, largeur ~600 px, **bord inférieur dentelé** (demi-cercles de 22 px), légère rotation (−4° à +4°), ombre plate.
- Contenu type : en-tête « NOUVELLE COMMANDE » en Anton + numéro en `rose` (`#128`) · ligne pointillée · 2–3 lignes de commande (Plus Jakarta 700) · ligne pointillée · pill `nuit` « ✓ Reçue sur WhatsApp ».
- **Carrousel :** le ticket se déroule d'une slide à l'autre (fil conducteur) ; la dernière slide est le bas du ticket avec le mot-clé.
- **Réel :** le ticket sort par le bas de l'écran à la fin, accompagné de la signature sonore.

## 7. Icônes en verre

`assets/icones/` : bulle de discussion, étoile, ticket, point d'interrogation (+ le P). Même matière que le P : verre bleu électrique translucide, reflets cyan, léger reflet rose. Utilisation : illustration de section, puces d'étapes (90–130 px), décor (rotation 8–14°). Ne pas en mettre plus de 2 par visuel.

Pour une nouvelle icône (OpenAI, avec le P en image de référence) :
```
Une icône 3D unique de [sujet], style « verre liquide » glossy : verre bleu électrique translucide (#2AABFF) avec des reflets cyan (#74DDFB), un léger reflet rose (#FF4FB5) sur un bord, contours arrondis et gonflés comme une bulle, petits éclats de lumière blancs. Vue de face, centrée, aucune ombre au sol. Fond totalement transparent. Pas de texte. Même style que le logo joint. Format carré 1024×1024.
```

## 8. Composants graphiques

- **Box inclinée** (phrase choc) : Anton 74 px, majuscules, rotation −2°, fond `nuit` (sur `bleu`/`rose`) ou `rose` (sur `nuit`).
- **Carte réponse** : coins arrondis 40 px, padding 50–56 px, fond en aplat contrasté (`bleu` sur `nuit`, `nuit` sur `bleu`), texte 700, mots forts en 800 colorés.
- **Pills** : coins 60 px, Plus Jakarta 800.
- **Étincelles** : petites étoiles blanches à 4 branches (40–70 px), 1 à 3 par visuel.
- **Cadre photo** : bordure blanche 12–14 px, coins 40 px, rotation −3° à +3°, ombre plate.
- **Mockup iPhone** : bordure 14 px (`nuit` sur fond clair, blanc sur `nuit`), coins 62 px, îlot `nuit` en haut ; la capture du mini-site est **entièrement visible** (ajouter 70 px de crème en haut pour l'îlot). Deux téléphones max, inclinés −4° et +6°, avec une bulle `rose` au-dessus de chacun qui nomme une fonction (« Précommande même fermé »).
- **Tableau comparatif** : colonne concurrent atténuée (blanc 75 %), colonne PFlow sur fond `rose`.
- **Varier les visuels (10/11)** : un même visuel « principal » (l'écran d'appel entrant, la liste des appels manqués, les bulles « ×3 », le ticket ÉPUISÉ, un écran PFlow, l'horloge…) ne revient qu'une fois toutes les 2 semaines (avant ou après la date), et jamais deux fois dans le même contenu. L'historique des composants de chaque carrousel et de chaque réel est gardé (`generated.composants`) et contrôlé avant « à valider ». Le chiffre du calcul, le ticket simple et le ticket du mot-clé (la fin) ne comptent pas. Nouveaux composants (10/11) : horloge, deux colonnes, conversation WhatsApp, pile de tickets, mascotte en scène, écran zoomé. En créer d'autres au fil des semaines plutôt que réutiliser les mêmes.
- **Bibliothèque visuelle (10/11)** : onglet Charte > Bibliothèque visuelle : tous les composants (carrousels et réels motion), leur aperçu, leur dernière utilisation et la prochaine prévue. Quand un contenu a besoin d'un visuel qui n'existe pas, le générateur le note (« visuel_a_creer ») : il apparaît dans « Demandés, à créer » et un nouveau composant est créé dans la DA, plutôt que de réutiliser un ancien.

## 9. Formats

### Stories (1080×1920)
- Zone utile : de `y=250` à `y=1700` (Instagram masque le haut et le bas).
- Structure : en-tête (P + pill) · titre Anton · 1 à 3 éléments maximum · CTA.
- **Stickers (lien, question)** : ne jamais dessiner de cadre (le sticker n'a pas une taille fixe). Mettre une **pill + flèche ↓** (« Appuyez sur le lien en dessous ») et laisser **une zone vide d'au moins 450 px de haut** en dessous.
- Stories à la une existantes : Découvrir · Démo · Clients · Offre · FAQ (couvertures : icône en verre centrée sur fond `nuit`, aplat).

### Couvertures de réels (1080×1920)
- La grille rogne en 3:4 : **tout le contenu entre `y=240` et `y=1680`**.
- Modèle : en-tête (P + pill) · photo de Jules dans le cadre photo incliné (~860×700) · une icône en verre qui déborde du coin · titre Anton 2 lignes (ligne 2 en accent).
- Fonds tournants : `nuit` → `rose` → `bleu` pour que la grille alterne.
- Toujours **une vraie photo de Jules** sur les couvertures face caméra.

### Carrousels (1080×1350)
- Slide 1 = **le problème ou la promesse** en 2–4 mots géants (elle doit donner envie de faire défiler).
- **Une idée par slide, 15 mots maximum.** Le mot important en accent.
- Le ticket se déroule de slide en slide.
- Dernière slide = bas du ticket + mot-clé à commenter.
- 6 à 8 slides.

### Réels
Voir la section 10.

## 10. Montage des réels

**Références validées :** les montages de @devinjatho (split screen, animations sobres, une couleur qui s'allume) et le réel « 3 agents IA » de @iandy.prod (local, concret, mascotte, sous-titres simples).

- **Format principal : « posé dans sa chambre ».** Jules face caméra, micro-cravate, lumière en face, fond vert ou mur neutre. Au montage, le fond devient `nuit`.
- **Écran partagé :** en haut, les animations (conversation WhatsApp, ticket qui sort, tableau de bord, comparatifs) ; en bas, Jules.
- **Accroche en 1 seconde :** ce qu'on voit et ce qu'on entend disent la même chose dès la première image. 2 à 4 mots en Anton très gros, blancs, avec un mot en `rose`.
- **Rythme :** une coupe ou un changement visuel toutes les 1 à 2 secondes.
- **Texte à l'écran :** reprend mot pour mot ce que dit Jules sur les phrases clés.
- **Sous-titres :** Plus Jakarta 800, blanc avec contour `nuit`, mot en cours en `rose`.
- **Animations :** grises/sobres sur `nuit`, **une seule couleur qui s'allume** au moment où on en parle. Moment « problème » possible en noir et blanc.
- **Preuves :** montrer de vrais écrans (le bot démo, le mini-site, le tableau de bord). Fond d'écran WhatsApp en noir, jamais de contenu perso visible.
- **Fin :** le P tient le mot-clé + le ticket sort + signature sonore. Un seul CTA.
- **Durée :** 20 à 45 s.
- Format « histoire piège » apprécié : on croit regarder une tendance virale, puis transition inattendue vers PFlow.

## 10 ter. Face caméra monté (montage automatique des rushs)

**Validé par Jules le 09/11/2026.** Jules filme, le CRM monte (« Déposer mes rushs » sous le script, dans « À tourner »). Style @devinjatho : face caméra posé, sous-titres percutants, rythme rapide. Code : `api/_instagram/montage.js` (le plan), `rendu-reels/face-camera.js` (le rendu).

- **Rushs :** une ou plusieurs vidéos verticales filmées au téléphone, dans l'ordre ; 1080p 30 i/s conseillé (4 fois plus léger que la 4K). Envoi par morceaux de 45 Mo : aucune limite de taille.
- **Transcription :** ElevenLabs Speech to Text, horodatée au mot, en français. Faite une seule fois par vidéo : une retouche la reprend.
- **Coupes :** silences de plus de 0,30 s au milieu d'une phrase, hésitations (« euh », « hum », « bah », « ben »…), prises ratées. **Une phrase répétée : seule la dernière prise est gardée.**
- **Jump cuts :** à chaque coupe, un petit zoom alterné (100 %, 112 %, 100 %, 118 %), recadré vers le visage. Pas de zoom sur le premier plan.
- **Sous-titres mot par mot :** **Anton en majuscules, blanc, contour `nuit`**, groupes de 1 à 3 mots (14 caractères au plus) ; **un seul mot clé en `rose` #FF4FB5 par groupe** (les *mots* du script, les chiffres, le mot-clé, PFlow, WhatsApp…). Placés au tiers bas (y ≈ 1290), entre x = 90 et x = 940 : jamais sous la légende d'Instagram ni sous les boutons de droite. (Remplace, pour ce format seulement, les sous-titres Plus Jakarta du §10.)
- **Accroche :** l'écran d'accroche du script écrit en gros (Anton, 2 lignes, un mot `rose`) sur les **2 premières secondes**, en haut (y ≈ 430), avec un pop d'entrée.
- **Inserts :** quand Jules parle de quelque chose, l'image apparaît 1,6 s en haut de l'écran : vrais écrans PFlow de la **démo** (carte, commande, commande envoyée, ruptures, mode service), le ticket, le P, les icônes en verre (pizza, burger, bokit, frites). Un insert au plus toutes les 3 s, jamais pendant l'accroche. **Jamais de vraies données d'un client final** : seulement les écrans de démo (noms fictifs).
- **Musique :** choisie par le système des musiques apprises (`musique.js`), **baissée sous la voix** (elle remonte dans les silences) ; volume final -14 LUFS. Bruitages discrets : un whoosh sur une coupe sur deux, un pop sur chaque insert, le ding PFlow sur la fin.
- **Fin (2,6 s) :** fond `nuit`, le P en verre, « COMMENTEZ » + **le mot-clé du script en `rose`** (DEMO, CALCUL…), la phrase d'appel en Plus Jakarta `creme`.
- **Rendu :** 1080 × 1920, 30 i/s, H.264 + AAC, par l'atelier (GitHub Actions). **Couverture :** une image de Jules à 0,9 s, avec l'accroche écrite.
- **Validation :** le réel arrive « à valider » comme les autres. **Retouche :** Jules écrit ce qu'il veut changer (couper ou remettre une phrase, changer l'accroche, un insert, un mot rose, le zoom, la musique) ; seul ce point change, la transcription, les coupes et la musique restent. « Refaire » seul repart du montage automatique.
- **Durée :** 20 à 60 s (le contrôle refuse moins de 8 s et plus de 90 s).

## 10 bis. Réels motion design

Les contenus générés en vidéo (en alternance avec les carrousels) : sans visage, 100 % animation, montés automatiquement par l'atelier de rendu. Même DA que les visuels fixes.

- **Fonds en aplat** `nuit`, `bleu` ou `rose`, une couleur par plan. Aucun dégradé, aucun halo, aucun flou coloré.
- **Accroche en 1 seconde :** 2 à 4 mots en Anton très gros, blancs, un mot en `rose` (ou blanc sur `rose`/`bleu`), dès la première image.
- **Le P bulle** est la mascotte : il **pop** à l'entrée (avec le son « pop »), **réagit** (petit sursaut) sur le problème, **brille** sur la solution, **tient** le mot-clé à la fin.
- **Éléments animés :** conversation WhatsApp qui se tape, ticket, tableau de bord, chiffres, avec **une seule couleur qui s'allume** au moment où on en parle. Petites photos détourées (plats) en accent, jamais en plein écran.
- **Rythme :** une coupe ou un changement visuel toutes les 1 à 2 secondes ; textes qui entrent en glissé ou en coupe sèche.
- **Fin :** le ticket sort par le bas + **ding PFlow** + le P tient le mot-clé. Un seul CTA.
- **Son :** musique instrumentale calme (ou le son tendance ajouté par Jules dans Instagram), **whoosh** sur les transitions et les textes, **pop** sur le P et les éléments qui apparaissent, **notification WhatsApp** quand une commande arrive, **ding PFlow** au ticket.
- **Voix off** (quand il y en a) : la voix de Jules, au vouvoiement, phrases courtes ; sous-titres Plus Jakarta 800, mot en cours en `rose`.
- **Durée :** 12 à 30 s.

## 11. Signature sonore

- **« Le ding PFlow » :** un son de notification court (≈0,4 s), 2 notes montantes, clair et chaleureux, comme une commande qui arrive. **Toujours le même fichier**, à chaque réel, au moment où le ticket sort. C'est la signature.
- **Pop :** à chaque apparition du P.
- **Whoosh :** sur les transitions et les textes qui entrent.
- **Notification WhatsApp :** quand une commande arrive à l'écran.
- **Fond musical :** instrumental calme et moderne (lo-fi, chill), sans paroles, bas sous la voix.
- Fichiers : Jules choisit le « ding » (banques gratuites type Pixabay : rechercher *« order notification »*, *« success chime »*). Le stocker dans le CRM comme asset unique `ding-pflow`.

## 12. Les 4 séries

| Série | Contenu | Fréquence |
|---|---|---|
| **Coup de feu** | Une galère que tout restaurateur connaît (téléphone pendant le rush, commande mal notée, client qui rappelle), puis la commande qui arrive écrite. | 1×/semaine (face caméra) |
| **J'automatise votre resto** | « Voilà ce qui se passerait si [resto] passait chez PFlow » : son fonctionnement actuel en 2 s, puis son mini-site préparé dans l'atelier, à ses couleurs. Restos proposés en commentaires par les abonnés. **Toujours demander l'accord du resto avant**, jamais dénigrant, identifier le resto. | 1× toutes les 2 semaines |
| **Carnet** | Dans l'ordre de ce qui est disponible : débrief d'un rendez-vous (voiture, 30 s, sans nom sans accord) · sinon l'objection de la semaine entendue au téléphone ou en DM, et la réponse · sinon une question d'un resto en commentaire/DM. | 1×/semaine (face caméra) |
| **Coulisses** | Jules, 20 ans, étudiant en droit, qui construit PFlow : le code, le CRM, les galères, les nouveaux clients. | 1×/semaine + stories |

**Rythme : 5 publications par semaine** (hors stories, validé par Jules le 04/11/2026) :
- 2 vidéos face caméra : **Coup de feu** + **Carnet** ;
- 1 **Coulisses** ;
- 2 **contenus générés** par l'agent, en alternance : un **carrousel** puis un **réel motion design** (section 10 bis), puis un carrousel…
- **Une semaine sur deux**, « **J'automatise votre resto** » remplace un des 2 contenus générés.

**Stories tous les jours** : sondages ou quiz, partage du post du jour, conseil rapide ou avant / après. Des **stories Coulisses** sont proposées par l'agent quand il y a matière, mais pas obligatoirement chaque jour.

Tournage : 4 vidéos en 1 h le dimanche. L'agent propose les scripts dans l'onglet « À tourner ».

**Le jour d'une vidéo face caméra** (06/11/2026) : l'agent prépare un **contenu de secours** à 16 h 30, validé comme les autres, qui ne part que si Jules n'a pas cliqué « J'ai posté ma vidéo » avant. C'est un **réel motion design** tant que la semaine en compte moins de 2 (secours compris) ; au-delà (en pratique le jeudi et le vendredi), un **carrousel**. Alertes : le dimanche, une seule « Tournage aujourd'hui » avec les scripts de la semaine ; les jours de vidéo, seulement « Ta vidéo face caméra, c'est aujourd'hui ».

**Post épinglé à créer :** « Le calcul » (ce que coûte une commission de 30 % vs 49 €/mois) → mène au mot-clé CALCUL. Ce n'est pas une série.

## 13. Système mots-clés + cadeaux

Chaque post se termine par **un seul** mot-clé.

| Mot-clé | Où | Ce que la personne reçoit |
|---|---|---|
| **DEMO** | Commentaire sous un post | Lien du bot démo (pflow.fr/demo) |
| **CALCUL** | Commentaire sous un post | La page calculateur de commissions (à coder sur pflow.fr) |
| **JE VEUX** | Réponse à une story | Jules répond à la main au début, avec ce que PFlow donnerait pour son resto |

(CARTE et RESTO viendront plus tard.)

**Flux à automatiser :**
1. La personne commente le mot-clé.
2. Réponse publique automatique : « Envoyé en DM 📩 » (pousse les autres à commenter).
3. DM avec le cadeau.
4. Pour l'ouvrir, la personne laisse le nom de son resto + son numéro WhatsApp.
5. Une fiche arrive dans le CRM (Supabase) avec la source (post + mot-clé).
6. Une tâche « relancer » apparaît dans les tâches du jour de Jules.

Outil : l'API officielle de Meta (Contenu > Mots-clés du CRM). Le cadeau ne part qu'aux abonnés de @pflow.gp.

## 14. Légendes

- Première ligne = l'accroche (elle doit survivre au « … plus »).
- 3 à 6 lignes courtes, au **vous**.
- Un seul CTA, avec le mot-clé en majuscules.
- **3 hashtags maximum**, locaux et de niche (ex. `#restaurantguadeloupe #guadeloupe #martinique`).
- Mots-clés de recherche dans le texte : prise de commande, WhatsApp, restaurant, Guadeloupe, alternative Uber Eats.

## 15. Profil

- Nom : `PFlow | Prise de commande`
- Bio :
  ```
  📲 Vos clients commandent sur WhatsApp, 24h/24
  💸 0 % de commission
  📍 5 restos déjà équipés en Guadeloupe
  👇 Testez la démo en 30 s
  ```
- Lien unique : `pflow.fr/demo`
- 3 épinglés = réels face caméra avec couvertures au modèle (§9).

## 16. Checklist avant publication (à vérifier automatiquement)

- [ ] Fond en aplat, aucun dégradé, aucun halo
- [ ] Uniquement les 5 couleurs de la palette (+ blanc, + crème pour ticket/interface)
- [ ] Titres en Anton majuscules, texte en Plus Jakarta Sans, aucune italique ni serif
- [ ] Un seul segment en accent par titre
- [ ] L'étiquette correspond au contenu (« Conseil rapide » = une action sans PFlow, dès ce soir)
- [ ] Une idée par bloc : jamais le problème et la solution dans le même bloc ; ponctuation normale
- [ ] P bulle + pill en haut à gauche
- [ ] Contenu dans la zone utile (story 250–1700, couverture 240–1680) : rien sous y = 1700 sur une story (zone de réponse Instagram)
- [ ] Vouvoiement, pas de « chatbot », pas d'em dash
- [ ] Un seul CTA / un seul mot-clé
- [ ] Chiffres vrais, uniquement des clients réels
- [ ] Réel : accroche en 1 s, ding PFlow à la fin
- [ ] Validation de Jules dans le CRM avant publication
