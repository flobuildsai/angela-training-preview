# Website-Claim-Funnel und visuelles Upgrade

## Umfang
- Neue Seiten `/website` und `/website/danke` mit der vorgegebenen deutschen Copy aus `src/config/funnel/website.ts`.
- `/website` als hochwertige, fotografische Longform-Seite: bildfüllender Einstieg, klare redaktionelle Abschnitte, Karten, Value Stack, Fotoband, Schritte, ehrliche Erklärung, Laura-Proof, FAQ und Abschluss-CTA.
- Einheitliches zweistufiges Opt-in als Modal für alle CTAs, inklusive Fokusfalle, Tastatur-/Backdrop-Schließen, Validierung, Ladezustand und mobiler Sticky-CTA.
- `/website/danke` mit nächstem Ablauf, Video-Platzhalter, Telefonnummer aus der Konfiguration und optionalem Kalender.
- `/free` erhält denselben fotografischen Einstieg und ein Modal statt des Formulars im Einstieg; bestehender Datenfluss und bestehende Texte bleiben erhalten.

## Daten und Integrationen
- Website-Claims werden mit Quelle `website_claim`, UTM-Daten und Telefonnummer über den bestehenden Lead-Weg gespeichert.
- Für den Lead wird in Close eine Rückruf-Aufgabe mit 24-Stunden-Fälligkeit erstellt; keine Opportunity.
- Der Kontakt wird der in `BREVO_WEBSITE_LIST_ID` konfigurierten Brevo-Liste mit VORNAME, WHATSAPP und QUELLE hinzugefügt.
- Fehler einzelner externer Dienste werden protokolliert, blockieren aber weder Erfolg noch Weiterleitung.
- Die vier vorgegebenen Tracking-Ereignisse werden über den bestehenden Tracking-Platzhalter ausgelöst, ohne dessen Implementierung zu verändern.

## Gestaltung
- Größtes geeignetes vorhandenes Laura-Foto für den Einstieg, zweites Foto beziehungsweise anderer Ausschnitt für das Fotoband.
- Creme/Weiß-Rhythmus, 12-Spalten-Aufbau, linke Ausrichtung, definierte Abstände und Typografie, dezente einmalige Scroll-Reveals und Karten-Hover gemäß Brief.
- Fehlende Werkzeuglogos werden als schlichte monochrome Platzhalter ergänzt.
- Keine künstliche Verknappung, Pop-ups beim Verlassen, Illustrationen oder Emojis in Überschriften.

## Prüfung
- Typecheck und automatischer Build müssen fehlerfrei sein.
- Desktop und Mobil werden visuell auf Überläufe, Modalbedienung, Fokus, Sticky-CTA und Seitenrhythmus geprüft.
- Ein echter Test-Opt-in prüft Speicherung, Weiterleitung und Danke-Seite; der Testdatensatz wird anschließend entfernt.
