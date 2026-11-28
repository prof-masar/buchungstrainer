/* =====================================================================
   TESTUMGEBUNG Lizenzen (nur wenn konfig.js testmodus:true)
   Stellt den Lizenzserver in DIESEM Browser nach: gleiche Anfragen, gleiche Antworten wie api/activate.php,
   api/refresh.php, api/release.php, api/klasse.php, api/lehrer.php, api/schule.php und api/aufruf.php. Kein Netzwerk.
   Daten liegen nur im localStorage dieses Browsers ("buchungstrainer:testserver") und lassen sich zurücksetzen.
   Tokens werden mit einem ÖFFENTLICH bekannten Testschlüssel (kid t1) signiert und gelten nur im Testmodus.
   Feste Testdaten:
     BT-TEST-BUCH-UNGS-TRAN   Lehrkraft, 30 Plätze, Klasse „Testklasse 2AK“ mit Klassencode TEST-2AKK
     BT-TEST-DREY-PATZ-3333   Lehrkraft, 3 Plätze (Limit-Test), Klasse „Limit-Test“ mit Klassencode DREY-3PTZ
   Schullizenz (Update 7, api/schule.php):
     BT-TEST-SCHU-ZEHN-PTZE   Schulschlüssel, gemeinsamer Topf 10 Plätze, Admin-Code AD-TEST-ADMN-SCHU-ZEHN
     BT-TEST-ZUGA-NGAA-2222   persönlicher Code Lehrkraft A (Zugang 1), Klasse „2AK“ mit Klassencode SCHU-2AKA
     BT-TEST-ZUGA-NGBB-3333   persönlicher Code Lehrkraft B (Zugang 2), Klasse „3BK“ mit Klassencode SCHU-3BKB
     BT-TEST-SCHU-NEUE-JAHR   Schulschlüssel nächstes Schuljahr (gilt ab 1.9.), Admin-Code AD-TEST-ADMN-NEUE-JAHR
   ===================================================================== */
