#!/usr/bin/env python3
"""Baut Impressum und Datenschutzerklärung aus recht/angaben.json.

Pflichtfelder werden nicht erfunden. In der Entwurfsfassung (entwurf: true)
stehen klar gekennzeichnete „Noch offen“-Felder. Nach Stefans Angaben
die Datei ausfüllen, entwurf auf false setzen und neu bauen.

Aufruf: python3 recht/bauen.py
        python3 recht/bauen.py --paket /workspace/startup_profmasar/rechtstexte_paket_2026-11-28
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ANGABEN_PFAD = Path(__file__).resolve().parent / "angaben.json"

RICHTUNG = (
    "Praxisnahe Übungen, Apps und Unterrichtsmaterialien für Rechnungswesen, "
    "Betriebswirtschaft und Recht, entwickelt für den Unterricht. Einzelne "
    "Angebote sind kostenfrei, für Schulen werden Lizenzen gegen Entgelt angeboten."
)
KI_STIMME = (
    "Die Stimme in diesem Erklärvideo ist computergenerierte (KI-)Sprache, "
    "es spricht keine reale Person."
)


def e(s: str) -> str:
    return html.escape(s, quote=True)


def wert(v):
    if v is None:
        return None
    if isinstance(v, str) and not v.strip():
        return None
    return v


def offen(label: str, entwurf: bool, streichbar: bool = False) -> str:
    if not entwurf:
        return ""
    zusatz = " (entfällt, falls nicht zutreffend)" if streichbar else ""
    return f'<span class="angabe-offen">Noch offen{zusatz}: {e(label)}</span>'


def feld(v, label: str, entwurf: bool, streichbar: bool = False) -> str:
    v = wert(v)
    if v is not None:
        return e(str(v))
    return offen(label, entwurf, streichbar=streichbar)


def zeile(label: str, inhalt: str, *, leer_weg: bool = False) -> str:
    if not inhalt and leer_weg:
        return ""
    if not inhalt:
        return ""
    if label:
        return f"<p>{e(label)}: {inhalt}</p>\n"
    return f"<p>{inhalt}</p>\n"


def css() -> str:
    return """
