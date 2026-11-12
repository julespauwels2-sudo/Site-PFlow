/* =====================================================================
   PFlow Order : le petit script du site (aucune librairie)
   1. Événements Vercel Web Analytics : clic_demo, clic_whatsapp, calcul_utilise
      chacun avec { emplacement } (hero, barre_mobile, calcul, preuves, prix, final, entete)
   2. Les paramètres UTM de l'adresse suivent vers /demo
   3. La barre collée en bas (mobile)
   4. Les animations : apparition des blocs, chiffres qui comptent
   5. Le calculateur de commission (accueil et /calcul), résultat animé
   6. Les vidéos, chargées seulement quand on s'en approche
   Après une modification, augmenter le ?v= dans les pages HTML.
   ===================================================================== */
(function () {
  "use strict";
  window.PFLOW_OK = true;
  var PRIX_PFLOW = 49;
  var calme = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var IO = "IntersectionObserver" in window;

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
  if (barre && haut && IO) {
    var hautPasse = false, finVue = false;
    var maj = function () { barre.classList.toggle("vue", hautPasse && !finVue); };
    new IntersectionObserver(function (es) {
      hautPasse = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; maj();
    }).observe(haut);
    if (fin) new IntersectionObserver(function (es) { finVue = es[0].isIntersecting; maj(); }, { threshold: 0.25 }).observe(fin);
  }

  /* outils d'affichage des nombres (espace insécable : Anton n'a pas l'espace fine) */
  var euros = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  function fr(n) { return euros.format(n).replace(/[  ]/g, " "); }
  function prixTexte(n) { return fr(Math.round(n)) + " €"; }
  function anime(de, a, duree, chaqueImage) {
    if (calme || de === a) { chaqueImage(a); return; }
    var t0 = null;
    function pas(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / duree, 1), e = 1 - Math.pow(1 - p, 3);
      chaqueImage(de + (a - de) * e);
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  /* 4. apparition des blocs au défilement + chiffres qui comptent */
  var aReveler = document.querySelectorAll("[data-rv]");
  var compteurs = document.querySelectorAll("[data-compte]");
  if (calme || !IO) {
    aReveler.forEach(function (el) { el.classList.add("vu"); });
  } else {
    var ioRv = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("vu"); ioRv.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    aReveler.forEach(function (el) { ioRv.observe(el); });

    var ioCpt = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        ioCpt.unobserve(e.target);
        var el = e.target, cible = parseFloat(el.getAttribute("data-compte")) || 0;
        var depart = parseFloat(el.getAttribute("data-depart")) || 0;
        setTimeout(function () {
          anime(depart, cible, 600, function (v) { el.textContent = fr(Math.round(v)); });
        }, 150);
      });
    }, { threshold: 0.6 });
    compteurs.forEach(function (el) {
      el.textContent = fr(parseFloat(el.getAttribute("data-depart")) || 0);
      ioCpt.observe(el);
    });
  }

  /* 5. le calculateur */
  function nombre(input, defaut) {
    if (!input) return defaut;
    var v = parseFloat(String(input.value).replace(/\s/g, "").replace(",", "."));
    return isFinite(v) && v >= 0 ? v : 0;
  }
  document.querySelectorAll("[data-calc]").forEach(function (calc) {
    var champ = function (n) { return calc.querySelector('[data-champ="' + n + '"]'); };
    var precedent = {};
    var signale = false, minuteur = null;

    function ecrire(nom, valeur, enEuros, animer) {
      calc.querySelectorAll('[data-res="' + nom + '"]').forEach(function (el) {
        var de = precedent[nom] == null ? valeur : precedent[nom];
        var format = enEuros ? prixTexte : function (n) { return fr(n) + " %"; };
        if (animer && de !== valeur) {
          el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
          anime(de, valeur, 350, function (v) { el.textContent = format(enEuros ? Math.round(v) : v); });
        } else {
          el.textContent = format(valeur);
        }
      });
      precedent[nom] = valeur;
    }

    function calculer(animer) {
      var commandes = nombre(champ("commandes"), 0);
      var panier = nombre(champ("panier"), 0);
      var taux = nombre(champ("commission"), parseFloat(calc.getAttribute("data-commission")) || 30);
      var mois = commandes * panier * taux / 100;
      var garde = (mois - PRIX_PFLOW) * 12;
      ecrire("mois", mois, true, animer);
      ecrire("an", mois * 12, true, animer);
      ecrire("taux", taux, false, false);
      ecrire("pflow-an", PRIX_PFLOW * 12, true, false);
      ecrire("garde-an", Math.max(garde, 0), true, animer);
      calc.classList.toggle("moins-cher", garde <= 0);
    }
    calc.addEventListener("input", function () {
      calculer(true);
      if (signale) return;
      clearTimeout(minuteur);
      minuteur = setTimeout(function () { signale = true; evenement("calcul_utilise", calc.getAttribute("data-emp") || "calcul"); }, 1200);
    });
    calculer(false);
  });

  /* 6. les vidéos : rien n'est téléchargé avant qu'on s'en approche ; un fichier absent laisse l'emplacement */
  function existe(url) {
    return fetch(url, { method: "HEAD" }).then(function (r) {
      var type = r.headers.get("content-type") || "";
      return r.ok && !/text\/(html|plain)/i.test(type);
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
        v.muted = true; v.loop = true; v.autoplay = !calme; v.preload = "auto";
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
    if (IO) {
      /* les réels d'un carrousel se chargent ensemble, dès que le carrousel approche */
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          if (e.target.hasAttribute("data-video")) brancher(e.target);
          else e.target.querySelectorAll("[data-video]").forEach(brancher);
        });
      }, { rootMargin: "400px 0px" });
      var vus = [];
      zones.forEach(function (z) {
        var groupe = z.closest(".reels") || z;
        if (vus.indexOf(groupe) < 0) { vus.push(groupe); io.observe(groupe); }
      });
    } else { zones.forEach(brancher); }
  }
})();
