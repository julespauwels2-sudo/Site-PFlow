/* =====================================================================
   L'OFFRE PFLOW ORDER : LES PRIX DES OPTIONS
   C'est le SEUL endroit à modifier : les prix s'affichent tout seuls
   sur la page d'accueil (carte prix) et dans les CGV (article 4).

   Écrire le prix entre les guillemets, par exemple :
     "29 €/mois"            -> affiché tel quel
     "à partir de 59 €/mois" -> affiché tel quel
     "sur demande"          -> affiché « prix sur demande »
   Tant qu'un prix est vide ou entre crochets [ ], le site affiche
   « [prix à venir] ».
   L'abonnement de base (49 €/mois) est écrit directement dans les pages.
   ===================================================================== */
var OFFRE = {
  livraison: "[PRIX_LIVRAISON]",
  stock:     "[PRIX_STOCK]",
  paniers:   "[PRIX_PANIERS]",
  avis:      "[PRIX_AVIS]"
};

/* Ne pas toucher en dessous : remplit chaque <span data-offre="..."> */
(function () {
  function texte(v) {
    v = String(v == null ? "" : v).trim();
    if (!v || /^\[.*\]$/.test(v)) return "[prix à venir]";
    if (/sur demande/i.test(v)) return "prix sur demande";
    return v.replace(/ (€|%)/g, " $1");
  }
  function remplir() {
    var els = document.querySelectorAll("[data-offre]");
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = texte(OFFRE[els[i].getAttribute("data-offre")]);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", remplir);
  else remplir();
})();
