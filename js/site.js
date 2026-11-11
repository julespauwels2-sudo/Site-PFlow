/* =====================================================================
   PFlow Order : le petit script du site (aucune librairie)
   1. Événements Vercel Web Analytics : clic_demo, clic_whatsapp, calcul_utilise
      chacun avec { emplacement } (hero, barre_mobile, calcul, preuves, prix, final, entete)
   2. Les paramètres UTM de l'adresse suivent vers /demo
   3. La barre collée en bas (mobile)
   4. Le calculateur de commission (accueil et /calcul)
   5. Les vidéos, chargées seulement quand on s'en approche
   Après une modification, augmenter le ?v= dans les pages HTML.
   ===================================================================== */
(function () {
  "use strict";
  var PRIX_PFLOW = 49;

  function evenement(nom, emplacement) {
    try { window.va && window.va("event", { name: nom, data: { emplacement: emplacement } }); } catch (e) {}
  }

  /* 1. un événement par bouton */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("[data-evt]") : null;
    if (a) evenement(a.getAttribute("data-evt"), a.getAttribute("data-emp") || "inconnu");
  });

  /* 2. les UTM (Instagram, etc.) suivent vers /demo pour que la démo sache d'où vient le visiteur */
  var utm = [];
  new URLSearchParams(location.search).forEach(function (v, k) { if (/^utm_/i.test(k)) utm.push(encodeURIComponent(k) + "=" + encodeURIComponent(v)); });
  if (utm.length) {
    document.querySelectorAll('a[href="/demo"]').forEach(function (a) { a.href = "/demo?" + utm.join("&"); });
  }

  /* 3. la barre du bas : visible une fois le haut de page passé, cachée sur le bloc final */
  var barre = document.getElementById("barre"), haut = document.getElementById("haut"), fin = document.getElementById("fin");
  if (barre && haut && "IntersectionObserver" in window) {
    var hautPasse = false, finVue = false;
    var maj = function () { barre.classList.toggle("vue", hautPasse && !finVue); };
    new IntersectionObserver(function (es) {
      hautPasse = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; maj();
    }).observe(haut);
    if (fin) new IntersectionObserver(function (es) { finVue = es[0].isIntersecting; maj(); }, { threshold: 0.25 }).observe(fin);
  }

  /* 4. le calculateur */
  var euros = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  function fr(n) { return euros.format(n).replace(/[\u202f\u2009]/g, "\u00a0"); }
  function prixTexte(n) { return fr(Math.round(n)) + "\u00a0€"; }
  function nombre(input, defaut) {
    if (!input) return defaut;
    var v = parseFloat(String(input.value).replace(",", "."));
    return isFinite(v) && v >= 0 ? v : 0;
  }
  document.querySelectorAll("[data-calc]").forEach(function (calc) {
    var champ = function (n) { return calc.querySelector('[data-champ="' + n + '"]'); };
    var res = function (n) { return calc.querySelectorAll('[data-res="' + n + '"]'); };
    var ecrire = function (n, texte) { res(n).forEach(function (el) { el.textContent = texte; }); };
    var signale = false, minuteur = null;

    function calculer() {
      var commandes = nombre(champ("commandes"), 0);
      var panier = nombre(champ("panier"), 0);
      var taux = nombre(champ("commission"), parseFloat(calc.getAttribute("data-commission")) || 30);
      var mois = commandes * panier * taux / 100;
      ecrire("mois", prixTexte(mois));
      ecrire("an", prixTexte(mois * 12));
      ecrire("taux", fr(taux) + "\u00a0%");
      ecrire("pflow-an", prixTexte(PRIX_PFLOW * 12));
      var garde = (mois - PRIX_PFLOW) * 12;
      ecrire("garde-an", prixTexte(Math.max(garde, 0)));
      calc.classList.toggle("moins-cher", garde <= 0);
    }
    calc.addEventListener("input", function () {
      calculer();
      if (signale) return;
      clearTimeout(minuteur);
      minuteur = setTimeout(function () { signale = true; evenement("calcul_utilise", calc.getAttribute("data-emp") || "calcul"); }, 1200);
    });
    calculer();
  });

  /* 5. les vidéos : rien n'est téléchargé avant qu'on s'en approche ; un fichier absent laisse l'emplacement */
  function existe(url) {
    return fetch(url, { method: "HEAD" }).then(function (r) {
      var type = r.headers.get("content-type") || "";
      return r.ok && !/text\/html/i.test(type);
    }).catch(function () { return false; });
  }
  function brancher(zone) {
    var src = zone.getAttribute("data-video"), poster = zone.getAttribute("data-poster");
    Promise.all([existe(src), poster ? existe(poster) : Promise.resolve(false)]).then(function (ok) {
      if (!ok[0]) return;
      var v = document.createElement("video");
      v.setAttribute("playsinline", "");
      v.setAttribute("aria-label", zone.hasAttribute("data-nom") ? "Réel de " + zone.getAttribute("data-nom") : "Vidéo du parcours de commande");
      if (ok[1]) v.poster = poster;
      if (zone.hasAttribute("data-boucle")) {
        v.muted = true; v.loop = true; v.autoplay = true; v.preload = "auto";
        var leg = zone.parentNode.querySelector("[data-legende]"); if (leg) leg.remove();
      } else {
        v.controls = true; v.preload = "none";
      }
      v.src = src;
      if (zone.hasAttribute("data-boucle")) { zone.appendChild(v); }
      else { zone.textContent = ""; zone.appendChild(v); zone.classList.add("ok"); }
      if (v.autoplay) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    });
  }
  var zones = document.querySelectorAll("[data-video]");
  if (zones.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); brancher(e.target); } });
      }, { rootMargin: "400px 0px" });
      zones.forEach(function (z) { io.observe(z); });
    } else { zones.forEach(brancher); }
  }
})();
