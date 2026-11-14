/* =====================================================================
   Vidéo de démo PFlow Order : le parcours sur le resto de démo Mint Bun
   Format vertical 9:16 (720 × 1280), 30 images/s, sans voix.
   DA : CHARTE.md (fonds en aplat, aucun dégradé ni halo, ombres plates,
   Anton en majuscules pour les titres, Plus Jakarta Sans pour le texte,
   crème réservé au ticket et aux écrans de commande).

   Pour modifier un texte : changer TEXTES ci-dessous.
   Pour modifier un plat ou un prix : changer CARTE.
   Pour changer le rythme : changer SCENES (en images ; 30 images = 1 s).
   Le haut de l'image (90 px) reste vide : sur le site, la vidéo est
   affichée dans un téléphone dont l'encoche couvre cette zone.
   ===================================================================== */
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill, Img, Sequence, continueRender, delayRender,
  interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing,
} from "remotion";

const C = {
  nuit: "#0A1236", nuit2: "#141D4F", rose: "#FF4FB5", bleu: "#2AABFF",
  creme: "#F3EEE6", reflet: "#74DDFB", blanc: "#FFFFFF",
};
const OMBRE = "14px 14px 0 rgba(0,0,0,.28)";
const TITRE = "Anton, Impact, sans-serif";
const TEXTE = "'Plus Jakarta Sans', system-ui, sans-serif";

export const TEXTES = {
  accroche1: "Vos clients commandent",
  accroche2: "sans appeler",
  demo: "Démo · Mint Bun (resto fictif)",
  etape1: "Le client écrit sur WhatsApp.",
  etape2: "Le client choisit sur la carte.",
  etape3: "Le client paie en ligne.",
  etape4: "Vous recevez la commande écrite.",
  messageClient: "Bonjour, je veux commander 🍔",
  reponse: "Bienvenue chez Mint Bun ! Voici notre carte :",
  boutonCarte: "Voir la carte",
  paiementOk: "Paiement accepté",
  notif: "Nouvelle commande #129",
  fin1: "Testez",
  fin2: "la démo",
  lien: "pflow.fr/demo",
};

export const CARTE = [
  { nom: "Mint Burger", detail: "Bœuf, cheddar, sauce menthe", prix: "11,50 €" },
  { nom: "Double Bun", detail: "Double steak, oignons confits", prix: "13,90 €" },
  { nom: "Frites maison", detail: "Portion généreuse", prix: "3,50 €" },
];

/* VITESSE : 1 = rythme d'origine (23,5 s) ; 1,75 = version courte du site (13,8 s).
   Les animations à l'intérieur des scènes vont VITESSE fois plus vite.
   Chaque texte reste au moins 1,2 s (36 images) à l'écran. */
const VITESSE = 1.75;

/* début et durée de chaque scène, en images (30 images = 1 s) */
const SCENES = {
  accroche: [0, 48],
  whatsapp: [48, 70],
  carte: [118, 84],
  paiement: [202, 68],
  resto: [270, 92],
  fin: [362, 54],
} as const;
export const DUREE = SCENES.fin[0] + SCENES.fin[1];

/* ---------- outils ---------- */
/* l'image courante, accélérée selon VITESSE */
const useFrame = () => useCurrentFrame() * VITESSE;
const useAppear = (debut: number, duree = 10) => {
  const f = useFrame();
  return interpolate(f, [debut, debut + duree], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
};
const usePop = (debut: number) => {
  const f = useFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - debut, fps, config: { damping: 11, stiffness: 160 } });
};

const Polices: React.FC = () => {
  const [handle] = useState(() => delayRender("Chargement des polices"));
  useEffect(() => {
    const polices = [
      new FontFace("Anton", `url(${staticFile("anton-400.woff2")})`),
      new FontFace("Plus Jakarta Sans", `url(${staticFile("pjs-700.woff2")})`, { weight: "700" }),
      new FontFace("Plus Jakarta Sans", `url(${staticFile("pjs-800.woff2")})`, { weight: "800" }),
    ];
    Promise.all(polices.map((p) => p.load()))
      .then((ps) => { ps.forEach((p) => document.fonts.add(p)); continueRender(handle); })
      .catch(() => continueRender(handle));
  }, [handle]);
  return null;
};

