#!/usr/bin/env python3
"""Kurze Prüfungen der Rechtstexte und der Einbindungen in der App."""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
A = json.loads((Path(__file__).parent / "angaben.json").read_text(encoding="utf-8"))
KI = "Die Stimme in diesem Erklärvideo ist computergenerierte (KI-)Sprache, es spricht keine reale Person."
fails = []

def check(cond, msg):
    if not cond:
        fails.append(msg)

for name in ("impressum.html", "datenschutz.html"):
    t = (ROOT / name).read_text(encoding="utf-8")
    check("Alle Materialien sind kostenlos" not in t, f"{name}: alte Kostenlos-Zeile")
    check("[PLATZHALTER" not in t, f"{name}: roher Platzhalter")
    check("[BESTÄTIGEN" not in t, f"{name}: BESTÄTIGEN-Marker")
    check("kontakt@profmasar.at" in t, f"{name}: Support-Adresse")
    check('href="impressum.html"' in t and 'href="datenschutz.html"' in t, f"{name}: Fuß-/Menü-Links")
    check("Initiative des Bundesministeriums" not in t, f"{name}: BMB-Hinweis zu früh")
    check("empfohlen" not in t.lower(), f"{name}: Wort empfohlen")
    check("googleapis" not in t and "fonts.google" not in t and "cdn.js" not in t, f"{name}: Fremdressource")
    skripte = re.findall(r"<script([^>]*)>", t.lower())
    check(all(re.fullmatch(r' src="(?:konfig|bf)\.js\?v=\d+"', x) for x in skripte), f"{name}: nur konfig.js und bf.js, kein eigenes oder fremdes Skript")
    if A.get("entwurf"):
        check("Entwurf" in t and "angabe-offen" in t, f"{name}: Entwurfskennzeichnung")

ds = (ROOT / "datenschutz.html").read_text(encoding="utf-8")
check("2.7 Lehrer-Anmeldung" in ds if A.get("lehrer_login_aktiv") else "2.7 Lehrer-Anmeldung" not in ds,
      "Abschnitt 2.7 entspricht dem Schalter lehrer_login_aktiv")
check("DRITTLAND-ABSATZ" in ds and "HOSTER-BLOCK A" in ds and "HOSTER-BLOCK B" in ds, "austauschbare Hosting-Blöcke")

for name in ("index.html", "beamer.html"):
    t = (ROOT / name).read_text(encoding="utf-8")
    check('class="app-menu"' in t, f"{name}: App-Menü (von bf.js aus konfig.js gefüllt)")
    check("impressum.html" not in t and "datenschutz.html" not in t, f"{name}: Linkziele nur in konfig.js")
    check("kiStimmeHtml()" in t and "rechtFooterHtml" not in t, f"{name}: KI-Helfer, kein zweiter Fußzeilen-Helfer")
    check(KI in t, f"{name}: KI-Satz")
    check("videosVor(e.nr).length ? kiStimmeHtml()" not in t, f"{name}: KI-Hinweis nur im Videofenster, nicht zusätzlich an der Karte")
    check(t.count("${kiStimmeHtml()}") >= 2, f"{name}: KI-Hinweis vor dem Player")
    check("Initiative des Bundesministeriums" not in t, f"{name}: kein BMB-Hinweis")
    check("Alle Materialien sind kostenlos" not in t, f"{name}: keine Kostenlos-Zeile")

if fails:
    print("FEHLER:")
    for f in fails:
        print("-", f)
    sys.exit(1)
print("recht/pruefen.py: alle Prüfungen ok")
