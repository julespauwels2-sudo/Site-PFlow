# Vidéo de démo PFlow Order (resto fictif Mint Bun)

Vidéo verticale 9:16 (720 × 1280), 13,9 s, sans voix, faite avec [Remotion](https://www.remotion.dev) (des vidéos écrites en React).
Elle montre le parcours : le client écrit sur WhatsApp, ouvre la carte, ajoute un burger, paie, et le resto reçoit la commande (notification + ticket).
Sur le site, elle tourne en boucle dans le téléphone du bloc « Avec PFlow, c'est simple » (`/videos/parcours.mp4` et son aperçu `/videos/parcours.webp`).

## Ouvrir Remotion Studio sur votre ordinateur

Il faut Node.js 18 ou plus récent (https://nodejs.org) et une connexion internet la première fois.

```bash
cd video-demo
npm install
npm run studio
```

Le Studio s'ouvre dans le navigateur (http://localhost:3000). Vous voyez la vidéo, vous avancez image par image, et chaque modification du code s'affiche tout de suite.

## Modifier la vidéo

Tout est dans `src/MintBunDemo.tsx`, en haut du fichier :
- `TEXTES` : tous les textes à l'écran (accroche, légendes des 4 étapes, messages WhatsApp, fin) ;
- `CARTE` : les plats de Mint Bun et leurs prix ;
- `SCENES` : le début et la durée de chaque scène, en images (30 images = 1 seconde).
- `VITESSE` : la vitesse des animations dans les scènes (1,75 pour la version courte du site). Si vous l'augmentez, vérifiez que chaque texte reste au moins 1,2 s à l'écran.

Les couleurs (`C`) et les polices viennent de la charte (`CHARTE.md`). Les fichiers utilisés (polices, P bulle) sont dans `public/`.
Gardez le haut de l'image (environ 90 px) sans texte important : sur le site, l'encoche du téléphone le cache.

## Exporter et remplacer la vidéo du site

```bash
npm run render
```

La vidéo sort dans `out/demo.mp4`. Pour l'alléger et la mettre sur le site (ffmpeg doit être installé) :

```bash
ffmpeg -y -i out/demo.mp4 -an -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart ../videos/parcours.mp4
```

```bash
ffmpeg -y -ss 11.6 -i out/demo.mp4 -frames:v 1 -vf scale=540:960 -c:v libwebp -quality 75 ../videos/parcours.webp
```

La deuxième commande refait l'image d'aperçu (l'image à 11,6 s, celle du ticket). Les dossiers `node_modules/` et `out/` ne sont pas envoyés sur GitHub.