/* légende du bas : une idée, un point final */
const Legende: React.FC<{ num: number; texte: string; fond?: string; couleur?: string }> = ({ num, texte, fond = C.nuit, couleur = C.blanc }) => {
  const a = useAppear(4, 10);
  return (
    <div style={{
      position: "absolute", left: 40, right: 40, bottom: 70, display: "flex", alignItems: "center", gap: 18,
      background: fond, color: couleur, borderRadius: 60, padding: "20px 28px", boxShadow: OMBRE,
      transform: `translateY(${(1 - a) * 40}px)`, opacity: a, fontFamily: TEXTE, fontWeight: 800, fontSize: 30, lineHeight: 1.2,
    }}>
      <span style={{
        flex: "none", width: 56, height: 56, borderRadius: 28, background: C.bleu, color: C.nuit,
        display: "grid", placeItems: "center", fontFamily: TITRE, fontSize: 32,
      }}>{num}</span>
      {texte}
    </div>
  );
};

const Doigt: React.FC<{ x: number; y: number; a: number }> = ({ x, y, a }) => (
  <div style={{
    position: "absolute", left: x - 34, top: y - 34, width: 68, height: 68, borderRadius: 34,
    border: `6px solid ${C.rose}`, opacity: a, transform: `scale(${0.6 + a * 0.4})`,
  }} />
);

/* ---------- 1. accroche ---------- */
const Accroche: React.FC = () => {
  const p = usePop(2);
  const t1 = useAppear(8, 10);
  const t2 = useAppear(16, 10);
  const sous = useAppear(30, 10);
  return (
    <AbsoluteFill style={{ background: C.nuit, justifyContent: "center", padding: "0 56px" }}>
      <Img src={staticFile("p-bulle.webp")} style={{ width: 150, transform: `scale(${p}) rotate(${(1 - p) * -20}deg)`, marginBottom: 40 }} />
      <div style={{ fontFamily: TITRE, color: C.blanc, fontSize: 118, lineHeight: 1.04, textTransform: "uppercase" }}>
        <div style={{ opacity: t1, transform: `translateY(${(1 - t1) * 30}px)` }}>{TEXTES.accroche1}</div>
        <div style={{ color: C.rose, opacity: t2, transform: `translateY(${(1 - t2) * 30}px)` }}>{TEXTES.accroche2}.</div>
      </div>
      <div style={{ marginTop: 40, fontFamily: TEXTE, fontWeight: 800, fontSize: 28, color: C.reflet, opacity: sous }}>{TEXTES.demo}</div>
    </AbsoluteFill>
  );
};

/* ---------- 2. WhatsApp ---------- */
const EnTeteChat: React.FC = () => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 190, background: C.nuit, display: "flex", alignItems: "flex-end", padding: "0 36px 26px", gap: 20 }}>
    <div style={{ width: 76, height: 76, borderRadius: 38, background: C.bleu, color: C.nuit, display: "grid", placeItems: "center", fontFamily: TITRE, fontSize: 34 }}>MB</div>
    <div style={{ fontFamily: TEXTE, color: C.blanc }}>
      <div style={{ fontWeight: 800, fontSize: 34 }}>Mint Bun</div>
      <div style={{ fontWeight: 700, fontSize: 22, color: C.reflet }}>Commandes WhatsApp · PFlow</div>
    </div>
  </div>
);

