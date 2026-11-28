/* Schul-Übersicht für die Administration einer Schule (Schullizenz, Server-Update 7).
   Anmelden mit dem Admin-Code der Schule (AD-XXXX-XXXX-XXXX-XXXX). Zeigt ohne Namen: belegte Plätze je Lehrkraft-Zugang und gesamt, Klassen, Zugänge.
   Zugänge sperren und freigeben, Plätze eines Zugangs freigeben, Geräte einer Lehrkraft abmelden, neue Zugänge erlauben oder sperren,
   Schuljahreswechsel (Zugänge und Klassen aus der Lizenz des Vorjahres übernehmen).
   Der Admin-Code bleibt nur in diesem Browser-Tab (sessionStorage) und wird bei jeder Anfrage mitgeschickt; der Server kennt ihn nur als Hash.
   Hat der Server Update 7 noch nicht, sagt die Seite das ehrlich und verweist auf die Lizenzseite. Kein Tracking. */
(function () {
  "use strict";
  const K = window.BT_KONFIG || {}, T = K.testmodus ? window.BT_TESTSERVER : null;
  const K_ADMIN = "buchungstrainer:schule:admin";
  const app = document.getElementById("app");
  const ss = { get: k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) { } }, del: k => { try { sessionStorage.removeItem(k); } catch (e) { } } };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const datumAT = ymd => { if (!ymd) return ""; const [y, m, d] = String(ymd).split("-"); return `${d}.${m}.${y}`; };
  const ZEICHEN = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let daten = null, meldung = null, laeuft = false, verfuegbar = null, fokusNach = null;

  async function post(pfad, d) {
    if (T) { try { return await T.post(pfad, d); } catch (e) { return { ok: false, fehler: "nicht_verfuegbar" }; } }
    if (!K.lizenzServer) return { ok: false, fehler: "nicht_verfuegbar" };
    const ac = new AbortController(), to = setTimeout(() => ac.abort(), 10000);
    try {
      const r = await fetch(K.lizenzServer.replace(/\/$/, "") + pfad, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d), mode: "cors", credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store", signal: ac.signal });
      let j = null; try { j = await r.json(); } catch (e) { }
      return j && typeof j === "object" ? j : { ok: false, fehler: "nicht_verfuegbar" };
    } catch (e) { return { ok: false, fehler: "nicht_verfuegbar" }; } finally { clearTimeout(to); }
  }
  const TEXTE = {
    format: "Der Admin-Code sieht so aus: AD-XXXX-XXXX-XXXX-XXXX.",
    admin_unbekannt: "Diesen Admin-Code gibt es nicht. Bitte prüfe die Schreibweise. Den Admin-Code hat die Schule mit der Lizenz bekommen.",
    inaktiv: "Diese Lizenz ist gesperrt. Bitte wende dich an den Buchungstrainer.",
    abgelaufen: "Diese Lizenz ist abgelaufen und ihre Daten sind gelöscht.",
    testbetrieb: "Im Testbetrieb gelten nur Test-Admin-Codes (AD-TEST-…).",
    zu_viele_versuche: "Zu viele Versuche. Bitte warte 15 Minuten.",
    zugang_unbekannt: "Diesen Zugang gibt es nicht mehr. Die Übersicht wird neu geladen.",
    vorjahr_unbekannt: "Das ist nicht der Admin-Code einer anderen Schullizenz.",
    vorjahr_nicht_aelter: "Dieser Admin-Code gehört nicht zu einer älteren Lizenz. Öffne die Übersicht mit dem Admin-Code der NEUEN Lizenz und gib hier den Code des Vorjahres ein.",
    vorjahr_geloescht: "Die Daten des Vorjahres sind schon gelöscht (30 Tage nach Ende der alten Lizenz). Die Lehrkräfte legen mit dem neuen Schulschlüssel neue Zugänge an.",
    schon_uebernommen: "Diese Lizenz hat schon Zugänge aus einer anderen Lizenz übernommen. Bitte wende dich an den Buchungstrainer.",
    anfrage: "Das hat nicht geklappt. Bitte lade die Seite neu.",
    nicht_verfuegbar: "Keine Verbindung zum Lizenzserver. Bitte versuche es gleich noch einmal.",
    fehler: "Das hat nicht geklappt. Bitte versuche es noch einmal."
  };
  const text = f => TEXTE[f] || TEXTE.fehler;
  const STATUS = { aktiv: "gültig", abgelaufen: "abgelaufen", noch_nicht_gueltig: "gilt noch nicht", inaktiv: "gesperrt" };
  function norm(e) {
    let s = String(e || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (s.length === 18 && s.startsWith("AD")) s = s.slice(2);
    if (s.length !== 16 || [...s].some(c => !ZEICHEN.includes(c))) return null;
    return "AD-" + s.match(/.{4}/g).join("-");
  }
  function fokus(id) { const h = document.getElementById(id); if (h) { if (!/^(INPUT|BUTTON|A)$/.test(h.tagName)) h.tabIndex = -1; h.focus(); } }

  async function admin(aktion, x) {
    const j = await post("/api/schule.php", Object.assign({ aktion, admin: ss.get(K_ADMIN) }, x || {}));
    if (j.ok) { daten = j; return j; }
    if (["admin_unbekannt", "inaktiv", "abgelaufen", "testbetrieb"].includes(j.fehler) && aktion === "admin_uebersicht") { ss.del(K_ADMIN); daten = null; }
    meldung = { art: "err", text: text(j.fehler) };
    if (j.fehler === "zugang_unbekannt") await admin("admin_uebersicht");
    return null;
  }
  async function start() {
    if (T) verfuegbar = true;
    else { const j = await post("/api/schule.php", { aktion: "info" }); verfuegbar = !!(j.ok && j.schullizenz); }
    if (verfuegbar && ss.get(K_ADMIN)) await admin("admin_uebersicht");
    zeichnen();
  }

  function zeichnen() {
    const banner = T ? T.bannerHtml("schule") : "";
    const m = meldung ? `<p class="msg ${meldung.art}" id="msg" role="status">${esc(meldung.text)}</p>` : `<p class="msg" id="msg" role="status"></p>`;
    const fuss = `<footer class="foot"><a href="lehrkraft.html">Lizenzseite für Lehrkräfte</a> · <a href="index.html">Zum Buchungstrainer</a> · Keine Namen, kein Tracking.</footer>`;
    if (verfuegbar === false) {
      app.innerHTML = banner + `<section class="card" aria-labelledby="nv"><h2 id="nv">Noch nicht verfügbar</h2>
        <p>Die Schul-Übersicht braucht ein Update des Lizenzservers, das noch nicht eingespielt ist. Bis dahin verwaltet jede Lehrkraft ihre Klassen und Plätze auf der Lizenzseite für Lehrkräfte.</p>
        <div class="knoepfe"><a class="linkbtn" href="lehrkraft.html">Zur Lizenzseite für Lehrkräfte</a></div></section>` + fuss;
      return;
    }
    if (!daten) {
      app.innerHTML = banner + `<section class="card" aria-labelledby="anm"><h2 id="anm">Mit dem Admin-Code öffnen</h2>
        <p>Hier sieht die Administration der Schule, wie viele Plätze der Schullizenz belegt sind, je Lehrkraft-Zugang und gesamt. Es gibt keine Namen: Zugänge haben nur eine Nummer.</p>
        <form id="anmform" novalidate><div class="zeile"><label class="feld">Admin-Code<input id="admincode" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="30" placeholder="AD-XXXX-XXXX-XXXX-XXXX"></label>
        <button class="btn primary" id="anmok" type="submit">Übersicht öffnen</button></div>${m}</form>
        <p class="small muted">Den Admin-Code hat die Schule mit der Lizenz bekommen (E-Mail zur Lieferung). Er bleibt nur in diesem Browser-Tab, bis du ihn schließt oder „Schließen“ wählst. Lehrkräfte brauchen ihn nicht.</p></section>` + fuss;
      if (T) T.bannerBinden();
      document.getElementById("anmform").onsubmit = async ev => {
        ev.preventDefault(); if (laeuft) return;
        const c = norm(document.getElementById("admincode").value);
        if (!c) { meldung = { art: "err", text: TEXTE.format }; zeichnen(); fokus("admincode"); return; }
        laeuft = true; const b = document.getElementById("anmok"); b.textContent = "Prüfe …"; b.setAttribute("aria-busy", "true");
        ss.set(K_ADMIN, c); meldung = null;
        try { await admin("admin_uebersicht"); } finally { laeuft = false; }
        zeichnen(); fokus(daten ? "sch" : "admincode");
      };
      if (fokusNach) { fokus(fokusNach); fokusNach = null; }
      return;
    }
    const S = daten.schule, Z = daten.zugaenge, voll = S.belegt >= S.plaetze, pz = Math.min(100, Math.round(S.belegt / Math.max(1, S.plaetze) * 100));
    const sum = f => Z.reduce((n, z) => n + z[f], 0);
    const zeile = z => `<tr id="zug-${z.id}"><th scope="row">Zugang ${z.nr}</th><td>…-${esc(z.hinweis)}</td>
        <td class="status-${esc(z.status)}">${z.status === "aktiv" ? "aktiv" : "gesperrt"}</td>
        <td class="zahl">${z.klassen}</td><td class="zahl">${z.belegt}</td><td class="zahl">${z.geraete}</td>
        <td>${z.status === "aktiv" ? `<button type="button" class="linkbtn" data-a="sperren" data-id="${z.id}" aria-label="Zugang ${z.nr} sperren">Sperren</button>` : `<button type="button" class="linkbtn" data-a="freigeben" data-id="${z.id}" aria-label="Zugang ${z.nr} freigeben">Freigeben</button>`}
          ${z.belegt ? `<button type="button" class="linkbtn" data-a="plaetze" data-id="${z.id}" aria-label="Plätze freigeben: Zugang ${z.nr}">Plätze freigeben</button>` : ""}
          ${z.geraete ? `<button type="button" class="linkbtn" data-a="geraete" data-id="${z.id}" aria-label="Geräte abmelden: Lehrkraft-Geräte von Zugang ${z.nr}">Geräte abmelden</button>` : ""}</td></tr>`;
    const frist = S.status === "noch_nicht_gueltig" ? `Diese Lizenz gilt ab ${esc(datumAT(S.gueltig_von))}.` : "";
    app.innerHTML = banner + `<section class="card" aria-labelledby="sch"><h2 id="sch">${esc(S.name || "Schullizenz")}${S.test ? " (Test)" : ""}</h2>
      <dl class="fakten"><dt>Lizenz</dt><dd>${esc(STATUS[S.status] || S.status)} · ${esc(datumAT(S.gueltig_von))} bis ${esc(datumAT(S.gueltig_bis))}</dd>
        <dt>Schulschlüssel</dt><dd>…-${esc(S.hinweis)}</dd><dt>Admin-Code</dt><dd>…-${esc(S.admin_hinweis)}</dd>
        <dt>Klassen</dt><dd id="klassenzahl">${S.klassen} von ${S.max_klassen}</dd><dt>Lehrkraft-Zugänge</dt><dd id="zugangzahl">${S.zugaenge} von ${S.max_zugaenge}</dd>
        <dt>Neue Zugänge</dt><dd id="offen">${S.zugang_offen ? "erlaubt (mit dem Schulschlüssel)" : "gesperrt"}</dd></dl>
      <div class="plaetze"><span class="zahl" id="belegt">${S.belegt} von ${S.plaetze}</span><span>Plätzen belegt (ganze Schule)</span></div>
      <div class="balken${voll ? " voll" : ""}" role="img" aria-label="${S.belegt} von ${S.plaetze} Plätzen belegt${voll ? ", voll" : ""}"><i style="width:${pz}%"></i></div>
      ${voll ? `<p class="vollhinweis" id="vollhinweis"><strong>Voll:</strong> Alle Plätze sind belegt. Neue Schülergeräte bekommen die Meldung „voll“. Geräte, die schon in einer Klasse sind, arbeiten weiter. Plätze werden frei, wenn eine Lehrkraft oder du hier Plätze freigibst.</p>` : ""}
      <p class="small muted">${frist} Ein Platz ist ein Schülergerät in einer Klasse. Lehrkraft-Geräte belegen keinen Platz (höchstens ${S.geraete_pro_zugang} je Zugang).</p>
      <div class="knoepfe"><button type="button" class="linkbtn" id="offenwechsel">${S.zugang_offen ? "Neue Zugänge sperren" : "Neue Zugänge erlauben"}</button><button type="button" class="linkbtn" id="neuladen">Neu laden</button><button type="button" class="linkbtn" id="schliessen">Schließen (Admin-Code aus diesem Tab entfernen)</button></div>${m}</section>
      <section class="card" aria-labelledby="zt"><h2 id="zt">Lehrkraft-Zugänge</h2>
        ${Z.length ? `<div class="tabwrap"><table class="zug"><caption class="small muted">Belegte Plätze je Zugang. Keine Namen und keine Klassennamen.</caption>
          <thead><tr><th scope="col">Zugang</th><th scope="col">Code-Ende</th><th scope="col">Status</th><th scope="col" class="zahl">Klassen</th><th scope="col" class="zahl">Plätze belegt</th><th scope="col" class="zahl">Lehrkraft-Geräte</th><th scope="col">Aktionen</th></tr></thead>
          <tbody>${Z.map(zeile).join("")}</tbody>
          <tfoot><tr><th scope="row">Summe</th><td></td><td></td><td class="zahl">${sum("klassen")}</td><td class="zahl" id="summe">${sum("belegt")}</td><td class="zahl">${sum("geraete")}</td><td></td></tr></tfoot></table></div>`
          : `<p>Noch keine Lehrkraft-Zugänge. Gib den Lehrkräften den Schulschlüssel und den Link zur <a href="lehrkraft.html">Lizenzseite</a>. Jede Lehrkraft legt dort einmal ihren eigenen Zugang an.</p>`}
        <p class="small muted">Gesperrt: Die Lehrkraft kann ihre Klassen nicht mehr verwalten, neue Geräte können ihren Klassen nicht beitreten. Schülergeräte, die schon in einer Klasse sind, arbeiten weiter. „Geräte abmelden“ hilft, wenn eine Lehrkraft ein Gerät verloren hat: Sie meldet sich danach mit ihrem persönlichen Code neu an.</p></section>
      <section class="card" aria-labelledby="sjw"><h2 id="sjw">Schuljahreswechsel</h2>
        <p>Für jedes Schuljahr gibt es eine neue Lizenz mit neuem Schulschlüssel und neuem Admin-Code. Öffne diese Übersicht mit dem <strong>neuen</strong> Admin-Code und gib hier den Admin-Code des <strong>Vorjahres</strong> ein.</p>
        <ul class="small"><li>Übernommen werden: Lehrkraft-Zugänge (die persönlichen Codes gelten weiter) und Klassen mit Namen und freigegebenen Themen.</li>
          <li>Nicht übernommen werden: Schülergeräte und Klassencodes. Die Lehrkräfte erzeugen im neuen Schuljahr neue Klassencodes, die Schülerinnen und Schüler geben sie neu ein.</li>
          <li>Frist: bis 30 Tage nach Ende der alten Lizenz (Ende 31.8. → bis 30.9.). Danach werden die alten Zugänge, Klassen und Geräte-Hashes gelöscht.</li>
          <li>Diese Lizenz: Übernahme ins nächste Schuljahr bis ${esc(datumAT(S.daten_bis))}.</li></ul>
        ${S.vorjahr_bis ? `<p id="vorjahr-ok"><strong>Übernommen</strong> aus der Lizenz bis ${esc(datumAT(S.vorjahr_bis))}. Du kannst die Übernahme wiederholen; schon Übernommenes wird nicht doppelt angelegt.</p>` : ""}
        <form id="uebform" novalidate><div class="zeile"><label class="feld">Admin-Code des Vorjahres<input id="vorjahr" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="30" placeholder="AD-XXXX-XXXX-XXXX-XXXX"></label>
          <button class="btn" type="submit" id="uebok">Zugänge und Klassen übernehmen</button></div></form></section>` + fuss;
    if (T) T.bannerBinden();
    binden();
    if (fokusNach) { fokus(fokusNach); fokusNach = null; }
  }
  function binden() {
    document.getElementById("schliessen").onclick = () => { ss.del(K_ADMIN); daten = null; meldung = { art: "ok", text: "Geschlossen. Der Admin-Code ist aus diesem Tab entfernt." }; fokusNach = "anm"; zeichnen(); };
    document.getElementById("neuladen").onclick = async () => { if (laeuft) return; laeuft = true; meldung = null; try { const j = await admin("admin_uebersicht"); if (j) meldung = { art: "ok", text: "Übersicht neu geladen." }; } finally { laeuft = false; } fokusNach = daten ? "neuladen" : "admincode"; zeichnen(); };
    document.getElementById("offenwechsel").onclick = async () => {
      if (laeuft) return;
      const offen = !daten.schule.zugang_offen;
      if (!offen && !confirm("Neue Zugänge sperren?\n\nMit dem Schulschlüssel kann dann keine weitere Lehrkraft einen Zugang anlegen. Bestehende Zugänge arbeiten weiter.")) return;
      laeuft = true;
      try { const j = await admin("admin_neue_zugaenge", { offen }); if (j) meldung = { art: "ok", text: offen ? "Neue Zugänge sind wieder erlaubt." : "Neue Zugänge sind gesperrt. Bestehende Zugänge arbeiten weiter." }; } finally { laeuft = false; }
      fokusNach = "offenwechsel"; zeichnen();
    };
    app.querySelectorAll("table.zug [data-a]").forEach(b => b.onclick = async () => {
      if (laeuft) return;
      const id = +b.dataset.id, z = daten.zugaenge.find(x => x.id === id), a = b.dataset.a;
      const frage = { sperren: `Zugang ${z.nr} sperren?\n\nDie Lehrkraft kann ihre Klassen dann nicht mehr verwalten, neue Geräte können ihren Klassen nicht beitreten. Schülergeräte, die schon drin sind, arbeiten weiter. Du kannst den Zugang jederzeit wieder freigeben.`,
        plaetze: `Alle ${z.belegt} Plätze von Zugang ${z.nr} freigeben?\n\nDie Schülergeräte in diesen Klassen müssen den Klassencode danach neu eingeben.`,
        geraete: `Alle ${z.geraete} Lehrkraft-Geräte von Zugang ${z.nr} abmelden?\n\nDie Lehrkraft meldet sich danach mit ihrem persönlichen Code neu an. Ihre Klassen bleiben.` }[a];
      if (frage && !confirm(frage)) return;
      laeuft = true;
      try {
        const j = a === "sperren" || a === "freigeben" ? await admin("admin_zugang", { id, status: a === "sperren" ? "gesperrt" : "aktiv" })
          : await admin(a === "plaetze" ? "admin_plaetze_frei" : "admin_geraete_ab", { id });
        if (j) meldung = { art: "ok", text: a === "sperren" ? `Zugang ${z.nr} ist gesperrt.` : a === "freigeben" ? `Zugang ${z.nr} ist wieder freigegeben.`
          : a === "plaetze" ? `${j.frei} ${j.frei === 1 ? "Platz" : "Plätze"} von Zugang ${z.nr} freigegeben.` : `${j.abgemeldet} ${j.abgemeldet === 1 ? "Gerät" : "Geräte"} von Zugang ${z.nr} abgemeldet.` };
      } finally { laeuft = false; }
      fokusNach = "msg"; zeichnen();
    });
    document.getElementById("uebform").onsubmit = async ev => {
      ev.preventDefault(); if (laeuft) return;
      const c = norm(document.getElementById("vorjahr").value);
      if (!c) { meldung = { art: "err", text: TEXTE.format }; fokusNach = "vorjahr"; zeichnen(); return; }
      if (!confirm("Zugänge und Klassen aus dem Vorjahr übernehmen?\n\nÜbernommen werden Lehrkraft-Zugänge und Klassen (Name, Themen). Schülergeräte und Klassencodes werden nicht übernommen.")) return;
      laeuft = true;
      try {
        const j = await admin("admin_uebernehmen", { vorjahr: c });
        if (j) { const u = j.uebernommen; meldung = { art: "ok", text: `Übernommen: ${u.zugaenge} ${u.zugaenge === 1 ? "Zugang" : "Zugänge"}, ${u.klassen} ${u.klassen === 1 ? "Klasse" : "Klassen"}.${u.nicht_uebernommen ? ` ${u.nicht_uebernommen} nicht übernommen, weil diese Lizenz weniger Zugänge oder Klassen erlaubt.` : ""} Die Lehrkräfte melden sich mit ihrem bisherigen persönlichen Code an und erzeugen neue Klassencodes.` }; }
      } finally { laeuft = false; }
      fokusNach = "msg"; zeichnen();
    };
  }
  start();
})();
