/* =====================================================================
   Barrierefreiheit für den Buchungstrainer (index.html und beamer.html)
   - immer an: Fokus bleibt nach dem Neuzeichnen erhalten, Fokusfalle in
     Fenstern, Rückmeldungen über aria-live, ARIA-Namen, Überschriften,
     Textalternativen für Belege, Links zu Barrierefreiheit/Impressum/Datenschutz
   - Schalter „Barrierefreiheit“ (standardmäßig aus, nur lokal gespeichert):
     größere Schrift, hoher Kontrast, weniger Bewegung; das Transkript
     der Erklärvideos wird dabei nur automatisch aufgeklappt.
   - Immer: Untertitelspur (WebVTT, standardmäßig aus) und Knopf „Transkript“,
     Hinweis „Sprecherstimme computergeneriert“ im Text der Seite.
   Keine Cookies, kein Tracking, keine Audioausgabe. Alle Pfade relativ,
   damit ein Umzug auf einen anderen Webspace nur ein Kopiervorgang ist.
   ===================================================================== */
(function () {
  "use strict";
  /* Linkziele kommen aus konfig.js (window.BT_KONFIG: impressum, datenschutz, barrierefreiheit, support). Fallback = Seiten neben der App. */
  var LINKS = {};
  function linksLesen() {
    var K = window.BT_KONFIG || {};
    var url = function (u, std) { return (typeof u === "string" && /^(https?:\/\/|[\w./-]+\.html$)/.test(u)) ? u : std; };
    LINKS.erklaerung = url(K.barrierefreiheit, "barrierefreiheit.html");
    LINKS.impressum = url(K.impressum, "impressum.html");
    LINKS.datenschutz = url(K.datenschutz, "datenschutz.html");
    LINKS.produkt = url(K.produktbeschreibung, "produktbeschreibung.html");
    LINKS.kontakt = (typeof K.support === "string" && /^[^@\s]+@[^@\s]+$/.test(K.support)) ? K.support : "kontakt@profmasar.at";
  }
  linksLesen();
  var KI_SATZ = "Die Stimme in diesem Erklärvideo ist computergenerierte (KI-)Sprache, es spricht keine reale Person.";
  var KEY = "bt-barrierefreiheit";
  var TEILE = [
    ["schrift", "Größere Schrift", "Texte und Knöpfe werden etwa ein Fünftel größer."],
    ["kontrast", "Hoher Kontrast", "Schwarze Schrift, kräftige Rahmen, unterstrichene Links."],
    ["bewegung", "Weniger Bewegung", "Keine Animationen, kein Konfetti, kein weiches Scrollen."],
    ["untertitel", "Transkript automatisch einblenden", "Beim Öffnen eines Erklärvideos steht der Sprechtext schon offen. Die Untertitelspur im Player und der Knopf „Transkript“ sind immer da."]
  ];
  var root = document.documentElement;
  var istBeamer = /\bbeamer\b/.test(document.body ? document.body.className : "") || /beamer\.html/i.test(location.pathname);

  /* ---------- Einstellungen (nur localStorage) ---------- */
  function laden() {
    var s = { an: false, schrift: true, kontrast: true, bewegung: true, untertitel: true };
    try { var x = JSON.parse(localStorage.getItem(KEY) || "null"); if (x && typeof x === "object") for (var k in s) if (typeof x[k] === "boolean") s[k] = x[k]; } catch (e) { }
    return s;
  }
  var E = laden();
  function speichern() { try { localStorage.setItem(KEY, JSON.stringify(E)); } catch (e) { } }
  function aktiv(teil) { return !!(E.an && E[teil]); }
  function anwenden() {
    root.classList.toggle("bf-an", !!E.an);
    root.classList.toggle("bf-gross", aktiv("schrift"));
    root.classList.toggle("bf-kontrast", aktiv("kontrast"));
    root.classList.toggle("bf-ruhig", aktiv("bewegung"));
    root.classList.toggle("bf-untertitel", aktiv("untertitel"));
    document.querySelectorAll(".bf-knopf").forEach(function (b) { b.setAttribute("aria-label", "Barrierefreiheit: " + (E.an ? "an" : "aus") + ". Einstellungen öffnen"); b.classList.toggle("an", !!E.an); });
    var m = document.getElementById("vidmodal"); if (m) videoAnpassen(m);
    try { window.dispatchEvent(new Event("resize")); } catch (e) { }   // Beamer passt die Bühne neu ein, Belege werden neu skaliert
  }
  anwenden();

  /* ---------- weniger Bewegung: auch die Animationen in JavaScript (Konfetti, weiches Scrollen) ---------- */
  var mmOrig = window.matchMedia ? window.matchMedia.bind(window) : null;
  if (mmOrig) {
    window.matchMedia = function (q) {
      if (aktiv("bewegung") && /prefers-reduced-motion\s*:\s*reduce/.test(String(q))) {
        var echt = mmOrig(q);
        return { matches: true, media: String(q), onchange: null, addListener: function () { }, removeListener: function () { }, addEventListener: function () { }, removeEventListener: function () { }, dispatchEvent: function () { return false; }, _echt: echt };
      }
      return mmOrig(q);
    };
  }
  function ruhig() { return aktiv("bewegung") || (mmOrig && mmOrig("(prefers-reduced-motion: reduce)").matches); }
  var sivOrig = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (o) {
    if (o && typeof o === "object" && ruhig()) { var n = {}; for (var k in o) n[k] = o[k]; n.behavior = "auto"; return sivOrig.call(this, n); }
    return sivOrig.apply(this, arguments);
  };
  var stOrig = window.scrollTo;
  window.scrollTo = function (a) {
    if (a && typeof a === "object" && ruhig()) { var n = {}; for (var k in a) n[k] = a[k]; n.behavior = "auto"; return stOrig.call(window, n); }
    return stOrig.apply(window, arguments);
  };

  /* ---------- Live-Region für Rückmeldungen ---------- */
  var live = document.createElement("div");
  live.id = "bf-live"; live.className = "bf-sr"; live.setAttribute("aria-live", "polite"); live.setAttribute("aria-atomic", "true");
  var liveAssertiv = document.createElement("div");
  liveAssertiv.id = "bf-live-wichtig"; liveAssertiv.className = "bf-sr"; liveAssertiv.setAttribute("aria-live", "assertive"); liveAssertiv.setAttribute("aria-atomic", "true");
  document.body.appendChild(live); document.body.appendChild(liveAssertiv);
  var zuletztGesagt = "", sagTimer = 0;
  function sagen(text, wichtig) {
    text = String(text || "").replace(/\s+/g, " ").trim();
    if (!text) return;
    if (text.length > 420) text = text.slice(0, 417).replace(/\s+\S*$/, "") + " …";
    var el = wichtig ? liveAssertiv : live;
    el.textContent = "";
    clearTimeout(sagTimer);
    sagTimer = setTimeout(function () { el.textContent = text; }, 60);
  }
  window.BF_SAGEN = sagen;
  // Rückmeldungen, die die App ohnehin anzeigt, werden zusätzlich vorgelesen (Screenreader)
  var MELDUNG = "#ergebnis, #rzfb .msg, #rzok, #fb .msg, .klmsg, .lzmsg, #fbdanke, .meilenstein, #klende h3, .qs0-fb, #lktoast, .msg.info";
  function meldungText(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll(".loesung, .erkl, svg, [aria-hidden='true']").forEach(function (x) { x.remove(); });
    return (c.textContent || "").replace(/\s+/g, " ").trim();
  }
  function meldungenPruefen(knoten) {
    var liste = [];
    knoten.forEach(function (n) {
      if (n.nodeType !== 1) n = n.parentElement;
      if (!n || !n.closest) return;
      if (n.closest("#bf-dlg, #bf-live, #bf-live-wichtig")) return;
      var m = n.closest(MELDUNG); if (m) liste.push(m);
      if (n.querySelectorAll) n.querySelectorAll(MELDUNG).forEach(function (x) { liste.push(x); });
    });
    var gesehen = [];
    liste.forEach(function (m) {
      if (gesehen.indexOf(m) >= 0 || !sichtbar(m)) return; gesehen.push(m);
      var t = meldungText(m); if (!t) return;
      var auf = document.querySelector("#aufgabe[data-id], [data-qs0-id]");
      var schluessel = (auf ? (auf.getAttribute("data-id") || auf.getAttribute("data-qs0-id")) : "") + "|" + t;
      if (schluessel === zuletztGesagt) return;
      zuletztGesagt = schluessel; sagen(t);
    });
  }

  /* ---------- Hilfen ---------- */
  function sichtbar(el) {
    if (!el || !el.isConnected) return false;
    var cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") return false;
    return el.getClientRects().length > 0;
  }
  var FOKUSIERBAR = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, video[controls], [tabindex]:not([tabindex="-1"])';
  function fokusListe(c) {
    return Array.prototype.filter.call(c.querySelectorAll(FOKUSIERBAR), function (el) { return sichtbar(el) && !el.closest("[inert]") && el.getAttribute("aria-hidden") !== "true"; });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function cssEsc(s) { return window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/["\\]/g, "\\$&"); }

  /* ---------- Fokus nach dem Neuzeichnen erhalten ----------
     Die App zeichnet nach jedem Klick den Bildschirm neu (innerHTML). Dabei ginge der
     Tastaturfokus verloren. Wir merken uns, welches Element fokussiert war, und setzen
     den Fokus auf das gleiche Element im neuen Bildschirm (oder auf den Anfang des Inhalts). */
  var letzteKennung = null, letztesEl = null, letzteAktion = 0, letzteArt = "", zurueckNachSheet = null;
  function kennung(el) {
    if (!el || el === document.body || !el.closest) return null;
    if (el.closest("#bf-dlg")) return null;
    if (el.id && !/^bf-/.test(el.id)) return "#" + cssEsc(el.id);
    var teile = [];
    Array.prototype.forEach.call(el.attributes, function (a) {
      if (/^data-/.test(a.name) && !/^data-(t|zeit|stamp)$/.test(a.name)) teile.push("[" + a.name + '="' + cssEsc(a.value) + '"]');
    });
    var sel = el.tagName.toLowerCase() + teile.join("");
    var row = el.closest(".brow[data-seite][data-i]");
    if (row && row !== el) sel = '.brow[data-seite="' + cssEsc(row.dataset.seite) + '"][data-i="' + cssEsc(row.dataset.i) + '"] ' + sel;
    if (!teile.length && !row) {
      var cls = (el.className && typeof el.className === "string") ? el.className.trim().split(/\s+/).filter(function (c) { return !/^(an|cur|sel|on|ok|bad|filled|open)$/.test(c); }).slice(0, 2) : [];
      sel = el.tagName.toLowerCase() + cls.map(function (c) { return "." + cssEsc(c); }).join("");
      return { sel: sel, text: (el.textContent || "").trim().slice(0, 60) };
    }
    return { sel: sel, text: null };
  }
  function finde(k) {
    if (!k) return null;
    if (typeof k === "string") { var e1 = document.querySelector(k); return e1 && sichtbar(e1) && !e1.disabled ? e1 : null; }
    var kand = Array.prototype.filter.call(document.querySelectorAll(k.sel), function (e) { return sichtbar(e) && !e.disabled; });
    if (k.text != null) kand = kand.filter(function (e) { return (e.textContent || "").trim().slice(0, 60) === k.text; });
    return kand[0] || null;
  }
  function fokusSetzen(el) { try { el.focus({ preventScroll: true }); } catch (e) { try { el.focus(); } catch (e2) { } } }
  function inhaltsAnfang() {
    var app = document.getElementById("app");
    if (!app) return null;
    var h = app.querySelector("h1, h2, h3");
    var ziel = h && sichtbar(h) ? h : app;
    if (!ziel.hasAttribute("tabindex")) ziel.setAttribute("tabindex", "-1");
    return ziel;
  }
  function offenerDialog() {
    var bf = document.getElementById("bf-dlg"); if (bf && !bf.hidden) return bf.querySelector(".bf-dlg-box");
    var vm = document.getElementById("vidmodal"); if (vm && vm.classList.contains("open")) return vm;
    var sh = document.getElementById("sheet"); if (sh && sh.classList.contains("open") && sichtbar(sh)) return sh;
    var alle = document.querySelectorAll('[aria-modal="true"], [role="dialog"], [role="alertdialog"]');
    for (var i = alle.length - 1; i >= 0; i--) { var d = alle[i]; if (d.id === "sheet" || d.closest("#vidmodal")) continue; if (sichtbar(d)) return d; }
    return null;
  }
  function fokusRetten() {
    var a = document.activeElement;
    if (a && a !== document.body && a.isConnected && sichtbar(a)) return;
    // nur wenn das fokussierte Element wirklich entfernt/versteckt wurde – ein normales Verlassen (blur, Tab) bleibt unangetastet
    if (letztesEl && letztesEl.isConnected && sichtbar(letztesEl)) return;
    if (Date.now() - letzteAktion > 2500) return;     // nur direkt nach einer Eingabe, nie bei Hintergrund-Updates
    if (letzteArt !== "keydown" && !zurueckNachSheet) return;   // Maus/Touch: die App steuert den Fokus selbst
    var dlg = offenerDialog();
    if (dlg) { var f = fokusListe(dlg)[0]; if (f) fokusSetzen(f); return; }
    var ziel = finde(zurueckNachSheet) || finde(letzteKennung);
    zurueckNachSheet = null;
    if (!ziel) ziel = inhaltsAnfang();
    if (ziel) fokusSetzen(ziel);
  }
  document.addEventListener("focusin", function (ev) { letztesEl = ev.target; var k = kennung(ev.target); if (k) letzteKennung = k; }, true);
  ["keydown", "pointerdown"].forEach(function (t) { document.addEventListener(t, function (ev) { if (t === "keydown" && /^(Shift|Control|Alt|Meta)$/.test(ev.key)) return; letzteAktion = Date.now(); letzteArt = t; }, true); });
  document.addEventListener("click", function (ev) { letzteAktion = Date.now(); if (ev.detail === 0) letzteArt = "keydown"; }, true);   // detail 0 = per Tastatur/Screenreader ausgelöst

  /* ---------- Fokusfalle in Fenstern ---------- */
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Tab") return;
    var d = offenerDialog(); if (!d) return;
    var l = fokusListe(d); if (!l.length) { ev.preventDefault(); return; }
    var i = l.indexOf(document.activeElement);
    if (ev.shiftKey && (i <= 0)) { ev.preventDefault(); fokusSetzen(l[l.length - 1]); }
    else if (!ev.shiftKey && (i === -1 || i === l.length - 1)) { ev.preventDefault(); fokusSetzen(l[0]); }
  }, true);

  /* ---------- Auswahlfenster (Konto/Betrag): Fokus hinein und wieder zurück ---------- */
  var sheetOffen = false, sheetOpener = null;
  function sheetBeobachten() {
    var sh = document.getElementById("sheet"); if (!sh) return;
    new MutationObserver(function () {
      var offen = sh.classList.contains("open");
      if (offen && !sheetOffen) {
        sheetOffen = true;
        sheetOpener = kennung(document.activeElement);
        var h = sh.querySelector("h3"); if (h) { h.id = "bf-sheet-titel"; sh.setAttribute("aria-labelledby", "bf-sheet-titel"); }
        sh.querySelectorAll(".kchip, .bchip").forEach(function (b) { if (b.classList.contains("cur")) b.setAttribute("aria-current", "true"); });
        var start = sh.querySelector(".cur") || fokusListe(sh)[0];
        if (start) setTimeout(function () { if (sh.classList.contains("open")) fokusSetzen(start); }, 30);
      } else if (!offen && sheetOffen) {
        sheetOffen = false;
        zurueckNachSheet = sheetOpener; letzteAktion = Date.now();
        setTimeout(function () {
          var a = document.activeElement;
          if (!a || a === document.body || sh.contains(a) || !sichtbar(a)) { var z = finde(zurueckNachSheet) || finde(letzteKennung); if (z) fokusSetzen(z); }
          zurueckNachSheet = null;
        }, 0);
      }
    }).observe(sh, { attributes: true, attributeFilter: ["class"], childList: true });
  }

  /* ---------- ARIA-Namen, Überschriften, Textalternativen ---------- */
  function setze(el, attr, wert) { if (el.getAttribute(attr) !== wert) el.setAttribute(attr, wert); }
  function belegName(bl) {
    var t = bl.querySelector("h4, .c b, .titel, .kopf b, b, strong");
    var s = t ? t.textContent.replace(/\s+/g, " ").replace(/Übungsbeleg · profmasar\.at/, "").trim() : "";
    var aus = bl.querySelector(".absender b, .aussteller b, .logo img[alt], .logo .wm");
    var von = aus ? (aus.getAttribute && aus.getAttribute("alt")) || aus.textContent : "";
    von = String(von || "").replace(/\s+/g, " ").trim();
    var sym = bl.querySelector(".stempel"); sym = sym ? sym.textContent.trim() : "";
    return "Beleg" + (sym ? " " + sym : "") + (s ? ": " + s.slice(0, 60) : "") + (von && s.indexOf(von) < 0 ? ", von " + von.slice(0, 60) : "");
  }
  function verbessern() {
    var app = document.getElementById("app");
    if (app && !app.hasAttribute("tabindex")) app.setAttribute("tabindex", "-1");
    // Buchungszeilen: Konto-/Betragsfelder mit Seite und Zeile benennen
    document.querySelectorAll(".brow[data-seite][data-i]").forEach(function (row) {
      var seite = row.dataset.seite, nr = (+row.dataset.i) + 1;
      row.querySelectorAll(".slot[data-pick]").forEach(function (b) {
        var art = b.dataset.pick === "konto" ? "Konto" : "Betrag";
        var sichtbarerText = b.textContent.replace(/\s+/g, " ").trim();   // sichtbarer Text steht vorne (WCAG 2.5.3 „Label in Name“)
        setze(b, "aria-label", sichtbarerText + ", " + (b.classList.contains("filled") ? art + " im " : "") + seite + ", Zeile " + nr);
      });
      var rm = row.querySelector("[data-rm]"); if (rm) setze(rm, "aria-label", "Zeile " + nr + " im " + seite + " entfernen");
      var mk = row.querySelector(".mark");
      if (mk) { setze(mk, "role", "img"); setze(mk, "aria-label", row.classList.contains("ok") ? "richtig" : "falsch"); }
    });
    // Beamer: Beträge mit Erklärung – sichtbarer Betrag gehört in den Namen
    document.querySelectorAll(".bm-hit[aria-label]").forEach(function (b) {
      var kl = b.cloneNode(true); kl.querySelectorAll('[aria-hidden="true"]').forEach(function (x) { x.remove(); });
      var t = kl.textContent.replace(/\s+/g, " ").trim(), l = b.getAttribute("aria-label");
      if (t && /[0-9A-Za-zÄÖÜäöü]/.test(t) && l.indexOf(t) !== 0) { var basis = b.dataset.bfLabel || l; b.dataset.bfLabel = basis; setze(b, "aria-label", t + ", " + basis); }
    });
    document.querySelectorAll(".side-h").forEach(function (h) { setze(h, "role", "heading"); setze(h, "aria-level", "3"); });
    var bu = document.querySelector("#buchung > div:first-child");
    if (bu && !bu.classList.contains("side")) { setze(bu, "role", "heading"); setze(bu, "aria-level", "2"); }
    var auf = document.getElementById("aufgabe");
    if (auf && !auf.querySelector(".bf-h-fall")) { var h2 = document.createElement("h2"); h2.className = "bf-sr bf-h-fall"; h2.textContent = "Geschäftsfall"; auf.insertBefore(h2, auf.firstChild); }
    document.querySelectorAll(".progress").forEach(function (p) {
      var i = p.querySelector("i"); if (!i) return;
      var w = parseFloat(i.style.width) || 0;
      setze(p, "role", "progressbar"); setze(p, "aria-label", "Fortschritt"); setze(p, "aria-valuemin", "0"); setze(p, "aria-valuemax", "100"); setze(p, "aria-valuenow", String(Math.round(w)));
    });
    // Belege: Name für Screenreader (der Beleg selbst ist echter Text und wird vollständig vorgelesen)
    document.querySelectorAll(".beleg-frame .bl, .qs0-beleg").forEach(function (bl) {
      setze(bl, "role", "group"); setze(bl, "aria-label", belegName(bl));
      var st = bl.querySelector(".stempel[aria-label]"); if (st) { st.removeAttribute("aria-label"); var sr = document.createElement("span"); sr.className = "bf-sr"; sr.textContent = "Belegsymbol "; st.insertBefore(sr, st.firstChild); }
    });
    document.querySelectorAll(".beleg-frame img:not([alt]), .vidthumb img:not([alt])").forEach(function (img) { img.setAttribute("alt", ""); });
    // Kopfbereich: Menü und Knopf „Barrierefreiheit“
    menueFuellen();
    knoepfeEinbauen();
    // Fußzeile: Links zu Barrierefreiheit, Impressum, Datenschutz, Kontakt
    document.querySelectorAll("footer.foot, footer.bf-fuss").forEach(function (f) {
      if (f.querySelector(".bf-rlinks")) return;
      var n = document.createElement("nav"); n.className = "bf-rlinks"; n.setAttribute("aria-label", "Barrierefreiheit und Rechtliches");
      n.innerHTML = linksHtml(); f.appendChild(n);
      var k = n.querySelector(".bf-oeffnen"); if (k) k.onclick = function (ev) { ev.preventDefault(); dialogOeffnen(k); };
    });
    // Erklärvideos
    var vm = document.getElementById("vidmodal"); if (vm && vm.classList.contains("open")) videoAnpassen(vm);
  }
  function linksHtml() {
    return '<button type="button" class="bf-linkknopf bf-oeffnen">Barrierefreiheit einstellen</button> · ' +
      '<a href="' + LINKS.erklaerung + '" target="_blank" rel="noopener">Barrierefreiheit (Erklärung)</a> · ' +
      '<a href="' + LINKS.impressum + '" target="_blank" rel="noopener">Impressum</a> · ' +
      '<a href="' + LINKS.datenschutz + '" target="_blank" rel="noopener">Datenschutz</a> · ' +
      '<a href="' + LINKS.produkt + '" target="_blank" rel="noopener">Bedingungen</a> · ' +
      '<a href="mailto:' + LINKS.kontakt + '">Support: ' + LINKS.kontakt + '</a>';
  }
  /* Menü oben (nav.app-menu / nav.menu): dieselben Ziele, jeder Link genau einmal */
  function menueFuellen() {
    document.querySelectorAll("nav.app-menu").forEach(function (n) {
      if (n.dataset.bfMenue) return; n.dataset.bfMenue = "1";
      n.innerHTML = '<a href="' + LINKS.impressum + '" target="_blank" rel="noopener">Impressum</a>' +
        '<a href="' + LINKS.datenschutz + '" target="_blank" rel="noopener">Datenschutz</a>' +
        '<a href="' + LINKS.produkt + '" target="_blank" rel="noopener">Produktbeschreibung</a>' +
        '<a href="' + LINKS.erklaerung + '" target="_blank" rel="noopener">Barrierefreiheit</a>' +
        '<a href="mailto:' + LINKS.kontakt + '">Support</a>';
    });
  }
  var ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="6.6" r="1.6" fill="currentColor"/><path d="M6.8 9.4c1.7.5 3.4.8 5.2.8s3.5-.3 5.2-.8M12 10.2v3.6M12 13.8l-2.4 4.6M12 13.8l2.4 4.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function knopf(extraKlasse) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "bf-knopf " + (extraKlasse || "") + (E.an ? " an" : "");
    b.setAttribute("aria-haspopup", "dialog");
    b.setAttribute("aria-label", "Barrierefreiheit: " + (E.an ? "an" : "aus") + ". Einstellungen öffnen");
    b.innerHTML = ICON + '<span class="bf-knopf-txt">Barrierefreiheit</span>';
    b.onclick = function () { dialogOeffnen(b); };
    return b;
  }
  function knoepfeEinbauen() {
    var menue = document.querySelector("header.top nav.app-menu, header.top nav.menu");
    var kopf = document.querySelector("header.top .wrap");
    if (menue && !istBeamer) { if (!menue.querySelector(".bf-knopf")) menue.appendChild(knopf("bf-im-menue")); }
    else if (kopf && !istBeamer && !kopf.querySelector(".bf-knopf")) kopf.insertBefore(knopf("bf-im-kopf"), kopf.firstChild);
    var lk = document.querySelector("#lehrerstart .ls-kopf");
    if (lk && !lk.querySelector(".bf-knopf")) lk.insertBefore(knopf("bf-im-kopf bf-ls"), lk.firstChild);
    // Beamer: in der Zoom-Leiste (über „Zoom“ in der dunklen Leiste), damit die Kopfleiste für die Lehrkraft unverändert bleibt
    var zb = document.getElementById("bmzoombar");
    if (zb && !zb.querySelector(".bf-knopf")) zb.appendChild(knopf("bf-chrome"));
  }

  /* ---------- Dialog „Barrierefreiheit“ ---------- */
  var dlgVon = null;
  function dialogHtml() {
    var teile = TEILE.map(function (t) {
      return '<label class="bf-teil"><input type="checkbox" data-bf-teil="' + t[0] + '"' + (E[t[0]] ? " checked" : "") + '><span><b>' + t[1] + '</b><span class="bf-hilfe">' + t[2] + '</span></span></label>';
    }).join("");
    return '<div class="bf-dlg-box" role="dialog" aria-modal="true" aria-labelledby="bf-dlg-titel" aria-describedby="bf-dlg-text">' +
      '<div class="bf-dlg-kopf"><h2 id="bf-dlg-titel">Barrierefreiheit</h2><button type="button" class="bf-zu" id="bf-zu" aria-label="Fenster schließen">Schließen ✕</button></div>' +
      '<p id="bf-dlg-text" class="bf-hilfe">Tastatur, Screenreader, starke Kontraste und Zoom bis 200 % funktionieren immer. Untertitel und Transkript der Erklärvideos sind immer erreichbar. Mit dem Schalter kommen dazu:</p>' +
      '<button type="button" class="bf-schalter" id="bf-schalter" role="switch" aria-checked="' + (E.an ? "true" : "false") + '"><span class="bf-schalter-txt">Barrierefreiheit</span><span class="bf-bahn" aria-hidden="true"><span class="bf-punkt"></span></span><span class="bf-zustand" aria-hidden="true">' + (E.an ? "an" : "aus") + '</span></button>' +
      '<fieldset class="bf-teile" id="bf-teile"' + (E.an ? "" : " hidden") + '><legend>Das ist eingeschaltet</legend>' + teile + '</fieldset>' +
      '<p class="bf-hilfe">Die Einstellung bleibt nur auf diesem Gerät gespeichert. Es wird nichts übertragen.</p>' +
      '<details class="bf-tasten"><summary>Bedienung mit der Tastatur</summary><ul>' +
      '<li><kbd>Tab</kbd> und <kbd>Umschalt</kbd> + <kbd>Tab</kbd>: zum nächsten bzw. vorigen Element</li>' +
      '<li><kbd>Enter</kbd> oder <kbd>Leertaste</kbd>: Knopf auslösen, Konto oder Betrag wählen</li>' +
      '<li><kbd>Esc</kbd>: Fenster, Auswahl oder Video schließen</li>' +
      '<li>Zoomen mit <kbd>Strg</kbd> + <kbd>+</kbd> bis 200 %, am Handy mit zwei Fingern</li></ul></details>' +
      '<nav class="bf-dlg-links" aria-label="Barrierefreiheit und Rechtliches">' +
      '<a href="' + LINKS.erklaerung + '" target="_blank" rel="noopener">Erklärung zur Barrierefreiheit</a>' +
      '<a href="' + LINKS.impressum + '" target="_blank" rel="noopener">Impressum</a>' +
      '<a href="' + LINKS.datenschutz + '" target="_blank" rel="noopener">Datenschutz</a>' +
      '<a href="mailto:' + LINKS.kontakt + '?subject=' + encodeURIComponent("Barrierefreiheit Buchungstrainer") + '">Barriere melden: ' + LINKS.kontakt + '</a></nav>' +
      '<div class="bf-dlg-fuss"><button type="button" class="btn primary bf-fertig" id="bf-fertig">Fertig</button></div></div>';
  }
  function dialogOeffnen(von) {
    var d = document.getElementById("bf-dlg");
    if (!d) { d = document.createElement("div"); d.id = "bf-dlg"; d.className = "bf-dlg"; document.body.appendChild(d); }
    dlgVon = von ? kennung(von) : letzteKennung;
    d.innerHTML = dialogHtml(); d.hidden = false;
    document.body.classList.add("bf-dlg-offen");
    d.onclick = function (ev) { if (ev.target === d) dialogSchliessen(); };
    d.querySelector("#bf-zu").onclick = dialogSchliessen;
    d.querySelector("#bf-fertig").onclick = dialogSchliessen;
    var sw = d.querySelector("#bf-schalter");
    sw.onclick = function () {
      E.an = !E.an; speichern(); anwenden();
      sw.setAttribute("aria-checked", E.an ? "true" : "false");
      sw.querySelector(".bf-zustand").textContent = E.an ? "an" : "aus";
      d.querySelector("#bf-teile").hidden = !E.an;
      sagen("Barrierefreiheit " + (E.an ? "eingeschaltet" : "ausgeschaltet") + ".");
    };
    d.querySelectorAll("[data-bf-teil]").forEach(function (c) {
      c.onchange = function () { E[c.dataset.bfTeil] = c.checked; speichern(); anwenden(); };
    });
    d.addEventListener("keydown", function (ev) { if (ev.key === "Escape") { ev.stopPropagation(); ev.preventDefault(); dialogSchliessen(); } });
    fokusSetzen(sw);
  }
  function dialogSchliessen() {
    var d = document.getElementById("bf-dlg"); if (!d || d.hidden) return;
    d.hidden = true; d.innerHTML = ""; document.body.classList.remove("bf-dlg-offen");
    var z = finde(dlgVon) || document.querySelector(".bf-knopf:not([hidden])");
    if (z && sichtbar(z)) fokusSetzen(z); else { var a = inhaltsAnfang(); if (a) fokusSetzen(a); }
  }
  window.BF = { oeffnen: dialogOeffnen, schliessen: dialogSchliessen, einstellungen: function () { return JSON.parse(JSON.stringify(E)); }, sagen: sagen };

  /* ---------- Erklärvideos: Hinweis Computerstimme, Untertitel (WebVTT) und Transkript ---------- */
  var transkripte = null, transkripteLaden = null;
  function ladeTranskripte() {
    if (transkripte) return Promise.resolve(transkripte);
    if (!transkripteLaden) transkripteLaden = fetch("untertitel/transkripte.json").then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { transkripte = (j && j.videos) || {}; return transkripte; }).catch(function () { transkripte = {}; return transkripte; });
    return transkripteLaden;
  }
  function videoSchluessel(v) {
    var s = v.getAttribute("src") || (v.querySelector("source") && v.querySelector("source").getAttribute("src")) || v.dataset.bfSrc || "";
    s = s.split("?")[0]; var i = s.indexOf("videos/"); return i >= 0 ? s.slice(i) : s;
  }
  function videoAnpassen(m) {
    var v = m.querySelector("video"); var box = m.querySelector(".vidbox");
    if (!v || !box) return;
    var kopf = box.querySelector(".vidkopf");
    // KI-Hinweis genau einmal je Video: der Satz steht schon im Fenster der App (.ki-stimme). Fehlt er, kommt derselbe Satz hierher, nie ein zweiter.
    if (kopf && !box.querySelector(".ki-stimme")) {
      var hinweis = document.createElement("p"); hinweis.className = "ki-stimme"; hinweis.textContent = KI_SATZ;
      kopf.parentNode.insertBefore(hinweis, kopf.nextSibling);
    }
    var key = videoSchluessel(v); if (key) v.dataset.bfSrc = key;
    var autoOffen = aktiv("untertitel");
    var alt = box.querySelector(".bf-transkript");
    if (alt && alt.dataset.key === key) { alt.open = autoOffen; transkriptLayout(m, alt); return; }
    ladeTranskripte().then(function (t) {
      if (!v.isConnected) return;
      var info = t[key]; if (!info) return;
      if (!v.querySelector("track.bf-track")) {
        var track = document.createElement("track");
        track.className = "bf-track"; track.kind = "subtitles"; track.srclang = "de"; track.label = "Deutsch (Sprechtext)"; track.src = info.vtt;
        // nicht default: Untertitel sind im Bild eingebrannt, sonst stünden sie doppelt
        v.appendChild(track);
        if (v.textTracks && v.textTracks.length) { try { v.textTracks[v.textTracks.length - 1].mode = "disabled"; } catch (e) { } }
      }
      var d = box.querySelector(".bf-transkript");
      if (!d) {
        d = document.createElement("details");
        d.className = "bf-transkript"; d.dataset.key = key;
        d.innerHTML = '<summary>Transkript</summary><div class="bf-transkript-text" tabindex="0" role="region" aria-label="Transkript ' + esc(info.titel) + '">' +
          '<p class="bf-ki-klein">Im Video sind Untertitel eingeblendet; hier steht der ganze Sprechtext zu „' + esc(info.titel) + '“.</p>' +
          info.szenen.map(function (s) { return "<h3>" + esc(s.titel) + "</h3><p>" + esc(s.text) + "</p>"; }).join("") + "</div>";
        var buehne = box.querySelector(".vidbuehne") || v;
        buehne.parentNode.insertBefore(d, buehne.nextSibling);
        d.addEventListener("toggle", function () { transkriptLayout(m, d); });
      } else { d.dataset.key = key; }
      d.open = autoOffen;
      transkriptLayout(m, d);
    });
  }
  function transkriptLayout(m, d) { if (m) m.classList.toggle("bf-mit-transkript", !!(d && d.open)); }

  /* ---------- Obere Leiste (beamer.html): Höhe nachführen, Browserleiste in Leistenfarbe ---------- */
  (function leiste() {
    var chrome = document.getElementById("bmchrome");
    if (!chrome) return;
    // Leiste als eigener Bereich mit Namen (Bildschirmleser: „Lehrgerät-Leiste“)
    if (!chrome.getAttribute("role")) { chrome.setAttribute("role", "banner"); chrome.setAttribute("aria-label", "Lehrgerät-Leiste"); }
    var meta = document.querySelector('meta[name="theme-color"]');
    var hell = meta ? meta.getAttribute("content") : "#ffffff";
    function farbe() {
      if (!meta) return;
      var sichtbar = getComputedStyle(chrome).display !== "none";
      var soll = sichtbar ? "#1f2a3a" : hell;
      if (meta.getAttribute("content") !== soll) meta.setAttribute("content", soll);
    }
    if (typeof ResizeObserver === "function") {
      try { new ResizeObserver(function () { if (typeof window.bmChromeHoehe === "function") window.bmChromeHoehe(); if (typeof window.applyZoom === "function") window.applyZoom(); }).observe(chrome); } catch (e) {}
    }
    new MutationObserver(farbe).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    farbe();
  })();

  /* ---------- Beobachter ---------- */
  var rafGeplant = false;
  function planen() { if (rafGeplant) return; rafGeplant = true; requestAnimationFrame(function () { rafGeplant = false; verbessern(); }); }
  new MutationObserver(function (muts) {
    var knoten = [];
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.target && m.target.closest && m.target.closest("#bf-live, #bf-live-wichtig")) continue;
      knoten.push(m.target);
      for (var j = 0; j < m.addedNodes.length; j++) knoten.push(m.addedNodes[j]);
    }
    if (!knoten.length) return;
    fokusRetten();
    meldungenPruefen(knoten);
    planen();
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") { var d = document.getElementById("bf-dlg"); if (d && !d.hidden) { ev.preventDefault(); dialogSchliessen(); } }
  });
  sheetBeobachten();
  verbessern();
})();