:root{
  --bg:#f5f6f8; --card:#fff; --text:#1d2430; --muted:#5d6778; --line:#e3e6eb;
  --accent:#2f6f73; --accent-soft:#e6f1f1; --warn-bg:#fff6d9; --warn-text:#4a3a10; --warn-border:#c9a227;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);
  font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
a{color:var(--accent);text-underline-offset:2px}
a:focus-visible,button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.skip{position:absolute;left:-999px;top:8px}
.skip:focus{left:12px;background:#fff;padding:8px 12px;z-index:9;border-radius:8px}
header.top{background:var(--card);border-bottom:1px solid var(--line)}
header.top .wrap,footer .wrap,main.wrap{max-width:760px;margin:0 auto;padding:16px 14px}
header.top .wrap{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px 16px}
header.top h1{font-size:1.15rem;margin:0;font-weight:700}
header.top .ort{color:var(--muted);font-size:.92rem}
nav.menu{display:flex;flex-wrap:wrap;gap:8px 14px}
nav.menu a{min-height:44px;display:inline-flex;align-items:center;font-weight:600}
main.wrap{padding:24px 14px 48px}
article.doc{background:var(--card);border-radius:14px;box-shadow:0 1px 2px rgba(20,30,50,.06),0 4px 14px rgba(20,30,50,.06);padding:22px 18px 28px}
h1.titel{font-size:1.7rem;line-height:1.2;margin:0 0 8px;letter-spacing:-.01em}
.sub{color:var(--muted);margin:0 0 18px}
h2{font-size:1.12rem;margin:28px 0 8px;padding-top:16px;border-top:1px solid var(--line)}
h3{font-size:1rem;margin:18px 0 6px}
p,address,ul{margin:0 0 10px}
address{font-style:normal}
ul{padding-left:1.2em}
.entwurf-banner{background:var(--warn-bg);color:var(--warn-text);border:2px solid var(--warn-border);
  border-radius:12px;padding:12px 14px;margin:0 0 18px}
.entwurf-banner strong{display:block;margin-bottom:4px}
.entwurf-banner ul{margin:8px 0 0}
.angabe-offen{display:inline;background:#ffe9a8;border-radius:4px;padding:.05em .35em;font-weight:650;color:#4a3a10}
footer{border-top:1px solid var(--line);color:var(--muted);font-size:.9rem}
footer .wrap{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;justify-content:space-between;padding-bottom:32px}
footer nav{display:flex;flex-wrap:wrap;gap:8px 14px}
footer a{color:inherit;font-weight:600}
.small{font-size:.92rem;color:var(--muted)}
@media (min-width:700px){article.doc{padding:32px 36px 36px}}
""".strip()


def buster() -> str:
    """Cache-Buster der App (steht in index.html), damit bf.css/bf.js/konfig.js auf den Rechtsseiten mitgezogen werden."""
    m = re.search(r'bf\.js\?v=(\d+)', (ROOT / "index.html").read_text(encoding="utf-8"))
    return m.group(1) if m else "1"


def seitenrahmen(title: str, body: str, *, aktuelle: str, variante: str, entwurf: bool, bf_url: str = "") -> str:
    if variante == "app":
        home_href, home_text = "index.html", "Zurück zum Buchungstrainer"
        marke, ort = "Buchungstrainer", "Rechnungswesen"
    elif variante == "lizenz":
        home_href, home_text = "./", "Zurück zur Lizenzseite"
        marke, ort = "Buchungstrainer", "Lizenz"
    else:
        home_href, home_text = "./", "Zurück zur Startseite"
        marke, ort = "Prof. Masar", "profmasar.at"

    # In der App: derselbe Schalter „Barrierefreiheit“ wie auf den anderen Seiten (bf.css, konfig.js, bf.js); auf anderen Hostern ohne.
    bf_kopf = f'<link rel="stylesheet" href="bf.css?v={buster()}">\n' if variante == "app" else ""
    bf_skripte = f'<script src="konfig.js?v={buster()}"></script>\n<script src="bf.js?v={buster()}"></script>\n' if variante == "app" else ""
    robots = "noindex, nofollow" if entwurf else "noindex"
    banner_note = " – Entwurf" if entwurf else ""
    nav = []
    for href, label, key in (
        ("impressum.html", "Impressum", "impressum"),
        ("datenschutz.html", "Datenschutz", "datenschutz"),
    ):
        cur = ' aria-current="page"' if aktuelle == key else ""
        nav.append(f'<a href="{href}"{cur}>{label}</a>')
    if variante == "app":
        cur = ' aria-current="page"' if aktuelle == "produktbeschreibung" else ""
        nav.append(f'<a href="produktbeschreibung.html"{cur}>Produktbeschreibung</a>')
    if bf_url:
        cur = ' aria-current="page"' if aktuelle == "barrierefreiheit" else ""
        nav.append(f'<a href="{e(bf_url)}"{cur}>Barrierefreiheit</a>')
    nav.append('<a href="mailto:kontakt@profmasar.at">Support</a>')
    nav_html = "\n      ".join(nav)
    bf_fuss = (f'<a href="produktbeschreibung.html">Bedingungen</a>\n      ' if variante == "app" else "") + (f'<a href="{e(bf_url)}">Barrierefreiheit</a>' if bf_url else "")
    return f"""<!DOCTYPE html>
<html lang="de-AT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="{robots}">
<meta name="referrer" content="no-referrer">
<meta name="theme-color" content="#ffffff">
<title>{e(title)}{e(banner_note)}</title>
<style>
{css()}
</style>
{bf_kopf}</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
<header class="top">
  <div class="wrap">
    <div>
      <h1>{e(marke)}</h1>
      <div class="ort">{e(ort)}</div>
    </div>
    <nav class="menu" aria-label="Menü">
      {nav_html}
      <a href="{e(home_href)}">{e(home_text)}</a>
    </nav>
  </div>
</header>
<main id="inhalt" class="wrap">
{body}
</main>
<footer>
  <div class="wrap">
    <nav aria-label="Rechtliches und Support">
      <a href="impressum.html">Impressum</a>
      <a href="datenschutz.html">Datenschutz</a>
      {bf_fuss}
      <a href="mailto:kontakt@profmasar.at">Support: kontakt@profmasar.at</a>
    </nav>
    <span>Kein Tracking, keine Werbung.</span>
  </div>
</footer>
{bf_skripte}</body>
</html>
"""


def fehlende_pflicht(d: dict) -> list[str]:
    fehl = []
    if not wert(d.get("strasse")):
        fehl.append("Anschrift (Straße und Hausnummer)")
    if not wert(d.get("rechtsform")) and not (d.get("firmenbuch") or {}).get("eingetragen"):
        fehl.append("Rechtsform bzw. Firmenwortlaut, oder ob kein Firmenbuch besteht")
    g = d.get("gewerbe") or {}
    if g.get("kein_gewerbe_neue_selbststaendigkeit") is True:
        pass
    elif g.get("kein_gewerbe_neue_selbststaendigkeit") is False and wert(g.get("wortlaut")) and wert(g.get("standort")) and wert(g.get("behoerde")):
        pass
    else:
        fehl.append("Gewerbe (Wortlaut, Standort, Behörde) oder Bestätigung: Neue Selbständigkeit")
    if not wert(d.get("unternehmensgegenstand")):
        fehl.append("Unternehmensgegenstand")
    if not wert(d.get("uid")) and d.get("kleinunternehmer") is None and not wert(d.get("preise_hinweis")):
        fehl.append("UID oder Kleinunternehmer-Status für den Preis-Satz")
    if not wert(d.get("telefon")):
        fehl.append("Telefonnummer")
    return fehl


def entwurf_banner(d: dict, extra: list[str] | None = None) -> str:
    if not d.get("entwurf"):
        return ""
    pflicht = fehlende_pflicht(d)
    weitere = extra or []
    items = "".join(f"<li>{e(x)}</li>" for x in pflicht + weitere)
    liste = f"<p>Noch offene Pflichtangaben:</p><ul>{items}</ul>" if items else "<p>Die Pflichtangaben sind eingetragen, die Seite bleibt ein Entwurf, bis Stefan sie freigibt.</p>"
    return f"""<div class="entwurf-banner" role="status">
  <strong>Entwurf – noch nicht zur Veröffentlichung</strong>
  <p>Pflichtangaben dürfen nicht erfunden werden. Die gelb markierten Felder füllt Stefan. Erst danach darf diese Seite live gehen.</p>
  {liste}
</div>
"""


def impressum_body(d: dict) -> str:
    entwurf = bool(d.get("entwurf"))
    g = d.get("gewerbe") or {}
    fb = d.get("firmenbuch") or {}
    name = feld(d.get("name"), "Name", entwurf) or e("Stefan Masar")
    rechtsform = feld(d.get("rechtsform"), "Rechtsform bzw. Firmenwortlaut", entwurf, streichbar=True)
    strasse = feld(d.get("strasse"), "Straße und Hausnummer", entwurf)
    ort = ", ".join(x for x in [wert(d.get("plz_ort")) or "1130 Wien", wert(d.get("land")) or "Österreich"] if x)
    tel = feld(d.get("telefon"), "Telefonnummer", entwurf)
    support_tel = feld(d.get("support_telefon") or d.get("telefon"), "Support-Telefonnummer", entwurf)

    gegenstand = feld(d.get("unternehmensgegenstand"), "Wortlaut aus der Gewerbeberechtigung bzw. dem GISA-Auszug", entwurf)

    gewerbe_html = ""
    if g.get("kein_gewerbe_neue_selbststaendigkeit") is True:
        gewerbe_html = "<p>Es handelt sich um eine Neue Selbständigkeit, nicht um ein Gewerbe.</p>\n"
    else:
        gewerbe_html += zeile("Unternehmensgegenstand", gegenstand)
        gewerbe_html += zeile("Gewerbewortlaut", feld(g.get("wortlaut"), "Gewerbe, zum Beispiel laut GISA", entwurf, streichbar=True))
        gewerbe_html += zeile("Standort der Gewerbeberechtigung", feld(g.get("standort"), "Gemeinde", entwurf, streichbar=True))
        gewerbe_html += zeile("Zuständige Gewerbebehörde", feld(g.get("behoerde"), "Magistratisches Bezirksamt / Bezirkshauptmannschaft", entwurf, streichbar=True))
        kammer = wert(g.get("kammer"))
        if kammer:
            gewerbe_html += zeile("Kammer", e(kammer))
        else:
            gewerbe_html += zeile("Kammer", offen("zum Beispiel Wirtschaftskammer Wien", entwurf, streichbar=True), leer_weg=not entwurf)
        beruf = wert(g.get("berufsbezeichnung"))
        if beruf:
            gewerbe_html += f"<p>Berufsbezeichnung und Verleihungsstaat: {e(beruf)}, Österreich</p>\n"
        else:
            inhalt = offen("Berufsbezeichnung laut Gewerbe", entwurf, streichbar=True)
            if inhalt:
                gewerbe_html += f"<p>Berufsbezeichnung und Verleihungsstaat: {inhalt}, Österreich</p>\n"
        if g.get("kein_gewerbe_neue_selbststaendigkeit") is not True:
            # Vorschriften nur, wenn ein Gewerbe (oder der Entwurf das noch offen lässt)
            if wert(g.get("wortlaut")) or entwurf:
                gewerbe_html += "<p>Anwendbare Vorschriften: Gewerbeordnung 1994 (GewO), abrufbar unter www.ris.bka.gv.at</p>\n"

    uid = wert(d.get("uid"))
    if uid:
        gewerbe_html += zeile("Umsatzsteuer-Identifikationsnummer", e(uid))
    else:
        gewerbe_html += zeile("Umsatzsteuer-Identifikationsnummer", offen("ATU…", entwurf, streichbar=True), leer_weg=not entwurf)

    if fb.get("eingetragen") is True:
        teile = [wert(fb.get("firma")), wert(fb.get("rechtsform")), wert(fb.get("sitz")),
                 ("FN " + fb["nummer"]) if wert(fb.get("nummer")) else None,
                 wert(fb.get("gericht"))]
        gewerbe_html += "<p>" + ", ".join(e(x) for x in teile if x) + "</p>\n"
    elif fb.get("eingetragen") is False:
        pass
    else:
        inhalt = offen("nur bei Eintragung im Firmenbuch: Firma, Rechtsform, Sitz, Firmenbuchnummer, Firmenbuchgericht", entwurf, streichbar=True)
        if inhalt:
            gewerbe_html += f"<p>{inhalt}</p>\n"

    preise = wert(d.get("preise_hinweis"))
    if preise:
        preis_satz = f"Alle Preise sind Preise in Euro {e(preise)}. Es fallen keine Versandkosten an, weil Lizenzen digital geliefert werden."
    else:
        luecke = offen("inklusive Umsatzsteuer (Bruttopreise) oder ohne Umsatzsteuer, weil umsatzsteuerbefreit (Kleinunternehmer)", entwurf)
        preis_satz = f"Alle Preise sind Preise in Euro{(' ' + luecke) if luecke else ''}. Es fallen keine Versandkosten an, weil Lizenzen digital geliefert werden."

    bf = wert(d.get("barrierefreiheit_url"))
    liz = wert(d.get("lizenzbedingungen_url"))
    bf_zeile = f'<p>Barrierefreiheit: <a href="{e(bf)}">Barrierefreiheitserklärung</a></p>\n' if bf else (
        f"<p>Barrierefreiheit: {offen('Link zur Barrierefreiheitserklärung, sobald sie veröffentlicht ist', entwurf, streichbar=True)}</p>\n" if entwurf else ""
    )
    liz_zeile = f'<p>Lizenz- und Nutzungsbedingungen: <a href="{e(liz)}">Lizenzbedingungen</a></p>\n' if liz else (
        f"<p>Lizenz- und Nutzungsbedingungen: {offen('Link, sobald vorhanden', entwurf, streichbar=True)}</p>\n" if entwurf else ""
    )

    return f"""<article class="doc">
{entwurf_banner(d)}
  <h1 class="titel">Impressum und Offenlegung</h1>
  <p class="sub">Angaben nach § 5 E-Commerce-Gesetz (ECG), §§ 24 und 25 Mediengesetz (MedienG) und § 63 Gewerbeordnung (GewO)</p>

  <h2>Medieninhaber, Herausgeber und Diensteanbieter</h2>
  <address>
    {name}{(" " + rechtsform) if rechtsform else ""}<br>
    {strasse}<br>
    {e(ort)}
  </address>
  <p>E-Mail: <a href="mailto:kontakt@profmasar.at">kontakt@profmasar.at</a></p>
  <p>Telefon: {tel}</p>

  <h2>Unternehmensgegenstand und Gewerbe</h2>
  {gewerbe_html}
  <h2>Preise</h2>
  <p>{preis_satz}</p>

  <h2>Offenlegung nach § 25 Mediengesetz</h2>
  <p>Medieninhaber und Betreiber: Stefan Masar, Wohnort Wien (Anschrift siehe oben).</p>
  <p>Unternehmensgegenstand: siehe oben.</p>
  <p>Beteiligungen: Stefan Masar ist Alleininhaber. Es gibt keine weiteren Eigentümer, stillen Beteiligten oder Treugeber.</p>
  <p><strong>Grundlegende Richtung:</strong> {e(RICHTUNG)}</p>

  <h2>Zur App „Buchungstrainer“</h2>
  <p>Die Lernapp „Buchungstrainer“ samt Lizenzprüfung und Live-Klasse betreibe ich selbst (Angaben oben).</p>
  <p>Support: <a href="mailto:kontakt@profmasar.at">kontakt@profmasar.at</a>, Telefon {support_tel}.</p>
  <p>Datenschutz: <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
  {bf_zeile}{liz_zeile}
  <h2>Inhalte und Fehler</h2>
  <p>Ich erstelle alle Inhalte mit Sorgfalt. Fällt dir trotzdem ein Fehler auf, schreib mir bitte eine E-Mail.</p>
  <p>Die Materialien sind Lernhilfen für den Unterricht, keine Rechts-, Steuer- oder Anlageberatung. Der Gesetzesstand steht im jeweiligen Dokument.</p>

  <h2>Unabhängigkeit</h2>
  <p>Es handelt sich um ein eigenes, unabhängiges Projekt. Es hat keinen offiziellen Bezug zur Schule oder zum Schulverein.</p>

  <h2>Marken- und Haftungshinweis</h2>
  <p>Alle Unternehmen, Personen, Marken, Belege und Geschäftsfälle in den Übungsbeispielen sind frei erfunden. Ähnlichkeiten mit realen Unternehmen, Personen oder Marken sind zufällig und nicht beabsichtigt. Zahlen und Belege sind reine Übungsbeispiele und keine Aussagen über tatsächliche Verhältnisse. Glaubst du, dass ein Beispiel Rechte von dir berührt, schreib mir bitte. Ich prüfe und ändere es umgehend.</p>

  <h2>Urheberrecht</h2>
  <p>Alle Texte, Übungen, Apps und Bilder auf dieser Seite sind urheberrechtlich geschützt. Kostenpflichtige Apps und Materialien dürfen nur im Rahmen der erworbenen Lizenz genutzt werden.</p>
  <p class="small">Mehr zum Umgang mit Daten: <a href="datenschutz.html">Datenschutz</a></p>
</article>
"""


def ds_luecke(d: dict, pfad: str, label: str, streichbar: bool = False) -> str:
    teile = pfad.split(".")
    cur = d
    for t in teile:
        cur = (cur or {}).get(t) if isinstance(cur, dict) else None
    return feld(cur, label, bool(d.get("entwurf")), streichbar=streichbar)


def datenschutz_body(d: dict) -> str:
    entwurf = bool(d.get("entwurf"))
    stand = wert(d.get("stand"))
    stand_html = e(stand) if stand else offen("Datum der Veröffentlichung", entwurf)
    anschrift = feld(d.get("strasse"), "Anschrift (Straße und Hausnummer)", entwurf)
    ort = ", ".join(x for x in [wert(d.get("plz_ort")) or "1130 Wien", wert(d.get("land")) or "Österreich"] if x)
    ha = d.get("hoster_a") or {}
    hb = d.get("hoster_b") or {}

    login = ""
    if d.get("lehrer_login_aktiv"):
        login = f"""
  <h3>2.7 Lehrer-Anmeldung per E-Mail-Link</h3>
  <ul>
    <li><strong>Daten:</strong> E-Mail-Adresse der Lehrkraft, Einmal-Link (am Server nur als Hash, zeitlich begrenzt), Sitzungsschlüssel (nur als Hash), gespeicherte Klassen und „Letzte Stunden“ (ohne Namen von Schülerinnen und Schülern).</li>
    <li><strong>Zweck:</strong> Klassen und letzte Stunden auf mehreren Geräten gleich haben. Ohne Anmeldung bleibt alles auf dem Gerät. Der Link wird per E-Mail von kontakt@profmasar.at über den Mailserver meines Hosters gesendet.</li>
    <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Nutzung der Anmeldefunktion auf Wunsch der Lehrkraft).</li>
    <li><strong>Dauer:</strong> bis die Lehrkraft das Konto löschen lässt, sonst <strong>365 Tage nach der letzten Anmeldung oder dem letzten Abgleich</strong>. Die Anmeldesitzung selbst endet nach 90 Tagen.</li>
    <li><strong>Verantwortlich:</strong> ich.</li>
  </ul>
"""

    drittland = ""
    if d.get("drittland_absatz_zeigen", True):
        drittland = """
<!-- ============ DRITTLAND-ABSATZ (GitHub): nach dem Umzug auf einen EU-Hoster komplett löschen ============ -->
  <p><strong>Übermittlung in ein Drittland (USA):</strong> Beim Aufruf der App über GitHub Pages speichert GitHub nach eigenen Angaben deine IP-Adresse zur Sicherheit, auch wenn du nicht bei GitHub angemeldet bist (https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages). Dabei können Daten in die USA gelangen. GitHub erklärt, am EU-U.S. Data Privacy Framework teilzunehmen (https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement); dafür gibt es den Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023 (Durchführungsbeschluss (EU) 2023/1795). Rechtsgrundlage für den Aufruf der App: Art. 6 Abs. 1 lit. f DSGVO. Wenn du das nicht möchtest, schreib mir; ich nenne dir eine Alternative.</p>
<!-- ============ ENDE DRITTLAND-ABSATZ ============ -->
"""

    steuer = wert(d.get("steuerberatung"))
    # Optionale Angaben (Steuerberatung, Sprachdienst, Zahlungsweg): leer = Zeile entfällt, kein sichtbarer Platzhalter.
    steuer_html = f"<li>{e(steuer)}</li>" if steuer else ""
    sprache = wert(d.get("sprachdienst"))
    sprache_satz = (
        f"Erklärvideos mit Computerstimme: Die Stimme wurde vorab erstellt; dabei gehen keine Daten von dir an den Sprachdienst. Dienst: {e(sprache)}."
        if sprache else
        "Erklärvideos mit Computerstimme: Die Stimme wurde vorab erstellt; dabei gehen keine Daten von dir an den Sprachdienst."
    )
    extra_offen = []
    if not wert((d.get("loeschfristen") or {}).get("serverprotokolle")):
        extra_offen.append("Löschfrist der Server-Protokolle beim Hoster")
    if not wert(ha.get("rechenzentrum")):
        extra_offen.append("Rechenzentrum-Standort des Hosters")

    rz = feld(ha.get("rechenzentrum"), "Standort laut Auskunft des Hosters, EU/EWR bestätigen", entwurf)
    uav = feld(ha.get("unterauftragsverarbeiter"), "Unterauftragsverarbeiter laut Liste des Hosters", entwurf)

    return f"""<article class="doc">
{entwurf_banner(d, extra_offen)}
  <h1 class="titel">Datenschutzerklärung</h1>
  <p class="sub">Stand: {stand_html}</p>

  <p><strong>Kurz gesagt:</strong> Ich setze kein Tracking, keine Werbung, keine Statistik-Dienste und keine Cookies ein. Schülerinnen und Schüler brauchen kein Konto, keine E-Mail-Adresse und keinen Echtnamen. Was ich wirklich verarbeite, steht unten.</p>
  <p><strong>Für Schülerinnen und Schüler, in drei Sätzen:</strong> Du brauchst keinen echten Namen, nimm am besten einen Spitznamen. Dein Lernstand bleibt in deinem Browser auf deinem Gerät. In der Live-Klasse sieht deine Lehrkraft, welche Aufgaben du geschafft hast, und nach 30 Tagen wird alles gelöscht.</p>

  <h2>1. Wer ist verantwortlich? Wer ist wofür zuständig?</h2>
  <p><strong>Ich bin Verantwortlicher</strong> (Art. 4 Z 7 DSGVO) für die Website, E-Mail-Anfragen, die Abwicklung von Bestellungen, die Lizenzprüfung und die Lehrer-Anmeldung:</p>
  <address>
    Stefan Masar, {anschrift}, {e(ort)}<br>
    E-Mail: <a href="mailto:kontakt@profmasar.at">kontakt@profmasar.at</a>
  </address>
  <p>Einen Datenschutzbeauftragten habe ich nicht bestellt, weil dafür keine Pflicht nach Art. 37 DSGVO besteht.</p>
  <p><strong>Schule bzw. BMB sind verantwortlich, ich bin Auftragsverarbeiter,</strong> soweit Schülerinnen, Schüler oder Lehrkräfte die App im Unterricht nutzen und dabei Daten verarbeitet werden (Live-Klasse, Abschnitt 2.6). Verantwortlich ist dafür die Schule (Schulleitung) bzw. das Bundesministerium für Bildung (BMB), Minoritenplatz 5, 1010 Wien, als Auftraggeber laut Auftragsverarbeitungsvereinbarung (AVV) zum Marktplatz Lernapps. Ich verarbeite diese Daten nur nach deren Weisung, nur zu diesem Zweck und nur im Rahmen der AVV (Art. 28 DSGVO). Wenn du dazu Rechte ausüben willst, wende dich bitte an deine Schule. Schreibst du mir, leite ich deine Anfrage an die Verantwortlichen weiter.</p>

  <h2>2. Welche Daten verarbeite ich, wofür, auf welcher Grundlage und wie lange?</h2>

  <h3>2.1 Aufruf der Website und der App (Server-Protokolle)</h3>
  <ul>
    <li><strong>Daten:</strong> IP-Adresse, Datum und Uhrzeit, aufgerufene und zuvor besuchte Seite, Browser und Betriebssystem.</li>
    <li><strong>Zweck:</strong> sicherer und stabiler Betrieb.</li>
    <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb).</li>
    <li><strong>Dauer:</strong> {ds_luecke(d, "loeschfristen.serverprotokolle", "Löschfrist der Server-Protokolle beim Hoster")}. Ich werte die Protokolle nicht aus.</li>
    <li><strong>Verantwortlich:</strong> ich. Die Protokolle führt mein Hoster (Abschnitt 3).</li>
  </ul>

  <h3>2.2 Wenn du mir schreibst</h3>
  <ul>
    <li><strong>Daten:</strong> Name, E-Mail-Adresse, Schule, deine Nachricht.</li>
    <li><strong>Zweck:</strong> deine Anfrage beantworten (auch Support).</li>
    <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertrag oder vorvertragliche Maßnahme), sonst lit. f.</li>
    <li><strong>Dauer:</strong> bis die Anfrage erledigt ist; Support-Korrespondenz zu einer Lizenz bis {ds_luecke(d, "loeschfristen.support_lizenz", "Frist, Vorschlag: Ablauf der Lizenz plus 3 Jahre")}; danach nur, soweit eine gesetzliche Pflicht besteht.</li>
    <li><strong>Verantwortlich:</strong> ich.</li>
  </ul>

  <h3>2.3 Bestellung und Lizenz: Bestelldaten</h3>
  <ul>
    <li><strong>Daten:</strong> Schule (Name, Anschrift), Ansprechperson (Name, E-Mail-Adresse), Bestellnummer, Lizenzart und Anzahl, Rechnungsdaten und Zahlungsstatus. Bei einer Schullizenz über den Marktplatz Lernapps liefere ich der Schule den Schulschlüssel und den Admin-Code; einen Schlüssel für Schülerinnen und Schüler gibt es bei dieser Bestellung nicht (Näheres in 2.4). Auch bei einer Direktbestellung einer Schullizenz gibt es keinen Schüler-Schlüssel (Stand 28.11.2026).</li>
    <li><strong>Herkunft:</strong> von der Schule selbst oder über den Marktplatz Lernapps (OeAD im Auftrag des BMB). Dort bestellt die Schule; ich bekomme die für die Lieferung nötigen Daten übermittelt (Art. 14 DSGVO).</li>
    <li><strong>Zweck:</strong> Lizenz liefern, Rechnung stellen bzw. über den Marktplatz abrechnen, Support, Buchhaltung.</li>
    <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertrag mit der Schule), für Ansprechpersonen lit. f (berechtigtes Interesse an der Vertragsabwicklung), für Rechnungen und Buchhaltung lit. c (rechtliche Verpflichtung).</li>
    <li><strong>Dauer:</strong> Rechnungen, Belege, Buchhaltungsunterlagen und die übrigen Bestelldaten <strong>sieben Jahre</strong> ab Ende des Kalenderjahres, länger nur, solange sie für ein anhängiges Abgabenverfahren von Bedeutung sind (§ 132 Abs. 1 BAO). Unbestätigte Bestellungen über den Direktkanal lösche ich nach <strong>7 Tagen</strong>.</li>
    <li><strong>Verantwortlich:</strong> ich. Die Namen und E-Mail-Adressen der Schülerinnen, Schüler und Lehrpersonen aus der Bestell-Liste des Marktplatzes verwende ich nur, um die Lizenzinformationen zuzustellen (dafür bin ich Auftragsverarbeiter, Abschnitt 1) und speichere sie nicht länger als dafür nötig.</li>
    <li>Zahlungen: Bei Marktplatz-Bestellungen rechnet der Marktplatz ab.{(" " + e(wert(d.get("zahlungsweg")))) if wert(d.get("zahlungsweg")) else ""}</li>
  </ul>

  <h3>2.4 Lizenzprüfung: Schlüssel, Klassencode, Lehrkraft-Zugang und Geräte-Hash</h3>
  <ul>
    <li><strong>Daten:</strong> Der Lizenzschlüssel und der Klassencode werden auf dem Server nur als nicht umkehrbarer Hash gespeichert (zusätzlich die letzten vier Zeichen zum Wiedererkennen). Dazu eine Notiz zur Lizenz (z. B. Schule und Klasse, keine Schülernamen), Gültigkeit, Rolle (Lehrkraft, Schüler oder Schule) und die Platzzahl. Eine Lehrkraft-Lizenz kann mehrere Klassen haben. Jede Klasse hat einen Namen (z. B. „2AK“, keine Schülernamen), eine Platzzahl (bei einer Lehrkraft-Lizenz standardmäßig 30 Schülergeräte) und einen Klassencode. Die Lehrkraft gibt den Klassencode an die Schülerinnen und Schüler weiter. Dein Gerät erzeugt beim ersten Einlösen eine <strong>zufällige Kennung</strong> (keine Hardware-ID). Der Server speichert davon nur einen Hash, das Datum der Freischaltung und das Datum der letzten Online-Prüfung (ohne Uhrzeit) sowie – wenn du über einen Klassencode kommst – die Zuordnung zur Klasse. Die App erhält ein signiertes Token, das höchstens 28 Tage gilt und im Browser liegt.</li>
    <li><strong>Schullizenz:</strong> Die Schule erhält einen <strong>Schulschlüssel</strong> und einen <strong>Admin-Code</strong>. Bei einer Schullizenz über den Marktplatz Lernapps gibt es <strong>keinen Schlüssel für Schülerinnen und Schüler</strong>; sie kommen nur über den Klassencode ihrer Lehrkraft. Auch bei einer Direktbestellung einer Schullizenz gibt es keinen Schüler-Schlüssel (Stand 28.11.2026). Der Admin-Code wird am Server nur als nicht umkehrbarer Hash gespeichert, dazu die letzten vier Zeichen zum Wiedererkennen.
      <p>Jede Lehrkraft legt mit dem Schulschlüssel einen eigenen <strong>Zugang</strong> an. Am Server speichere ich dazu: eine laufende Nummer, den Hash des persönlichen Codes (plus die letzten vier Zeichen), den Status (aktiv oder gesperrt) und das Erstelldatum (ohne Uhrzeit). <strong>Kein Name, keine E-Mail-Adresse.</strong> Den persönlichen Code zeige ich der Lehrkraft nur einmal (oder erneut, wenn sie ihn erneuert); am Server liegt nur der Hash. Je Zugang sind höchstens <strong>drei Geräte</strong> zugleich aktiv (gezählt wird ein Gerät, das sich in den letzten 28 Tagen online gemeldet hat). Jede Lehrkraft sieht nur ihre eigenen Klassen. Die Plätze der Schule sind ein <strong>gemeinsamer Topf</strong>. Die Schule kann selbst festhalten, welche Lehrkraft welche Zugangsnummer hat; ich speichere diese Zuordnung nicht.</p>
      <p>Die <strong>Schul-Übersicht</strong> (öffnet man mit dem Admin-Code) zeigt je Zugang die laufende Nummer, die letzten vier Zeichen des persönlichen Codes, den Status, die Zahl der Klassen, die belegten Schülerplätze und die Zahl der Lehrkraft-Geräte. Sie zeigt <strong>keine Namen, keine Klassennamen und keine Klassencodes</strong>. Die Administration kann einen Zugang sperren oder freigeben, die Schülerplätze eines Zugangs sofort freigeben (die Geräte-Hashes der Schülergeräte in diesen Klassen werden sofort gelöscht) und die Geräte der Lehrkraft abmelden (die Geräte-Hashes der Lehrkraft-Geräte werden sofort gelöscht).</p>
      <p><strong>Schuljahreswechsel:</strong> Gibt die Schule innerhalb von <strong>30 Tagen nach dem Ende der vorigen Lizenz</strong> den Admin-Code der vorigen Lizenz ein, kopiere ich auf ihren Wunsch die Zugänge (denselben Hash des persönlichen Codes, Nummer und Status) und die Klassen (Name und freigegebene Themen) in die neue Lizenz. Nicht übernommen werden Schülergeräte und Klassencodes; einen neuen Klassencode legt die Lehrkraft in der neuen Lizenz an. Rechtsgrundlage dafür ist Art. 6 Abs. 1 lit. b DSGVO (Lizenzvertrag, auf Wunsch der Schule). Es entsteht keine neue Datenkategorie.</p>
      <p><strong>Live-Stunde im Beamer:</strong> Wählt die Lehrkraft eine ihrer Klassen, speichere ich den 6-stelligen Live-Code der Stunde <strong>im Klartext</strong> an dieser Klasse, zusammen mit einem Ablaufzeitpunkt von höchstens <strong>6 Stunden</strong>. Nur die Geräte dieser Klasse erhalten den Code bei der nächsten Online-Prüfung. Derselbe Code wird nicht zugleich an eine zweite Klasse derselben Lizenz gebunden. Der Live-Server erfährt nichts von der Klassenbindung (siehe 2.6). Beendet die Lehrkraft die Stunde, lösche ich Code und Ablaufzeitpunkt sofort. Läuft die Frist von 6 Stunden ab, ohne dass die Stunde beendet wird, gebe ich den Code nicht mehr an Schülergeräte weiter und lösche ihn bei der nächsten Löschroutine des Lizenzservers (stündlich bzw. bei der nächsten Anfrage danach).</p>
    </li>
    <li><strong>Zweck:</strong> prüfen, ob eine Lizenz gültig ist und ob freie Plätze da sind; Missbrauch verhindern; bei einer Schullizenz die Zugänge der Lehrkräfte und die Schul-Übersicht führen sowie auf Wunsch der Schule den Wechsel ins neue Schuljahr vorbereiten. Die Lizenz funktioniert dadurch auch offline.</li>
    <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Lizenzvertrag), ergänzend lit. f (Schutz vor Missbrauch).</li>
    <li><strong>Dauer:</strong> Geräte-Hashes, Klassencode-Hashes und <strong>Lehrkraft-Zugänge</strong> (Hash des persönlichen Codes, Nummer, Status, Zuordnung der Lehrkraft-Geräte) lösche ich <strong>30 Tage nach dem Lizenzende</strong> (in der Regel 31. August). Der Geräte-Hash wird außerdem sofort gelöscht, wenn du das Gerät mit „Abmelden“ bzw. „Klasse verlassen“ abmeldest, wenn die Lehrkraft mit „Plätze freigeben“ alle Plätze einer Klasse auf einmal freigibt oder wenn die Administration der Schule die Plätze eines Zugangs freigibt bzw. die Geräte der Lehrkraft abmeldet. Testschlüssel (BT-TEST-…) gelten höchstens 30 Tage und werden <strong>30 Tage nach ihrem Ende vollständig gelöscht</strong>. Der Lizenz-Datensatz selbst (ohne Geräte-Hashes und ohne Lehrkraft-Zugänge) bleibt als Bestellunterlage nach 2.3; der Hash des Admin-Codes bleibt bei diesem Datensatz. Die Zählsummen stehen in Abschnitt 2.5 und werden später gelöscht, nicht zusammen mit den Geräte-Hashes.</li>
    <li><strong>Kurzzeitiger Zähler gegen Missbrauch:</strong> Zu viele Anfragen in kurzer Zeit werden begrenzt, auch beim Anlegen eines Lehrkraft-Zugangs und bei fehlgeschlagenen Versuchen mit dem Admin-Code. Dafür nutze ich deine IP-Adresse nur kurz (höchstens <strong>15 Minuten</strong>) und nur als Hash (HMAC über Bereich, IP und 15-Minuten-Fenster); sie wird nicht im Klartext gespeichert. Die Zeile wird nach 15 Minuten gelöscht.</li>
    <li><strong>Hinweis:</strong> Die zufällige Kennung, der Geräte-Hash, der Klassencode, der persönliche Lehrkraft-Code und der Admin-Code sind Online-Kennungen und können sich auf eine Person beziehen (beim persönlichen Code und beim Admin-Code typischerweise auf eine Lehrkraft, wenn die Schule die Nummer selbst zuordnet). Ich behandle sie deshalb wie personenbezogene Daten.</li>
    <li><strong>Verantwortlich:</strong> ich.</li>
  </ul>

  <h3>2.5 Zählung für Berichte an den Marktplatz Lernapps</h3>
  <ul>
    <li><strong>Was gezählt wird:</strong>
      <ul>
        <li>wie viele Geräte je Lizenz bzw. je Klasse aktiviert wurden (nur die Summe je Code, keine Gerätekennung);</li>
        <li>wie oft die App pro Tag aufgerufen wird (eine Tagessumme, getrennt nur nach Testbetrieb ja/nein). Beim Zählen eines Aufrufs werden kein Token, keine Gerätekennung, kein Code und keine IP-Adresse gespeichert, auch nicht als Hash.</li>
      </ul></li>
    <li><strong>Was nicht in den Zähldaten steht:</strong> keine IP-Adresse, keine Cookies, keine Gerätekennung, keine Namen. Allgemeine Server-Protokolle des Hosters beim Aufruf des Zähl-Endpunkts: Abschnitt 2.1.</li>
    <li><strong>Zweck:</strong> Nutzungszahlen an den Marktplatz Lernapps melden (vertragliche Berichtspflicht: Anzahl der Lizenzen, der Konten bzw. aktivierten Geräte und der Zugriffe).</li>
    <li><strong>Rechtsgrundlage und Einordnung:</strong> Die Tagessummen ohne Kennung sind anonym und keine personenbezogenen Daten. Die Summen je Code enthalten Schulnamen, Klassennamen und die letzten vier Zeichen des Codes; das sind typischerweise keine Daten natürlicher Personen. Ich behandle die Verwaltungsdatei vertraulich. Soweit ausnahmsweise personenbezogene Daten betroffen wären, ist die Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Erfüllung der Berichtspflicht) bzw. lit. b.</li>
    <li><strong>Dauer:</strong> Summen je Code <strong>365 Tage nach dem Lizenzende</strong>. Tagessummen ohne Kennung: <strong>laufendes und voriges Schuljahr</strong> (jeweils 1. September bis 31. August); ältere Tagessummen werden gelöscht. Diese Fristen bleiben im Rahmen der Speicherbegrenzung (Art. 5 Abs. 1 lit. e DSGVO), weil sie an die Vertragslaufzeit und die Berichtspflicht gebunden sind.</li>
    <li><strong>CSV und Empfänger:</strong> In der Verwaltung kann ich zwei CSV-Dateien herunterladen (aktivierte Geräte je Code; Aufrufe pro Tag). Eine automatische Übermittlung gibt es nicht. Dem Marktplatz Lernapps (OeAD im Auftrag des BMB) übermittle ich nur die vertraglich geforderten Summen, nicht die Verwaltungs-CSV mit Schulnamen und Code-Kurzzeichen.</li>
  </ul>

  <h3>2.6 Live-Klasse (Auftragsverarbeitung für die Schule)</h3>
  <ul>
    <li><strong>Daten Schülerinnen/Schüler:</strong> Klassencode, frei gewählter <strong>Spitzname</strong> (1–20 Zeichen, bitte kein Echtname), zufälliger Teilnahme-Schlüssel (am Server nur als Hash), Aufgaben-ID, Lösungsschritt, Fehlerart und kurzer Hinweis zum Fehler (z. B. „5000 statt 5010“), geschafft ja/nein, Zeitpunkt. <strong>Keine</strong> E-Mail-Adresse, kein Konto, keine IP-Speicherung, keine Geräte-ID, kein Browser-Kennzeichen. Im Browser der Schülerin oder des Schülers liegen für die laufende Live-Klasse der 6-stellige Sitzungscode, der Spitzname und der Teilnahme-Schlüssel (Abschnitt 2.9).</li>
    <li><strong>Daten Lehrkraft:</strong> Klassencode und Lehrkraft-Schlüssel (am Server nur als Hash).</li>
    <li><strong>Zweck:</strong> Die Lehrkraft gibt Aufgaben vor und sieht, wer sie geschafft hat und wo Fehler passieren, um sie im Unterricht zu besprechen. Wählt die Lehrkraft im Beamer eine ihrer Klassen, gibt der Lizenzserver den Live-Code nur an die Geräte dieser Klasse weiter. Der Live-Server erfährt nichts von der Klasse (siehe 2.4).</li>
    <li><strong>Verantwortlich:</strong> die Schule bzw. das BMB; ich bin Auftragsverarbeiter (Abschnitt 1). Rechtsgrundlage und Information der Betroffenen liegen bei der Schule; ich verarbeite die Daten nur nach Weisung.</li>
    <li><strong>Dauer:</strong> Die Sitzung wird <strong>30 Tage nach dem Anlegen</strong> automatisch gelöscht, die Lehrkraft kann sie früher beenden oder sofort löschen.</li>
  </ul>
{login}
  <h3>2.8 Anonymes Feedback zu Einheiten</h3>
  <ul>
    <li><strong>Daten:</strong> Stunde (auf die volle Stunde gekürzt), Auswahlfelder und zwei kurze Freitexte. Keine IP, kein Gerät, kein Browser-Kennzeichen.</li>
    <li><strong>Zweck:</strong> Unterricht und App verbessern.</li>
    <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO. <strong>Bitte schreib in die Freitexte keine Namen.</strong></li>
    <li><strong>Dauer:</strong> <strong>365 Tage</strong>. Die Einträge enthalten typischerweise keine Kennung; steht trotzdem ein Name im Freitext, behandle ich den Eintrag als personenbezogen und lösche ihn auf Anfrage früher.</li>
    <li><strong>Verantwortlich:</strong> ich.</li>
  </ul>

  <h3>2.9 Speicherung im Browser (Local Storage)</h3>
  <p>Die App speichert auf deinem Gerät, in deinem Browser (Local Storage), nur was für die Nutzung nötig ist:</p>
  <ul>
    <li>deinen <strong>Lernstand</strong> und die <strong>Themenauswahl</strong>, dazu deine <strong>Punkte und Sterne je Einheit</strong>;</li>
    <li>das <strong>Lizenz-Token</strong> und die zufällige <strong>Gerätekennung</strong>, dazu die technischen Werte für die Offline-Prüfung (letzter Check, Uhrzeit, Abweichung der Geräteuhr) und bei einer Demo die lokal gezählten Belege;</li>
    <li>die <strong>Klasse ohne Klassencode</strong> (Name und freigegebene Themen; der Klassencode selbst wird im Browser der Schülerinnen und Schüler nicht gespeichert);</li>
    <li>die Einstellungen zur <strong>Barrierefreiheit</strong> (Schalter und einzelne Teile, Schlüssel <code>bt-barrierefreiheit</code>);</li>
    <li>in der Lehrkraftversion außerdem die lokal geführten Klassen, die letzten Stunden und – wenn genutzt – die Anmeldeinformationen des Lehrer-Kontos;</li>
    <li>auf der <strong>Lizenzseite der Lehrkraft</strong> die Gerätekennung, das Lizenz-Token und die <strong>Klassencodes im Klartext</strong>, damit die Lehrkraft sie an die Klasse weitergeben kann (am Server liegt nur ein Hash des Klassencodes, siehe 2.4); den <strong>persönlichen Code</strong> speichert diese Seite nicht (er wird nur einmal angezeigt, oder erneut nach dem Erneuern, und bleibt bis zum Bestätigen höchstens im Arbeitsspeicher); bitte das Gerät daher nicht mit anderen teilen bzw. die Website-Daten nach der Nutzung an einem fremden Gerät löschen;</li>
    <li>am <strong>Beamer</strong> (Lehrkraftversion) die Fenster-Verbindung zwischen Steuer- und Beamerfenster, die Zoom-Leiste und die Satzlage;</li>
    <li>in der <strong>Live-Klasse</strong> auf dem Schülergerät den 6-stelligen Sitzungscode, den Spitznamen, den Teilnahme-Schlüssel und den <strong>Stand der Stunde</strong> (aktuelle Aufgabe, Phase, Fortschritt);</li>
    <li>in der <strong>Schul-Übersicht</strong> den Admin-Code nur im Sitzungsspeicher des Browser-Tabs, bis du den Tab schließt oder „Schließen“ wählst.</li>
  </ul>
  <p>Nur bis zum Schließen des Browser-Tabs (Sitzungsspeicher, nicht Local Storage) speichert die Lehrkraftversion, dass dieses Fenster gerade die Live-Klasse leitet, und – wenn gewählt – welche Klasse zur Stunde gehört (Nummer und Name). Der Beamer liest für die Klassenwahl nur Token und Gerätekennung der Lizenzseite desselben Browsers. Die Demo ohne Klassencode speichert nichts zusätzlich: Gesperrt ist, solange kein gültiges Lizenz-Token im Browser liegt. Der Lernstand bleibt erhalten.</p>
  <p>Ein früherer Merker, ob Feedback schon gesendet wurde, wird nicht mehr gespeichert (ein alter Eintrag wird gelöscht). Das Tagesziel und Gewinnserien bleiben nur bis zum Schließen der Seite im Arbeitsspeicher, nicht im Local Storage.</p>
  <p>Diese Speicherung ist <strong>unbedingt erforderlich</strong>, damit die von dir ausdrücklich gewünschte App funktioniert (§ 165 Abs. 3 Telekommunikationsgesetz 2021). Deshalb brauche ich dafür keine Einwilligung und zeige kein Cookie-Banner. Es gibt keine Cookies für Werbung oder Statistik. Die Einstellungen zur Barrierefreiheit bleiben nur auf diesem Gerät und werden nicht übertragen. Diese Daten bleiben auf deinem Gerät, außer den in 2.4 und 2.6 beschriebenen Teilen, die an den Server gehen. Du löschst alles, indem du die Website-Daten in deinem Browser löschst. Auf der Lizenzseite gibt es dafür auch den Knopf „Lokale Daten löschen“. Er löscht nur die Daten in diesem Browser. Am Server bleibt der Geräte-Hash gespeichert (Löschfrist siehe 2.4). Bei Lizenzen mit fester Gerätezahl (Einzel- und Demolizenz) bleibt der Platz bis zum Ablauf der Lizenz belegt. Bei Lehrkraft-Lizenzen und bei Lehrkraft-Zugängen einer Schullizenz zählt ein Gerät nur, solange es sich in den letzten 28 Tagen online gemeldet hat. Ein nicht mehr genutztes Gerät gibt den Platz dort also nach spätestens 28 Tagen von selbst frei. Schülergeräte in einer Klasse geben ihren Platz nicht von selbst frei. Der Platz bleibt reserviert, bis du die Klasse mit „Klasse verlassen“ verlässt, die Lehrkraft alle Plätze der Klasse auf einmal freigibt oder der Geräte-Hash nach der Frist in 2.4 gelöscht wird. Wechselst du das Gerät, verlasse die Klasse am alten Gerät vorher mit „Klasse verlassen“. Willst du den Platz sofort freigeben und den Geräte-Hash am Server sofort löschen, melde das Gerät vorher mit „Abmelden“ ab. Danach musst du einen Lizenzcode erneut einlösen.</p>

  <h2>3. Hosting, Empfänger und Unterauftragsverarbeiter</h2>
  <p><strong>Ich gebe Daten nur weiter, wenn es für den Betrieb nötig ist.</strong> Mit meinen Dienstleistern bestehen Auftragsverarbeitungsverträge nach Art. 28 DSGVO.</p>

