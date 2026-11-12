/* =====================================================================
   L'OFFRE PFLOW ORDER : LES PRIX DES OPTIONS
   C'est le SEUL endroit à modifier : les prix s'affichent tout seuls
   sur la page d'accueil (carte « Options en plus ») et dans les CGV
   (article 4, détail de la livraison compris).
   L'abonnement de base (49 €/mois) est écrit directement dans les pages.

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
   Un prix vide ou entre crochets [ ] s'affiche « [prix à venir] ».
   ===================================================================== */
var OFFRE = {
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
    if (!v || /^\[.*\]$/.test(v)) return "[prix à venir]";
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

  /* accueil : les 3 paliers et leur prix, sans le détail des dépassements */
  function paliersSite(zone) {
    zone.textContent = "";
    (OFFRE.livraison || []).forEach(function (p) {
      var li = el("li");
      var nom = el("span", "pal-nom", p.nom);
      nom.appendChild(el("small", null, p.inclus == null ? "livraisons illimitées" : "jusqu'à " + p.inclus + " livraisons/mois"));
      li.appendChild(nom);
      li.appendChild(el("span", null, euros(p.prix) + "/mois"));
      zone.appendChild(li);
    });
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

  function remplir() {
    document.querySelectorAll("[data-offre]").forEach(function (e) {
      var cle = e.getAttribute("data-offre");
      if (cle === "pack") e.textContent = texte(OFFRE.pack && OFFRE.pack.prix);
      else if (cle === "pack-avant") e.textContent = OFFRE.pack && OFFRE.pack.auLieuDe ? "au lieu de " + texte(OFFRE.pack.auLieuDe) : "";
      else e.textContent = texte(OFFRE[cle]);
    });
    document.querySelectorAll("[data-offre-paliers]").forEach(paliersSite);
    document.querySelectorAll("[data-offre-livraison-cgv]").forEach(livraisonCgv);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", remplir);
  else remplir();
})();
