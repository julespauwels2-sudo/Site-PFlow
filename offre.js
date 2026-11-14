/* =====================================================================
   L'OFFRE PFLOW ORDER : LES PRIX DES OPTIONS
   C'est le SEUL endroit à modifier : les prix s'affichent tout seuls
   sur la page d'accueil (carte « Options en plus ») et dans les CGV
   (article 4, détail de la livraison compris).
   ABONNEMENT DE BASE : « base » sert au calcul du simulateur
   « Uber Eats ou PFlow » de l'accueil (le 49 € des textes est écrit dans
   les pages).

   LIVRAISON : 3 paliers. Écrire des nombres (pas de « € »), avec un
   point pour les centimes : 0.60 et non 0,60.
     prix        = prix du palier par mois
     inclus      = nombre de commandes livrées par mois comprises
                   (null = illimité)
     depassement = prix par livraison au-delà (null = aucun)
   Règle (CGV) : le restaurant paie toujours le montant le moins élevé
   entre son palier (dépassements compris) et le palier supérieur.

   AUTRES OPTIONS : écrire le prix entre guillemets, par exemple
     "9 €/mois"   -> affiché tel quel
     "sur demande" -> affiché « prix sur demande »
   Un prix vide ou entre crochets [ ] : la ligne n'est pas affichée.
   ===================================================================== */
var OFFRE = {
  base: 49,
  /* Uber Eats : le SEUL endroit où est écrit le taux de commission.
     taux = taux de référence (formule avec livraison), max = taux le plus haut de la grille. */
  uber: { taux: 30, max: 33 },
  livraison: [
    { nom: "Essentiel", prix: 59,  inclus: 100,  depassement: 0.60 },
    { nom: "Pro",       prix: 119, inclus: 300,  depassement: 0.50 },
    { nom: "Illimité",  prix: 190, inclus: null, depassement: null }
  ],
  stock:   "9 €/mois",
  avis:    "9 €/mois",
  paniers: "19 €/mois",
  pack:    { prix: "29 €/mois", auLieuDe: "37 €" }   /* stock + avis + relance */
};