(function () {
  "use strict";
  const K = window.BT_KONFIG || {};
  if (!K.testmodus) return;
  const KEY = "buchungstrainer:testserver";
  const SEED_B64 = "S+mt1xtNcwFNZYs8S74NBEorXbjChPi9KHmTyhJudtQ=", PUB_B64 = "civm7Iwc3SWpGOC97LHqM2hOR/msSfd4WSvHWA7BaWE=";
  const ZEICHEN = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  const TEST_TAGE = 30, PLAETZE_STANDARD = 30, OFFLINE_STUNDEN = 168, MAX_KLASSEN = 20;
  const FEST = [
    { code: "BT-TEST-BUCH-UNGS-TRAN", plaetze: 30, klasse: { name: "Testklasse 2AK", code: "TEST2AKK" } },
    { code: "BT-TEST-DREY-PATZ-3333", plaetze: 3, klasse: { name: "Limit-Test", code: "DREY3PTZ" } }
  ];
  const ZUGANG_GERAETE = 3, MAX_ZUGAENGE = 10, DATEN_TAGE = 30;
  const SCHULEN = [
    { code: "BT-TEST-SCHU-ZEHN-PTZE", admin: "AD-TEST-ADMN-SCHU-ZEHN", plaetze: 10, schule: "Testschule HLW (Schullizenz)", jahr: 0,
      zugaenge: [{ code: "BT-TEST-ZUGA-NGAA-2222", klasse: { name: "2AK", code: "SCHU2AKA", themen: null } },
                 { code: "BT-TEST-ZUGA-NGBB-3333", klasse: { name: "3BK", code: "SCHU3BKB", themen: ["qs-01", "qs-02", "qs-03", "qs-04", "qs-05", "qs-06"] } }] },
    { code: "BT-TEST-SCHU-NEUE-JAHR", admin: "AD-TEST-ADMN-NEUE-JAHR", plaetze: 10, schule: "Testschule HLW (Schullizenz)", jahr: 1, zugaenge: [] }
  ];
  /** alle festen Klassencodes (Anzeige auf der Lizenzseite im Testmodus) */
  const KLASSEN = FEST.map(f => f.klasse).concat(...SCHULEN.map(x => x.zugaenge.map(z => z.klasse)));

  /* ---------- Ed25519 (RFC 8032), nur für die Testumgebung ---------- */
  const P = 2n ** 255n - 19n, L = 2n ** 252n + 27742317777372353535851937790883648493n;
  const md = (a, m = P) => { const r = a % m; return r >= 0n ? r : r + m; };
  const pw = (b, e) => { let r = 1n; b = md(b); while (e > 0n) { if (e & 1n) r = r * b % P; b = b * b % P; e >>= 1n; } return r; };
  const inv = a => pw(a, P - 2n);
  const D2 = md(2n * md(-121665n * inv(121666n)));
  const le = u => { let n = 0n; for (let i = u.length - 1; i >= 0; i--) n = (n << 8n) | BigInt(u[i]); return n; };
  const le32 = n => { const o = new Uint8Array(32); for (let i = 0; i < 32; i++) { o[i] = Number(n & 255n); n >>= 8n; } return o; };
  function add(p, q) {
    const [X1, Y1, Z1, T1] = p, [X2, Y2, Z2, T2] = q;
    const A = md((Y1 - X1) * (Y2 - X2)), B = md((Y1 + X1) * (Y2 + X2)), C = md(T1 * D2 * T2), D = md(2n * Z1 * Z2);
    const E = B - A, F = D - C, G = D + C, H = B + A;
    return [md(E * F), md(G * H), md(F * G), md(E * H)];
  }
  function mul(p, n) { let r = [0n, 1n, 1n, 0n]; while (n > 0n) { if (n & 1n) r = add(r, p); p = add(p, p); n >>= 1n; } return r; }
  function enc(p) { const zi = inv(p[2]), x = md(p[0] * zi), y = md(p[1] * zi); return le32(y | ((x & 1n) << 255n)); }
  const BX = 15112221349535400772501151409588531511454012693041857206046113283949847762202n, BY = 46316835694926478169428394003475163141307993866256225615783033603165251855960n;
  const BASIS = [BX, BY, 1n, md(BX * BY)];
  const b64d = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const b64u = u => btoa(String.fromCharCode(...u)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const b64ud = s => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return b64d(s); };
  const sha512 = async (...teile) => { const n = teile.reduce((s, t) => s + t.length, 0), m = new Uint8Array(n); let o = 0; teile.forEach(t => { m.set(t, o); o += t.length; }); return new Uint8Array(await crypto.subtle.digest("SHA-512", m)); };
  const sha256hex = async s => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map(b => b.toString(16).padStart(2, "0")).join("");
  let schl = null;
  async function schluesselLaden() {
    if (schl) return schl;
    const h = await sha512(b64d(SEED_B64));
    const a = h.slice(0, 32); a[0] &= 248; a[31] &= 127; a[31] |= 64;
    schl = { a: le(a), praefix: h.slice(32), A: b64d(PUB_B64) };
    return schl;
  }
  async function signieren(msg) {
    const s = await schluesselLaden();
    const r = md(le(await sha512(s.praefix, msg)), L);
    const R = enc(mul(BASIS, r));
    const k = md(le(await sha512(R, s.A, msg)), L);
    const S = md(r + k * s.a, L);
    const sig = new Uint8Array(64); sig.set(R); sig.set(le32(S), 32);
    return sig;
  }

  /* ---------- Zeit (Europe/Vienna, nur Datum) ---------- */
  const tagVon = t => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Vienna", year: "numeric", month: "2-digit", day: "2-digit" }).format(t);
  const heute = () => tagVon(Date.now());
  const tagPlus = n => tagVon(Date.now() + n * 864e5);
  const schuljahrEnde = (ymd = heute()) => { const j = +ymd.slice(0, 4); return (ymd.slice(5) > "08-31" ? j + 1 : j) + "-08-31"; };
  const testEnde = () => { const a = tagPlus(TEST_TAGE - 1), b = schuljahrEnde(); return a < b ? a : b; };

  /* ---------- Zustand ---------- */
  const leer = () => ({ v: 2, nr: { k: 0, c: 0, z: 0 }, schluessel: [], zugaenge: [], geraete: [], klassen: [], zaehlung: { tage: {}, codes: {} } });
  let Z = null;
  function laden() {
    try { Z = JSON.parse(localStorage.getItem(KEY)); } catch (e) { Z = null; }
    if (!Z || Z.v !== 2 || !Array.isArray(Z.schluessel)) Z = null;
    return Z;
  }
  const speichern = () => { try { localStorage.setItem(KEY, JSON.stringify(Z)); } catch (e) { } };
  async function anlegen() {
    Z = leer();
    for (const f of FEST) {
      const id = ++Z.nr.k;
      Z.schluessel.push({ id, code: f.code, hinweis: f.code.slice(-4), typ: "klasse", rolle: "lehrer", plaetze: f.plaetze, max_nutzer: 2, von: heute(), bis: testEnde(), status: "aktiv", schule: "Testschule" });
      const cid = ++Z.nr.c;
      Z.klassen.push({ id: cid, sid: id, hash: await sha256hex("klasse|" + f.klasse.code), hinweis: f.klasse.code.slice(-4), name: f.klasse.name, themen: null, stand: Math.floor(Date.now() / 1000) });
    }
    for (const f of SCHULEN) {
      const id = ++Z.nr.k, ende = schuljahrEnde();
      const von = f.jahr ? tagVon(Date.parse(ende + "T12:00:00Z") + 864e5) : heute(), bis = f.jahr ? schuljahrEnde(von) : testEnde();
      Z.schluessel.push({ id, code: f.code, hinweis: f.code.slice(-4), typ: "schule", rolle: "schule", plaetze: f.plaetze, max_nutzer: null, von, bis, status: "aktiv", schule: f.schule,
        max_klassen: Math.max(20, Math.ceil(f.plaetze / 10)), max_zugaenge: MAX_ZUGAENGE, offen: true, admin: f.admin, vorgaenger: null });
      f.zugaenge.forEach((z, i) => {
        const zid = ++Z.nr.z;
        Z.zugaenge.push({ id: zid, sid: id, nr: i + 1, code: z.code, status: "aktiv", herkunft: null });
        Z.klassen.push({ id: ++Z.nr.c, sid: id, za: zid, hash: null, _code: z.klasse.code, hinweis: z.klasse.code.slice(-4), name: z.klasse.name, themen: z.klasse.themen, stand: Math.floor(Date.now() / 1000) });
      });
    }
    for (const c of Z.klassen) if (c._code) { c.hash = await sha256hex("klasse|" + c._code); delete c._code; }
    speichern();
  }
  async function bereit() { if (!laden()) await anlegen(); return Z; }

  /* ---------- Hilfen wie auf dem Server ---------- */
  const antwort = (status, j) => Object.assign({ _status: status }, j);
  const fehler = (status, f, x) => antwort(status, Object.assign({ ok: false, fehler: f }, x || {}));
  function status(k) {
    if (k.status !== "aktiv") return "inaktiv";
    if (heute() < k.von) return "noch_nicht_gueltig";
    if (heute() > k.bis) return "abgelaufen";
    return "aktiv";
  }
  const STATUS_CODE = { inaktiv: 403, abgelaufen: 410, noch_nicht_gueltig: 425 };
  const geraetOk = g => typeof g === "string" && /^[A-Za-z0-9-]{16,64}$/.test(g);
  const gh = async g => b64u(Uint8Array.from((await sha256hex("geraet|" + g)).slice(0, 32).match(/../g).map(x => parseInt(x, 16))));
  function schluesselNorm(e) {
    let s = String(e || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (s.length === 18 && s.startsWith("BT")) s = s.slice(2);
    if (s.length !== 16 || [...s].some(c => !ZEICHEN.includes(c))) return null;
    return "BT-" + s.match(/.{4}/g).join("-");
  }
  function klassenCodeNorm(e) {
    if (typeof e !== "string" || e.length > 40) return null;
    const s = e.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return s.length === 8 && [...s].every(c => ZEICHEN.includes(c)) ? s : null;
  }
  const plaetzeVon = k => k.plaetze == null ? PLAETZE_STANDARD : k.plaetze;
  const belegt = sid => Z.geraete.filter(g => g.sid === sid && g.klasse != null).length;
  const aktivSeit = () => tagPlus(-28);
  const liveVon = c => (c.live && c.liveBis > Date.now()) ? c.live : "";
  const klasseFuerApp = c => Object.assign({ name: c.name, themen: c.themen, stand: c.stand }, liveVon(c) ? { live: liveVon(c) } : {});
  /* Schullizenz */
  const zufall = n => { let s = ""; for (const b of crypto.getRandomValues(new Uint8Array(n))) s += ZEICHEN[b % ZEICHEN.length]; return s; };
  const zugangCodeNeu = () => { for (;;) { const c = "BT-TEST-" + zufall(12).match(/.{4}/g).join("-"); if (!Z.zugaenge.some(z => z.code === c) && !Z.schluessel.some(k => k.code === c)) return c; } };
  /** persönlicher Code: lieber die gerade gültige Lizenz (Schuljahreswechsel: derselbe Code in alter und neuer Lizenz), sonst die neueste */
  function zugangFinden(code) {
    const l = Z.zugaenge.filter(z => z.code === code).map(z => [z, Z.schluessel.find(k => k.id === z.sid)]).filter(x => x[1]);
    l.sort((a, b) => ((status(b[1]) === "aktiv") - (status(a[1]) === "aktiv")) || (b[1].von < a[1].von ? -1 : 1));
    return l.length ? l[0][0] : null;
  }
  const zugangVon = (sid, za) => Z.zugaenge.find(z => z.sid === sid && z.id === za) || null;
  const maxKlassen = k => k.max_klassen || MAX_KLASSEN;
  const datenBis = k => tagVon(Date.parse(k.bis + "T12:00:00Z") + DATEN_TAGE * 864e5);
  function adminNorm(e) {
    let s = String(e || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (s.length === 18 && s.startsWith("AD")) s = s.slice(2);
    if (s.length !== 16 || [...s].some(c => !ZEICHEN.includes(c))) return null;
    return "AD-" + s.match(/.{4}/g).join("-");
  }
  function adminFinden(e) {
    const a = adminNorm(e); if (!a) return [null, fehler(404, "admin_unbekannt")];
    const k = Z.schluessel.find(x => x.rolle === "schule" && x.admin === a);
    if (!k) return [null, fehler(404, "admin_unbekannt")];
    if (k.status !== "aktiv") return [null, fehler(403, "inaktiv")];
    if (datenBis(k) < heute()) return [null, fehler(410, "abgelaufen")];
    return [k, null];
  }
  function schuleUebersicht(k) {
    const zug = Z.zugaenge.filter(z => z.sid === k.id).sort((a, b) => a.nr - b.nr).map(z => {
      const kl = Z.klassen.filter(c => c.za === z.id).map(c => c.id);
      return { id: z.id, nr: z.nr, hinweis: z.code.slice(-4), status: z.status, klassen: kl.length, belegt: Z.geraete.filter(g => kl.includes(g.klasse)).length,
        geraete: Z.geraete.filter(g => g.za === z.id && g.klasse == null).length };
    });
    const vg = k.vorgaenger ? Z.schluessel.find(x => x.id === k.vorgaenger) : null;
    return { ok: true, schule: { name: k.schule, hinweis: k.hinweis, admin_hinweis: k.admin.slice(-4), gueltig_von: k.von, gueltig_bis: k.bis, status: status(k), test: true,
      plaetze: plaetzeVon(k), belegt: belegt(k.id), klassen: Z.klassen.filter(c => c.sid === k.id).length, max_klassen: maxKlassen(k), zugaenge: zug.length, max_zugaenge: k.max_zugaenge,
      zugang_offen: !!k.offen, daten_bis: datenBis(k), vorjahr_bis: vg ? vg.bis : null, geraete_pro_zugang: ZUGANG_GERAETE }, zugaenge: zug };
  }
  function zaehleAktivierung(sid, kid, name) {
    const s = sid + ":" + kid, z = Z.zaehlung.codes[s] || { aktiviert: 0, name: "" };
    z.aktiviert++; if (name) z.name = name; Z.zaehlung.codes[s] = z;
  }
  async function token(k, ghash, extra) {
    const iat = Math.floor(Date.now() / 1000);
    const p = { v: 2, kid: "t1", cid: k.id, typ: k.typ, gh: ghash, cb: k.bis, iat, exp: iat + OFFLINE_STUNDEN * 3600 };
    p.rol = (extra && extra.rol) || (k.rolle === "lehrer" || k.rolle === "schule" ? "lehrer" : "schueler");
    if (extra && extra.kl) p.kl = extra.kl;
    if (extra && extra.za) p.za = extra.za;
    p.test = 1;
    const msg = new TextEncoder().encode(JSON.stringify(p));
    return [b64u(msg) + "." + b64u(await signieren(msg)), p];
  }
  async function tokenUndGeraet(j) {
    const t = String(j.token || ""), [a, b] = t.split(".");
    if (!a || !b || !geraetOk(j.geraet)) return [null, null, fehler(400, "anfrage")];
    let p = null;
    try {
      const msg = b64ud(a), sig = b64u(await signieren(msg));
      if (sig !== b) return [null, null, fehler(401, "token_ungueltig")];
      p = JSON.parse(new TextDecoder().decode(msg));
    } catch (e) { return [null, null, fehler(401, "token_ungueltig")]; }
    const g = await gh(j.geraet);
    if (p.gh !== g) return [null, null, fehler(401, "token_ungueltig")];
    const k = Z.schluessel.find(x => x.id === p.cid);
    if (!k) return [null, null, fehler(404, "freigegeben")];
    return [k, g, null];
  }

  /* ---------- Endpunkte ---------- */
  const API = {
    async "/api/activate.php"(j) {
      if (!geraetOk(j.geraet)) return fehler(400, "anfrage");
      const code = schluesselNorm(j.schluessel);
      if (!code) return fehler(404, "ungueltig");
      if (!code.startsWith("BT-TEST-")) return fehler(403, "testbetrieb");
      let k = Z.schluessel.find(x => x.code === code), zg = null;
      if (k && k.rolle === "schule") return fehler(403, "schulschluessel", { zugang_offen: !!k.offen });
      if (!k) { zg = zugangFinden(code); if (!zg) return fehler(404, "ungueltig"); k = Z.schluessel.find(x => x.id === zg.sid); }
      const s = status(k); if (s !== "aktiv") return fehler(STATUS_CODE[s], s, { gueltig_von: k.von, gueltig_bis: k.bis });
      const g = await gh(j.geraet);
      let d = Z.geraete.find(x => x.sid === k.id && x.gh === g);
      if (zg) {   // persönlicher Code einer Lehrkraft (Schullizenz): höchstens 3 aktive Geräte je Zugang
        if (zg.status !== "aktiv") return fehler(403, "zugang_gesperrt");
        if (d && d.klasse != null) { Z.geraete = Z.geraete.filter(x => x !== d); d = null; }
        if (d && d.za !== zg.id) d.za = zg.id;
        const n = Z.geraete.filter(x => x.za === zg.id && x.klasse == null && x !== d && x.zuletzt >= aktivSeit()).length;
        if (!(d && d.zuletzt >= aktivSeit()) && n >= ZUGANG_GERAETE) return fehler(409, "voll");
        if (d) d.zuletzt = heute(); else { Z.geraete.push({ sid: k.id, gh: g, klasse: null, za: zg.id, zuletzt: heute() }); zaehleAktivierung(k.id, 0, ""); }
        speichern();
        const [t, p] = await token(k, g, { za: zg.id });
        return antwort(200, { ok: true, token: t, typ: k.typ, gueltig_bis: k.bis, token_bis: p.exp, demo_eintraege: null, schon_aktiv: !!d, rolle: "lehrer", test: true, zugang: { nr: zg.nr, hinweis: zg.code.slice(-4) } });
      }
      if (d && d.klasse != null) { Z.geraete = Z.geraete.filter(x => x !== d); d = null; }   // Schülergerät wird Gerät der Lehrkraft
      const aktiv = Z.geraete.filter(x => x.sid === k.id && x.klasse == null && x.zuletzt >= aktivSeit()).length;
      const warAktiv = d && d.zuletzt >= aktivSeit();
      if (!warAktiv && k.max_nutzer != null && aktiv >= k.max_nutzer) return fehler(409, "voll");
      if (d) d.zuletzt = heute(); else { Z.geraete.push({ sid: k.id, gh: g, klasse: null, zuletzt: heute() }); zaehleAktivierung(k.id, 0, ""); }
      speichern();
      const [t, p] = await token(k, g);
      return antwort(200, { ok: true, token: t, typ: k.typ, gueltig_bis: k.bis, token_bis: p.exp, demo_eintraege: null, schon_aktiv: !!d, rolle: p.rol, test: true });
    },
    async "/api/refresh.php"(j) {
      const [k, g, f] = await tokenUndGeraet(j); if (f) return f;
      const s = status(k); if (s !== "aktiv") return fehler(STATUS_CODE[s], s, { gueltig_bis: k.bis });
      const d = Z.geraete.find(x => x.sid === k.id && x.gh === g);
      if (!d) return fehler(404, "freigegeben");
      const c = d.klasse != null ? Z.klassen.find(x => x.id === d.klasse) : null;
      let ex = c ? { rol: "schueler", kl: c.id } : null;
      if (!c && k.rolle === "schule") {
        const z = zugangVon(k.id, d.za);
        if (!z) return fehler(404, "freigegeben");
        if (z.status !== "aktiv") return fehler(403, "inaktiv", { grund: "zugang_gesperrt", gueltig_bis: k.bis });
        ex = { za: z.id };
      }
      d.zuletzt = heute(); speichern();
      const [t, p] = await token(k, g, ex);
      return antwort(200, { ok: true, token: t, typ: k.typ, gueltig_bis: k.bis, token_bis: p.exp, demo_eintraege: null, rolle: p.rol, test: true, klasse: c ? klasseFuerApp(c) : null });
    },
    async "/api/release.php"(j) {
      const [k, g, f] = await tokenUndGeraet(j); if (f) return f;
      const vor = Z.geraete.length;
      Z.geraete = Z.geraete.filter(x => !(x.sid === k.id && x.gh === g)); speichern();
      return antwort(200, { ok: true, freigegeben: Z.geraete.length < vor });
    },
    async "/api/klasse.php"(j) {
      if (j.aktion !== "beitreten") return fehler(400, "anfrage");
      if (!geraetOk(j.geraet)) return fehler(400, "anfrage");
      const code = klassenCodeNorm(j.code);
      if (!code) return fehler(404, "klasse_unbekannt");
      const hash = await sha256hex("klasse|" + code);
      const c = Z.klassen.find(x => x.hash === hash);
      if (!c) return fehler(404, "klasse_unbekannt");
      const k = Z.schluessel.find(x => x.id === c.sid);
      if (!k || (k.rolle !== "lehrer" && k.rolle !== "schule")) return fehler(404, "klasse_unbekannt");
      const s = status(k); if (s !== "aktiv") return fehler(STATUS_CODE[s], s, { gueltig_bis: k.bis });
      const g = await gh(j.geraet);
      const d = Z.geraete.find(x => x.sid === k.id && x.gh === g);
      if (c.za && !(d && d.klasse === c.id)) { const z = zugangVon(k.id, c.za); if (!z || z.status !== "aktiv") return fehler(403, "inaktiv", { grund: "zugang_gesperrt", gueltig_bis: k.bis }); }
      let rol = "schueler";
      if (d && d.klasse == null) { rol = "lehrer"; d.zuletzt = heute(); }
      else if (d) { d.klasse = c.id; d.zuletzt = heute(); }
      else {
        if (belegt(k.id) >= plaetzeVon(k)) return fehler(409, "voll", { plaetze: plaetzeVon(k) });
        Z.geraete.push({ sid: k.id, gh: g, klasse: c.id, zuletzt: heute() }); zaehleAktivierung(k.id, c.id, c.name);
      }
      speichern();
      const [t, p] = await token(k, g, rol === "schueler" ? { rol: "schueler", kl: c.id } : (d && d.za ? { za: d.za } : null));
      return antwort(200, { ok: true, token: t, typ: k.typ, gueltig_bis: k.bis, token_bis: p.exp, rolle: p.rol, test: true, klasse: klasseFuerApp(c) });
    },
    async "/api/lehrer.php"(j) {
      const [k, g, f] = await tokenUndGeraet(j); if (f) return f;
      if (k.rolle !== "lehrer" && k.rolle !== "schule") return fehler(403, "keine_lehrkraft");
      const s = status(k); if (s !== "aktiv") return fehler(STATUS_CODE[s], s, { gueltig_bis: k.bis });
      const dg = Z.geraete.find(x => x.sid === k.id && x.gh === g && x.klasse == null);
      if (!dg) return fehler(404, "freigegeben");
      let z = null;
      if (k.rolle === "schule") {   // jede Lehrkraft sieht und ändert nur die Klassen ihres Zugangs
        z = zugangVon(k.id, dg.za);
        if (!z) return fehler(404, "freigegeben");
        if (z.status !== "aktiv") return fehler(403, "zugang_gesperrt");
      }
      const zid = z ? z.id : 0;
      const eigene = () => Z.klassen.filter(c => c.sid === k.id && (c.za || 0) === zid);
      const uebersicht = () => {
        const kl = eigene().sort((a, b) => a.name.localeCompare(b.name, "de") || a.id - b.id)
          .map(c => ({ id: c.id, name: c.name, hinweis: c.hinweis, themen: c.themen, stand: c.stand, live: !!liveVon(c), belegt: Z.geraete.filter(x => x.klasse === c.id).length }));
        const l = { hinweis: k.hinweis, typ: k.typ, schule: k.schule, gueltig_bis: k.bis, test: true, plaetze: plaetzeVon(k), belegt: belegt(k.id), max_klassen: maxKlassen(k) };
        if (z) { l.eigene = kl.reduce((n, c) => n + c.belegt, 0); l.klassen_schule = Z.klassen.filter(c => c.sid === k.id).length; l.zugang = { nr: z.nr, hinweis: z.code.slice(-4) }; }
        return { ok: true, lizenz: l, klassen: kl };
      };
      const laden = id => (Number.isInteger(id) || (typeof id === "string" && /^\d+$/.test(id))) ? eigene().find(c => c.id === +id) : null;
      const neuerCode = async () => { for (;;) { let s = ""; const r = crypto.getRandomValues(new Uint8Array(8)); for (const b of r) s += ZEICHEN[b % ZEICHEN.length]; const h = await sha256hex("klasse|" + s); if (!Z.klassen.some(c => c.hash === h)) return [s, h]; } };
      const anz = s => s.slice(0, 4) + "-" + s.slice(4);
      const a = String(j.aktion || "");
      if (a === "uebersicht") return antwort(200, uebersicht());
      if (a === "klasse_neu") {
        const name = String(j.name == null ? "" : j.name).replace(/[\x00-\x1F\x7F]/g, "").replace(/\s+/g, " ").trim();
        if (!name || name.length > 40) return fehler(400, "name");
        if (Z.klassen.filter(c => c.sid === k.id).length >= maxKlassen(k)) return fehler(409, "zu_viele_klassen", { max_klassen: maxKlassen(k) });
        const [s, h] = await neuerCode(), id = ++Z.nr.c;
        Z.klassen.push({ id, sid: k.id, za: zid || null, hash: h, hinweis: s.slice(-4), name, themen: null, stand: Math.floor(Date.now() / 1000) }); speichern();
        return antwort(200, Object.assign(uebersicht(), { neu: { id, code: anz(s) } }));
      }
      const c = laden(j.id);
      if (["code_neu", "themen", "plaetze_frei", "klasse_loeschen", "testgeraet", "live"].includes(a) && !c) return fehler(404, "klasse_unbekannt");
      if (a === "code_neu") { const [s, h] = await neuerCode(); c.hash = h; c.hinweis = s.slice(-4); speichern(); return antwort(200, Object.assign(uebersicht(), { neu: { id: c.id, code: anz(s) } })); }
      if (a === "themen") {
        const t = j.themen;
        if (t !== null && (!Array.isArray(t) || t.length > 100 || t.some(x => typeof x !== "string" || !/^qs-\d{2}$/.test(x)))) return fehler(400, "themen");
        c.themen = t === null ? null : [...new Set(t)]; c.stand = Math.floor(Date.now() / 1000); speichern();
        return antwort(200, uebersicht());
      }
      if (a === "plaetze_frei") { const vor = Z.geraete.length; Z.geraete = Z.geraete.filter(x => x.klasse !== c.id); speichern(); return antwort(200, Object.assign(uebersicht(), { frei: vor - Z.geraete.length })); }
      if (a === "klasse_loeschen") { Z.geraete = Z.geraete.filter(x => x.klasse !== c.id); Z.klassen = Z.klassen.filter(x => x !== c); speichern(); return antwort(200, uebersicht()); }
      if (a === "testgeraet") {   // nur Testumgebung: ein weiteres Schülergerät nachstellen (wie ein Handy in der Klasse)
        if (belegt(k.id) >= plaetzeVon(k)) return fehler(409, "voll", { plaetze: plaetzeVon(k) });
        Z.geraete.push({ sid: k.id, gh: "sim-" + Math.random().toString(36).slice(2), klasse: c.id, zuletzt: heute() }); zaehleAktivierung(k.id, c.id, c.name); speichern();
        return antwort(200, uebersicht());
      }
      if (a === "live") {   // Update 7: Live-Stunde an genau diese Klasse binden (null = lösen), läuft nach 6 Stunden ab
        const lc = j.code === undefined ? null : j.code;
        if (lc !== null && !(typeof lc === "string" && /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(lc))) return fehler(400, "code");
        if (lc === null) { c.live = ""; c.liveBis = 0; }
        else { Z.klassen.forEach(x => { if (x.sid === k.id && x.live === lc && x !== c) { x.live = ""; x.liveBis = 0; } }); c.live = lc; c.liveBis = Date.now() + 6 * 3600 * 1000; }
        speichern(); return antwort(200, { ok: true, id: c.id, live: lc !== null });
      }
      if (a === "zugang_code_neu" && z) { z.code = zugangCodeNeu(); speichern(); return antwort(200, Object.assign(uebersicht(), { zugang_code: z.code })); }
      return fehler(400, "aktion");
    },
    async "/api/schule.php"(j) {
      const a = String(j.aktion || "");
      if (a === "info") return antwort(200, { ok: true, schullizenz: 1 });
      if (a === "zugang_neu") {
        if (!geraetOk(j.geraet)) return fehler(400, "anfrage");
        const code = schluesselNorm(j.schluessel);
        if (!code) return fehler(404, "ungueltig");
        if (!code.startsWith("BT-TEST-")) return fehler(403, "testbetrieb");
        const k = Z.schluessel.find(x => x.code === code);
        if (!k || k.rolle !== "schule") return fehler(404, k ? "kein_schulschluessel" : "ungueltig");
        const s = status(k); if (s !== "aktiv") return fehler(STATUS_CODE[s], s, { gueltig_von: k.von, gueltig_bis: k.bis });
        if (!k.offen) return fehler(403, "zugang_zu");
        const alle = Z.zugaenge.filter(z => z.sid === k.id);
        if (alle.length >= k.max_zugaenge) return fehler(409, "zu_viele_zugaenge", { max_zugaenge: k.max_zugaenge });
        const z = { id: ++Z.nr.z, sid: k.id, nr: alle.reduce((m, x) => Math.max(m, x.nr), 0) + 1, code: zugangCodeNeu(), status: "aktiv", herkunft: null };
        Z.zugaenge.push(z);
        const g = await gh(j.geraet), d = Z.geraete.find(x => x.sid === k.id && x.gh === g);
        if (d) { d.klasse = null; d.za = z.id; d.zuletzt = heute(); } else Z.geraete.push({ sid: k.id, gh: g, klasse: null, za: z.id, zuletzt: heute() });
        zaehleAktivierung(k.id, 0, ""); speichern();
        const [t, p] = await token(k, g, { za: z.id });
        return antwort(200, { ok: true, token: t, typ: k.typ, gueltig_bis: k.bis, token_bis: p.exp, rolle: "lehrer", test: true, zugang: { nr: z.nr, hinweis: z.code.slice(-4), code: z.code } });
      }
      if (!a.startsWith("admin_")) return fehler(400, "aktion");
      const [k, f] = adminFinden(j.admin); if (f) return f;
      if (a === "admin_uebersicht") return antwort(200, schuleUebersicht(k));
      if (["admin_zugang", "admin_plaetze_frei", "admin_geraete_ab"].includes(a)) {
        const z = Number.isInteger(j.id) ? zugangVon(k.id, j.id) : null;
        if (!z) return fehler(404, "zugang_unbekannt");
        if (a === "admin_zugang") {
          if (!["aktiv", "gesperrt"].includes(j.status)) return fehler(400, "anfrage");
          z.status = j.status; speichern(); return antwort(200, schuleUebersicht(k));
        }
        const kl = Z.klassen.filter(c => c.za === z.id).map(c => c.id), vor = Z.geraete.length;
        Z.geraete = Z.geraete.filter(x => a === "admin_plaetze_frei" ? !kl.includes(x.klasse) : !(x.za === z.id && x.klasse == null)); speichern();
        return antwort(200, Object.assign(schuleUebersicht(k), a === "admin_plaetze_frei" ? { frei: vor - Z.geraete.length } : { abgemeldet: vor - Z.geraete.length }));
      }
      if (a === "admin_neue_zugaenge") {
        if (typeof j.offen !== "boolean") return fehler(400, "anfrage");
        k.offen = j.offen; speichern(); return antwort(200, schuleUebersicht(k));
      }
      if (a === "admin_uebernehmen") {
        const [alt, f2] = adminFinden(j.vorjahr); if (f2) return f2;
        if (alt.id === k.id) return fehler(409, "vorjahr_unbekannt");
        if (alt.bis >= k.bis || alt.von >= k.von) return fehler(409, "vorjahr_nicht_aelter", { daten_bis: datenBis(alt) });
        if (k.vorgaenger && k.vorgaenger !== alt.id) return fehler(409, "schon_uebernommen", { daten_bis: datenBis(alt) });
        let nZ = 0, nK = 0, ohne = 0; const map = {};
        for (const z of Z.zugaenge.filter(x => x.sid === alt.id).sort((a, b) => a.nr - b.nr)) {
          const schon = Z.zugaenge.find(x => x.sid === k.id && x.herkunft === z.id);
          if (schon) { map[z.id] = schon.id; continue; }
          const neuZ = Z.zugaenge.filter(x => x.sid === k.id);
          if (neuZ.length >= k.max_zugaenge) { ohne++; continue; }
          const nr = neuZ.some(x => x.nr === z.nr) ? neuZ.reduce((m, x) => Math.max(m, x.nr), 0) + 1 : z.nr;
          const n = { id: ++Z.nr.z, sid: k.id, nr, code: z.code, status: z.status, herkunft: z.id }; Z.zugaenge.push(n); map[z.id] = n.id; nZ++;
        }
        for (const c of Z.klassen.filter(x => x.sid === alt.id && x.za)) {
          if (!map[c.za]) { ohne++; continue; }
          if (Z.klassen.some(x => x.sid === k.id && x.herkunft === c.id)) continue;
          if (Z.klassen.filter(x => x.sid === k.id).length >= maxKlassen(k)) { ohne++; continue; }
          Z.klassen.push({ id: ++Z.nr.c, sid: k.id, za: map[c.za], hash: null, hinweis: "", name: c.name, themen: c.themen, stand: Math.floor(Date.now() / 1000), herkunft: c.id }); nK++;
        }
        k.vorgaenger = alt.id; speichern();
        return antwort(200, Object.assign(schuleUebersicht(k), { uebernommen: { zugaenge: nZ, klassen: nK, nicht_uebernommen: ohne } }));
      }
      return fehler(400, "aktion");
    },
    async "/api/aufruf.php"() { const t = heute(); Z.zaehlung.tage[t] = (Z.zaehlung.tage[t] || 0) + 1; speichern(); return antwort(200, { ok: true }); }
  };
  let kette = Promise.resolve();   // Anfragen nacheinander (wie Datenbank-Sperren am Server)
  function post(pfad, daten) {
    const lauf = kette.then(async () => {
      await bereit();
      const f = API[pfad];
      const j = f ? await f(daten && typeof daten === "object" ? daten : {}) : fehler(404, "nicht_verfuegbar");
      const { _status, ...rest } = j;
      return rest;
    });
    kette = lauf.catch(() => { });
    return lauf;
  }
  async function zuruecksetzen() {
    try {
      Object.keys(localStorage).filter(k => k === KEY || k.startsWith("buchungstrainer:lizenz:") || k.startsWith("buchungstrainer:lehrkraft:") || k === "buchungstrainer:klassencode").forEach(k => localStorage.removeItem(k));
    } catch (e) { }
    try { sessionStorage.removeItem("buchungstrainer:schule:admin"); } catch (e) { }
    Z = null; await anlegen();
  }
  /** Dieses Browserfenster als weiteres Schülergerät: neue Geräte-ID, Freischaltung der App weg (Lehrkraft-Seite bleibt angemeldet). */
  function neuesGeraet() {
    try { ["geraet", "token", "check", "zeit", "uhrabweichung"].forEach(k => localStorage.removeItem("buchungstrainer:lizenz:" + k)); localStorage.removeItem("buchungstrainer:klassencode"); } catch (e) { }
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /** Hinweis-Box (Start der App und Lizenzseite): klar beschriftet, mit den Testcodes und zwei Knöpfen. */
  function bannerHtml(mitLehrkraftLink) {
    return `<div class="card tsbanner" id="tsbanner" role="note"><div class="tskopf"><b>TESTMODUS</b> · ohne Server: Lizenzen, Klassen und Plätze werden nur in diesem Browser nachgestellt.</div>
      <details class="tscodes"><summary>Testcodes anzeigen</summary><table><tbody>
        <tr><th scope="row">Lehrkraft (30 Plätze)</th><td><code>${esc(FEST[0].code)}</code></td></tr>
        <tr><th scope="row">Schüler: Klassencode</th><td><code>TEST-2AKK</code> (Testklasse 2AK)</td></tr>
        <tr><th scope="row">Lehrkraft (3 Plätze, Limit)</th><td><code>${esc(FEST[1].code)}</code></td></tr>
        <tr><th scope="row">Schüler: Klassencode</th><td><code>DREY-3PTZ</code> (Limit-Test)</td></tr>
        <tr><th scope="row">Schulschlüssel (10 Plätze für die ganze Schule)</th><td><code>${esc(SCHULEN[0].code)}</code></td></tr>
        <tr><th scope="row">Lehrkraft A: persönlicher Code</th><td><code>${esc(SCHULEN[0].zugaenge[0].code)}</code> (Klasse 2AK, Klassencode <code>SCHU-2AKA</code>)</td></tr>
        <tr><th scope="row">Lehrkraft B: persönlicher Code</th><td><code>${esc(SCHULEN[0].zugaenge[1].code)}</code> (Klasse 3BK, Klassencode <code>SCHU-3BKB</code>)</td></tr>
        <tr><th scope="row">Schul-Übersicht: Admin-Code</th><td><code>${esc(SCHULEN[0].admin)}</code></td></tr>
        <tr><th scope="row">Nächstes Schuljahr (gilt ab 1.9.)</th><td>Schulschlüssel <code>${esc(SCHULEN[1].code)}</code>, Admin-Code <code>${esc(SCHULEN[1].admin)}</code></td></tr></tbody></table></details>
      <div class="tsknoepfe">${mitLehrkraftLink ? `<a class="linkbtn" href="lehrkraft.html">Lizenzseite für Lehrkräfte</a>` : ""}${mitLehrkraftLink === "schule" ? "" : `<a class="linkbtn" href="schule.html">Schul-Übersicht</a>`}<button type="button" class="linkbtn" id="tsgeraet">Als neues Gerät testen</button><button type="button" class="linkbtn" id="tsreset">Testdaten zurücksetzen</button></div>
      <p class="tsmsg" id="tsmsg" role="status"></p></div>`;
  }
  function bannerBinden(nachher) {
    const g = document.getElementById("tsgeraet"), r = document.getElementById("tsreset"), m = document.getElementById("tsmsg");
    if (g) g.onclick = () => { neuesGeraet(); if (m) m.textContent = "Dieser Browser ist jetzt ein neues Schülergerät. Die Seite wird neu geladen."; setTimeout(() => location.reload(), 600); };
    if (r) r.onclick = async () => { if (!confirm("Alle Testdaten in diesem Browser löschen und neu anlegen?")) return; await zuruecksetzen(); if (m) m.textContent = "Testdaten zurückgesetzt. Die Seite wird neu geladen."; setTimeout(() => location.reload(), 600); };
    if (typeof nachher === "function") nachher();
  }
  window.BT_TESTSERVER = { aktiv: true, schluessel: PUB_B64, post, bereit, zuruecksetzen, neuesGeraet, bannerHtml, bannerBinden, FEST, KLASSEN, SCHULEN, _signieren: signieren };
})();
