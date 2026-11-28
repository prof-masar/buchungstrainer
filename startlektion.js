/* startlektion.js – Quick-Start-Kachel qs-00 „So funktioniert Buchen“
   Fünf einfache Übungen (Auswahl/Zuordnen, keine Betragszeilen) vor dem ersten Einkauf:
   1 Beleg erkennen · 2 Wer ist „wir“? · 3 Kontonummer und Name · 4 Kontenklasse · 5 Soll oder Haben?
   Alle Varianten entstehen deterministisch aus Übung und Seed (ID „Q0-<Übung>-<Seed>“), nur mit fiktiven Firmen und
   Konten aus dem Kontenplan Buchungstrainer. Keine Lizenz-, Motivations- oder Klassen-Live-Anbindung:
   die Startlektion zählt nicht zu Rang, Tagesziel und Demo-Kontingent. */
(function (g) {
  "use strict";

  /* ---------- Stammdaten (nur Kontenplan Buchungstrainer v3 und Firmen aus dem Partnerpool) ---------- */
  const WIR = "Ohmreich Elektrofachhandel GmbH, Elektronikhandel";
  const WIR_KURZ = "Ohmreich";
  const WIR_GIPFEL = "Gipfelgriff Sport e.U., Outdoor-Sporthandel";
  const KLASSEN = {
    0: "Anlagevermögen", 1: "Vorräte", 2: "Forderungen und liquide Mittel", 3: "Verbindlichkeiten",
    4: "Betriebliche Erträge", 5: "Materialaufwand und Wareneinsatz", 7: "Abschreibungen und sonstige betriebliche Aufwendungen",
    8: "Finanzerträge und Finanzaufwendungen", 9: "Kapital und Abschlusskonten"
  };
  /* Nummer → Name (wie im Kontenplan) und Klasse */
  const KONTEN = {
    "0630": "Pkw und Kombis", "0640": "Lkw", "1390": "Vorrat Büromaterial",
    "2500": "Vorsteuer", "2700": "Kassa", "2800": "Bank (Guthaben bei Kreditinstituten)",
    "20010": "Kammfeder Fitness e.U.", "20020": "Atemweide Yoga & Pilates e.U.", "20030": "Innquell Möbelmanufaktur GmbH",
    "33010": "Nadelstrom Elektronik Großhandel GmbH", "33020": "Schallkern Audio GmbH",
    "3500": "Umsatzsteuer", "4000": "Handelswarenerlöse 20 %", "5000": "Handelswareneinsatz 20 %",
    "7790": "Spesen des Geldverkehrs", "8050": "Zinsenerträge aus Bankguthaben", "8310": "Zinsenaufwand für Bankkredite",
    "9600": "Privat"
  };
  const klasseVon = nr => +String(nr).charAt(0);
  const LIEF = [
    { nr: "33010", name: "Nadelstrom Elektronik Großhandel GmbH", waren: ["Kopfhörer", "Powerbanks", "Tablets", "Smartwatches"] },
    { nr: "33020", name: "Schallkern Audio GmbH", waren: ["Kabellose Lautsprecher", "Soundbars"] }
  ];
  const KUNDEN = [
    { nr: "20010", name: "Kammfeder Fitness e.U.", waren: ["Kopfhörer", "Smartwatches"] },
    { nr: "20020", name: "Atemweide Yoga & Pilates e.U.", waren: ["Kabellose Lautsprecher", "Soundbars"] },
    { nr: "20030", name: "Innquell Möbelmanufaktur GmbH", waren: ["Tablets", "Monitore"] }
  ];
  const UEBUNGEN = [
    null,
    { nr: 1, titel: "Beleg erkennen" },
    { nr: 2, titel: "Wer ist „wir“?" },
    { nr: 3, titel: "Kontonummer und Name" },
    { nr: 4, titel: "Kontenklasse" },
    { nr: 5, titel: "Soll oder Haben?" }
  ];

  /* ---------- Zufall und Hilfen ---------- */
  function rng(seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const wahl = (r, arr) => arr[Math.floor(r() * arr.length)];
  function mischen(r, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  const eur = n => {
    const s = Math.abs(n).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (n < 0 ? "−" : "") + s + "\u00a0€";
  };
  const tag = (r, monat) => String(1 + Math.floor(r() * 27)).padStart(2, "0") + "." + monat + ".2026";
  const nrKurz = (r, p) => p + " 2026-" + String(100 + Math.floor(r() * 899));
  const konto = nr => nr + " " + KONTEN[nr];

  /* ---------- Übung 1: Beleg erkennen ---------- */
  const OPT1 = [
    { k: "rechnung", t: "Rechnung" },
    { k: "kassa", t: "Kassabeleg (bar bezahlt)" },
    { k: "auszug", t: "Kontoauszug" },
    { k: "kein", t: "Kein Beleg zum Buchen" }
  ];
  const ERK1 = {
    rechnung: "Eine Rechnung belegt einen Kauf oder Verkauf auf Ziel. Aus ihr wird eine Buchung: Ist sie von einem Lieferanten an uns, ist es für uns ein Einkauf; schreiben wir sie an einen Kunden, ein Verkauf.",
    kassa: "Bar bezahlt: Das Geld ist über die Kassa gegangen. Aus dem Kassabeleg buchen wir mit der Kassa (2700).",
    auszug: "Der Kontoauszug zeigt, was auf dem Bankkonto passiert ist. Aus ihm buchen wir Zahlungen über die Bank (2800).",
    kein: "Das ist kein Geschäftsfall: Es wurde noch nichts geliefert, bezahlt oder verrechnet. Werbung, Angebote, Preislisten und Einladungen werden nicht gebucht. Erst ein echter Beleg wird zur Buchung."
  };
  function rechnungKarte(r, richtung) {
    const hatGipfel = r() < 0.25;
    let kopf, an, ware, preis, menge;
    if (hatGipfel && richtung === "ein") {
      kopf = "Kammerstapel Großhandel GmbH"; an = WIR_GIPFEL.split(",")[0]; ware = "Verpackungskartons"; preis = wahl(r, [2, 2.5, 4]); menge = wahl(r, [40, 80, 120]);
    } else if (richtung === "ein") {
      const l = wahl(r, LIEF); kopf = l.name; an = WIR.split(",")[0]; ware = wahl(r, l.waren); preis = wahl(r, [30, 40, 50, 60, 80]); menge = wahl(r, [10, 20, 25, 30]);
    } else {
      const k = wahl(r, KUNDEN); kopf = WIR.split(",")[0]; an = k.name; ware = wahl(r, k.waren); preis = wahl(r, [50, 60, 80, 90]); menge = wahl(r, [2, 3, 5, 8]);
    }
    const netto = menge * preis, ust = Math.round(netto * 20) / 100, brutto = netto + ust;
    return {
      kopf, titel: "Rechnung", nr: nrKurz(r, "Nr."), datum: tag(r, "11"), an,
      zeilen: [[menge + " × " + ware + " à " + eur(preis), eur(netto)]],
      summen: [["Netto", eur(netto)], ["20 % USt", eur(ust)], ["Gesamtbetrag", eur(brutto)]],
      fuss: "Zahlbar innerhalb von 14 Tagen."
    };
  }
  function kassaKarte(r) {
    const tank = r() < 0.6;
    if (tank) {
      const stufen = [[37.5, 60], [45, 72], [52.5, 84], [60, 96], [75, 120]];
      const s = wahl(r, stufen);
      return { kopf: "Tankhain Tankstellen GmbH", titel: "Kassabon", nr: "Bon " + (1000 + Math.floor(r() * 8999)), datum: tag(r, "11"),
        zeilen: [["Diesel " + String(s[0]).replace(".", ",") + " l à 1,60\u00a0€", eur(s[1])]],
        summen: [["Summe inkl. 20 % USt", eur(s[1])]], fuss: "Bar bezahlt · Registrierkasse mit QR-Code" };
    }
    const s = wahl(r, [[2, 24], [3, 36], [4, 48], [5, 60]]);
    return { kopf: "Raschfracht Zustelldienst GmbH", titel: "Kassabon", nr: "Bon " + (1000 + Math.floor(r() * 8999)), datum: tag(r, "11"),
      zeilen: [[s[0] + " Pakete zugestellt à 12,00\u00a0€", eur(s[1])]],
      summen: [["Summe inkl. 20 % USt", eur(s[1])]], fuss: "Bar bezahlt · Registrierkasse mit QR-Code" };
  }
  function auszugKarte(r) {
    const k = wahl(r, KUNDEN), l = wahl(r, LIEF);
    const a1 = wahl(r, [600, 1200, 1800, 2400]), a2 = wahl(r, [300, 900, 1500]);
    const alt = wahl(r, [5000, 8000, 12000]);
    return { kopf: "Saumland Bank AG", titel: "Kontoauszug", nr: "Auszug " + (10 + Math.floor(r() * 2)) + "/2026", datum: tag(r, "11"),
      an: WIR.split(",")[0],
      zeilen: [["Saldo alt", eur(alt)], ["Gutschrift " + k.name, "+" + eur(a1)], ["Überweisung an " + l.name, "−" + eur(a2)]],
      summen: [["Saldo neu", eur(alt + a1 - a2)]], fuss: "" };
  }
  function keinKarte(r) {
    const v = wahl(r, [0, 1, 2, 3]);
    if (v === 0) return { kopf: "Glutader Energiehandel GmbH", titel: "Herbst-Aktion: Heizöl jetzt vorbestellen!", nr: "", datum: "", an: "",
      zeilen: [["Heizöl-Vorbestellung bis 30.11.2026 – jetzt Preisvorteil sichern!", ""]], summen: [], fuss: "Aktionszeitraum 01.11. bis 30.11.2026" };
    if (v === 1) { const l = wahl(r, LIEF); return { kopf: l.name, titel: "Angebot", nr: nrKurz(r, "Nr."), datum: tag(r, "11"), an: WIR.split(",")[0],
      zeilen: [["Wir bieten an: 20 × " + l.waren[0] + " à " + eur(wahl(r, [40, 50, 60]))]], summen: [], fuss: "Unverbindlich, gültig bis 30.11.2026. Es wurde noch nichts bestellt." }; }
    if (v === 2) return { kopf: "Schallkern Audio GmbH", titel: "Preisliste Herbst 2026", nr: "", datum: "", an: "",
      zeilen: [["Soundbar 220,00 €  ·  Kabellose Lautsprecher 80,00 €  ·  Verstärker 450,00 €", ""]], summen: [], fuss: "Alle Preise netto, Änderungen vorbehalten." };
    return { kopf: "Autohaus Spurweite GmbH", titel: "Einladung zum Herbstfest", nr: "", datum: "", an: "",
      zeilen: [["Wir laden Sie herzlich zu unserem Herbstfest mit Probefahrten ein!", ""]], summen: [], fuss: "Samstag, 21.11.2026 ab 10 Uhr" };
  }
  function genBeleg(r) {
    const art = wahl(r, ["rechnung", "rechnung", "kassa", "auszug", "kein", "kein"]);
    let karte;
    if (art === "rechnung") karte = rechnungKarte(r, wahl(r, ["ein", "aus"]));
    else if (art === "kassa") karte = kassaKarte(r);
    else if (art === "auszug") karte = auszugKarte(r);
    else karte = keinKarte(r);
    const gipfel = karte.an && karte.an.indexOf("Gipfelgriff") === 0;
    return {
      ue: 1, wir: gipfel ? WIR_GIPFEL : WIR, art: "wahl",
      frage: "Dieser Beleg liegt auf deinem Tisch. Was ist das, und wird daraus gebucht?",
      beleg: karte, optionen: OPT1.map(o => ({ k: o.k, t: o.t })), richtig: art,
      tipp: "Schau auf Aussteller, Betrag und Zahlungsart. Gab es einen echten Geschäftsfall: eine Lieferung, eine Barzahlung oder eine Bewegung auf dem Bankkonto?",
      erklaerung: ERK1[art],
      sig: "1|" + art + "|" + karte.kopf + "|" + (karte.titel || "") + "|" + (karte.zeilen[0] || [""])[0]
    };
  }

  /* ---------- Übung 2: Wer ist „wir“? ---------- */
  function genWir(r) {
    const l = wahl(r, LIEF), k = wahl(r, KUNDEN);
    const t = wahl(r, ["lief", "kunde", "ein", "aus", "sicht"]);
    const mEin = wahl(r, [10, 20, 30]), mAus = wahl(r, [2, 3, 5, 8]);
    const wlief = wahl(r, l.waren), wkunde = wahl(r, k.waren);
    const wirName = WIR.split(",")[0];
    let frage, optionen, richtig, erk, sig;
    if (t === "lief") {
      frage = l.name + " liefert uns " + mEin + " × " + wlief + " und schickt uns die Rechnung. Wer ist in diesem Geschäft unser Lieferant?";
      optionen = mischen(r, [l.name, wirName, k.name]).map(x => ({ k: x, t: x })); richtig = l.name;
      erk = "Wir sind " + wirName + ". Unser Lieferant ist die Firma, bei der wir einkaufen: " + l.name + ".";
      sig = "2|lief|" + l.name + "|" + wlief;
    } else if (t === "kunde") {
      frage = "Wir liefern " + k.name + " " + mAus + " × " + wkunde + " und schreiben die Rechnung. Wer ist in diesem Geschäft unser Kunde?";
      optionen = mischen(r, [k.name, wirName, l.name]).map(x => ({ k: x, t: x })); richtig = k.name;
      erk = "Wir sind " + wirName + ". Unser Kunde ist die Firma, an die wir verkaufen: " + k.name + ".";
      sig = "2|kunde|" + k.name + "|" + wkunde;
    } else if (t === "ein") {
      frage = l.name + " schreibt eine Rechnung an uns, " + wirName + ". Was ist diese Rechnung aus unserer Sicht?";
      optionen = [{ k: "ein", t: "Eingangsrechnung (wir kaufen ein)" }, { k: "aus", t: "Ausgangsrechnung (wir verkaufen)" }]; richtig = "ein";
      erk = "Für " + l.name + " ist es eine Ausgangsrechnung, für uns eine Eingangsrechnung: Wir kaufen ein. Wir buchen immer aus unserer Sicht.";
      sig = "2|ein|" + l.name;
    } else if (t === "aus") {
      frage = "Wir, " + wirName + ", schreiben eine Rechnung an " + k.name + ". Was ist diese Rechnung aus unserer Sicht?";
      optionen = [{ k: "ein", t: "Eingangsrechnung (wir kaufen ein)" }, { k: "aus", t: "Ausgangsrechnung (wir verkaufen)" }]; richtig = "aus";
      erk = "Wir verkaufen an " + k.name + ", also ist es für uns eine Ausgangsrechnung. Für " + k.name + " wäre dieselbe Rechnung eine Eingangsrechnung.";
      sig = "2|aus|" + k.name;
    } else {
      const einkauf = r() < 0.5;
      if (einkauf) {
        frage = "Aus Sicht von " + l.name + " ist das ein Verkauf an uns. Was ist dasselbe Geschäft aus unserer Sicht, aus Sicht von " + wirName + "?";
        richtig = "einkauf"; sig = "2|sicht-e|" + l.name;
        erk = "Was für den einen ein Verkauf ist, ist für den anderen ein Einkauf. Wir kaufen bei " + l.name + " ein.";
      } else {
        frage = "Aus Sicht von " + k.name + " ist das ein Einkauf bei uns. Was ist dasselbe Geschäft aus unserer Sicht, aus Sicht von " + wirName + "?";
        richtig = "verkauf"; sig = "2|sicht-v|" + k.name;
        erk = "Was für den einen ein Einkauf ist, ist für den anderen ein Verkauf. Wir verkaufen an " + k.name + ".";
      }
      optionen = [{ k: "einkauf", t: "Einkauf" }, { k: "verkauf", t: "Verkauf" }];
    }
    return { ue: 2, wir: WIR, art: "wahl", frage, optionen, richtig,
      tipp: "Wir sind immer " + wirName + ". Kommt die Ware zu uns oder geht sie von uns weg?", erklaerung: erk, sig };
  }

  /* ---------- Übung 3: Kontonummer und Name ---------- */
  const POOL3 = ["2500", "2700", "2800", "3500", "4000", "5000", "9600", "0630", "0640", "1390", "8310", "7790", "8050", "33010", "33020", "20010", "20020", "20030"];
  function genNummerName(r) {
    let auswahl = [], versuche = 0;
    while (versuche++ < 50) {
      auswahl = mischen(r, POOL3).slice(0, 4);
      const l = auswahl.filter(n => n.length === 5 && n.charAt(0) === "3").length, k = auswahl.filter(n => n.length === 5 && n.charAt(0) === "2").length;
      if (l <= 1 && k <= 1) break;
    }
    auswahl.sort();
    const nachName = r() < 0.5;
    const rest = POOL3.filter(n => auswahl.indexOf(n) < 0 && !(n.length === 5 && auswahl.some(a => a.length === 5 && a.charAt(0) === n.charAt(0))));
    const extra = wahl(r, rest);
    const chipNrs = mischen(r, auswahl.concat([extra]));
    const zeilen = auswahl.map(n => nachName ? { key: n, label: KONTEN[n], richtig: n } : { key: n, label: n, richtig: n });
    const chips = chipNrs.map(n => nachName ? { k: n, t: n } : { k: n, t: KONTEN[n] });
    const lies = auswahl.map(n => n + " " + KONTEN[n]).join("; ");
    return { ue: 3, wir: WIR, art: "zuordnen", nachName,
      frage: nachName ? "Welche Kontonummer gehört zu welchem Kontonamen? Tippe zuerst eine Zeile, dann die passende Nummer."
                      : "Welcher Kontoname gehört zu welcher Kontonummer? Tippe zuerst eine Zeile, dann den passenden Namen.",
      zeilen, chips,
      tipp: "Die erste Ziffer ist die Kontenklasse: 2 = Forderungen und liquide Mittel, 3 = Verbindlichkeiten, 4 = Erträge, 5 = Wareneinsatz, 9 = Kapital. Ein Konto hat Nummer und Name.",
      erklaerung: "Richtig zugeordnet: " + lies + ". Im Buchungssatz schreiben wir immer Nummer und Name, so wie im Kontenplan.",
      sig: "3|" + (nachName ? "n" : "z") + "|" + auswahl.join(",") + "|" + extra };
  }

  /* ---------- Übung 4: Kontenklasse ---------- */
  const POOL4 = ["0630", "0640", "1390", "2500", "2700", "2800", "20010", "20020", "20030", "33010", "33020", "3500", "4000", "5000", "7790", "8050", "8310", "9600"];
  function genKlasse(r) {
    const nr = wahl(r, POOL4), kl = klasseVon(nr);
    const bestandsFrage = nr !== "9600" && r() < 0.35;
    if (bestandsFrage) {
      const bestand = kl <= 3;
      return { ue: 4, wir: WIR, art: "wahl",
        frage: "Ist das Konto " + konto(nr) + " ein Bestandskonto oder ein Erfolgskonto?",
        optionen: [{ k: "bestand", t: "Bestandskonto (Klasse 0 bis 3)" }, { k: "erfolg", t: "Erfolgskonto (Klasse 4 bis 8)" }], richtig: bestand ? "bestand" : "erfolg",
        tipp: "Die erste Ziffer verrät die Klasse. Klasse 0 bis 3 zeigt, was wir haben und schulden. Klasse 4 bis 8 zeigt Erträge und Aufwände.",
        erklaerung: konto(nr) + " steht in Klasse " + kl + " (" + KLASSEN[kl] + "). " + (bestand
          ? "Bestandskonten (Klasse 0 bis 3) zeigen, was wir haben (Vermögen) und was wir schulden."
          : "Erfolgskonten (Klasse 4 bis 8) zeigen Erträge und Aufwände, also den Gewinn oder Verlust."),
        sig: "4|b|" + nr };
    }
    const andere = mischen(r, Object.keys(KLASSEN).map(Number).filter(x => x !== kl)).slice(0, 3);
    const klassen = andere.concat([kl]).sort((a, b) => a - b);
    return { ue: 4, wir: WIR, art: "wahl",
      frage: "In welche Kontenklasse gehört das Konto " + konto(nr) + "?",
      optionen: klassen.map(x => ({ k: String(x), t: "Klasse " + x + " · " + KLASSEN[x] })), richtig: String(kl),
      tipp: "Die erste Ziffer der Kontonummer ist die Kontenklasse.",
      erklaerung: konto(nr) + " beginnt mit " + kl + ": Klasse " + kl + " (" + KLASSEN[kl] + ")." + (nr.length === 5 ? " Personenkonten stehen unter dem Sammelkonto " + (nr.charAt(0) === "2" ? "2000" : "3300") + "." : ""),
      sig: "4|k|" + nr };
  }

  /* ---------- Übung 5: Soll oder Haben? ---------- */
  const T5 = [
    { nr: "5000", s: "Soll", f: "Wir kaufen Handelsware bei {L} auf Rechnung.", e: "Die Ware kommt zu uns. Der Wareneinsatz ist ein Aufwand, und Aufwand steht im Soll." },
    { nr: "2500", s: "Soll", f: "In der Eingangsrechnung von {L} steht Umsatzsteuer. Für uns ist das Vorsteuer: Wir holen sie uns vom Finanzamt zurück.", e: "Die Vorsteuer ist eine Forderung an das Finanzamt, also etwas, das wir haben. Eine Zunahme dessen, was wir haben, steht im Soll." },
    { nr: "{LN}", s: "Haben", f: "Wir kaufen bei {L} auf Rechnung und schulden ihm das Geld.", e: "Wir schulden dem Lieferanten Geld. Die Verbindlichkeit nimmt zu, und das steht im Haben." },
    { nr: "2700", s: "Haben", f: "Wir bezahlen eine Rechnung bar. Das Geld verlässt die Kassa.", e: "Die Kassa nimmt ab. Eine Abnahme dessen, was wir haben, steht im Haben." },
    { nr: "2700", s: "Soll", f: "{K} bezahlt bei uns bar. Das Geld kommt in die Kassa.", e: "Die Kassa nimmt zu. Eine Zunahme dessen, was wir haben, steht im Soll." },
    { nr: "2800", s: "Soll", f: "{K} überweist uns Geld auf das Bankkonto.", e: "Das Bankguthaben nimmt zu. Eine Zunahme dessen, was wir haben, steht im Soll." },
    { nr: "2800", s: "Haben", f: "Wir überweisen {L} Geld vom Bankkonto.", e: "Das Bankguthaben nimmt ab. Eine Abnahme dessen, was wir haben, steht im Haben." },
    { nr: "{KN}", s: "Soll", f: "Wir schicken {K} eine Rechnung. Der Kunde schuldet uns jetzt Geld.", e: "Der Kunde schuldet uns Geld: Die Forderung an ihn nimmt zu, und eine Zunahme dessen, was wir haben, steht im Soll." },
    { nr: "{KN}", s: "Haben", f: "{K} hat seine Rechnung bei uns bezahlt. Die Forderung an ihn ist weg.", e: "Die Forderung an den Kunden nimmt ab, weil er bezahlt hat. Eine Abnahme dessen, was wir haben, steht im Haben." },
    { nr: "4000", s: "Haben", f: "Wir verkaufen Handelsware an {K}.", e: "Ein Erlös ist ein Ertrag, und Erträge stehen im Haben." },
    { nr: "3500", s: "Haben", f: "Auf unserer Rechnung an {K} steht Umsatzsteuer, die wir dem Finanzamt schulden.", e: "Die Umsatzsteuer schulden wir dem Finanzamt. Eine Verbindlichkeit, die zunimmt, steht im Haben." },
    { nr: "{LN}", s: "Soll", f: "Wir überweisen {L} den offenen Rechnungsbetrag. Unsere Schuld sinkt.", e: "Unsere Schuld beim Lieferanten nimmt ab. Eine Abnahme einer Verbindlichkeit steht im Soll." }
  ];
  function genSollHaben(r) {
    const t = wahl(r, T5), l = wahl(r, LIEF), k = wahl(r, KUNDEN);
    const nr = t.nr === "{LN}" ? l.nr : t.nr === "{KN}" ? k.nr : t.nr;
    const text = t.f.replace(/\{L\}/g, l.name).replace(/\{K\}/g, k.name);
    return { ue: 5, wir: WIR, art: "wahl", seiten: true,
      frage: text + " Auf welcher Seite steht " + konto(nr) + " in dieser Buchung?",
      optionen: [{ k: "Soll", t: "Soll" }, { k: "Haben", t: "Haben" }], richtig: t.s,
      tipp: "Was wir haben (Kassa, Bank, Forderungen) und Aufwand nimmt im Soll zu. Was wir schulden (Verbindlichkeiten, Umsatzsteuer) und Erträge nehmen im Haben zu. Wird etwas weniger, ist es umgekehrt.",
      erklaerung: t.e + " Also: " + konto(nr) + " im " + t.s + ".",
      sig: "5|" + T5.indexOf(t) + "|" + l.nr + "|" + k.nr };
  }

  const GEN = [null, genBeleg, genWir, genNummerName, genKlasse, genSollHaben];

  /* ---------- IDs, Items, Plan ---------- */
  const ID_RE = /^Q0-([1-5])-([0-9A-Z]{1,6})$/;
  const cache = {};
  const istId = id => typeof id === "string" && ID_RE.test(id);
  const idVon = (ue, seed) => "Q0-" + ue + "-" + (Math.abs(seed | 0) % 2176782336).toString(36).toUpperCase();
  function item(id) {
    if (!istId(id)) return null;
    if (cache[id]) return cache[id];
    const m = ID_RE.exec(id), ue = +m[1], seed = parseInt(m[2], 36);
    const it = GEN[ue](rng(seed * 2654435761 + ue));
    it.id = id; it.typ = "qs0"; it.einheit = 0; it.loesung = [];
    const glatt = t => String(t).replace(/\.\.(?=\s|$)/g, ".");
    it.frage = glatt(it.frage); it.erklaerung = glatt(it.erklaerung); it.tipp = glatt(it.tipp);
    it.uebung = UEBUNGEN[ue].titel; it.text = it.frage;
    cache[id] = it;
    return it;
  }
  /** Plan für n Aufgaben: Übung 1 bis 5 der Reihe nach, danach neue Runden mit anderen Varianten. */
  function plan(n, basis) {
    n = Math.max(1, Math.min(40, n | 0 || 5));
    const ids = [], gesehen = new Set();
    let seed = basis != null ? basis : (Math.floor(Math.random() * 1e6) + 1);
    for (let i = 0; i < n; i++) {
      const ue = (i % 5) + 1;
      for (let v = 0; v < 400; v++) {
        seed += 7919;
        const id = idVon(ue, seed), it = item(id);
        if (!it || gesehen.has(it.sig)) continue;
        gesehen.add(it.sig); ids.push(id); break;
      }
    }
    return ids;
  }
  /** Trägt Startlektion-IDs in ein Aufgaben-Verzeichnis ein (z. B. AUFG), damit sie nach dem Neuladen wieder da sind. */
  function sichern(id, verzeichnis) {
    if (!istId(id)) return null;
    const it = item(id);
    if (verzeichnis && !verzeichnis[id]) verzeichnis[id] = it;
    return it;
  }

  /* ---------- Darstellung ---------- */
  const CSS = `
.qs0-beleg{background:#fff;border:1px solid #cfd5de;border-radius:8px;padding:12px 14px;margin:10px 0 2px;font-size:.92rem;line-height:1.4;color:#1d2430;max-width:560px;box-shadow:0 1px 3px rgba(20,30,50,.08)}
.qs0-beleg .kopf{font-weight:800;font-size:1.02rem}
.qs0-beleg .tit{font-weight:700;margin-top:4px;font-size:1.05rem}
.qs0-beleg .meta{color:#5d6778;font-size:.85rem}
.qs0-beleg .zeile{display:flex;justify-content:space-between;gap:12px;padding:3px 0;border-bottom:1px dotted #d5dae2}
.qs0-beleg .zeile span:last-child{white-space:nowrap}
.qs0-beleg .summe{display:flex;justify-content:space-between;gap:12px;font-weight:700;padding-top:3px}
.qs0-beleg .fuss{color:#5d6778;font-size:.82rem;margin-top:6px}
.qs0-beleg .fikt{color:#8a93a3;font-size:.75rem;margin-top:6px;border-top:1px solid #eceff3;padding-top:4px}
.qs0-opts{display:grid;gap:10px;margin-top:10px}
.qs0-opt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;min-height:54px;padding:12px 14px;border-radius:12px;border:2px solid var(--line,#e3e6eb);background:var(--card,#fff);font-weight:600;font-size:1rem;line-height:1.3}
.qs0-opt[aria-pressed="true"]{border-color:var(--accent,#2f6f73);background:var(--accent-soft,#e6f1f1)}
.qs0-opt.ok{border-color:var(--ok,#1f8a4c);background:var(--ok-soft,#e5f5eb)}
.qs0-opt.bad{border-color:var(--bad,#c2362f);background:var(--bad-soft,#fbeaea)}
.qs0-opt .mk{margin-left:auto;font-weight:800}
.qs0-opts.seiten{grid-template-columns:1fr 1fr}
.qs0-opt.s-soll{color:var(--soll,#2f5fb3)}.qs0-opt.s-haben{color:var(--haben,#a4572a)}
.qs0-opt.s-soll[aria-pressed="true"]{background:var(--soll-soft,#eaf0fb);border-color:var(--soll,#2f5fb3)}
.qs0-opt.s-haben[aria-pressed="true"]{background:var(--haben-soft,#f9eee6);border-color:var(--haben,#a4572a)}
.qs0-opt.s-soll.ok,.qs0-opt.s-haben.ok{background:var(--ok-soft,#e5f5eb);border-color:var(--ok,#1f8a4c)}
.qs0-opt.s-soll.bad,.qs0-opt.s-haben.bad{background:var(--bad-soft,#fbeaea);border-color:var(--bad,#c2362f)}
.qs0-zeilen{display:grid;gap:8px;margin-top:10px}
.qs0-zeile{display:flex;align-items:center;gap:10px;width:100%;text-align:left;min-height:54px;padding:8px 12px;border-radius:12px;border:2px dashed #b9c1ce;background:#fff}
.qs0-zeile .lab{font-weight:700;font-size:.93rem;flex:1 1 46%;min-width:0;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.qs0-zeile .zu{flex:1 1 54%;min-width:0;overflow-wrap:break-word;hyphens:auto;font-size:.93rem;padding:8px 10px;border-radius:9px;background:#f1f3f6;color:#7a8394;font-weight:600;text-align:center;min-height:40px;display:flex;align-items:center;justify-content:center}
.qs0-zeile.aktiv{border-style:solid;border-color:var(--accent,#2f6f73);background:var(--accent-soft,#e6f1f1)}
.qs0-zeile.voll .zu{background:#fff;color:var(--text,#1d2430);border:1px solid #cfd5de}
.qs0-zeile.ok{border-style:solid;border-color:var(--ok,#1f8a4c);background:var(--ok-soft,#e5f5eb)}
.qs0-zeile.bad{border-style:solid;border-color:var(--bad,#c2362f);background:var(--bad-soft,#fbeaea)}
.qs0-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.qs0-chip{min-height:46px;padding:8px 14px;border-radius:999px;border:2px solid var(--line,#e3e6eb);background:#fff;font-weight:600;font-size:.98rem}
.qs0-chip[disabled]{opacity:.35}
.qs0-hinweis{margin:10px 0 0;color:var(--muted,#5d6778);font-size:.9rem}
.qs0-tipp{margin-top:10px;padding:10px 12px;border-radius:10px;background:var(--tipp-soft,#fff6dc);color:var(--tipp,#7a5a00)}
.qs0-erk{margin-top:8px}
#bmstage .qs0-beleg{font-size:24px;max-width:none;padding:22px 26px}
#bmstage .qs0-beleg .kopf{font-size:28px}#bmstage .qs0-beleg .tit{font-size:30px}#bmstage .qs0-beleg .meta,#bmstage .qs0-beleg .fuss{font-size:21px}#bmstage .qs0-beleg .fikt{font-size:17px}
#bmstage .qs0-opt{font-size:26px;min-height:76px}#bmstage .qs0-zeile{min-height:76px}#bmstage .qs0-zeile .lab,#bmstage .qs0-zeile .zu{font-size:26px}
#bmstage .qs0-chip{font-size:24px;min-height:62px;padding:10px 20px}#bmstage .qs0-hinweis,#bmstage .qs0-zeile .loes{font-size:20px}
#bmstage .qs0-tipp,#bmstage .qs0-erk{font-size:22px}
.qs0-bm-frage{font-size:clamp(1.35rem,2.2vw,2rem);line-height:1.4;font-weight:600;text-align:center;max-width:34ch}
#bmstage .qs0-bm-frage{font-size:40px;max-width:30ch}
`;
  function cssEinfuegen() {
    if (typeof document === "undefined" || document.getElementById("qs0-css")) return;
    const st = document.createElement("style"); st.id = "qs0-css"; st.textContent = CSS; document.head.appendChild(st);
  }

  function belegHtml(b, esc) {
    if (!b) return "";
    const z = (b.zeilen || []).map(x => `<div class="zeile"><span>${esc(x[0])}</span><span>${esc(x[1] || "")}</span></div>`).join("");
    const s = (b.summen || []).map(x => `<div class="summe"><span>${esc(x[0])}</span><span>${esc(x[1])}</span></div>`).join("");
    const meta = [b.nr, b.datum].filter(Boolean).join(" · ");
    return `<div class="qs0-beleg" data-beleg>
      <div class="kopf">${esc(b.kopf)}</div>
      ${b.titel ? `<div class="tit">${esc(b.titel)}</div>` : ""}
      ${meta ? `<div class="meta">${esc(meta)}</div>` : ""}
      ${b.an ? `<div class="meta">${b.titel === "Kontoauszug" ? "Kontoinhaber: " : "an: "}${esc(b.an)}</div>` : ""}
      ${z}${s}
      ${b.fuss ? `<div class="fuss">${esc(b.fuss)}</div>` : ""}
      <div class="fikt">Fiktiver Übungsbeleg</div></div>`;
  }

  /* Zustand einer Aufgabe */
  function neu(a) {
    return { a, geprueft: false, ok: false, tipps: 0, auswahl: null, zu: {}, aktiv: 0, tippZu: false, qs0: true };
  }
  function bereit(c) {
    const a = c.a;
    if (a.art === "zuordnen") return a.zeilen.every(z => c.zu[z.key] != null);
    return c.auswahl != null;
  }
  function bewerten(c) {
    const a = c.a;
    if (a.art === "zuordnen") return a.zeilen.every(z => c.zu[z.key] === z.richtig);
    return c.auswahl === a.richtig;
  }

  function antwortHtml(c, host) {
    const esc = host.esc, a = c.a, fertig = c.geprueft;
    if (a.art === "zuordnen") {
      const benutzt = new Set(Object.keys(c.zu).map(k => c.zu[k]));
      const zeilen = a.zeilen.map((z, i) => {
        const v = c.zu[z.key];
        const cls = fertig ? (v === z.richtig ? "ok" : "bad") : (c.aktiv === i ? "aktiv" : "") + (v != null ? " voll" : "");
        const chip = a.chips.find(x => x.k === v);
        const zeigRichtig = fertig && v !== z.richtig ? a.chips.find(x => x.k === z.richtig) : null;
        return `<button type="button" class="qs0-zeile ${cls}" data-zeile="${i}" ${fertig ? "disabled" : ""}>
          <span class="lab">${esc(z.label)}</span><span class="zu">${chip ? esc(chip.t) : (fertig ? "–" : "tippen und wählen")}</span>
          ${fertig ? `<span class="mk">${v === z.richtig ? "✓" : "✗"}</span>` : ""}</button>
          ${zeigRichtig ? `<div class="qs0-hinweis" style="margin:-4px 0 4px 6px;color:var(--bad,#c2362f)">Richtig: ${esc(zeigRichtig.t)}</div>` : ""}`;
      }).join("");
      const chips = fertig ? "" : `<div class="qs0-chips" role="group" aria-label="Auswahl">${a.chips.map(ch =>
        `<button type="button" class="qs0-chip" data-chip="${esc(ch.k)}" ${benutzt.has(ch.k) ? "disabled" : ""}>${esc(ch.t)}</button>`).join("")}</div>`;
      return `<div class="qs0-zeilen">${zeilen}</div>${chips}`;
    }
    const opts = a.optionen.map(o => {
      let cls = "";
      if (a.seiten) cls = o.k === "Soll" ? "s-soll" : "s-haben";
      if (fertig) cls += o.k === a.richtig ? " ok" : (o.k === c.auswahl ? " bad" : "");
      const an = c.auswahl === o.k;
      const mk = fertig ? (o.k === a.richtig ? "✓" : (an ? "✗" : "")) : "";
      return `<button type="button" class="qs0-opt ${cls}" data-opt="${esc(o.k)}" aria-pressed="${an ? "true" : "false"}" ${fertig ? "disabled" : ""}><span>${esc(o.t)}</span>${mk ? `<span class="mk">${mk}</span>` : ""}</button>`;
    }).join("");
    return `<div class="qs0-opts${a.seiten ? " seiten" : ""}" role="group" aria-label="Antwortmöglichkeiten">${opts}</div>`;
  }
  function feedbackHtml(c, host) {
    const esc = host.esc;
    return `<div class="msg ${c.ok ? "ok" : "bad"}" id="ergebnis" data-ok="${c.ok}">${c.ok
      ? `<span class="lobzeile">${host.HAKEN || ""}<span><b>${esc(c.lob || "Richtig!")}</b>${c.tipps ? " Mit Tipp: halber Punkt." : ""}</span></span>`
      : `<b>Noch nicht ganz richtig.</b> Schau dir die Lösung an.`}</div>
      <div class="erkl"><b>Erklärung:</b> ${esc(c.a.erklaerung)}</div>`;
  }
  function tippHtml(c, host) {
    return c.tipps ? `<div class="qs0-tipp" id="tipps"><b>Tipp:</b> ${host.esc(c.a.tipp)}</div>` : `<div id="tipps"></div>`;
  }
  function aktionen(c, host) {
    const S = host.S, letzte = S.idx + 1 >= S.queue.length;
    if (c.geprueft) return `<button class="btn primary" id="weiter">${letzte ? "Zur Auswertung" : "Weiter"}</button>`;
    return `<button class="btn tippbtn" data-tipp ${c.tipps >= 1 ? "disabled" : ""} aria-label="Tipp anzeigen">${host.BULB || ""}<span>${c.tipps ? "Tipp" : "Tipp"}</span></button>
      <button class="btn primary" id="pruefen" ${bereit(c) ? "" : "disabled"}>Prüfen</button>`;
  }

  /** Zeichnet die aktuelle Startlektion-Aufgabe. host: { S, app, esc, punkteTxt, BULB, FLAMME, HAKEN, LOB, beamer, weiter, beenden, geheZu } */
  function zeige(host) {
    cssEinfuegen();
    const S = host.S, c = S.cur, a = c.a, esc = host.esc;
    const punkte = S.ergebnisse.reduce((s, r) => s + r.punkte, 0);
    const kopfTag = `Startlektion · So funktioniert Buchen · Übung ${a.ue} von 5: ${esc(a.uebung)}`;
    const serie = `<div class="serie ${S.serie ? "" : "leer"}" id="serie" data-serie="${S.serie}">${S.serie ? `${host.FLAMME || ""}<span>${S.serie} richtig in Folge</span>` : ""}</div>`;
    const beleg = belegHtml(a.beleg, esc);
    let h;
    if (host.beamer) {
      h = `<div class="bm" id="aufgabe" data-id="${esc(a.id)}" data-qs0="1">
        <div class="bm-bar">
          <span class="bm-entwurf">Beamer</span>
          <span class="bm-titel">Startlektion · Übung ${a.ue} von 5 · ${esc(a.uebung)}</span>
          <span class="pill">Aufgabe ${S.idx + 1} von ${S.queue.length}</span>
          <span class="pill" id="punkte">${host.punkteTxt(punkte)} P.</span>
          ${serie.replace('class="serie', 'class="serie')}
          <div class="bm-navbox">
            <button type="button" class="btn bm-nav" id="zurueck" ${S.idx === 0 ? "disabled" : ""}>← Zurück</button>
            <button type="button" class="btn bm-nav" id="vor" ${S.idx + 1 >= S.queue.length ? "disabled" : ""}>Vor →</button>
          </div>
          <button class="linkbtn" id="ende">Beenden</button>
        </div>
        <div class="bm-main">
          <div class="bm-links"><div class="bm-belegflaeche" style="flex-direction:column;align-items:center;justify-content:center;gap:26px;overflow:auto;padding:10px 24px">
            <div class="qs0-bm-frage">${esc(a.frage)}</div>${beleg}</div></div>
          <div class="bm-rechts">
            <div class="card bm-meta"><div class="wir">Wir sind: <b>${esc(a.wir)}</b></div>${tippHtml(c, host)}</div>
            <div class="card" id="qs0-antwort">${antwortHtml(c, host)}<div id="fb">${c.geprueft ? feedbackHtml(c, host) : ""}</div></div>
            <div class="bm-actions">${aktionen(c, host)}</div>
          </div></div></div>`;
    } else {
      h = `<div class="bar" style="margin-top:4px"><button class="linkbtn" id="ende">✕ Beenden</button>
          <span class="pill">Aufgabe ${S.idx + 1} von ${S.queue.length}</span><span class="pill" id="punkte" title="Punkte">${host.punkteTxt(punkte)} P.</span></div>
        <div class="progress"><i style="width:${(S.idx / S.queue.length) * 100}%"></i></div>
        ${serie}
        <div class="card" id="aufgabe" data-id="${esc(a.id)}" data-qs0="1">
          <div class="einheit-tag">${kopfTag}</div>
          <div class="wir" style="margin-top:8px">Wir sind: <b>${esc(a.wir)}</b></div>
          <div class="fall">${esc(a.frage)}</div>
          ${beleg}
          ${tippHtml(c, host)}
        </div>
        <div class="card" id="qs0-antwort">${antwortHtml(c, host)}<div id="fb">${c.geprueft ? feedbackHtml(c, host) : ""}</div></div>
        <div class="sticky"><div class="inner">${aktionen(c, host)}</div></div>`;
    }
    host.app().innerHTML = h;
    binden(host);
  }

  function binden(host) {
    const S = host.S, c = S.cur, a = c.a, root = host.app();
    const neuZeichnen = () => { const y = window.scrollY; zeige(host); window.scrollTo(0, y); };
    const q = s => root.querySelector(s);
    const ende = q("#ende"); if (ende) ende.onclick = () => host.beenden();
    const zu = q("#zurueck"); if (zu) zu.onclick = () => host.geheZu(S.idx - 1);
    const vor = q("#vor"); if (vor) vor.onclick = () => host.geheZu(S.idx + 1);
    root.querySelectorAll("[data-opt]").forEach(b => b.onclick = () => { if (c.geprueft) return; c.auswahl = b.dataset.opt; neuZeichnen(); });
    root.querySelectorAll("[data-zeile]").forEach(b => b.onclick = () => {
      if (c.geprueft) return;
      const i = +b.dataset.zeile, z = a.zeilen[i];
      if (c.zu[z.key] != null && c.aktiv === i) delete c.zu[z.key];   // zweites Tippen leert die Zeile
      c.aktiv = i; neuZeichnen();
    });
    root.querySelectorAll("[data-chip]").forEach(b => b.onclick = () => {
      if (c.geprueft) return;
      let i = c.aktiv;
      if (a.zeilen[i] && c.zu[a.zeilen[i].key] != null) { const f = a.zeilen.findIndex(z => c.zu[z.key] == null); if (f >= 0) i = f; }
      const z = a.zeilen[i]; if (!z) return;
      c.zu[z.key] = b.dataset.chip;
      const n = a.zeilen.findIndex(x => c.zu[x.key] == null);
      c.aktiv = n >= 0 ? n : i;
      neuZeichnen();
    });
    const tipp = q("[data-tipp]"); if (tipp) tipp.onclick = () => { if (c.geprueft || c.tipps >= 1) return; c.tipps = 1; neuZeichnen(); };
    const pr = q("#pruefen"); if (pr) pr.onclick = () => { if (bereit(c)) pruefen(host); };
    const w = q("#weiter"); if (w) w.onclick = () => host.weiter();
  }

  function pruefen(host) {
    const S = host.S, c = S.cur, a = c.a;
    c.ok = bewerten(c); c.geprueft = true;
    c.lob = (host.LOB && host.LOB[Math.floor(Math.random() * host.LOB.length)]) || "Richtig!";
    const punkte = c.ok ? (c.tipps ? 0.5 : 1) : 0;
    if (c.ok) { if (!c.tipps) S.serie++; } else S.serie = 0;
    S.besteSerie = Math.max(S.besteSerie || 0, S.serie);
    S.ergebnisse = S.ergebnisse.filter(r => r.id !== a.id);
    S.ergebnisse.push({ id: a.id, einheit: 0, ok: c.ok, tipp: c.tipps > 0, tipps: c.tipps, punkte });
    zeige(host);
    const fb = host.app().querySelector("#fb"); if (fb && fb.scrollIntoView) fb.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  g.QS0 = { ID_RE, istId, item, plan, sichern, neu, zeige, bewerten, bereit, idVon, UEBUNGEN, KONTEN, KLASSEN, LIEF, KUNDEN, ANZAHL_UEBUNGEN: 5, TITEL: "So funktioniert Buchen" };
  if (typeof module !== "undefined" && module.exports) module.exports = g.QS0;
})(typeof window !== "undefined" ? window : globalThis);
