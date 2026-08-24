# Funnel-Endstrecke aufwerten (Lead-Seite + Ergebnisseite)

Ziel: Die letzten drei Schritte des Funnels (Roadmap, Lead-Capture, Ergebnis) so bauen, dass sie wirklich verkaufen — nach dem Hormozi-Prinzip: konkretes Ergebnis, Zeitrahmen, Aufwand runter, Risiko runter, Beweis sichtbar.

## 1. Lead-Capture-Schritt (aktuell: „Wohin soll ich deinen Plan schicken?")

- Instagram-Feld raus, **WhatsApp-Nummer** rein (Pflichtfeld, mit Ländervorwahl-Hinweis „+49 …", Validierung auf Ziffern/Plus, Speicherung im Funnel-State statt `instagram`).
- Grund für die Nummer direkt darunter nennen: „Ich schicke dir deinen Plan per WhatsApp — kein Newsletter, keine Werbung."
- Seite wertiger: Karte weg, Felder direkt auf der Fläche mit großzügigem Abstand, größere Serif-Headline, links Formular / rechts (ab `lg`) ein kompakter „Das bekommst du gleich"-Block mit drei Punkten (dein 12-Wochen-Plan, deine Zahlen, freier Termin).
- Vertrauenszeile unter dem Button: kein Spam, jederzeit abmeldbar, Daten bleiben bei uns.

## 2. Ergebnisseite (der eigentliche Fix)

Statt vier nackter Kacheln eine echte Auswertungs-Seite in dieser Reihenfolge:

1. **Deine Diagnose** — personalisiert: Nische, Startpunkt, was dir konkret fehlt (abgeleitet aus Reichweite / Posting / Skill / Zeit), formuliert als klarer Engpass-Satz.
2. **Deine Zahlen** — Score, Views-Potenzial pro Monat, Preis × Käufer = Monatspotenzial, mit einer Zeile, wie sich die Zahl zusammensetzt (Rechenweg sichtbar = glaubwürdig).
3. **Der Beweis** — die vorhandenen Proof-Bilder aus der alten Homepage (1,5 Mio. Views → 6,9 Mio. Views → Stripe-Zahlungen) als kompakte Dreier-Reihe mit Captions.
4. **Die TCS-Methode** — die drei Schritte aus der alten Homepage in Kurzform, damit klar ist, *wie* das Ergebnis entsteht.
5. **Das Programm in 12 Wochen** — Fundament / Produkt / Verkauf, je zwei Zeilen, nicht die volle Roadmap doppeln.
6. **Was du im Gespräch bekommst** — konkrete Liste inkl. „auch wenn wir nicht zusammenarbeiten" (Risk Reversal) und Laura-Portrait.
7. **Termin buchen** — Cal.com-Embed, direkt darüber „30 Minuten, kostenlos, kein Verkaufsdruck".
8. **Einwände** — vier kurze FAQ-Zeilen (keine Reichweite, keine Idee, keine Zeit, schon versucht) aus der alten Homepage-Logik.
9. Abschluss: alternativer Weg über /apply.

Inhalte kommen aus der archivierten alten Homepage (`src/archive/OldHome.tsx.bak`) und den vorhandenen Proof-Assets — keine neuen Zahlen erfinden.

## 3. Roadmap-Schritt davor

Kürzen, damit die Ergebnisseite nicht doppelt wirkt: pro Phase drei statt vier Punkte und ein Ergebnis-Satz („Nach Woche 4 hast du …"). CTA-Text auf „Weiter zu deiner Auswertung".

## Technisches

- `src/funnel-content/FunnelContext.tsx`: Feld `instagram` → `whatsapp` (inkl. Default und Persistenz).
- `src/funnel-content/steps/finish.tsx`: Lead-Formular und Ergebnisseite neu aufgebaut.
- `src/funnel-content/steps/plan.tsx`: Roadmap gestrafft.
- Proof-Assets: bestehende `proof-views-7m`, `proof-views-15m`, `proof-stripe` Pointer wiederverwenden.
- Tracking-Events und Cal.com-Embed bleiben unverändert, Design-System (Serif, Cream/Wine, `.rv`) bleibt gleich.