<!-- HOSTER-BLOCK A: Website, Lizenzserver, Live-Klasse, Postfach. Zum Tauschen nur die drei Felder in recht/angaben.json (hoster_a) ändern. -->
  <p><strong>Server, Website und Postfach:</strong> {e(ha.get("name") or "")}, {e(ha.get("sitz") or "")}, {e(ha.get("land") or "")}.</p>
  <p>Dort liegen die Website profmasar.at, der Lizenzserver, die Live-Klasse und mein E-Mail-Postfach. Rechenzentrum: {rz}.</p>
  <p>Unterauftragsverarbeiter des Hosters: {uav}.</p>
<!-- Ende HOSTER-BLOCK A -->

<!-- HOSTER-BLOCK B: Auslieferung der App-Dateien. Zum Tauschen nur die drei Felder in recht/angaben.json (hoster_b) ändern. -->
  <p><strong>Auslieferung der App-Dateien:</strong> {e(hb.get("name") or "")}.</p>
  <p>Dort liegen nur der statische Programmcode und die Seiten der App, keine Schüler-, Lehrer- oder Lizenzdaten. Die Daten aus 2.4 bis 2.8 gehen an den Server aus Block A.</p>
<!-- Ende HOSTER-BLOCK B -->
{drittland}
  <p><strong>Weitere Empfänger:</strong></p>
  <ul>
    <li>Marktplatz Lernapps (OeAD im Auftrag des BMB): Bestell- und Lieferstatus sowie die anonymen Summen aus 2.5.</li>
    {steuer_html}
    <li>Meine Bank: bei Überweisungen.</li>
    <li>{sprache_satz}</li>
  </ul>
  <p><strong>Unterauftragsverarbeiter (Liste):</strong> {e(ha.get("name") or "")} (Server, Postfach). Für Marktplatz-Daten bedarf jeder Unterauftragsverarbeiter der schriftlichen Zustimmung des BMB.</p>
  <p>Übermittlung in Drittländer erfolgt für Marktplatz-Daten nicht.</p>

  <h2>4. Deine Rechte</h2>
  <p>Du hast nach der DSGVO das Recht auf <strong>Auskunft</strong> (Art. 15), <strong>Berichtigung</strong> (Art. 16), <strong>Löschung</strong> (Art. 17), <strong>Einschränkung der Verarbeitung</strong> (Art. 18), <strong>Datenübertragbarkeit</strong> (Art. 20) und <strong>Widerspruch</strong> (Art. 21). Wo du eine Einwilligung erteilt hast, kannst du sie jederzeit widerrufen. Schreib mir dazu eine E-Mail an <a href="mailto:kontakt@profmasar.at">kontakt@profmasar.at</a>. Betrifft deine Anfrage Daten, für die die Schule bzw. das BMB verantwortlich ist (Abschnitt 1), leite ich sie dorthin weiter. Eine automatisierte Entscheidungsfindung einschließlich Profiling (Art. 22) findet nicht statt. Daten musst du nur angeben, soweit sie für eine Bestellung oder den Vertrag nötig sind; sonst kann ich die Lizenz nicht liefern.</p>

  <h2>5. Beschwerde</h2>
  <p>Meinst du, dass deine Daten nicht rechtmäßig verarbeitet werden, kannst du dich bei der Datenschutzbehörde beschweren (Art. 77 DSGVO, § 24 DSG): Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Wien, Telefon +43 1 52 152-0, <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a>, www.dsb.gv.at</p>

  <h2>6. Sicherheit</h2>
  <p>Die Verbindung zu Website und Servern ist verschlüsselt (HTTPS). Die App lädt keine Schriften, Skripte oder Inhalte von fremden Anbietern. Codes, Schlüssel und Kennungen liegen auf dem Server nur als Hash vor.</p>

  <h2>7. Änderungen</h2>
  <p>Ändert sich etwas an der Verarbeitung, passe ich diese Erklärung an. Es gilt die Fassung mit dem oben genannten Stand.</p>
