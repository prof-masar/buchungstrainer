window.BEMA_REGELN = {"dokument": "BEMA-Lehrerversion Buchungstrainer – WebApps-Vorgaben v5", "version": "v5", "datum": "2026-11-21", "grundlage": {"trainer": "inhalte_v10 / 2026-11-12-v10, Einheiten E1–E17", "kontenplan": "Kontenplan Buchungstrainer v3", "standards": ["österreichisches Rechnungswesen", "Soll vor Haben", "Beleggruppen K (nur Bargeld), B (Bank/Kontoauszug), ER (Eingangsrechnung auf Ziel), AR (Ausgangsrechnung auf Ziel), S (Kartenzahlung)", "Einstieg „Wir sind …“ mit echter Firma aus dem Partnerpool", "nur Kontonummern aus dem Kontenplan Buchungstrainer v3, keine erfundenen Nummern", "Personenkonten nur 20010, 20020, 20030, 33010, 33020, 33030, 33040, 33050", "nie 2000 oder 3300 direkt bebuchen"]}, "personenkonten": {"20010": "Kammfeder Fitness e.U.", "20020": "Atemweide Yoga & Pilates e.U.", "20030": "Innquell Möbelmanufaktur GmbH", "33010": "Nadelstrom Elektronik Großhandel GmbH", "33020": "Schallkern Audio GmbH", "33030": "Tauernlogistik Spedition GmbH", "33040": "Wachaustern Transport AG", "33050": "Kammerstapel Großhandel GmbH"}, "partnerpool": {"wir": ["Ohmreich Elektrofachhandel GmbH, Elektronikhandel", "Gipfelgriff Sport e.U., Outdoor-Sporthandel", "Gipfelgriff Sport e.U., Outdoor-Sporthandel", "Gipfelgriff Sport e.U., Outdoor-Sporthandel", "Innquell Möbelmanufaktur GmbH, Möbel (Massivholzmöbel)"], "ohne_personenkonto_nur_k_s_b": ["Tankhain Tankstellen GmbH", "Glutader Energiehandel GmbH", "Raschfracht Zustelldienst GmbH", "Saumland Bank AG", "Saumland Bank AG", "Autohaus Spurweite GmbH", "Stadt Wien – Rechnungs- und Abgabenwesen (MA 6)"]}, "verboten_global": ["Elektro-Pkw (Kauf und Betrieb, VSt-Ausnahme)", "NoVA und Kfz-Anmeldekosten als entworfener Fall", "Grunderwerbsteuer und Grundstückskauf", "gemischte Nutzung (privat/betrieblich)", "Anschaffungen im Grenzbereich der GWG-Schwelle", "direktes Bebuchen von 3300 oder 2000", "Beleggruppe K für Nicht-Bargeld (Karte ist immer S)", "Code-128 oder anderer Strichcode auf Kassabelegen (nur RKSV-QR, Codezeichenkette nicht als Klartext)", "Steuersätze außer 20 %, 10 % (nur wo eindeutig) und 0 % (nur wo eindeutig, z. B. Bankspesen, KESt, Mahnspesen, Versicherung mit mot. VSt, Paket unter 10 kg)", "gemischte Steuersätze auf einem Übungsbeleg, außer beide Sätze sind zweifelsfrei", "Skonto ohne tatsächliche Zahlung in der Frist", "neue Personenkonten-Nummern, die nicht im Kontenplan stehen"], "plausibilitaet": ["Zuerst Positionsbetrag = Menge × Einzelpreis (kaufmännisch je Zeile auf Cent, Summe der Zeilen = Listen-Netto).", "Rabatt (Sofortrabatt) vom so ermittelten Listen-Netto; Netto nach Rabatt = Listen-Netto − Rabatt. Die gedruckte Positionszeile und der Rabatt müssen arithmetisch zusammenpassen.", "Steuer = kaufmännisch auf Cent gerundet (Netto × Satz / 100); Brutto = Netto + Steuer.", "Bevorzugt glatte Beträge, die sich ohne Rest durch 1,20 (20 %) bzw. 1,10 (10 %) teilen und deren Menge × Einzelpreis exakt aufgeht (keine 254,47-Konstrukte).", "Skonto nur bei Zahlung in der Frist, vom Brutto, bei 20 % durch 1,20 in Netto und Steuer.", "KESt genau 25 % der Habenzinsen, kaufmännisch auf Cent.", "Inventur: nur Differenz Endbestand − Anfangsbestand, nie den ganzen Endbestand.", "Kontoauszug: Abbuchung negativ, Saldo_neu = Saldo_alt + Summe der Zeilen.", "Kassabelege (K und Verkaufs-Kartenbelege S mit Kassa) erhalten einen RKSV-QR, keinen Strichcode, Code nicht als Klartext.", "Partner und Ware müssen zur Branche des Betriebs („Wir sind …“) passen (kein Schallkern-Kauf bei Nadelstrom, kein Elektronik-Einkauf des Sporthandels als Handelsware, außer der Typ ist ausdrücklich Weiterverkauf und die Angabe sagt das).", "Einzelpreise müssen zur Bezeichnung passen (kein 65-Zoll-Fernseher zu 80 €). Verbindliche Netto-Stückpreise (glatt auf 0,50 €) stehen unter preisspannen.stueckpreise_netto_eur.", "Menge pro Zeile 2–30. Rechnungssumme netto bei ER/AR 300–20.000 €. Bar 20–400 € netto gesamt für Zubehör, Kabel, Kopfhörer und Lautsprecher; wenn 2 × Stückpreis den Bar-Rahmen sprengt, die Ware nicht für Bar verwenden. Fernseher und andere teure Geräte nur auf Ziel (ER) oder per Bank. Gutschriften dürfen unter 300 € liegen, müssen aber kleiner als die Ursprungsrechnung sein und mindestens 20 € netto betragen."], "geschaeftstypen": [{"id": "E1_wareneinkauf_ziel", "einheit": 1, "beleggruppe": "ER", "belegtyp": "Eingangsrechnung", "fix": "Soll 5000 + 2500, Haben Lieferanten-Personenkonto; nie 3300", "variierbar": {"netto_eur": [300, 20000], "ust_satz": [20], "partner": "33010 oder 33020", "datum": true, "zahlungsweg_twist": "bar → K/2700; Firmenkarte → S/3180 oder 3190"}, "rundung": "0,01, bevorzugt glatte Nettobeträge"}, {"id": "E1_wareneinkauf_bar", "einheit": 1, "beleggruppe": "K", "belegtyp": "Kassabeleg", "fix": "Soll 5000 + 2500, Haben 2700", "variierbar": {"netto_eur": [20, 400], "ust_satz": [20], "partner": "33010 oder 33020; nur günstige Ware (Zubehör, Kabel, Kopfhörer)", "zahlungsweg_twist": "Karte → S und 3180/3190 statt 2700"}}, {"id": "E1_ruecksendung_einkauf", "einheit": 1, "beleggruppe": "ER", "belegtyp": "Gutschrift", "fix": "Umkehrung des Einkaufssatzes: Soll Lieferant, Haben 5000 + 2500", "variierbar": {"netto_eur": [20, 20000], "ust_satz": [20], "partner": "33010 oder 33020", "ursprungsrechnung": "kleiner als die Ursprungsrechnung, mindestens 20 € netto"}}, {"id": "E2_warenverkauf_ziel", "einheit": 2, "beleggruppe": "AR", "belegtyp": "Ausgangsrechnung", "fix": "Soll Kunden-Personenkonto, Haben 4000 + 3500; nie 2000", "variierbar": {"netto_eur": [300, 20000], "ust_satz": [20], "partner": "20010, 20020 oder 20030", "zahlungsweg_twist": "bar → K/2700; Kreditkarte → S/2880; Debitkarte → S/2885"}}, {"id": "E2_warenverkauf_bar", "einheit": 2, "beleggruppe": "K", "belegtyp": "Kassabeleg", "fix": "Soll 2700, Haben 4000 + 3500", "variierbar": {"ust_satz": [20], "zahlungsweg_twist": "Karte → S und 2880/2885", "netto_eur": [20, 400]}}, {"id": "E2_ruecksendung_verkauf", "einheit": 2, "beleggruppe": "AR", "belegtyp": "Gutschrift", "fix": "Umkehrung des Verkaufssatzes: Soll 4000 + 3500, Haben Kundenkonto", "variierbar": {"netto_eur": [20, 20000], "ust_satz": [20], "partner": "20010, 20020 oder 20030", "ursprungsrechnung": "kleiner als die Ursprungsrechnung, mindestens 20 € netto"}}, {"id": "E2_eigenverbrauch", "einheit": 2, "beleggruppe": "AR", "belegtyp": "Textangabe oder Eigenbeleg", "fix": "Soll 9600, Haben 4900 + 3500; nur bei Einzelunternehmen als Wir", "variierbar": {"netto_eur": [20, 400], "ust_satz": [20]}}, {"id": "E3_bezugskosten", "einheit": 3, "beleggruppe": "ER", "belegtyp": "Eingangsrechnung", "fix": "Soll 5000 + 2500, Haben 33030 oder 33040 (wie Warenkauf, nicht 7300)", "variierbar": {"netto_eur": [40, 800], "ust_satz": [20], "partner": "33030 oder 33040", "zahlungsweg_twist": "bar → K/2700; Bank sofort → 2800"}}, {"id": "E4_versand_spedition", "einheit": 4, "beleggruppe": "ER", "belegtyp": "Eingangsrechnung", "fix": "Soll 7300 + 2500, Haben 33030 oder 33040 (nicht 5000)", "variierbar": {"netto_eur": [40, 800], "ust_satz": [20], "partner": "33030 oder 33040"}}, {"id": "E4_paket_20", "einheit": 4, "beleggruppe": "K", "belegtyp": "Kassabeleg", "fix": "Soll 7310 + 2500, Haben 2700; nur Paket über 10 kg", "variierbar": {"netto_eur": [8, 80], "ust_satz": [20], "partner": "Raschfracht Zustelldienst GmbH", "gewicht_kg": [10.1, 31]}}, {"id": "E4_paket_0", "einheit": 4, "beleggruppe": "K", "belegtyp": "Kassabeleg", "fix": "Soll 7311, Haben 2700; keine VSt; nur Paket unter 10 kg", "variierbar": {"brutto_eur": [4, 30], "ust_satz": [0], "partner": "Raschfracht Zustelldienst GmbH", "gewicht_kg": [0.5, 9.9]}}, {"id": "E5_sofortrabatt", "einheit": 5, "beleggruppe": "ER", "belegtyp": "Eingangsrechnung", "fix": "Nur Netto nach Rabatt buchen (5000 + 2500 an Lieferant); kein eigenes Rabattkonto", "variierbar": {"listenpreis_netto_eur": [300, 20000], "rabatt_prozent": [5, 15], "ust_satz": [20]}}, {"id": "E5_sofortrabatt_verkauf", "einheit": 5, "beleggruppe": "AR", "belegtyp": "Ausgangsrechnung", "fix": "Wie E2 Zielverkauf: Soll Kunden-Personenkonto, Haben 4000 + 3500, nur Netto nach Rabatt, kein Rabattkonto, nie 2000. Der Beleg zeigt Listenpreis und Sofortrabatt.", "variierbar": {"listenpreis_netto_eur": [300, 20000], "rabatt_prozent": [5, 15], "ust_satz": [20], "partner": "20010, 20020 oder 20030"}}, {"id": "E5_nachlass_lieferant", "einheit": 5, "beleggruppe": "ER", "belegtyp": "Gutschrift", "fix": "Soll Lieferant, Haben 5000 + 2500", "variierbar": {"netto_eur": [20, 20000], "ust_satz": [20], "ursprungsrechnung": "kleiner als die Ursprungsrechnung, mindestens 20 € netto"}}, {"id": "E5_nachlass_kunde", "einheit": 5, "beleggruppe": "AR", "belegtyp": "Gutschrift", "fix": "Soll 4400 + 3500, Haben Kundenkonto (Ware bleibt beim Kunden, nicht 4000)", "variierbar": {"netto_eur": [20, 20000], "ust_satz": [20], "ursprungsrechnung": "kleiner als die Ursprungsrechnung, mindestens 20 € netto"}, "angabe_muss_enthalten": "Dass es ein nachträglicher Preisnachlass ist und die Ware beim Kunden bleibt. Sonst ist 4400 nicht gegen 4000 (Rücksendung) abgrenzbar."}, {"id": "E6_zahlung_lieferant", "einheit": 6, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll Lieferantenkonto, Haben 2800; keine Steuerkorrektur", "variierbar": {"brutto_eur": [200, 8000], "partner": "33010–33050", "auszugs_minus": true}}, {"id": "E6_zahlung_kunde", "einheit": 6, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 2800, Haben Kundenkonto; keine Steuerkorrektur", "variierbar": {"brutto_eur": [200, 8000], "partner": "20010–20030", "auszugs_plus": true}}, {"id": "E7_kunde_kreditkarte", "einheit": 7, "beleggruppe": "S", "belegtyp": "Kartenbeleg", "fix": "Soll 2880, Haben 4000 + 3500; nicht 2700", "variierbar": {"netto_eur": [50, 2000], "ust_satz": [20]}}, {"id": "E7_kunde_debitkarte", "einheit": 7, "beleggruppe": "S", "belegtyp": "Kartenbeleg", "fix": "Soll 2885, Haben 4000 + 3500; nicht 2700", "variierbar": {"netto_eur": [20, 800], "ust_satz": [20]}}, {"id": "E7_karteneingang_mit_gebuehr", "einheit": 7, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 2800 + 7792 + 2500, Haben 2880 (bzw. 2885); Gebühr mit VSt (Trainer-Vereinfachung)", "variierbar": {"brutto_umsatz_eur": [50, 2000], "gebuehr_netto_eur": [2, 25], "ust_satz_gebuehr": [20]}}, {"id": "E7_karteneingang_ohne_gebuehr", "einheit": 7, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 2800, Haben 2880 oder 2885 über den vollen Kartenumsatz; keine Gebühr in diesem Satz (Gebühren werden gesondert abgebucht, typ E7_kartengebuehr_gesondert).", "variierbar": {"brutto_umsatz_eur": [24, 2000], "karte": ["kredit", "debit"]}}, {"id": "E7_eigene_firmenkarte", "einheit": 7, "beleggruppe": "S", "belegtyp": "Kartenbeleg", "fix": "Soll immer 5000 Handelswareneinsatz 20 % + 2500 Vorsteuer, Haben 3180 (Kredit) oder 3190 (Debit); nicht 2700. Wie Trainer E7-06, E7-08, E7-14. Den späteren Bankausgleich nicht in diesem Fall mitgenerieren (Typ E7_firmenkarte_ausgleich).", "variierbar": {"netto_eur": [20, 2000], "ust_satz": [20], "karte": ["kredit", "debit"]}, "nicht": "Kein Treibstoff (das ist E14: Pkw 7320 brutto ohne VSt, Lkw 7330 + 2500), kein Paketporto (das ist E4: 7310 mit VSt bzw. 7311 ohne VSt). Partner nur Handelswaren-Lieferanten mit Personenkonto (33010, 33020, ggf. 33050)."}, {"id": "E7_firmenkarte_ausgleich", "einheit": 7, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 3180 (Kredit) oder 3190 (Debit), Haben 2800. Eigener Fall, nicht an den Kauf anhängen.", "variierbar": {"brutto_eur": [24, 2400], "karte": ["kredit", "debit"]}}, {"id": "E7_kartengebuehr_gesondert", "einheit": 7, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 7792 + 2500, Haben 2800 (monatliche Kartengebühr, Trainer-Vereinfachung mit VSt). Nicht mit dem Karteneingang vermischen.", "variierbar": {"gebuehr_netto_eur": [2, 25], "ust_satz": [20]}}, {"id": "E8_lieferantenskonto", "einheit": 8, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll Lieferant (voller Rechnungsbetrag), Haben 5880 + 2500 + 2800; Skonto vom Brutto, bei 20 % / 1,20", "variierbar": {"rechnungsbrutto_eur": [240, 6000], "skonto_prozent": [1, 3], "ust_satz": [20], "frist_eingehalten": true}}, {"id": "E9_kundenskonto", "einheit": 9, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 2800 + 4410 + 3500, Haben Kundenkonto (voller Rechnungsbetrag); Skonto vom Brutto, bei 20 % / 1,20", "variierbar": {"rechnungsbrutto_eur": [240, 6000], "skonto_prozent": [1, 3], "ust_satz": [20], "frist_eingehalten": true}}, {"id": "E10_mahnung_kunde", "einheit": 10, "beleggruppe": "AR", "belegtyp": "Mahnung", "fix": "Soll Kundenkonto, Haben 4890; keine USt. Verzugszinsen an Kunden: Haben 8055", "variierbar": {"betrag_eur": [5, 40], "art": ["mahnspesen", "verzugszinsen"]}}, {"id": "E10_mahnung_lieferant", "einheit": 10, "beleggruppe": "ER", "belegtyp": "Mahnung", "fix": "Soll 8321 (Mahnspesen) oder 8320 (Verzugszinsen), Haben Lieferant; keine USt", "variierbar": {"betrag_eur": [5, 80], "art": ["mahnspesen", "verzugszinsen"]}}, {"id": "E11_bareinzahlung", "einheit": 11, "beleggruppe": "K oder B (nie K+B in einem Fall)", "belegtyp": "Kassabeleg (Hälfte K) oder Kontoauszug (Hälfte B)", "fix": "Zwei getrennte Belege über 2870: K Soll 2870 Haben 2700; B Soll 2800 Haben 2870; nicht direkt 2800 an 2700", "variierbar": {"betrag_eur": [100, 3000]}, "ein_fall": "Genau ein Beleg und ein Buchungssatz (Hälfte K oder B), wie im Trainer. Feld haelfte ist Pflicht. Eine vollständige Einzahlung/Behebung darf in der Hausübung als zwei aufeinanderfolgende Fälle mit gleichem Betrag erscheinen (erst K, dann B), zählt dann als zwei der 3–4 Fälle."}, {"id": "E11_barbehebung", "einheit": 11, "beleggruppe": "K oder B (nie K+B in einem Fall)", "belegtyp": "Kassabeleg (Hälfte K) oder Kontoauszug (Hälfte B)", "fix": "K Soll 2700 Haben 2870; B Soll 2870 Haben 2800", "variierbar": {"betrag_eur": [50, 1500]}, "ein_fall": "Genau ein Beleg und ein Buchungssatz (Hälfte K oder B), wie im Trainer. Feld haelfte ist Pflicht. Eine vollständige Einzahlung/Behebung darf in der Hausübung als zwei aufeinanderfolgende Fälle mit gleichem Betrag erscheinen (erst K, dann B), zählt dann als zwei der 3–4 Fälle."}, {"id": "E12_habenzinsen_kest", "einheit": 12, "beleggruppe": "B", "belegtyp": "Bankabrechnung", "fix": "Soll 2800 (netto) + 9600 (KESt 25 %), Haben 8050 (Zinsen brutto)", "variierbar": {"habenzinsen_brutto_eur": [16, 160], "kest_satz": [25]}}, {"id": "E12_kest_allein", "einheit": 12, "beleggruppe": "B", "belegtyp": "Kontoauszug oder Bankabrechnung", "fix": "Soll 9600, Haben 2800; KESt 25 % der genannten Habenzinsen. Ähnlicher Beleg bleibt dieser Einzelsatz (nicht automatisch die kombinierte Abrechnung E12_habenzinsen_kest).", "variierbar": {"habenzinsen_brutto_eur": [16, 160], "kest_satz": [25]}}, {"id": "E12_sollzinsen", "einheit": 12, "beleggruppe": "B", "belegtyp": "Kontoauszug oder Bankabrechnung", "fix": "Soll 8310, Haben 2800; keine VSt", "variierbar": {"betrag_eur": [10, 200]}}, {"id": "E12_bankspesen", "einheit": 12, "beleggruppe": "B", "belegtyp": "Kontoauszug oder Bankabrechnung", "fix": "Soll 7790, Haben 2800; keine VSt", "variierbar": {"betrag_eur": [2, 40]}}, {"id": "E13_grundsteuer", "einheit": 13, "beleggruppe": "B", "belegtyp": "Zahlungsaufforderung oder Kontoauszug", "fix": "Soll 7100, Haben 2800; Betriebssteuer, keine USt", "variierbar": {"betrag_eur": [80, 400]}}, {"id": "E13_kammerumlage", "einheit": 13, "beleggruppe": "B", "belegtyp": "Kontoauszug oder Vorschreibung", "fix": "Soll 7780, Haben 2800; keine USt", "variierbar": {"betrag_eur": [40, 200]}}, {"id": "E13_einkommensteuer", "einheit": 13, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 9600, Haben 2800; Privatsteuer, nicht Aufwand", "variierbar": {"betrag_eur": [400, 4000]}}, {"id": "E13_ust_zahllast", "einheit": 13, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 3520, Haben 2800", "variierbar": {"betrag_eur": [200, 5000]}}, {"id": "E14_pkw_betrieb", "einheit": 14, "beleggruppe": "S", "belegtyp": "Kartenbeleg", "fix": "Benzin/Diesel-Pkw: Soll 7320 mit Brutto, keine VSt; Haben 3190 bei Firmen-Debitkarte (oder 2800 bei Überweisung)", "variierbar": {"brutto_eur": [36, 240], "fahrzeug": "Pkw Benzin oder Diesel, nicht Elektro", "zahlungsweg_twist": "Bank statt Karte → B/2800"}}, {"id": "E14_lkw_betrieb", "einheit": 14, "beleggruppe": "S", "belegtyp": "Kartenbeleg", "fix": "Soll 7330 + 2500, Haben 3190 (oder 2800)", "variierbar": {"netto_eur": [50, 400], "ust_satz": [20], "fahrzeug": "Lkw"}}, {"id": "E14_versicherung", "einheit": 14, "beleggruppe": "B", "belegtyp": "Kontoauszug", "fix": "Soll 7320 (Pkw) oder 7330 (Lkw) brutto, Haben 2800; keine VSt (Versicherung mit mot. VSt)", "variierbar": {"betrag_eur": [200, 1800], "fahrzeug": "Pkw Benzin/Diesel oder Lkw, nicht Elektro"}}, {"id": "E15_lkw_kauf", "einheit": 15, "beleggruppe": "ER", "belegtyp": "Eingangsrechnung", "fix": "Soll 0640 + 2500, Haben 2800 (wie Trainer E15-04 und E15-11, Rechnung bereits per Überweisung bezahlt). Kein neues Personenkonto für Autohaus Spurweite GmbH, nicht 3300, keine zweistufige ER, solange Spurweite nicht im Kontenplan steht.", "variierbar": {"netto_eur": [20000, 60000], "ust_satz": [20]}, "verboten_zusaetzlich": "Pkw-Kauf (NoVA und fehlender VSt-Abzug), Elektro-Pkw, Anmeldekosten, GWG-Nähe", "zahlungsweg": "bank"}, {"id": "E16_material_verbrauch", "einheit": 16, "beleggruppe": "ER", "belegtyp": "Eingangsrechnung", "fix": "Sofort Aufwand 5340 / 5450 / 7240 / 7280 / 7600 plus 2500. Haben 33050, 2800 oder 2700. Nicht 5000 – Weiterverkauf ist der eigene Typ E16_material_weiterverkauf und nur bei ausdrücklichem Hinweis in der Angabe.", "variierbar": {"netto_eur": [15, 600], "ust_satz": [20], "konto_aufwand": ["5340", "5450", "7240", "7280", "7600"], "zahlungsweg_twist": "bar → K/2700; Karte → S/3190; Bank → B/2800"}}, {"id": "E16_material_weiterverkauf", "einheit": 16, "beleggruppe": "ER", "belegtyp": "Eingangsrechnung", "fix": "Nur wenn die Angabe ausdrücklich sagt, dass die Ware unverändert weiterverkauft wird: Soll 5000 + 2500, Haben 33050 (oder 2700/2800). Nie stillschweigend oder anteilig.", "variierbar": {"netto_eur": [15, 600], "ust_satz": [20], "partner": "33050"}}, {"id": "E17_inventur", "einheit": 17, "beleggruppe": "ohne", "belegtyp": "Inventurliste (Anfangs- und Endbestand)", "fix": "Nur Differenz. Vermehrung: Soll Vorrat, Haben Aufwand. Verminderung: Soll Aufwand, Haben Vorrat. Paare 1340/5340, 1360/7240, 1364/7280, 1370/5450, 1390/7600", "variierbar": {"anfang_eur": [100, 3000], "ende_eur": [100, 3000], "material": ["Verpackung", "Heizöl", "feste Brennstoffe", "Reinigung", "Büromaterial"]}}], "beleg_schema": {"description": "Vorschlag für einen generierten Geschäftsvorfall. loesung.seite ist Soll oder Haben, Soll-Zeilen stehen vor Haben-Zeilen.", "required": ["geschaeftstyp_id", "einheit", "wir", "beleggruppe", "belegtyp", "datum", "loesung"], "properties": {"geschaeftstyp_id": "string, aus geschaeftstypen.id", "einheit": "1–17", "wir": {"name": "string", "adresse": "string", "uid": "string", "branche": "string"}, "partner": {"name": "string", "konto": "string|null", "adresse": "string", "uid": "string"}, "beleggruppe": "K | B | ER | AR | S | K+B | ohne", "belegtyp": "Eingangsrechnung | Ausgangsrechnung | Kassabeleg | Kartenbeleg | Kontoauszug | Bankabrechnung | Gutschrift | Mahnung | Zahlungsaufforderung | Inventurliste", "datum": "TT.MM.JJJJ", "zahlungsweg": "ziel | bar | bank | kreditkarte | debitkarte", "ust_satz": "20 | 10 | 0", "positionen": [{"bezeichnung": "string", "menge": "number", "einzelpreis": "number"}], "netto": "number", "ust": "number", "brutto": "number", "rksv_qr": "nur bei Kassabeleg/Kartenbeleg mit Kassa, Zeichenkette nicht als Klartext auf dem Beleg", "twist": "null oder genau ein erlaubter Zahlungsweg-Twist", "loesung": [{"seite": "Soll|Haben", "konto": "string", "bezeichnung": "string", "betrag": "number"}], "gedankengang": {"was_passiert": "string", "konten": "string", "art_zu_abgang": "string", "steuer": "string", "beleggruppe": "string", "begruendung": "string"}}}, "hausuebung": {"anzahl_faelle": [3, 4], "aehnlichkeit": "Gleicher Geschäftstyp wie der gerade geübte (gleiche Kontenlogik). Variierbar nur nach geschaeftstypen.variierbar und den globalen Regeln.", "twist": "Maximal ein Twist in der gesamten Hausübung, nicht pro Fall stapeln. Ohne Twist ist der Normalfall. Twist nur aus zahlungsweg_twist des Typs.", "option_belege": ["mit_belegen", "nur_text"], "belege_regeln": "Realistisch, keine Erklärtexte auf dem Beleg. Kassabelege mit RKSV-QR, ohne Strichcode, ohne Klartext der Codezeichenkette. Bank, Rechnung, Vorschreibung, Inventur ohne QR.", "ausgabe": {"schuelerblatt": "Angabe, optional Namensfeld, unter jedem Fall freier Platz, keine vorgedruckten Ausfüllzeilen, Fälle nicht über Seitengrenzen reißen", "musterloesung": "Getrennte Datei, ohne Namensfeld, Lösung und kurzer Gedankengang in #002060, Spiegel-Reihenfolge der Fälle"}, "variation": "Beträge im erlaubten Bereich, typisch 30–70 % Abstand zum Übungsfall, nicht identisch und kein glattes Vielfaches. Partner aus dem Pool, möglichst nicht in allen Fällen derselbe. Datum verschieben. Personenkonten unverändert zum Partner.", "verboten": "Die globale Verboten-Liste gilt unverändert.", "ein_betrieb": true, "punkte_auf_dem_blatt": "Keine irreführende Höchstpunkte-Zahl (nicht die Fallanzahl als Punkte). Punkte sind bei der Hausübung optional; wenn angegeben, dann nach dem Buchungs-Algorithmus (2 P Konten/Seiten + 1 P je Betrag) und als ganze Zahlen.", "rundung": "Menge × Einzelpreis muss exakt die Positions- bzw. Listensumme ergeben, davon Rabatt und Steuer.", "gedankengang_schritt_3": "Art (Aktiv/Passiv/Aufwand/Ertrag) und Zu-/Abgang → Soll/Haben ausformulieren, nicht nur „wie ein normaler Einkauf“."}, "schriftliche_wiederholung": {"skill": "schriftliche-wiederholung-a4", "format": {"seite": "A4, möglichst eine Seite, Ränder 1,5–1,8 cm, Calibri 11", "dauer_minuten": 10, "punkte_gesamt": 15, "keine_bruchpunkte": true, "leerzeile_zwischen_aufgaben": true, "keine_vorgedruckten_antwortlinien": true, "angabe": "Badge ANGABE, Titel, Thema, leere Felder Schule/Klasse/Datum, Nachname und Vorname nur auf der Angabe, erreichte Punkte/Note; Punkte je Aufgabe frei oder vom Nutzer gesetzt", "loesung": "Badge LÖSUNG, Spiegel-Layout (gleiche Reihenfolge, gleiche Zeilen), ohne Namensfelder, Lösungstext #002060", "eine_seite": "Angabe und Lösung je möglichst genau eine A4-Seite; Gesamtpunkte stehen auf derselben Seite, nicht allein auf einer Folgeseite.", "kein_doppeltes_buche": "Die Anweisung „Buche.“ erscheint einmal pro Aufgabe.", "ein_betrieb": "Genau ein „Wir sind …“ für das ganze Blatt."}, "inhalt_pflicht": "Genau 3 ähnliche Geschäftsfälle mit anderen Zahlen und anderen Partnernamen.", "optionen": {"einheiten_mischen": "letzte 2 oder letzte 3 Einheiten", "verstaendnisfragen": "0, 2 oder 3 kurze Verständnis- oder MC-Items (keine langen Freitexte). Die Zahl bestimmt das Punkteprofil eindeutig.", "gruppen": "1 oder 2 Gruppen"}, "punktealgorithmus": {"buchungssatz": "2 Punkte für richtige Konten und Seiten (Soll vor Haben, Personenkonto statt Sammelkonto). Dazu 1 Punkt je korrekter gerechneter Zahl. Keine gerechnete Zahl unter 1 Punkt. Betragspunkte werden nie gekürzt.", "verstaendnis_oder_mc": "1 Punkt je Item, kein Abzug bei falscher MC-Wahl", "summe": "Genau 15 ganze Punkte. Das Profil folgt zwingend aus der Zahl der Verständnis-/MC-Fragen."}, "profile": [{"id": "A", "verstaendnis": 0, "buchungen": "3 Steuerfälle à (2 Konten + 3 Beträge)", "punkte": "0 + 5+5+5 = 15", "wann": "0 Zusatzfragen, keine Skonto-Einheit oder Skonto nicht gewählt"}, {"id": "B", "verstaendnis": 3, "buchungen": "3 Zweizeiler à (2 Konten + 2 Beträge)", "punkte": "3×1 + 4+4+4 = 15", "wann": "Lehrkraft wählt 3 Verständnis-/MC-Fragen"}, {"id": "C", "verstaendnis": 0, "buchungen": "1 Skonto (2+4), 1 Steuerfall (2+3), 1 Zahlung ohne Abzug (2+2)", "punkte": "6+5+4 = 15", "wann": "0 Zusatzfragen und E8 oder E9 ist unter den gewählten Einheiten"}, {"id": "D", "verstaendnis": 2, "buchungen": "1 Steuerfall (2+3) + 2 Zweizeiler à (2+2)", "punkte": "2×1 + 5+4+4 = 15", "wann": "Lehrkraft wählt 2 Verständnis-/MC-Fragen"}], "mischlogik": {"gewichtung": "Die neueste gewählte Einheit stellt mindestens 2 der 3 Buchungsfälle.", "keine_twist_doppelung": "In einer WH höchstens ein Zahlungsweg-Twist insgesamt, bevorzugt keiner (WH bleibt grundlegend und eindeutig).", "aehnlichkeit": "Gleiche oder nahe Geschäftstypen; keine drei Schwierigkeitsstufen in einer Arbeit.", "variation": "Andere Beträge, Partner, Belegnummern und Daten; Kontenlogik fix; keine verbotenen Fälle.", "ein_betrieb": true}, "gruppen": {"gleichwertigkeit": "Gleiche Aufgabenfolge, gleiche Typen, gleiche Punkte je Aufgabe, gleicher Steuersatz und gleiche Beleggruppe je Position.", "unterschied": "Andere Beträge (kein einfaches Vielfaches, das Abschreiben erleichtert), andere Partner, andere Daten und Belegnummern.", "dateien": "Je Gruppe Angabe und Lösung (bei 2 Gruppen also 4 Dateien), jede Angabe möglichst eine A4-Seite."}, "fragentypen": [{"typ": "Buchungssatz", "beispiel": "Wir sind Ohmreich Elektrofachhandel GmbH, Elektronikhandel. ER von Schallkern: 12 Stück, 150,00 € netto + 20 % USt, auf Ziel. Buche.", "bewertung": "2 P Konten/Seiten, 1 P je Betrag (z. B. 1.800,00 / 360,00 / 2.160,00)."}, {"typ": "Verständnis (Stichwort)", "beispiel": "Warum steht die Vorsteuer im Soll?", "erwartung": "Aktiv-Zugang: Forderung an das Finanzamt.", "bewertung": "1 P"}, {"typ": "Multiple Choice", "beispiel": "Ein Kunde zahlt mit Debitkarte. Welches Sollkonto? a) 2700 Kassa  b) 2800 Bank  c) 2885 Forderungen Debitkarten  d) 2880 Forderungen Kreditkartenunternehmen", "erwartung": "c", "bewertung": "1 P, genau eine richtige Option, ein fachlich typischer Ablenker muss enthalten sein."}, {"typ": "Zuordnen", "beispiel": "Begriffe zu Konten: Habenzinsen – 8050; KESt – 9600; Bankspesen – 7790; Sollzinsen – 8310.", "bewertung": "1 P je richtiger Zuordnung; Anzahl so wählen, dass 15 Punkte insgesamt halten."}, {"typ": "kurze Lücke", "beispiel": "Die Beleggruppe bei Kartenzahlung ist ____.", "erwartung": "S", "bewertung": "1 P"}], "profile_verfuegbarkeit": {"regel": "Ein Profil wird nur angeboten, wenn die gewählten Einheiten die nötigen Falltypen hergeben. Zweizeiler (2 Konten + 2 Beträge, 4 P) werden nicht aus einer nicht gewählten Nachbareinheit geholt. Die Gewichtung „neueste Einheit mindestens 2 von 3 Buchungsfällen“ bleibt unberührt.", "A": "Immer, sobald drei Steuerfälle (je 3 Beträge) in den gewählten Einheiten möglich sind.", "C": "Nur wenn E8 oder E9 zu den gewählten Einheiten gehört und die restlichen Fälle (Steuerfall, Zahlung ohne Abzug) ebenfalls aus den gewählten Einheiten kommen, mit Gewichtung der neuesten Einheit.", "B_und_D": "Nur wenn unter den gewählten Einheiten genug Zweizeiler-Typen liegen (z. B. E6, E7_karteneingang_ohne_gebuehr, E7_firmenkarte_ausgleich, E11, E13, E12_bankspesen/sollzinsen). Reine Steuer-Einheiten wie nur E5: Profil B und D nicht anbieten. Die Lehrkraft nutzt dann Profil A (0 Verständnisfragen) oder nimmt eine Zahlungs-Einheit hinzu."}}, "aenderungen_gegenueber_v1": ["Neue Typen: E5_sofortrabatt_verkauf, E7_karteneingang_ohne_gebuehr, E7_firmenkarte_ausgleich, E7_kartengebuehr_gesondert, E16_material_weiterverkauf, E12_kest_allein.", "E11: ein Fall = ein Beleg / ein Satz (Hälfte K oder B), wie im Trainer; beide Hälften höchstens als zwei aufeinanderfolgende Fälle.", "E15 Lkw-Kauf: Haben 2800 wie E15-11, kein erfundenes Personenkonto.", "E16: Standard ist Verbrauch; Weiterverkauf (5000) nur als eigener Typ, kein Mengenanteil.", "Punkteprofile A/B/C/D, jede Lehrer-Option (0, 2 oder 3 Verständnisfragen) ergibt genau 15 ganze Punkte.", "Datumsfenster und Belegnummern-Schema fest gelegt.", "Kontoblätter starten bei 0, sofern Stefan keine Eröffnungsbestände vorgibt.", "Rundung: zuerst Menge × Einzelpreis, davon Rabatt und Steuer; Positionszeile muss aufgehen.", "Eine Hausübung / WH hat genau ein „Wir sind …“ (ein Betrieb).", "Angabe muss alle entscheidenden Sachverhalte enthalten (z. B. „Ware bleibt beim Kunden“)."], "e11_regel": {"ein_fall": "ein Beleg, ein Satz", "begruendung": "Im Trainer (E11-01 bis E11-11 und Kernsätze) wird jeder Beleg für sich über 2870 gebucht.", "hausuebung": "Optional zwei aufeinanderfolgende Fälle (K und B, gleicher Betrag)."}, "e15_regel": {"haben": "2800", "wie_trainer": ["E15-04", "E15-11"], "aussteller": "Autohaus Spurweite GmbH (kein Personenkonto im Kontenplan v3)", "nicht": "kein erfundenes Personenkonto, nicht 3300, keine zweistufige ER ohne Kontenplan-Erweiterung"}, "e16_regel": {"standard": "Verbrauch (E16_material_verbrauch). Kein Anteil Weiterverkauf.", "weiterverkauf": "Nur Typ E16_material_weiterverkauf, und nur wenn die Angabe ausdrücklich sagt, dass die Ware unverändert weiterverkauft wird (wie E16-07)."}, "datum_und_nummern": {"fenster": "01.09.2026–30.11.2026, bevorzugt Werktage", "ausnahmen": {"inventur_ende": "31.12.2026", "inventur_anfang": "31.12.2025 (Vorjahr)", "bankabrechnung": "Quartalsultimo 31.03., 30.06., 30.09. oder 31.12.2026"}, "konsistenz": "Leistungsdatum ≤ Rechnungsdatum; Zahlung nicht vor Rechnung; Skontozahlung in der vereinbarten Frist; innerhalb einer Hausübung/WH verschiedene Daten, alle im Fenster.", "belegnummern": {"ER": "SK-26-##### (fünf Ziffern, eindeutig im Dokument)", "AR": "{WirKuerzel}-2026-#####, z. B. MM-2026-03520", "Gutschrift": "GS-2026-#####", "Kassabeleg_Kartenbeleg": "K{nn}-2026-######", "Kontoauszug": "{laufnr}/2026, laufnr 10–99", "Bankabrechnung": "KA-2026-Q{1-4}-####", "Mahnung": "M-####-2026", "Zahlungsaufforderung": "typischer Behördenstil, z. B. GRST-2026-######", "Inventur": "INV-2026-## bzw. INV-2025-##"}, "eindeutig": "Keine Nummer doppelt in demselben Dokument oder derselben Generierung."}, "kontoblaetter": {"anfangsbestand": 0, "begruendung": "Die Kontoblätter zeigen nur die in der Sitzung übernommenen Sätze. Im Trainer sind keine Eröffnungsbestände hinterlegt; erfundene Salden wären nicht belegbar und verwirren Schwächere.", "ausnahme": "Inventur nutzt ihre eigenen Vorjahres-Endbestände, das sind keine Kontoblatt-Eröffnungen.", "stefan_kann": "Plausible feste Eröffnungen (z. B. Bank, Kassa) nachträglich vorgeben; bis dahin Startsaldo 0."}, "ein_betrieb_pro_blatt": "Eine Hausübung und eine schriftliche Wiederholung haben genau ein „Wir sind …“ (ein Betrieb) für alle Fälle. Partner dürfen wechseln, müssen aber zur Branche passen.", "angabe_vollstaendig": "Die Angabe muss alle Sachverhalte enthalten, die die Kontenwahl entscheiden (z. B. Sofortrabatt mit Listenpreis und Prozentsatz; nachträglicher Nachlass und „Ware bleibt beim Kunden“; Zahlung in der Skontofrist; K oder B bei E11). Die Lösung darf keine Fakten nachliefern, die auf der Angabe fehlen. Bei Kontoauszügen muss der Geschäftsfall erkennbar sein (z. B. „Karteneingang Debitkarte ohne Gebühr“, „Zahlung an Nadelstrom per Bank“), nicht nur Bankname und Betrag.", "mapping_datei": "BEMA_Mapping_Traineraufgaben_v2.md bzw. .json", "aenderungen_gegenueber_v2": ["Profile B und D nur anbieten, wenn die gewählten Einheiten genug Zweizeiler enthalten. In einer reinen Steuer-Einheit (z. B. nur E5) nicht anbieten; nicht aus einer Nachbareinheit ausleihen.", "E7_eigene_firmenkarte: Soll immer 5000 + 2500 (Handelsware, wie E7-06/08/14). Treibstoff ist E14 (7320/7330), Paketporto E4 (7310/7311).", "Keine neuen Personenkonten. Handelswaren-Fälle: Betrieb immer Ohmreich Elektrofachhandel GmbH, bestehende Konten 33010/33020 und 20010/20020/20030.", "Fragentyp Zuordnen erst in einer späteren Stufe; Legenden dann kurz."], "e7_firmenkarte_soll": {"konto": ["5000", "2500"], "quelle": "Trainer E7-06, E7-08, E7-14 und Kontenplan v3", "andere_aufwendungen": {"7320": "Pkw- und Kombi-Betriebsaufwand, nur E14, beim Benziner/Diesel ohne Vorsteuerabzug", "7330": "Lkw-Betriebsaufwand, nur E14, mit Vorsteuer 2500", "7310": "Paketgebühren 20 %, nur E4", "7311": "Paketgebühren 0 %, nur E4"}}, "wir_und_personenkonten": {"keine_neuen_personenkonten": true, "begruendung": "Personenkonten sind trainer-spezifisch und stehen fest im Kontenplan v3. Neue Nummern (etwa 33060, 20040) wären erfunden und sind unzulässig, solange sie nicht offiziell in den Kontenplan aufgenommen werden.", "handelswaren": {"wir": "Ohmreich Elektrofachhandel GmbH, Elektronikhandel", "lieferanten": ["33010 Nadelstrom Elektronik Großhandel GmbH", "33020 Schallkern Audio GmbH"], "kunden": ["20010 Kammfeder Fitness e.U.", "20020 Atemweide Yoga & Pilates e.U.", "20030 Innquell Möbelmanufaktur GmbH"], "einheiten": "E1, E2, E5, E7 (Kundenkarte und Wareneinkauf mit Firmenkarte), E8, E9"}, "andere_wir_nur_wenn_passend": ["Gipfelgriff Sport plus 33050 Kammerstapel in E16 (Verbrauchsmaterial)", "Innquell nur als Kunde 20030, nicht als Lieferant (kein Lieferantenkonto)", "Gipfelgriff und Innquell nicht als Lieferanten ohne Personenkonto verwenden"], "ein_betrieb_pro_blatt": true}, "zuordnen": {"stufe": "spaeter", "jetzt": "Nein. Zuerst Buchungssätze und Verständnis/MC nach den Profilen A–D stabil halten.", "spaeter": "Optional, 1 Punkt je richtiger Zuordnung, Anzahl so dass 15 Punkte und eine A4-Seite halten. Legenden kurz (Stefan-Regel)."}, "preisspannen": {"quelle": "RW-Antwort zu v4, 2026-11-21 (auf v3-Preisliste und v4-Rahmen)", "stueckpreise_netto_eur": {"Fernseher": [400, 1500], "Kopfhoerer": [40, 300], "Smartphone": [200, 900], "Laptop": [400, 1500], "Zubehoer_Kabel": [5, 40], "Spielkonsole": [300, 550], "Lautsprecher": [50, 400]}, "stueckpreis_glatt_eur": 0.5, "menge_pro_zeile": [2, 30], "rechnungssumme_netto_er_ar_eur": [300, 20000], "bar_summe_netto_eur": [20, 400], "bar_warenarten": ["Zubehoer_Kabel", "Kopfhoerer", "Lautsprecher"], "bar_regel": "Bar nur 20–400 € netto gesamt. Zulässig: Zubehör, Kabel, Kopfhörer und Lautsprecher, sofern die Gesamtsumme ≤ 400 € netto bleibt. Wenn 2 × Stückpreis den Bar-Rahmen sprengt, die Ware für Bar nicht verwenden. Fernseher, Smartphones, Laptops und Spielkonsolen nur auf Ziel (ER) oder per Bank.", "gutschrift": {"min_netto_eur": 20, "darf_unter_er_ar_minimum_liegen": true, "regel": "Gutschriften dürfen unter 300 € liegen. Sie müssen kleiner als die Ursprungsrechnung sein und mindestens 20 € netto betragen."}}, "aenderungen_gegenueber_v3": ["Bar nur für günstige Ware (Zubehör, Kabel, Kopfhörer), Summe 20–400 € netto. Den Bar-Rahmen bis 2.500 € wieder entfernen. Fernseher und andere teure Geräte nur auf Ziel (ER) oder per Bank.", "Verbindliche Netto-Stückpreise glatt auf 0,50 € in preisspannen.stueckpreise_netto_eur. Menge pro Zeile 2–30. Rechnungssumme netto bei ER/AR 300–20.000 €. Wenn 2 × Stückpreis den Bar-Rahmen sprengt, die Ware für Bar nicht verwenden."], "aenderungen_gegenueber_v4": ["Lautsprecher dürfen bar gekauft werden, solange die Gesamtsumme ≤ 400 € netto bleibt.", "Gutschriften dürfen unter 300 € liegen: kleiner als die Ursprungsrechnung und mindestens 20 € netto.", "Laptop bleibt nur im Verkauf, keine neuen Lieferanten. Eigene Spannen für E16 und den Eigenverbrauch bleiben."]};
window.BEMA_FRAGEN = {"quelle": "BEMA_Lehrerversion_Konzept_v1.docx / build_bema_konzept_v1.py FRAGEN", "datum": "2026-11-21", "stufen": ["einstieg", "vertiefung", "transfer"], "kapitel": [{"einheit": 1, "titel": "E 1  Einkauf, Rücksendung", "einstieg": [{"frage": "Woran erkennst du eine Eingangsrechnung?", "erwartung": "Der Lieferant stellt uns die Rechnung; wir sind Empfänger."}, {"frage": "Wohin gehört der Nettobetrag beim Wareneinkauf?", "erwartung": "Soll 5000 Handelswareneinsatz; dazu 2500 Vorsteuer."}], "vertiefung": [{"frage": "Warum nicht 3300, sondern z. B. 33020?", "erwartung": "3300 ist Sammelkonto; gebucht wird das Personenkonto des Lieferanten."}, {"frage": "Warum dreht sich der Satz bei einer Rücksendung um?", "erwartung": "Ware und Vorsteuer gehen zurück, die Schuld beim Lieferanten sinkt."}], "transfer": [{"frage": "Dieselbe Rechnung, aber bar bezahlt: Was ändert sich?", "erwartung": "Haben 2700 Kassa statt Lieferant; Beleggruppe K."}, {"frage": "Neue ER, anderer Lieferant, 20 %: Welches Haben-Konto?", "erwartung": "Neues vorhandenes Personenkonto unter 3300, niemals 3300 selbst."}]}, {"einheit": 2, "titel": "E 2  Verkauf, Rücksendung", "einstieg": [{"frage": "Was steht im Haben beim Verkauf auf Ziel?", "erwartung": "4000 Handelswarenerlöse 20 % und 3500 Umsatzsteuer."}, {"frage": "Wohin buchst du den Barverkauf im Soll?", "erwartung": "2700 Kassa."}], "vertiefung": [{"frage": "Warum steht die Umsatzsteuer im Haben?", "erwartung": "Wir schulden sie dem Finanzamt (Passiv, Zugang)."}, {"frage": "Eigenverbrauch: welches Sollkonto?", "erwartung": "9600 Privat; Haben 4900 und 3500."}], "transfer": [{"frage": "Kunde zahlt mit Debitkarte statt bar: Sollkonto und Beleggruppe?", "erwartung": "2885 Forderungen Debitkarten, Beleggruppe S."}, {"frage": "Rücksendung des Kunden: was passiert mit dem Verkaufssatz?", "erwartung": "Er kehrt sich um (4000, 3500, Kundenkonto)."}]}, {"einheit": 3, "titel": "E 3  Bezugskosten", "einstieg": [{"frage": "Wann entstehen Bezugskosten?", "erwartung": "Beim Einkauf, auf dem Weg der Ware zu uns (Fracht, Zoll, Transportversicherung)."}, {"frage": "Wie wird die Speditionsrechnung typisch gebucht?", "erwartung": "Wie ein Warenkauf: Soll 5000 + 2500, Haben Spediteur."}], "vertiefung": [{"frage": "Warum 5000 und nicht 7300?", "erwartung": "Bezugskosten gehören zum Einkauf und erhöhen den Wareneinsatz; 7300 ist Versand beim Verkauf."}, {"frage": "Bar an den Frächter: Haben und Beleggruppe?", "erwartung": "2700, Beleggruppe K."}], "transfer": [{"frage": "Neue ER Tauernlogistik, 20 %, auf Ziel: Muster?", "erwartung": "Soll 5000 + 2500, Haben 33030."}, {"frage": "Dieselbe Fracht, aber wir schicken Ware zum Kunden: noch Bezugskosten?", "erwartung": "Nein, dann Versandkosten (E 4)."}]}, {"einheit": 4, "titel": "E 4  Versandkosten", "einstieg": [{"frage": "Unterschied Bezugskosten und Versandkosten?", "erwartung": "Bezug = Weg zu uns (Einkauf); Versand = Weg zum Kunden (Verkauf)."}, {"frage": "Paket unter 10 kg: Konto und Steuer?", "erwartung": "7311 Paketgebühren 0 %, keine Vorsteuer."}], "vertiefung": [{"frage": "Warum 7300 und nicht 5000?", "erwartung": "Die Fracht gehört zum Verkauf, nicht zum Wareneinkauf."}, {"frage": "Paket über 10 kg?", "erwartung": "7310 Paketgebühren 20 % mit Vorsteuer."}], "transfer": [{"frage": "Neue Speditionsrechnung Wachaustern auf Ziel?", "erwartung": "Soll 7300 + 2500, Haben 33040."}, {"frage": "Dieselbe Leistung bar an der Postannahme?", "erwartung": "Haben 2700, Beleggruppe K."}]}, {"einheit": 5, "titel": "E 5  Rabatte", "einstieg": [{"frage": "Sofortrabatt: welcher Betrag wird gebucht?", "erwartung": "Nur das Netto nach Rabatt; der Rabatt steht schon auf der Rechnung."}, {"frage": "Nachträglicher Rabatt vom Lieferanten: grober Satz?", "erwartung": "Soll Lieferant, Haben 5000 und 2500."}], "vertiefung": [{"frage": "Warum wird die Steuer mitkorrigiert?", "erwartung": "Die Bemessungsgrundlage sinkt; Vorsteuer bzw. Umsatzsteuer muss folgen."}, {"frage": "Ware bleibt beim Kunden: 4400 oder 4000?", "erwartung": "4400 Erlösberichtigungen (keine Rücksendung)."}], "transfer": [{"frage": "Gutschrift an den Kunden über 20 %: Satz?", "erwartung": "Soll 4400 + 3500, Haben Kundenkonto."}, {"frage": "Neuer Sofortrabatt 10 % auf einer ER: extra Rabattkonto?", "erwartung": "Nein, nur den Nettobetrag nach Rabatt buchen."}]}, {"einheit": 6, "titel": "E 6  Zahlung per Banküberweisung", "einstieg": [{"frage": "Lieferant wird voll bezahlt: Satz?", "erwartung": "Soll Lieferantenkonto, Haben 2800 Bank."}, {"frage": "Kundenzahlung ohne Abzug: Satz?", "erwartung": "Soll 2800, Haben Kundenkonto."}], "vertiefung": [{"frage": "Warum keine Steuerbuchung?", "erwartung": "Die Steuer war schon auf der Rechnung; ohne Abzug ändert sich nichts."}, {"frage": "Minusbetrag auf dem Kontoauszug: wer zahlt?", "erwartung": "Wir zahlen (Überweisung/Abbuchung, typisch an den Lieferanten)."}], "transfer": [{"frage": "Neuer Auszug, Eingang von Atemweide über den vollen Betrag?", "erwartung": "Soll 2800, Haben 20020."}, {"frage": "Dieselbe Schuld, aber mit Skonto: welches Kapitel?", "erwartung": "E 8, nicht mehr dieser einfache Satz."}]}, {"einheit": 7, "titel": "E 7  Kartenzahlung", "einstieg": [{"frage": "Kunde zahlt mit Kreditkarte: Sollkonto?", "erwartung": "2880 (Debitkarte: 2885), nicht 2700."}, {"frage": "Wir zahlen mit der Firmen-Debitkarte: Haben?", "erwartung": "3190 (Firmen-Kreditkarte: 3180)."}], "vertiefung": [{"frage": "Warum nicht die Kassa?", "erwartung": "Das Geld ist nicht bar in der Kassa; die Kartenfirma schuldet uns oder wir ihr."}, {"frage": "Kartengebühr beim Geldeingang: Konto?", "erwartung": "7792 plus Vorsteuer (Vereinfachung wie im Trainer)."}], "transfer": [{"frage": "Neuer Verkauf, Kunde zahlt Debitkarte, 20 %: Satz und Beleggruppe?", "erwartung": "Soll 2885, Haben 4000 + 3500, Beleggruppe S."}, {"frage": "Späterer Auszug: Eingang abzüglich Gebühr. Muster?", "erwartung": "Soll 2800 + 7792 + 2500, Haben 2880 bzw. 2885."}]}, {"einheit": 8, "titel": "E 8  Lieferantenskonto", "einstieg": [{"frage": "Wovon rechnest du den Skonto?", "erwartung": "Vom Bruttobetrag der Rechnung."}, {"frage": "Welche drei Haben-Positionen?", "erwartung": "5880 Lieferantenskonti, 2500 Vorsteuer (Korrektur), 2800 Bank."}], "vertiefung": [{"frage": "Warum wird die Vorsteuer korrigiert?", "erwartung": "Die Ware wird durch den Skonto billiger."}, {"frage": "Welcher Betrag steht im Soll?", "erwartung": "Der volle Rechnungsbetrag auf dem Lieferantenkonto."}], "transfer": [{"frage": "Neue Zahlung 2 % Skonto, 20 %: Rechenweg?", "erwartung": "Skonto brutto = Rechnungsbetrag × 0,02, dann durch 1,20 in Netto und Vorsteuer."}, {"frage": "Zahlung nach der Frist: Skonto?", "erwartung": "Nein, wie E 6 ohne Abzug."}]}, {"einheit": 9, "titel": "E 9  Kundenskonto", "einstieg": [{"frage": "Was steht im Soll außer der Bank?", "erwartung": "4410 Kundenskonti 20 % und 3500 Umsatzsteuer (Korrektur)."}, {"frage": "Was steht im Haben?", "erwartung": "Das Kundenkonto mit dem vollen Rechnungsbetrag."}], "vertiefung": [{"frage": "Warum schulden wir weniger Umsatzsteuer?", "erwartung": "Wir bekommen weniger Entgelt, die Bemessungsgrundlage sinkt."}, {"frage": "Kunde zahlt nach der Frist: Skonto?", "erwartung": "Keiner; voller Eingang wie E 6."}], "transfer": [{"frage": "3 % Skonto, 20 %, Kunde Innquell: Muster?", "erwartung": "Soll 2800 + 4410 + 3500, Haben 20030."}, {"frage": "Der Auszug zeigt den gekürzten Eingang: was prüfst du zuerst?", "erwartung": "Zahlungsdatum gegen die Skontofrist."}]}, {"einheit": 10, "titel": "E 10  Verzugszinsen und Mahnspesen", "einstieg": [{"frage": "Haben Mahnspesen Umsatzsteuer?", "erwartung": "Nein, weder Mahnspesen noch Verzugszinsen."}, {"frage": "Wir mahnen den Kunden: Satz?", "erwartung": "Soll Kundenkonto, Haben 4890 Mahnspesenvergütungen."}], "vertiefung": [{"frage": "Ein Lieferant mahnt uns: welches Aufwandskonto?", "erwartung": "8321 Mahnspesen (Verzugszinsen: 8320)."}, {"frage": "Warum kein Konto 3500?", "erwartung": "Im Trainer nicht steuerbar / ohne Umsatzsteuer."}], "transfer": [{"frage": "Neue Mahnung an Kammfeder, 15 € Spesen: Satz?", "erwartung": "Soll 20010, Haben 4890."}, {"frage": "Verzugszinsen, die wir zahlen: Satz?", "erwartung": "Soll 8320, Haben Lieferantenkonto."}]}, {"einheit": 11, "titel": "E 11  Barverkehr mit Banken", "einstieg": [{"frage": "Welches Zwischenkonto wird verwendet?", "erwartung": "2870 Barverkehr mit Banken."}, {"frage": "Wie viele Belege hat eine Bareinzahlung?", "erwartung": "Zwei: Kassabeleg und Kontoauszug, jeder wird einzeln gebucht."}], "vertiefung": [{"frage": "Warum nicht direkt 2800 an 2700 auf einem Beleg?", "erwartung": "Jeder Beleg wird für sich gebucht; 2870 gleicht sich danach aus."}, {"frage": "Barbehebung, nur der Kassabeleg: Satz?", "erwartung": "Soll 2700, Haben 2870."}], "transfer": [{"frage": "Neue Bareinzahlung 400 €: beide Sätze?", "erwartung": "K: 2870 an 2700; B: 2800 an 2870."}, {"frage": "Nur der Kontoauszug liegt vor: was buchst du nicht?", "erwartung": "Nicht die Kassa; nur den Bankbeleg über 2870."}]}, {"einheit": 12, "titel": "E 12  Bankabschluss", "einstieg": [{"frage": "Habenzinsen brutto: welches Haben-Konto?", "erwartung": "8050 Zinsenerträge aus Bankguthaben."}, {"frage": "Bankspesen: Vorsteuer?", "erwartung": "Nein, 7790 ohne Vorsteuer."}], "vertiefung": [{"frage": "Warum KESt auf 9600 Privat?", "erwartung": "Die KESt ist eine Steuer des Inhabers, keine Betriebssteuer."}, {"frage": "Sollzinsen: Satz?", "erwartung": "Soll 8310, Haben 2800."}], "transfer": [{"frage": "Neue Abrechnung: Habenzinsen 40 €, KESt 10 €. Satz?", "erwartung": "Soll 2800 30,00 und 9600 10,00, Haben 8050 40,00."}, {"frage": "Nur Spesen 8,50 € auf dem Auszug?", "erwartung": "Soll 7790, Haben 2800."}]}, {"einheit": 13, "titel": "E 13  Steuern", "einstieg": [{"frage": "Grundsteuer: Aufwand oder Privat?", "erwartung": "Aufwand 7100 (Betriebssteuer)."}, {"frage": "Einkommensteuer: welches Konto?", "erwartung": "9600 Privat."}], "vertiefung": [{"frage": "Wie entsteht die USt-Zahllast, wie wird sie gezahlt?", "erwartung": "Umsatzsteuer minus Vorsteuer; Zahlung Soll 3520, Haben 2800."}, {"frage": "Kammerumlage: Konto?", "erwartung": "7780."}], "transfer": [{"frage": "Neue Vorschreibung Grundsteuer, Zahlung per Bank?", "erwartung": "Soll 7100, Haben 2800."}, {"frage": "Grunderwerbsteuer auf einen Grundstückskauf: für den Generator?", "erwartung": "Nein, strittiger Fall; nicht erzeugen."}]}, {"einheit": 14, "titel": "E 14  Kfz-Betriebskosten", "einstieg": [{"frage": "Pkw (Benziner) tanken: Vorsteuer?", "erwartung": "Nein; der Bruttobetrag steht auf 7320."}, {"frage": "Lkw tanken: wo steht die Vorsteuer?", "erwartung": "Ja; Netto 7330, Steuer 2500."}], "vertiefung": [{"frage": "Warum kein Vorsteuerabzug beim Benzin-Pkw?", "erwartung": "Im Trainer gilt: Pkw/Kombi (Benzin, Diesel) ohne Vorsteuerabzug."}, {"frage": "Zahlung mit Firmen-Debitkarte: Haben und Beleggruppe?", "erwartung": "3190, Beleggruppe S (nicht K)."}], "transfer": [{"frage": "Neuer Tankhain-Bon, Lkw, Debitkarte: Satz?", "erwartung": "Soll 7330 + 2500, Haben 3190, Beleggruppe S."}, {"frage": "Dieselbe Tankung mit einem Pkw (Benziner)?", "erwartung": "Soll 7320 brutto, kein 2500."}]}, {"einheit": 15, "titel": "E 15  Kfz-Kauf", "einstieg": [{"frage": "Pkw-Kauf: Anlagekonto? Lkw-Kauf?", "erwartung": "0630 Pkw und Kombis; 0640 Lkw."}, {"frage": "USt beim Lkw-Kauf?", "erwartung": "Abziehbar: Soll 2500, Anlagekonto nur netto."}], "vertiefung": [{"frage": "USt beim Pkw (Benzin/Diesel)?", "erwartung": "Gehört zu den Anschaffungskosten, kein Vorsteuerabzug."}, {"frage": "Was gehört sonst noch zu den Anschaffungskosten?", "erwartung": "Im Trainer u. a. NoVA und Anmeldekosten – für den Generator verboten."}], "transfer": [{"frage": "Welchen Kauf darf der Generator erzeugen?", "erwartung": "Nur einen eindeutigen Lkw-Kauf mit Vorsteuer, ohne NoVA."}, {"frage": "Elektro-Pkw oder NoVA-Rechnung?", "erwartung": "Nicht generieren (strittig bzw. Ausnahme)."}]}, {"einheit": 16, "titel": "E 16  Kauf sonstiges Material", "einstieg": [{"frage": "Büromaterial, das wir selbst verbrauchen: Konto?", "erwartung": "7600, dazu 2500 Vorsteuer."}, {"frage": "Trinkflaschen, die wir weiterverkaufen?", "erwartung": "5000 Handelswareneinsatz, nicht 7600."}], "vertiefung": [{"frage": "Warum nicht schon beim Kauf das Vorratskonto?", "erwartung": "Aufwandsorientiert: Kauf ist sofort Aufwand; die Inventur (E 17) korrigiert den Bestand."}, {"frage": "Zahlung auf Ziel, bar oder per Bank: was ändert sich?", "erwartung": "Nur das Haben: Lieferant, 2700 oder 2800; das Aufwandskonto bleibt."}], "transfer": [{"frage": "Neue ER Kammerstapel, Verpackung, auf Ziel?", "erwartung": "Soll 5340 + 2500, Haben 33050."}, {"frage": "Barer Büroeinkauf?", "erwartung": "Haben 2700, Beleggruppe K."}]}, {"einheit": 17, "titel": "E 17  Inventur und Bestandsveränderung", "einstieg": [{"frage": "Was wird gebucht?", "erwartung": "Nur die Differenz Endbestand minus Anfangsbestand, nicht der ganze Endbestand."}, {"frage": "Woher kommt der Anfangsbestand?", "erwartung": "Endbestand der Inventur vom 31.12. des Vorjahres."}], "vertiefung": [{"frage": "Vermehrung Heizöl: Satz?", "erwartung": "Soll 1360 Vorrat Heizöl, Haben 7240 Heizölverbrauch."}, {"frage": "Verminderung: welche Richtung?", "erwartung": "Aufwand an Vorrat (z. B. 5340 an 1340)."}], "transfer": [{"frage": "Verpackung: Anfang 500, Ende 800. Satz?", "erwartung": "Soll 1340 300,00, Haben 5340 300,00 (Vermehrung)."}, {"frage": "Umgekehrt Anfang 800, Ende 500?", "erwartung": "Soll 5340 300,00, Haben 1340 300,00 (Verminderung)."}]}]};
window.BEMA_DENKFRAGEN = {"Eingangsrechnung": {"einstieg": [{"frage": "Woran erkennst du auf diesem Beleg, dass es eine Eingangsrechnung ist?", "antwort": "Aussteller ist der Lieferant, Empfänger sind wir („Wir sind …“). Der Lieferant stellt uns die Rechnung."}, {"frage": "Wo siehst du Netto, USt und Brutto – und wie prüfst du die Beträge?", "antwort": "Auf der Rechnung stehen Netto, USt-Satz, USt und der Rechnungsbetrag (Brutto). Zuerst prüfen: Netto + USt = Brutto. Geht die Rechnung nicht auf, steht meist eine weitere Abgabe dabei (zum Beispiel NoVA beim Pkw) – die kommt nicht auf 2500."}, {"frage": "Ist die Rechnung schon bezahlt oder noch offen? Woran erkennst du das?", "antwort": "Das steht in den Zahlungsbedingungen. „Zahlbar innerhalb von … Tagen“ bedeutet auf Ziel (noch offen, Beleggruppe ER, Personenkonto). „Per Überweisung erhalten“ bedeutet: schon bezahlt, typischerweise Haben 2800 Bank, Beleggruppe B."}], "vertiefung": [{"frage": "Wohin buchst du den Bruttobetrag – und warum nie auf 3300?", "antwort": "Ist die Rechnung noch offen, steht der Bruttobetrag im Haben auf dem Personenkonto des genannten Lieferanten (z. B. 33010 Nadelstrom, 33020 Schallkern, 33050 Kammerstapel), weil unsere Schuld steigt. Ist sie schon per Bank bezahlt, steht im Haben 2800. 3300 ist nur das Sammelkonto und wird nicht direkt bebucht."}, {"frage": "Kommt die auf der Rechnung ausgewiesene USt automatisch auf 2500 Vorsteuer?", "antwort": "Nur wenn der Vorsteuerabzug zusteht (Handelsware, Material, Fracht, Lkw, typische Betriebsausgaben): dann Soll 2500. Beim Pkw (Benziner oder Diesel) inkl. NoVA buchst du den vollen Rechnungsbetrag auf 0630, ohne 2500."}, {"frage": "Welches Sollkonto bekommt den Nettobetrag? Woran erkennst du das auf der Rechnung?", "antwort": "An den Positionen: Handelsware zum Weiterverkauf → 5000; Versand an unsere Kunden → 7300; Material zum Verbrauch (Verpackung, Heizöl, Büromaterial) → 5340, 7240 oder 7600; Lkw → 0640; Pkw → 0630."}, {"frage": "Auf der Rechnung steht ein Sofortrabatt (Listenpreis minus Rabatt). Welcher Betrag wird gebucht?", "antwort": "Nur das Netto nach Rabatt und die USt davon. Listenpreis und Rabatt erklären die Rechnung, es gibt kein eigenes Rabattkonto.", "nur_aufgabentypen": ["E5_sofortrabatt"]}, {"frage": "Die Rechnung betrifft ein Fahrzeug und ist laut Zahlungsbedingungen schon per Überweisung bezahlt. Welcher Satz?", "antwort": "Lkw: Soll 0640 und 2500, Haben 2800. Pkw Benziner oder Diesel: Soll 0630 mit dem vollen Rechnungsbetrag (inkl. NoVA, ohne 2500), Haben 2800. Reiner Elektro-Pkw unter der Grenze: Soll 0630 (Netto) und 2500, Haben 2800.", "nur_einheiten": [15]}], "transfer": [{"frage": "In den Zahlungsbedingungen stünde die andere Variante (noch offen statt schon per Bank bezahlt, oder umgekehrt). Was ändert sich am Satz?", "antwort": "Es tauscht nur die Habenseite: Personenkonto des Lieferanten (nie 3300) gegen 2800 Bank oder umgekehrt. Netto und Vorsteuer bleiben, soweit der Vorsteuerabzug zusteht. Bei „Bar bezahlt“ wäre es 2700 und Beleggruppe K."}, {"frage": "Die Positionsart oder der Lieferant ändert sich, es bleibt eine Eingangsrechnung. Was musst du neu festlegen?", "antwort": "Das Aufwand- oder Anlagekonto passend zu den Positionen und – wenn noch offen – das Personenkonto dieses Lieferanten (nie 3300). Die Prüfung Netto/USt/Brutto und die Regel zu 2500 bleiben."}]}, "Ausgangsrechnung": {"einstieg": [{"frage": "Woran erkennst du auf diesem Beleg, dass es eine Ausgangsrechnung ist?", "antwort": "Wir sind der Aussteller, der Kunde steht als Empfänger. Wir stellen die Rechnung. Die Beleggruppe ist AR."}, {"frage": "Wo findest du Netto, USt und Brutto, und wem schulden wir die USt?", "antwort": "Wie auf jeder Rechnung: Netto + USt = Brutto. Die ausgewiesene USt schulden wir dem Finanzamt, darum steht sie im Haben auf 3500 Umsatzsteuer."}, {"frage": "Ist das Geld schon bei uns eingegangen? Woran erkennst du das?", "antwort": "Steht „zahlbar innerhalb von … Tagen“, ist der Verkauf auf Ziel und noch offen. Dann gehört der Bruttobetrag auf das Kundenkonto, nicht auf 2700 oder 2800."}], "vertiefung": [{"frage": "Welche Konten stehen typischerweise im Haben, und warum die USt dort?", "antwort": "4000 Handelswarenerlöse 20 % mit dem Netto und 3500 Umsatzsteuer mit der USt. Die USt steht im Haben, weil unsere Schuld gegenüber dem Finanzamt steigt (Passiv, Zugang)."}, {"frage": "Wohin buchst du den Bruttobetrag im Soll, und warum nicht auf 2000?", "antwort": "Auf das Personenkonto des Kunden, der als Empfänger genannt ist (z. B. 20010 Kammfeder Fitness, 20020 Atemweide, 20030 Innquell). 2000 ist das Sammelkonto und wird nicht direkt bebucht. Die Forderung ist ein Aktiv-Zugang."}, {"frage": "Auf der Ausgangsrechnung steht ein Sofortrabatt. Welcher Betrag wird gebucht?", "antwort": "Nur das Netto nach Rabatt und die USt davon. Es wird kein eigenes Rabattkonto gebucht.", "nur_aufgabentypen": ["E5_sofortrabatt_verkauf"]}], "transfer": [{"frage": "Dieselbe Lieferung, der Kunde zahlt bar. Was ändert sich?", "antwort": "Im Soll steht 2700 Kassa statt des Kundenkontos, Beleggruppe K. 4000 und 3500 bleiben im Haben."}, {"frage": "Derselbe Verkauf, der Kunde zahlt mit Debitkarte oder Kreditkarte. Welches Sollkonto und welche Beleggruppe?", "antwort": "Bei Debitkarte Soll 2885, bei Kreditkarte Soll 2880, Beleggruppe S. Nicht 2700 und nicht K, weil keine Barzahlung vorliegt."}]}, "Gutschrift": {"einstieg": [{"frage": "Wer hat die Gutschrift ausgestellt – und was bedeutet das für uns?", "antwort": "Steht unser Lieferant als Aussteller und wir als Empfänger, kommt die Gutschrift vom Lieferanten: Unsere Schuld sinkt. Stehen wir als Aussteller und der Kunde als Empfänger, haben wir die Gutschrift erteilt: Die Forderung an den Kunden sinkt."}, {"frage": "Wo siehst du, wofür die Gutschrift ist?", "antwort": "In der Positionsbezeichnung, zum Beispiel „Rücksendung“ bzw. „Rücknahme“ oder „nachträglicher Preisnachlass“ bzw. „nachträglicher Rabatt“. Oft steht auch, mit welcher Rechnung verrechnet wird."}, {"frage": "Welche Beträge musst du auf der Gutschrift prüfen?", "antwort": "Wieder Netto, USt und Brutto (Netto + USt = Brutto). Die Steuer wird immer mitkorrigiert. Der Bruttobetrag ist der verrechnete Betrag."}], "vertiefung": [{"frage": "Wie entscheidest du Soll und Haben bei einer Gutschrift?", "antwort": "Gutschrift vom Lieferanten: Soll das Lieferantenkonto (Schuld sinkt), Haben Aufwand und 2500. Gutschrift von uns an den Kunden: Soll das Erlöskonto plus 3500, Haben das Kundenkonto (Forderung sinkt). 4000 verwendest du bei einer Rücknahme, 4400 bei einem nachträglichen Nachlass, wenn die Ware bleibt."}, {"frage": "Gutschrift vom Lieferanten an uns: wie lautet der Satz?", "antwort": "Soll das Lieferanten-Personenkonto (z. B. 33020) mit dem Brutto, Haben 5000 Handelswareneinsatz 20 % mit dem Netto und 2500 Vorsteuer mit der USt. Schuld und Vorsteuer sinken – unabhängig davon, ob der Text eine Rücksendung oder einen Nachlass nennt.", "nur_aufgabentypen": ["E1_ruecksendung_einkauf", "E5_nachlass_lieferant"]}, {"frage": "Wir stellen dem Kunden eine Gutschrift über eine Rücksendung oder Rücknahme aus. Welcher Satz?", "antwort": "Der Verkaufssatz dreht sich um: Soll 4000 Handelswarenerlöse 20 % und 3500 Umsatzsteuer, Haben das Kundenkonto (z. B. 20020) mit dem Brutto.", "nur_aufgabentypen": ["E2_ruecksendung_verkauf"]}, {"frage": "Die Gutschrift an den Kunden ist ein nachträglicher Rabatt und die Ware bleibt beim Kunden. Welcher Unterschied zu einer Rücknahme?", "antwort": "Dann steht im Soll 4400 Erlösberichtigungen 20 % statt 4000, dazu 3500 Umsatzsteuer, Haben das Kundenkonto.", "nur_aufgabentypen": ["E5_nachlass_kunde"]}], "transfer": [{"frage": "Welche Seite des Buchungssatzes zeigt, dass eine Schuld oder eine Forderung sinkt?", "antwort": "Gutschrift vom Lieferanten: Soll Lieferantenkonto (Passiv-Abgang). Gutschrift an den Kunden: Haben Kundenkonto (Aktiv-Abgang). Die Steuer folgt immer der ursprünglichen Richtung (2500 im Haben bzw. 3500 im Soll)."}, {"frage": "Dieselbe Lieferanten-Gutschrift wäre eine Rücksendung statt eines Nachlasses (oder umgekehrt). Ändert sich der Buchungssatz?", "antwort": "Nein. Beim Einkauf kehrt sich der Einkaufssatz in beiden Fällen um: Soll Lieferantenkonto, Haben 5000 und 2500. Der Positionstext nennt nur den Grund.", "nur_aufgabentypen": ["E1_ruecksendung_einkauf", "E5_nachlass_lieferant"]}, {"frage": "Wir stellen dem Kunden eine Gutschrift über denselben Betrag aus, die Ware bleibt. Welches Konto statt 4000?", "antwort": "4400 Erlösberichtigungen 20 %, plus 3500 im Soll, Haben das Kundenkonto. Das muss auf dem Beleg als nachträglicher Nachlass erkennbar sein.", "nur_aufgabentypen": ["E5_nachlass_kunde"]}]}, "Kassabeleg": {"einstieg": [{"frage": "Woran erkennst du, dass bar gezahlt wurde – und welche Beleggruppe gilt?", "antwort": "Auf dem Bon steht typischerweise „Bar bezahlt“, keine Kartennummer. Die Beleggruppe ist K. Das Kassakonto ist 2700."}, {"frage": "Was ist der QR-Code am unteren Rand des Bons?", "antwort": "Das ist der RKSV-QR der Registrierkasse, kein Strichcode. Die Zeichenkette wird nicht als Klartext abgeschrieben und ändert den Buchungssatz nicht."}, {"frage": "Wer ist Aussteller, wer Empfänger – und was folgt daraus für die Kassa?", "antwort": "Sind wir Empfänger, haben wir bar eingekauft: Das Geld geht aus der Kassa, 2700 steht im Haben. Sind wir Aussteller, haben wir bar verkauft: Das Geld kommt in die Kassa, 2700 steht im Soll."}], "vertiefung": [{"frage": "Wie findest du den restlichen Buchungssatz zu 2700?", "antwort": "Barkauf (wir sind Empfänger): Soll der Aufwand, der zu den Positionen passt, plus 2500 Vorsteuer, soweit der Abzug zusteht, Haben 2700 mit dem Brutto. Barverkauf (wir sind Aussteller): Soll 2700, Haben 4000 und 3500. Es gibt kein Personenkonto, weil sofort bar gezahlt wurde."}, {"frage": "Warum darf ein ähnlicher Bon mit Kredit- oder Debitkarte nicht als K gebucht werden?", "antwort": "K gilt nur für Bargeld. Eine Kartenzahlung ist Beleggruppe S. Auf dem Beleg siehst du dann die Zahlungsart Karte oder eine maskierte Kartennummer."}, {"frage": "Der Bon zeigt ein Postpaket. Welches Aufwandskonto und welche Steuer?", "antwort": "Paket unter 10 kg bzw. ohne USt: 7311 Paketgebühren 0 %, keine Vorsteuer, Haben 2700. Paket über 10 kg mit 20 % USt: 7310 plus 2500, Haben 2700. Beleggruppe bleibt K.", "nur_aufgabentypen": ["E4_paket_0", "E4_paket_20"]}], "transfer": [{"frage": "Derselbe Bon, aber statt „Bar bezahlt“ stünde Kredit- oder Debitkarte. Was ändert sich?", "antwort": "Beleggruppe S statt K: Haben wir verkauft (wir sind Aussteller), steht im Soll 2880 oder 2885 statt 2700; haben wir eingekauft, steht im Haben 3180 oder 3190 statt 2700. Netto und Steuer bleiben, soweit sich die Steuerregel nicht ändert."}, {"frage": "Auf diesem Bon steht ein Postpaket unter 10 kg ohne USt. Welches Konto, welche Steuer?", "antwort": "7311 Paketgebühren 0 %, keine Vorsteuer, Haben 2700, Beleggruppe K.", "nur_aufgabentypen": ["E4_paket_0"]}, {"frage": "Auf diesem Bon steht ein Postpaket über 10 kg mit 20 % USt. Welcher Satz?", "antwort": "Soll 7310 Paketgebühren 20 % und 2500 Vorsteuer, Haben 2700, Beleggruppe K.", "nur_aufgabentypen": ["E4_paket_20"]}]}, "Kontoauszug": {"einstieg": [{"frage": "Woran erkennst du, ob Geld abgeht oder ankommt – und welche Beleggruppe gilt?", "antwort": "Abbuchungen stehen mit Minus (wir zahlen, 2800 Bank im Haben, Aktiv-Abgang), Eingänge ohne Minus bzw. als Gutschrift (Geld kommt, 2800 im Soll, Aktiv-Zugang). Die Beleggruppe ist B."}, {"frage": "Welche Angaben am Kopf brauchst du zur Orientierung, und wie prüfst du den Saldo?", "antwort": "Bankname, IBAN, Datum, alter und neuer Saldo. Kontrolle: Alter Saldo plus oder minus die Zeilenbeträge ergibt den neuen Saldo."}, {"frage": "Wird auf dem Kontoauszug die USt neu ausgerechnet?", "antwort": "Meist nein. Die Steuer stand schon auf der Rechnung. Eine Steuerkorrektur gibt es nur, wenn die Zeile die Bemessungsgrundlage ändert (zum Beispiel Skonto) oder eine eigene Leistung mit USt zeigt (zum Beispiel Kartengebühr 7792 plus 2500)."}], "vertiefung": [{"frage": "Wie findest du Soll, Haben und die Gegenkonten auf diesem Auszug?", "antwort": "Minus: 2800 im Haben; Plus: 2800 im Soll. Die Gegenkonten stehen im Buchungstext der Zeile (Partner, Skonto, Karteneingang, Bareinzahlung, Zahllast, Versicherung, Zinsen); 2800 ist immer beteiligt, Beleggruppe B."}, {"frage": "Die Zeile ist eine Überweisung an den Lieferanten ohne Skonto-Abzug. Welcher Satz?", "antwort": "Soll das Lieferanten-Personenkonto, das zum Namen in der Zeile gehört (z. B. 33010 Nadelstrom), Haben 2800 Bank. In diesem Satz gibt es keine Vorsteuer.", "nur_aufgabentypen": ["E6_zahlung_lieferant"]}, {"frage": "Die Zeile ist ein Zahlungseingang vom Kunden ohne Skonto-Abzug. Welcher Satz?", "antwort": "Soll 2800 Bank, Haben das Kunden-Personenkonto, das zum Namen in der Zeile gehört (z. B. 20010 Kammfeder). In diesem Satz gibt es keine Umsatzsteuer.", "nur_aufgabentypen": ["E6_zahlung_kunde"]}, {"frage": "In der Zeile steht ein Skontoabzug an den Lieferanten. Wie buchst du?", "antwort": "Soll das Lieferantenkonto mit dem vollen Rechnungsbetrag, Haben 5880 Lieferantenskonti (Netto), 2500 Vorsteuer (Steuerkorrektur) und 2800 mit der Restzahlung; Skonto vom Brutto, bei 20 % durch 1,20 teilen. Steht in der Zeile kein Skonto (Frist versäumt), buchst du nur Lieferant an 2800.", "nur_aufgabentypen": ["E8_lieferantenskonto"]}, {"frage": "In der Zeile steht ein Skontoabzug des Kunden. Wie buchst du?", "antwort": "Soll 2800 mit der Restzahlung, 4410 Kundenskonti (Netto) und 3500 (Steuerkorrektur), Haben das Kundenkonto mit dem vollen Rechnungsbetrag. Steht kein Skonto in der Zeile, buchst du nur 2800 an das Kundenkonto.", "nur_aufgabentypen": ["E9_kundenskonto"]}, {"frage": "Die Zeile betrifft Barverkehr mit der Bank (Einzahlung oder Behebung). Welches Gegenkonto, und warum nicht 2700?", "antwort": "Gegenkonto ist 2870 Barverkehr mit Banken; die Kassa (2700) buchst du auf dem Kassabeleg, nicht auf diesem Auszug. Einzahlung (Plus): Soll 2800, Haben 2870; Behebung (Minus): Soll 2870, Haben 2800.", "nur_aufgabentypen": ["E11_bareinzahlung", "E11_barbehebung"]}], "transfer": [{"frage": "Wann kommt auf diesem Kontoauszug außer 2800 noch ein Steuerkonto (2500 oder 3500) in den Satz – und wann nicht?", "antwort": "Nur wenn die Zeile die Steuerbemessungsgrundlage ändert (Skonto) oder eine eigene Leistung mit USt zeigt (Kartengebühr: 7792 plus 2500). Reine Zahlungen, Steuern, Versicherungen, Zinsen und Barverkehr mit der Bank haben in diesem Satz keine 2500 oder 3500."}, {"frage": "Dieselbe Überweisung an den Lieferanten wäre in der Skontofrist mit 2 % Skonto (oder ohne Skonto, wenn hier eines steht). Was ändert sich?", "antwort": "Mit Skonto kommen 5880 und die Vorsteuerkorrektur 2500 dazu, 2800 nur über die Restzahlung. Ohne Skonto entfallen 5880 und 2500, der volle Betrag geht über 2800.", "nur_aufgabentypen": ["E6_zahlung_lieferant", "E8_lieferantenskonto"]}, {"frage": "Die Zeile zeigt eine Barbehebung (Minus, Text „Barbehebung“). Welcher Satz gehört auf diesen Bankbeleg?", "antwort": "Soll 2870 Barverkehr mit Banken, Haben 2800. Die Kassa (2700 an 2870) buchst du erst auf dem Kassabeleg.", "nur_aufgabentypen": ["E11_barbehebung"]}, {"frage": "Ein früherer Kartenumsatz wird auf diesem Auszug ausgeglichen. Welches Gegenkonto?", "antwort": "Kundeneingang: Haben 2880 (Kreditkarte) oder 2885 (Debitkarte); mit Gebühr zusätzlich Soll 7792 und 2500. Ausgleich unserer Firmenkarte: Soll 3180 oder 3190, Haben 2800. Eine gesonderte Gebührenzeile allein: Soll 7792 und 2500, Haben 2800.", "nur_aufgabentypen": ["E7_karteneingang_mit_gebuehr", "E7_karteneingang_ohne_gebuehr", "E7_kartengebuehr_gesondert", "E7_firmenkarte_ausgleich"]}]}, "Kartenbeleg": {"einstieg": [{"frage": "Woran erkennst du, dass nicht bar gezahlt wurde – und welche Beleggruppe gilt?", "antwort": "Auf dem Beleg steht die Zahlungsart Kredit- oder Debitkarte, oft mit maskierter Kartennummer und Terminal. Die Beleggruppe ist S, nicht K. 2700 Kassa wäre falsch."}, {"frage": "Welche Beträge siehst du, und was ist der Kartenumsatz?", "antwort": "Wie auf einer Rechnung: Positionen, Netto, USt und Brutto (Netto + USt = Brutto). Der Bruttobetrag ist der Kartenumsatz."}, {"frage": "Wer ist Aussteller, wer Empfänger – und was folgt daraus?", "antwort": "Sind wir Aussteller und der Kunde Empfänger, hat der Kunde bei uns mit Karte bezahlt. Sind wir Empfänger, haben wir selbst mit der Firmenkarte bezahlt."}], "vertiefung": [{"frage": "Wie findest du die Konten zu diesem Kartenbeleg?", "antwort": "Kunde zahlt bei uns: Soll 2880 (Kreditkarte) oder 2885 (Debitkarte), Haben 4000 und 3500; wir zahlen Ware mit Firmenkarte: Soll 5000 plus 2500, Haben 3180 oder 3190. Tankung Firmen-Pkw (Benziner/Diesel): 7320 brutto ohne 2500 an 3190; Tankung Lkw: 7330 plus 2500 an 3190."}, {"frage": "Was bedeutet der RKSV-QR auf diesem Bon?", "antwort": "Wie beim Kassabeleg gehört er zur Registrierkasse. Die Zeichenkette wird nicht als Klartext abgeschrieben und ändert den Buchungssatz nicht."}, {"frage": "Ein Kunde zahlt bei uns mit Kredit- oder Debitkarte. Welcher Satz, und ist das Geld schon auf der Bank?", "antwort": "Soll 2880 (Kreditkarte) bzw. 2885 (Debitkarte) mit dem Brutto, Haben 4000 und 3500. Das Geld ist noch nicht auf der Bank.", "nur_aufgabentypen": ["E7_kunde_kreditkarte", "E7_kunde_debitkarte"]}, {"frage": "Wir zahlen einen Wareneinkauf mit der Firmenkarte. Welcher Satz?", "antwort": "Soll 5000 plus 2500, Haben 3190 bei Debitkarte bzw. 3180 bei Kreditkarte. Nicht 2700 und nicht 7320 – das wäre Kassa bzw. Pkw-Treibstoff.", "nur_aufgabentypen": ["E7_eigene_firmenkarte"]}], "transfer": [{"frage": "Wann kommt das Geld wirklich auf die Bank oder von der Bank – und welcher Satz steht dann auf dem Kontoauszug?", "antwort": "Nicht auf diesem Kartenbeleg. Später, Beleggruppe B: Kundeneingang Soll 2800 an 2880 bzw. 2885; Ausgleich unserer Firmenkarte Soll 3180 bzw. 3190 an 2800. Eine Gebühr wäre ein eigener Satz (7792 plus 2500)."}, {"frage": "Derselbe Kundenverkauf, aber bar statt mit Karte. Was ändert sich?", "antwort": "Soll 2700 Kassa, Beleggruppe K. Haben bleiben 4000 und 3500.", "nur_aufgabentypen": ["E7_kunde_kreditkarte", "E7_kunde_debitkarte"]}, {"frage": "Der Kartenbon zeigt eine Tankung für den Firmen-Pkw (Benziner oder Diesel). Wohin mit der USt?", "antwort": "Es gibt keinen Vorsteuerabzug: Du buchst den Bruttobetrag auf 7320 Pkw- und Kombi-Betriebsaufwand, Haben 3190, Beleggruppe S. Beim Lkw wäre es 7330 plus 2500.", "nur_aufgabentypen": ["E14_pkw_betrieb"]}, {"frage": "Der Kartenbon zeigt eine Tankung für den Lkw. Welcher Satz?", "antwort": "Soll 7330 Lkw-Betriebsaufwand und 2500 Vorsteuer, Haben 3190, Beleggruppe S. Nicht 7320 – das wäre der Pkw ohne Vorsteuerabzug.", "nur_aufgabentypen": ["E14_lkw_betrieb"]}]}, "Bankabrechnung": {"einstieg": [{"frage": "Was für ein Beleg ist das, und welche Beleggruppe gilt?", "antwort": "Eine Bankabrechnung über Zinsen und Entgelte, oft für ein Quartal (Zeitraum auf dem Beleg). Die Beleggruppe ist B, das Konto 2800 Bank ist immer beteiligt."}, {"frage": "Welche typischen Zeilen kannst du auf einer solchen Abrechnung lesen?", "antwort": "Habenzinsen (Gutschrift), Kapitalertragsteuer (KESt, Abzug) und manchmal Sollzinsen oder Spesen bzw. Kontoführung (Abbuchung). Lies genau, welche Zeilen auf DIESEM Beleg stehen."}, {"frage": "Steht auf Habenzinsen, KESt, Sollzinsen oder Bankspesen eine USt?", "antwort": "Nein. Habenzinsen, KESt und Sollzinsen haben keine USt. Bankspesen buchst du auf 7790 Spesen des Geldverkehrs ohne Vorsteuer."}], "vertiefung": [{"frage": "Welche Zeilen stehen auf diesem Beleg, und welches Konto gehört dazu?", "antwort": "Habenzinsen → Haben 8050 (brutto), KESt (25 % der Zinsen) → Soll 9600 Privat, Sollzinsen → Soll 8310, Spesen bzw. Kontoführung → Soll 7790 ohne 2500. 2800 ist jeweils das Gegenkonto; bei Zinsen plus KESt kommt nur der Nettobetrag auf die Bank."}, {"frage": "Habenzinsen und KESt stehen gemeinsam auf der Abrechnung. Wie buchst du das in einem Satz?", "antwort": "Die Zinsen brutto ins Haben auf 8050 Zinsenerträge aus Bankguthaben, die KESt (25 % der Zinsen) ins Soll auf 9600 Privat, auf 2800 kommt nur der Nettobetrag. Beispiel: Zinsen 80,00, KESt 20,00, Bank 60,00.", "nur_aufgabentypen": ["E12_habenzinsen_kest"]}, {"frage": "Warum gehört die KESt auf 9600 Privat und nicht auf ein Aufwandskonto?", "antwort": "Die KESt ist eine Steuer des Inhabers, keine Betriebssteuer. Deshalb Privat, nicht zum Beispiel 7100 oder 7790.", "nur_aufgabentypen": ["E12_habenzinsen_kest"]}, {"frage": "Auf der Abrechnung stehen nur Spesen oder nur Sollzinsen. Welcher Satz?", "antwort": "Spesen: Soll 7790, Haben 2800, ohne 2500. Sollzinsen: Soll 8310 Zinsenaufwand für Bankkredite, Haben 2800.", "nur_aufgabentypen": ["E12_bankspesen", "E12_sollzinsen"]}], "transfer": [{"frage": "Warum ist 2800 auf jeder Bankabrechnung dabei, und wie bestimmst du Soll oder Haben dazu?", "antwort": "Die Abrechnung ist ein Bankbeleg (Beleggruppe B). Eine Gutschrift (Habenzinsen minus KESt) kommt auf 2800 ins Soll, eine Abbuchung (Spesen, Sollzinsen) auf 2800 ins Haben. Du entscheidest zeilenweise nach dem Vorzeichen."}, {"frage": "Neue Beträge derselben Art: Habenzinsen 40,00 €, KESt 10,00 €. Welcher Satz?", "antwort": "Soll 2800 Bank 30,00 und 9600 Privat 10,00, Haben 8050 Zinsenerträge aus Bankguthaben 40,00.", "nur_aufgabentypen": ["E12_habenzinsen_kest"]}, {"frage": "Auf dieser Abrechnung stehen nur Spesen (z. B. Kontoführung). Welcher Satz?", "antwort": "Soll 7790 Spesen des Geldverkehrs, Haben 2800 Bank. Keine Vorsteuer.", "nur_aufgabentypen": ["E12_bankspesen"]}]}, "Mahnung": {"einstieg": [{"frage": "Wer hat die Mahnung geschrieben, und was bedeutet das?", "antwort": "Sind wir Aussteller und der Kunde Empfänger, mahnen wir den Kunden. Ist der Lieferant Aussteller und wir Empfänger, mahnt uns der Lieferant."}, {"frage": "Steht auf der Mahnung Umsatzsteuer?", "antwort": "Im Trainer haben Mahnspesen und Verzugszinsen keine USt. Du buchst den Betrag ohne 2500 und ohne 3500."}, {"frage": "Ist die Mahnung schon eine Zahlung?", "antwort": "Nein. Sie setzt Spesen oder Zinsen fest. Solange kein Kontoauszug dazu liegt, ist 2800 nicht betroffen."}], "vertiefung": [{"frage": "Wie findest du den Buchungssatz zu dieser Mahnung?", "antwort": "Wir mahnen den Kunden: Soll das Kundenkonto, Haben 4890 (Mahnspesen) und/oder 8055 (Verzugszinsen). Der Lieferant mahnt uns: Soll 8321 (Mahnspesen) und/oder 8320 (Verzugszinsenaufwand), Haben das Lieferantenkonto. Die Art steht im Text der Mahnung."}, {"frage": "Wir verrechnen dem Kunden Mahnspesen oder Verzugszinsen. Welcher Satz?", "antwort": "Soll das Kundenkonto (z. B. 20010 Kammfeder). Haben 4890 Mahnspesenvergütungen und/oder 8055 Verzugszinsenerträge, je nachdem, was die Mahnung ausweist. Keine USt.", "nur_aufgabentypen": ["E10_mahnung_kunde"]}, {"frage": "Der Lieferant verrechnet uns Mahnspesen oder Verzugszinsen. Welcher Satz?", "antwort": "Soll 8321 Mahnspesen und/oder 8320 Verzugszinsenaufwand, Haben das Lieferantenkonto (z. B. 33010 Nadelstrom). Unsere Schuld steigt. Keine Vorsteuer.", "nur_aufgabentypen": ["E10_mahnung_lieferant"]}], "transfer": [{"frage": "Wann käme 2800 zu dieser Mahnung hinzu?", "antwort": "Erst wenn wirklich gezahlt wird (Kontoauszug, Beleggruppe B): Der Kunde zahlt uns – Soll 2800; wir zahlen an den Lieferanten – Haben 2800. Die Mahnung selbst bleibt ohne Bank."}, {"frage": "Dieselbe Mahnung an den Kunden, aber Verzugszinsen statt Mahnspesen (oder umgekehrt, oder beide). Was ändert sich?", "antwort": "Es tauscht oder ergänzt sich nur das Ertragskonto: 4890 für Mahnspesen, 8055 für Verzugszinsen. Weiterhin keine USt, Soll bleibt das Kundenkonto.", "nur_aufgabentypen": ["E10_mahnung_kunde"]}, {"frage": "Derselbe Lieferant mahnt uns, aber die andere Art (Mahnspesen statt Verzugszinsen oder umgekehrt). Was ändert sich?", "antwort": "Soll 8321 statt 8320 oder umgekehrt (oder beide, wenn die Mahnung beides ausweist). Haben bleibt das Lieferantenkonto, ohne Vorsteuer.", "nur_aufgabentypen": ["E10_mahnung_lieferant"]}]}, "Zahlungsaufforderung": {"einstieg": [{"frage": "Wer stellt diesen Beleg aus, und worum handelt es sich?", "antwort": "Eine Behörde oder ähnliche Stelle (hier typischerweise die Stadt bzw. MA 6). Wir sind Empfänger. Es ist keine Lieferantenrechnung über Ware."}, {"frage": "Siehst du auf der Vorschreibung typischerweise USt?", "antwort": "Bei Grundsteuer in der Regel nein. Du buchst den Betrag ohne 2500 Vorsteuer."}, {"frage": "Wofür ist der Betrag? Woran erkennst du das auf dem Beleg?", "antwort": "Am Text und am Zeitraum, zum Beispiel Grundsteuer für ein Quartal."}], "vertiefung": [{"frage": "Grundsteuer, das Geld geht vom Bankkonto weg. Welcher Satz?", "antwort": "Soll 7100 Grundsteuer (Betriebssteuer, Aufwand), Haben 2800 Bank. Die Beleggruppe ist B, sobald gezahlt wird."}, {"frage": "Warum buchst du die Grundsteuer auf 7100 und nicht auf 9600 Privat?", "antwort": "Die Grundsteuer für das Betriebsgrundstück ist eine Betriebssteuer (Aufwand), keine Privatsteuer des Inhabers. 9600 wäre zum Beispiel die Einkommensteuer."}], "transfer": [{"frage": "Dieselbe Grundsteuer würde bar statt per Bank gezahlt. Was ändert sich?", "antwort": "Statt 2800 steht im Haben 2700 Kassa, Beleggruppe K. Soll bleibt 7100, weiterhin ohne Vorsteuer."}, {"frage": "Warum steht der Betrag nicht auf einem Lieferantenkonto und nicht auf 2500?", "antwort": "Es ist eine behördliche Vorschreibung, keine Eingangsrechnung eines Lieferanten, und auf der Grundsteuer steht typischerweise keine USt. Deshalb 7100 an 2800."}]}, "Inventurliste": {"einstieg": [{"frage": "Was steht auf dem Inventurblatt, und was ist es nicht?", "antwort": "Die gezählte Menge und der Wert des Materials am Stichtag (meist 31.12.) sowie die Materialart. Es ist keine Rechnung und keine Zahlung, es gibt hier keine USt zu buchen."}, {"frage": "Welche zwei Werte brauchst du, und was wird gebucht?", "antwort": "Den Endbestand (Inventur heuer) und den Anfangsbestand (Inventur Vorjahr = Endbestand 31.12. des Vorjahres). Gebucht wird nur die Differenz, nicht der ganze Endbestand."}, {"frage": "Warum steht auf der Inventur keine Vorsteuer?", "antwort": "Die Vorsteuer war schon beim Einkauf auf 2500. Die Inventur verteilt nur den bereits gebuchten Materialaufwand und den Vorrat."}], "vertiefung": [{"frage": "Wie entscheidest du Soll und Haben bei der Bestandsveränderung?", "antwort": "Endbestand größer als Anfangsbestand (Vermehrung): Soll das Vorratskonto, Haben das Aufwandskonto, nur die Differenz. Endbestand kleiner (Verminderung): Soll Aufwand, Haben Vorrat, nur die Differenz."}, {"frage": "Welche Konto-Paare gehören zusammen?", "antwort": "1340 und 5340 Verpackung, 1360 und 7240 Heizöl, 1364 und 7280 feste Brennstoffe, 1370 und 5450 Reinigung, 1390 und 7600 Büromaterial. Immer dasselbe Material auf Vorrat und Aufwand."}, {"frage": "Warum buchst du nicht den ganzen Endbestand, sondern nur die Differenz?", "antwort": "Der Anfangsbestand steht schon aus dem Vorjahr auf dem Vorratskonto. Die Inventur korrigiert nur, was sich in diesem Jahr verändert hat."}], "transfer": [{"frage": "Nimm die beiden Werte zu diesem Blatt (Endbestand hier, Anfangsbestand aus der Inventur Vorjahr). Ist die Differenz eine Vermehrung oder eine Verminderung, und wie lautet der Satz?", "antwort": "Die Differenz ist der Betrag Ende minus Betrag Anfang: Ende größer → Soll Vorrat, Haben Aufwand; Ende kleiner → Soll Aufwand, Haben Vorrat. Die Konten wählst du nach der Materialart auf dem Blatt (z. B. 1360/7240 Heizöl, 1340/5340 Verpackung)."}, {"frage": "Anfangs- und Endbestand auf diesem Blatt wären vertauscht. Wie dreht sich der Satz?", "antwort": "Aus einer Vermehrung wird eine Verminderung (oder umgekehrt), Soll und Haben der beiden Konten des Paares tauschen den Platz. Der Differenzbetrag bleibt gleich, es kommt keine USt dazu."}]}, "Textangabe": {"einstieg": [{"frage": "Was musst du im Aufgabentext zuerst klären, wenn kein Belegbild da ist?", "antwort": "Was passiert (Kauf, Verkauf, Zahlung, …), mit wem, und wie gezahlt wird. Achte auf Wörter wie „bar“, „auf Ziel“, „per Bank“, „Kreditkarte“, „Debitkarte“, „Skonto“ oder „Gutschrift“."}, {"frage": "Welche Beträge nennt der Text – und welche Abgaben sind keine USt?", "antwort": "Lies genau. Bei „netto + 20 % USt“ ist das Brutto Netto × 1,20; bei „inkl. USt“ teilst du bei 20 % durch 1,20. Andere Abgaben (GrESt, NoVA, KESt) sind keine USt und kommen nicht auf 2500 oder 3500."}, {"frage": "Wozu brauchst du den Satz „Wir sind …“?", "antwort": "Er nennt unseren Betrieb. Daran erkennst du, ob wir einkaufen oder verkaufen und welches Personenkonto zum Partner gehört (z. B. 33010 Nadelstrom, 20010 Kammfeder)."}], "vertiefung": [{"frage": "Wie erkennst du im Text die Beleggruppe und das Geld- oder Personenkonto?", "antwort": "„Bar“ → K und 2700; „Debitkarte“ oder „Kreditkarte“ → S und 2885/2880 (Kunde) bzw. 3190/3180 (Firmenkarte); „per Bank“ oder „wir überweisen“ → B und 2800. „Auf Ziel“ oder „offene Rechnung“ → ER bzw. AR und das Personenkonto, nie die Sammelkonten 2000 oder 3300."}, {"frage": "Der Text ist ein Zielkauf oder ein offener Wareneinkauf. Welcher typische Satz?", "antwort": "Soll 5000 und 2500, Haben das Lieferanten-Personenkonto (z. B. 33010 Nadelstrom). Steht ein Sofortrabatt im Text, buchst du nur das Netto nach Rabatt plus USt, ohne eigenes Rabattkonto.", "nur_aufgabentypen": ["E1_wareneinkauf_ziel", "E5_sofortrabatt"]}, {"frage": "Der Text ist ein Zielverkauf. Welcher typische Satz?", "antwort": "Soll das Kunden-Personenkonto (z. B. 20010 Kammfeder), Haben 4000 und 3500. Nie 2000. Steht ein Sofortrabatt im Text, nur das Netto nach Rabatt plus USt.", "nur_aufgabentypen": ["E2_warenverkauf_ziel", "E5_sofortrabatt_verkauf"]}, {"frage": "Im Text steht ein Skonto bei der Zahlung. Wie gehst du vor?", "antwort": "Zuerst prüfen, ob in der Frist gezahlt wird: Lieferantenskonto = Soll Lieferant (voller Betrag), Haben 5880, 2500 und 2800 (Rest); Kundenskonto = Soll 2800, 4410 und 3500, Haben das Kundenkonto (voller Betrag). Skonto vom Brutto, bei 20 % durch 1,20 teilen; ohne Skonto entfällt die Steuerkorrektur.", "nur_aufgabentypen": ["E8_lieferantenskonto", "E9_kundenskonto"]}, {"frage": "Der Text betrifft Bezugskosten (Fracht, Anlieferung der Ware). Wohin mit dem Netto, und wie findest du das Gegenkonto?", "antwort": "Das Netto gehört auf 5000 (zu den Bezugskosten der Ware), plus 2500. Die Habenseite steht in der Zahlungsart: auf Ziel das Personenkonto (33030 Tauernlogistik, 33040 Wachaustern oder der Lieferant), bar 2700, Bank 2800.", "nur_aufgabentypen": ["E3_bezugskosten"]}, {"frage": "Der Text betrifft den Versand an unsere Kunden oder ein Postpaket. Welche Aufwandskonten?", "antwort": "Spedition an unsere Kunden: 7300 plus 2500; Paket über 10 kg mit 20 % USt: 7310 plus 2500; Paket unter 10 kg bzw. 0 %: 7311 ohne Vorsteuer. Das Geldkonto folgt der Zahlungsart (2700, 2800 oder Personenkonto).", "nur_aufgabentypen": ["E4_versand_spedition", "E4_paket_20", "E4_paket_0"]}, {"frage": "Der Text ist eine Mahnung. Welche Konten, und warum keine USt?", "antwort": "Wir mahnen den Kunden: Soll Kundenkonto, Haben 4890 und/oder 8055. Der Lieferant mahnt uns: Soll 8321 und/oder 8320, Haben Lieferantenkonto. Mahnspesen und Verzugszinsen haben im Trainer keine USt.", "nur_aufgabentypen": ["E10_mahnung_kunde", "E10_mahnung_lieferant"]}, {"frage": "Der Text betrifft Habenzinsen, KESt, Sollzinsen oder Bankspesen. Welche Konten?", "antwort": "Habenzinsen brutto 8050 im Haben, KESt 25 % auf 9600 Privat, Bank nur der Nettobetrag (2800); KESt allein: 9600 an 2800. Sollzinsen: 8310 an 2800; Spesen: 7790 an 2800, ohne 2500.", "nur_aufgabentypen": ["E12_habenzinsen_kest", "E12_kest_allein", "E12_sollzinsen", "E12_bankspesen"]}], "transfer": [{"frage": "Du änderst im Text nur die Zahlungsart, der übrige Geschäftsvorfall bleibt. Was ändert sich immer, was bleibt?", "antwort": "Beleggruppe und das Geld- oder Personenkonto ändern sich (2700 und K, 2800 und B, Karte 2880/2885 bzw. 3180/3190 und S, sonst Personenkonto und ER/AR). Aufwand oder Erlös und die Steuer bleiben, soweit sich die Steuerregel nicht ändert."}, {"frage": "Derselbe Text nennte einen Sofortrabatt auf den Listenpreis (oder der Rabatt entfiele). Welcher Betrag kommt in den Buchungssatz?", "antwort": "Mit Sofortrabatt nur das Netto nach Rabatt und die USt davon, ohne eigenes Rabattkonto. Ohne Rabatt buchst du Listen-Netto plus USt.", "nur_aufgabentypen": ["E5_sofortrabatt", "E5_sofortrabatt_verkauf", "E1_wareneinkauf_ziel", "E2_warenverkauf_ziel"]}, {"frage": "Derselbe Eigenverbrauch würde verkauft statt entnommen. Was änderte sich?", "antwort": "Statt Soll 9600 Privat und Haben 4900 Eigenverbrauch plus 3500 stünde ein Verkaufssatz: Soll 2700, 2880/2885 oder Kundenkonto, Haben 4000 und 3500. Die USt bleibt geschuldet.", "nur_aufgabentypen": ["E2_eigenverbrauch"]}, {"frage": "Dieselbe Betriebssteuer oder Privatsteuer würde uns als Rechnung eines Lieferanten erscheinen. Warum wäre das falsch?", "antwort": "Grundsteuer 7100, Kammerumlage 7780, Einkommensteuer 9600 und die USt-Zahllast 3520 kommen von einer Behörde, nicht von einem Lieferanten, und typischerweise ohne 2500. Gegenkonto ist 2800, Beleggruppe B.", "nur_aufgabentypen": ["E13_grundsteuer", "E13_kammerumlage", "E13_einkommensteuer", "E13_ust_zahllast"]}]}};
window.BEMA_STAMM = {"quelle": "Fiktive Firmen (RW-Pool 28.11.2026, firmen.json); Musterwerte", "iban_platzhalter": "AT00 9810 0000 0000 1001", "wir": [{"wir": "Ohmreich Elektrofachhandel GmbH, Elektronikhandel", "name": "Ohmreich Elektrofachhandel GmbH", "branche": "Elektronikhandel", "adresse": "Wagramer Straße 188, 1220 Wien", "uid": "ATU90800019", "einzelunternehmen": false}, {"wir": "Gipfelgriff Sport e.U., Outdoor-Sporthandel", "name": "Gipfelgriff Sport e.U.", "branche": "Outdoor-Sporthandel", "adresse": "Hernalser Hauptstraße 97, 1170 Wien", "uid": "ATU90800028", "einzelunternehmen": true}, {"wir": "Innquell Möbelmanufaktur GmbH, Möbel (Massivholzmöbel)", "name": "Innquell Möbelmanufaktur GmbH", "branche": "Möbel (Massivholzmöbel)", "adresse": "Innstraße 27, 4910 Ried im Innkreis", "uid": "ATU90800037", "einzelunternehmen": false}], "parteien": {"Schallkern Audio GmbH": {"name": "Schallkern Audio GmbH", "adresse": "Wienerbergstraße 49, 1120 Wien", "uid": "ATU90800126"}, "Ohmreich Elektrofachhandel GmbH": {"name": "Ohmreich Elektrofachhandel GmbH", "adresse": "Wagramer Straße 188, 1220 Wien", "uid": "ATU90800019"}, "Nadelstrom Elektronik Großhandel GmbH": {"name": "Nadelstrom Elektronik Großhandel GmbH", "adresse": "Gewerbepark Süd 7, 2351 Wiener Neudorf", "uid": "ATU90800117"}, "Saumland Bank AG": {"name": "Saumland Bank AG", "adresse": "Kärntner Ring 31, 1010 Wien", "uid": "ATU90800055"}, "Gipfelgriff Sport e.U.": {"name": "Gipfelgriff Sport e.U.", "adresse": "Hernalser Hauptstraße 97, 1170 Wien", "uid": "ATU90800028"}, "Atemweide Yoga & Pilates e.U.": {"name": "Atemweide Yoga & Pilates e.U.", "adresse": "Neubaugasse 33, 1070 Wien", "uid": "ATU90800322"}, "Kammfeder Fitness e.U.": {"name": "Kammfeder Fitness e.U.", "adresse": "Meidlinger Hauptstraße 40, 1120 Wien", "uid": "ATU90800313"}, "Tauernlogistik Spedition GmbH": {"name": "Tauernlogistik Spedition GmbH", "adresse": "Ostbahnstraße 14, 2320 Schwechat", "uid": "ATU90800135"}, "Wachaustern Transport AG": {"name": "Wachaustern Transport AG", "adresse": "Hafenstraße 22, 3500 Krems an der Donau", "uid": "ATU90800144"}, "Innquell Möbelmanufaktur GmbH": {"name": "Innquell Möbelmanufaktur GmbH", "adresse": "Innstraße 27, 4910 Ried im Innkreis", "uid": "ATU90800037"}, "Raschfracht Zustelldienst GmbH": {"name": "Raschfracht Zustelldienst GmbH", "adresse": "Puchsbaumgasse 6, 1100 Wien", "uid": "ATU90800224"}, "Stadt Wien – Rechnungs- und Abgabenwesen (MA 6)": {"name": "Stadt Wien – Rechnungs- und Abgabenwesen (MA 6)", "adresse": "Rinnböckstraße 15, 1110 Wien", "uid": ""}, "Tankhain Tankstellen GmbH": {"name": "Tankhain Tankstellen GmbH", "adresse": "Laaer-Berg-Straße 60, 1100 Wien", "uid": "ATU90800215"}, "Autohaus Spurweite GmbH": {"name": "Autohaus Spurweite GmbH", "adresse": "Leopoldauer Straße 112, 1210 Wien", "uid": "ATU90800180"}, "Kammerstapel Großhandel GmbH": {"name": "Kammerstapel Großhandel GmbH", "adresse": "Großmarktstraße 6, 1230 Wien", "uid": "ATU90800153"}, "Glutader Energiehandel GmbH": {"name": "Glutader Energiehandel GmbH", "adresse": "Simmeringer Hauptstraße 245, 1110 Wien", "uid": "ATU90800162"}, "Pultmacher Bürobedarf GmbH": {"name": "Pultmacher Bürobedarf GmbH", "adresse": "Mariahilfer Straße 190, 1150 Wien", "uid": "ATU90800171"}}, "banken": {"Saumland Bank AG": {"name": "Saumland Bank AG", "adresse": "Kärntner Ring 31, 1010 Wien", "uid": "ATU90800055", "bic": "SAUMATWW"}}, "produkte": {"E1_Eingangsrechnung": ["Schallkern Kopfhörer SK-300, kabellos", "Nadelstrom Soundbar NS-210", "Fernseher Nadelstrom Bild 55 (NB-55)"], "E1_Gutschrift": ["Rücksendung Schallkern Kopfhörer SK-300, Verpackung beschädigt"], "E1_Kontoauszug": ["Überweisung an Nadelstrom Elektronik Großhandel GmbH, Rechnung 90418833"], "E1_Kassabeleg": ["Schallkern Kopfhörer SK-300, Sport"], "E2_Ausgangsrechnung": ["Kletterseil 60 m", "Karabiner mit Schraubverschluss", "Yogamatte", "Kettlebell 16 kg"], "E2_Gutschrift": ["Rücknahme Kletterseil 60 m"], "E2_Kassabeleg": ["Kletterhelm"], "E2_Kontoauszug": ["Eingang Überweisung von Kammfeder Fitness e.U., Rechnung AR-2026-0451"], "E3_Eingangsrechnung": ["Anlieferung Ihrer Bestellung bei Nadelstrom ins Lager Wien-Donaustadt", "Palettenumschlag", "Nadelstrom Soundbar NS-210", "Fracht ab Lager Wien", "Anlieferung Ihrer Bestellung bei Nadelstrom von Wiener Neudorf nach Wien"], "E3_Kassabeleg": ["Anlieferung Ihrer Bestellung bei Schallkern, bar kassiert"], "E3_Kontoauszug": ["Überweisung an Tauernlogistik Spedition GmbH, Rechnung TL-2026-77104"], "E4_Eingangsrechnung": ["Zustellung verkaufter Möbel an Kunden in Graz", "Zustellung verkaufter Möbel an Kunden in Linz", "Transport verkaufter Möbel Ried im Innkreis – Wien"], "E4_Kassabeleg": ["Paket Österreich, 15 kg", "Paket Österreich, 2 kg", "Zustellung verkaufter Möbel an Ihren Kunden in Salzburg, bar kassiert"], "E4_Kontoauszug": ["Überweisung an Wachaustern Transport AG, Rechnung WS-2026-558740"], "E5_Eingangsrechnung": ["Schallkern Kopfhörer SK-300, kabellos"], "E5_Ausgangsrechnung": ["Soundbar", "Kopfhörer, kabellos", "Fernseher 65 Zoll"], "E5_Gutschrift": ["Nachträglicher Preisnachlass wegen beschädigter Verpackungen", "Nachträglicher Rabatt auf Rechnung AR-2026-3307", "Nachträglicher Preisnachlass 5 % auf Rechnung 90418833", "Rücknahme Fernseher 65 Zoll aus Rechnung AR-2026-3412 (Preis nach Rabatt)"], "E6_Kontoauszug": ["Überweisung an Nadelstrom Elektronik Großhandel GmbH, Rechnung 90420311", "Eingang Überweisung von Kammfeder Fitness e.U., Rechnung AR-2026-3520", "Überweisung an Schallkern Audio GmbH, Rechnung SK-26-111204", "Eingang Überweisung von Innquell Möbelmanufaktur GmbH, Rechnung AR-2026-3498"], "E7_Kartenbeleg": ["Fernseher 55 Zoll", "Funk-Lautsprecher", "Schallkern Kopfhörer SK-300, Sport"], "E7_Kontoauszug": ["Gutschrift Kreditkartenabrechnung Umsätze 02.11.2026: 900,00 abzüglich Gebühr 13,50 und USt 2,70", "Gutschrift Debitkartenumsätze 04.11.2026", "Sammelabbuchung Gebühren Debitkartenzahlungen Oktober 2026: 18,00 zuzüglich USt 3,60", "Abbuchung Abrechnung Firmen-Kreditkarte Oktober 2026"], "E8_Eingangsrechnung": ["Nadelstrom Soundbar NS-210", "Schallkern Kopfhörer SK-300, kabellos", "Nadelstrom Kamera NK-40"], "E8_Kontoauszug": ["Überweisung an Nadelstrom Elektronik Großhandel GmbH, Rechnung 90420517 vom 26.10.2026: 2.400,00 abzüglich 2 % Skonto 48,00", "Überweisung an Schallkern Audio GmbH, Rechnung SK-26-111530 vom 28.10.2026: 1.200,00 abzüglich 3 % Skonto 36,00", "Überweisung an Nadelstrom Elektronik Großhandel GmbH, Rechnung 90419980 vom 01.10.2026"], "E9_Ausgangsrechnung": ["Fernseher 65 Zoll", "Funk-Kopfhörer", "Action-Kamera"], "E9_Kontoauszug": ["Eingang Überweisung von Innquell Möbelmanufaktur GmbH, Rechnung AR-2026-3610 vom 27.10.2026: 6.000,00 abzüglich 2 % Skonto 120,00", "Eingang Überweisung von Kammfeder Fitness e.U., Rechnung AR-2026-3625 vom 29.10.2026: 720,00 abzüglich 3 % Skonto 21,60", "Eingang Überweisung von Atemweide Yoga & Pilates e.U., Rechnung AR-2026-3540 vom 02.10.2026"], "E10_Mahnung": ["Mahnspesen", "Verzugszinsen"], "E11_Kontoauszug": ["Bareinzahlung Tageslosung", "Barbehebung Wechselgeld", "Barbehebung für die Kassa"], "E12_Bankabrechnung": ["Habenzinsen", "Kapitalertragsteuer (KESt) 25 %", "Kontoführung", "Buchungsentgelte", "Porto", "Sollzinsen (Kontoüberziehung)"], "E12_Kontoauszug": ["Abschluss 31.10.2026: Sollzinsen"], "E13_Zahlungsaufforderung": ["Grundsteuer für das Betriebsgrundstück, 4. Quartal 2026"], "E13_Kontoauszug": ["Überweisung an Finanzamt Österreich, Umsatzsteuer 09/2026 (Zahllast)", "Überweisung an Finanzamt Österreich, Einkommensteuer-Vorauszahlung 10–12/2026", "Überweisung an Finanzamt Österreich, Kammerumlage 07–09/2026"], "E14_Kartenbeleg": ["Super 95, Liter", "Diesel, Liter", "Service Lkw laut Serviceplan", "Motoröl, Liter", "Reparatur Bremsen, Pkw (Diesel)"], "E14_Kontoauszug": ["Lastschrift Schildwacht Versicherungs-AG, Kfz-Versicherung Lkw inkl. motorbezogener Versicherungssteuer, 4. Quartal 2026"], "E15_Eingangsrechnung": ["Neuwagen Pkw, Benzinmotor, inkl. Überstellung", "Neuwagen Pkw, Dieselmotor, inkl. Überstellung", "Neuwagen Pkw, reiner Elektroantrieb, inkl. Überstellung", "Neufahrzeug Lkw, höchstzulässiges Gesamtgewicht 7,5 t, inkl. Überstellung"], "E16_Eingangsrechnung": ["Produktkartons 25 × 25 cm, weiß", "Heizöl extra leicht, Liter", "Luftpolsterbeutel 16 × 20 cm", "Warnaufkleber", "Papiertragtaschen", "Trinkflasche 0,4 l mit Aufdruck „Gipfelgriff“", "Kassenrollen Thermopapier 80 mm", "Druckerpatrone schwarz", "Auftragsblöcke für den Verkauf"], "E16_Kontoauszug": ["Überweisung an Kammerstapel Großhandel GmbH, Rechnung KS-2026-5531870"], "E16_Kassabeleg": ["Allzweckreiniger Profi, Kanister 10 l", "Glasreiniger 1 l", "Mikrofasertücher", "Kopierpapier A4, 500 Blatt", "Ordner A4, breit", "Kugelschreiber blau"], "E17_Inventurliste": ["Heizöl extra leicht im Tank, Liter", "Produktkartons 25 × 25 cm", "Papiertragtaschen", "Allzweckreiniger Profi, Kanister 10 l", "Glasreiniger 1 l", "Kassenrollen Thermopapier 80 mm", "Kopierpapier A4, 500 Blatt", "Buchenholz-Scheiter für die Betriebslokal-Heizung, Raummeter", "Luftpolsterbeutel 16 × 20 cm", "Warnaufkleber", "Ordner A4, breit", "Kugelschreiber blau"]}, "konten": [{"nummer": "0200", "name": "Unbebaute Grundstücke"}, {"nummer": "0630", "name": "Pkw und Kombis"}, {"nummer": "0640", "name": "Lkw"}, {"nummer": "1340", "name": "Vorrat Verpackungsmaterial"}, {"nummer": "1360", "name": "Vorrat Heizöl"}, {"nummer": "1364", "name": "Vorrat feste Brennstoffe"}, {"nummer": "1370", "name": "Vorrat Reinigungsmaterial"}, {"nummer": "1390", "name": "Vorrat Büromaterial"}, {"nummer": "2500", "name": "Vorsteuer"}, {"nummer": "2700", "name": "Kassa"}, {"nummer": "2800", "name": "Bank (Guthaben bei Kreditinstituten)"}, {"nummer": "2870", "name": "Barverkehr mit Banken"}, {"nummer": "2880", "name": "Forderungen Kreditkartenunternehmen"}, {"nummer": "2885", "name": "Forderungen Debitkarten"}, {"nummer": "3180", "name": "Verbindlichkeiten Kreditkartenunternehmen"}, {"nummer": "3190", "name": "Verbindlichkeiten Debitkarten"}, {"nummer": "3500", "name": "Umsatzsteuer"}, {"nummer": "3520", "name": "USt-Zahllast"}, {"nummer": "4000", "name": "Handelswarenerlöse 20 %"}, {"nummer": "4400", "name": "Erlösberichtigungen 20 %"}, {"nummer": "4410", "name": "Kundenskonti 20 %"}, {"nummer": "4890", "name": "Mahnspesenvergütungen"}, {"nummer": "4900", "name": "Eigenverbrauch 20 %"}, {"nummer": "5000", "name": "Handelswareneinsatz 20 %"}, {"nummer": "5340", "name": "Verpackungsmaterialverbrauch"}, {"nummer": "5450", "name": "Reinigungsmaterialverbrauch"}, {"nummer": "5880", "name": "Lieferantenskonti auf Wareneinkauf (Materialaufwand) 20 %"}, {"nummer": "7010", "name": "Abschreibungen von Sachanlagen (Absetzung für Abnutzung, AfA)"}, {"nummer": "7100", "name": "Grundsteuer"}, {"nummer": "7180", "name": "Gebühren"}, {"nummer": "7240", "name": "Heizölverbrauch"}, {"nummer": "7280", "name": "Heizmaterialverbrauch (feste Brennstoffe)"}, {"nummer": "7300", "name": "Ausgangsfrachten 20 % (Transporte durch Dritte)"}, {"nummer": "7310", "name": "Paketgebühren 20 %"}, {"nummer": "7311", "name": "Paketgebühren 0 %"}, {"nummer": "7320", "name": "Pkw- und Kombi-Betriebsaufwand"}, {"nummer": "7330", "name": "Lkw-Betriebsaufwand"}, {"nummer": "7600", "name": "Büromaterial (Büroaufwand, Bürobedarf)"}, {"nummer": "7780", "name": "Kammerumlage"}, {"nummer": "7790", "name": "Spesen des Geldverkehrs"}, {"nummer": "7792", "name": "Provisionen, Gebühren Kredit- und Debitkarten"}, {"nummer": "8050", "name": "Zinsenerträge aus Bankguthaben"}, {"nummer": "8055", "name": "Verzugszinsenerträge"}, {"nummer": "8310", "name": "Zinsenaufwand für Bankkredite"}, {"nummer": "8320", "name": "Verzugszinsenaufwand"}, {"nummer": "8321", "name": "Mahnspesen"}, {"nummer": "9600", "name": "Privat"}, {"nummer": "20010", "name": "Kammfeder Fitness e.U."}, {"nummer": "20020", "name": "Atemweide Yoga & Pilates e.U."}, {"nummer": "20030", "name": "Innquell Möbelmanufaktur GmbH"}, {"nummer": "33010", "name": "Nadelstrom Elektronik Großhandel GmbH"}, {"nummer": "33020", "name": "Schallkern Audio GmbH"}, {"nummer": "33030", "name": "Tauernlogistik Spedition GmbH"}, {"nummer": "33040", "name": "Wachaustern Transport AG"}, {"nummer": "33050", "name": "Kammerstapel Großhandel GmbH"}]};
window.BEMA_MAPPING = {"version": "v2", "datum": "2026-11-21", "aufgaben": [{"id": "E1-01", "einheit": 1, "belegtyp": "Text", "typ": "E1_wareneinkauf_ziel", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": ""}, {"id": "E1-02", "einheit": 1, "belegtyp": "Eingangsrechnung", "typ": "E1_wareneinkauf_ziel", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33020", "hinweis": ""}, {"id": "E1-03", "einheit": 1, "belegtyp": "Text", "typ": "E1_wareneinkauf_bar", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H2700", "hinweis": ""}, {"id": "E1-04", "einheit": 1, "belegtyp": "Text", "typ": "E1_ruecksendung_einkauf", "status": "ok", "haelfte": "", "konten": "S33010+H5000+H2500", "hinweis": ""}, {"id": "E1-05", "einheit": 1, "belegtyp": "Text", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H2800", "hinweis": "Zahlung in E1, Kontenlogik E6"}, {"id": "E1-06", "einheit": 1, "belegtyp": "Gutschrift", "typ": "E1_ruecksendung_einkauf", "status": "ok", "haelfte": "", "konten": "S33020+H5000+H2500", "hinweis": ""}, {"id": "E1-07", "einheit": 1, "belegtyp": "Text", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33020+H2800", "hinweis": "Zahlung in E1, Kontenlogik E6"}, {"id": "E1-08", "einheit": 1, "belegtyp": "Text", "typ": "E1_wareneinkauf_ziel", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": ""}, {"id": "E1-09", "einheit": 1, "belegtyp": "Eingangsrechnung", "typ": "E1_wareneinkauf_ziel", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": ""}, {"id": "E1-10", "einheit": 1, "belegtyp": "Text", "typ": "E1_wareneinkauf_bar", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H2700", "hinweis": ""}, {"id": "E1-11", "einheit": 1, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H2800", "hinweis": "Zahlung in E1, Kontenlogik E6"}, {"id": "E1-12", "einheit": 1, "belegtyp": "Kassabeleg", "typ": "E1_wareneinkauf_bar", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H2700", "hinweis": ""}, {"id": "E2-01", "einheit": 2, "belegtyp": "Text", "typ": "E2_warenverkauf_ziel", "status": "ok", "haelfte": "", "konten": "S20010+H4000+H3500", "hinweis": ""}, {"id": "E2-02", "einheit": 2, "belegtyp": "Ausgangsrechnung", "typ": "E2_warenverkauf_ziel", "status": "ok", "haelfte": "", "konten": "S20020+H4000+H3500", "hinweis": ""}, {"id": "E2-03", "einheit": 2, "belegtyp": "Text", "typ": "E2_warenverkauf_bar", "status": "ok", "haelfte": "", "konten": "S2700+H4000+H3500", "hinweis": ""}, {"id": "E2-04", "einheit": 2, "belegtyp": "Text", "typ": "E2_warenverkauf_bar", "status": "ok", "haelfte": "", "konten": "S2700+H4000+H3500", "hinweis": ""}, {"id": "E2-05", "einheit": 2, "belegtyp": "Text", "typ": "E2_ruecksendung_verkauf", "status": "ok", "haelfte": "", "konten": "S4000+S3500+H20010", "hinweis": ""}, {"id": "E2-06", "einheit": 2, "belegtyp": "Gutschrift", "typ": "E2_ruecksendung_verkauf", "status": "ok", "haelfte": "", "konten": "S4000+S3500+H20020", "hinweis": ""}, {"id": "E2-07", "einheit": 2, "belegtyp": "Text", "typ": "E2_eigenverbrauch", "status": "ok", "haelfte": "", "konten": "S9600+H4900+H3500", "hinweis": ""}, {"id": "E2-08", "einheit": 2, "belegtyp": "Text", "typ": "E2_eigenverbrauch", "status": "ok", "haelfte": "", "konten": "S9600+H4900+H3500", "hinweis": ""}, {"id": "E2-09", "einheit": 2, "belegtyp": "Text", "typ": "E2_warenverkauf_ziel", "status": "ok", "haelfte": "", "konten": "S20020+H4000+H3500", "hinweis": ""}, {"id": "E2-10", "einheit": 2, "belegtyp": "Ausgangsrechnung", "typ": "E2_warenverkauf_ziel", "status": "ok", "haelfte": "", "konten": "S20010+H4000+H3500", "hinweis": ""}, {"id": "E2-11", "einheit": 2, "belegtyp": "Text", "typ": "E2_ruecksendung_verkauf", "status": "ok", "haelfte": "", "konten": "S4000+S3500+H20020", "hinweis": ""}, {"id": "E2-12", "einheit": 2, "belegtyp": "Kassabeleg", "typ": "E2_warenverkauf_bar", "status": "ok", "haelfte": "", "konten": "S2700+H4000+H3500", "hinweis": ""}, {"id": "E2-13", "einheit": 2, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_kunde", "status": "ok", "haelfte": "", "konten": "S2800+H20010", "hinweis": "Zahlung in E2, Kontenlogik E6"}, {"id": "E3-01", "einheit": 3, "belegtyp": "Text", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33030", "hinweis": ""}, {"id": "E3-02", "einheit": 3, "belegtyp": "Eingangsrechnung", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33030", "hinweis": ""}, {"id": "E3-03", "einheit": 3, "belegtyp": "Text", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H2700", "hinweis": ""}, {"id": "E3-04", "einheit": 3, "belegtyp": "Text", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33040", "hinweis": ""}, {"id": "E3-05", "einheit": 3, "belegtyp": "Text", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": ""}, {"id": "E3-06", "einheit": 3, "belegtyp": "Eingangsrechnung", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": ""}, {"id": "E3-07", "einheit": 3, "belegtyp": "Text", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33040", "hinweis": ""}, {"id": "E3-08", "einheit": 3, "belegtyp": "Kassabeleg", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H2700", "hinweis": ""}, {"id": "E3-09", "einheit": 3, "belegtyp": "Text", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33030", "hinweis": ""}, {"id": "E3-10", "einheit": 3, "belegtyp": "Text", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33040", "hinweis": ""}, {"id": "E3-11", "einheit": 3, "belegtyp": "Eingangsrechnung", "typ": "E3_bezugskosten", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33040", "hinweis": ""}, {"id": "E3-12", "einheit": 3, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33030+H2800", "hinweis": "Zahlung in E3, Kontenlogik E6"}, {"id": "E4-01", "einheit": 4, "belegtyp": "Text", "typ": "E4_versand_spedition", "status": "ok", "haelfte": "", "konten": "S7300+S2500+H33030", "hinweis": ""}, {"id": "E4-02", "einheit": 4, "belegtyp": "Eingangsrechnung", "typ": "E4_versand_spedition", "status": "ok", "haelfte": "", "konten": "S7300+S2500+H33030", "hinweis": ""}, {"id": "E4-03", "einheit": 4, "belegtyp": "Text", "typ": "E4_versand_spedition", "status": "ok", "haelfte": "", "konten": "S7300+S2500+H2700", "hinweis": ""}, {"id": "E4-04", "einheit": 4, "belegtyp": "Text", "typ": "E4_paket_20", "status": "ok", "haelfte": "", "konten": "S7310+S2500+H2700", "hinweis": ""}, {"id": "E4-05", "einheit": 4, "belegtyp": "Text", "typ": "E4_paket_0", "status": "ok", "haelfte": "", "konten": "S7311+H2700", "hinweis": ""}, {"id": "E4-06", "einheit": 4, "belegtyp": "Kassabeleg", "typ": "E4_paket_20", "status": "ok", "haelfte": "", "konten": "S7310+S2500+H2700", "hinweis": ""}, {"id": "E4-07", "einheit": 4, "belegtyp": "Kassabeleg", "typ": "E4_paket_0", "status": "ok", "haelfte": "", "konten": "S7311+H2700", "hinweis": ""}, {"id": "E4-08", "einheit": 4, "belegtyp": "Text", "typ": "E4_versand_spedition", "status": "ok", "haelfte": "", "konten": "S7300+S2500+H33040", "hinweis": ""}, {"id": "E4-09", "einheit": 4, "belegtyp": "Eingangsrechnung", "typ": "E4_versand_spedition", "status": "ok", "haelfte": "", "konten": "S7300+S2500+H33040", "hinweis": ""}, {"id": "E4-10", "einheit": 4, "belegtyp": "Text", "typ": "E4_paket_20", "status": "ok", "haelfte": "", "konten": "S7310+S7311+S2500+H2700", "hinweis": ""}, {"id": "E4-11", "einheit": 4, "belegtyp": "Kassabeleg", "typ": "E4_versand_spedition", "status": "ok", "haelfte": "", "konten": "S7300+S2500+H2700", "hinweis": ""}, {"id": "E4-12", "einheit": 4, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33040+H2800", "hinweis": "Zahlung in E4, Kontenlogik E6"}, {"id": "E5-01", "einheit": 5, "belegtyp": "Text", "typ": "E5_sofortrabatt", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": ""}, {"id": "E5-02", "einheit": 5, "belegtyp": "Eingangsrechnung", "typ": "E5_sofortrabatt", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33020", "hinweis": ""}, {"id": "E5-03", "einheit": 5, "belegtyp": "Text", "typ": "E5_sofortrabatt_verkauf", "status": "ok", "haelfte": "", "konten": "S20030+H4000+H3500", "hinweis": ""}, {"id": "E5-04", "einheit": 5, "belegtyp": "Ausgangsrechnung", "typ": "E5_sofortrabatt_verkauf", "status": "ok", "haelfte": "", "konten": "S20010+H4000+H3500", "hinweis": ""}, {"id": "E5-05", "einheit": 5, "belegtyp": "Text", "typ": "E5_nachlass_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H5000+H2500", "hinweis": ""}, {"id": "E5-06", "einheit": 5, "belegtyp": "Gutschrift", "typ": "E5_nachlass_lieferant", "status": "ok", "haelfte": "", "konten": "S33020+H5000+H2500", "hinweis": ""}, {"id": "E5-07", "einheit": 5, "belegtyp": "Text", "typ": "E5_nachlass_kunde", "status": "ok", "haelfte": "", "konten": "S4400+S3500+H20030", "hinweis": ""}, {"id": "E5-08", "einheit": 5, "belegtyp": "Gutschrift", "typ": "E5_nachlass_kunde", "status": "ok", "haelfte": "", "konten": "S4400+S3500+H20010", "hinweis": ""}, {"id": "E5-09", "einheit": 5, "belegtyp": "Text", "typ": "E2_ruecksendung_verkauf", "status": "ok", "haelfte": "", "konten": "S4000+S3500+H20010", "hinweis": "Rücksendung in E5, Kontenlogik E2"}, {"id": "E5-10", "einheit": 5, "belegtyp": "Text", "typ": "E5_nachlass_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H5000+H2500", "hinweis": ""}, {"id": "E5-11", "einheit": 5, "belegtyp": "Text", "typ": "E5_sofortrabatt", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33020", "hinweis": ""}, {"id": "E5-12", "einheit": 5, "belegtyp": "Ausgangsrechnung", "typ": "E5_sofortrabatt_verkauf", "status": "ok", "haelfte": "", "konten": "S20030+H4000+H3500", "hinweis": ""}, {"id": "E5-13", "einheit": 5, "belegtyp": "Gutschrift", "typ": "E5_nachlass_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H5000+H2500", "hinweis": ""}, {"id": "E5-14", "einheit": 5, "belegtyp": "Gutschrift", "typ": "E2_ruecksendung_verkauf", "status": "ok", "haelfte": "", "konten": "S4000+S3500+H20030", "hinweis": "Rücksendung in E5, Kontenlogik E2"}, {"id": "E6-01", "einheit": 6, "belegtyp": "Text", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H2800", "hinweis": ""}, {"id": "E6-02", "einheit": 6, "belegtyp": "Text", "typ": "E6_zahlung_kunde", "status": "ok", "haelfte": "", "konten": "S2800+H20010", "hinweis": ""}, {"id": "E6-03", "einheit": 6, "belegtyp": "Text", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33020+H2800", "hinweis": ""}, {"id": "E6-04", "einheit": 6, "belegtyp": "Text", "typ": "E6_zahlung_kunde", "status": "ok", "haelfte": "", "konten": "S2800+H20030", "hinweis": ""}, {"id": "E6-05", "einheit": 6, "belegtyp": "Text", "typ": "E6_zahlung_kunde", "status": "ok", "haelfte": "", "konten": "S2800+H20020", "hinweis": ""}, {"id": "E6-06", "einheit": 6, "belegtyp": "Text", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H2800", "hinweis": ""}, {"id": "E6-07", "einheit": 6, "belegtyp": "Text", "typ": "E6_zahlung_kunde", "status": "ok", "haelfte": "", "konten": "S2800+H20010", "hinweis": ""}, {"id": "E6-08", "einheit": 6, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33010+H2800", "hinweis": ""}, {"id": "E6-09", "einheit": 6, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_kunde", "status": "ok", "haelfte": "", "konten": "S2800+H20010", "hinweis": ""}, {"id": "E6-10", "einheit": 6, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33020+H2800", "hinweis": ""}, {"id": "E6-11", "einheit": 6, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_kunde", "status": "ok", "haelfte": "", "konten": "S2800+H20030", "hinweis": ""}, {"id": "E7-01", "einheit": 7, "belegtyp": "Text", "typ": "E7_kunde_kreditkarte", "status": "ok", "haelfte": "", "konten": "S2880+H4000+H3500", "hinweis": ""}, {"id": "E7-02", "einheit": 7, "belegtyp": "Text", "typ": "E7_karteneingang_mit_gebuehr", "status": "ok", "haelfte": "", "konten": "S2800+S7792+S2500+H2880", "hinweis": ""}, {"id": "E7-03", "einheit": 7, "belegtyp": "Text", "typ": "E7_kunde_debitkarte", "status": "ok", "haelfte": "", "konten": "S2885+H4000+H3500", "hinweis": ""}, {"id": "E7-04", "einheit": 7, "belegtyp": "Text", "typ": "E7_karteneingang_ohne_gebuehr", "status": "ok", "haelfte": "", "konten": "S2800+H2885", "hinweis": ""}, {"id": "E7-05", "einheit": 7, "belegtyp": "Text", "typ": "E7_kartengebuehr_gesondert", "status": "ok", "haelfte": "", "konten": "S7792+S2500+H2800", "hinweis": ""}, {"id": "E7-06", "einheit": 7, "belegtyp": "Text", "typ": "E7_eigene_firmenkarte", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H3180", "hinweis": ""}, {"id": "E7-07", "einheit": 7, "belegtyp": "Text", "typ": "E7_firmenkarte_ausgleich", "status": "ok", "haelfte": "", "konten": "S3180+H2800", "hinweis": ""}, {"id": "E7-08", "einheit": 7, "belegtyp": "Text", "typ": "E7_eigene_firmenkarte", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H3190", "hinweis": ""}, {"id": "E7-09", "einheit": 7, "belegtyp": "Kartenbeleg", "typ": "E7_kunde_kreditkarte", "status": "ok", "haelfte": "", "konten": "S2880+H4000+H3500", "hinweis": ""}, {"id": "E7-10", "einheit": 7, "belegtyp": "Kartenbeleg", "typ": "E7_kunde_debitkarte", "status": "ok", "haelfte": "", "konten": "S2885+H4000+H3500", "hinweis": ""}, {"id": "E7-11", "einheit": 7, "belegtyp": "Kontoauszug", "typ": "E7_karteneingang_mit_gebuehr", "status": "ok", "haelfte": "", "konten": "S2800+S7792+S2500+H2880", "hinweis": ""}, {"id": "E7-12", "einheit": 7, "belegtyp": "Kontoauszug", "typ": "E7_karteneingang_ohne_gebuehr", "status": "ok", "haelfte": "", "konten": "S2800+H2885", "hinweis": ""}, {"id": "E7-13", "einheit": 7, "belegtyp": "Kontoauszug", "typ": "E7_kartengebuehr_gesondert", "status": "ok", "haelfte": "", "konten": "S7792+S2500+H2800", "hinweis": ""}, {"id": "E7-14", "einheit": 7, "belegtyp": "Kartenbeleg", "typ": "E7_eigene_firmenkarte", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H3190", "hinweis": ""}, {"id": "E7-15", "einheit": 7, "belegtyp": "Kontoauszug", "typ": "E7_firmenkarte_ausgleich", "status": "ok", "haelfte": "", "konten": "S3180+H2800", "hinweis": ""}, {"id": "E8-01", "einheit": 8, "belegtyp": "Text", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33010+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-02", "einheit": 8, "belegtyp": "Text", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33020+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-03", "einheit": 8, "belegtyp": "Text", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33010+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-04", "einheit": 8, "belegtyp": "Text", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33020+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-05", "einheit": 8, "belegtyp": "Text", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33010+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-06", "einheit": 8, "belegtyp": "Text", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33020+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-07", "einheit": 8, "belegtyp": "Text", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33010+H2800", "hinweis": ""}, {"id": "E8-08", "einheit": 8, "belegtyp": "Eingangsrechnung", "typ": "E1_wareneinkauf_ziel", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": "ER in E8 (Vorbereitung Skonto), Kontenlogik E1"}, {"id": "E8-09", "einheit": 8, "belegtyp": "Kontoauszug", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33010+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-10", "einheit": 8, "belegtyp": "Eingangsrechnung", "typ": "E1_wareneinkauf_ziel", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33020", "hinweis": "ER in E8 (Vorbereitung Skonto), Kontenlogik E1"}, {"id": "E8-11", "einheit": 8, "belegtyp": "Kontoauszug", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33020+H5880+H2500+H2800", "hinweis": ""}, {"id": "E8-12", "einheit": 8, "belegtyp": "Eingangsrechnung", "typ": "E1_wareneinkauf_ziel", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33010", "hinweis": "ER in E8 (Vorbereitung Skonto), Kontenlogik E1"}, {"id": "E8-13", "einheit": 8, "belegtyp": "Kontoauszug", "typ": "E8_lieferantenskonto", "status": "ok", "haelfte": "", "konten": "S33010+H2800", "hinweis": ""}, {"id": "E9-01", "einheit": 9, "belegtyp": "Text", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20030", "hinweis": ""}, {"id": "E9-02", "einheit": 9, "belegtyp": "Text", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20010", "hinweis": ""}, {"id": "E9-03", "einheit": 9, "belegtyp": "Text", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20020", "hinweis": ""}, {"id": "E9-04", "einheit": 9, "belegtyp": "Text", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20030", "hinweis": ""}, {"id": "E9-05", "einheit": 9, "belegtyp": "Text", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20010", "hinweis": ""}, {"id": "E9-06", "einheit": 9, "belegtyp": "Text", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20020", "hinweis": ""}, {"id": "E9-07", "einheit": 9, "belegtyp": "Text", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+H20030", "hinweis": ""}, {"id": "E9-08", "einheit": 9, "belegtyp": "Ausgangsrechnung", "typ": "E2_warenverkauf_ziel", "status": "ok", "haelfte": "", "konten": "S20030+H4000+H3500", "hinweis": "AR in E9 (Vorbereitung Skonto), Kontenlogik E2"}, {"id": "E9-09", "einheit": 9, "belegtyp": "Kontoauszug", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20030", "hinweis": ""}, {"id": "E9-10", "einheit": 9, "belegtyp": "Ausgangsrechnung", "typ": "E2_warenverkauf_ziel", "status": "ok", "haelfte": "", "konten": "S20010+H4000+H3500", "hinweis": "AR in E9 (Vorbereitung Skonto), Kontenlogik E2"}, {"id": "E9-11", "einheit": 9, "belegtyp": "Kontoauszug", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+S4410+S3500+H20010", "hinweis": ""}, {"id": "E9-12", "einheit": 9, "belegtyp": "Ausgangsrechnung", "typ": "E2_warenverkauf_ziel", "status": "ok", "haelfte": "", "konten": "S20020+H4000+H3500", "hinweis": "AR in E9 (Vorbereitung Skonto), Kontenlogik E2"}, {"id": "E9-13", "einheit": 9, "belegtyp": "Kontoauszug", "typ": "E9_kundenskonto", "status": "ok", "haelfte": "", "konten": "S2800+H20020", "hinweis": ""}, {"id": "E10-01", "einheit": 10, "belegtyp": "Text", "typ": "E10_mahnung_kunde", "status": "ok", "haelfte": "", "konten": "S20010+H4890", "hinweis": ""}, {"id": "E10-02", "einheit": 10, "belegtyp": "Text", "typ": "E10_mahnung_lieferant", "status": "ok", "haelfte": "", "konten": "S8321+H33010", "hinweis": ""}, {"id": "E10-03", "einheit": 10, "belegtyp": "Text", "typ": "E10_mahnung_kunde", "status": "ok", "haelfte": "", "konten": "S20020+H8055", "hinweis": ""}, {"id": "E10-04", "einheit": 10, "belegtyp": "Text", "typ": "E10_mahnung_lieferant", "status": "ok", "haelfte": "", "konten": "S8320+H33020", "hinweis": ""}, {"id": "E10-05", "einheit": 10, "belegtyp": "Text", "typ": "E10_mahnung_kunde", "status": "ok", "haelfte": "", "konten": "S20030+H4890", "hinweis": ""}, {"id": "E10-06", "einheit": 10, "belegtyp": "Text", "typ": "E10_mahnung_lieferant", "status": "ok", "haelfte": "", "konten": "S8320+H33010", "hinweis": ""}, {"id": "E10-07", "einheit": 10, "belegtyp": "Text", "typ": "E10_mahnung_kunde", "status": "ok", "haelfte": "", "konten": "S20010+H4890+H8055", "hinweis": ""}, {"id": "E10-08", "einheit": 10, "belegtyp": "Mahnung", "typ": "E10_mahnung_kunde", "status": "ok", "haelfte": "", "konten": "S20010+H4890", "hinweis": ""}, {"id": "E10-09", "einheit": 10, "belegtyp": "Mahnung", "typ": "E10_mahnung_lieferant", "status": "ok", "haelfte": "", "konten": "S8321+S8320+H33010", "hinweis": ""}, {"id": "E10-10", "einheit": 10, "belegtyp": "Mahnung", "typ": "E10_mahnung_kunde", "status": "ok", "haelfte": "", "konten": "S20020+H4890+H8055", "hinweis": ""}, {"id": "E10-11", "einheit": 10, "belegtyp": "Mahnung", "typ": "E10_mahnung_lieferant", "status": "ok", "haelfte": "", "konten": "S8320+H33020", "hinweis": ""}, {"id": "E11-01", "einheit": 11, "belegtyp": "Text", "typ": "E11_bareinzahlung", "status": "ok", "haelfte": "K", "konten": "S2870+H2700", "hinweis": ""}, {"id": "E11-02", "einheit": 11, "belegtyp": "Text", "typ": "E11_bareinzahlung", "status": "ok", "haelfte": "B", "konten": "S2800+H2870", "hinweis": ""}, {"id": "E11-03", "einheit": 11, "belegtyp": "Text", "typ": "E11_barbehebung", "status": "ok", "haelfte": "K", "konten": "S2700+H2870", "hinweis": ""}, {"id": "E11-04", "einheit": 11, "belegtyp": "Text", "typ": "E11_barbehebung", "status": "ok", "haelfte": "B", "konten": "S2870+H2800", "hinweis": ""}, {"id": "E11-05", "einheit": 11, "belegtyp": "Text", "typ": "E11_bareinzahlung", "status": "ok", "haelfte": "K", "konten": "S2870+H2700", "hinweis": ""}, {"id": "E11-06", "einheit": 11, "belegtyp": "Text", "typ": "E11_barbehebung", "status": "ok", "haelfte": "B", "konten": "S2870+H2800", "hinweis": ""}, {"id": "E11-07", "einheit": 11, "belegtyp": "Text", "typ": "E11_bareinzahlung", "status": "ok", "haelfte": "B", "konten": "S2800+H2870", "hinweis": ""}, {"id": "E11-08", "einheit": 11, "belegtyp": "Kontoauszug", "typ": "E11_bareinzahlung", "status": "ok", "haelfte": "B", "konten": "S2800+H2870", "hinweis": ""}, {"id": "E11-09", "einheit": 11, "belegtyp": "Kontoauszug", "typ": "E11_barbehebung", "status": "ok", "haelfte": "B", "konten": "S2870+H2800", "hinweis": ""}, {"id": "E11-10", "einheit": 11, "belegtyp": "Kontoauszug", "typ": "E11_bareinzahlung", "status": "ok", "haelfte": "B", "konten": "S2800+H2870", "hinweis": ""}, {"id": "E11-11", "einheit": 11, "belegtyp": "Kontoauszug", "typ": "E11_barbehebung", "status": "ok", "haelfte": "B", "konten": "S2870+H2800", "hinweis": ""}, {"id": "E12-01", "einheit": 12, "belegtyp": "Text", "typ": "E12_habenzinsen_kest", "status": "ok", "haelfte": "", "konten": "S2800+H8050", "hinweis": ""}, {"id": "E12-02", "einheit": 12, "belegtyp": "Text", "typ": "E12_kest_allein", "status": "ok", "haelfte": "", "konten": "S9600+H2800", "hinweis": ""}, {"id": "E12-03", "einheit": 12, "belegtyp": "Text", "typ": "E12_sollzinsen", "status": "ok", "haelfte": "", "konten": "S8310+H2800", "hinweis": ""}, {"id": "E12-04", "einheit": 12, "belegtyp": "Text", "typ": "E12_bankspesen", "status": "ok", "haelfte": "", "konten": "S7790+H2800", "hinweis": ""}, {"id": "E12-05", "einheit": 12, "belegtyp": "Text", "typ": "E12_habenzinsen_kest", "status": "ok", "haelfte": "", "konten": "S2800+H8050", "hinweis": ""}, {"id": "E12-06", "einheit": 12, "belegtyp": "Text", "typ": "E12_kest_allein", "status": "ok", "haelfte": "", "konten": "S9600+H2800", "hinweis": ""}, {"id": "E12-07", "einheit": 12, "belegtyp": "Text", "typ": "E12_bankspesen", "status": "ok", "haelfte": "", "konten": "S7790+H2800", "hinweis": ""}, {"id": "E12-08", "einheit": 12, "belegtyp": "Bankabrechnung", "typ": "E12_habenzinsen_kest", "status": "ok", "haelfte": "", "konten": "S2800+S9600+H8050", "hinweis": ""}, {"id": "E12-09", "einheit": 12, "belegtyp": "Bankabrechnung", "typ": "E12_habenzinsen_kest", "status": "ok", "haelfte": "", "konten": "S2800+S9600+H8050", "hinweis": ""}, {"id": "E12-10", "einheit": 12, "belegtyp": "Bankabrechnung", "typ": "E12_bankspesen", "status": "ok", "haelfte": "", "konten": "S7790+H2800", "hinweis": ""}, {"id": "E12-11", "einheit": 12, "belegtyp": "Bankabrechnung", "typ": "E12_sollzinsen", "status": "ok", "haelfte": "", "konten": "S8310+H2800", "hinweis": ""}, {"id": "E12-12", "einheit": 12, "belegtyp": "Kontoauszug", "typ": "E12_sollzinsen", "status": "ok", "haelfte": "", "konten": "S8310+H2800", "hinweis": ""}, {"id": "E13-01", "einheit": 13, "belegtyp": "Text", "typ": "E13_grundsteuer", "status": "ok", "haelfte": "", "konten": "S7100+H2800", "hinweis": ""}, {"id": "E13-02", "einheit": 13, "belegtyp": "Text", "typ": "E13_kammerumlage", "status": "ok", "haelfte": "", "konten": "S7780+H2800", "hinweis": ""}, {"id": "E13-03", "einheit": 13, "belegtyp": "Text", "typ": "E13_einkommensteuer", "status": "ok", "haelfte": "", "konten": "S9600+H2800", "hinweis": ""}, {"id": "E13-04", "einheit": 13, "belegtyp": "Text", "typ": "E13_ust_zahllast", "status": "ok", "haelfte": "", "konten": "S3520+H2800", "hinweis": ""}, {"id": "E13-05", "einheit": 13, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0200+H2800", "hinweis": "GrESt / Grundstückskauf – nicht erzeugen"}, {"id": "E13-06", "einheit": 13, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0200+H2800", "hinweis": "GrESt / Grundstückskauf – nicht erzeugen"}, {"id": "E13-07", "einheit": 13, "belegtyp": "Text", "typ": "E13_kammerumlage", "status": "ok", "haelfte": "", "konten": "S7780+H2800", "hinweis": ""}, {"id": "E13-08", "einheit": 13, "belegtyp": "Text", "typ": "E13_einkommensteuer", "status": "ok", "haelfte": "", "konten": "S9600+H2800", "hinweis": ""}, {"id": "E13-09", "einheit": 13, "belegtyp": "Zahlungsaufforderung", "typ": "E13_grundsteuer", "status": "ok", "haelfte": "", "konten": "S7100+H2800", "hinweis": ""}, {"id": "E13-10", "einheit": 13, "belegtyp": "Kontoauszug", "typ": "E13_ust_zahllast", "status": "ok", "haelfte": "", "konten": "S3520+H2800", "hinweis": ""}, {"id": "E13-11", "einheit": 13, "belegtyp": "Kontoauszug", "typ": "E13_einkommensteuer", "status": "ok", "haelfte": "", "konten": "S9600+H2800", "hinweis": ""}, {"id": "E13-12", "einheit": 13, "belegtyp": "Kontoauszug", "typ": "E13_kammerumlage", "status": "ok", "haelfte": "", "konten": "S7780+H2800", "hinweis": ""}, {"id": "E14-01", "einheit": 14, "belegtyp": "Text", "typ": "E14_pkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7320+H3190", "hinweis": ""}, {"id": "E14-02", "einheit": 14, "belegtyp": "Text", "typ": "E14_pkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7320+H2800", "hinweis": ""}, {"id": "E14-03", "einheit": 14, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S7320+S2500+H3190", "hinweis": "Elektro-Pkw – nicht erzeugen"}, {"id": "E14-04", "einheit": 14, "belegtyp": "Text", "typ": "E14_lkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7330+S2500+H3190", "hinweis": ""}, {"id": "E14-05", "einheit": 14, "belegtyp": "Text", "typ": "E14_versicherung", "status": "ok", "haelfte": "", "konten": "S7330+H2800", "hinweis": ""}, {"id": "E14-06", "einheit": 14, "belegtyp": "Text", "typ": "E14_pkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7320+H2800", "hinweis": ""}, {"id": "E14-07", "einheit": 14, "belegtyp": "Text", "typ": "E14_versicherung", "status": "ok", "haelfte": "", "konten": "S7320+H2800", "hinweis": ""}, {"id": "E14-08", "einheit": 14, "belegtyp": "Text", "typ": "E14_lkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7330+S2500+H2800", "hinweis": ""}, {"id": "E14-09", "einheit": 14, "belegtyp": "Kartenbeleg", "typ": "E14_pkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7320+H3190", "hinweis": ""}, {"id": "E14-10", "einheit": 14, "belegtyp": "Kartenbeleg", "typ": "E14_lkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7330+S2500+H3190", "hinweis": ""}, {"id": "E14-11", "einheit": 14, "belegtyp": "Kartenbeleg", "typ": "E14_lkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7330+S2500+H3190", "hinweis": ""}, {"id": "E14-12", "einheit": 14, "belegtyp": "Kartenbeleg", "typ": "E14_pkw_betrieb", "status": "ok", "haelfte": "", "konten": "S7320+H3190", "hinweis": ""}, {"id": "E14-13", "einheit": 14, "belegtyp": "Kontoauszug", "typ": "E14_versicherung", "status": "ok", "haelfte": "", "konten": "S7330+H2800", "hinweis": ""}, {"id": "E15-01", "einheit": 15, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+H2800", "hinweis": "Pkw-Kauf / NoVA / Elektro – nicht erzeugen"}, {"id": "E15-02", "einheit": 15, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+H2800", "hinweis": "Anmeldekosten – nicht erzeugen"}, {"id": "E15-03", "einheit": 15, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+H2800", "hinweis": "Pkw-Kauf / NoVA / Elektro – nicht erzeugen"}, {"id": "E15-04", "einheit": 15, "belegtyp": "Text", "typ": "E15_lkw_kauf", "status": "ok", "haelfte": "", "konten": "S0640+S2500+H2800", "hinweis": "Haben 2800 wie E15-04/E15-11; Spurweite hat kein Personenkonto"}, {"id": "E15-05", "einheit": 15, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+S2500+H2800", "hinweis": "Pkw-Kauf / NoVA / Elektro – nicht erzeugen"}, {"id": "E15-06", "einheit": 15, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0640+H2800", "hinweis": "Anmeldekosten – nicht erzeugen"}, {"id": "E15-07", "einheit": 15, "belegtyp": "Text", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+H2800", "hinweis": "Pkw-Kauf / NoVA / Elektro – nicht erzeugen"}, {"id": "E15-08", "einheit": 15, "belegtyp": "Eingangsrechnung", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+H2800", "hinweis": "Pkw-Kauf / NoVA / Elektro – nicht erzeugen"}, {"id": "E15-09", "einheit": 15, "belegtyp": "Eingangsrechnung", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+H2800", "hinweis": "Pkw-Kauf / NoVA / Elektro – nicht erzeugen"}, {"id": "E15-10", "einheit": 15, "belegtyp": "Eingangsrechnung", "typ": "—", "status": "verboten", "haelfte": "", "konten": "S0630+S2500+H2800", "hinweis": "Pkw-Kauf / NoVA / Elektro – nicht erzeugen"}, {"id": "E15-11", "einheit": 15, "belegtyp": "Eingangsrechnung", "typ": "E15_lkw_kauf", "status": "ok", "haelfte": "", "konten": "S0640+S2500+H2800", "hinweis": "Haben 2800 wie E15-04/E15-11; Spurweite hat kein Personenkonto"}, {"id": "E16-01", "einheit": 16, "belegtyp": "Eingangsrechnung", "typ": "E16_material_verbrauch", "status": "ok", "haelfte": "", "konten": "S5340+S2500+H33050", "hinweis": ""}, {"id": "E16-02", "einheit": 16, "belegtyp": "Kontoauszug", "typ": "E6_zahlung_lieferant", "status": "ok", "haelfte": "", "konten": "S33050+H2800", "hinweis": "Zahlung in E16, Kontenlogik E6"}, {"id": "E16-03", "einheit": 16, "belegtyp": "Kassabeleg", "typ": "E16_material_verbrauch", "status": "ok", "haelfte": "", "konten": "S5450+S2500+H2700", "hinweis": "Variante bar, Beleggruppe K"}, {"id": "E16-04", "einheit": 16, "belegtyp": "Eingangsrechnung", "typ": "E16_material_verbrauch", "status": "ok", "haelfte": "", "konten": "S7240+S2500+H2800", "hinweis": "Variante sofort Bank"}, {"id": "E16-05", "einheit": 16, "belegtyp": "Kassabeleg", "typ": "E16_material_verbrauch", "status": "ok", "haelfte": "", "konten": "S7600+S2500+H2700", "hinweis": "Variante bar, Beleggruppe K"}, {"id": "E16-06", "einheit": 16, "belegtyp": "Eingangsrechnung", "typ": "E16_material_verbrauch", "status": "ok", "haelfte": "", "konten": "S5340+S2500+H33050", "hinweis": ""}, {"id": "E16-07", "einheit": 16, "belegtyp": "Eingangsrechnung", "typ": "E16_material_weiterverkauf", "status": "ok", "haelfte": "", "konten": "S5000+S2500+H33050", "hinweis": ""}, {"id": "E16-08", "einheit": 16, "belegtyp": "Eingangsrechnung", "typ": "E16_material_verbrauch", "status": "ok", "haelfte": "", "konten": "S7600+S2500+H33050", "hinweis": ""}, {"id": "E17-01", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S1360+H7240", "hinweis": ""}, {"id": "E17-02", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S5340+H1340", "hinweis": ""}, {"id": "E17-03", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S1370+H5450", "hinweis": ""}, {"id": "E17-04", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S7600+H1390", "hinweis": ""}, {"id": "E17-05", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S7280+H1364", "hinweis": ""}, {"id": "E17-06", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S7240+H1360", "hinweis": ""}, {"id": "E17-07", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S1340+H5340", "hinweis": ""}, {"id": "E17-08", "einheit": 17, "belegtyp": "Inventurliste", "typ": "E17_inventur", "status": "ok", "haelfte": "", "konten": "S1390+H7600", "hinweis": ""}]};
window.BEMA_STUFE_B = true;
var BEMA_VENDOR=(()=>{var jr=Object.create;var hr=Object.defineProperty;var qr=Object.getOwnPropertyDescriptor;var Wr=Object.getOwnPropertyNames;var Xr=Object.getPrototypeOf,Vr=Object.prototype.hasOwnProperty;var rt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),tt=(e,t)=>{for(var a in t)hr(e,a,{get:t[a],enumerable:!0})},Er=(e,t,a,f)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of Wr(t))!Vr.call(e,c)&&c!==a&&hr(e,c,{get:()=>t[c],enumerable:!(f=qr(t,c))||f.enumerable});return e};var et=(e,t,a)=>(a=e!=null?jr(Xr(e)):{},Er(t||!e||!e.__esModule?hr(a,"default",{value:e,enumerable:!0}):a,e)),nt=e=>Er(hr({},"__esModule",{value:!0}),e);var Jr=rt((Qr,Yr)=>{var Kr=(function(){var e=function(m,d){var w=236,A=17,o=m,g=a[d],n=null,r=0,x=null,h=[],p={},b=function(u,v){r=o*4+17,n=(function(i){for(var l=new Array(i),y=0;y<i;y+=1){l[y]=new Array(i);for(var M=0;M<i;M+=1)l[y][M]=null}return l})(r),E(0,0),E(r-7,0),E(0,r-7),U(),O(),Q(u,v),o>=7&&G(u),x==null&&(x=ar(o,g,h)),q(x,v)},E=function(u,v){for(var i=-1;i<=7;i+=1)if(!(u+i<=-1||r<=u+i))for(var l=-1;l<=7;l+=1)v+l<=-1||r<=v+l||(0<=i&&i<=6&&(l==0||l==6)||0<=l&&l<=6&&(i==0||i==6)||2<=i&&i<=4&&2<=l&&l<=4?n[u+i][v+l]=!0:n[u+i][v+l]=!1)},P=function(){for(var u=0,v=0,i=0;i<8;i+=1){b(!0,i);var l=c.getLostPoint(p);(i==0||u>l)&&(u=l,v=i)}return v},O=function(){for(var u=8;u<r-8;u+=1)n[u][6]==null&&(n[u][6]=u%2==0);for(var v=8;v<r-8;v+=1)n[6][v]==null&&(n[6][v]=v%2==0)},U=function(){for(var u=c.getPatternPosition(o),v=0;v<u.length;v+=1)for(var i=0;i<u.length;i+=1){var l=u[v],y=u[i];if(n[l][y]==null)for(var M=-2;M<=2;M+=1)for(var D=-2;D<=2;D+=1)M==-2||M==2||D==-2||D==2||M==0&&D==0?n[l+M][y+D]=!0:n[l+M][y+D]=!1}},G=function(u){for(var v=c.getBCHTypeNumber(o),i=0;i<18;i+=1){var l=!u&&(v>>i&1)==1;n[Math.floor(i/3)][i%3+r-8-3]=l}for(var i=0;i<18;i+=1){var l=!u&&(v>>i&1)==1;n[i%3+r-8-3][Math.floor(i/3)]=l}},Q=function(u,v){for(var i=g<<3|v,l=c.getBCHTypeInfo(i),y=0;y<15;y+=1){var M=!u&&(l>>y&1)==1;y<6?n[y][8]=M:y<8?n[y+1][8]=M:n[r-15+y][8]=M}for(var y=0;y<15;y+=1){var M=!u&&(l>>y&1)==1;y<8?n[8][r-y-1]=M:y<9?n[8][15-y-1+1]=M:n[8][15-y-1]=M}n[r-8][8]=!u},q=function(u,v){for(var i=-1,l=r-1,y=7,M=0,D=c.getMaskFunction(v),C=r-1;C>0;C-=2)for(C==6&&(C-=1);;){for(var N=0;N<2;N+=1)if(n[l][C-N]==null){var H=!1;M<u.length&&(H=(u[M]>>>y&1)==1);var k=D(l,C-N);k&&(H=!H),n[l][C-N]=H,y-=1,y==-1&&(M+=1,y=7)}if(l+=i,l<0||r<=l){l-=i,i=-i;break}}},Y=function(u,v){for(var i=0,l=0,y=0,M=new Array(v.length),D=new Array(v.length),C=0;C<v.length;C+=1){var N=v[C].dataCount,H=v[C].totalCount-N;l=Math.max(l,N),y=Math.max(y,H),M[C]=new Array(N);for(var k=0;k<M[C].length;k+=1)M[C][k]=255&u.getBuffer()[k+i];i+=N;var tr=c.getErrorCorrectPolynomial(H),er=T(M[C],tr.getLength()-1),Tr=er.mod(tr);D[C]=new Array(tr.getLength()-1);for(var k=0;k<D[C].length;k+=1){var Cr=k+Tr.getLength()-D[C].length;D[C][k]=Cr>=0?Tr.getAt(Cr):0}}for(var Dr=0,k=0;k<v.length;k+=1)Dr+=v[k].totalCount;for(var pr=new Array(Dr),vr=0,k=0;k<l;k+=1)for(var C=0;C<v.length;C+=1)k<M[C].length&&(pr[vr]=M[C][k],vr+=1);for(var k=0;k<y;k+=1)for(var C=0;C<v.length;C+=1)k<D[C].length&&(pr[vr]=D[C][k],vr+=1);return pr},ar=function(u,v,i){for(var l=I.getRSBlocks(u,v),y=R(),M=0;M<i.length;M+=1){var D=i[M];y.put(D.getMode(),4),y.put(D.getLength(),c.getLengthInBits(D.getMode(),u)),D.write(y)}for(var C=0,M=0;M<l.length;M+=1)C+=l[M].dataCount;if(y.getLengthInBits()>C*8)throw"code length overflow. ("+y.getLengthInBits()+">"+C*8+")";for(y.getLengthInBits()+4<=C*8&&y.put(0,4);y.getLengthInBits()%8!=0;)y.putBit(!1);for(;!(y.getLengthInBits()>=C*8||(y.put(w,8),y.getLengthInBits()>=C*8));)y.put(A,8);return Y(y,l)};p.addData=function(u,v){v=v||"Byte";var i=null;switch(v){case"Numeric":i=L(u);break;case"Alphanumeric":i=B(u);break;case"Byte":i=z(u);break;case"Kanji":i=S(u);break;default:throw"mode:"+v}h.push(i),x=null},p.isDark=function(u,v){if(u<0||r<=u||v<0||r<=v)throw u+","+v;return n[u][v]},p.getModuleCount=function(){return r},p.make=function(){if(o<1){for(var u=1;u<40;u++){for(var v=I.getRSBlocks(u,g),i=R(),l=0;l<h.length;l++){var y=h[l];i.put(y.getMode(),4),i.put(y.getLength(),c.getLengthInBits(y.getMode(),u)),y.write(i)}for(var M=0,l=0;l<v.length;l++)M+=v[l].dataCount;if(i.getLengthInBits()<=M*8)break}o=u}b(!1,P())},p.createTableTag=function(u,v){u=u||2,v=typeof v>"u"?u*4:v;var i="";i+='<table style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: "+v+"px;",i+='">',i+="<tbody>";for(var l=0;l<p.getModuleCount();l+=1){i+="<tr>";for(var y=0;y<p.getModuleCount();y+=1)i+='<td style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: 0px;",i+=" width: "+u+"px;",i+=" height: "+u+"px;",i+=" background-color: ",i+=p.isDark(l,y)?"#000000":"#ffffff",i+=";",i+='"/>';i+="</tr>"}return i+="</tbody>",i+="</table>",i},p.createSvgTag=function(u,v,i,l){var y={};typeof arguments[0]=="object"&&(y=arguments[0],u=y.cellSize,v=y.margin,i=y.alt,l=y.title),u=u||2,v=typeof v>"u"?u*4:v,i=typeof i=="string"?{text:i}:i||{},i.text=i.text||null,i.id=i.text?i.id||"qrcode-description":null,l=typeof l=="string"?{text:l}:l||{},l.text=l.text||null,l.id=l.text?l.id||"qrcode-title":null;var M=p.getModuleCount()*u+v*2,D,C,N,H,k="",tr;for(tr="l"+u+",0 0,"+u+" -"+u+",0 0,-"+u+"z ",k+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',k+=y.scalable?"":' width="'+M+'px" height="'+M+'px"',k+=' viewBox="0 0 '+M+" "+M+'" ',k+=' preserveAspectRatio="xMinYMin meet"',k+=l.text||i.text?' role="img" aria-labelledby="'+W([l.id,i.id].join(" ").trim())+'"':"",k+=">",k+=l.text?'<title id="'+W(l.id)+'">'+W(l.text)+"</title>":"",k+=i.text?'<description id="'+W(i.id)+'">'+W(i.text)+"</description>":"",k+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',k+='<path d="',N=0;N<p.getModuleCount();N+=1)for(H=N*u+v,D=0;D<p.getModuleCount();D+=1)p.isDark(N,D)&&(C=D*u+v,k+="M"+C+","+H+tr);return k+='" stroke="transparent" fill="black"/>',k+="</svg>",k},p.createDataURL=function(u,v){u=u||2,v=typeof v>"u"?u*4:v;var i=p.getModuleCount()*u+v*2,l=v,y=i-v;return V(i,i,function(M,D){if(l<=M&&M<y&&l<=D&&D<y){var C=Math.floor((M-l)/u),N=Math.floor((D-l)/u);return p.isDark(N,C)?0:1}else return 1})},p.createImgTag=function(u,v,i){u=u||2,v=typeof v>"u"?u*4:v;var l=p.getModuleCount()*u+v*2,y="";return y+="<img",y+=' src="',y+=p.createDataURL(u,v),y+='"',y+=' width="',y+=l,y+='"',y+=' height="',y+=l,y+='"',i&&(y+=' alt="',y+=W(i),y+='"'),y+="/>",y};var W=function(u){for(var v="",i=0;i<u.length;i+=1){var l=u.charAt(i);switch(l){case"<":v+="&lt;";break;case">":v+="&gt;";break;case"&":v+="&amp;";break;case'"':v+="&quot;";break;default:v+=l;break}}return v},rr=function(u){var v=1;u=typeof u>"u"?v*2:u;var i=p.getModuleCount()*v+u*2,l=u,y=i-u,M,D,C,N,H,k={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},tr={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},er="";for(M=0;M<i;M+=2){for(C=Math.floor((M-l)/v),N=Math.floor((M+1-l)/v),D=0;D<i;D+=1)H="\u2588",l<=D&&D<y&&l<=M&&M<y&&p.isDark(C,Math.floor((D-l)/v))&&(H=" "),l<=D&&D<y&&l<=M+1&&M+1<y&&p.isDark(N,Math.floor((D-l)/v))?H+=" ":H+="\u2588",er+=u<1&&M+1>=y?tr[H]:k[H];er+=`
`}return i%2&&u>0?er.substring(0,er.length-i-1)+Array(i+1).join("\u2580"):er.substring(0,er.length-1)};return p.createASCII=function(u,v){if(u=u||1,u<2)return rr(v);u-=1,v=typeof v>"u"?u*2:v;var i=p.getModuleCount()*u+v*2,l=v,y=i-v,M,D,C,N,H=Array(u+1).join("\u2588\u2588"),k=Array(u+1).join("  "),tr="",er="";for(M=0;M<i;M+=1){for(C=Math.floor((M-l)/u),er="",D=0;D<i;D+=1)N=1,l<=D&&D<y&&l<=M&&M<y&&p.isDark(C,Math.floor((D-l)/u))&&(N=0),er+=N?H:k;for(C=0;C<u;C+=1)tr+=er+`
`}return tr.substring(0,tr.length-1)},p.renderTo2dContext=function(u,v){v=v||2;for(var i=p.getModuleCount(),l=0;l<i;l++)for(var y=0;y<i;y++)u.fillStyle=p.isDark(l,y)?"black":"white",u.fillRect(l*v,y*v,v,v)},p};e.stringToBytesFuncs={default:function(m){for(var d=[],w=0;w<m.length;w+=1){var A=m.charCodeAt(w);d.push(A&255)}return d}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(m,d){var w=(function(){for(var o=Z(m),g=function(){var O=o.read();if(O==-1)throw"eof";return O},n=0,r={};;){var x=o.read();if(x==-1)break;var h=g(),p=g(),b=g(),E=String.fromCharCode(x<<8|h),P=p<<8|b;r[E]=P,n+=1}if(n!=d)throw n+" != "+d;return r})(),A=63;return function(o){for(var g=[],n=0;n<o.length;n+=1){var r=o.charCodeAt(n);if(r<128)g.push(r);else{var x=w[o.charAt(n)];typeof x=="number"?(x&255)==x?g.push(x):(g.push(x>>>8),g.push(x&255)):g.push(A)}}return g}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},a={L:1,M:0,Q:3,H:2},f={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},c=(function(){var m=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],d=1335,w=7973,A=21522,o={},g=function(n){for(var r=0;n!=0;)r+=1,n>>>=1;return r};return o.getBCHTypeInfo=function(n){for(var r=n<<10;g(r)-g(d)>=0;)r^=d<<g(r)-g(d);return(n<<10|r)^A},o.getBCHTypeNumber=function(n){for(var r=n<<12;g(r)-g(w)>=0;)r^=w<<g(r)-g(w);return n<<12|r},o.getPatternPosition=function(n){return m[n-1]},o.getMaskFunction=function(n){switch(n){case f.PATTERN000:return function(r,x){return(r+x)%2==0};case f.PATTERN001:return function(r,x){return r%2==0};case f.PATTERN010:return function(r,x){return x%3==0};case f.PATTERN011:return function(r,x){return(r+x)%3==0};case f.PATTERN100:return function(r,x){return(Math.floor(r/2)+Math.floor(x/3))%2==0};case f.PATTERN101:return function(r,x){return r*x%2+r*x%3==0};case f.PATTERN110:return function(r,x){return(r*x%2+r*x%3)%2==0};case f.PATTERN111:return function(r,x){return(r*x%3+(r+x)%2)%2==0};default:throw"bad maskPattern:"+n}},o.getErrorCorrectPolynomial=function(n){for(var r=T([1],0),x=0;x<n;x+=1)r=r.multiply(T([1,s.gexp(x)],0));return r},o.getLengthInBits=function(n,r){if(1<=r&&r<10)switch(n){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+n}else if(r<27)switch(n){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+n}else if(r<41)switch(n){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+n}else throw"type:"+r},o.getLostPoint=function(n){for(var r=n.getModuleCount(),x=0,h=0;h<r;h+=1)for(var p=0;p<r;p+=1){for(var b=0,E=n.isDark(h,p),P=-1;P<=1;P+=1)if(!(h+P<0||r<=h+P))for(var O=-1;O<=1;O+=1)p+O<0||r<=p+O||P==0&&O==0||E==n.isDark(h+P,p+O)&&(b+=1);b>5&&(x+=3+b-5)}for(var h=0;h<r-1;h+=1)for(var p=0;p<r-1;p+=1){var U=0;n.isDark(h,p)&&(U+=1),n.isDark(h+1,p)&&(U+=1),n.isDark(h,p+1)&&(U+=1),n.isDark(h+1,p+1)&&(U+=1),(U==0||U==4)&&(x+=3)}for(var h=0;h<r;h+=1)for(var p=0;p<r-6;p+=1)n.isDark(h,p)&&!n.isDark(h,p+1)&&n.isDark(h,p+2)&&n.isDark(h,p+3)&&n.isDark(h,p+4)&&!n.isDark(h,p+5)&&n.isDark(h,p+6)&&(x+=40);for(var p=0;p<r;p+=1)for(var h=0;h<r-6;h+=1)n.isDark(h,p)&&!n.isDark(h+1,p)&&n.isDark(h+2,p)&&n.isDark(h+3,p)&&n.isDark(h+4,p)&&!n.isDark(h+5,p)&&n.isDark(h+6,p)&&(x+=40);for(var G=0,p=0;p<r;p+=1)for(var h=0;h<r;h+=1)n.isDark(h,p)&&(G+=1);var Q=Math.abs(100*G/r/r-50)/5;return x+=Q*10,x},o})(),s=(function(){for(var m=new Array(256),d=new Array(256),w=0;w<8;w+=1)m[w]=1<<w;for(var w=8;w<256;w+=1)m[w]=m[w-4]^m[w-5]^m[w-6]^m[w-8];for(var w=0;w<255;w+=1)d[m[w]]=w;var A={};return A.glog=function(o){if(o<1)throw"glog("+o+")";return d[o]},A.gexp=function(o){for(;o<0;)o+=255;for(;o>=256;)o-=255;return m[o]},A})();function T(m,d){if(typeof m.length>"u")throw m.length+"/"+d;var w=(function(){for(var o=0;o<m.length&&m[o]==0;)o+=1;for(var g=new Array(m.length-o+d),n=0;n<m.length-o;n+=1)g[n]=m[n+o];return g})(),A={};return A.getAt=function(o){return w[o]},A.getLength=function(){return w.length},A.multiply=function(o){for(var g=new Array(A.getLength()+o.getLength()-1),n=0;n<A.getLength();n+=1)for(var r=0;r<o.getLength();r+=1)g[n+r]^=s.gexp(s.glog(A.getAt(n))+s.glog(o.getAt(r)));return T(g,0)},A.mod=function(o){if(A.getLength()-o.getLength()<0)return A;for(var g=s.glog(A.getAt(0))-s.glog(o.getAt(0)),n=new Array(A.getLength()),r=0;r<A.getLength();r+=1)n[r]=A.getAt(r);for(var r=0;r<o.getLength();r+=1)n[r]^=s.gexp(s.glog(o.getAt(r))+g);return T(n,0).mod(o)},A}var I=(function(){var m=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],d=function(o,g){var n={};return n.totalCount=o,n.dataCount=g,n},w={},A=function(o,g){switch(g){case a.L:return m[(o-1)*4+0];case a.M:return m[(o-1)*4+1];case a.Q:return m[(o-1)*4+2];case a.H:return m[(o-1)*4+3];default:return}};return w.getRSBlocks=function(o,g){var n=A(o,g);if(typeof n>"u")throw"bad rs block @ typeNumber:"+o+"/errorCorrectionLevel:"+g;for(var r=n.length/3,x=[],h=0;h<r;h+=1)for(var p=n[h*3+0],b=n[h*3+1],E=n[h*3+2],P=0;P<p;P+=1)x.push(d(b,E));return x},w})(),R=function(){var m=[],d=0,w={};return w.getBuffer=function(){return m},w.getAt=function(A){var o=Math.floor(A/8);return(m[o]>>>7-A%8&1)==1},w.put=function(A,o){for(var g=0;g<o;g+=1)w.putBit((A>>>o-g-1&1)==1)},w.getLengthInBits=function(){return d},w.putBit=function(A){var o=Math.floor(d/8);m.length<=o&&m.push(0),A&&(m[o]|=128>>>d%8),d+=1},w},L=function(m){var d=t.MODE_NUMBER,w=m,A={};A.getMode=function(){return d},A.getLength=function(n){return w.length},A.write=function(n){for(var r=w,x=0;x+2<r.length;)n.put(o(r.substring(x,x+3)),10),x+=3;x<r.length&&(r.length-x==1?n.put(o(r.substring(x,x+1)),4):r.length-x==2&&n.put(o(r.substring(x,x+2)),7))};var o=function(n){for(var r=0,x=0;x<n.length;x+=1)r=r*10+g(n.charAt(x));return r},g=function(n){if("0"<=n&&n<="9")return n.charCodeAt(0)-48;throw"illegal char :"+n};return A},B=function(m){var d=t.MODE_ALPHA_NUM,w=m,A={};A.getMode=function(){return d},A.getLength=function(g){return w.length},A.write=function(g){for(var n=w,r=0;r+1<n.length;)g.put(o(n.charAt(r))*45+o(n.charAt(r+1)),11),r+=2;r<n.length&&g.put(o(n.charAt(r)),6)};var o=function(g){if("0"<=g&&g<="9")return g.charCodeAt(0)-48;if("A"<=g&&g<="Z")return g.charCodeAt(0)-65+10;switch(g){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+g}};return A},z=function(m){var d=t.MODE_8BIT_BYTE,w=m,A=e.stringToBytes(m),o={};return o.getMode=function(){return d},o.getLength=function(g){return A.length},o.write=function(g){for(var n=0;n<A.length;n+=1)g.put(A[n],8)},o},S=function(m){var d=t.MODE_KANJI,w=m,A=e.stringToBytesFuncs.SJIS;if(!A)throw"sjis not supported.";(function(n,r){var x=A(n);if(x.length!=2||(x[0]<<8|x[1])!=r)throw"sjis not supported."})("\u53CB",38726);var o=A(m),g={};return g.getMode=function(){return d},g.getLength=function(n){return~~(o.length/2)},g.write=function(n){for(var r=o,x=0;x+1<r.length;){var h=(255&r[x])<<8|255&r[x+1];if(33088<=h&&h<=40956)h-=33088;else if(57408<=h&&h<=60351)h-=49472;else throw"illegal char at "+(x+1)+"/"+h;h=(h>>>8&255)*192+(h&255),n.put(h,13),x+=2}if(x<r.length)throw"illegal char at "+(x+1)},g},_=function(){var m=[],d={};return d.writeByte=function(w){m.push(w&255)},d.writeShort=function(w){d.writeByte(w),d.writeByte(w>>>8)},d.writeBytes=function(w,A,o){A=A||0,o=o||w.length;for(var g=0;g<o;g+=1)d.writeByte(w[g+A])},d.writeString=function(w){for(var A=0;A<w.length;A+=1)d.writeByte(w.charCodeAt(A))},d.toByteArray=function(){return m},d.toString=function(){var w="";w+="[";for(var A=0;A<m.length;A+=1)A>0&&(w+=","),w+=m[A];return w+="]",w},d},K=function(){var m=0,d=0,w=0,A="",o={},g=function(r){A+=String.fromCharCode(n(r&63))},n=function(r){if(!(r<0)){if(r<26)return 65+r;if(r<52)return 97+(r-26);if(r<62)return 48+(r-52);if(r==62)return 43;if(r==63)return 47}throw"n:"+r};return o.writeByte=function(r){for(m=m<<8|r&255,d+=8,w+=1;d>=6;)g(m>>>d-6),d-=6},o.flush=function(){if(d>0&&(g(m<<6-d),m=0,d=0),w%3!=0)for(var r=3-w%3,x=0;x<r;x+=1)A+="="},o.toString=function(){return A},o},Z=function(m){var d=m,w=0,A=0,o=0,g={};g.read=function(){for(;o<8;){if(w>=d.length){if(o==0)return-1;throw"unexpected end of file./"+o}var r=d.charAt(w);if(w+=1,r=="=")return o=0,-1;if(r.match(/^\s$/))continue;A=A<<6|n(r.charCodeAt(0)),o+=6}var x=A>>>o-8&255;return o-=8,x};var n=function(r){if(65<=r&&r<=90)return r-65;if(97<=r&&r<=122)return r-97+26;if(48<=r&&r<=57)return r-48+52;if(r==43)return 62;if(r==47)return 63;throw"c:"+r};return g},j=function(m,d){var w=m,A=d,o=new Array(m*d),g={};g.setPixel=function(h,p,b){o[p*w+h]=b},g.write=function(h){h.writeString("GIF87a"),h.writeShort(w),h.writeShort(A),h.writeByte(128),h.writeByte(0),h.writeByte(0),h.writeByte(0),h.writeByte(0),h.writeByte(0),h.writeByte(255),h.writeByte(255),h.writeByte(255),h.writeString(","),h.writeShort(0),h.writeShort(0),h.writeShort(w),h.writeShort(A),h.writeByte(0);var p=2,b=r(p);h.writeByte(p);for(var E=0;b.length-E>255;)h.writeByte(255),h.writeBytes(b,E,255),E+=255;h.writeByte(b.length-E),h.writeBytes(b,E,b.length-E),h.writeByte(0),h.writeString(";")};var n=function(h){var p=h,b=0,E=0,P={};return P.write=function(O,U){if(O>>>U)throw"length over";for(;b+U>=8;)p.writeByte(255&(O<<b|E)),U-=8-b,O>>>=8-b,E=0,b=0;E=O<<b|E,b=b+U},P.flush=function(){b>0&&p.writeByte(E)},P},r=function(h){for(var p=1<<h,b=(1<<h)+1,E=h+1,P=x(),O=0;O<p;O+=1)P.add(String.fromCharCode(O));P.add(String.fromCharCode(p)),P.add(String.fromCharCode(b));var U=_(),G=n(U);G.write(p,E);var Q=0,q=String.fromCharCode(o[Q]);for(Q+=1;Q<o.length;){var Y=String.fromCharCode(o[Q]);Q+=1,P.contains(q+Y)?q=q+Y:(G.write(P.indexOf(q),E),P.size()<4095&&(P.size()==1<<E&&(E+=1),P.add(q+Y)),q=Y)}return G.write(P.indexOf(q),E),G.write(b,E),G.flush(),U.toByteArray()},x=function(){var h={},p=0,b={};return b.add=function(E){if(b.contains(E))throw"dup key:"+E;h[E]=p,p+=1},b.size=function(){return p},b.indexOf=function(E){return h[E]},b.contains=function(E){return typeof h[E]<"u"},b};return g},V=function(m,d,w){for(var A=j(m,d),o=0;o<d;o+=1)for(var g=0;g<m;g+=1)A.setPixel(g,o,w(g,o));var n=_();A.write(n);for(var r=K(),x=n.toByteArray(),h=0;h<x.length;h+=1)r.writeByte(x[h]);return r.flush(),"data:image/gif;base64,"+r};return e})();(function(){Kr.stringToBytesFuncs["UTF-8"]=function(e){function t(a){for(var f=[],c=0;c<a.length;c++){var s=a.charCodeAt(c);s<128?f.push(s):s<2048?f.push(192|s>>6,128|s&63):s<55296||s>=57344?f.push(224|s>>12,128|s>>6&63,128|s&63):(c++,s=65536+((s&1023)<<10|a.charCodeAt(c)&1023),f.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63))}return f}return t(e)}})();(function(e){typeof define=="function"&&define.amd?define([],e):typeof Qr=="object"&&(Yr.exports=e())})(function(){return Kr})});var wt={};tt(wt,{qrcode:()=>$r.default,strToU8:()=>cr,zipSync:()=>Gr});var $=Uint8Array,X=Uint16Array,dr=Int32Array,Mr=new $([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Br=new $([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ir=new $([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Rr=function(e,t){for(var a=new X(31),f=0;f<31;++f)a[f]=t+=1<<e[f-1];for(var c=new dr(a[30]),f=1;f<30;++f)for(var s=a[f];s<a[f+1];++s)c[s]=s-a[f]<<5|f;return{b:a,r:c}},Ur=Rr(Mr,2),it=Ur.b,wr=Ur.r;it[28]=258,wr[258]=28;var Or=Rr(Br,0),At=Or.b,Lr=Or.r,xr=new X(32768);for(F=0;F<32768;++F)nr=(F&43690)>>1|(F&21845)<<1,nr=(nr&52428)>>2|(nr&13107)<<2,nr=(nr&61680)>>4|(nr&3855)<<4,xr[F]=((nr&65280)>>8|(nr&255)<<8)>>1;var nr,F,sr=(function(e,t,a){for(var f=e.length,c=0,s=new X(t);c<f;++c)e[c]&&++s[e[c]-1];var T=new X(t);for(c=1;c<t;++c)T[c]=T[c-1]+s[c-1]<<1;var I;if(a){I=new X(1<<t);var R=15-t;for(c=0;c<f;++c)if(e[c])for(var L=c<<4|e[c],B=t-e[c],z=T[e[c]-1]++<<B,S=z|(1<<B)-1;z<=S;++z)I[xr[z]>>R]=L}else for(I=new X(f),c=0;c<f;++c)e[c]&&(I[c]=xr[T[e[c]-1]++]>>15-e[c]);return I}),fr=new $(288);for(F=0;F<144;++F)fr[F]=8;var F;for(F=144;F<256;++F)fr[F]=9;var F;for(F=256;F<280;++F)fr[F]=7;var F;for(F=280;F<288;++F)fr[F]=8;var F,lr=new $(32);for(F=0;F<32;++F)lr[F]=5;var F,at=sr(fr,9,0);var ft=sr(lr,5,0);var Fr=function(e){return(e+7)/8|0},Nr=function(e,t,a){return(t==null||t<0)&&(t=0),(a==null||a>e.length)&&(a=e.length),new $(e.subarray(t,a))};var ot=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],gr=function(e,t,a){var f=new Error(t||ot[e]);if(f.code=e,Error.captureStackTrace&&Error.captureStackTrace(f,gr),!a)throw f;return f};var ir=function(e,t,a){a<<=t&7;var f=t/8|0;e[f]|=a,e[f+1]|=a>>8},or=function(e,t,a){a<<=t&7;var f=t/8|0;e[f]|=a,e[f+1]|=a>>8,e[f+2]|=a>>16},yr=function(e,t){for(var a=[],f=0;f<e.length;++f)e[f]&&a.push({s:f,f:e[f]});var c=a.length,s=a.slice();if(!c)return{t:_r,l:0};if(c==1){var T=new $(a[0].s+1);return T[a[0].s]=1,{t:T,l:1}}a.sort(function(A,o){return A.f-o.f}),a.push({s:-1,f:25001});var I=a[0],R=a[1],L=0,B=1,z=2;for(a[0]={s:-1,f:I.f+R.f,l:I,r:R};B!=c-1;)I=a[a[L].f<a[z].f?L++:z++],R=a[L!=B&&a[L].f<a[z].f?L++:z++],a[B++]={s:-1,f:I.f+R.f,l:I,r:R};for(var S=s[0].s,f=1;f<c;++f)s[f].s>S&&(S=s[f].s);var _=new X(S+1),K=Ar(a[B-1],_,0);if(K>t){var f=0,Z=0,j=K-t,V=1<<j;for(s.sort(function(o,g){return _[g.s]-_[o.s]||o.f-g.f});f<c;++f){var m=s[f].s;if(_[m]>t)Z+=V-(1<<K-_[m]),_[m]=t;else break}for(Z>>=j;Z>0;){var d=s[f].s;_[d]<t?Z-=1<<t-_[d]++-1:++f}for(;f>=0&&Z;--f){var w=s[f].s;_[w]==t&&(--_[w],++Z)}K=t}return{t:new $(_),l:K}},Ar=function(e,t,a){return e.s==-1?Math.max(Ar(e.l,t,a+1),Ar(e.r,t,a+1)):t[e.s]=a},br=function(e){for(var t=e.length;t&&!e[--t];);for(var a=new X(++t),f=0,c=e[0],s=1,T=function(R){a[f++]=R},I=1;I<=t;++I)if(e[I]==c&&I!=t)++s;else{if(!c&&s>2){for(;s>138;s-=138)T(32754);s>2&&(T(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(T(c),--s;s>6;s-=6)T(8304);s>2&&(T(s-3<<5|8208),s=0)}for(;s--;)T(c);s=1,c=e[I]}return{c:a.subarray(0,f),n:t}},ur=function(e,t){for(var a=0,f=0;f<t.length;++f)a+=e[f]*t[f];return a},Sr=function(e,t,a){var f=a.length,c=Fr(t+2);e[c]=f&255,e[c+1]=f>>8,e[c+2]=e[c]^255,e[c+3]=e[c+1]^255;for(var s=0;s<f;++s)e[c+s+4]=a[s];return(c+4+f)*8},kr=function(e,t,a,f,c,s,T,I,R,L,B){ir(t,B++,a),++c[256];for(var z=yr(c,15),S=z.t,_=z.l,K=yr(s,15),Z=K.t,j=K.l,V=br(S),m=V.c,d=V.n,w=br(Z),A=w.c,o=w.n,g=new X(19),n=0;n<m.length;++n)++g[m[n]&31];for(var n=0;n<A.length;++n)++g[A[n]&31];for(var r=yr(g,7),x=r.t,h=r.l,p=19;p>4&&!x[Ir[p-1]];--p);var b=L+5<<3,E=ur(c,fr)+ur(s,lr)+T,P=ur(c,S)+ur(s,Z)+T+14+3*p+ur(g,x)+2*g[16]+3*g[17]+7*g[18];if(R>=0&&b<=E&&b<=P)return Sr(t,B,e.subarray(R,R+L));var O,U,G,Q;if(ir(t,B,1+(P<E)),B+=2,P<E){O=sr(S,_,0),U=S,G=sr(Z,j,0),Q=Z;var q=sr(x,h,0);ir(t,B,d-257),ir(t,B+5,o-1),ir(t,B+10,p-4),B+=14;for(var n=0;n<p;++n)ir(t,B+3*n,x[Ir[n]]);B+=3*p;for(var Y=[m,A],ar=0;ar<2;++ar)for(var W=Y[ar],n=0;n<W.length;++n){var rr=W[n]&31;ir(t,B,q[rr]),B+=x[rr],rr>15&&(ir(t,B,W[n]>>5&127),B+=W[n]>>12)}}else O=at,U=fr,G=ft,Q=lr;for(var n=0;n<I;++n){var u=f[n];if(u>255){var rr=u>>18&31;or(t,B,O[rr+257]),B+=U[rr+257],rr>7&&(ir(t,B,u>>23&31),B+=Mr[rr]);var v=u&31;or(t,B,G[v]),B+=Q[v],v>3&&(or(t,B,u>>5&8191),B+=Br[v])}else or(t,B,O[u]),B+=U[u]}return or(t,B,O[256]),B+U[256]},ut=new dr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),_r=new $(0),st=function(e,t,a,f,c,s){var T=s.z||e.length,I=new $(f+T+5*(1+Math.ceil(T/7e3))+c),R=I.subarray(f,I.length-c),L=s.l,B=(s.r||0)&7;if(t){B&&(R[0]=s.r>>3);for(var z=ut[t-1],S=z>>13,_=z&8191,K=(1<<a)-1,Z=s.p||new X(32768),j=s.h||new X(K+1),V=Math.ceil(a/3),m=2*V,d=function(H){return(e[H]^e[H+1]<<V^e[H+2]<<m)&K},w=new dr(25e3),A=new X(288),o=new X(32),g=0,n=0,r=s.i||0,x=0,h=s.w||0,p=0;r+2<T;++r){var b=d(r),E=r&32767,P=j[b];if(Z[E]=P,j[b]=E,h<=r){var O=T-r;if((g>7e3||x>24576)&&(O>423||!L)){B=kr(e,R,0,w,A,o,n,x,p,r-p,B),x=g=n=0,p=r;for(var U=0;U<286;++U)A[U]=0;for(var U=0;U<30;++U)o[U]=0}var G=2,Q=0,q=_,Y=E-P&32767;if(O>2&&b==d(r-Y))for(var ar=Math.min(S,O)-1,W=Math.min(32767,r),rr=Math.min(258,O);Y<=W&&--q&&E!=P;){if(e[r+G]==e[r+G-Y]){for(var u=0;u<rr&&e[r+u]==e[r+u-Y];++u);if(u>G){if(G=u,Q=Y,u>ar)break;for(var v=Math.min(Y,u-2),i=0,U=0;U<v;++U){var l=r-Y+U&32767,y=Z[l],M=l-y&32767;M>i&&(i=M,P=l)}}}E=P,P=Z[E],Y+=E-P&32767}if(Q){w[x++]=268435456|wr[G]<<18|Lr[Q];var D=wr[G]&31,C=Lr[Q]&31;n+=Mr[D]+Br[C],++A[257+D],++o[C],h=r+G,++g}else w[x++]=e[r],++A[e[r]]}}for(r=Math.max(r,h);r<T;++r)w[x++]=e[r],++A[e[r]];B=kr(e,R,L,w,A,o,n,x,p,r-p,B),L||(s.r=B&7|R[B/8|0]<<3,B-=7,s.h=j,s.p=Z,s.i=r,s.w=h)}else{for(var r=s.w||0;r<T+L;r+=65535){var N=r+65535;N>=T&&(R[B/8|0]=L,N=T),B=Sr(R,B+1,e.subarray(r,N))}s.i=T}return Nr(I,0,f+Fr(B)+c)},vt=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var a=t,f=9;--f;)a=(a&1&&-306674912)^a>>>1;e[t]=a}return e})(),ht=function(){var e=-1;return{p:function(t){for(var a=e,f=0;f<t.length;++f)a=vt[a&255^t[f]]^a>>>8;e=a},d:function(){return~e}}};var lt=function(e,t,a,f,c){if(!c&&(c={l:1},t.dictionary)){var s=t.dictionary.subarray(-32768),T=new $(s.length+e.length);T.set(s),T.set(e,s.length),e=T,c.w=s.length}return st(e,t.level==null?6:t.level,t.mem==null?c.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,a,f,c)},Zr=function(e,t){var a={};for(var f in e)a[f]=e[f];for(var f in t)a[f]=t[f];return a};var J=function(e,t,a){for(;a;++t)e[t]=a,a>>>=8};function ct(e,t){return lt(e,t||{},0,0)}var Hr=function(e,t,a,f){for(var c in e){var s=e[c],T=t+c,I=f;Array.isArray(s)&&(I=Zr(f,s[1]),s=s[0]),s instanceof $?a[T]=[s,I]:(a[T+="/"]=[new $(0),I],Hr(s,T,a,f))}},zr=typeof TextEncoder<"u"&&new TextEncoder,gt=typeof TextDecoder<"u"&&new TextDecoder,pt=0;try{gt.decode(_r,{stream:!0}),pt=1}catch{}function cr(e,t){if(t){for(var a=new $(e.length),f=0;f<e.length;++f)a[f]=e.charCodeAt(f);return a}if(zr)return zr.encode(e);for(var c=e.length,s=new $(e.length+(e.length>>1)),T=0,I=function(B){s[T++]=B},f=0;f<c;++f){if(T+5>s.length){var R=new $(T+8+(c-f<<1));R.set(s),s=R}var L=e.charCodeAt(f);L<128||t?I(L):L<2048?(I(192|L>>6),I(128|L&63)):L>55295&&L<57344?(L=65536+(L&1047552)|e.charCodeAt(++f)&1023,I(240|L>>18),I(128|L>>12&63),I(128|L>>6&63),I(128|L&63)):(I(224|L>>12),I(128|L>>6&63),I(128|L&63))}return Nr(s,0,T)}var mr=function(e){var t=0;if(e)for(var a in e){var f=e[a].length;f>65535&&gr(9),t+=f+4}return t},Pr=function(e,t,a,f,c,s,T,I){var R=f.length,L=a.extra,B=I&&I.length,z=mr(L);J(e,t,T!=null?33639248:67324752),t+=4,T!=null&&(e[t++]=20,e[t++]=a.os),e[t]=20,t+=2,e[t++]=a.flag<<1|(s<0&&8),e[t++]=c&&8,e[t++]=a.compression&255,e[t++]=a.compression>>8;var S=new Date(a.mtime==null?Date.now():a.mtime),_=S.getFullYear()-1980;if((_<0||_>119)&&gr(10),J(e,t,_<<25|S.getMonth()+1<<21|S.getDate()<<16|S.getHours()<<11|S.getMinutes()<<5|S.getSeconds()>>1),t+=4,s!=-1&&(J(e,t,a.crc),J(e,t+4,s<0?-s-2:s),J(e,t+8,a.size)),J(e,t+12,R),J(e,t+14,z),t+=16,T!=null&&(J(e,t,B),J(e,t+6,a.attrs),J(e,t+10,T),t+=14),e.set(f,t),t+=R,z)for(var K in L){var Z=L[K],j=Z.length;J(e,t,+K),J(e,t+2,j),e.set(Z,t+4),t+=4+j}return B&&(e.set(I,t),t+=B),t},yt=function(e,t,a,f,c){J(e,t,101010256),J(e,t+8,a),J(e,t+10,a),J(e,t+12,f),J(e,t+16,c)};function Gr(e,t){t||(t={});var a={},f=[];Hr(e,"",a,t);var c=0,s=0;for(var T in a){var I=a[T],R=I[0],L=I[1],B=L.level==0?0:8,z=cr(T),S=z.length,_=L.comment,K=_&&cr(_),Z=K&&K.length,j=mr(L.extra);S>65535&&gr(11);var V=B?ct(R,L):R,m=V.length,d=ht();d.p(R),f.push(Zr(L,{size:R.length,crc:d.d(),c:V,f:z,m:K,u:S!=T.length||K&&_.length!=Z,o:c,compression:B})),c+=30+S+j+m,s+=76+2*(S+j)+(Z||0)+m}for(var w=new $(s+22),A=c,o=s-c,g=0;g<f.length;++g){var z=f[g];Pr(w,z.o,z,z.f,z.u,z.c.length);var n=30+z.f.length+mr(z.extra);w.set(z.c,z.o+n),Pr(w,c,z,z.f,z.u,z.c.length,z.o,z.m),c+=16+n+(z.m?z.m.length:0)}return yt(w,c,f.length,o,A),w}var $r=et(Jr());return nt(wt);})();

(function (global) {
  "use strict";

  function regeln() { return global.BEMA_REGELN; }
  function stamm() { return global.BEMA_STAMM; }
  function fragenAll() { return global.BEMA_FRAGEN; }

  function r2(n) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }
  function cents(n) { return Math.round(Number(n) * 100); }
  function euro(n) {
    const v = r2(n);
    const neg = v < 0;
    const abs = Math.abs(v).toFixed(2).replace(".", ",");
    const [w, fr] = abs.split(",");
    const w2 = w.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (neg ? "−" : "") + w2 + "," + fr + " €";
  }
  function kontoName(nr) {
    const k = ((stamm() || {}).konten || []).find(x => x.nummer === String(nr));
    if (k) return k.name;
    if (global.KONTO && global.KONTO[nr]) return global.KONTO[nr];
    return "";
  }
  function typById(id) { return ((regeln() || {}).geschaeftstypen || []).find(t => t.id === id) || null; }

  function mappingRow(id) {
    return ((((global.BEMA_MAPPING || {}).aufgaben) || []).find(function (x) { return x.id === id; })) || null;
  }

  function brancheKey(wirStr) {
    const s = String(wirStr || "");
    if (/Elektronik|Ohmreich/i.test(s)) return "elektronik";
    if (/Outdoor|Sport|Gipfelgriff/i.test(s)) return "outdoor";
    if (/Möbel|Innquell|Wohnen/i.test(s)) return "moebel";
    if (/Kaffee|Café|Restaurant|Konditorei/i.test(s)) return "gastro";
    return "elektronik";
  }

  const WAREN = {
    elektronik: {
      "33010": ["Fernseher Nadelstrom Bild 55 (NB-55)", "Fernseher Nadelstrom Bild 65 (NB-65)", "Nadelstrom Soundbar NS-210", "Spielkonsole", "Nadelstrom Smartphone", "HDMI-Kabel 2 m", "USB-C-Ladekabel"],
      "33020": ["Schallkern Kopfhörer SK-300, kabellos", "Schallkern Kopfhörer SK-300, Sport", "Kopfhörer-Ersatzkabel"],
      verkauf: ["Fernseher 55 Zoll", "Fernseher 65 Zoll", "Soundbar", "Kopfhörer, kabellos", "Funk-Lautsprecher", "Funk-Kopfhörer", "Smartphone", "Laptop 15 Zoll", "Spielkonsole", "HDMI-Kabel 2 m", "USB-C-Ladekabel"]
    },
    outdoor: {
      verkauf: ["Kletterseil 60 m", "Karabiner mit Schraubverschluss", "Yogamatte", "Kettlebell 16 kg", "Kletterhelm"]
    },
    moebel: {
      verkauf: ["Esstisch Massivholz", "Stuhl Eiche", "Sideboard Wildeiche", "Wohnwand Massivholz"]
    },
    gastro: {
      "5340": ["Produktkartons 25 × 25 cm", "Papiertragtaschen", "Luftpolsterbeutel 16 × 20 cm", "Warnaufkleber"],
      "5450": ["Allzweckreiniger Profi, Kanister 10 l", "Glasreiniger 1 l"],
      "7240": ["Heizöl extra leicht im Tank, Liter"],
      "7280": ["Buchenholz-Scheiter für die Betriebslokal-Heizung, Raummeter"],
      "7600": ["Kassenrollen Thermopapier 80 mm", "Kopierpapier A4, 500 Blatt", "Ordner A4, breit", "Kugelschreiber blau"],
      "33050": ["Kassenrollen Thermopapier 80 mm", "Kopierpapier A4, 500 Blatt", "Produktkartons 25 × 25 cm", "Papiertragtaschen"]
    },
    buero: ["Kopierpapier A4, 500 Blatt", "Ordner A4, breit", "Kugelschreiber blau", "Kassenrollen Thermopapier 80 mm"]
  };

  const PREIS_ART_FALLBACK = {
    "Kletterseil 60 m": [50, 150],
    "Karabiner mit Schraubverschluss": [8, 40],
    "Yogamatte": [15, 60],
    "Kettlebell 16 kg": [30, 90],
    "Kletterhelm": [40, 120],
    "Kopierpapier A4, 500 Blatt": [3, 15],
    "Ordner A4, breit": [2, 10],
    "Kugelschreiber blau": [0.5, 3],
    "Kassenrollen Thermopapier 80 mm": [1, 8],
    "Produktkartons 25 × 25 cm": [0.5, 3],
    "Papiertragtaschen": [0.5, 2],
    "Luftpolsterbeutel 16 × 20 cm": [0.5, 1.5],
    "Warnaufkleber": [0.5, 1],
    "Allzweckreiniger Profi, Kanister 10 l": [8, 25],
    "Glasreiniger 1 l": [1, 8],
    "Heizöl extra leicht im Tank, Liter": [0.8, 1.8],
    "Buchenholz-Scheiter für die Betriebslokal-Heizung, Raummeter": [40, 120],
    "Esstisch Massivholz": [400, 2500],
    "Stuhl Eiche": [80, 400],
    "Sideboard Wildeiche": [300, 2000],
    "Wohnwand Massivholz": [600, 3500]
  };
  function preisregeln() {
    const p = ((regeln() || {}).preisspannen) || {};
    return {
      stueck: p.stueckpreise_netto_eur || {
        Fernseher: [400, 1500], Kopfhoerer: [40, 300], Smartphone: [200, 900],
        Laptop: [400, 1500], Zubehoer_Kabel: [5, 40], Spielkonsole: [300, 550], Lautsprecher: [50, 400]
      },
      glatt: p.stueckpreis_glatt_eur != null ? p.stueckpreis_glatt_eur : 0.5,
      menge: p.menge_pro_zeile || [2, 30],
      erAr: p.rechnungssumme_netto_er_ar_eur || [300, 20000],
      bar: p.bar_summe_netto_eur || [20, 400],
      barArten: p.bar_warenarten || ["Zubehoer_Kabel", "Kopfhoerer", "Lautsprecher"],
      gutschrift: p.gutschrift || { min_netto_eur: 20 }
    };
  }
  function warenNameRein(name) {
    return String(name || "").replace(/^Eigenverbrauch\s+/, "").replace(/^Rücksendung\s+/, "");
  }
  function warenartVon(name) {
    const n = warenNameRein(name);
    if (/Fernseher/i.test(n)) return "Fernseher";
    if (/Kabel|Zubehör|Zubehoer|HDMI|USB-C|USB /i.test(n)) return "Zubehoer_Kabel";
    if (/Kopfhörer|Kopfhoerer/i.test(n)) return "Kopfhoerer";
    if (/Smartphone|\bHandy\b/i.test(n)) return "Smartphone";
    if (/Laptop|Notebook/i.test(n)) return "Laptop";
    if (/Spielkonsole|\bKonsole\b/i.test(n)) return "Spielkonsole";
    if (/Lautsprecher|Soundbar/i.test(n)) return "Lautsprecher";
    return "";
  }
  function preisspanneFuer(name) {
    const n = warenNameRein(name);
    const P = preisregeln();
    const art = warenartVon(n);
    if (art && P.stueck[art]) return P.stueck[art];
    if (PREIS_ART_FALLBACK[n]) return PREIS_ART_FALLBACK[n];
    return null;
  }
  function preisPasst(name, einzel) {
    const s = preisspanneFuer(name);
    if (!s || einzel == null) return true;
    if (Number(einzel) < s[0] - 0.005 || Number(einzel) > s[1] + 0.005) return false;
    if (warenartVon(name)) {
      const step = preisregeln().glatt || 0.5;
      if (Math.abs((Number(einzel) / step) - Math.round(Number(einzel) / step)) > 1e-9) return false;
    }
    return true;
  }
  function wareIstBarfaehig(ware) {
    const P = preisregeln();
    const art = warenartVon(ware);
    if (P.barArten.indexOf(art) < 0) return false;
    const s = preisspanneFuer(ware);
    if (!s) return false;
    const unitCap = P.bar[1] / P.menge[0]; /* 2 × Stückpreis ≤ Bar-Maximum */
    const uMin = s[0], uMax = Math.min(s[1], unitCap);
    if (uMin > uMax + 1e-9) return false;
    const qMin = P.menge[0], qMax = P.menge[1];
    return qMax * uMax >= P.bar[0] - 1e-9 && qMin * uMin <= P.bar[1] + 1e-9;
  }
  function warePasstInRahmen(ware, minNet, maxNet, bar) {
    if (bar && !wareIstBarfaehig(ware)) return false;
    const s = preisspanneFuer(ware);
    if (!s) return !bar;
    const P = preisregeln();
    let uMin = s[0], uMax = s[1];
    if (bar) uMax = Math.min(uMax, P.bar[1] / P.menge[0]);
    if (uMin > uMax + 1e-9) return false;
    const qMin = P.menge[0], qMax = P.menge[1];
    return qMin * uMin <= maxNet + 1e-9 && qMax * uMax >= minNet - 1e-9;
  }
  function istHandelsErAr(id) {
    return /E1_wareneinkauf_ziel|E2_warenverkauf_ziel|E5_sofortrabatt/.test(id || "");
  }
  function istHandelsBar(id) {
    return /E1_wareneinkauf_bar|E2_warenverkauf_bar/.test(id || "");
  }
  function istGutschriftTyp(id) {
    return /E1_ruecksendung_einkauf|E2_ruecksendung_verkauf|E5_nachlass_lieferant|E5_nachlass_kunde/.test(id || "");
  }
  function gutschriftRahmen(rng) {
    const P = preisregeln();
    const minGs = ((P.gutschrift && P.gutschrift.min_netto_eur) != null) ? P.gutschrift.min_netto_eur : 20;
    const er = P.erAr || [300, 20000];
    let ursprung = glattNetto(rng, er[0], er[1], 20, []);
    if (ursprung <= minGs + 0.49) ursprung = glattNetto(rng, Math.max(er[0], minGs + 50), er[1], 20, []);
    const maxGs = r2(ursprung - 0.5);
    return { ursprung: ursprung, min: minGs, max: Math.max(minGs, maxGs) };
  }

  function typBrauchtLieferantElektronik(id) {
    return /E1_wareneinkauf|E1_ruecksendung|E5_sofortrabatt$|E5_nachlass_lieferant|E7_eigene_firmenkarte/.test(id);
  }
  function typIstHandelsware(id) {
    return typBrauchtLieferantElektronik(id) || /E2_warenverkauf|E2_ruecksendung|E5_sofortrabatt_verkauf|E5_nachlass_kunde|E7_kunde_|E8_|E9_/.test(id);
  }
  function typBrauchtHandel(id) { return typIstHandelsware(id); }
  var WIR_HANDEL = "Ohmreich Elektrofachhandel GmbH, Elektronikhandel";
  function wirAnpassenAnTyp(typId, wirStr) {
    if (typIstHandelsware(typId)) return WIR_HANDEL;
    const b = brancheKey(wirStr);
    if (/E16_/.test(typId) && (b === "gastro" || /Café|Kaffee/i.test(String(wirStr || ""))))
      return wirStr;
    return wirStr || WIR_HANDEL;
  }
  function wirFuerTypen(ids, preferred, rng) {
    if (ids.some(typIstHandelsware)) return WIR_HANDEL;
    if (ids.every(function (id) { return /E16_/.test(id); })) {
      if (preferred && brancheKey(preferred) === "gastro") return preferred;
      return "Gipfelgriff Sport e.U., Outdoor-Sporthandel";
    }
    if (preferred && ids.every(function (id) { return wirAnpassenAnTyp(id, preferred) === preferred; }))
      return preferred;
    if (preferred) return preferred;
    return defaultWir(rng, false);
  }
  function kontenPassend(wirStr, liste) {
    const b = brancheKey(wirStr);
    const erlaubte = {
      elektronik: ["33010", "33020", "33030", "33040", "20010", "20020", "20030"],
      outdoor: ["33030", "33040", "20010", "20020", "20030"],
      moebel: ["33030", "33040", "20010", "20020", "20030"],
      gastro: ["33050"]
    }[b] || ["33010", "33020", "33030", "33040", "20010", "20020", "20030"];
    const set = new Set(erlaubte);
    const ok = (liste || []).filter(function (k) { return set.has(String(k)); });
    return ok.length ? ok : liste;
  }
  function wareFuer(rng, wirStr, partnerKonto, typId, fallback, aufwand, opts) {
    if (aufwand && typeof aufwand === "object" && !Array.isArray(aufwand)) { opts = aufwand; aufwand = undefined; }
    opts = opts || {};
    const b = brancheKey(wirStr);
    const kat = WAREN[b] || WAREN.elektronik;
    const kto = partnerKonto ? String(partnerKonto) : "";
    let liste = null;
    if (kto === "33010" && WAREN.elektronik["33010"]) liste = WAREN.elektronik["33010"];
    else if (kto === "33020" && WAREN.elektronik["33020"]) liste = WAREN.elektronik["33020"];
    else if (aufwand && WAREN.gastro[aufwand]) liste = WAREN.gastro[aufwand];
    else if (kto === "33050") liste = (b === "gastro" || b === "outdoor") ? WAREN.gastro["33050"] : WAREN.buero;
    else if (/E2_warenverkauf|E2_ruecksendung|E5_sofortrabatt_verkauf|E5_nachlass_kunde|E7_kunde_|E2_eigen/.test(typId || "") && kat.verkauf)
      liste = kat.verkauf;
    else if (kat.verkauf) liste = kat.verkauf;
    if (!liste || !liste.length) return fallback || "Handelsware";
    const minN = opts.min != null ? opts.min : 0;
    const maxN = opts.max != null ? opts.max : Infinity;
    const fit = liste.filter(function (w) { return warePasstInRahmen(w, minN, maxN, !!opts.bar); });
    if (fit.length) liste = fit;
    else if (opts.bar) {
      const alle = [].concat(WAREN.elektronik["33010"] || [], WAREN.elektronik["33020"] || [], WAREN.elektronik.verkauf || []);
      const barfit = alle.filter(function (w) { return warePasstInRahmen(w, minN, maxN, true); });
      if (barfit.length) liste = barfit;
    }
    return pick(rng, liste);
  }
  function partnerWarePasst(fall) {
    const errs = [];
    if (!fall) return ["kein Fall"];
    const partner = (fall.partner && fall.partner.name) || "";
    const kto = fall.partner && fall.partner.konto;
    const pos = (fall.positionen || []).map(function (p) { return p.bezeichnung || ""; });
    if (/Nadelstrom/i.test(partner) && pos.some(function (p) { return /Schallkern/i.test(p); }))
      errs.push("Nadelstrom liefert Schallkern");
    if (/Schallkern/i.test(partner) && pos.some(function (p) { return /\bNadelstrom\b/i.test(p); }))
      errs.push("Schallkern liefert Nadelstrom-Ware");
    if (kto === "33010" && pos.some(function (p) { return /Schallkern/i.test(p); }))
      errs.push("33010 (Nadelstrom) mit Schallkern-Ware");
    if (kto === "33020" && pos.some(function (p) { return /\bNadelstrom\b/i.test(p); }))
      errs.push("33020 (Schallkern) mit Nadelstrom-Ware");
    const b = brancheKey((fall.wir && (fall.wir.wir || (fall.wir.name + ", " + (fall.wir.branche || "")))) || "");
    if (b === "gastro" && typBrauchtHandel(fall.geschaeftstyp_id) && fall.geschaeftstyp_id !== "E16_material_weiterverkauf")
      errs.push("Kaffeehaus mit Handelsware-Elektronik");
    if (b !== "elektronik" && typBrauchtLieferantElektronik(fall.geschaeftstyp_id) && (kto === "33010" || kto === "33020"))
      errs.push("Elektronik-Lieferant passt nicht zur Branche");
    return errs;
  }

  function glattePosition(rng, min, max, satz, vermeide, wareOderOpts) {
    const P = preisregeln();
    const minC = Math.ceil(Number(min) * 100);
    const maxC = Math.floor(Number(max) * 100);
    let unitMin = 0, unitMax = Infinity, ware = "", bar = false;
    if (typeof wareOderOpts === "string") { ware = wareOderOpts; }
    else if (wareOderOpts && typeof wareOderOpts === "object") {
      ware = wareOderOpts.ware || "";
      if (wareOderOpts.unitMin != null) unitMin = wareOderOpts.unitMin;
      if (wareOderOpts.unitMax != null) unitMax = wareOderOpts.unitMax;
      bar = !!wareOderOpts.bar;
    }
    const span = ware ? preisspanneFuer(ware) : null;
    if (span) { unitMin = Math.max(unitMin, span[0]); unitMax = Math.min(unitMax, span[1]); }
    const art = ware ? warenartVon(ware) : "";
    const offiziell = !!art;
    const stepC = offiziell ? Math.round((P.glatt || 0.5) * 100) : 5;
    if (bar) unitMax = Math.min(unitMax, P.bar[1] / P.menge[0]);
    if (!isFinite(unitMax) || unitMax === Infinity) unitMax = Number(max);
    if (!isFinite(unitMin) || unitMin <= 0) unitMin = stepC / 100;
    unitMax = Math.min(unitMax, Number(max));
    const qMin = offiziell ? P.menge[0] : 1;
    const qMax = offiziell ? P.menge[1] : 30;
    const avoid = new Set((vermeide || []).map(cents));
    const cands = [];
    if (unitMax >= unitMin && stepC > 0) {
      const uLo = Math.ceil(unitMin * 100 / stepC) * stepC;
      const uHi = Math.floor(unitMax * 100 / stepC) * stepC;
      for (let u = uLo; u <= uHi; u += stepC) {
        for (let q = qMin; q <= qMax; q++) {
          const n = q * u;
          if (n < minC || n > maxC) continue;
          if (satz === 20 && n % 5) continue;
          if (satz === 10 && n % 10) continue;
          if (avoid.has(n)) continue;
          cands.push({ menge: q, einzelpreis: u / 100, netto: n / 100 });
        }
      }
    }
    if (!cands.length) return null;
    const multi = cands.filter(function (c) { return c.menge > 2; });
    const pool = (min >= 40 && multi.length) ? multi : cands;
    return pick(rng, pool);
  }
  function positionFuer(rng, min, max, satz, vermeide, wirStr, kto, typId, fallback, opts) {
    opts = opts || {};
    for (let i = 0; i < 16; i++) {
      const ware = wareFuer(rng, wirStr, kto, typId, fallback, opts);
      const posi = glattePosition(rng, min, max, satz, vermeide, { ware: ware, bar: !!opts.bar });
      if (posi) return { ware: ware, posi: posi };
    }
    return null;
  }

  function rabattSauber(rng, listNetto, minP, maxP, satz) {
    const listC = cents(listNetto);
    const ok = [];
    for (let p = minP; p <= maxP; p++) {
      if ((listC * p) % 100 !== 0) continue;
      const rabC = (listC * p) / 100;
      const after = listC - rabC;
      if (after <= 0) continue;
      if (satz === 20 && after % 5) continue;
      if (satz === 10 && after % 10) continue;
      ok.push({ prozent: p, betrag: rabC / 100 });
    }
    if (ok.length) return pick(rng, ok);
    const p = minP;
    const betrag = r2(listNetto * p / 100);
    return { prozent: p, betrag: betrag };
  }
  function betraegeExakt(fall) {
    const errs = [];
    (fall.positionen || []).forEach(function (p, i) {
      if (p.menge == null || p.einzelpreis == null) return;
      const soll = r2(p.menge * p.einzelpreis);
      const hat = p.betrag != null ? r2(p.betrag) : null;
      if (hat != null && cents(hat) !== cents(soll))
        errs.push("Position " + (i + 1) + ": " + p.menge + " × " + p.einzelpreis + " ≠ " + p.betrag);
      if (p.bezeichnung && !preisPasst(p.bezeichnung, p.einzelpreis))
        errs.push("Unrealistischer Preis: " + p.bezeichnung + " à " + p.einzelpreis);
      const art = warenartVon(p.bezeichnung);
      if (art) {
        const P = preisregeln();
        if (p.menge != null && (p.menge < P.menge[0] || p.menge > P.menge[1] || p.menge !== Math.round(p.menge)))
          errs.push("Menge " + p.menge + " liegt nicht in " + P.menge[0] + "–" + P.menge[1]);
      }
    });
    const typIdEx = fall.geschaeftstyp_id || "";
    if (istHandelsBar(typIdEx) || (fall.zahlungsweg === "bar" && typIstHandelsware(typIdEx))) {
      const P = preisregeln();
      (fall.positionen || []).forEach(function (p) {
        if (!p.bezeichnung) return;
        if (!wareIstBarfaehig(p.bezeichnung) && warenartVon(p.bezeichnung))
          errs.push("Bar nicht für teure Ware: " + p.bezeichnung);
        if (p.einzelpreis != null && 2 * p.einzelpreis > P.bar[1] + 1e-9)
          errs.push("2 × Stückpreis sprengt den Bar-Rahmen: " + p.bezeichnung + " à " + p.einzelpreis);
      });
      if (fall.netto != null && (fall.netto < P.bar[0] - 0.005 || fall.netto > P.bar[1] + 0.005))
        errs.push("Bar-Summe " + fall.netto + " nicht in " + P.bar[0] + "–" + P.bar[1] + " € netto");
    }
    if (istHandelsErAr(typIdEx)) {
      const P = preisregeln();
      const basis = /E5_sofortrabatt/.test(typIdEx)
        ? (fall.positionen || []).reduce(function (s, p) { return s + (p.menge != null && p.einzelpreis != null ? p.menge * p.einzelpreis : 0); }, 0)
        : fall.netto;
      if (basis != null && (basis < P.erAr[0] - 0.005 || basis > P.erAr[1] + 0.005))
        errs.push("ER/AR-Summe " + basis + " nicht in " + P.erAr[0] + "–" + P.erAr[1] + " € netto");
    }
    if (istGutschriftTyp(typIdEx)) {
      const P = preisregeln();
      const minGs = ((P.gutschrift && P.gutschrift.min_netto_eur) != null) ? P.gutschrift.min_netto_eur : 20;
      const ur = fall.ursprungsrechnung_netto;
      if (fall.netto == null || fall.netto < minGs - 0.005)
        errs.push("Gutschrift unter " + minGs + " € netto");
      if (ur == null)
        errs.push("Gutschrift ohne Ursprungsrechnung");
      else if (fall.netto != null && fall.netto >= ur - 1e-9)
        errs.push("Gutschrift " + fall.netto + " nicht kleiner als die Ursprungsrechnung " + ur);
    }
    if (fall.geschaeftstyp_id && /E1_|E2_waren|E3_|E4_versand|E4_paket_20|E5_sofortrabatt|E7_kunde|E15_|E16_/.test(fall.geschaeftstyp_id)) {
      const posSum = (fall.positionen || []).reduce(function (s, p) {
        if (p.menge != null && p.einzelpreis != null) return s + cents(p.menge * p.einzelpreis);
        return s;
      }, 0);
      if (posSum && /E5_sofortrabatt/.test(fall.geschaeftstyp_id)) {
        /* Listen-Netto, nicht Netto nach Rabatt */
      } else if (posSum && fall.netto != null && !/E5_sofortrabatt/.test(fall.geschaeftstyp_id) && cents(fall.netto) !== posSum && (fall.positionen || []).every(function (p) { return p.menge != null; })) {
        if (!/skonto|karteneingang|zahlung|mahnung/i.test(fall.geschaeftstyp_id))
          errs.push("Summe Menge×Preis " + (posSum / 100) + " ≠ Netto " + fall.netto);
      }
    }
    return errs;
  }

  const DATUM_VON = new Date(2026, 8, 1);
  const DATUM_BIS = new Date(2026, 10, 30);
  function istWerktag(d) { const w = d.getDay(); return w >= 1 && w <= 5; }
  function werktagImFenster(rng, vermeideDat) {
    const avoid = new Set(vermeideDat || []);
    for (let i = 0; i < 120; i++) {
      const d = new Date(2026, 8, 1 + randInt(rng, 0, 90));
      if (d > DATUM_BIS || d < DATUM_VON) continue;
      if (!istWerktag(d)) continue;
      const f = fmtDatum(d);
      if (avoid.has(f)) continue;
      return f;
    }
    return "15.09.2026";
  }
  function quartalsultimoImFenster() { return "30.09.2026"; }

  function wirKuerzel(wirObj) {
    const n = (wirObj && (wirObj.name || wirObj.wir)) || "";
    if (/Ohmreich/i.test(n)) return "OR";
    if (/Gipfelgriff/i.test(n)) return "GG";
    if (/Gipfelgriff/i.test(n)) return "GG";
    if (/Gipfelgriff/i.test(n)) return "GG";
    if (/Innquell/i.test(n)) return "IQ";
    const letters = String(n).replace(/[^A-Za-z]/g, "").slice(0, 6).toUpperCase();
    return letters || "WIR";
  }
  function neueNummer(art, rng, opts, wirObj) {
    opts = opts || {};
    const used = opts.nummern || (opts.nummern = new Set());
    for (let i = 0; i < 80; i++) {
      let n;
      if (art === "ER") n = "AT-26-" + String(randInt(rng, 10000, 99999));
      else if (art === "AR") n = wirKuerzel(wirObj) + "-2026-" + String(randInt(rng, 10000, 99999));
      else if (art === "GS") n = "GS-2026-" + String(randInt(rng, 10000, 99999));
      else if (art === "K") n = "K" + String(randInt(rng, 1, 99)).padStart(2, "0") + "-2026-" + String(randInt(rng, 100000, 999999));
      else if (art === "KA") n = "KA-2026-Q3-" + String(randInt(rng, 1000, 9999));
      else if (art === "M") n = "M-" + String(randInt(rng, 1000, 9999)) + "-2026";
      else if (art === "AUS") n = String(randInt(rng, 10, 99)) + "/2026";
      else if (art === "INV") n = "INV-2026-" + String(randInt(rng, 10, 99));
      else if (art === "INV25") n = "INV-2025-" + String(randInt(rng, 10, 99));
      else if (art === "GRST") n = "GRST-2026-" + String(randInt(rng, 100000, 999999));
      else if (art === "EB") n = "EB-2026-" + String(randInt(rng, 10000, 99999));
      else n = art + "-" + randInt(rng, 10000, 99999);
      if (!used.has(n)) { used.add(n); return n; }
    }
    const n = art + "-" + String(randInt(rng, 100000, 999999));
    used.add(n);
    return n;
  }
  function nummerArt(belegtyp, isAR) {
    if (belegtyp === "Gutschrift") return "GS";
    if (belegtyp === "Ausgangsrechnung" || isAR) return "AR";
    if (belegtyp === "Kassabeleg" || belegtyp === "Kartenbeleg") return "K";
    if (belegtyp === "Kontoauszug") return "AUS";
    if (belegtyp === "Bankabrechnung") return "KA";
    if (belegtyp === "Mahnung") return "M";
    if (belegtyp === "Eigenbeleg" || belegtyp === "Privatentnahme") return "EB";
    return "ER";
  }

  function kontoKlasse(nr) {
    const n = String(nr);
    if (/^(0|1|2)/.test(n)) return "Aktiv";
    if (/^3/.test(n)) return "Passiv";
    if (n === "8050" || n === "8055" || n === "4890" || n === "4900") return "Ertrag";
    if (/^4/.test(n)) return "Ertrag";
    if (/^9/.test(n)) return "Privat";
    if (/^[5678]/.test(n)) return "Aufwand";
    return "Aktiv";
  }
  function zuAbgang(klasse, seite) {
    if (klasse === "Aktiv" || klasse === "Aufwand" || klasse === "Privat")
      return seite === "Soll" ? "Zugang" : "Abgang";
    return seite === "Haben" ? "Zugang" : "Abgang";
  }
  function schritt3AusLoesung(ls) {
    return (ls || []).map(function (l) {
      const art = kontoKlasse(l.konto);
      const zu = zuAbgang(art, l.seite);
      const name = kontoName(l.konto);
      return l.konto + (name ? " " + name : "") + ": " + art + ", " + zu + " → " + l.seite + ".";
    }).join(" ");
  }

  function baueAngabe(fall) {
    const p = (fall.partner && fall.partner.name) || "";
    const typ = fall.geschaeftstyp_id;
    const listPos = (fall.positionen || [])[0];
    let listenNetto = null, rab = fall.aufgabeRabatt || fall.rabatt || null;
    if (listPos && listPos.menge != null && listPos.einzelpreis != null)
      listenNetto = r2(listPos.menge * listPos.einzelpreis);
    let s = "";
    function warenzeile() {
      if (!listPos) return "";
      if (listPos.menge != null && listPos.einzelpreis != null)
        return listPos.menge + " Stück " + listPos.bezeichnung + " à " + euro(listPos.einzelpreis) + " = " + euro(listPos.menge * listPos.einzelpreis);
      return listPos.bezeichnung || "";
    }
    if (typ === "E5_nachlass_kunde") {
      s = p + ": nachträglicher Preisnachlass, Ware bleibt beim Kunden. Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ", auf Ziel. Kleiner als die Ursprungsrechnung über " + euro(fall.ursprungsrechnung_netto) + " netto.";
    } else if (typ === "E5_nachlass_lieferant") {
      s = "Nachträglicher Preisnachlass von " + p + " (Ware bleibt bei uns). Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ". Kleiner als die Ursprungsrechnung über " + euro(fall.ursprungsrechnung_netto) + " netto.";
    } else if (typ === "E1_ruecksendung_einkauf") {
      s = "Gutschrift von " + p + ": " + warenzeile() + ". Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ". Kleiner als die Ursprungsrechnung über " + euro(fall.ursprungsrechnung_netto) + " netto.";
    } else if (typ === "E2_ruecksendung_verkauf") {
      s = "Gutschrift an " + p + ": " + warenzeile() + ". Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ". Kleiner als die Ursprungsrechnung über " + euro(fall.ursprungsrechnung_netto) + " netto.";
    } else if (typ === "E5_sofortrabatt" || typ === "E5_sofortrabatt_verkauf") {
      const rp = rab && rab.prozent;
      const rb = rab && rab.betrag;
      if (listenNetto != null && rp != null) {
        s = (typ === "E5_sofortrabatt" ? ("ER von " + p + ": ") : ("AR an " + p + ": ")) +
          warenzeile() + ". Listenpreis netto " + euro(listenNetto) + ", Sofortrabatt " + rp + " % (" + euro(rb) + "). Netto nach Rabatt " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ", auf Ziel.";
      } else {
        s = (typ === "E5_sofortrabatt" ? ("ER von " + p + ": ") : ("AR an " + p + ": ")) + "Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ", auf Ziel.";
      }
    } else if (typ === "E16_material_weiterverkauf") {
      s = "ER von " + p + ": " + warenzeile() + ". Die Ware wird unverändert weiterverkauft. Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ".";
    } else if (typ === "E16_material_verbrauch") {
      s = "ER von " + p + ": " + warenzeile() + " zum eigenen Verbrauch (kein Weiterverkauf). Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ".";
    } else if (typ === "E11_bareinzahlung" || typ === "E11_barbehebung") {
      const h = fall.haelfte || "K";
      const was = typ === "E11_bareinzahlung"
        ? (h === "K" ? "Wir zahlen " + euro(fall.brutto) + " bar aus der Kassa auf das Bankkonto ein." : "Die Bareinzahlung " + euro(fall.brutto) + " geht auf dem Bankkonto ein.")
        : (h === "K" ? "Wir heben " + euro(fall.brutto) + " bar für die Kassa ab." : "Die Barbehebung " + euro(fall.brutto) + " wird vom Bankkonto abgebucht.");
      s = "Hälfte " + h + ": " + was + " Beleggruppe " + (h === "B" ? "B" : "K") + ".";
    } else if (typ === "E12_kest_allein") {
      const hz = fall.habenzinsen || r2((fall.loesung.find(function (l) { return l.konto === "9600"; }) || {}).betrag / 0.25);
      s = "Die Bank schreibt KESt 25 % auf Habenzinsen von " + euro(hz) + " ab (Beleggruppe B).";
    } else if (typ === "E7_karteneingang_ohne_gebuehr") {
      const kn = fall.karte || ((fall.positionen && fall.positionen[0] && /Kredit/i.test(fall.positionen[0].bezeichnung)) ? "Kreditkarte" : "Debitkarte");
      s = "Karteneingang " + kn + " " + euro(fall.brutto) + ", ohne Gebühr in diesem Satz.";
    } else if (typ === "E7_karteneingang_mit_gebuehr") {
      s = "Karteneingang " + euro(fall.brutto) + " abzüglich Kartengebühr (Netto " + euro(fall.netto) + " + USt " + euro(fall.ust) + "), Beleggruppe B.";
    } else if (typ === "E7_firmenkarte_ausgleich") {
      s = "Ausgleich der Firmenkarte " + euro(fall.brutto) + " per Bank (Beleggruppe B).";
    } else if (typ === "E7_kartengebuehr_gesondert") {
      s = "Monatliche Kartengebühr, gesondert abgebucht: Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + ", per Bank.";
    } else if (typ === "E6_zahlung_lieferant") {
      s = "Zahlung an " + p + " per Bank, " + euro(fall.brutto) + " (voller Betrag, ohne Abzug).";
    } else if (typ === "E6_zahlung_kunde") {
      s = "Zahlung von " + p + " per Bank, " + euro(fall.brutto) + " (voller Betrag, ohne Abzug).";
    } else if (typ === "E8_lieferantenskonto" || typ === "E9_kundenskonto") {
      s = (typ === "E8_lieferantenskonto" ? ("Wir zahlen die Rechnung von " + p + " per Bank") : (p + " zahlt unsere Rechnung per Bank")) +
        " in der Skontofrist, " + (fall.skonto_prozent || "") + " % Skonto vom Brutto " + euro(fall.brutto) + ".";
    } else if (fall.ust_satz && fall.netto != null) {
      const weg = fall.zahlungsweg === "ziel" ? ", auf Ziel" : (fall.zahlungsweg === "bar" ? ", bar" : (fall.zahlungsweg ? (", " + fall.zahlungsweg) : ""));
      s = (p ? (p + ": ") : "") + (warenzeile() ? warenzeile() + ". " : "") + "Netto " + euro(fall.netto) + " + " + fall.ust_satz + " % USt " + euro(fall.ust) + " = " + euro(fall.brutto) + weg + ".";
    } else {
      s = (p ? (p + ": ") : "") + euro(fall.brutto || fall.netto) + (fall.belegtyp ? " (" + fall.belegtyp + ")" : "") + ".";
    }
    if (!/\bBuche\.\s*$/.test(s)) s = s.replace(/\s*$/, "") + " Buche.";
    const wirS = "Wir sind " + fall.wir.name + (fall.wir.branche ? ", " + fall.wir.branche : "") + ".";
    return { mitWir: wirS + " " + s, ohneWir: s, wirSatz: wirS };
  }

  function datumImFenster(dat, typId) {
    if (typId === "E17_inventur") return true;
    if (/E12_habenzinsen|E12_kest|E12_soll|E12_bank/.test(typId || "")) {
      return /^(31\.03\.|30\.06\.|30\.09\.|31\.12\.)2026$/.test(String(dat)) || /^(31\.03\.|30\.06\.|30\.09\.|31\.12\.)/.test(String(dat));
    }
    const d = parseDatum(dat);
    return d >= DATUM_VON && d <= DATUM_BIS;
  }


  function mulberry(seed) {
    let s = (seed >>> 0) || 1;
    return function () {
      s += 0x6D2B79F5;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  function randInt(rng, a, b) { return a + Math.floor(rng() * (b - a + 1)); }
  function shuffled(rng, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function glattNetto(rng, min, max, satz, vermeide) {
    const avoid = new Set((vermeide || []).map(cents));
    const step = satz === 10 ? 10 : (satz === 20 ? 5 : 1);
    const lo = Math.ceil(min), hi = Math.floor(max);
    const cands = [];
    for (let n = lo; n <= hi; n += step) {
      const ust = r2(n * (satz || 0) / 100);
      if (cents(ust) === cents(n * (satz || 0) / 100)) {
        if (!avoid.has(cents(n))) cands.push(n);
      }
    }
    if (!cands.length) {
      for (let k = 0; k < 80; k++) {
        const n = r2(min + rng() * (max - min));
        if (!avoid.has(cents(n))) return n;
      }
      return r2((min + max) / 2);
    }
    const ganz = cands.filter(n => Math.abs(n - Math.round(n)) < 1e-9);
    const pool = ganz.length ? ganz : cands;
    return pick(rng, pool);
  }

  function betragMitAbstand(rng, basis, min, max, satz, vermeide) {
    const avoid = (vermeide || []).slice();
    if (basis != null) avoid.push(basis, r2(basis * 2), r2(basis / 2));
    if (basis != null && basis > 0) {
      const tries = shuffled(rng, [0.35, 0.4, 0.5, 0.55, 0.6, 0.65, 1.35, 1.4, 1.5, 1.6, 1.7]);
      for (const f of tries) {
        const v = r2(basis * f);
        if (v >= min && v <= max && Math.abs(v - basis * 2) > 0.05 && Math.abs(v * 2 - basis) > 0.05) {
          const n = glattNetto(rng, Math.max(min, r2(v * 0.9)), Math.min(max, r2(v * 1.1)), satz || 0, avoid);
          if (n >= min && n <= max) return n;
        }
      }
    }
    return glattNetto(rng, min, max, satz || 0, avoid);
  }

  function ustVonNetto(netto, satz) { return r2(r2(netto) * satz / 100); }
  function bruttoVon(netto, satz) { const n = r2(netto); return r2(n + ustVonNetto(n, satz)); }
  function nettoVonBrutto(brutto, satz) { return satz ? r2(r2(brutto) / (1 + satz / 100)) : r2(brutto); }

  function parseDatum(s) {
    const m = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(String(s || "").trim());
    if (!m) return new Date(2026, 8, 15);
    return new Date(+m[3], +m[2] - 1, +m[1]);
  }
  function fmtDatum(d) {
    return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear();
  }
  function verschiebeDatum(rng, basis) {
    const d0 = parseDatum(basis || "15.09.2026");
    for (let i = 0; i < 50; i++) {
      const d = new Date(d0.getTime());
      const t = randInt(rng, 1, 18);
      d.setDate(d.getDate() + (rng() < 0.5 ? t : -t));
      if (d < DATUM_VON) d.setTime(DATUM_VON.getTime());
      if (d > DATUM_BIS) d.setTime(DATUM_BIS.getTime());
      if (istWerktag(d)) return fmtDatum(d);
    }
    return werktagImFenster(rng, []);
  }
  function plusTage(dat, n) {
    const d = parseDatum(dat);
    d.setDate(d.getDate() + n);
    return fmtDatum(d);
  }

  function wirObjekt(wirStr) {
    const st = stamm() || {};
    const raw = String(wirStr || "");
    const w = (st.wir || []).find(x => x.wir === raw || x.name === raw.split(",")[0].trim());
    if (w) return { name: w.name, adresse: w.adresse, uid: w.uid, branche: w.branche, wir: w.wir, einzelunternehmen: !!w.einzelunternehmen };
    const kurz = raw.split(",")[0].trim();
    const p = (st.parteien || {})[kurz];
    if (p) return { name: p.name, adresse: p.adresse || "", uid: p.uid || "", branche: raw.includes(",") ? raw.split(",").slice(1).join(",").trim() : "", wir: raw, einzelunternehmen: /e\.U\./.test(p.name) };
    return { name: kurz || raw, adresse: "", uid: "", branche: "", wir: raw || ((st.wir || [])[0] || {}).wir, einzelunternehmen: /e\.U\./.test(raw) };
  }
  function defaultWir(rng, nurEU) {
    const list = ((stamm() || {}).wir || []).filter(w => !nurEU || w.einzelunternehmen);
    return list.length ? pick(rng, list).wir : "Ohmreich Elektrofachhandel GmbH, Elektronikhandel";
  }
  function partnerVonKonto(konto) {
    const name = ((regeln() || {}).personenkonten || {})[konto];
    if (!name) return null;
    const p = ((stamm() || {}).parteien || {})[name] || { name, adresse: "", uid: "" };
    return { name: p.name || name, adresse: p.adresse || "", uid: p.uid || "", konto: String(konto) };
  }
  function partnerOhneKonto(name) {
    const p = ((stamm() || {}).parteien || {})[name];
    if (p) return { name: p.name, adresse: p.adresse || "", uid: p.uid || "", konto: null };
    return { name, adresse: "", uid: "", konto: null };
  }
  function bankFuer(wirName, rng) {
    const banks = (stamm() || {}).banken || {};
    const names = Object.keys(banks);
    const zufall = names.length ? pick(rng, names) : "Saumland Bank AG";
    const fw = (typeof FIRMEN !== "undefined" && FIRMEN[wirName]) || {};
    const n = fw.bank && banks[fw.bank] ? fw.bank : zufall;
    const b = banks[n] || { name: n, adresse: "", uid: "", bic: "SAUMATWW" };
    return { name: b.name, adresse: b.adresse || "", uid: b.uid || "", bic: b.bic || "SAUMATWW", iban: fw.iban || (stamm() || {}).iban_platzhalter || "AT00 9810 0000 0000 1001", inhaber: wirName };
  }
  function produkt(rng, einheit, typ, fallback) {
    const key = "E" + einheit + "_" + typ;
    const list = (((stamm() || {}).produkte || {})[key] || []).filter(x => !/^Z:/.test(x) && !/Elektro-Pkw|reinen Elektro/i.test(x));
    if (list.length) return pick(rng, list);
    return fallback || "Handelsware";
  }
  function z(seite, konto, betrag) {
    return { seite: seite, konto: String(konto), bezeichnung: kontoName(konto), betrag: r2(betrag) };
  }
  function loesungOK(ls) {
    const s = r2(ls.filter(x => x.seite === "Soll").reduce((a, b) => a + b.betrag, 0));
    const h = r2(ls.filter(x => x.seite === "Haben").reduce((a, b) => a + b.betrag, 0));
    return cents(s) === cents(h) && ls.every(x => x.konto !== "2000" && x.konto !== "3300") && ls.length > 0;
  }
  function nummer(prefix, rng, digits) {
    const d = digits || 5;
    return prefix + randInt(rng, Math.pow(10, d - 1), Math.pow(10, d) - 1);
  }
  function rksvPlatzhalter(kassenId, belegNr, iso, brutto) {
    return "Übungsbeleg · profmasar.at";
  }
  function qrDataUrl(text) {
    const V = global.BEMA_VENDOR;
    if (!V || !V.qrcode || typeof document === "undefined") return null;
    try {
      const qr = V.qrcode(0, "M");
      qr.addData(text);
      qr.make();
      const n = qr.getModuleCount(), scale = 4, margin = 2, size = (n + margin * 2) * scale;
      const canvas = document.createElement("canvas");
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#000";
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) ctx.fillRect((c + margin) * scale, (r + margin) * scale, scale, scale);
      }
      return canvas.toDataURL("image/png");
    } catch (err) { return null; }
  }
  function registriereQr(beleg) {
    if (!beleg || !beleg.kasse || !beleg.kasse.rksv || !beleg.nummer) return;
    const url = qrDataUrl(beleg.kasse.rksv);
    if (!url) return;
    global.QR = global.QR || {};
    global.QR[beleg.nummer] = url;
  }
  function kasseAm(beleg, zeit, brutto) {
    const id = "K01-" + String(beleg.nummer).replace(/[^A-Za-z0-9]/g, "").slice(-8);
    const d = parseDatum(beleg.datum);
    const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0") + "T" + zeit + ":00";
    beleg.kasse = { id: id, zeit: zeit, rksv: rksvPlatzhalter(id, beleg.nummer, iso, r2(brutto)) };
    return beleg;
  }
  function party(p) { return { name: p.name, adresse: p.adresse || "", uid: p.uid || "" }; }
  function a4Beleg(typ, aussteller, empfaenger, o) {
    const b = {
      typ: typ, aussteller: party(aussteller), empfaenger: party(empfaenger),
      nummer: o.nummer, datum: o.datum,
      positionen: o.positionen || [],
      ust_satz: o.ust_satz == null ? 0 : o.ust_satz,
      netto: r2(o.netto == null ? 0 : o.netto),
      ust: r2(o.ust == null ? 0 : o.ust),
      brutto: r2(o.brutto == null ? 0 : o.brutto),
      zahlungsbedingungen: o.zahlungsbedingungen || "",
      leistungsdatum: o.leistungsdatum || o.datum
    };
    if (o.bankverbindung) b.bankverbindung = o.bankverbindung;
    if (o.rabatt) b.rabatt = o.rabatt;
    if (o.kasse) b.kasse = o.kasse;
    if (o.konto) b.konto = o.konto;
    if (o.saldo_alt != null) { b.saldo_alt = o.saldo_alt; b.saldo_neu = o.saldo_neu; b.blatt = o.blatt || "1 von 1"; }
    if (o.zeitraum) b.zeitraum = o.zeitraum;
    if (o.faellig_am) b.faellig_am = o.faellig_am;
    if (o.bezug) b.bezug = o.bezug;
    return b;
  }

  function typIdFuerAufgabe(a) {
    if (!a) return { typId: null, grund: "keine Aufgabe" };
    if (a.bema && a.bema.geschaeftstyp_id)
      return { typId: a.bema.geschaeftstyp_id, haelfte: a.bema.haelfte, hinweis: a.bema.hinweis };
    const mapRow = a.id ? mappingRow(a.id) : null;
    if (mapRow) {
      if (mapRow.status === "verboten" || !mapRow.typ || mapRow.typ === "—" || mapRow.typ === "-")
        return { typId: null, grund: mapRow.hinweis || "Für den Generator verboten", verboten: true };
      return { typId: mapRow.typ, haelfte: mapRow.haelfte || undefined, hinweis: mapRow.hinweis || undefined };
    }
    const e = a.einheit;
    const btyp = (a.beleg || {}).typ || "";
    const text = a.text || "";
    const loes = a.loesung || [];
    const S = new Set(loes.filter(l => l.seite === "Soll").map(l => l.konto));
    const H = new Set(loes.filter(l => l.seite === "Haben").map(l => l.konto));
    const K = new Set([].concat(Array.from(S), Array.from(H)));
    const persoS = Array.from(S).find(x => /^200\d{2}$/.test(x) || /^330\d{2}$/.test(x));
    const persoH = Array.from(H).find(x => /^200\d{2}$/.test(x) || /^330\d{2}$/.test(x));
    const verboten = function (grund) { return { typId: null, grund: grund, verboten: true }; };

    if (e === 13 && K.has("0200")) return verboten("Grunderwerbsteuer / Grundstückskauf – global verboten");
    if (e === 14 && /Elektro-Pkw|reinen Elektro/i.test(text)) return verboten("Elektro-Pkw – global verboten");
    if (e === 15) {
      if (K.has("0640") && K.has("2500")) return { typId: "E15_lkw_kauf" };
      if (/Anmeldegebühr|Anmeldekosten/i.test(text) || (K.has("0640") && !K.has("2500") && (loes[0] && loes[0].betrag < 1000)))
        return verboten("Anmeldekosten – für den Generator verboten");
      return verboten("Pkw-Kauf / NoVA / Elektro-Pkw – für den Generator verboten");
    }
    if (e === 1) {
      if (K.has("5000") && H.has("2700")) return { typId: "E1_wareneinkauf_bar" };
      if (K.has("5000") && persoH && String(persoH).indexOf("330") === 0) return { typId: "E1_wareneinkauf_ziel" };
      if (K.has("5000") && persoS && String(persoS).indexOf("330") === 0 && H.has("5000")) return { typId: "E1_ruecksendung_einkauf" };
      if (persoS && String(persoS).indexOf("330") === 0 && H.has("2800"))
        return { typId: "E6_zahlung_lieferant", hinweis: "Zahlung in Einheit 1, Kontenlogik wie E6" };
    }
    if (e === 2) {
      if (K.has("4900") || S.has("9600")) return { typId: "E2_eigenverbrauch" };
      if (K.has("4000") && persoH && String(persoH).indexOf("200") === 0 && S.has("4000")) return { typId: "E2_ruecksendung_verkauf" };
      if (S.has("2700") && H.has("4000")) return { typId: "E2_warenverkauf_bar" };
      if (persoS && String(persoS).indexOf("200") === 0 && H.has("4000")) return { typId: "E2_warenverkauf_ziel" };
      if (S.has("2800") && persoH && String(persoH).indexOf("200") === 0)
        return { typId: "E6_zahlung_kunde", hinweis: "Zahlung in Einheit 2, Kontenlogik wie E6" };
    }
    if (e === 3) {
      if (K.has("5000")) return { typId: "E3_bezugskosten" };
      if (persoS && String(persoS).indexOf("330") === 0 && H.has("2800"))
        return { typId: "E6_zahlung_lieferant", hinweis: "Zahlung in Einheit 3, Kontenlogik wie E6" };
    }
    if (e === 4) {
      if (K.has("7300")) return { typId: "E4_versand_spedition" };
      if (K.has("7310")) return { typId: "E4_paket_20" };
      if (K.has("7311")) return { typId: "E4_paket_0" };
      if (persoS && String(persoS).indexOf("330") === 0 && H.has("2800"))
        return { typId: "E6_zahlung_lieferant", hinweis: "Zahlung in Einheit 4, Kontenlogik wie E6" };
    }
    if (e === 5) {
      if (K.has("4400")) return { typId: "E5_nachlass_kunde" };
      if (btyp === "Gutschrift" && K.has("5000") && persoS) return { typId: "E5_nachlass_lieferant" };
      if (S.has("4000") && persoH) return { typId: "E2_ruecksendung_verkauf", hinweis: "Rücksendung Verkauf in Einheit 5" };
      if (K.has("5000")) return { typId: "E5_sofortrabatt" };
      if (persoS && String(persoS).indexOf("200") === 0 && H.has("4000"))
        return { typId: "E5_sofortrabatt_verkauf" };
    }
    if (e === 6) {
      if (persoS && String(persoS).indexOf("330") === 0 && H.has("2800")) return { typId: "E6_zahlung_lieferant" };
      if (S.has("2800") && persoH && String(persoH).indexOf("200") === 0) return { typId: "E6_zahlung_kunde" };
    }
    if (e === 7) {
      if (K.has("7792") && H.has("2800") && !H.has("2880") && !H.has("2885")) return { typId: "E7_kartengebuehr_gesondert" };
      if (K.has("7792")) return { typId: "E7_karteneingang_mit_gebuehr" };
      if ((S.has("3180") || S.has("3190")) && H.has("2800")) return { typId: "E7_firmenkarte_ausgleich" };
      if (H.has("3180") || H.has("3190")) return { typId: "E7_eigene_firmenkarte" };
      if (S.has("2880") && H.has("4000")) return { typId: "E7_kunde_kreditkarte" };
      if (S.has("2885") && H.has("4000")) return { typId: "E7_kunde_debitkarte" };
      if (S.has("2800") && (H.has("2880") || H.has("2885")) && !K.has("7792"))
        return { typId: "E7_karteneingang_ohne_gebuehr" };
    }
    if (e === 8) {
      if (K.has("5880") || (persoS && H.has("2800") && !K.has("5000"))) return { typId: "E8_lieferantenskonto" };
      if (K.has("5000") && persoH) return { typId: "E1_wareneinkauf_ziel", hinweis: "Eingangsrechnung in Einheit 8 (Vorbereitung Skonto), Kontenlogik wie E1" };
    }
    if (e === 9) {
      if (K.has("4410") || (S.has("2800") && persoH && !H.has("4000"))) return { typId: "E9_kundenskonto" };
      if (persoS && H.has("4000")) return { typId: "E2_warenverkauf_ziel", hinweis: "Ausgangsrechnung in Einheit 9 (Vorbereitung Skonto), Kontenlogik wie E2" };
    }
    if (e === 10) {
      if (K.has("4890") || K.has("8055")) return { typId: "E10_mahnung_kunde" };
      if (K.has("8321") || K.has("8320")) return { typId: "E10_mahnung_lieferant" };
    }
    if (e === 11) {
      if (S.has("2870") && H.has("2700")) return { typId: "E11_bareinzahlung", haelfte: "K" };
      if (S.has("2800") && H.has("2870")) return { typId: "E11_bareinzahlung", haelfte: "B" };
      if (S.has("2700") && H.has("2870")) return { typId: "E11_barbehebung", haelfte: "K" };
      if (S.has("2870") && H.has("2800")) return { typId: "E11_barbehebung", haelfte: "B" };
    }
    if (e === 12) {
      if (K.has("8050")) return { typId: "E12_habenzinsen_kest" };
      if (K.has("8310")) return { typId: "E12_sollzinsen" };
      if (K.has("7790")) return { typId: "E12_bankspesen" };
      if (S.has("9600") && H.has("2800") && !K.has("8050"))
        return { typId: "E12_kest_allein" };
    }
    if (e === 13) {
      if (K.has("7100")) return { typId: "E13_grundsteuer" };
      if (K.has("7780")) return { typId: "E13_kammerumlage" };
      if (K.has("9600")) return { typId: "E13_einkommensteuer" };
      if (K.has("3520")) return { typId: "E13_ust_zahllast" };
    }
    if (e === 14) {
      if (K.has("7330") && K.has("2500")) return { typId: "E14_lkw_betrieb" };
      if (K.has("7330") && !K.has("2500")) return { typId: "E14_versicherung" };
      if (K.has("7320") && !K.has("2500")) {
        if (/Versicher|Haftpflicht|Kasko/i.test(text) || /Versicher/i.test(JSON.stringify(a.beleg || {})))
          return { typId: "E14_versicherung" };
        return { typId: "E14_pkw_betrieb" };
      }
    }
    if (e === 16) {
      if (K.has("5000")) return { typId: "E16_material_weiterverkauf" };
      if (["5340","5450","7240","7280","7600"].some(x => K.has(x)))
        return { typId: "E16_material_verbrauch" };
      if (persoS && H.has("2800"))
        return { typId: "E6_zahlung_lieferant", hinweis: "Zahlung in Einheit 16, Kontenlogik wie E6" };
    }
    if (e === 17) return { typId: "E17_inventur" };
    return { typId: null, grund: "Kein Geschäftstyp aus dem RW-Material zuordenbar" };
  }

  function basisBetrag(a) {
    if (!a || !a.loesung) return null;
    const b = a.beleg || {};
    if (b.netto) return b.netto;
    if (b.brutto) return b.brutto;
    return Math.max.apply(null, a.loesung.map(l => l.betrag));
  }
  function partnerKontoAusAufgabe(a) {
    const k = (a.loesung || []).map(l => l.konto).find(x => /^200\d{2}$/.test(x) || /^330\d{2}$/.test(x));
    return k || null;
  }

  function gedanke(steps) {
    return {
      was_passiert: steps.was || "",
      konten: steps.konten || "",
      art_zu_abgang: steps.art || "",
      steuer: steps.steuer || "Keine Steuerbuchung in diesem Satz.",
      beleggruppe: steps.bg || "",
      begruendung: steps.warum || ""
    };
  }

  function zeit(rng) {
    return String(randInt(rng, 8, 17)).padStart(2, "0") + ":" + String(randInt(rng, 0, 59)).padStart(2, "0");
  }


  function generate(typId, opts) {
    opts = opts || {};
    const typ = typById(typId);
    if (!typ) {
      return { ok: false, fehler: "Unbekannter Geschäftstyp: " + typId };
    }
    const rng = mulberry(opts.seed || (Date.now() % 1e9));
    const einheit = typ.einheit;
    const v = Object.assign({}, typ.variierbar || {}, opts.variierbar || {});
    if (opts.art != null) v.art = Array.isArray(opts.art) ? opts.art.slice() : [opts.art];
    let wirStr = wirAnpassenAnTyp(typId, opts.wir || defaultWir(rng, typId === "E2_eigenverbrauch"));
    if (typId === "E2_eigenverbrauch") {
      const eu = wirObjekt(wirStr);
      if (!eu.einzelunternehmen) wirStr = defaultWir(rng, true);
    }
    const wir = wirObjekt(wirStr);
    let datum = opts.datum || verschiebeDatum(rng, opts.basisDatum || werktagImFenster(rng, opts.vermeideDatum || []));
    if (/E12_habenzinsen|E12_kest|E12_soll|E12_bank/.test(typId) && !opts.datum) datum = quartalsultimoImFenster();
    const twist = opts.twist === true ? true : !!opts.twist;
    const vermeide = opts.vermeideBetrag || [];
    const vermeidePartner = opts.vermeidePartner || [];
    const basis = opts.basisBetrag;

    function pickKonto(liste) {
      const passend = kontenPassend(wir.wir || wir.name, liste);
      const rest = passend.filter(k => vermeidePartner.indexOf(k) < 0);
      return pick(rng, rest.length ? rest : (passend.length ? passend : liste));
    }
    function nettoIm(field, defMin, defMax, satz) {
      const bereich = v[field] || [defMin, defMax];
      return betragMitAbstand(rng, basis, bereich[0], bereich[1], satz == null ? 20 : satz, vermeide);
    }

    let beleggruppe = typ ? typ.beleggruppe : "B";
    let belegtyp = typ ? typ.belegtyp : "Kontoauszug";
    let zahlungsweg = "ziel";
    let ustSatz = 20;
    let partner = null;
    let positionen = [];
    let netto = 0, ust = 0, brutto = 0;
    let loesung = [];
    let beleg = null, zusatzbeleg = null;
    let rechenzeile = null;
    let twistName = null;
    let g = {};
    let text = "";
    let haelfte = opts.haelfte || null;

    function setSteuer(n, satz) {
      ustSatz = satz;
      netto = r2(n);
      ust = ustVonNetto(netto, satz);
      brutto = r2(netto + ust);
    }
    function setBrutto(b, satz) {
      ustSatz = satz;
      brutto = r2(b);
      netto = satz ? nettoVonBrutto(brutto, satz) : r2(b);
      ust = r2(brutto - netto);
    }

    function erBeleg(ausst, pos, zb, rabatt) {
      const artNr = nummerArt(belegtyp, belegtyp === "Ausgangsrechnung");
      const b = a4Beleg(belegtyp, ausst, wir, {
        nummer: neueNummer(artNr, rng, opts, wir),
        datum: datum, leistungsdatum: datum,
        positionen: pos, ust_satz: ustSatz, netto: netto, ust: ust, brutto: brutto,
        zahlungsbedingungen: zb || (zahlungsweg === "ziel" ? "Zahlbar innerhalb von 30 Tagen ohne Abzug" : (zahlungsweg === "bar" ? "Bar bezahlt" : "Sofort per Bank überwiesen")),
        bankverbindung: { iban: ((typeof FIRMEN !== "undefined" && FIRMEN[ausst.name]) || {}).iban || (stamm() || {}).iban_platzhalter },
        rabatt: rabatt || undefined
      });
      return b;
    }

    /* ===== Typen ===== */
    if (typId === "E1_wareneinkauf_ziel" || typId === "E1_wareneinkauf_bar") {
      const bar = typId === "E1_wareneinkauf_bar";
      const kto = pickKonto(["33010", "33020"]);
      partner = partnerVonKonto(kto);
      const rahmen = bar ? preisregeln().bar : (v.netto_eur || preisregeln().erAr);
      const posPack = positionFuer(rng, rahmen[0], rahmen[1], 20, vermeide, wir.wir, kto, typId, "Handelsware", { min: rahmen[0], max: rahmen[1], bar: bar });
      if (!posPack) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const ware = posPack.ware, posi = posPack.posi;
      setSteuer(posi.netto, 20);
      positionen = [{ bezeichnung: ware, menge: posi.menge, einzelpreis: posi.einzelpreis }];
      zahlungsweg = bar ? "bar" : "ziel";
      beleggruppe = bar ? "K" : "ER";
      if (twist && v.zahlungsweg_twist) {
        if (bar) { zahlungsweg = rng() < 0.5 ? "kreditkarte" : "debitkarte"; beleggruppe = "S"; belegtyp = "Kartenbeleg"; twistName = "Karte statt bar"; }
        else {
          /* teure Ware nicht auf Bar drehen; nur Karte oder so lassen */
          zahlungsweg = rng() < 0.5 ? "kreditkarte" : "debitkarte"; beleggruppe = "S"; belegtyp = "Kartenbeleg"; twistName = "Firmenkarte statt Ziel";
        }
      }
      let habenKto = "2700";
      if (zahlungsweg === "ziel") habenKto = partner.konto;
      else if (zahlungsweg === "kreditkarte") habenKto = "3180";
      else if (zahlungsweg === "debitkarte") habenKto = "3190";
      else habenKto = "2700";
      loesung = [z("Soll", "5000", netto), z("Soll", "2500", ust), z("Haben", habenKto, brutto)];
      beleg = erBeleg(partner, positionen, null);
      if (beleggruppe === "K" || beleggruppe === "S") kasseAm(beleg, zeit(rng), brutto);
      g = { was: "Wir kaufen Handelsware bei " + partner.name + (zahlungsweg === "ziel" ? " auf Ziel." : (zahlungsweg === "bar" ? " und zahlen bar." : " und zahlen mit der Firmenkarte.")),
        konten: "5000 Handelswareneinsatz 20 %, 2500 Vorsteuer, " + habenKto + " " + kontoName(habenKto) + ". Nicht 3300.",
        art: "5000 Aufwand, Zugang → Soll. 2500 Aktiv, Zugang → Soll. " + habenKto + " " + (zahlungsweg === "ziel" ? "Passiv, Zugang" : "Aktiv, Abgang bzw. Verbindlichkeit Karte") + " → Haben.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer, weil Einkauf.",
        bg: beleggruppe, warum: "Die Ware erhöht den Aufwand, die Vorsteuer holen wir uns zurück." };
    }

    else if (typId === "E1_ruecksendung_einkauf") {
      const kto = pickKonto(["33010", "33020"]);
      partner = partnerVonKonto(kto);
      const gsR = gutschriftRahmen(rng);
      opts._ursprung_netto = gsR.ursprung;
      zahlungsweg = "ziel"; beleggruppe = "ER"; belegtyp = "Gutschrift";
      const posPack = positionFuer(rng, gsR.min, gsR.max, 20, vermeide, wir.wir, kto, typId, "Handelsware", { min: gsR.min, max: gsR.max });
      if (!posPack) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const ware = posPack.ware, posi = posPack.posi;
      setSteuer(posi.netto, 20);
      positionen = [{ bezeichnung: "Rücksendung " + ware, menge: posi.menge, einzelpreis: posi.einzelpreis }];
      loesung = [z("Soll", partner.konto, brutto), z("Haben", "5000", netto), z("Haben", "2500", ust)];
      beleg = erBeleg(partner, positionen, "Wird mit der offenen Rechnung über " + euro(gsR.ursprung) + " netto verrechnet");
      g = { was: "Wir senden Ware an " + partner.name + " zurück und erhalten eine Gutschrift (kleiner als die Ursprungsrechnung über " + euro(gsR.ursprung) + " netto).",
        konten: "Soll " + partner.konto + ", Haben 5000 und 2500. Nicht 3300.",
        art: "Die Schuld beim Lieferanten sinkt (Soll). Aufwand und Vorsteuer gehen zurück (Haben).",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuerkorrektur.",
        bg: "ER", warum: "Der Satz des Einkaufs kehrt sich um." };
    }

    else if (typId === "E2_warenverkauf_ziel" || typId === "E2_warenverkauf_bar") {
      const bar = typId === "E2_warenverkauf_bar";
      const kto = pickKonto(["20010", "20020", "20030"]);
      partner = partnerVonKonto(kto);
      const rahmen = bar ? preisregeln().bar : (v.netto_eur || preisregeln().erAr);
      const posPack = positionFuer(rng, rahmen[0], rahmen[1], 20, vermeide, wir.wir, null, typId, "Handelsware", { min: rahmen[0], max: rahmen[1], bar: bar });
      if (!posPack) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const ware = posPack.ware, posi = posPack.posi;
      setSteuer(posi.netto, 20);
      positionen = [{ bezeichnung: ware, menge: posi.menge, einzelpreis: posi.einzelpreis }];
      zahlungsweg = bar ? "bar" : "ziel";
      beleggruppe = bar ? "K" : "AR";
      belegtyp = bar ? "Kassabeleg" : "Ausgangsrechnung";
      if (twist && v.zahlungsweg_twist) {
        /* Ziel-Fälle nicht auf Bar drehen (teure Ware, Summe ≥ 300 €). Bar-Fälle dürfen auf Karte. */
        zahlungsweg = rng() < 0.5 ? "kreditkarte" : "debitkarte";
        beleggruppe = "S"; belegtyp = "Kartenbeleg"; twistName = "Karte statt " + (bar ? "bar" : "Ziel");
      }
      let sollKto = partner.konto;
      if (zahlungsweg === "bar") sollKto = "2700";
      else if (zahlungsweg === "kreditkarte") sollKto = "2880";
      else if (zahlungsweg === "debitkarte") sollKto = "2885";
      loesung = [z("Soll", sollKto, brutto), z("Haben", "4000", netto), z("Haben", "3500", ust)];
      beleg = erBeleg(wir, positionen, zahlungsweg === "ziel" ? "Zahlbar innerhalb von 14 Tagen netto" : (zahlungsweg === "bar" ? "Bar bezahlt" : "Kartenzahlung"));
      /* Aussteller ist Wir bei AR/Kassa-Verkauf */
      beleg.aussteller = party(wir);
      beleg.empfaenger = party(partner);
      if (beleggruppe === "K" || beleggruppe === "S") kasseAm(beleg, zeit(rng), brutto);
      g = { was: "Wir verkaufen Handelsware an " + partner.name + (zahlungsweg === "ziel" ? " auf Ziel." : (zahlungsweg === "bar" ? ", bar." : ", der Kunde zahlt mit Karte.")),
        konten: sollKto + " " + kontoName(sollKto) + ", 4000, 3500. Nicht 2000, nicht 2700 wenn Karte.",
        art: sollKto + " Aktiv, Zugang → Soll. 4000 Ertrag, Zugang → Haben. 3500 Passiv, Zugang → Haben.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Umsatzsteuer im Haben.",
        bg: beleggruppe, warum: "Erlös und Umsatzsteuer stehen im Haben; im Soll der Zahlungseingang bzw. die Forderung." };
    }

    else if (typId === "E2_ruecksendung_verkauf") {
      const kto = pickKonto(["20010", "20020", "20030"]);
      partner = partnerVonKonto(kto);
      const gsR = gutschriftRahmen(rng);
      opts._ursprung_netto = gsR.ursprung;
      beleggruppe = "AR"; belegtyp = "Gutschrift"; zahlungsweg = "ziel";
      const posPack = positionFuer(rng, gsR.min, gsR.max, 20, vermeide, wir.wir, null, typId, "Handelsware", { min: gsR.min, max: gsR.max });
      if (!posPack) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const ware = posPack.ware, posi = posPack.posi;
      setSteuer(posi.netto, 20);
      positionen = [{ bezeichnung: "Rücksendung " + ware, menge: posi.menge, einzelpreis: posi.einzelpreis }];
      loesung = [z("Soll", "4000", netto), z("Soll", "3500", ust), z("Haben", partner.konto, brutto)];
      beleg = erBeleg(wir, positionen, "Wird mit der offenen Rechnung über " + euro(gsR.ursprung) + " netto verrechnet");
      beleg.aussteller = party(wir); beleg.empfaenger = party(partner);
      g = { was: partner.name + " sendet Ware zurück; wir erteilen eine Gutschrift (kleiner als die Ursprungsrechnung über " + euro(gsR.ursprung) + " netto).",
        konten: "Soll 4000 + 3500, Haben " + partner.konto + ". Nicht 2000.",
        art: "Der Verkaufssatz kehrt sich um.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Umsatzsteuerkorrektur.",
        bg: "AR", warum: "Erlös und USt sinken, die Forderung an den Kunden sinkt." };
    }

    else if (typId === "E2_eigenverbrauch") {
      const posPackEv = positionFuer(rng, 20, 400, 20, vermeide, wir.wir, null, typId, "Handelsware", { min: 20, max: 400 });
      if (!posPackEv) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const wareEv = posPackEv.ware, posiEv = posPackEv.posi;
      setSteuer(posiEv.netto, 20);
      partner = { name: wir.name, adresse: wir.adresse, uid: wir.uid, konto: null };
      beleggruppe = "AR"; belegtyp = "Eigenbeleg"; zahlungsweg = "ziel";
      positionen = [{ bezeichnung: "Eigenverbrauch " + wareEv, menge: posiEv.menge, einzelpreis: posiEv.einzelpreis }];
      loesung = [z("Soll", "9600", brutto), z("Haben", "4900", netto), z("Haben", "3500", ust)];
      beleg = a4Beleg("Eigenbeleg", wir, { name: "Privat (Inhaber)", adresse: wir.adresse || "", uid: "" }, {
        nummer: neueNummer("EB", rng, opts, wir), datum: datum, leistungsdatum: datum,
        positionen: positionen, ust_satz: ustSatz, netto: netto, ust: ust, brutto: brutto,
        zahlungsbedingungen: "Keine Zahlung – Verrechnung über Privat (9600)."
      });
      text = "Wir entnehmen Handelsware für private Zwecke (Eigenverbrauch): " + euro(netto) + " netto + 20 % USt " + euro(ust) + " = " + euro(brutto) + ".";
      g = { was: "Der Inhaber entnimmt Ware für private Zwecke.",
        konten: "Soll 9600 Privat, Haben 4900 Eigenverbrauch 20 % und 3500. Nur bei Einzelunternehmen.",
        art: "9600 Privat, Zugang → Soll. 4900 Ertrag, Zugang → Haben. 3500 Passiv, Zugang → Haben.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Umsatzsteuer (wie ein Verkauf).",
        bg: "AR", warum: "Eigenverbrauch wird wie ein Verkauf an sich selbst behandelt." };
    }

    else if (typId === "E3_bezugskosten") {
      const kto = pickKonto(["33030", "33040"]);
      partner = partnerVonKonto(kto);
      setSteuer(nettoIm("netto_eur", 40, 800, 20), 20);
      zahlungsweg = "ziel"; beleggruppe = "ER"; belegtyp = "Eingangsrechnung";
      if (twist && v.zahlungsweg_twist) {
        if (rng() < 0.5) { zahlungsweg = "bar"; beleggruppe = "K"; belegtyp = "Kassabeleg"; twistName = "bar statt Ziel"; }
        else { zahlungsweg = "bank"; beleggruppe = "B"; twistName = "sofort Bank"; }
      }
      const habenKto = zahlungsweg === "bar" ? "2700" : (zahlungsweg === "bank" ? "2800" : partner.konto);
      positionen = [{ bezeichnung: "Fracht / Transport der Ware zu uns", menge: 1, einzelpreis: netto }];
      loesung = [z("Soll", "5000", netto), z("Soll", "2500", ust), z("Haben", habenKto, brutto)];
      beleg = erBeleg(partner, positionen, null);
      if (beleggruppe === "K") kasseAm(beleg, zeit(rng), brutto);
      g = { was: "Bezugskosten (Fracht) auf dem Weg der Ware zu uns, Partner " + partner.name + ".",
        konten: "Soll 5000 + 2500, Haben " + habenKto + ". Nicht 7300.",
        art: "Bezugskosten erhöhen den Wareneinsatz.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer.",
        bg: beleggruppe, warum: "Wie ein Warenkauf; 7300 wäre Versand beim Verkauf." };
    }

    else if (typId === "E4_versand_spedition") {
      const kto = pickKonto(["33030", "33040"]);
      partner = partnerVonKonto(kto);
      setSteuer(nettoIm("netto_eur", 40, 800, 20), 20);
      zahlungsweg = "ziel"; beleggruppe = "ER"; belegtyp = "Eingangsrechnung";
      positionen = [{ bezeichnung: "Spedition / Versand an den Kunden", menge: 1, einzelpreis: netto }];
      loesung = [z("Soll", "7300", netto), z("Soll", "2500", ust), z("Haben", partner.konto, brutto)];
      beleg = erBeleg(partner, positionen, null);
      g = { was: "Versandkosten an den Kunden, Rechnung von " + partner.name + " auf Ziel.",
        konten: "Soll 7300 + 2500, Haben " + partner.konto + ". Nicht 5000.",
        art: "7300 Aufwand (Versand beim Verkauf) → Soll.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer.",
        bg: "ER", warum: "Die Fracht gehört zum Verkauf, nicht zum Wareneinkauf." };
    }

    else if (typId === "E4_paket_20" || typId === "E4_paket_0") {
      const mitUst = typId === "E4_paket_20";
      partner = partnerOhneKonto("Raschfracht Zustelldienst GmbH");
      const gew = mitUst ? r2(10.1 + rng() * 20) : r2(0.5 + rng() * 9.4);
      if (mitUst) setSteuer(nettoIm("netto_eur", 8, 80, 20), 20);
      else setBrutto(betragMitAbstand(rng, basis, 4, 30, 0, vermeide), 0);
      zahlungsweg = "bar"; beleggruppe = "K"; belegtyp = "Kassabeleg";
      positionen = [{ bezeichnung: "Paket " + (mitUst ? "über 10 kg" : "unter 10 kg") + " (" + gew.toFixed(1).replace(".", ",") + " kg)", menge: 1, einzelpreis: mitUst ? netto : brutto }];
      if (mitUst) loesung = [z("Soll", "7310", netto), z("Soll", "2500", ust), z("Haben", "2700", brutto)];
      else loesung = [z("Soll", "7311", brutto), z("Haben", "2700", brutto)];
      beleg = erBeleg(partner, positionen, "Bar bezahlt");
      kasseAm(beleg, zeit(rng), brutto);
      if (!mitUst) {
        beleg.aussteller_zusatz = "Universaldienstbetreiber im Sinne des § 12 PMG (fiktiv)";
        beleg.steuerbefreiung = "Steuerfrei gemäß § 6 Abs. 1 Z 10 lit. b UStG 1994 (Postdienstleistung eines Universaldienstbetreibers)";
        positionen[0].bezeichnung = "Paket Österreich bis 10 kg, " + gew.toFixed(1).replace(".", ",") + " kg (Universaldienst)";
        beleg.positionen = positionen;
      }
      g = { was: "Wir geben ein Paket (" + (mitUst ? "über" : "unter") + " 10 kg) bei Raschfracht auf und zahlen bar.",
        konten: mitUst ? "Soll 7310 + 2500, Haben 2700." : "Soll 7311, Haben 2700; keine Vorsteuer.",
        art: "Paketgebühren sind Aufwand.",
        steuer: mitUst ? ("20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer.") : "Steuerfrei gemäß § 6 Abs. 1 Z 10 lit. b UStG 1994 (Universaldienstbetreiber, fiktiv), keine Vorsteuer.",
        bg: "K", warum: "Das Gewicht entscheidet den Steuersatz eindeutig." };
    }


    else if (typId === "E5_sofortrabatt" || typId === "E5_sofortrabatt_verkauf") {
      const verkauf = typId === "E5_sofortrabatt_verkauf";
      const bereich = v.listenpreis_netto_eur || preisregeln().erAr;
      const kto = verkauf ? pickKonto(["20010", "20020", "20030"]) : pickKonto(["33010", "33020"]);
      partner = partnerVonKonto(kto);
      const posPack = positionFuer(rng, bereich[0], bereich[1], 20, vermeide, wir.wir, verkauf ? null : kto, typId, "Handelsware", { min: bereich[0], max: bereich[1] });
      if (!posPack) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const ware = posPack.ware, posi = posPack.posi;
      const rab = rabattSauber(rng, posi.netto, (v.rabatt_prozent || [5, 15])[0], (v.rabatt_prozent || [5, 15])[1], 20);
      setSteuer(r2(posi.netto - rab.betrag), 20);
      zahlungsweg = "ziel";
      beleggruppe = verkauf ? "AR" : "ER";
      belegtyp = verkauf ? "Ausgangsrechnung" : "Eingangsrechnung";
      positionen = [{ bezeichnung: ware, menge: posi.menge, einzelpreis: posi.einzelpreis }];
      loesung = verkauf
        ? [z("Soll", partner.konto, brutto), z("Haben", "4000", netto), z("Haben", "3500", ust)]
        : [z("Soll", "5000", netto), z("Soll", "2500", ust), z("Haben", partner.konto, brutto)];
      const rabObj = { prozent: rab.prozent, betrag: rab.betrag };
      beleg = erBeleg(verkauf ? wir : partner, positionen, "Zahlbar innerhalb von 30 Tagen ohne Abzug", rabObj);
      if (verkauf) { beleg.aussteller = party(wir); beleg.empfaenger = party(partner); }
      opts._rabatt = rabObj;
      g = { was: (verkauf ? "Warenverkauf" : "Wareneinkauf") + " mit Sofortrabatt " + rab.prozent + " % " + (verkauf ? "an " : "von ") + partner.name + ". Listenpreis " + euro(posi.netto) + ", Rabatt " + euro(rab.betrag) + ".",
        konten: verkauf ? ("Nur Netto nach Rabatt: Soll " + partner.konto + ", Haben 4000 + 3500. Kein Rabattkonto, nie 2000.") : ("Nur Netto nach Rabatt: 5000 + 2500 an " + partner.konto + ". Kein eigenes Rabattkonto."),
        art: "",
        steuer: "20 % vom Netto nach Rabatt " + euro(netto) + " = " + euro(ust) + (verkauf ? " Umsatzsteuer." : " Vorsteuer."),
        bg: beleggruppe, warum: "Der Beleg zeigt Listenpreis und Sofortrabatt; gebucht wird nur der Betrag nach Rabatt." };
    }

    else if (typId === "E5_nachlass_lieferant") {
      const kto = pickKonto(["33010", "33020"]);
      partner = partnerVonKonto(kto);
      const gsR = gutschriftRahmen(rng);
      opts._ursprung_netto = gsR.ursprung;
      setSteuer(betragMitAbstand(rng, basis, gsR.min, Math.min(gsR.max, 2000), 20, vermeide), 20);
      beleggruppe = "ER"; belegtyp = "Gutschrift"; zahlungsweg = "ziel";
      positionen = [{ bezeichnung: "Nachträglicher Preisnachlass / Mängelrabatt", menge: 1, einzelpreis: netto }];
      loesung = [z("Soll", partner.konto, brutto), z("Haben", "5000", netto), z("Haben", "2500", ust)];
      beleg = erBeleg(partner, positionen, "Wird mit der offenen Rechnung über " + euro(gsR.ursprung) + " netto verrechnet");
      g = { was: "Nachträglicher Rabatt vom Lieferanten " + partner.name + " (kleiner als die Ursprungsrechnung über " + euro(gsR.ursprung) + " netto).",
        konten: "Soll " + partner.konto + ", Haben 5000 + 2500.",
        art: "Die Schuld sinkt; Aufwand und Vorsteuer werden korrigiert.",
        steuer: "Steuer wird mitkorrigiert: " + euro(ust) + " Vorsteuer.",
        bg: "ER", warum: "Die Bemessungsgrundlage sinkt." };
    }

    else if (typId === "E5_nachlass_kunde") {
      const kto = pickKonto(["20010", "20020", "20030"]);
      partner = partnerVonKonto(kto);
      const gsR = gutschriftRahmen(rng);
      opts._ursprung_netto = gsR.ursprung;
      setSteuer(betragMitAbstand(rng, basis, gsR.min, Math.min(gsR.max, 2000), 20, vermeide), 20);
      beleggruppe = "AR"; belegtyp = "Gutschrift"; zahlungsweg = "ziel";
      positionen = [{ bezeichnung: "Nachträglicher Preisnachlass (Ware bleibt beim Kunden)", menge: 1, einzelpreis: netto }];
      loesung = [z("Soll", "4400", netto), z("Soll", "3500", ust), z("Haben", partner.konto, brutto)];
      beleg = erBeleg(wir, positionen, "Wird mit der offenen Rechnung über " + euro(gsR.ursprung) + " netto verrechnet");
      beleg.aussteller = party(wir); beleg.empfaenger = party(partner);
      g = { was: "Nachlass an " + partner.name + "; die Ware bleibt beim Kunden (kleiner als die Ursprungsrechnung über " + euro(gsR.ursprung) + " netto).",
        konten: "Soll 4400 + 3500, Haben " + partner.konto + ". Nicht 4000.",
        art: "Erlösberichtigung, keine Rücksendung.",
        steuer: "USt-Korrektur " + euro(ust) + ".",
        bg: "AR", warum: "Weil die Ware bleibt, steht 4400, nicht 4000." };
    }

    else if (typId === "E6_zahlung_lieferant" || typId === "E6_zahlung_kunde") {
      const istLief = typId === "E6_zahlung_lieferant";
      const kto = istLief ? pickKonto(["33010","33020","33030","33040"]) : pickKonto(["20010","20020","20030"]);
      partner = partnerVonKonto(kto);
      brutto = betragMitAbstand(rng, basis, 200, 8000, 0, vermeide);
      netto = brutto; ust = 0; ustSatz = 0;
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(8000 + rng() * 25000);
      const betragAuszug = istLief ? -brutto : brutto;
      const saldoNeu = r2(saldoAlt + betragAuszug);
      positionen = [{ bezeichnung: (istLief ? "Überweisung an " : "Zahlungseingang von ") + partner.name + ", Rechnung", datum: datum, betrag: betragAuszug, valuta: datum }];
      loesung = istLief
        ? [z("Soll", partner.konto, brutto), z("Haben", "2800", brutto)]
        : [z("Soll", "2800", brutto), z("Haben", partner.konto, brutto)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 0, netto: brutto, ust: 0, brutto: brutto, zahlungsbedingungen: "",
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
        saldo_alt: saldoAlt, saldo_neu: saldoNeu
      });
      g = { was: istLief ? ("Wir überweisen an " + partner.name + " den vollen Rechnungsbetrag.") : (partner.name + " zahlt den vollen Rechnungsbetrag auf unser Konto."),
        konten: istLief ? ("Soll " + partner.konto + ", Haben 2800. Nicht 3300.") : ("Soll 2800, Haben " + partner.konto + ". Nicht 2000."),
        art: istLief ? "Die Schuld erlischt (Soll), das Bankguthaben sinkt (Haben)." : "Bank steigt (Soll), die Forderung sinkt (Haben).",
        steuer: "Keine Steuerbuchung. Die Steuer stand schon auf der Rechnung.",
        bg: "B", warum: "Ohne Abzug ändert sich an der Steuer nichts. Abbuchung auf dem Auszug mit Minus." };
    }

    else if (typId === "E7_kunde_kreditkarte" || typId === "E7_kunde_debitkarte") {
      const kredit = typId === "E7_kunde_kreditkarte";
      const kto = pickKonto(["20010", "20020", "20030"]);
      partner = partnerVonKonto(kto);
      const nMinK = kredit ? 50 : 20, nMaxK = kredit ? 2000 : 800;
      const posPackK = positionFuer(rng, nMinK, nMaxK, 20, vermeide, wir.wir, null, typId, "Handelsware", { min: nMinK, max: nMaxK });
      if (!posPackK) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const ware = posPackK.ware, posiK = posPackK.posi;
      setSteuer(posiK.netto, 20);
      zahlungsweg = kredit ? "kreditkarte" : "debitkarte";
      beleggruppe = "S"; belegtyp = "Kartenbeleg";
      const sollKto = kredit ? "2880" : "2885";
      positionen = [{ bezeichnung: ware, menge: posiK.menge, einzelpreis: posiK.einzelpreis }];
      loesung = [z("Soll", sollKto, brutto), z("Haben", "4000", netto), z("Haben", "3500", ust)];
      beleg = erBeleg(wir, positionen, (kredit ? "Kreditkarte" : "Debitkarte") + " **** " + randInt(rng, 1000, 9999));
      beleg.aussteller = party(wir); beleg.empfaenger = party(partner);
      kasseAm(beleg, zeit(rng), brutto);
      g = { was: "Wir verkaufen an " + partner.name + "; der Kunde zahlt mit " + (kredit ? "Kreditkarte." : "Debitkarte."),
        konten: "Soll " + sollKto + ", Haben 4000 + 3500. Nicht 2700.",
        art: sollKto + " Aktiv, Zugang → Soll. Erlös und USt im Haben.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Umsatzsteuer.",
        bg: "S", warum: "Das Geld liegt nicht in der Kassa; die Kartengesellschaft schuldet uns den Bruttobetrag." };
    }

    else if (typId === "E7_karteneingang_mit_gebuehr" || typId === "E7_karteneingang_ohne_gebuehr") {
      const mit = typId === "E7_karteneingang_mit_gebuehr";
      const umsatz = betragMitAbstand(rng, basis, 50, 2000, 0, vermeide);
      const gebNetto = mit ? betragMitAbstand(rng, null, 2, 25, 20, []) : 0;
      const gebUst = mit ? ustVonNetto(gebNetto, 20) : 0;
      const gebBrutto = r2(gebNetto + gebUst);
      const bankEingang = r2(umsatz - gebBrutto);
      ustSatz = mit ? 20 : 0; netto = mit ? gebNetto : 0; ust = gebUst; brutto = umsatz;
      const karteArt = (opts.karte || pick(rng, ["kredit", "debit"]));
      const karteHaben = karteArt === "kredit" ? "2880" : "2885";
      const karteName = karteArt === "kredit" ? "Kreditkarte" : "Debitkarte";
      partner = partnerOhneKonto(bankFuer(wir.name, rng).name);
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(5000 + rng() * 20000);
      const posBez = mit
        ? ("Karteneingang " + karteName)
        : ("Karteneingang " + karteName + ", ohne Gebühr in diesem Satz");
      const pos = [{ bezeichnung: posBez, datum: datum, betrag: umsatz, valuta: datum }];
      if (mit) pos.push({ bezeichnung: "Kartengebühr inkl. 20 % USt", datum: datum, betrag: -gebBrutto, valuta: datum });
      const saldoNeu = r2(saldoAlt + umsatz - (mit ? gebBrutto : 0));
      loesung = mit
        ? [z("Soll", "2800", bankEingang), z("Soll", "7792", gebNetto), z("Soll", "2500", gebUst), z("Haben", karteHaben, umsatz)]
        : [z("Soll", "2800", umsatz), z("Haben", karteHaben, umsatz)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: pos,
        ust_satz: mit ? 20 : 0, netto: mit ? gebNetto : umsatz, ust: gebUst, brutto: bankEingang,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name }, saldo_alt: saldoAlt, saldo_neu: saldoNeu
      });
      opts._karte = karteName;
      if (mit) {
        g = { was: "Karteneingang " + karteName + " " + euro(umsatz) + ", abzüglich Gebühr.",
          konten: "Soll 2800 + 7792 + 2500, Haben " + karteHaben + ".",
          art: "",
          steuer: "20 % von " + euro(gebNetto) + " = " + euro(gebUst) + " Vorsteuer auf die Gebühr.",
          bg: "B", warum: "Trainer-Vereinfachung: Gebühr mit Vorsteuer (7792 + 2500)." };
      } else {
        g = { was: "Karteneingang " + karteName + " " + euro(umsatz) + ", ohne Gebühr in diesem Satz.",
          konten: "Soll 2800, Haben " + karteHaben + ".",
          art: "",
          steuer: "Keine Steuer in diesem Satz.",
          bg: "B", warum: "Der volle Kartenumsatz kommt auf die Bank; eine Gebühr steht in diesem Satz nicht." };
      }
    }

    else if (typId === "E7_eigene_firmenkarte") {
      const debit = (opts.karte || pick(rng, (v.karte || ["kredit", "debit"]))) === "debit";
      const kto = pickKonto(["33010", "33020"]);
      partner = partnerVonKonto(kto);
      const posPackF = positionFuer(rng, 20, 2000, 20, vermeide, wir.wir, kto, typId, "Handelsware", { min: 20, max: 2000 });
      if (!posPackF) return { ok: false, fehler: "Keine gültige Position für " + typId };
      const ware = posPackF.ware, posiF = posPackF.posi;
      setSteuer(posiF.netto, 20);
      zahlungsweg = debit ? "debitkarte" : "kreditkarte";
      beleggruppe = "S"; belegtyp = "Kartenbeleg";
      const habenKto = debit ? "3190" : "3180";
      positionen = [{ bezeichnung: ware, menge: posiF.menge, einzelpreis: posiF.einzelpreis }];
      loesung = [z("Soll", "5000", netto), z("Soll", "2500", ust), z("Haben", habenKto, brutto)];
      beleg = erBeleg(partner, positionen, (debit ? "Firmen-Debitkarte" : "Firmen-Kreditkarte"));
      kasseAm(beleg, zeit(rng), brutto);
      g = { was: "Wir kaufen mit der Firmen-" + (debit ? "Debitkarte" : "Kreditkarte") + " bei " + partner.name + ".",
        konten: "Soll 5000 + 2500, Haben " + habenKto + ". Nicht 2700.",
        art: "Aufwand und Vorsteuer im Soll; Verbindlichkeit gegenüber dem Kartenunternehmen im Haben.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer.",
        bg: "S", warum: "Späterer Ausgleich: Soll " + habenKto + ", Haben 2800 (eigener Satz)." };
    }

    else if (typId === "E8_lieferantenskonto") {
      const kto = pickKonto(["33010", "33020"]);
      partner = partnerVonKonto(kto);
      const reBrutto = betragMitAbstand(rng, basis, 240, 6000, 20, vermeide);
      const skP = randInt(rng, 1, 3); opts._skonto_prozent = skP;
      const skBrutto = r2(reBrutto * skP / 100);
      const skNetto = r2(skBrutto / 1.2);
      const skUst = r2(skBrutto - skNetto);
      const zahlung = r2(reBrutto - skBrutto);
      brutto = reBrutto; netto = skNetto; ust = skUst; ustSatz = 20;
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(8000 + rng() * 20000);
      const saldoNeu = r2(saldoAlt - zahlung);
      const frist = plusTage(datum, -randInt(rng, 1, 8));
      positionen = [
        { bezeichnung: "Überweisung an " + partner.name + ", Rechnung, " + skP + " % Skonto (Frist bis " + plusTage(datum, 0) + ", Zahlung in der Frist)", datum: datum, betrag: -zahlung, valuta: datum }
      ];
      loesung = [z("Soll", partner.konto, reBrutto), z("Haben", "5880", skNetto), z("Haben", "2500", skUst), z("Haben", "2800", zahlung)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 20, netto: skNetto, ust: skUst, brutto: zahlung,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name }, saldo_alt: saldoAlt, saldo_neu: saldoNeu
      });
      g = { was: "Wir zahlen die Rechnung von " + partner.name + " in der Skontofrist (" + skP + " %).",
        konten: "Soll " + partner.konto + " (voller Betrag), Haben 5880 + 2500 + 2800.",
        art: "Die Schuld erlischt in voller Höhe; Skonto mindert den Aufwand; die Vorsteuer wird korrigiert; die Bank sinkt um den gekürzten Betrag.",
        steuer: "Skonto vom Brutto " + euro(reBrutto) + " × " + skP + " % = " + euro(skBrutto) + ", davon / 1,20 → Netto " + euro(skNetto) + ", VSt " + euro(skUst) + ".",
        bg: "B", warum: "Skonto nur weil die Frist gehalten wird. Skonto vom Brutto, bei 20 % durch 1,20 teilen." };
    }

    else if (typId === "E9_kundenskonto") {
      const kto = pickKonto(["20010", "20020", "20030"]);
      partner = partnerVonKonto(kto);
      const reBrutto = betragMitAbstand(rng, basis, 240, 6000, 20, vermeide);
      const skP = randInt(rng, 1, 3); opts._skonto_prozent = skP;
      const skBrutto = r2(reBrutto * skP / 100);
      const skNetto = r2(skBrutto / 1.2);
      const skUst = r2(skBrutto - skNetto);
      const eingang = r2(reBrutto - skBrutto);
      brutto = reBrutto; netto = skNetto; ust = skUst; ustSatz = 20;
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(5000 + rng() * 20000);
      const saldoNeu = r2(saldoAlt + eingang);
      positionen = [{ bezeichnung: "Zahlungseingang von " + partner.name + ", " + skP + " % Skonto (Zahlung in der Frist)", datum: datum, betrag: eingang, valuta: datum }];
      loesung = [z("Soll", "2800", eingang), z("Soll", "4410", skNetto), z("Soll", "3500", skUst), z("Haben", partner.konto, reBrutto)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 20, netto: skNetto, ust: skUst, brutto: eingang,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name }, saldo_alt: saldoAlt, saldo_neu: saldoNeu
      });
      g = { was: partner.name + " zahlt in der Skontofrist mit " + skP + " % Skonto.",
        konten: "Soll 2800 + 4410 + 3500, Haben " + partner.konto + " (voller Betrag).",
        art: "Bank steigt um den gekürzten Eingang; Skonto und USt-Korrektur im Soll; die Forderung erlischt vollständig.",
        steuer: "Skonto vom Brutto / 1,20: Netto " + euro(skNetto) + ", USt " + euro(skUst) + ".",
        bg: "B", warum: "Wir bekommen weniger Entgelt, die Bemessungsgrundlage sinkt." };
    }


    else if (typId === "E10_mahnung_kunde") {
      const art = pick(rng, v.art || ["mahnspesen", "verzugszinsen"]);
      const kto = pickKonto(["20010", "20020", "20030"]);
      partner = partnerVonKonto(kto);
      beleggruppe = "AR"; belegtyp = "Mahnung"; zahlungsweg = "ziel";
      ust = 0; ustSatz = 0;
      const bank = bankFuer(wir.name, rng);
      const reDatum = plusTage(datum, -45);
      const reFaellig = plusTage(datum, -30);
      const reNr = neueNummer("AR", rng, opts, wir);
      let faelligAm = plusTage(datum, 7);
      if (parseDatum(faelligAm) > parseDatum("30.11.2026")) faelligAm = "30.11.2026";
      opts._mahnung_art = art;
      if (art === "beide") {
        const spesen = betragMitAbstand(rng, basis, 5, 40, 0, vermeide);
        const zinsen = betragMitAbstand(rng, basis, 5, 80, 0, (vermeide || []).concat([spesen]));
        const sum = r2(spesen + zinsen);
        brutto = sum; netto = sum;
        positionen = [{ bezeichnung: "Mahnspesen", betrag: spesen }, { bezeichnung: "Verzugszinsen", betrag: zinsen }];
        loesung = [z("Soll", partner.konto, sum), z("Haben", "4890", spesen), z("Haben", "8055", zinsen)];
        beleg = a4Beleg("Mahnung", wir, partner, {
          nummer: neueNummer("M", rng, opts, wir), datum: datum,
          positionen: positionen, ust_satz: 0, netto: sum, ust: 0, brutto: sum,
          zahlungsbedingungen: "Bitte überweisen Sie den offenen Betrag samt Spesen und Zinsen innerhalb von 7 Tagen.",
          faellig_am: faelligAm,
          bezug: "2. Mahnung: Rechnung " + reNr + " vom " + reDatum + " über " + euro(r2(800 + rng() * 3200)) + ", fällig am " + reFaellig,
          konto: { iban: bank.iban, bic: bank.bic }
        });
        beleg.aussteller = party(wir); beleg.empfaenger = party(partner);
        text = partner.name + " zahlt sehr spät. Mit der Mahnung verrechnen wir dem Kunden " + euro(spesen) + " Mahnspesen und " + euro(zinsen) + " Verzugszinsen.";
        g = { was: "Wir mahnen " + partner.name + " (Mahnspesen und Verzugszinsen).",
          konten: "Soll " + partner.konto + " (" + euro(sum) + "), Haben 4890 (" + euro(spesen) + ") und 8055 (" + euro(zinsen) + ").",
          art: "Forderung steigt um beide Beträge, zwei Erträge im Haben.",
          steuer: "Keine USt (weder Mahnspesen noch Verzugszinsen). Summe = Brutto.",
          bg: "AR", warum: "Im Trainer nicht steuerbar." };
      } else {
        const bet = betragMitAbstand(rng, basis, 5, art === "verzugszinsen" ? 80 : 40, 0, vermeide);
        brutto = bet; netto = bet;
        const habenKto = art === "verzugszinsen" ? "8055" : "4890";
        positionen = [{ bezeichnung: art === "verzugszinsen" ? "Verzugszinsen" : "Mahnspesen", betrag: bet }];
        loesung = [z("Soll", partner.konto, bet), z("Haben", habenKto, bet)];
        beleg = a4Beleg("Mahnung", wir, partner, {
          nummer: neueNummer("M", rng, opts, wir), datum: datum,
          positionen: positionen, ust_satz: 0, netto: bet, ust: 0, brutto: bet,
          zahlungsbedingungen: "Sofort fällig, ohne Umsatzsteuer.",
          faellig_am: plusTage(datum, 8), bezug: "Offene Rechnung"
        });
        beleg.aussteller = party(wir); beleg.empfaenger = party(partner);
        g = { was: "Wir mahnen " + partner.name + " (" + (art === "verzugszinsen" ? "Verzugszinsen" : "Mahnspesen") + ").",
          konten: "Soll " + partner.konto + ", Haben " + habenKto + ".",
          art: "Forderung steigt (Soll), Ertrag im Haben.",
          steuer: "Keine USt (weder Mahnspesen noch Verzugszinsen).",
          bg: "AR", warum: "Im Trainer nicht steuerbar." };
      }
    }

    else if (typId === "E10_mahnung_lieferant") {
      const art = pick(rng, v.art || ["mahnspesen", "verzugszinsen"]);
      const kto = pickKonto(["33010", "33020", "33030", "33040"]);
      partner = partnerVonKonto(kto);
      beleggruppe = "ER"; belegtyp = "Mahnung"; zahlungsweg = "ziel";
      ust = 0; ustSatz = 0;
      const bank = bankFuer(partner && partner.name ? partner.name : wir.name, rng);
      const reDatum = plusTage(datum, -45);
      const reFaellig = plusTage(datum, -30);
      const reNr = neueNummer("ER", rng, opts, partner || wir);
      let faelligAm = plusTage(datum, 7);
      if (parseDatum(faelligAm) > parseDatum("30.11.2026")) faelligAm = "30.11.2026";
      opts._mahnung_art = art;
      if (art === "beide") {
        const spesen = betragMitAbstand(rng, basis, 5, 40, 0, vermeide);
        const zinsen = betragMitAbstand(rng, basis, 5, 80, 0, (vermeide || []).concat([spesen]));
        const sum = r2(spesen + zinsen);
        brutto = sum; netto = sum;
        positionen = [{ bezeichnung: "Mahnspesen", betrag: spesen }, { bezeichnung: "Verzugszinsen", betrag: zinsen }];
        loesung = [z("Soll", "8321", spesen), z("Soll", "8320", zinsen), z("Haben", partner.konto, sum)];
        beleg = a4Beleg("Mahnung", partner, wir, {
          nummer: neueNummer("M", rng, opts, wir), datum: datum,
          positionen: positionen, ust_satz: 0, netto: sum, ust: 0, brutto: sum,
          zahlungsbedingungen: "Zahlbar sofort ohne Abzug",
          faellig_am: faelligAm,
          bezug: "2. Mahnung: Rechnung " + reNr + " vom " + reDatum + ", fällig am " + reFaellig,
          konto: { iban: bank.iban, bic: bank.bic }
        });
        text = partner.name + " verrechnet uns " + euro(spesen) + " Mahnspesen und " + euro(zinsen) + " Verzugszinsen.";
        g = { was: partner.name + " mahnt uns (Mahnspesen und Verzugszinsen).",
          konten: "Soll 8321 (" + euro(spesen) + ") und 8320 (" + euro(zinsen) + "), Haben " + partner.konto + " (" + euro(sum) + ").",
          art: "Zwei Aufwände im Soll, Schuld steigt um die Summe im Haben.",
          steuer: "Keine USt. Summe = Brutto.",
          bg: "ER", warum: "8321 Mahnspesen und 8320 Verzugszinsen; kein 3500." };
      } else {
        const bet = betragMitAbstand(rng, basis, 5, art === "verzugszinsen" ? 80 : 40, 0, vermeide);
        brutto = bet; netto = bet;
        const sollKto = art === "verzugszinsen" ? "8320" : "8321";
        positionen = [{ bezeichnung: art === "verzugszinsen" ? "Verzugszinsen" : "Mahnspesen", betrag: bet }];
        loesung = [z("Soll", sollKto, bet), z("Haben", partner.konto, bet)];
        beleg = a4Beleg("Mahnung", partner, wir, {
          nummer: neueNummer("M", rng, opts, wir), datum: datum,
          positionen: positionen, ust_satz: 0, netto: bet, ust: 0, brutto: bet,
          zahlungsbedingungen: "Sofort fällig, ohne Umsatzsteuer.",
          faellig_am: plusTage(datum, 8), bezug: "Offene Rechnung"
        });
        g = { was: partner.name + " mahnt uns (" + (art === "verzugszinsen" ? "Verzugszinsen" : "Mahnspesen") + ").",
          konten: "Soll " + sollKto + ", Haben " + partner.konto + ".",
          art: "Aufwand im Soll, Schuld steigt im Haben.",
          steuer: "Keine USt.",
          bg: "ER", warum: "8321 Mahnspesen bzw. 8320 Verzugszinsen; kein 3500." };
      }
    }

    else if (typId === "E11_bareinzahlung" || typId === "E11_barbehebung") {
      const ein = typId === "E11_bareinzahlung";
      const bet = betragMitAbstand(rng, basis, ein ? 100 : 50, ein ? 3000 : 1500, 0, vermeide);
      brutto = bet; netto = bet; ust = 0; ustSatz = 0;
      partner = partnerOhneKonto(bankFuer(wir.name, rng).name);
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(4000 + rng() * 20000);
      haelfte = haelfte === "K" || haelfte === "B" ? haelfte : pick(rng, ["K", "B"]);
      beleggruppe = haelfte;
      belegtyp = haelfte === "B" ? "Kontoauszug" : "Kassabeleg";
      zahlungsweg = haelfte === "B" ? "bank" : "bar";
      const kBeleg = a4Beleg("Kassabeleg", wir, wir, {
        nummer: neueNummer("K", rng, opts, wir), datum: datum,
        positionen: [{ bezeichnung: ein ? "Bareinzahlung auf das Bankkonto (Tageslosung)" : "Barbehebung Wechselgeld für die Kassa", menge: 1, einzelpreis: bet }],
        ust_satz: 0, netto: bet, ust: 0, brutto: bet, zahlungsbedingungen: "Bar"
      });
      kasseAm(kBeleg, zeit(rng), bet);
      const bewegung = ein ? bet : -bet;
      const bBeleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum,
        positionen: [{ bezeichnung: ein ? "Bareinzahlung" : "Barbehebung", datum: datum, betrag: bewegung, valuta: datum }],
        ust_satz: 0, netto: bet, ust: 0, brutto: bet,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
        saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt + bewegung)
      });
      const lsK = ein ? [z("Soll", "2870", bet), z("Haben", "2700", bet)] : [z("Soll", "2700", bet), z("Haben", "2870", bet)];
      const lsB = ein ? [z("Soll", "2800", bet), z("Haben", "2870", bet)] : [z("Soll", "2870", bet), z("Haben", "2800", bet)];
      loesung = haelfte === "B" ? lsB : lsK;
      beleg = haelfte === "B" ? bBeleg : kBeleg;
      zusatzbeleg = null;
      opts._e11 = { bet: bet, lsK: lsK, lsB: lsB, kBeleg: kBeleg, bBeleg: bBeleg };
      g = { was: ein ? ("Wir zahlen " + euro(bet) + " aus der Kassa auf das Bankkonto ein (Hälfte " + haelfte + ").") : ("Wir heben " + euro(bet) + " für die Kassa ab (Hälfte " + haelfte + ")."),
        konten: haelfte === "K" ? (ein ? "Soll 2870, Haben 2700." : "Soll 2700, Haben 2870.") : (ein ? "Soll 2800, Haben 2870." : "Soll 2870, Haben 2800.") + " Immer über 2870, nie direkt 2800 an 2700.",
        art: "",
        steuer: "Keine Steuer.",
        bg: haelfte, warum: "Ein Fall = ein Beleg und ein Satz (Hälfte " + haelfte + "), wie im Trainer." };
    }

    else if (typId === "E12_habenzinsen_kest") {
      const hz = betragMitAbstand(rng, basis, 16, 160, 0, vermeide);
      const kest = r2(hz * 0.25);
      const nettoBank = r2(hz - kest);
      brutto = hz; netto = nettoBank; ust = 0; ustSatz = 0;
      partner = partnerOhneKonto(bankFuer(wir.name, rng).name);
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Bankabrechnung";
      const bank = bankFuer(wir.name, rng);
      positionen = [
        { bezeichnung: "Habenzinsen", betrag: hz },
        { bezeichnung: "Kapitalertragsteuer (KESt) 25 %", betrag: -kest }
      ];
      loesung = [z("Soll", "2800", nettoBank), z("Soll", "9600", kest), z("Haben", "8050", hz)];
      beleg = a4Beleg("Bankabrechnung", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("KA", rng, opts, wir), datum: datum,
        positionen: positionen, ust_satz: 0, netto: nettoBank, ust: 0, brutto: nettoBank,
        zahlungsbedingungen: "Gutschrift auf Ihr Konto", zeitraum: "Quartal",
        konto: { iban: bank.iban, bic: bank.bic }
      });
      g = { was: "Bankabrechnung: Habenzinsen " + euro(hz) + ", KESt 25 % = " + euro(kest) + ".",
        konten: "Soll 2800 (netto) + 9600 (KESt), Haben 8050 (Zinsen brutto).",
        art: "Zinsertrag im Haben; KESt ist Privatsteuer (9600); die Bank steigt nur um den Nettobetrag.",
        steuer: "KESt genau 25 % von " + euro(hz) + " = " + euro(kest) + ". Keine USt.",
        bg: "B", warum: "Die KESt ist eine Steuer des Inhabers, keine Betriebssteuer." };
    }

    else if (typId === "E12_sollzinsen" || typId === "E12_bankspesen") {
      const spesen = typId === "E12_bankspesen";
      const bet = betragMitAbstand(rng, basis, spesen ? 2 : 10, spesen ? 40 : 200, 0, vermeide);
      brutto = bet; netto = bet; ust = 0; ustSatz = 0;
      const sollKto = spesen ? "7790" : "8310";
      partner = partnerOhneKonto(bankFuer(wir.name, rng).name);
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(3000 + rng() * 15000);
      positionen = [{ bezeichnung: spesen ? "Kontoführung / Bankspesen" : "Sollzinsen", datum: datum, betrag: -bet, valuta: datum }];
      loesung = [z("Soll", sollKto, bet), z("Haben", "2800", bet)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 0, netto: bet, ust: 0, brutto: bet,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
        saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - bet)
      });
      g = { was: spesen ? ("Bankspesen " + euro(bet) + ".") : ("Sollzinsen " + euro(bet) + "."),
        konten: "Soll " + sollKto + ", Haben 2800. Keine Vorsteuer.",
        art: "Aufwand im Soll, Bank sinkt im Haben.",
        steuer: "Keine VSt (Bankspesen und Sollzinsen ohne Vorsteuer).",
        bg: "B", warum: spesen ? "7790 ohne Vorsteuer." : "8310 Zinsenaufwand für Bankkredite." };
    }

    else if (typId === "E13_grundsteuer" || typId === "E13_kammerumlage" || typId === "E13_einkommensteuer" || typId === "E13_ust_zahllast") {
      const map = {
        E13_grundsteuer: { kto: "7100", min: 80, max: 400, typ: "Zahlungsaufforderung", wer: "Stadt Wien – Rechnungs- und Abgabenwesen (MA 6)", titel: "Grundsteuer für das Betriebsgrundstück" },
        E13_kammerumlage: { kto: "7780", min: 40, max: 200, typ: "Kontoauszug", wer: null, titel: "Kammerumlage" },
        E13_einkommensteuer: { kto: "9600", min: 400, max: 4000, typ: "Kontoauszug", wer: null, titel: "Einkommensteuer (Vorauszahlung)" },
        E13_ust_zahllast: { kto: "3520", min: 200, max: 5000, typ: "Kontoauszug", wer: null, titel: "USt-Zahllast" }
      };
      const M = map[typId];
      const bet = betragMitAbstand(rng, basis, M.min, M.max, 0, vermeide);
      brutto = bet; netto = bet; ust = 0; ustSatz = 0;
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = M.typ;
      const bank = bankFuer(wir.name, rng);
      partner = M.wer ? partnerOhneKonto(M.wer) : partnerOhneKonto(bank.name);
      loesung = [z("Soll", M.kto, bet), z("Haben", "2800", bet)];
      if (M.typ === "Zahlungsaufforderung") {
        beleg = a4Beleg("Zahlungsaufforderung", partner, wir, {
          nummer: neueNummer("GRST", rng, opts, wir), datum: datum,
          positionen: [{ bezeichnung: M.titel, betrag: bet }],
          ust_satz: 0, netto: bet, ust: 0, brutto: bet,
          zahlungsbedingungen: "SEPA-Lastschrift: Der Betrag wird von Ihrem Konto abgebucht.",
          faellig_am: plusTage(datum, 20), zeitraum: "Quartal"
        });
      } else {
        const saldoAlt = r2(4000 + rng() * 20000);
        beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
          nummer: neueNummer("AUS", rng, opts, wir), datum: datum,
          positionen: [{ bezeichnung: M.titel, datum: datum, betrag: -bet, valuta: datum }],
          ust_satz: 0, netto: bet, ust: 0, brutto: bet,
          konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
          saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - bet)
        });
      }
      g = { was: M.titel + " " + euro(bet) + ", Zahlung per Bank.",
        konten: "Soll " + M.kto + " " + kontoName(M.kto) + ", Haben 2800.",
        art: typId === "E13_einkommensteuer" ? "Privatsteuer, nicht Aufwand." : (typId === "E13_ust_zahllast" ? "Die Zahllast wird beglichen." : "Betriebssteuer / Aufwand im Soll."),
        steuer: "Keine USt in diesem Satz.",
        bg: "B", warum: typId === "E13_grundsteuer" ? "7100 ist Betriebssteuer (Aufwand)." : (typId === "E13_einkommensteuer" ? "ESt steht auf 9600 Privat." : "laut Kontenplan.") };
    }

    else if (typId === "E14_pkw_betrieb" || typId === "E14_lkw_betrieb") {
      const pkw = typId === "E14_pkw_betrieb";
      if (pkw) setBrutto(betragMitAbstand(rng, basis, 36, 240, 0, vermeide), 0);
      else setSteuer(nettoIm("netto_eur", 50, 400, 20), 20);
      partner = partnerOhneKonto(pick(rng, ["Tankhain Tankstellen GmbH", "Glutader Energiehandel GmbH"]));
      zahlungsweg = "debitkarte"; beleggruppe = "S"; belegtyp = "Kartenbeleg";
      if (twist && v.zahlungsweg_twist) { zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug"; twistName = "Bank statt Karte"; }
      const habenKto = zahlungsweg === "bank" ? "2800" : "3190";
      if (pkw) {
        loesung = [z("Soll", "7320", brutto), z("Haben", habenKto, brutto)];
        positionen = [{ bezeichnung: "Treibstoff Pkw (Benzin/Diesel), nicht Elektro", menge: 1, einzelpreis: brutto }];
      } else {
        loesung = [z("Soll", "7330", netto), z("Soll", "2500", ust), z("Haben", habenKto, brutto)];
        positionen = [{ bezeichnung: "Treibstoff Lkw", menge: 1, einzelpreis: netto }];
      }
      if (beleggruppe === "S") {
        beleg = erBeleg(partner, positionen, "Firmen-Debitkarte");
        kasseAm(beleg, zeit(rng), brutto);
      } else {
        const bank = bankFuer(wir.name, rng);
        const saldoAlt = r2(3000 + rng() * 12000);
        beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
          nummer: neueNummer("AUS", rng, opts, wir), datum: datum,
          positionen: [{ bezeichnung: "Tankung " + partner.name, datum: datum, betrag: -brutto, valuta: datum }],
          ust_satz: pkw ? 0 : 20, netto: pkw ? brutto : netto, ust: ust, brutto: brutto,
          konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
          saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - brutto)
        });
      }
      g = { was: (pkw ? "Pkw (Benzin/Diesel)" : "Lkw") + " tanken bei " + partner.name + ", Zahlung " + (zahlungsweg === "bank" ? "per Bank." : "mit Firmen-Debitkarte."),
        konten: pkw ? ("Soll 7320 brutto, Haben " + habenKto + ". Keine Vorsteuer.") : ("Soll 7330 + 2500, Haben " + habenKto + "."),
        art: "Betriebsaufwand im Soll.",
        steuer: pkw ? "Kein Vorsteuerabzug beim Benzin/Diesel-Pkw; der Bruttobetrag steht auf 7320." : ("20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer (Lkw)."),
        bg: beleggruppe, warum: "Nicht Elektro, keine NoVA. Karte ist Beleggruppe S, nicht K." };
    }

    else if (typId === "E14_versicherung") {
      const lkw = rng() < 0.5;
      const bet = betragMitAbstand(rng, basis, 200, 1800, 0, vermeide);
      brutto = bet; netto = bet; ust = 0; ustSatz = 0;
      const sollKto = lkw ? "7330" : "7320";
      partner = partnerOhneKonto("Saumland Bank AG");
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(4000 + rng() * 15000);
      positionen = [{ bezeichnung: "Kfz-Versicherung " + (lkw ? "Lkw" : "Pkw (Benzin/Diesel, nicht Elektro)") + " (ohne USt, mot. VSt)", datum: datum, betrag: -bet, valuta: datum }];
      loesung = [z("Soll", sollKto, bet), z("Haben", "2800", bet)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 0, netto: bet, ust: 0, brutto: bet,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
        saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - bet)
      });
      g = { was: "Kfz-Versicherung " + (lkw ? "Lkw" : "Pkw") + " " + euro(bet) + ", Zahlung per Bank.",
        konten: "Soll " + sollKto + " brutto, Haben 2800. Keine Vorsteuer.",
        art: "Betriebsaufwand im Soll.",
        steuer: "Versicherung mit mot. VSt: keine Vorsteuer.",
        bg: "B", warum: "Nicht Elektro." };
    }

    else if (typId === "E15_lkw_kauf") {
      setSteuer(nettoIm("netto_eur", 20000, 60000, 20), 20);
      partner = partnerOhneKonto("Autohaus Spurweite GmbH");
      zahlungsweg = "bank"; beleggruppe = "ER"; belegtyp = "Eingangsrechnung";
      positionen = [{ bezeichnung: "Klein-Lkw Kastenwagen 3,5 t, neu", menge: 1, einzelpreis: netto }];
      loesung = [z("Soll", "0640", netto), z("Soll", "2500", ust), z("Haben", "2800", brutto)];
      beleg = erBeleg(partner, positionen, "Sofort per Bank überwiesen");
      g = { was: "Wir kaufen einen eindeutigen Lkw bei " + partner.name + " und überweisen.",
        konten: "Soll 0640 + 2500, Haben 2800.",
        art: "Anlagezugang netto, Vorsteuer abziehbar, Bank sinkt um den Bruttobetrag.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer (Lkw).",
        bg: "ER", warum: "Nur Lkw-Kauf ist erlaubt; kein Pkw, keine NoVA, kein Elektro, keine Anmeldekosten, keine GWG-Nähe." };
    }

    else if (typId === "E16_material_verbrauch") {
      const aufw = pick(rng, v.konto_aufwand || ["5340", "5450", "7240", "7280", "7600"]);
      const names = { "5340": "Verpackungsmaterial", "5450": "Reinigungsmaterial", "7240": "Heizöl", "7280": "feste Brennstoffe", "7600": "Büromaterial" };
      setSteuer(nettoIm("netto_eur", 15, 600, 20), 20);
      const ktoP = pickKonto(["33050"]);
      partner = partnerVonKonto(ktoP) || partnerOhneKonto("Kammerstapel Großhandel GmbH");
      zahlungsweg = "ziel"; beleggruppe = "ER"; belegtyp = "Eingangsrechnung";
      let habenKto = partner.konto || "33050";
      if (twist && v.zahlungsweg_twist) {
        const wahl = pick(rng, ["bar", "karte", "bank"]);
        if (wahl === "bar") { zahlungsweg = "bar"; beleggruppe = "K"; belegtyp = "Kassabeleg"; habenKto = "2700"; twistName = "bar"; }
        else if (wahl === "karte") { zahlungsweg = "debitkarte"; beleggruppe = "S"; belegtyp = "Kartenbeleg"; habenKto = "3190"; twistName = "Karte"; }
        else { zahlungsweg = "bank"; beleggruppe = "B"; habenKto = "2800"; twistName = "Bank"; }
      }
      positionen = [{ bezeichnung: names[aufw] || "Sonstiges Material (Eigenverbrauch, nicht zum Weiterverkauf)", menge: 1, einzelpreis: netto }];
      loesung = [z("Soll", aufw, netto), z("Soll", "2500", ust), z("Haben", habenKto, brutto)];
      if (beleggruppe === "B") {
        const bank = bankFuer(wir.name, rng);
        const saldoAlt = r2(2000 + rng() * 10000);
        beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
          nummer: neueNummer("AUS", rng, opts, wir), datum: datum,
          positionen: [{ bezeichnung: "Kauf " + (names[aufw] || "Material") + " " + partner.name, datum: datum, betrag: -brutto, valuta: datum }],
          ust_satz: 20, netto: netto, ust: ust, brutto: brutto,
          konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
          saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - brutto)
        });
      } else {
        beleg = erBeleg(partner, positionen, null);
        if (beleggruppe === "K" || beleggruppe === "S") kasseAm(beleg, zeit(rng), brutto);
      }
      g = { was: "Kauf von " + (names[aufw] || "Material") + " zum eigenen Verbrauch bei " + partner.name + ".",
        konten: "Soll " + aufw + " + 2500, Haben " + habenKto + ". (Weiterverkauf wäre 5000.)",
        art: "Sofort Aufwand; die Inventur (E 17) korrigiert später den Bestand.",
        steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer.",
        bg: beleggruppe, warum: "Aufwandsorientiert gebucht." };
    }

    else if (typId === "E17_inventur") {
      const paare = [
        { mat: "Verpackung", vorrat: "1340", aufw: "5340", bez: "Verpackungsmaterial" },
        { mat: "Heizöl", vorrat: "1360", aufw: "7240", bez: "Heizöl extra leicht im Tank, Liter" },
        { mat: "feste Brennstoffe", vorrat: "1364", aufw: "7280", bez: "feste Brennstoffe" },
        { mat: "Reinigung", vorrat: "1370", aufw: "5450", bez: "Reinigungsmaterial" },
        { mat: "Büromaterial", vorrat: "1390", aufw: "7600", bez: "Büromaterial" }
      ];
      const pa = pick(rng, paare);
      let anfang = betragMitAbstand(rng, basis, 100, 3000, 0, vermeide);
      let ende = betragMitAbstand(rng, anfang, 100, 3000, 0, [anfang, r2(anfang * 2), r2(anfang / 2)]);
      if (cents(anfang) === cents(ende)) ende = r2(anfang + (rng() < 0.5 ? 200 : -200));
      if (ende < 100) ende = r2(anfang + 150);
      const diff = r2(ende - anfang);
      const vermehrung = diff > 0;
      const bet = Math.abs(diff);
      brutto = bet; netto = bet; ust = 0; ustSatz = 0;
      partner = { name: wir.name, adresse: wir.adresse, uid: wir.uid, konto: null };
      beleggruppe = "ohne"; belegtyp = "Inventurliste (Anfangs- und Endbestand)"; zahlungsweg = "ziel";
      if (vermehrung) loesung = [z("Soll", pa.vorrat, bet), z("Haben", pa.aufw, bet)];
      else loesung = [z("Soll", pa.aufw, bet), z("Haben", pa.vorrat, bet)];
      function invListe(nr, dat, kenn, symbol, summe, sumBez) {
        return {
          typ: "Inventurliste", aussteller: party(wir), empfaenger: party(wir),
          nummer: nr, datum: dat, materialart: pa.mat,
          positionen: [{ bezeichnung: pa.bez, menge: 1, einzelpreis: summe }],
          aufgenommen_von: "Inventurteam " + wir.name,
          kennzeichnung: kenn, symbol: symbol,
          summe: { bezeichnung: sumBez, betrag: summe },
          endbestand: kenn === "ENDBESTAND" ? { datum: dat, betrag: summe } : undefined
        };
      }
      beleg = invListe(neueNummer("INV", rng, opts, wir), "31.12.2026", "ENDBESTAND", "I", ende, "Endbestand 31.12.2026");
      zusatzbeleg = invListe(neueNummer("INV25", rng, opts, wir), "31.12.2025", "ANFANGSBESTAND", "V", anfang, "Endbestand 31.12.2025 = Anfangsbestand 1.1.2026");
      rechenzeile = { endbestand: ende, anfangsbestand: anfang, differenz: diff, art: vermehrung ? "Vermehrung" : "Verminderung" };
      text = "Buche die Bestandsveränderung. Anfangsbestand: Inventurliste Vorjahr (V), Endbestand: Inventurliste heuer (I).";
      g = { was: "Inventur " + pa.mat + ": Anfang " + euro(anfang) + ", Ende " + euro(ende) + " → " + (vermehrung ? "Vermehrung" : "Verminderung") + " " + euro(bet) + ".",
        konten: vermehrung ? ("Soll " + pa.vorrat + ", Haben " + pa.aufw + ".") : ("Soll " + pa.aufw + ", Haben " + pa.vorrat + "."),
        art: "Nur die Differenz, nie den ganzen Endbestand.",
        steuer: "Keine Steuer.",
        bg: "ohne", warum: "Aufwandsorientierte Korrektur des Bestands." };
    }


    else if (typId === "E7_firmenkarte_ausgleich") {
      const debit = (opts.karte || pick(rng, (v.karte || ["kredit", "debit"]))) === "debit";
      const bet = betragMitAbstand(rng, basis, (v.brutto_eur || [24, 2400])[0], (v.brutto_eur || [24, 2400])[1], 0, vermeide);
      brutto = bet; netto = bet; ust = 0; ustSatz = 0;
      const sollKto = debit ? "3190" : "3180";
      partner = partnerOhneKonto(bankFuer(wir.name, rng).name);
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(5000 + rng() * 20000);
      positionen = [{ bezeichnung: "Abbuchung Abrechnung Firmen-" + (debit ? "Debitkarte" : "Kreditkarte"), datum: datum, betrag: -bet, valuta: datum }];
      loesung = [z("Soll", sollKto, bet), z("Haben", "2800", bet)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 0, netto: bet, ust: 0, brutto: bet,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
        saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - bet)
      });
      g = { was: "Ausgleich der Firmen-" + (debit ? "Debitkarte" : "Kreditkarte") + " " + euro(bet) + " per Bank.",
        konten: "Soll " + sollKto + ", Haben 2800. Eigener Fall, nicht an den Kauf anhängen.",
        art: "", steuer: "Keine Steuer in diesem Satz.",
        bg: "B", warum: "Kauf und Ausgleich sind getrennte Fälle." };
    }

    else if (typId === "E7_kartengebuehr_gesondert") {
      setSteuer(betragMitAbstand(rng, basis, (v.gebuehr_netto_eur || [2, 25])[0], (v.gebuehr_netto_eur || [2, 25])[1], 20, vermeide), 20);
      partner = partnerOhneKonto(bankFuer(wir.name, rng).name);
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(5000 + rng() * 20000);
      positionen = [{ bezeichnung: "Sammelabbuchung Gebühren Kartenzahlungen zuzüglich USt", datum: datum, betrag: -brutto, valuta: datum }];
      loesung = [z("Soll", "7792", netto), z("Soll", "2500", ust), z("Haben", "2800", brutto)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 20, netto: netto, ust: ust, brutto: brutto,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
        saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - brutto)
      });
      g = { was: "Monatliche Kartengebühr " + euro(netto) + " zuzüglich USt, gesondert abgebucht.",
        konten: "Soll 7792 + 2500, Haben 2800. Nicht mit dem Karteneingang vermischen.",
        art: "", steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer (Trainer-Vereinfachung).",
        bg: "B", warum: "Die Gebühr ist ein eigener Satz." };
    }

    else if (typId === "E12_kest_allein") {
      const hz = betragMitAbstand(rng, basis, (v.habenzinsen_brutto_eur || [16, 160])[0], (v.habenzinsen_brutto_eur || [16, 160])[1], 0, vermeide);
      const kest = r2(hz * 0.25);
      brutto = kest; netto = kest; ust = 0; ustSatz = 0;
      partner = partnerOhneKonto(bankFuer(wir.name, rng).name);
      zahlungsweg = "bank"; beleggruppe = "B"; belegtyp = "Kontoauszug";
      const bank = bankFuer(wir.name, rng);
      const saldoAlt = r2(8000 + rng() * 20000);
      positionen = [{ bezeichnung: "Kapitalertragsteuer (KESt) 25 % auf Habenzinsen " + euro(hz), datum: datum, betrag: -kest, valuta: datum }];
      loesung = [z("Soll", "9600", kest), z("Haben", "2800", kest)];
      beleg = a4Beleg("Kontoauszug", { name: bank.name, adresse: bank.adresse, uid: bank.uid }, wir, {
        nummer: neueNummer("AUS", rng, opts, wir), datum: datum, positionen: positionen,
        ust_satz: 0, netto: kest, ust: 0, brutto: kest,
        konto: { iban: bank.iban, bic: bank.bic, inhaber: wir.name },
        saldo_alt: saldoAlt, saldo_neu: r2(saldoAlt - kest)
      });
      opts._habenzinsen = hz;
      g = { was: "Die Bank bucht KESt 25 % von Habenzinsen " + euro(hz) + " = " + euro(kest) + " ab.",
        konten: "Soll 9600, Haben 2800. Ähnlicher Beleg bleibt dieser Einzelsatz.",
        art: "", steuer: "KESt ist keine USt.",
        bg: "B", warum: "Nur die KESt, nicht die kombinierte Abrechnung Habenzinsen + KESt." };
    }

    else if (typId === "E16_material_weiterverkauf") {
      const ktoP = pickKonto(["33050"]);
      partner = partnerVonKonto(ktoP) || partnerOhneKonto("Kammerstapel Großhandel GmbH");
      const ware = wareFuer(rng, wir.wir, "33050", typId, "Trinkflaschen 0,4 l zum unveränderten Weiterverkauf");
      const posi = glattePosition(rng, (v.netto_eur || [15, 600])[0], (v.netto_eur || [15, 600])[1], 20, vermeide, ware);
      if (!posi) return { ok: false, fehler: "Keine gültige Position für " + typId };
      setSteuer(posi.netto, 20);
      zahlungsweg = "ziel"; beleggruppe = "ER"; belegtyp = "Eingangsrechnung";
      positionen = [{ bezeichnung: ware, menge: posi.menge, einzelpreis: posi.einzelpreis }];
      loesung = [z("Soll", "5000", netto), z("Soll", "2500", ust), z("Haben", partner.konto || "33050", brutto)];
      beleg = erBeleg(partner, positionen, "Zahlbar innerhalb von 30 Tagen ohne Abzug");
      g = { was: "Kauf von Ware bei " + partner.name + ", die unverändert weiterverkauft wird.",
        konten: "Soll 5000 + 2500, Haben " + (partner.konto || "33050") + ". Nur weil die Angabe den Weiterverkauf ausdrücklich nennt.",
        art: "", steuer: "20 % von " + euro(netto) + " = " + euro(ust) + " Vorsteuer.",
        bg: "ER", warum: "Ohne ausdrücklichen Weiterverkauf wäre Aufwand (5340/5450/…), nicht 5000." };
    }

    else {
      return { ok: false, fehler: "Kein Generator für " + typId };
    }

    if (!loesungOK(loesung)) {
      return { ok: false, fehler: "Soll ≠ Haben oder verbotenes Konto in " + typId, loesung: loesung };
    }
    if (beleg && (beleg.typ === "Kassabeleg" || beleg.typ === "Kartenbeleg") && beleg.kasse) registriereQr(beleg);
    if (zusatzbeleg && zusatzbeleg.kasse) registriereQr(zusatzbeleg);
    g.art = schritt3AusLoesung(loesung);

    const fall = {
      geschaeftstyp_id: typId,
      einheit: einheit,
      wir: { name: wir.name, adresse: wir.adresse, uid: wir.uid, branche: wir.branche, wir: wir.wir },
      partner: partner ? { name: partner.name, konto: partner.konto || null, adresse: partner.adresse || "", uid: partner.uid || "" } : null,
      beleggruppe: beleggruppe,
      belegtyp: belegtyp,
      datum: datum,
      zahlungsweg: zahlungsweg,
      ust_satz: ustSatz,
      positionen: positionen,
      netto: netto, ust: ust, brutto: brutto,
      rksv_qr: beleg && beleg.kasse ? true : undefined,
      twist: twistName || null,
      loesung: loesung,
      gedankengang: gedanke(g),
      haelfte: haelfte || undefined,
      rabatt: opts._rabatt || (beleg && beleg.rabatt) || undefined,
      habenzinsen: opts._habenzinsen || undefined,
      skonto_prozent: opts._skonto_prozent || undefined,
      karte: opts._karte || undefined,
      ursprungsrechnung_netto: opts._ursprung_netto || undefined,
      mahnung_art: opts._mahnung_art || undefined
    };
    const ang = baueAngabe(fall);
    fall.angabe = ang.mitWir;
    fall.angabeOhneWir = ang.ohneWir;
    fall.wirSatz = ang.wirSatz;
    if (!text) text = ang.ohneWir;

    const aufgabe = fallZuAufgabe(fall, {
      beleg: beleg, zusatzbeleg: zusatzbeleg, rechenzeile: rechenzeile,
      text: text, wir: wir.wir, lsK: opts._e11 && opts._e11.lsK, lsB: opts._e11 && opts._e11.lsB
    });
    return { ok: true, fall: fall, aufgabe: aufgabe, typ: typ };
  }


  function fallZuAufgabe(fall, extra) {
    extra = extra || {};
    const id = "GEN-" + fall.geschaeftstyp_id + "-" + String(fall.datum).replace(/\./g, "") + "-" + Math.abs(cents(fall.brutto || fall.netto || 0));
    let text = extra.text || "";
    if (!text) {
      if (extra.beleg) text = "Buche diesen Beleg.";
      else text = "Buche den Geschäftsvorfall.";
    }
    const typische = {
      "1": ["2700", "4000", "3500", "3300"],
      "2": ["2700", "5000", "2500", "2000"],
      "3": ["7300", "2700", "3300"],
      "4": ["5000", "2700", "7311"],
      "5": ["4000", "4400", "3300"],
      "6": ["2500", "3500", "2700"],
      "7": ["2700", "2800", "2880", "2885"],
      "8": ["4410", "2700"],
      "9": ["5880", "2700"],
      "10": ["3500", "2700"],
      "11": ["2800", "2700"],
      "12": ["2500", "7790"],
      "13": ["7100", "9600", "0200"],
      "14": ["7320", "7330", "2700"],
      "15": ["0630", "2700"],
      "16": ["5000", "7600", "2700"],
      "17": ["5000", "2700"]
    };
    const Pflicht = fall.loesung.map(l => l.konto);
    const abl = (typische[String(fall.einheit)] || []).filter(k => Pflicht.indexOf(k) < 0 && k !== "2000" && k !== "3300").slice(0, 4);
    const gg = fall.gedankengang || {};
    const erklaerung = [gg.was_passiert, gg.konten, gg.art_zu_abgang, gg.steuer, gg.beleggruppe ? ("Beleggruppe " + gg.beleggruppe + ".") : "", gg.begruendung].filter(Boolean).join(" ");
    return {
      id: id,
      einheit: fall.einheit,
      wir: extra.wir || (fall.wir.name + (fall.wir.branche ? ", " + fall.wir.branche : "")),
      text: text,
      loesung: fall.loesung.map(l => ({ seite: l.seite, konto: l.konto, betrag: l.betrag })),
      erklaerung: erklaerung,
      ablenker: abl,
      tipp: "Welche Konten, welche Seite, welcher Betrag? Personenkonto statt Sammelkonto.",
      beleg: extra.beleg || undefined,
      zusatzbeleg: extra.zusatzbeleg || undefined,
      rechenzeile: extra.rechenzeile || undefined,
      bema: fall,
      e11paar: extra.lsK && extra.lsB ? { K: extra.lsK, B: extra.lsB } : undefined
    };
  }

  function pruefeFall(fall) {
    const errs = [];
    if (!fall || !fall.loesung) return ["kein Fall"];
    const s = r2(fall.loesung.filter(l => l.seite === "Soll").reduce((a, b) => a + b.betrag, 0));
    const h = r2(fall.loesung.filter(l => l.seite === "Haben").reduce((a, b) => a + b.betrag, 0));
    if (cents(s) !== cents(h)) errs.push("Soll " + s + " ≠ Haben " + h);
    if (fall.loesung.some(l => l.konto === "2000" || l.konto === "3300")) errs.push("Sammelkonto 2000/3300");
    const satz = fall.ust_satz || 0;
    if (satz && fall.netto != null && fall.ust != null) {
      const erwart = ustVonNetto(fall.netto, satz);
      if (cents(erwart) !== cents(fall.ust) && fall.geschaeftstyp_id !== "E7_karteneingang_mit_gebuehr" && fall.geschaeftstyp_id !== "E8_lieferantenskonto" && fall.geschaeftstyp_id !== "E9_kundenskonto" && fall.geschaeftstyp_id !== "E5_sofortrabatt") {
        /* bei Skonto ist fall.ust der Skonto-Steueranteil, nicht USt vom Umsatz */
        if (!/skonto|karteneingang/i.test(fall.geschaeftstyp_id)) errs.push("USt-Rundung " + fall.ust + " ≠ " + erwart);
      }
    }
    if (satz && fall.geschaeftstyp_id.indexOf("E1_") === 0 || fall.geschaeftstyp_id.indexOf("E2_waren") === 0 || fall.geschaeftstyp_id === "E3_bezugskosten" || fall.geschaeftstyp_id.indexOf("E4_") === 0 && fall.ust_satz === 20) {
      if (fall.netto != null && cents(ustVonNetto(fall.netto, fall.ust_satz)) !== cents(fall.ust))
        errs.push("USt " + fall.ust + " ≠ " + ustVonNetto(fall.netto, fall.ust_satz));
      if (cents(r2(fall.netto + fall.ust)) !== cents(fall.brutto))
        errs.push("Brutto unstimmig");
    }
    if (fall.geschaeftstyp_id === "E12_habenzinsen_kest") {
      const hz = fall.loesung.find(l => l.konto === "8050");
      const ks = fall.loesung.find(l => l.konto === "9600");
      if (hz && ks && cents(r2(hz.betrag * 0.25)) !== cents(ks.betrag)) errs.push("KESt nicht 25 %");
    }
    if (fall.geschaeftstyp_id === "E17_inventur") {
      const a = (fall /* rechenzeile on aufgabe */);
    }
    if (fall.beleggruppe === "K" && (fall.zahlungsweg === "kreditkarte" || fall.zahlungsweg === "debitkarte"))
      errs.push("K für Nicht-Bargeld");
    if ((fall.geschaeftstyp_id === "E11_bareinzahlung" || fall.geschaeftstyp_id === "E11_barbehebung")) {
      if (fall.beleggruppe === "K+B" || (fall.haelfte !== "K" && fall.haelfte !== "B"))
        errs.push("E11 braucht genau eine Hälfte (K oder B)");
    }
    if (fall.geschaeftstyp_id === "E15_lkw_kauf") {
      if (!fall.loesung.some(function (l) { return l.seite === "Haben" && l.konto === "2800"; }))
        errs.push("E15 Lkw muss Haben 2800 haben");
    }
    if (fall.geschaeftstyp_id === "E16_material_verbrauch" && fall.loesung.some(function (l) { return l.konto === "5000"; }))
      errs.push("E16 Verbrauch darf nicht 5000 buchen");
    if (fall.geschaeftstyp_id === "E16_material_weiterverkauf" && !fall.loesung.some(function (l) { return l.konto === "5000"; }))
      errs.push("E16 Weiterverkauf braucht 5000");
    if (fall.datum && !datumImFenster(fall.datum, fall.geschaeftstyp_id) && fall.geschaeftstyp_id !== "E17_inventur")
      errs.push("Datum außerhalb 01.09.–30.11.2026: " + fall.datum);
    Array.prototype.push.apply(errs, betraegeExakt(fall));
    Array.prototype.push.apply(errs, partnerWarePasst(fall));
    if (fall.gedankengang && fall.gedankengang.art_zu_abgang) {
      if (!/Aktiv|Passiv|Aufwand|Ertrag|Privat/.test(fall.gedankengang.art_zu_abgang) || !/→ Soll|→ Haben/.test(fall.gedankengang.art_zu_abgang))
        errs.push("Gedankengang Schritt 3 unvollständig");
    }
    if (fall.geschaeftstyp_id === "E7_karteneingang_ohne_gebuehr") {
      const gg = fall.gedankengang || {};
      const txt = (gg.begruendung || "") + " " + (gg.was_passiert || "") + " " + (fall.angabeOhneWir || "");
      if (!/ohne Gebühr in diesem Satz/i.test(txt)) errs.push("Karteneingang ohne Gebühr nicht aus der Angabe erkennbar");
      if (/7792/.test(gg.begruendung || "")) errs.push("Begründung zu 7792 gehört nicht zum Karteneingang ohne Gebühr");
    }
    if ((fall.geschaeftstyp_id === "E6_zahlung_lieferant" || fall.geschaeftstyp_id === "E6_zahlung_kunde" || /skonto/.test(fall.geschaeftstyp_id || "")) && fall.angabeOhneWir && !/per Bank/.test(fall.angabeOhneWir))
      errs.push("Zahlung per Bank fehlt in der Angabe");
    if (istGutschriftTyp(fall.geschaeftstyp_id) && fall.angabeOhneWir && !/Ursprungsrechnung/.test(fall.angabeOhneWir))
      errs.push("Gutschrift-Angabe nennt die Ursprungsrechnung nicht");
    return errs;
  }

  function vieleGenerieren(typId, n, seed0) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const g = generate(typId, { seed: (seed0 || 20261121) + i * 9973, twist: false });
      const errs = g.ok ? pruefeFall(g.fall) : [g.fehler];
      out.push({ i: i, typId: typId, ok: g.ok && !errs.length, fehler: errs, fall: g.ok ? g.fall : null });
    }
    return out;
  }

  function hausuebungErzeugen(typId, opts) {
    opts = opts || {};
    const n = Math.min(10, Math.max(1, parseInt(opts.anzahl, 10) || 3));
    const mitBelegen = opts.mitBelegen !== false;
    const basis = opts.basisAufgabe || null;
    const map = typIdFuerAufgabe(basis || {}) || {};
    const id = typId || (map && map.typId);
    if (!id || map.verboten) return { ok: false, fehler: (map && map.grund) || "Kein Geschäftstyp für die Hausübung." };
    const rng0 = mulberry(opts.seed || 4242);
    const wir = wirFuerTypen([id], (opts.wir || (basis && basis.wir) || defaultWir(rng0, id === "E2_eigenverbrauch")), rng0);
    const nummern = new Set();
    const vermeideDat = [];
    const falls = [];
    const vermeideB = basis ? [basisBetrag(basis)] : [];
    const vermeideP = [];
    const twistIndex = opts.mitTwist ? randInt(mulberry(opts.seed || 1), 0, n - 1) : -1;
    const e11paar = (id === "E11_bareinzahlung" || id === "E11_barbehebung") && n >= 2;
    let e11Betrag = null;
    let e11Datum = null;
    for (let i = 0; i < n; i++) {
      const go = {
        seed: (opts.seed || 4242) + i * 1337 + 17,
        wir: wir,
        basisBetrag: e11Betrag != null ? e11Betrag : basisBetrag(basis),
        basisDatum: basis && basis.beleg && basis.beleg.datum,
        twist: i === twistIndex,
        vermeideBetrag: vermeideB.slice(),
        vermeidePartner: vermeideP.slice(),
        vermeideDatum: vermeideDat.slice(),
        nummern: nummern,
        haelfte: e11paar ? (i === 0 ? "K" : (i === 1 ? "B" : (i % 2 ? "B" : "K"))) : (map.haelfte || undefined)
      };
      if (e11paar && i === 1 && e11Datum) go.datum = e11Datum;
      const g = generate(id, go);
      if (!g.ok) return { ok: false, fehler: g.fehler, bisher: falls };
      if (e11paar && i === 0) { e11Betrag = g.fall.brutto; e11Datum = g.fall.datum; }
      const e = pruefeFall(g.fall);
      if (e.length) return { ok: false, fehler: e.join("; "), bisher: falls };
      vermeideB.push(g.fall.netto || g.fall.brutto);
      if (g.fall.partner && g.fall.partner.konto) vermeideP.push(g.fall.partner.konto);
      if (!(e11paar && i === 1)) vermeideDat.push(g.fall.datum);
      if (!mitBelegen) { g.aufgabe.beleg = undefined; g.aufgabe.zusatzbeleg = undefined; }
      falls.push(g);
    }
    const punkte = falls.reduce(function (s, f) { return s + punkteDesFalls(f.fall).summe; }, 0);
    return { ok: true, typId: id, faelle: falls, mitBelegen: mitBelegen, wir: wir, punkte: punkte };
  }

  function punkteDesFalls(fall) {
    /* 2 P Konten/Seiten + 1 P je Betragszeile (Zweizeiler = 4, Steuerfall 3 Zeilen = 5, Skonto 4 Zeilen = 6) */
    const bets = (fall.loesung || []).map(function (l) { return l.betrag; });
    return { konten: 2, betraege: bets.length, summe: 2 + bets.length, betragswerte: bets };
  }

  function istSteuerfall(id) {
    return /E1_wareneinkauf|E1_ruecksendung|E2_warenverkauf|E2_ruecksendung|E2_eigen|E3_|E4_versand|E4_paket_20|E5_|E7_kunde_|E7_eigene_firmenkarte|E7_kartengebuehr_gesondert|E14_lkw_betrieb|E15_|E16_/.test(id);
  }
  function istZahlung(id) {
    return /E6_|E13_|E12_soll|E12_bank|E12_kest_allein|E10_|E11_|E14_pkw_betrieb|E14_versicherung|E7_karteneingang_ohne_gebuehr|E7_firmenkarte_ausgleich/.test(id);
  }
  function erwartetePunkte(id) {
    if (istSkonto(id)) return 6;
    if (istSteuerfall(id)) return 5;
    return 4;
  }
  function istSkonto(id) { return /E8_|E9_/.test(id); }

  function typenFuerEinheiten(nrs) {
    const fromJson = ((regeln() || {}).geschaeftstypen || []).filter(t => nrs.indexOf(t.einheit) >= 0);
    const map = ((global.BEMA_MAPPING || {}).aufgaben || []);
    const extra = [];
    (nrs || []).forEach(function (e) {
      map.forEach(function (a) {
        if (a.einheit !== e || a.status === "verboten" || !a.typ || a.typ === "—" || a.typ === "-") return;
        const base = typById(a.typ);
        if (!base) return;
        if (fromJson.some(function (t) { return t.id === base.id && t.einheit === e; })) return;
        if (extra.some(function (t) { return t.id === base.id && t.einheit === e; })) return;
        extra.push(Object.assign({}, base, { einheit: e, aus_mapping_einheit: true }));
      });
    });
    return fromJson.concat(extra);
  }
  function zweizeilerTypen(nrs) {
    return typenFuerEinheiten(nrs).filter(function (t) { return istZahlung(t.id); });
  }
  function profilVerfuegbar(opts) {
    opts = opts || {};
    const aktueller = opts.einheit || 1;
    let einheiten = [aktueller];
    if (opts.mischen === 2) einheiten = [Math.max(1, aktueller - 1), aktueller];
    if (opts.mischen === 3) einheiten = [Math.max(1, aktueller - 2), Math.max(1, aktueller - 1), aktueller].filter(function (v, i, a) { return a.indexOf(v) === i; });
    const typen = typenFuerEinheiten(einheiten);
    const hatSt = typen.some(function (t) { return istSteuerfall(t.id); });
    const hatZa = typen.some(function (t) { return istZahlung(t.id); });
    const hatSk = typen.some(function (t) { return istSkonto(t.id); }) && einheiten.some(function (e) { return e === 8 || e === 9; });
    return { einheiten: einheiten, A: hatSt, B: hatZa, C: hatSk && hatSt && hatZa, D: hatSt && hatZa };
  }

  function waehleWHFaelle(opts, rng) {
    const verf = profilVerfuegbar(opts);
    const einheiten = verf.einheiten;
    const newest = Math.max.apply(null, einheiten);
    const fragenN = opts.verstaendnis === 2 ? 2 : (opts.verstaendnis === 3 ? 3 : 0);
    let profil;
    if (fragenN === 3) profil = "B";
    else if (fragenN === 2) profil = "D";
    else profil = verf.C ? "C" : "A";
    if (profil === "B" && !verf.B)
      return { ok: false, fehler: "Profil B (3 Verständnisfragen) in den gewählten Einheiten nicht anbieten: zu wenig Zweizeiler. Bitte 0 Fragen (Profil A) oder eine Zahlungs-Einheit hinzumischen.", profil: "B", nicht_anbieten: true };
    if (profil === "D" && !verf.D)
      return { ok: false, fehler: "Profil D (2 Verständnisfragen) in den gewählten Einheiten nicht anbieten: zu wenig Zweizeiler. Bitte 0 Fragen (Profil A) oder eine Zahlungs-Einheit hinzumischen.", profil: "D", nicht_anbieten: true };
    if (profil === "C" && !verf.C)
      return { ok: false, fehler: "Profil C braucht Skonto-, Steuer- und Zahlungsfall in den gewählten Einheiten.", profil: "C" };
    const typenAusStunde = [];
    (opts.basisAufgaben || []).forEach(function (a) {
      const m = typIdFuerAufgabe(a);
      if (!m || !m.typId || m.verboten) return;
      const base = typById(m.typId);
      if (!base) return;
      typenAusStunde.push(Object.assign({}, base, { einheit: a.einheit || newest }));
    });
    if (profil === "A" && !verf.A && !typenAusStunde.length && !typenFuerEinheiten(einheiten).length)
      return { ok: false, fehler: "Keine passenden Geschäftsfälle in den gewählten Einheiten für eine schriftliche Wiederholung.", profil: "A" };

    const faelleN = Math.min(10, Math.max(1, parseInt(opts.faelle, 10) || 3));
    let typen = typenFuerEinheiten(einheiten).concat(typenAusStunde).filter(t => t.id !== "E15_lkw_kauf" || newest === 15);
    function typenArt(pred, forceEinheit) {
      let list = typen.filter(t => pred(t.id));
      if (forceEinheit) {
        const f = list.filter(t => t.einheit === forceEinheit);
        if (f.length) list = f;
      }
      return list;
    }
    const buchungen = [];
    function nimm(pred, newestPreferred) {
      let list = typenArt(pred, newestPreferred ? newest : null);
      if (!list.length) list = typenArt(pred, false);
      if (!list.length) return null;
      if (newestPreferred) {
        const n = list.filter(t => t.einheit === newest);
        if (n.length) list = n;
      }
      return pick(rng, list);
    }

    if (profil === "A") {
      const predA = verf.A ? istSteuerfall : function () { return true; };
      for (let i = 0; i < faelleN; i++) {
        const t = nimm(predA, i < 2) || nimm(function () { return true; }, false);
        if (!t) return { ok: false, fehler: "Keine passenden Geschäftsfälle in den gewählten Einheiten für eine schriftliche Wiederholung." };
        buchungen.push(t);
      }
    } else if (profil === "C") {
      const sk = nimm(istSkonto, true) || nimm(istSkonto, false);
      const st = nimm(istSteuerfall, true) || nimm(istSteuerfall, false);
      if (!sk || !st) return { ok: false, fehler: "Profil C braucht mindestens Skonto- und Steuerfall in den gewählten Einheiten.", profil: "C" };
      if (faelleN === 1) {
        buchungen.push(sk);
      } else {
        buchungen.push(sk, st);
        if (faelleN >= 3) {
          const za = nimm(istZahlung, true) || nimm(istZahlung, false);
          if (!za) return { ok: false, fehler: "Profil C braucht Skonto-, Steuer- und Zahlungsfall in den gewählten Einheiten.", profil: "C" };
          buchungen.push(za);
        }
        while (buchungen.length < faelleN) {
          const extra = nimm(istSteuerfall, true) || nimm(istZahlung, true) || nimm(istSteuerfall, false) || nimm(istZahlung, false);
          if (!extra) return { ok: false, fehler: "Profil C: Für " + faelleN + " Fälle fehlt ein weiterer Steuer- oder Zahlungsfall (keine Lücke, keine Ausleihe).", profil: "C" };
          buchungen.push(extra);
        }
      }
    } else if (profil === "B") {
      for (let i = 0; i < faelleN; i++) {
        const t = nimm(istZahlung, i < 2);
        if (!t) return { ok: false, fehler: "Keine Zweizeiler in den gewählten Einheiten für Profil B.", profil: "B", nicht_anbieten: true };
        buchungen.push(t);
      }
    } else {
      const st = nimm(istSteuerfall, true) || nimm(istSteuerfall, false);
      if (!st) return { ok: false, fehler: "Profil D in den gewählten Einheiten nicht darstellbar (Steuerfall nötig, ohne Ausleihe).", profil: "D", nicht_anbieten: true };
      buchungen.push(st);
      for (let i = 1; i < faelleN; i++) {
        const z = nimm(istZahlung, i < 2);
        if (!z) return { ok: false, fehler: "Profil D in den gewählten Einheiten nicht darstellbar (weitere Zweizeiler nötig, ohne Ausleihe).", profil: "D", nicht_anbieten: true };
        buchungen.push(z);
      }
    }

    /* Neueste Einheit mindestens 2 Fälle, soweit die Fallzahl das hergibt; Punkteklasse beibehalten; keine Ausleihe */
    const brauchtNewest = Math.min(2, faelleN);
    const vonNewest = function () { return buchungen.filter(function (t) { return t.einheit === newest; }).length; };
    if (einheiten.length > 1 && vonNewest() < brauchtNewest) {
      for (let i = 0; i < buchungen.length && vonNewest() < brauchtNewest; i++) {
        if (buchungen[i].einheit === newest) continue;
        const soll = erwartetePunkte(buchungen[i].id);
        const ersatz = typen.filter(function (t) { return t.einheit === newest && erwartetePunkte(t.id) === soll; });
        if (ersatz.length) buchungen[i] = pick(rng, ersatz);
      }
    }
    if (einheiten.length > 1 && vonNewest() < brauchtNewest)
      return { ok: false, fehler: "Profil " + profil + ": Die neueste Einheit muss mindestens " + brauchtNewest + " der " + faelleN + " Buchungsfälle stellen. In den gewählten Einheiten nicht darstellbar (keine Ausleihe).", profil: profil };
    return { ok: true, profil: profil, einheiten: einheiten, buchungen: buchungen, fragenN: fragenN, faelleN: faelleN, luecke: null };
  }

  function whVorschlagListe(opts, rng) {
    opts = opts || {};
    const plan = waehleWHFaelle(opts, rng || mulberry(1));
    if (!plan.ok) return plan;
    const liste = plan.buchungen.map(function (t) { return erwartetePunkte(t.id); });
    for (let i = 0; i < plan.fragenN; i++) liste.push(1);
    const summe = liste.reduce(function (s, v) { return s + v; }, 0);
    return { ok: true, liste: liste, summe: summe, nFaelle: plan.buchungen.length, fragenN: plan.fragenN, profil: plan.profil, typen: plan.buchungen.map(function (t) { return t.id; }) };
  }

  function verstaendnisItems(einheiten, n, rng, gruppe) {
    const kap = ((fragenAll() || {}).kapitel || []).filter(k => einheiten.indexOf(k.einheit) >= 0);
    const pool = [];
    kap.forEach(k => {
      ["einstieg", "vertiefung", "transfer"].forEach(st => {
        (k[st] || []).forEach(q => pool.push({ stufe: st, einheit: k.einheit, frage: q.frage, erwartung: q.erwartung, typ: "Verständnis (Stichwort)" }));
      });
    });
    /* Beispiel-MC aus RW nur einmal, wenn passend */
    if (einheiten.indexOf(7) >= 0 || einheiten.indexOf(1) >= 0) {
      pool.push({
        typ: "Multiple Choice", stufe: "einstieg", einheit: 7,
        frage: "Ein Kunde zahlt mit Debitkarte. Welches Sollkonto?",
        optionen: [
          { k: "a", t: "2700 Kassa" },
          { k: "b", t: "2800 Bank" },
          { k: "c", t: "2885 Forderungen Debitkarten" },
          { k: "d", t: "2880 Forderungen Kreditkartenunternehmen" }
        ],
        erwartung: "c",
        richtig: "c"
      });
    }
    if (einheiten.indexOf(7) >= 0 || einheiten.indexOf(6) >= 0) {
      pool.push({ typ: "kurze Lücke", stufe: "einstieg", einheit: 7, frage: "Die Beleggruppe bei Kartenzahlung ist ____.", erwartung: "S" });
    }
    const mix = shuffled(rng, pool);
    const out = [];
    const seen = {};
    for (let i = 0; i < mix.length && out.length < n; i++) {
      const q = mix[i];
      if (seen[q.frage]) continue;
      seen[q.frage] = 1;
      out.push(q);
    }
    return out;
  }

  function schriftlicheWH(opts) {
    opts = opts || {};
    const rng = mulberry(opts.seed || 20261121);
    const plan = waehleWHFaelle(opts, rng);
    if (!plan.ok) return plan;
    const gruppenN = opts.gruppen === 2 ? 2 : 1;
    const gruppen = [];
    for (let g = 0; g < gruppenN; g++) {
      const faelle = [];
      const vermeideB = [];
      const vermeideP = [];
      const wir = wirFuerTypen(plan.buchungen.map(function (t) { return t.id; }), opts.wir, rng);
      const nummern = new Set();
      const vermeideDat = [];
      for (let i = 0; i < plan.buchungen.length; i++) {
        const t = plan.buchungen[i];
        const gen = generate(t.id, {
          seed: (opts.seed || 1) + g * 10007 + i * 911 + 3,
          twist: false,
          wir: wir,
          vermeideBetrag: vermeideB.slice(),
          vermeidePartner: vermeideP.slice(),
          vermeideDatum: vermeideDat.slice(),
          nummern: nummern,
          haelfte: /E11_/.test(t.id) ? (i % 2 ? "B" : "K") : undefined
        });
        if (!gen.ok) return { ok: false, fehler: gen.fehler };
        const p = punkteDesFalls(gen.fall);
        if (p.summe !== erwartetePunkte(t.id))
          return { ok: false, fehler: "Punkte " + p.summe + " ≠ erwartet " + erwartetePunkte(t.id) + " für " + t.id, profil: plan.profil };
        gen.punkte = p;
        vermeideB.push(gen.fall.netto || gen.fall.brutto);
        if (gen.fall.partner && gen.fall.partner.konto) vermeideP.push(gen.fall.partner.konto);
        vermeideDat.push(gen.fall.datum);
        faelle.push(gen);
      }
      const fragen = plan.fragenN ? verstaendnisItems(plan.einheiten, plan.fragenN, rng, g) : [];
      const intern = faelle.reduce((s, f) => s + f.punkte.summe, 0) + fragen.length;
      const modusIn = opts.punkteModus;
      const modus = modusIn === "gesetzt" ? "gesetzt" : (modusIn === "vorschlag" ? "vorschlag" : (modusIn === "jefall" ? "jefall" : "frei"));
      let liste = opts.punkteJeAufgabe || [];
      const nPos = faelle.length + fragen.length;
      function ganzeZahl(v) { return typeof v === "number" && isFinite(v) && Math.round(v) === v && v >= 0; }
      if (modus === "jefall") {
        let je = opts.punkteJeFall != null ? Math.round(Number(opts.punkteJeFall)) : 3;
        if (!(je >= 1 && je <= 10))
          return { ok: false, fehler: "Punkte je Fall müssen eine ganze Zahl von 1 bis 10 sein.", profil: plan.profil };
        liste = faelle.map(function () { return je; }).concat(fragen.map(function () { return 1; }));
      }
      if (modus === "gesetzt") {
        if (liste.length !== nPos)
          return { ok: false, fehler: "Bitte für jede Aufgabe eine ganze Punktzahl angeben (" + nPos + " Felder).", profil: plan.profil };
        for (let k = 0; k < nPos; k++) {
          if (!ganzeZahl(Number(liste[k])))
            return { ok: false, fehler: "Punktzahlen müssen ganze Zahlen ab 0 sein.", profil: plan.profil };
        }
      }
      const mitListe = (modus === "gesetzt" || modus === "jefall");
      faelle.forEach(function (f, i) {
        f.punkteVergeben = mitListe ? Number(liste[i]) : (modus === "vorschlag" ? f.punkte.summe : null);
      });
      fragen.forEach(function (q, i) {
        q.punkteVergeben = mitListe ? Number(liste[faelle.length + i]) : (modus === "vorschlag" ? 1 : null);
      });
      const vergeben = (mitListe || modus === "vorschlag")
        ? (mitListe ? liste : faelle.map(function (f) { return f.punkteVergeben; }).concat(fragen.map(function (q) { return q.punkteVergeben; }))).reduce(function (s, v) { return s + Number(v); }, 0)
        : null;
      gruppen.push({
        name: gruppenN === 2 ? (g === 0 ? "A" : "B") : "A",
        faelle: faelle, fragen: fragen,
        punkte: intern, punkteModus: modus, punkteSumme: vergeben,
        wir: wir, wirSatz: faelle[0] && faelle[0].fall.wirSatz
      });
    }
    const thema = "Einheiten " + plan.einheiten.map(function (e) { return "E " + e; }).join(", ");
    return {
      ok: true, profil: plan.profil, einheiten: plan.einheiten, thema: thema, gruppen: gruppen,
      punkteModus: (opts.punkteModus === "gesetzt" ? "gesetzt" : (opts.punkteModus === "vorschlag" ? "vorschlag" : (opts.punkteModus === "jefall" ? "jefall" : "frei"))),
      mitDauer: !!opts.mitDauer,
      notenschluessel: opts.notenschluessel || null,
      faelleN: plan.faelleN || plan.buchungen.length,
      luecke: plan.luecke,
      buchungen: plan.buchungen.map(function (t) { return { id: t.id, einheit: t.einheit }; })
    };
  }

  function fragenDerEinheit(nr) {
    const k = ((fragenAll() || {}).kapitel || []).find(x => x.einheit === nr);
    return k || null;
  }

  function lueckenListe() {
    return [
      "Adressen und UIDs der Partner stammen aus den Trainer-Belegen, nicht aus dem WebApps-JSON.",
      "Kontoblatt-Eröffnungen bleiben 0, bis Stefan feste plausible Bestände (Bank, Kassa) vorgibt.",
      "Der Fragentyp „Zuordnen“ kommt erst in einer späteren Stufe (laut v3).",
      "WH: Punkte freilassen (Standard), Vorschlag (2 P Konten/Seiten + 1 P je Betrag; Verständnis/MC 1) oder selbst setzen. Dauer und Notenschlüssel optional, standardmäßig aus. 2–4 Fälle, Standard 3 mit 15-Punkte-Profil, keine erzwungene Zielsumme.",
      "Laptops erscheinen nur im Verkauf (E2/E5/E7 Kunde), weil 33010/33020 keine Laptop-Lieferanten sind (laut RW zu v4 bestätigt).",
      "Verbrauchsmaterial in E16 und Outdoor/Möbel (Eigenverbrauch) nutzen eigene Spannen (laut RW zu v4 bestätigt); die verbindliche Liste gilt für Handelsware der Elektronik.",
      "Denkfragen in der Beamer-Ansicht kommen aus BEMA_Denkfragen_v2.json (Schlüssel = beleg.typ bzw. Textangabe; optional nur_aufgabentypen / nur_einheiten)."
    ];
  }


  var DENK_META = {
    quelle: 1, datum: 1, format: 1, hinweis: 1, stufen: 1,
    kommentar: 1, meta: 1, aufgabentypen: 1, kapitel: 1, version: 1,
    aenderungen: 1
  };

  function denkfragenRoh() {
    return global.BEMA_DENKFRAGEN || null;
  }

  function normBelegtyp(typ) {
    typ = String(typ || "").trim();
    if (!typ || typ === "Text" || typ === "Textaufgabe" || typ === "Textangabe oder Eigenbeleg") return "Textangabe";
    return typ;
  }

  function belegtypDerAufgabe(a) {
    if (!a) return "Textangabe";
    if (a.beleg && a.beleg.typ) return normBelegtyp(a.beleg.typ);
    const row = a.id ? mappingRow(a.id) : null;
    if (row && row.belegtyp) return normBelegtyp(row.belegtyp);
    if (a.bema && a.bema.belegtyp) return normBelegtyp(a.bema.belegtyp);
    return "Textangabe";
  }

  function typIdFuerDenkfragen(a) {
    const t = typIdFuerAufgabe(a);
    if (!t || !t.typId || t.verboten) return null;
    if (t.typId === "—" || t.typId === "-") return null;
    return t.typId;
  }

  function einheitDerAufgabe(a) {
    if (!a) return null;
    if (a.einheit != null && a.einheit !== "") return Number(a.einheit);
    const row = a.id ? mappingRow(a.id) : null;
    if (row && row.einheit != null) return Number(row.einheit);
    return null;
  }

  function denkfragePasst(q, typId, einheit) {
    const typen = (q && q.nur_aufgabentypen) || [];
    const einh = (q && q.nur_einheiten) || [];
    const hatTyp = typen.length > 0;
    const hatEinh = einh.length > 0;
    if (!typId && (hatTyp || hatEinh)) return false;
    if (hatTyp && typen.indexOf(typId) < 0) return false;
    if (hatEinh) {
      if (einheit == null || !isFinite(einheit)) return false;
      if (einh.indexOf(Number(einheit)) < 0 && einh.indexOf(einheit) < 0 && einh.map(Number).indexOf(Number(einheit)) < 0) return false;
    }
    return true;
  }

  function normDenkfrage(q) {
    if (!q) return null;
    const antwort = q.antwort || q.erwartung || "";
    const out = { frage: q.frage || "", antwort: antwort, erwartung: antwort };
    if (q.nur_aufgabentypen) out.nur_aufgabentypen = q.nur_aufgabentypen;
    if (q.nur_einheiten) out.nur_einheiten = q.nur_einheiten;
    return out.frage ? out : null;
  }

  function denkfragenBlock(raw, typId, einheit) {
    const out = { einstieg: [], vertiefung: [], transfer: [] };
    ["einstieg", "vertiefung", "transfer"].forEach(function (st) {
      (raw && raw[st] || []).forEach(function (q) {
        if (!denkfragePasst(q, typId, einheit)) return;
        const n = normDenkfrage(q);
        if (n) out[st].push(n);
      });
    });
    return out;
  }

  function hatDenkfragenBlock(b) {
    return !!(b && ((b.einstieg || []).length || (b.vertiefung || []).length || (b.transfer || []).length));
  }

  function stufenOhneFrage(b) {
    return ["einstieg", "vertiefung", "transfer"].filter(function (st) {
      return !((b && b[st]) || []).length;
    });
  }

  function denkfragenSchluessel(kat, key) {
    if (!kat || !key || DENK_META[key]) return null;
    if (kat[key]) return kat[key];
    if (kat.aufgabentypen && kat.aufgabentypen[key]) return kat.aufgabentypen[key];
    return null;
  }

  function denkfragenFuerAufgabe(a, katalog) {
    const belegtyp = belegtypDerAufgabe(a);
    const typId = typIdFuerDenkfragen(a);
    const einheit = einheitDerAufgabe(a);
    const leer = { einstieg: [], vertiefung: [], transfer: [], typId: typId, belegtyp: belegtyp, einheit: einheit };
    const kat = katalog || denkfragenRoh();
    if (!kat || !a) return leer;
    const out = denkfragenBlock(denkfragenSchluessel(kat, belegtyp), typId, einheit);
    out.typId = typId;
    out.belegtyp = belegtyp;
    out.einheit = einheit;
    return out;
  }

  function aufgabenOhneDenkfragen(aufgaben, katalog) {
    const list = aufgaben || (global.DATA && DATA.aufgaben) || [];
    return list.filter(function (a) {
      return !hatDenkfragenBlock(denkfragenFuerAufgabe(a, katalog));
    }).map(function (a) {
      return { id: a.id, belegtyp: belegtypDerAufgabe(a) };
    });
  }

  function aufgabenMitLeererStufe(aufgaben, katalog) {
    const list = aufgaben || (global.DATA && DATA.aufgaben) || [];
    return list.map(function (a) {
      const d = denkfragenFuerAufgabe(a, katalog);
      return { id: a.id, typId: d.typId, belegtyp: d.belegtyp, leer: stufenOhneFrage(d) };
    }).filter(function (row) { return row.leer.length > 0; });
  }

  function typenOhneDenkfragen(katalog) {
    const fehl = aufgabenOhneDenkfragen(null, katalog);
    const typen = {};
    fehl.forEach(function (row) {
      typen[row.belegtyp] = typen[row.belegtyp] || { typ: row.belegtyp, ohne: 0, ids: [] };
      typen[row.belegtyp].ohne++;
      typen[row.belegtyp].ids.push(row.id);
    });
    return Object.keys(typen).sort().map(function (k) { return typen[k]; });
  }

  global.BEMA = {
    r2: r2, cents: cents, euro: euro, kontoName: kontoName,
    typIdFuerAufgabe: typIdFuerAufgabe, typById: typById,
    generate: generate, pruefeFall: pruefeFall, vieleGenerieren: vieleGenerieren,
    hausuebungErzeugen: hausuebungErzeugen, schriftlicheWH: schriftlicheWH,
    punkteDesFalls: punkteDesFalls, fragenDerEinheit: fragenDerEinheit,
    denkfragenFuerAufgabe: denkfragenFuerAufgabe, belegtypDerAufgabe: belegtypDerAufgabe,
    typenOhneDenkfragen: typenOhneDenkfragen, aufgabenOhneDenkfragen: aufgabenOhneDenkfragen, aufgabenMitLeererStufe: aufgabenMitLeererStufe, hatDenkfragenBlock: hatDenkfragenBlock, denkfragePasst: denkfragePasst, typIdFuerDenkfragen: typIdFuerDenkfragen,
    lueckenListe: lueckenListe, registriereQr: registriereQr,
    fallZuAufgabe: fallZuAufgabe, basisBetrag: basisBetrag,
    wirObjekt: wirObjekt, ustVonNetto: ustVonNetto,
    partnerWarePasst: partnerWarePasst, betraegeExakt: betraegeExakt,
    schritt3AusLoesung: schritt3AusLoesung, baueAngabe: baueAngabe,
    erwartetePunkte: erwartetePunkte, mappingRow: mappingRow,
    glattePosition: glattePosition, wirFuerTypen: wirFuerTypen,
    preisspanneFuer: preisspanneFuer, preisPasst: preisPasst,
    preisregeln: preisregeln, warenartVon: warenartVon, wareIstBarfaehig: wareIstBarfaehig,
    istGutschriftTyp: istGutschriftTyp, gutschriftRahmen: gutschriftRahmen,
    profilVerfuegbar: profilVerfuegbar, typenFuerEinheiten: typenFuerEinheiten,
    typIstHandelsware: typIstHandelsware, waehleWHFaelle: waehleWHFaelle, whVorschlagListe: whVorschlagListe
  };
})(typeof window !== "undefined" ? window : globalThis);

/* Varianten-IDs für Live-Sitzungen: Format passt zu lk_fall_ok (z. B. V0A-3F9B2).
   Lehrer und Schüler erzeugen denselben Fall deterministisch aus Typ und Seed. */
function lsVariantenTypListe() {
  const typen = ((typeof BEMA_REGELN === "object" && BEMA_REGELN && BEMA_REGELN.geschaeftstypen) || [])
    .map(function (x) { return x && x.id; })
    .filter(Boolean);
  const seen = {};
  const out = [];
  typen.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
  out.sort();
  return out;
}
function lsIstVariantenId(id) {
  return typeof id === "string" && /^V[0-9A-Z]{0,3}-[0-9A-Z]{1,6}$/.test(id);
}
function lsVariantenId(typId, seed) {
  const typen = lsVariantenTypListe();
  const idx = typen.indexOf(typId);
  if (idx < 0) return null;
  const typCode = idx.toString(36).toUpperCase();
  if (!typCode || typCode.length > 3) return null;
  let suf = Math.abs(seed | 0).toString(36).toUpperCase();
  if (!suf) suf = "1";
  if (suf.length > 6) suf = suf.slice(-6);
  return "V" + typCode + "-" + suf;
}
function lsVarianteEintragen(aufg, id) {
  if (!aufg || !id) return null;
  aufg.id = id;
  if (typeof AUFG === "object") AUFG[id] = aufg;
  if (typeof DATA === "object" && Array.isArray(DATA.aufgaben) && !DATA.aufgaben.some(function (x) { return x.id === id; }))
    DATA.aufgaben.push(aufg);
  return aufg;
}
function lsVarianteAusId(id) {
  if (!id) return null;
  if (typeof AUFG === "object" && AUFG[id]) return AUFG[id];
  if (!lsIstVariantenId(id) || typeof BEMA !== "object" || typeof BEMA.generate !== "function") return null;
  const m = String(id).match(/^V([0-9A-Z]{0,3})-([0-9A-Z]{1,6})$/);
  if (!m) return null;
  const typen = lsVariantenTypListe();
  const typIdx = parseInt(m[1] || "0", 36);
  const typId = typen[typIdx];
  const seed = parseInt(m[2], 36);
  if (!typId || !isFinite(seed)) return null;
  const g = BEMA.generate(typId, { seed: seed, twist: false });
  if (!g || !g.ok || !g.aufgabe) return null;
  if (typeof BEMA.pruefeFall === "function") {
    const errs = BEMA.pruefeFall(g.fall || {});
    if (errs && errs.length) return null;
  }
  return lsVarianteEintragen(g.aufgabe, id);
}
function lsErzeugeVariante(typId, seed) {
  const id = lsVariantenId(typId, seed);
  return id ? lsVarianteAusId(id) : null;
}
