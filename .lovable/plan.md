# Neuer Funnel unter /content

Ein eigenständiger, mehrstufiger Funnel unter der Route `/content` — Schritt-für-Schritt aufgebaut wie der Property-Funnel aus dem Referenzprojekt, aber komplett auf Creator zugeschnitten. Ziel am Ende: Strategiegespräch buchen (Cal.com) bzw. `/apply`.

## Ablauf (13 Schritte)

1. **Hero / Einstieg** — Kurze Ich-Perspektive von Laura (3 Mio. Views, kaum Einnahmen → eigenes Produkt). Einstiegsfrage statt "Stadt": **"Worüber postest du (oder würdest du gerne posten)?"** — Freitextfeld mit Vorschlags-Chips (Fitness & Gesundheit, Beauty, Mindset, Business, Reisen, Mode, Food, Beziehung, Finanzen, Kreatives …).
2. **Analyse-Animation** — "Ich schaue mir deine Nische an" mit vier durchlaufenden Status-Zeilen; erzeugt aus der gewählten Nische ein Nischen-Profil (Nachfrage, typische Angebotsarten, realistische Preisspanne, Beispiel-Formate). Alles lokal aus einer Nischen-Tabelle, kein Warten auf externe Daten. Unbekannte Freitext-Nischen laufen auf ein sinnvolles Standardprofil.
3. **Reichweite** — Aktuelle Follower / Views (Auswahlbereiche, 0 ist ausdrücklich okay).
4. **Content-Status** — Wie oft postest du aktuell? (gar nicht / unregelmäßig / 1–2x Woche / fast täglich)
5. **Skill / Angebot** — Was kannst du oder was fragen Leute dich? (Wissen weitergeben, 1:1 begleiten, Community, digitales Produkt, "weiß ich noch nicht")
6. **Sichtbarkeit & Zeit** — Zeigst du dich vor der Kamera? Wie viele Stunden pro Woche hast du?
7. **Ernsthaftigkeit** — Wie schnell willst du starten (Skala) — trennt Interessierte von Umsetzern.
8. **Opportunity Score** — Persönlicher Score aus den Antworten mit Nischen-Kennzahlen ("So steht dein Ausgangspunkt").
9. **Belief-Shift** — Vier Mythen durchgestrichen + Realität daneben (keine Million Follower, kein fertiges Produkt, keine Agentur, kein Perfektionismus). Copy aus Homepage/Masterclass übernommen.
10. **Einkommens-Rechner** — Interaktiv: Angebotspreis (Slider/Presets: 97 € / 297 € / 697 € / 1.997 € / 3.997 €), Käufer pro Monat, Conversion-Annahme aus Reichweite. Ergebnis: Monatsumsatz, Jahresumsatz, "so viele Käufer brauchst du für 10.000 € im Monat". Werte anpassbar.
11. **12-Wochen-Roadmap** — Drei Phasen (Fundament → Produkt → Verkauf) mit Wochenblöcken, dynamisch beschriftet mit der gewählten Nische und dem Angebotstyp.
12. **Lead-Capture** — Vorname, E-Mail, Instagram-Handle mit Validierung. Ohne Backend: Speicherung in sessionStorage + `trackEvent`, TODO-Kommentar für spätere Anbindung.
13. **Ergebnis / Call-Buchung** — Zusammenfassung der persönlichen Zahlen, was im Gespräch passiert, eingebetteter Cal.com-Kalender (bestehende `CalendlyEmbed` + `CALENDLY_URL`), sekundärer Link auf `/apply`.

## Design & Verhalten

- Bestehendes Design-System unverändert: Cormorant-Serif-Headlines, Inter, Schwarz/Weiß mit Wine/Cream/Rose-Akzenten, `pill` / `eyebrow` / `serif-italic` Utilities.
- Sticky Top-Bar mit Wortmarke und dünner Fortschrittsleiste (Anteil aktueller Schritt), Zurück-Link, Scroll-to-Top bei Schrittwechsel, sanfte Step-Einblendung.
- Voll responsiv, Touch-Targets ≥ 56 px, mobil einspaltig.
- Sprache: Deutsch (passend zu Homepage und `/call`).
- Bestehende Fotos von Laura werden in Hero, Belief-Shift und Ergebnis eingesetzt.

## Technisches

- Neue Route `src/routes/content.tsx` als schlanke Route-Datei mit `head()`-Metadaten.
- Funnel-Code in `src/funnel-content/`: `FunnelContext.tsx` (State + sessionStorage-Persistenz), `FunnelLayout.tsx`, `niches.ts` (Nischen-Profile & Rechenannahmen) und ein `steps/`-Ordner mit je einer Datei pro Schritt.
- Rein clientseitig, keine Datenbank, keine Server-Funktionen; `trackEvent` an den Schlüsselstellen (Start, jeder Schritt, Lead, Call-View).
- `/quiz`, `/`, `/masterclass`, `/call`, `/apply` bleiben unverändert.