</article>
"""


def produktbeschreibung_body(d: dict) -> str:
    """Produktbeschreibung (Demo und Schullizenz): Rechtstexte v6, Abschnitt 5a, Wortlaut unverändert."""
    return f"""{entwurf_banner(d)}<article class="doc">
  <h1>Produktbeschreibung: Demo und Schullizenz</h1>
  <p>Ohne Klassencode können Schülerinnen und Schüler die Demo nutzen: die Startlektion und die ersten vier Themen im Kern. Alle Themen gibt es mit dem Klassencode der Lehrkraft oder mit einem gültigen Lizenzschlüssel.</p>
  <p>Schullizenz: Jede Lehrkraft hat einen eigenen Zugang (ohne Namen und ohne E-Mail-Adresse am Server). Die Klassen einer Lehrkraft sind von den Klassen der anderen getrennt. Die Plätze der Schule sind ein gemeinsamer Topf. Die Administration öffnet mit einem Admin-Code die Schul-Übersicht (ohne Namen) und kann zum neuen Schuljahr Zugänge und Klassen übernehmen.</p>
</article>
"""


def schreibe_seiten(ziel: Path, d: dict, variante: str) -> None:
    ziel.mkdir(parents=True, exist_ok=True)
    d = dict(d)
    bf = wert(d.get("barrierefreiheit_url")) or ""
    if variante != "app" and not re.match(r"^https?://", bf):
        bf = ""   # relative Links gelten nur neben der App; für andere Hoster muss in angaben.json eine volle Adresse stehen
        d["barrierefreiheit_url"] = None
    imp = seitenrahmen("Impressum und Offenlegung", impressum_body(d), aktuelle="impressum", variante=variante, entwurf=bool(d.get("entwurf")), bf_url=bf)
    ds = seitenrahmen("Datenschutzerklärung", datenschutz_body(d), aktuelle="datenschutz", variante=variante, entwurf=bool(d.get("entwurf")), bf_url=bf)
    if variante == "app":
        pb = seitenrahmen("Produktbeschreibung", produktbeschreibung_body(d), aktuelle="produktbeschreibung", variante=variante, entwurf=bool(d.get("entwurf")), bf_url=bf)
        (ziel / "produktbeschreibung.html").write_text(pb, encoding="utf-8")
    (ziel / "impressum.html").write_text(imp, encoding="utf-8")
    (ziel / "datenschutz.html").write_text(ds, encoding="utf-8")


PHP_IMP = """<?php
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
readfile(__DIR__ . '/impressum.html');
"""
PHP_DS = """<?php
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
readfile(__DIR__ . '/datenschutz.html');
"""


def schreibe_paket(paket: Path, d: dict) -> None:
    paket.mkdir(parents=True, exist_ok=True)
    # gemeinsame Angaben-Datei, damit der Umzug nur ein Kopieren ist
    (paket / "angaben.json").write_text(ANGABEN_PFAD.read_text(encoding="utf-8"), encoding="utf-8")
    for name, variante in (("profmasar.at", "website"), ("lizenz.profmasar.at", "lizenz")):
        ordner = paket / name
        schreibe_seiten(ordner, d, variante)
        (ordner / "impressum.php").write_text(PHP_IMP, encoding="utf-8")
        (ordner / "datenschutz.php").write_text(PHP_DS, encoding="utf-8")
    fehl = fehlende_pflicht(d)
    fehl_txt = "\n".join(f"- {x}" for x in fehl) or "- (Pflichtangaben sind eingetragen)"
    readme = f"""# Rechtstexte-Paket (28.11.2026, Europe/Vienna)