const Bulle: React.FC<{ de: "client" | "resto"; debut: number; children: React.ReactNode }> = ({ de, debut, children }) => {
  const a = usePop(debut);
  const client = de === "client";
  return (
    <div style={{
      alignSelf: client ? "flex-end" : "flex-start", maxWidth: "80%", padding: "22px 26px", borderRadius: 30,
      borderBottomRightRadius: client ? 8 : 30, borderBottomLeftRadius: client ? 30 : 8,
      background: client ? C.bleu : C.blanc, color: C.nuit, fontFamily: TEXTE, fontWeight: 700, fontSize: 32, lineHeight: 1.3,
      opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - a) * 30}px) scale(${0.9 + a * 0.1})`,
      transformOrigin: client ? "right bottom" : "left bottom",
    }}>{children}</div>
  );
};

const WhatsApp: React.FC = () => {
  const f = useFrame();
  const ecrit = f > 32 && f < 60;
  const tap = interpolate(f, [104, 110, 122], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const enfonce = f >= 106 && f <= 116 ? 0.95 : 1;
  return (
    <AbsoluteFill style={{ background: C.creme }}>
      <EnTeteChat />
      <div style={{ position: "absolute", top: 240, left: 36, right: 36, display: "flex", flexDirection: "column", gap: 22 }}>
        <Bulle de="client" debut={8}>{TEXTES.messageClient}</Bulle>
        {ecrit && (
          <div style={{ alignSelf: "flex-start", background: C.blanc, borderRadius: 30, padding: "22px 30px", display: "flex", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 14, height: 14, borderRadius: 7, background: C.nuit, opacity: 0.3 + 0.7 * Math.abs(Math.sin((f + i * 5) / 5)) }} />
            ))}
          </div>
        )}
        {f >= 60 && (
          <Bulle de="resto" debut={60}>
            {TEXTES.reponse}
            <div style={{
              marginTop: 18, background: C.nuit, color: C.blanc, borderRadius: 40, padding: "18px 24px", textAlign: "center",
              fontWeight: 800, transform: `scale(${enfonce})`,
            }}>{TEXTES.boutonCarte}</div>
          </Bulle>
        )}
      </div>
      <Doigt x={330} y={560} a={tap} />
      <Legende num={1} texte={TEXTES.etape1} />
    </AbsoluteFill>
  );
};

/* ---------- 3. la carte ---------- */
const Carte: React.FC = () => {
  const f = useFrame();
  const entree = useAppear(0, 12);
  const ajoute = f >= 62;
  const pop = usePop(62);
  const tapPlus = interpolate(f, [56, 62, 74], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tapCmd = interpolate(f, [112, 118, 130], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: C.creme, transform: `translateX(${(1 - entree) * 720}px)` }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 300, background: C.bleu, padding: "120px 40px 0", color: C.nuit }}>
        <div style={{ fontFamily: TITRE, fontSize: 70, lineHeight: 1, textTransform: "uppercase" }}>Mint Bun</div>
        <div style={{ fontFamily: TEXTE, fontWeight: 800, fontSize: 26, marginTop: 10 }}>Burgers · à emporter ou en livraison</div>
      </div>
      <div style={{ position: "absolute", top: 330, left: 32, right: 32, display: "flex", flexDirection: "column", gap: 20 }}>
        {CARTE.map((p, i) => (
          <div key={p.nom} style={{ background: C.blanc, borderRadius: 28, padding: "24px 26px", display: "flex", alignItems: "center", gap: 20, fontFamily: TEXTE, color: C.nuit }}>
            <div style={{ width: 92, height: 92, borderRadius: 22, background: i === 0 ? C.rose : C.nuit2, flex: "none" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 32 }}>{p.nom}</div>
              <div style={{ fontWeight: 700, fontSize: 22, opacity: 0.65 }}>{p.detail}</div>
              <div style={{ fontWeight: 800, fontSize: 28, marginTop: 4 }}>{p.prix}</div>
            </div>
            <div style={{
              width: 64, height: 64, borderRadius: 32, background: i === 0 && ajoute ? C.rose : C.nuit, color: C.blanc,
              display: "grid", placeItems: "center", fontFamily: i === 0 && ajoute ? TITRE : TEXTE, fontWeight: 800, fontSize: 38,
              transform: i === 0 && ajoute ? `scale(${0.8 + pop * 0.2})` : undefined,
            }}>{i === 0 && ajoute ? "1" : "+"}</div>
          </div>
        ))}
      </div>
      <Doigt x={620} y={420} a={tapPlus} />
      {ajoute && (
        <div style={{
          position: "absolute", left: 32, right: 32, bottom: 200, background: C.nuit, color: C.blanc, borderRadius: 60,
          padding: "26px 32px", display: "flex", justifyContent: "space-between", fontFamily: TEXTE, fontWeight: 800, fontSize: 30,
          transform: `translateY(${(1 - pop) * 120}px)`, boxShadow: OMBRE,
        }}>
          <span>1 article · {CARTE[0].prix}</span><span style={{ color: C.rose }}>Commander →</span>
        </div>
      )}
      <Doigt x={560} y={1030} a={tapCmd} />
      <Legende num={2} texte={TEXTES.etape2} />
    </AbsoluteFill>
  );
};

/* ---------- 4. le paiement ---------- */
const Paiement: React.FC = () => {
  const f = useFrame();
  const entree = useAppear(0, 10);
  const tap = interpolate(f, [36, 42, 54], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ok = f >= 52;
  const pop = usePop(52);
  return (
    <AbsoluteFill style={{ background: C.creme, opacity: entree }}>
      <div style={{ position: "absolute", top: 140, left: 40, right: 40, fontFamily: TEXTE, color: C.nuit }}>
        <div style={{ fontFamily: TITRE, fontSize: 64, textTransform: "uppercase" }}>Votre commande</div>
        <div style={{ marginTop: 28, background: C.blanc, borderRadius: 28, padding: 28, fontWeight: 700, fontSize: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>1 × {CARTE[0].nom}</span><span>{CARTE[0].prix}</span></div>
          <div style={{ borderTop: `3px dashed rgba(10,18,54,.25)`, margin: "20px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}><span>Total</span><span>{CARTE[0].prix}</span></div>
          <div style={{ marginTop: 16, fontSize: 24, opacity: 0.7 }}>À emporter · prête à 19 h 45</div>
        </div>
        <div style={{ marginTop: 26, background: C.blanc, borderRadius: 28, padding: "24px 28px", fontWeight: 800, fontSize: 26, display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ width: 70, height: 46, borderRadius: 10, background: C.nuit }} />Paiement en ligne sécurisé
        </div>
        <div style={{
          marginTop: 34, borderRadius: 60, padding: "30px 0", textAlign: "center", fontWeight: 800, fontSize: 34,
          background: ok ? C.bleu : C.rose, color: C.nuit, boxShadow: f >= 40 && f <= 50 ? "4px 4px 0 rgba(0,0,0,.28)" : OMBRE,
        }}>{ok ? `✓ ${TEXTES.paiementOk}` : `Payer ${CARTE[0].prix}`}</div>
      </div>
      {ok && (
        <div style={{
          position: "absolute", top: 760, left: 0, right: 0, display: "grid", placeItems: "center",
        }}>
          <div style={{ width: 150, height: 150, borderRadius: 75, background: C.nuit, color: C.reflet, display: "grid", placeItems: "center", fontSize: 90, fontFamily: TEXTE, fontWeight: 800, transform: `scale(${pop})` }}>✓</div>
        </div>
      )}
      <Doigt x={360} y={706} a={tap} />
      <Legende num={3} texte={TEXTES.etape3} />
    </AbsoluteFill>
  );
};

/* ---------- 5. le resto reçoit la commande ---------- */
const LigneTicket: React.FC<{ debut: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ debut, children, style }) => {
  const a = useAppear(debut, 8);
  return <div style={{ opacity: a, clipPath: `inset(0 ${(1 - a) * 100}% 0 0)`, ...style }}>{children}</div>;
};

const Resto: React.FC = () => {
  const f = useFrame();
  const notif = usePop(8);
  const sortie = interpolate(f, [26, 46], [-420, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const pill = usePop(92);
  return (
    <AbsoluteFill style={{ background: C.nuit }}>
      <div style={{
        position: "absolute", top: 110, left: 30, right: 30, background: C.blanc, borderRadius: 30, padding: "22px 26px",
        display: "flex", gap: 20, alignItems: "center", fontFamily: TEXTE, color: C.nuit, boxShadow: OMBRE,
        transform: `translateY(${(1 - notif) * -260}px)`,
      }}>
        <Img src={staticFile("p-bulle.webp")} style={{ width: 64 }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>PFlow · {TEXTES.notif}</div>
          <div style={{ fontWeight: 700, fontSize: 24, opacity: 0.7 }}>1 × {CARTE[0].nom} · payée</div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center", overflow: "hidden", height: 640 }}>
        <div style={{ width: 520, transform: `translateY(${sortie}px) rotate(-3deg)`, filter: "drop-shadow(16px 16px 0 rgba(0,0,0,.28))" }}>
          <div style={{
            background: C.creme, color: C.nuit, padding: "36px 34px 64px", fontFamily: TEXTE,
            WebkitMaskImage: "radial-gradient(circle 14px at 50% 100%, transparent 13.5px, #000 14px), linear-gradient(#000 0 0)",
            WebkitMaskSize: "34px 34px, 100% calc(100% - 17px)", WebkitMaskRepeat: "repeat-x, no-repeat",
            WebkitMaskPosition: "bottom, top",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: TITRE, fontSize: 46, lineHeight: 1, textTransform: "uppercase" }}>Nouvelle commande</span>
              <span style={{ fontFamily: TITRE, fontSize: 38, background: C.rose, borderRadius: 40, padding: "6px 16px" }}>#129</span>
            </div>
            <LigneTicket debut={50} style={{ fontWeight: 700, fontSize: 24, opacity: 0.75, marginTop: 10 }}>À emporter · prête à 19 h 45</LigneTicket>
            <div style={{ borderTop: "3px dashed rgba(10,18,54,.35)", margin: "22px 0" }} />
            <LigneTicket debut={62} style={{ fontWeight: 800, fontSize: 34 }}>1  {CARTE[0].nom}</LigneTicket>
            <LigneTicket debut={72} style={{ fontWeight: 700, fontSize: 26, marginTop: 6 }}>Sans oignons</LigneTicket>
            <div style={{ borderTop: "3px dashed rgba(10,18,54,.35)", margin: "22px 0" }} />
            <span style={{
              display: "inline-flex", background: C.nuit, color: C.blanc, borderRadius: 60, padding: "14px 26px",
              fontWeight: 800, fontSize: 28, transform: `scale(${pill})`, transformOrigin: "left center",
            }}>✓ Reçue sur WhatsApp</span>
          </div>
        </div>
      </div>
      <Legende num={4} texte={TEXTES.etape4} fond={C.rose} couleur={C.nuit} />
    </AbsoluteFill>
  );
};

/* ---------- 6. fin ---------- */
const Fin: React.FC = () => {
  const p = usePop(2);
  const t = useAppear(10, 10);
  const l = useAppear(24, 10);
  return (
    <AbsoluteFill style={{ background: C.rose, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <Img src={staticFile("p-bulle.webp")} style={{ width: 170, transform: `scale(${p})` }} />
      <div style={{ marginTop: 36, fontFamily: TITRE, color: C.nuit, fontSize: 130, lineHeight: 1.05, textTransform: "uppercase", opacity: t, transform: `translateY(${(1 - t) * 30}px)` }}>
        <div>{TEXTES.fin1}</div>
        <div style={{ display: "inline-block", background: C.nuit, color: C.rose, padding: "0 22px", transform: "rotate(-2deg)", boxShadow: OMBRE }}>{TEXTES.fin2}</div>
      </div>
      <div style={{ marginTop: 50, fontFamily: TEXTE, fontWeight: 800, fontSize: 40, color: C.nuit, opacity: l }}>{TEXTES.lien}</div>
    </AbsoluteFill>
  );
};

export const MintBunDemo: React.FC = () => (
  <AbsoluteFill style={{ background: C.nuit }}>
    <Polices />
    <Sequence from={SCENES.accroche[0]} durationInFrames={SCENES.accroche[1]}><Accroche /></Sequence>
    <Sequence from={SCENES.whatsapp[0]} durationInFrames={SCENES.whatsapp[1]}><WhatsApp /></Sequence>
    <Sequence from={SCENES.carte[0]} durationInFrames={SCENES.carte[1]}><Carte /></Sequence>
    <Sequence from={SCENES.paiement[0]} durationInFrames={SCENES.paiement[1]}><Paiement /></Sequence>
    <Sequence from={SCENES.resto[0]} durationInFrames={SCENES.resto[1]}><Resto /></Sequence>
    <Sequence from={SCENES.fin[0]} durationInFrames={SCENES.fin[1]}><Fin /></Sequence>
  </AbsoluteFill>
);
