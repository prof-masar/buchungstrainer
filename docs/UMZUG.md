# Umzug auf einen anderen Hoster (z. B. EU-Hoster statt GitHub Pages)

Die App braucht **kein GitHub**: alles sind statische Dateien mit relativen Pfaden. Server-Adressen stehen nur in **`konfig.js`**.

## 1. App (statische Dateien)
1. Den ganzen Ordner kopieren (index.html, beamer.html, lehrkraft.html, alle .js-Dateien, inhalte*.json, docs/, videos/).
   Der Unterordner ist egal (z. B. `https://neuer-hoster.at/buchungstrainer/`).
2. **`konfig.js`** öffnen und nur dort ändern:
   - `lizenzServer`: Adresse des Lizenzservers (Ordner mit `api/activate.php`).
   - `lizenzSchluessel`: öffentlicher Schlüssel aus der Verwaltung (bleibt gleich, wenn der Server mitzieht).
   - `liveServer`: Ordner der Live-Klasse und des Feedbacks.
   - `impressum`, `datenschutz`, `barrierefreiheit`, `support`: Ziele von Menü oben und Fuß (von `bf.js` gelesen). Standard: die Seiten neben der App (`impressum.html`, `datenschutz.html`, `barrierefreiheit.html`).
   - `testmodus: false` für den echten Betrieb (true = alles nur im Browser nachgestellt, nur BT-TEST-Schlüssel).
3. Cache-Buster (`?v=…`) in index.html, beamer.html und lehrkraft.html gemeinsam hochzählen.

## 2. Lizenzserver (PHP 8 + MariaDB/MySQL)
1. Dateien wie im Upload-Paket in den Webspace legen, `config.php` mitnehmen (enthält die geheimen Schlüssel – **nicht** neu erzeugen, sonst sind alle Tokens und Schlüssel-Hashes ungültig).
2. Datenbank exportieren und beim neuen Hoster importieren (alle Tabellen `lz_*`). Zugangsdaten in `config.php` → `db` anpassen.
3. In `config.php`:
   - `cors_origins`: die neue Adresse der App (nur Schema + Host, z. B. `https://neuer-hoster.at`).
   - `impressum_url`, `datenschutz_url`: Adresse der neuen Rechtstexte (z. B. die Seiten der App am neuen Ort). `/lizenz/impressum.php` leitet dorthin.
4. Stündliche Löschroutine läuft von selbst bei Anfragen; zusätzlich kann ein Cronjob `php tools/aufraeumen.php` aufrufen.

## 3. Prüfen
- `…/api/info.php` liefert `{"ok":true,…}`.
- Lizenzseite `lehrkraft.html`: mit einem BT-TEST-Schlüssel anmelden, Klasse anlegen, Code in der App eingeben → „1 von 30“.
- Im Browser (Entwicklerwerkzeuge → Netzwerk): keine Anfragen an andere Server als App und Lizenz-/Live-Server.

## 4. Danach
- Datenschutzerklärung: GitHub-Pages-Absatz (Drittland) entfernen, neuen Hoster eintragen.
- Alte Adresse ggf. auf die neue weiterleiten.

## 5. Rechtstexte
`recht/angaben.json` ist die einzige Quelle für Impressum, Datenschutzerklärung und die Anschrift in der Barrierefreiheitserklärung. Nach Änderungen `python3 recht/bauen.py` laufen lassen. Beim Umzug `hoster_b` tauschen und `drittland_absatz_zeigen` auf `false` setzen.