**Nicht hochladen**, solange dies ein Entwurf ist und Pflichtangaben fehlen.

Dieses Paket enthält dasselbe Impressum und dieselbe Datenschutzerklärung für:

- `profmasar.at/impressum.html` und `datenschutz.html`
- `lizenz.profmasar.at/impressum.html` und `datenschutz.html`
- zusätzlich `impressum.php` und `datenschutz.php` (geben dieselben Seiten aus, weil der alte Pfad `/impressum.php` derzeit 404 liefert)

Die Zeile „Alle Materialien sind kostenlos.“ ist entfernt. Der BMB-/OeAD-Hinweis ist **nicht** enthalten (erst nach der Listung, Wortlaut vorher dem OeAD vorlegen). Abschnitt 2.7 (Lehrer-Login) ist ausgeblendet, solange `lehrer_login_aktiv` in `angaben.json` falsch ist.

## Vor dem Hochladen

1. Stefan füllt die Pflichtfelder in `angaben.json` (oder in `buchungstrainer-vorschau/recht/angaben.json`).
2. `python3 recht/bauen.py --paket <dieser-Ordner>` neu ausführen.
3. `entwurf` auf `false` setzen und noch einmal bauen, damit die gelben Markierungen und der Entwurfsbanner verschwinden.
4. Erst dann die HTML-/PHP-Dateien auf den jeweiligen Host legen. Nichts in diesem Ordner ist schon veröffentlicht.

