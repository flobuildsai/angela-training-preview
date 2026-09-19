# Design-System, Funnel-Bausteine und Rechtliches

## Ziel
Das bestehende Erscheinungsbild wird auf das neue TCS-System umgestellt. Die vorhandenen Free-Kurs-Seiten behalten ihre Inhalte, Abläufe und Zugangslogik. Es entstehen ausschließlich die angeforderten gemeinsamen Bausteine und die beiden vorhandenen Rechtsseiten werden neu aufgebaut.

## Umsetzung

### 1. Globales TCS-Design-System
- `src/index.css` als zentrale Token-Datei mit Farben, Typografie, Größen, Abständen, Radien und dem einzigen Schatten anlegen.
- Die Tokens über `src/styles.css` laden und in Tailwind v4 spiegeln; bestehende semantische Variablen werden auf die neuen Werte abgebildet, damit auch nicht überarbeitete Seiten konsistent bleiben.
- Inter Tight 500 und Inter 400/500/600 über den zentralen Dokumentkopf laden. Das Projekt besitzt keine klassische HTML-Startdatei; der TanStack-Dokumentkopf ist hier die technisch korrekte Entsprechung.
- Cream Paper als Seitenfläche, Weiß für Karten, Pressed Graphite für Hauptbuttons und Ember ausschließlich als Punkt/Statusindikator verwenden.
- Bestehende Reveal-Animationen beibehalten, aber auf die neue reduzierte Bewegungssprache abstimmen.

### 2. Gemeinsame Funnel-Bausteine
Unter `src/components/funnel/` entstehen:
- `FunnelShell` mit Wortmarke, optionaler Aktion, 1120px Inhaltsbreite, großzügigem Abschnittsrhythmus und gemeinsamem Rechtsfooter inklusive optionalem Partnerlink-Hinweis.
- `Hero`, `VimeoEmbed`, `LeadForm`, `LogoRow`, `CardGrid`, `ValueStack`, `Steps`, `ProofBlock`, `Testimonials`, `FAQ`, `StickyCTA` und `HonestBox` mit den beschriebenen responsiven Zuständen.
- Formulare erhalten zugängliche Beschriftungen, Inline-Fehler, Lade-/Sperrzustand und Telefonnummern-Normalisierung für DE/AT/CH mit `+49` als Standard.
- Die Komponenten enthalten nur unvermeidbare UI-Zustände; Seiteninhalte werden später aus `src/config/funnel/*.ts` geliefert.

### 3. Bestehender Free-Funnel
- `/free`, `/free/willkommen`, `/kurs` und die zugehörige Lektionsansicht visuell auf Cream Paper, weiße 20px-Karten, neue Typografie, 8px-Hauptbuttons, 12px-Eingaben und Ember-Statuspunkte umstellen.
- Struktur, Text, Freischaltung, Opt-in, WhatsApp, Tracking und Kurslogik unverändert lassen.
- Gemeinsame Free-Header/Footer, Formular, Kurs-Mockup und unterstützende Karten auf die neuen Tokens abstimmen.

### 4. Rechtliches und Einwilligung
- `/impressum` mit `FunnelShell` und den geforderten Abschnitten neu strukturieren; fehlende Angaben bleiben klar markierte Platzhalter.
- `/datenschutz` mit allen genannten Diensten, Zwecken und Rechten neu strukturieren; fehlende Betreiber-/Dienstangaben bleiben Platzhalter und werden nicht erfunden.
- Eine globale Cookie-Leiste mit „Akzeptieren“ und „Nur notwendige“ ergänzen und die Wahl lokal speichern.
- Eine kleine Consent-Hilfe bereitstellen, über die Meta Pixel nur nach Zustimmung initialisiert werden kann. Der bestehende Tracking-Platzhalter bleibt unangetastet; aktuell ist kein Meta-Pixel-Code vorhanden.

## Technische Details
- Keine neuen Seiten außer `/impressum` und `/datenschutz`.
- Keine Änderungen an Close, Brevo, CoursePlayer oder dem Tracking-Platzhalter.
- Vorhandene Design-System-Buttons werden für interaktive Aktionen verwendet bzw. auf das neue Token-System angepasst.
- Jede Inhaltsseite behält bzw. erhält vollständige eigene Metadaten.
- Abschließend: Typecheck, aktueller Build-Status sowie visuelle Prüfung von `/free`, `/free/willkommen`, `/kurs`, `/impressum` und `/datenschutz` auf Desktop und Mobilgerät.