/* ---------- Ne pas toucher en dessous ---------- */
(function () {
  var NBSP = " ";
  function texte(v) {
    v = String(v == null ? "" : v).trim();
    if (!v || /^\[.*\]$/.test(v)) return "";
    if (/sur demande/i.test(v)) return "prix sur demande";
    return v.replace(/ (€|%)/g, NBSP + "$1");
  }
  function euros(n) {
    var entier = Math.round(n * 100) % 100 === 0;
    return n.toLocaleString("fr-FR", { minimumFractionDigits: entier ? 0 : 2, maximumFractionDigits: 2 }).replace(/[  ]/g, NBSP) + NBSP + "€";
  }
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  /* coût réel d'un palier pour n livraisons (dépassements compris) */
  function cout(p, n) {
    if (p.inclus == null || n <= p.inclus) return p.prix;
    return p.prix + (n - p.inclus) * (p.depassement || 0);
  }

  function pourcent(n) { return String(n).replace(".", ",") + NBSP + "%"; }

  /* accueil : les 3 paliers, leur prix et le coût par livraison (sans le détail des dépassements) */
  function paliersSite(zone) {
    zone.textContent = "";
    (OFFRE.livraison || []).forEach(function (p) {
      var li = el("li");
      var nom = el("span", "pal-nom", p.nom);
      nom.appendChild(el("small", null, p.inclus == null ? "livraisons illimitées" : "jusqu'à " + p.inclus + " livraisons/mois"));
      li.appendChild(nom);
      var prix = el("span", null, euros(p.prix) + "/mois");
      prix.appendChild(el("small", null, p.inclus == null ? "plus vous livrez, moins ça coûte" : "soit " + euros(Math.round(p.prix / p.inclus * 100) / 100) + " par livraison"));
      li.appendChild(prix);
      zone.appendChild(li);
    });
  }

  /* « Avec Uber Eats à 30 %, une commande de 20 € vous coûte 6 €. » */
  function uberCommande(zone) {
    var panier = parseFloat(zone.getAttribute("data-panier")) || 20, t = OFFRE.uber.taux;
    zone.textContent = "Avec Uber Eats à " + pourcent(t) + ", une commande de " + euros(panier) + " vous coûte " + euros(panier * t / 100) + ".";
  }

  /* CGV : le détail complet de l'option livraison */
  function livraisonCgv(zone) {
    var P = OFFRE.livraison || [];
    zone.textContent = "";
    zone.appendChild(document.createTextNode("Livraison, en supplément de l'abonnement de base, selon trois paliers :"));
    var ul = el("ul");
    P.forEach(function (p) {
      var t = p.nom + " : " + euros(p.prix) + " par mois, ";
      if (p.inclus == null) t += "sans limite de commandes livrées.";
      else t += "jusqu'à " + p.inclus + " commandes livrées par mois ; au-delà, " + euros(p.depassement) + " par livraison.";
      ul.appendChild(el("li", null, t));
    });
    zone.appendChild(ul);
    zone.appendChild(el("span", null, "Le Client paie toujours le montant le moins élevé entre son palier, dépassements compris, et le palier supérieur."));
    /* exemple calculé à partir des paliers ci-dessus */
    if (P.length > 1 && P[0].inclus != null && P[1].inclus != null) {
      var n = P[1].inclus - 50, c = cout(P[0], n);
      if (n > P[0].inclus && c > P[1].prix) {
        zone.appendChild(document.createTextNode(" Exemple : un Client au palier " + P[0].nom + " qui fait " + n + " livraisons dans le mois devrait payer " +
          euros(P[0].prix) + " + " + (n - P[0].inclus) + " × " + euros(P[0].depassement) + " = " + euros(c) +
          " ; il paie " + euros(P[1].prix) + ", prix du palier " + P[1].nom + "."));
      }
    }
  }

  /* le palier le moins cher pour n livraisons */
  function meilleurPalier(n) {
    var P = OFFRE.livraison || [], best = null;
    P.forEach(function (p) { var c = cout(p, n); if (!best || c < best.cout) best = { palier: p, cout: c }; });
    return best;
  }

  /* simulateur « Uber Eats ou PFlow » : un curseur, tout est calculé ici */
  var calme = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function compte(e, de, a) {
    if (calme || de === a || !window.requestAnimationFrame) { e.textContent = String(Math.round(a)); return; }
    var t0 = null;
    function pas(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / 450, 1), v = de + (a - de) * (1 - Math.pow(1 - p, 3));
      e.textContent = Math.round(v).toLocaleString("fr-FR").replace(/[\u202f\u2009]/g, NBSP);
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }
  function simulateur(zone) {
    var curseur = zone.querySelector("input[type=range]");
    var panier = parseFloat(zone.getAttribute("data-panier")) || 20, t = OFFRE.uber.taux;
    var ecoAff = 0, vu = false;
    function ecrire(k, v) { zone.querySelectorAll('[data-s="' + k + '"]').forEach(function (e) { e.textContent = v; }); }
    function maj() {
      var n = parseFloat(curseur.value) || 100;
      var uber = n * panier * t / 100, b = meilleurPalier(n), pflow = (OFFRE.base || 49) + b.cout, eco = Math.max(uber - pflow, 0);
      ecrire("n", String(n)); ecrire("panier", euros(panier)); ecrire("taux", pourcent(t));
      ecrire("uber", euros(Math.round(uber))); ecrire("uber-cmd", euros(Math.round(panier * t) / 100));
      ecrire("pflow", euros(Math.round(pflow))); ecrire("base", euros(OFFRE.base || 49));
      ecrire("livraison", euros(Math.round(b.cout))); ecrire("palier", b.palier.nom);
      ecrire("pflow-cmd", euros(Math.round(pflow / n * 100) / 100));
      curseur.setAttribute("aria-valuetext", n + " commandes livrées par mois");
      zone.querySelectorAll('[data-s="eco"]').forEach(function (e) { if (vu) compte(e, ecoAff, eco); else e.textContent = String(Math.round(eco)); });
      ecoAff = eco;
    }
    curseur.addEventListener("input", maj);
    maj();
    /* le compteur de l'économie défile quand le bloc arrive à l'écran */
    if (!calme && "IntersectionObserver" in window) {
      zone.querySelectorAll('[data-s="eco"]').forEach(function (e) { e.textContent = "0"; });
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect(); vu = true;
        zone.querySelectorAll('[data-s="eco"]').forEach(function (e) { compte(e, 0, ecoAff); });
      }, { threshold: 0.4 });
      io.observe(zone);
    } else { vu = true; }
  }

  function remplir() {
    document.querySelectorAll("[data-offre]").forEach(function (e) {
      var cle = e.getAttribute("data-offre");
      if (cle === "pack") e.textContent = texte(OFFRE.pack && OFFRE.pack.prix);
      else if (cle === "pack-avant") e.textContent = OFFRE.pack && OFFRE.pack.auLieuDe ? "au lieu de " + texte(OFFRE.pack.auLieuDe) : "";
      else e.textContent = texte(OFFRE[cle]);
      /* prix manquant : on masque la ligne plutôt que d'afficher un emplacement */
      if (!e.textContent && cle !== "pack-avant") { var li = e.closest(".lignes li"); if (li) li.hidden = true; }
    });
    document.querySelectorAll("[data-offre-paliers]").forEach(paliersSite);
    document.querySelectorAll("[data-offre-livraison-cgv]").forEach(livraisonCgv);
    document.querySelectorAll("[data-simulateur]").forEach(simulateur);
    document.querySelectorAll("[data-offre-uber-commande]").forEach(uberCommande);
    document.querySelectorAll("[data-offre-taux]").forEach(function (e) { e.textContent = pourcent(OFFRE.uber.taux); });
    document.querySelectorAll("[data-offre-taux-max]").forEach(function (e) { e.textContent = pourcent(OFFRE.uber.max); });
    document.querySelectorAll("input[data-offre-taux-defaut]").forEach(function (e) { if (!e.dataset.modifie) e.value = String(OFFRE.uber.taux); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", remplir);
  else remplir();
})();
