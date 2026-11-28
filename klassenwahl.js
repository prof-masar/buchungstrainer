/* Klassenwahl für beamer.html (Schullizenz / Klassenlizenz, Update 7)
   Bei „Gemeinsam üben“, „Im eigenen Tempo üben“ und „Lernzielkontrolle“ wählt die Lehrkraft eine IHRER Klassen von der Lizenzseite
   (lehrkraft.html, gleiche Anmeldung auf diesem Gerät). Die Live-Stunde wird dann am Lizenzserver an genau diese Klasse gebunden
   (lehrer.php, aktion „live“): Nur Schülergeräte dieser Klasse bekommen die Stunde angeboten, ein Code für die Tafel ist nicht nötig.
   Kann der Lizenzserver das noch nicht (Update 6), bleibt alles wie bisher: Code und QR-Code an der Tafel.
   Gelesen werden nur Token und Gerätekennung der Lizenzseite (localStorage, gleiche Website). Keine Namen, kein Tracking. */
window.LS_KW = (function () {
  "use strict";
  const K = window.BT_KONFIG || {}, T = K.testmodus ? window.BT_TESTSERVER : null;
  const P_ = "buchungstrainer:lehrkraft:", K_GER = P_ + "geraet", K_TOK = P_ + "token", K_CODES = P_ + "codes";
  const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } } };
  const AUTH = ["freigegeben", "token_ungueltig", "abgelaufen", "inaktiv", "keine_lehrkraft", "anfrage", "zugang_gesperrt", "noch_nicht_gueltig"];
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
  const angemeldet = () => !!(ls.get(K_TOK) && ls.get(K_GER));
  const lehrer = (aktion, x) => post("/api/lehrer.php", Object.assign({ token: ls.get(K_TOK), geraet: ls.get(K_GER), aktion }, x || {}));
  let lizenzHinweis = "";
  /* Klassen der angemeldeten Lehrkraft. status: ok | abgemeldet | offline */
  async function klassen() {
    if (!angemeldet()) return { status: "abgemeldet" };
    const r = await post("/api/refresh.php", { token: ls.get(K_TOK), geraet: ls.get(K_GER) });   // frisches Token wie auf der Lizenzseite
    if (r.ok && r.token) ls.set(K_TOK, r.token);
    else if (r.fehler === "nicht_verfuegbar") return { status: "offline" };
    else if (AUTH.includes(r.fehler)) return { status: "abgemeldet", grund: r.grund || r.fehler };
    const j = await lehrer("uebersicht");
    if (j.ok) { lizenzHinweis = (j.lizenz && j.lizenz.hinweis) || ""; return { status: "ok", klassen: (j.klassen || []).map(k => ({ id: k.id, name: k.name, hinweis: k.hinweis || "", belegt: k.belegt || 0 })), lizenz: j.lizenz || {} }; }
    if (j.fehler === "nicht_verfuegbar") return { status: "offline" };
    return { status: "abgemeldet", grund: j.grund || j.fehler };
  }
  /* Neue Klasse (wie auf der Lizenzseite). Der Klassencode wird für die Lizenzseite gemerkt (nur auf diesem Gerät). */
  async function anlegen(name) {
    const j = await lehrer("klasse_neu", { name });
    if (j.ok && j.neu) {
      lizenzHinweis = (j.lizenz && j.lizenz.hinweis) || lizenzHinweis;
      try { const c = JSON.parse(ls.get(K_CODES) || "{}") || {}; c[lizenzHinweis] = c[lizenzHinweis] || {}; c[lizenzHinweis][j.neu.id] = j.neu.code; ls.set(K_CODES, JSON.stringify(c)); } catch (e) { }
      const k = (j.klassen || []).find(x => x.id === j.neu.id) || { id: j.neu.id, name };
      return { ok: true, klasse: { id: k.id, name: k.name, hinweis: k.hinweis || "", belegt: 0 }, code: j.neu.code };
    }
    return { ok: false, fehler: j.fehler || "nicht_verfuegbar", max_klassen: j.max_klassen };
  }
  /* Klassencode (8 Zeichen) einer Klasse, falls auf diesem Gerät bekannt (Lizenzseite merkt ihn beim Erzeugen) */
  function klassencode(k) {
    if (!k) return "";
    try {
      const c = JSON.parse(ls.get(K_CODES) || "{}") || {};
      const x = (c[lizenzHinweis] || {})[k.id];
      if (x && (!k.hinweis || x.slice(-4) === k.hinweis)) return x;
    } catch (e) { }
    if (T && k.hinweis) { const f = (T.KLASSEN || []).find(f => f.name === k.name && f.code.slice(-4) === k.hinweis); if (f) return f.code.slice(0, 4) + "-" + f.code.slice(4); }
    return "";
  }
  /* Live-Stunde an die Klasse binden (code) oder lösen (null). Ergebnis: gebunden | geloest | nicht_unterstuetzt | fehler */
  async function binden(id, code) {
    const j = await lehrer("live", { id, code: code || null });
    if (j.ok) return code ? "gebunden" : "geloest";
    if (j.fehler === "aktion") return "nicht_unterstuetzt";   // Lizenzserver mit Update 6
    return "fehler";
  }
  return { angemeldet, klassen, anlegen, klassencode, binden };
})();
