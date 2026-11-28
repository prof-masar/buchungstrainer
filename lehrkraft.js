/* Lizenzseite für Lehrkräfte (OeAD-Kernversion). Anmelden mit dem Lehrkraft-Schlüssel, Klassen anlegen, Klassencode zeigen und neu erzeugen,
   belegte Plätze sehen und freigeben, optional Themen freigeben. Server-Adresse nur in konfig.js; im Testmodus antwortet lizenz-test.js.
   Schullizenz (Server-Update 7): Mit dem Schulschlüssel legt jede Lehrkraft einmal ihren eigenen Zugang an und bekommt einen persönlichen Code
   (keine Namen, keine E-Mail). Sie sieht nur ihre eigenen Klassen; die Plätze teilt sich die ganze Schule. Ohne Update 7 am Server bleibt alles wie bisher.
   Im Browser gespeichert (nur auf diesem Gerät): Geräte-Kennung und Token dieser Seite, die Klassencodes (der Server kennt sie nur als Hash). */
(function () {
  "use strict";
  const K = window.BT_KONFIG || {}, T = K.testmodus ? window.BT_TESTSERVER : null;
  const P_ = "buchungstrainer:lehrkraft:", K_GER = P_ + "geraet", K_TOK = P_ + "token", K_CODES = P_ + "codes";
  const app = document.getElementById("app");
  const THEMEN = Array.isArray(window.BT_THEMEN) ? window.BT_THEMEN : [];
  const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } }, del: k => { try { localStorage.removeItem(k); } catch (e) { } } };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const datumAT = ymd => { const [y, m, d] = String(ymd).split("-"); return `${d}.${m}.${y}`; };
  const ZEICHEN = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let daten = null, meldung = null, offenThemen = {}, laeuft = false;
  let schulSchluessel = null;   // eingegebener Schulschlüssel, solange die Lehrkraft entscheidet, ob sie einen Zugang anlegt (nur im Speicher)
  let neuerCode = null;         // persönlicher Code, nur direkt nach dem Anlegen bzw. Erneuern sichtbar (nur im Speicher)
  let schulFunktion = !!T;      // Server kann Schullizenz (api/schule.php antwortet)? Sonst kein Link zur Schul-Übersicht

  function geraet() {
    let g = ls.get(K_GER);
    if (!g || !/^[A-Za-z0-9-]{16,64}$/.test(g)) { g = crypto.randomUUID ? crypto.randomUUID() : [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, "0")).join(""); ls.set(K_GER, g); }
    return g;
  }
  const codes = () => { try { const c = JSON.parse(ls.get(K_CODES) || "{}"); return c && typeof c === "object" ? c : {}; } catch (e) { return {}; } };
  function codeMerken(lizenz, id, code) { const c = codes(); c[lizenz] = c[lizenz] || {}; if (code) c[lizenz][id] = code; else delete c[lizenz][id]; ls.set(K_CODES, JSON.stringify(c)); }
  function codeVon(lizenz, k) {
    const c = (codes()[lizenz] || {})[k.id];
    if (c && c.slice(-4) === k.hinweis) return c;
    if (T && k.hinweis) { const f = (T.KLASSEN || T.FEST.map(x => x.klasse)).find(f => f.name === k.name && f.code.slice(-4) === k.hinweis); if (f) return f.code.slice(0, 4) + "-" + f.code.slice(4); }
    return "";
  }
  async function post(pfad, daten) {
    if (T) { try { return await T.post(pfad, daten); } catch (e) { return { ok: false, fehler: "nicht_verfuegbar" }; } }
    if (!K.lizenzServer) return { ok: false, fehler: "nicht_verfuegbar" };
    const ac = new AbortController(), to = setTimeout(() => ac.abort(), 10000);
    try {
      const r = await fetch(K.lizenzServer.replace(/\/$/, "") + pfad, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(daten), mode: "cors", credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store", signal: ac.signal });
      let j = null; try { j = await r.json(); } catch (e) { }
      return j && typeof j === "object" ? j : { ok: false, fehler: "nicht_verfuegbar" };
    } catch (e) { return { ok: false, fehler: "nicht_verfuegbar" }; } finally { clearTimeout(to); }
  }
  const TEXTE = {
    ungueltig: "Diesen Schlüssel gibt es nicht. Bitte prüfe die Schreibweise.",
    format: "Der Schlüssel sieht so aus: BT-XXXX-XXXX-XXXX-XXXX.",
    keine_lehrkraft: "Das ist kein Schlüssel für Lehrkräfte. Schülerinnen und Schüler brauchen nur den Klassencode.",
    abgelaufen: "Diese Lizenz ist abgelaufen. Lizenzen gelten bis 31. August.",
    noch_nicht_gueltig: "Diese Lizenz gilt noch nicht.",
    inaktiv: "Diese Lizenz ist gesperrt.",
    voll: "Mit diesem Schlüssel sind schon zu viele Lehrkraft-Geräte angemeldet. Melde ein anderes Gerät ab. Persönlicher Code einer Schullizenz: höchstens 3 Geräte; die Administration deiner Schule kann die Geräte deines Zugangs abmelden.",
    zugang_gesperrt: "Dein Zugang ist von deiner Schule gesperrt. Bitte wende dich an die Administration deiner Schule.",
    zugang_zu: "Deine Schule hat neue Zugänge gerade gesperrt. Bitte wende dich an die Administration deiner Schule.",
    zu_viele_zugaenge: "Für diese Schule gibt es schon die höchste Zahl an Lehrkraft-Zugängen. Bitte wende dich an die Administration deiner Schule.",
    kein_schulschluessel: "Das ist kein Schulschlüssel. Melde dich oben direkt mit diesem Schlüssel an.",
    testbetrieb: "Im Testmodus gelten nur Testschlüssel (BT-TEST-…).",
    zu_viele_versuche: "Zu viele Versuche. Bitte warte 15 Minuten.",
    zu_viele_klassen: "Die höchste Zahl an Klassen ist erreicht. Lösche zuerst eine Klasse.",
    name: "Bitte einen Namen für die Klasse eingeben (höchstens 40 Zeichen).",
    themen: "Die Themen konnten nicht gespeichert werden.",
    klasse_unbekannt: "Diese Klasse gibt es nicht mehr.",
    nicht_verfuegbar: "Keine Verbindung zum Lizenzserver. Bitte versuche es gleich noch einmal.",
    fehler: "Das hat nicht geklappt. Bitte versuche es noch einmal."
  };
  const text = f => TEXTE[f] || TEXTE.fehler;
  function norm(e) {
    let s = String(e || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (s.length === 18 && s.startsWith("BT")) s = s.slice(2);
    if (s.length !== 16 || [...s].some(c => !ZEICHEN.includes(c))) return null;
    return "BT-" + s.match(/.{4}/g).join("-");
  }
  // Abgelaufene Anmeldung, Gerät abgemeldet oder Lizenz weg: zurück zur Anmeldung
  function abmeldenLokal(f) { ls.del(K_TOK); daten = null; neuerCode = null; meldung = f ? { art: "err", text: f === "freigegeben" || f === "token_ungueltig" ? "Bitte melde dich neu an. Bei einer Schullizenz mit deinem persönlichen Code." : text(f) } : null; }
  const grund = j => j.grund === "zugang_gesperrt" ? "zugang_gesperrt" : j.fehler;
  // Geteilte Schulrechner: Gerätekennung, Anmeldung und Klassencodes dieser Seite aus dem Browser entfernen. Der Server wird nicht angesprochen.
  function lokalLoeschen() {
    if (!confirm("Lokale Daten dieser Seite löschen?\n\nGelöscht werden Gerätekennung, Anmeldung und gespeicherte Klassencodes in diesem Browser. Danach musst du dich neu anmelden; einen Klassencode siehst du dann nur nach „Code neu erzeugen“. Am Server ändert sich nichts.")) return;
    ls.del(K_GER); ls.del(K_TOK); ls.del(K_CODES);
    daten = null; offenThemen = {};
    meldung = { art: "ok", text: "Lokale Daten gelöscht: Gerätekennung, Anmeldung und Klassencodes sind aus diesem Browser entfernt." };
    zeichnen();
    const h = document.getElementById("anm"); if (h) { h.tabIndex = -1; h.focus(); }
  }
  function lokalBinden() { const b = document.getElementById("lokalweg"); if (b) b.onclick = lokalLoeschen; }
  const LOKAL_HINWEIS = `<p class="small muted lokalhinweis" id="lokalhinweis">Geteilter Rechner? „Lokale Daten löschen“ entfernt Gerätekennung, Anmeldung und Klassencodes aus diesem Browser. Mit „Abmelden“ vorher wird auch der Platz am Server frei.</p>`;
  async function lehrer(aktion, x) {
    const j = await post("/api/lehrer.php", Object.assign({ token: ls.get(K_TOK), geraet: geraet(), aktion }, x || {}));
    if (j.ok) { daten = j; return j; }
    if (["freigegeben", "token_ungueltig", "abgelaufen", "inaktiv", "keine_lehrkraft", "anfrage", "zugang_gesperrt"].includes(j.fehler)) abmeldenLokal(grund(j));
    else meldung = { art: "err", text: j.fehler === "voll" ? `Voll: Alle ${j.plaetze || ""} Plätze sind belegt.` : text(j.fehler) };
    return null;
  }
  async function laden() {
    if (!ls.get(K_TOK)) { zeichnen(); return; }
    const r = await post("/api/refresh.php", { token: ls.get(K_TOK), geraet: geraet() });   // frisches Token (gilt 1 Woche offline)
    if (r.ok) ls.set(K_TOK, r.token);
    else if (r.fehler !== "nicht_verfuegbar") { abmeldenLokal(grund(r)); zeichnen(); return; }
    await lehrer("uebersicht");
    zeichnen();
  }
  async function anmelden(eingabe) {
    const s = norm(eingabe);
    if (!s) { meldung = { art: "err", text: TEXTE.format }; zeichnen(eingabe); return; }
    const j = await post("/api/activate.php", { schluessel: s, geraet: geraet() });
    if (!j.ok && j.fehler === "schulschluessel") { schulSchluessel = { code: s, offen: j.zugang_offen !== false }; meldung = null; zeichnen(); fokus("schulk"); return; }
    if (!j.ok) { meldung = { art: "err", text: text(j.fehler) }; zeichnen(eingabe); return; }
    if (j.rolle !== "lehrer") { await post("/api/release.php", { token: j.token, geraet: geraet() }); meldung = { art: "err", text: TEXTE.keine_lehrkraft }; zeichnen(eingabe); return; }
    ls.set(K_TOK, j.token); meldung = null; schulSchluessel = null;
    await lehrer("uebersicht"); zeichnen();
  }
  function fokus(id) { const h = document.getElementById(id); if (h) { h.tabIndex = -1; h.focus(); } }
  // Schullizenz: eigenen Zugang mit dem Schulschlüssel anlegen. Der persönliche Code wird nur jetzt angezeigt.
  async function zugangAnlegen() {
    const j = await post("/api/schule.php", { aktion: "zugang_neu", schluessel: schulSchluessel.code, geraet: geraet() });
    if (!j.ok) { meldung = { art: "err", text: j.fehler === "nicht_verfuegbar" ? "Der Lizenzserver kann noch keine Schulzugänge anlegen. Bitte versuche es später noch einmal." : text(j.fehler) }; zeichnen(); fokus("schulk"); return; }
    ls.set(K_TOK, j.token); schulSchluessel = null; neuerCode = j.zugang.code; meldung = null;
    await lehrer("uebersicht"); zeichnen(); fokus("pcode");
  }
  function codeKarte() {
    if (!neuerCode) return "";
    return `<section class="card neuercode" aria-labelledby="pcode"><h2 id="pcode">Dein persönlicher Code</h2>
      <div class="code" id="pcodewert">${esc(neuerCode)}</div>
      <p>Schreib dir diesen Code auf. Er wird <strong>nur jetzt</strong> angezeigt. Mit ihm meldest du dich auf einem neuen Gerät an (bis zu 3 Geräte). Gib ihn nicht weiter: Wer ihn hat, sieht und ändert deine Klassen.</p>
      <div class="knoepfe"><button type="button" class="linkbtn" id="pcodekopie">Code kopieren</button><button type="button" class="linkbtn" id="pcodeok">Ich habe den Code notiert</button></div></section>`;
  }
  const themenText = k => k.themen === null ? "alle Themen" : k.themen.length === 0 ? "noch keine Themen freigegeben" : `${k.themen.length} von ${THEMEN.length} Themen freigegeben`;
  function klasseHtml(k) {
    const code = codeVon(daten.lizenz.hinweis, k);
    const alle = k.themen === null, gew = new Set(k.themen || []);
    return `<section class="card klasse" id="klasse-${k.id}" data-id="${k.id}" aria-labelledby="kn-${k.id}">
      <h2><span id="kn-${k.id}">${esc(k.name)}</span><small>${k.belegt} ${k.belegt === 1 ? "Gerät" : "Geräte"} · ${esc(themenText(k))}</small></h2>
      <div class="muted small">Klassencode für die Schülerinnen und Schüler</div>
      ${code ? `<div class="code" id="code-${k.id}">${esc(code)}</div>`
             : !k.hinweis ? `<div class="code versteckt" id="code-${k.id}">Noch kein Klassencode. Die Klasse wurde aus dem Vorjahr übernommen. „Code erzeugen“ erstellt einen.</div>`
             : `<div class="code versteckt" id="code-${k.id}">…-${esc(k.hinweis)} · Der Code ist nur auf dem Gerät sichtbar, auf dem er erzeugt wurde. „Code neu erzeugen“ zeigt einen neuen.</div>`}
      <div class="knoepfe">
        ${code ? `<button type="button" class="linkbtn" data-a="kopieren">Code kopieren</button><button type="button" class="linkbtn" data-a="link">Link für die Klasse kopieren</button>` : ""}
        <button type="button" class="linkbtn" data-a="code_neu">${k.hinweis ? "Code neu erzeugen" : "Code erzeugen"}</button>
        ${k.belegt ? `<button type="button" class="linkbtn" data-a="plaetze_frei">Plätze freigeben</button>` : ""}
        ${T ? `<button type="button" class="linkbtn" data-a="testgeraet">+1 Testgerät</button>` : ""}
        <button type="button" class="linkbtn" data-a="klasse_loeschen">Klasse löschen</button>
      </div>
      <details class="themen"${offenThemen[k.id] ? " open" : ""} data-id="${k.id}"><summary>Themen freigeben (optional)</summary>
        <form class="themenform" data-id="${k.id}"><fieldset><legend class="sr">Welche Themen sieht die Klasse?</legend>
          <div class="wahl"><label><input type="radio" name="w-${k.id}" value="alle"${alle ? " checked" : ""}> Alle Themen</label><label><input type="radio" name="w-${k.id}" value="auswahl"${alle ? "" : " checked"}> Nur ausgewählte</label></div>
          <div class="liste" aria-disabled="${alle}">${THEMEN.map(t => `<label><input type="checkbox" value="${esc(t.id)}"${alle || gew.has(t.id) ? " checked" : ""}${alle ? " tabindex=\"-1\"" : ""}> ${esc(t.titel)}</label>`).join("")}</div>
          <button type="submit" class="btn">Themen speichern</button></fieldset></form></details>
    </section>`;
  }
  // Aus beamer.html („Klasse anlegen“ ohne Anmeldung): nach dem Anlegen zurück in den gewählten Modus
  const ZURUECK = (() => { try { const m = new URLSearchParams(location.search).get("zurueck"); return ({ live: "Gemeinsam üben", tempo: "Im eigenen Tempo üben", lzk: "Lernzielkontrolle" })[m] ? m : ""; } catch (e) { return ""; } })();
  function zurueckKarte() {
    if (!ZURUECK || !daten) return "";
    const t = ({ live: "Gemeinsam üben", tempo: "Im eigenen Tempo üben", lzk: "Lernzielkontrolle" })[ZURUECK];
    const n = (daten.klassen || []).length;
    return `<section class="card" aria-labelledby="zur"><h2 id="zur">Zurück zum Unterricht</h2>
      <p>${n ? `Du hast ${n === 1 ? "eine Klasse" : n + " Klassen"}. Weiter mit „${esc(t)}“ und Klasse wählen:` : "Lege unten zuerst eine Klasse an. Danach geht es hier weiter."}</p>
      <p><a class="btn primary" id="zurueck-beamer" href="beamer.html?lsmodus=${ZURUECK}">Weiter zu „${esc(t)}“</a></p></section>`;
  }
  function zeichnen(eingabe) {
    const banner = T ? T.bannerHtml(false) : "";
    const m = meldung ? `<p class="msg ${meldung.art}" id="msg" role="status">${esc(meldung.text)}</p>` : `<p class="msg" id="msg" role="status"></p>`;
    const schulLink = schulFunktion ? ` · <a href="schule.html">Schul-Übersicht (Administration)</a>` : "";
    if (!daten && schulSchluessel) {
      app.innerHTML = banner + `<section class="card" aria-labelledby="schulk"><h2 id="schulk">Schulschlüssel erkannt</h2>
        <p>Das ist der Schulschlüssel deiner Schule (…-${esc(schulSchluessel.code.slice(-4))}). Damit legst du <strong>einmal</strong> deinen eigenen Zugang an. Du bekommst einen persönlichen Code. Mit ihm meldest du dich später an, auch auf einem neuen Gerät.</p>
        <p class="small muted">Dein Zugang hat keine Namen und keine E-Mail-Adresse, nur eine Nummer. Du siehst nur deine eigenen Klassen. Die Plätze teilt sich die ganze Schule.</p>
        ${schulSchluessel.offen ? `<div class="knoepfe"><button type="button" class="btn primary" id="zugangneu">Eigenen Zugang anlegen</button><button type="button" class="linkbtn" id="zurueck">Ich habe schon einen persönlichen Code</button></div>`
          : `<p><strong>${esc(TEXTE.zugang_zu)}</strong></p><div class="knoepfe"><button type="button" class="linkbtn" id="zurueck">Ich habe schon einen persönlichen Code</button></div>`}${m}</section>
        <footer class="foot"><a href="index.html">Zum Buchungstrainer</a>${schulLink} · Keine Namen, kein Tracking.</footer>`;
      if (T) T.bannerBinden();
      const zn = document.getElementById("zugangneu");
      if (zn) zn.onclick = async () => { if (laeuft) return; laeuft = true; zn.textContent = "Lege an …"; zn.setAttribute("aria-busy", "true"); try { await zugangAnlegen(); } finally { laeuft = false; } };
      document.getElementById("zurueck").onclick = () => { schulSchluessel = null; meldung = null; zeichnen(); const f = document.getElementById("schluessel"); if (f) f.focus(); };
      return;
    }
    if (!daten) {
      app.innerHTML = banner + `<section class="card" aria-labelledby="anm"><h2 id="anm">Anmelden</h2>
        <p>Melde dich mit deinem Lizenzschlüssel für Lehrkräfte an. Hat deine Schule eine Schullizenz, gib den Schulschlüssel ein (nur beim ersten Mal) oder deinen persönlichen Code. Als Lehrkraft bist du kostenlos dabei: Du legst hier deine Klassen an und siehst im Buchungstrainer bei jeder Aufgabe die Lösung.</p>
        <form id="anmform" novalidate><div class="zeile"><label class="feld">Lizenzschlüssel oder persönlicher Code<input id="schluessel" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="30" placeholder="BT-XXXX-XXXX-XXXX-XXXX" value="${esc(eingabe || "")}"></label>
        <button class="btn primary" id="anmok" type="submit">Anmelden</button></div>${m}</form>
        <div class="knoepfe"><button type="button" class="linkbtn" id="lokalweg" aria-describedby="lokalhinweis">Lokale Daten löschen</button></div>${LOKAL_HINWEIS}</section>
        <footer class="foot"><a href="index.html">Zum Buchungstrainer</a>${schulLink} · Keine Namen, kein Tracking.</footer>`;
      if (T) T.bannerBinden();
      lokalBinden();
      document.getElementById("anmform").onsubmit = async ev => { ev.preventDefault(); if (laeuft) return; laeuft = true; const b = document.getElementById("anmok"); b.textContent = "Prüfe …"; b.setAttribute("aria-busy", "true"); try { await anmelden(document.getElementById("schluessel").value); } finally { laeuft = false; } };
      return;
    }
    const L = daten.lizenz, voll = L.belegt >= L.plaetze, pz = Math.min(100, Math.round(L.belegt / Math.max(1, L.plaetze) * 100));
    const S = !!L.zugang, kAnz = S ? L.klassen_schule : daten.klassen.length;
    const vollText = S ? `<p class="vollhinweis" id="vollhinweis"><strong>Voll:</strong> Alle ${L.plaetze} Plätze der Schule sind belegt. Neue Geräte können erst beitreten, wenn Plätze frei werden (Plätze einer Klasse freigeben oder die Administration fragen). Geräte, die schon in einer Klasse sind, arbeiten weiter.</p>`
                       : `<p class="vollhinweis" id="vollhinweis"><strong>Voll:</strong> Alle Plätze sind belegt. Gib Plätze einer Klasse frei, wenn Geräte gewechselt haben. Geräte, die schon in einer Klasse sind, arbeiten weiter.</p>`;
    app.innerHTML = banner + codeKarte() + zurueckKarte() + `<section class="card" aria-labelledby="lzt"><h2 id="lzt">${S ? "Schullizenz" : "Deine Lizenz"}${L.test ? " (Test)" : ""}</h2>
      ${S ? `<p class="zugang" id="zugang">Dein Zugang: <strong>Nr. ${L.zugang.nr}</strong> · persönlicher Code …-${esc(L.zugang.hinweis)}${L.schule ? " · " + esc(L.schule) : ""}</p>` : ""}
      <div class="plaetze"><span class="zahl" id="belegt">${L.belegt} von ${L.plaetze}</span><span>${S ? "Plätzen der Schule belegt" : "Plätzen belegt"}</span></div>
      <div class="balken${voll ? " voll" : ""}" role="img" aria-label="${L.belegt} von ${L.plaetze} ${S ? "Plätzen der Schule" : "Plätzen"} belegt${voll ? ", voll" : ""}"><i style="width:${pz}%"></i></div>
      ${S ? `<p class="small" id="eigene">Davon in deinen Klassen: ${L.eigene} · Klassen der Schule: ${kAnz} von ${L.max_klassen}</p>` : ""}
      ${voll ? vollText : ""}
      <p class="small muted">Gültig bis ${esc(datumAT(L.gueltig_bis))}${S ? "" : " · Schlüssel …-" + esc(L.hinweis) + (L.schule ? " · " + esc(L.schule) : "")}</p>
      <div class="knoepfe"><a class="linkbtn" href="index.html">Zum Buchungstrainer</a>${S ? `<button type="button" class="linkbtn" id="pcodeneu">Neuen persönlichen Code erzeugen</button><a class="linkbtn" href="schule.html">Schul-Übersicht (Administration)</a>` : ""}<button type="button" class="linkbtn" id="abmelden">Abmelden</button><button type="button" class="linkbtn" id="lokalweg" aria-describedby="lokalhinweis">Lokale Daten löschen</button></div>${m}${LOKAL_HINWEIS}</section>
      ${daten.klassen.map(klasseHtml).join("")}
      <section class="card" aria-labelledby="nk"><h2 id="nk">Neue Klasse</h2>
        ${kAnz >= L.max_klassen ? `<p>${S ? `Die Schule hat schon ${L.max_klassen} Klassen (Höchstzahl). Lösche zuerst eine Klasse oder frag die Administration.` : `Du hast ${L.max_klassen} Klassen. Lösche zuerst eine Klasse.`}</p>` : `<form id="neuform" novalidate><div class="zeile"><label class="feld">Name der Klasse<input id="kname" maxlength="40" placeholder="z. B. 2AK" autocomplete="off"></label>
        <button class="btn primary" type="submit" id="neuok">Klasse anlegen</button></div></form>
        <p class="small muted">Nur den Klassennamen, keine Namen von Schülerinnen und Schülern.</p>`}</section>
      <footer class="foot">Ein Gerät belegt einen Platz, sobald es den Klassencode eingibt. Lizenzen gelten bis 31. August.${S ? " Im neuen Schuljahr übernimmt die Administration deinen Zugang und deine Klassen (ohne Geräte); du erzeugst dann neue Klassencodes." : ""} Keine Namen, kein Tracking.</footer>`;
    if (T) T.bannerBinden();
    binden();
  }
  async function kopieren(t) {
    try { await navigator.clipboard.writeText(t); return true; } catch (e) { }
    try { const a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select(); const ok = document.execCommand("copy"); a.remove(); return ok; } catch (e) { return false; }
  }
  function binden() {
    lokalBinden();
    const pk = document.getElementById("pcodekopie"), po = document.getElementById("pcodeok"), pn = document.getElementById("pcodeneu");
    if (pk) pk.onclick = async () => { const ok = await kopieren(neuerCode); meldung = ok ? { art: "ok", text: "Persönlicher Code kopiert. Bewahre ihn sicher auf." } : { art: "err", text: `Bitte von Hand abschreiben: ${neuerCode}` }; zeichnen(); fokus("pcode"); };
    if (po) po.onclick = () => { neuerCode = null; meldung = { art: "ok", text: "Gut. Mit deinem persönlichen Code meldest du dich auf einem neuen Gerät an." }; zeichnen(); fokus("lzt"); };
    if (pn) pn.onclick = async () => {
      if (laeuft || !confirm("Neuen persönlichen Code erzeugen?\n\nDer alte Code gilt dann nicht mehr. Geräte, auf denen du schon angemeldet bist, bleiben angemeldet. Den neuen Code siehst du nur einmal.")) return;
      laeuft = true;
      try { const j = await lehrer("zugang_code_neu"); if (j && j.zugang_code) { neuerCode = j.zugang_code; meldung = null; } } finally { laeuft = false; }
      zeichnen(); if (neuerCode) fokus("pcode");
    };
    const ab = document.getElementById("abmelden");
    if (ab) ab.onclick = async () => {
      if (!confirm("Auf diesem Gerät abmelden?")) return;
      const j = await post("/api/release.php", { token: ls.get(K_TOK), geraet: geraet() });
      // Nur abmelden, wenn der Server den Platz freigegeben hat (oder das Token dort schon ungültig ist); sonst bliebe der Geräte-Hash am Server stehen.
      if (!(j.ok || ["freigegeben", "token_ungueltig", "ungueltig"].includes(j.fehler))) { meldung = { art: "err", text: `Abmelden hat nicht geklappt, du bist weiter angemeldet. ${text(j.fehler)}` }; zeichnen(); const b = document.getElementById("abmelden"); if (b) b.focus(); return; }
      abmeldenLokal(); meldung = { art: "ok", text: "Du bist abgemeldet. Der Platz ist frei." }; zeichnen();
    };
    const nf = document.getElementById("neuform");
    if (nf) nf.onsubmit = async ev => {
      ev.preventDefault(); if (laeuft) return;
      const name = document.getElementById("kname").value.trim();
      if (!name) { meldung = { art: "err", text: TEXTE.name }; zeichnen(); return; }
      laeuft = true;
      try {
        const j = await lehrer("klasse_neu", { name });
        if (j && j.neu) { codeMerken(j.lizenz.hinweis, j.neu.id, j.neu.code); meldung = { art: "ok", text: `Klasse „${name}“ angelegt. Klassencode: ${j.neu.code}` }; }
      } finally { laeuft = false; }
      zeichnen();
      const neu = daten && document.querySelector(`#klasse-${(daten.klassen.find(k => k.name === name) || {}).id}`); if (neu) neu.scrollIntoView({ block: "nearest" });
    };
    app.querySelectorAll(".klasse").forEach(sec => {
      const id = +sec.dataset.id, k = daten.klassen.find(x => x.id === id);
      sec.querySelectorAll("[data-a]").forEach(b => b.onclick = async () => {
        if (laeuft) return;
        const a = b.dataset.a, code = codeVon(daten.lizenz.hinweis, k);
        if (a === "kopieren" || a === "link") {
          const t = a === "kopieren" ? code : new URL("index.html?klasse=" + code.replace("-", ""), location.href).href;
          const ok = await kopieren(t);
          meldung = ok ? { art: "ok", text: a === "kopieren" ? `Klassencode ${code} kopiert.` : "Link kopiert. Wer ihn öffnet, tritt der Klasse bei." } : { art: "err", text: `Bitte von Hand kopieren: ${t}` };
          zeichnen(); return;
        }
        const frage = { code_neu: k.hinweis ? `Neuen Klassencode für „${k.name}“ erzeugen? Der alte Code gilt dann nicht mehr. Geräte, die schon in der Klasse sind, bleiben drin.` : "",
          plaetze_frei: `Alle ${k.belegt} Plätze von „${k.name}“ freigeben? Die Geräte müssen den Klassencode danach neu eingeben.`,
          klasse_loeschen: `Klasse „${k.name}“ löschen? Ihre ${k.belegt} Plätze werden frei, der Code gilt nicht mehr.` }[a];
        if (frage && !confirm(frage)) return;
        laeuft = true;
        try {
          const j = await lehrer(a, { id });
          if (j && a === "code_neu" && j.neu) { codeMerken(j.lizenz.hinweis, id, j.neu.code); meldung = { art: "ok", text: k.hinweis ? `Neuer Klassencode für „${k.name}“: ${j.neu.code}. Der alte gilt nicht mehr.` : `Klassencode für „${k.name}“: ${j.neu.code}.` }; }
          if (j && a === "plaetze_frei") meldung = { art: "ok", text: `${j.frei} ${j.frei === 1 ? "Platz" : "Plätze"} freigegeben.` };
          if (j && a === "klasse_loeschen") { codeMerken(j.lizenz.hinweis, id, null); meldung = { art: "ok", text: `Klasse „${k.name}“ gelöscht.` }; }
          if (j && a === "testgeraet") meldung = { art: "ok", text: `Testgerät in „${k.name}“ angemeldet: ${j.lizenz.belegt} von ${j.lizenz.plaetze} Plätzen belegt.` };
        } finally { laeuft = false; }
        zeichnen();
      });
      const d = sec.querySelector("details.themen");
      d.addEventListener("toggle", () => { offenThemen[id] = d.open; });
      const f = sec.querySelector(".themenform"), liste = f.querySelector(".liste");
      f.querySelectorAll("input[type=radio]").forEach(r => r.onchange = () => {
        const alle = f.querySelector("input[type=radio]:checked").value === "alle";
        liste.setAttribute("aria-disabled", String(alle));
        liste.querySelectorAll("input").forEach(c => { if (alle) { c.checked = true; c.tabIndex = -1; } else c.removeAttribute("tabindex"); });
      });
      liste.querySelectorAll("input").forEach(c => c.onchange = () => {   // Häkchen ändern = „Nur ausgewählte“
        const w = f.querySelector('input[value="auswahl"]'); if (!w.checked) { w.checked = true; liste.setAttribute("aria-disabled", "false"); liste.querySelectorAll("input").forEach(x => x.removeAttribute("tabindex")); }
      });
      f.onsubmit = async ev => {
        ev.preventDefault(); if (laeuft) return;
        const alle = f.querySelector("input[type=radio]:checked").value === "alle";
        const themen = alle ? null : [...liste.querySelectorAll("input:checked")].map(c => c.value);
        laeuft = true;
        try { const j = await lehrer("themen", { id, themen }); if (j) meldung = { art: "ok", text: `Themen für „${k.name}“ gespeichert: ${alle ? "alle Themen" : themen.length + " Themen"}. Die Geräte sehen sie beim nächsten Öffnen der Startseite.` }; }
        finally { laeuft = false; }
        zeichnen();
      };
    });
  }
  if (!T && K.lizenzServer) post("/api/schule.php", { aktion: "info" }).then(j => { if (j.ok && j.schullizenz && !schulFunktion) { schulFunktion = true; if (!daten) zeichnen(); } });   // Feature-Erkennung: Server mit Update 7?
  laden();
})();
