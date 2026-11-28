# Rechtstexte der Vorschau

Impressum und Datenschutzerklärung werden aus `angaben.json` gebaut. Pflichtfelder (Anschrift, Rechtsform, Gewerbe, Unternehmensgegenstand, UID bzw. Kleinunternehmer, Telefon) werden nicht erfunden.

## Bauen

```bash
python3 recht/bauen.py
python3 recht/bauen.py --paket /workspace/startup_profmasar/rechtstexte_paket_2026-11-28
```

Danach liegt `impressum.html` und `datenschutz.html` im Wurzelverzeichnis der App. Solange `"entwurf": true` ist, trägt die Seite einen sichtbaren Entwurfsbanner und markiert fehlende Felder gelb.

## Nach Stefans Angaben

1. Felder in `angaben.json` ausfüllen.
2. Wenn das Lehrer-Login live ist: `"lehrer_login_aktiv": true` (blendet Abschnitt 2.7 ein).
3. Nach dem Umzug auf einen EU-Hoster: `hoster_b` tauschen und `"drittland_absatz_zeigen": false`.
4. Erst wenn alle Pflichtfelder stehen und Stefan freigibt: `"entwurf": false`, neu bauen.
5. Den BMB-Hinweis nicht einbauen, bevor die App gelistet ist.

`app_einbauen.py` war nur für den einmaligen Einbau gedacht und wird nicht mehr gebraucht: Menü und Fuß baut `bf.js` aus `konfig.js`, der KI-Hinweis kommt aus `kiStimmeHtml()` in `index.html`/`beamer.html`. `angaben.json` gibt es nur hier (`recht/angaben.json`); die Barrierefreiheitserklärung liest sie ebenfalls.

Stand der Datenschutzerklärung: Fassung v3 (an den Code angeglichen). Abschnitt 2.7 erscheint nur bei `lehrer_login_aktiv`. Optionale Angaben (Steuerberatung, Sprachdienst, Zahlungsweg) entfallen, wenn sie leer sind.
