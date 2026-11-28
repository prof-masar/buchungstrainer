/* =====================================================================
   KONFIGURATION – die EINZIGE Stelle mit Server-Adressen.
   Wird von index.html, beamer.html und lehrkraft.html eingebunden (relativer Pfad).
   Umzug auf einen anderen Hoster: nur diese Datei anpassen (siehe docs/UMZUG.md).
   ===================================================================== */
window.BT_KONFIG = {
  // Lizenzserver (Ordner mit api/activate.php, api/klasse.php, api/lehrer.php …)
  lizenzServer: "https://profmasar.at/lizenz",
  // Öffentlicher Ed25519-Schlüssel des Lizenzservers (Verwaltung → „Öffentlicher Schlüssel“). Nur zum Prüfen, nicht geheim.
  lizenzSchluessel: "hPIe9Y7wg5qx37fb3G+RdsA+BcdGa4Sx/+KOrFzhvjU=",
  // Live-Klasse und anonymes Feedback (Ordner mit sitzung.php, fall.php, versuch.php, feedback.php, konto.php)
  liveServer: "https://profmasar.at/live",
  // Seiten und Kontakt (Menü oben und Fuß in index.html, beamer.html, lehrkraft.html; gelesen von bf.js).
  // Relative Adressen = Seiten neben der App. Beim Umzug nur hier ändern.
  impressum: "impressum.html",
  datenschutz: "datenschutz.html",
  produktbeschreibung: "produktbeschreibung.html",
  barrierefreiheit: "barrierefreiheit.html",
  support: "kontakt@profmasar.at",
  // Testmodus: true = KEIN Server. Lizenzen, Klassen und Plätze werden in diesem Browser nachgestellt (lizenz-test.js),
  // gut sichtbar beschriftet, nur mit Testschlüsseln BT-TEST-…. Für den echten Betrieb: false.
  testmodus: false
};