## Noch offene Pflichtangaben

{fehl_txt}

Weitere offene Felder der Datenschutzerklärung (Löschfristen, Rechenzentrum, Sprachdienst) stehen in der Entwurfsseite gelb markiert.

## Hosting-Blöcke

Block A (World4You) und Block B (GitHub Pages) sind in der Datenschutzerklärung als austauschbare HTML-Kommentare gekennzeichnet. Der Drittland-Absatz zu GitHub steht zwischen HTML-Kommentaren und wird nach dem Umzug auf einen EU-Hoster gelöscht.
"""
    (paket / "LIESMICH.md").write_text(readme, encoding="utf-8")


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--paket", type=Path, default=None)
    p.add_argument("--angaben", type=Path, default=ANGABEN_PFAD)
    args = p.parse_args()
    d = json.loads(args.angaben.read_text(encoding="utf-8"))
    schreibe_seiten(ROOT, d, "app")
    if args.paket:
        schreibe_paket(args.paket, d)
    print("geschrieben:", ROOT / "impressum.html", ROOT / "datenschutz.html")
    if args.paket:
        print("paket:", args.paket)
    print("pflicht fehlt:", ", ".join(fehlende_pflicht(d)) or "keine")
    return 0


if __name__ == "__main__":
    sys.exit(main())
