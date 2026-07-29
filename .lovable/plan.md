## Ziel

Die Startseite (`/`) wirkt oben zu leer, die zwei grauen Boxen unter dem Hero passen nicht zum editorialen Look, und der Button ist seit dem letzten Schritt burgunderrot statt schwarz. Das wird zurück auf die ruhige Schwarz-Weiß-Linie gebracht.

## 1. Akzentfarbe zurück auf Schwarz

- Der Token `--wine-accent` (aktuell `#722F37`) wird wieder auf Near-Black (`#0E0E0E`) gesetzt.
- Damit sind alle primären CTA-Buttons (Startseite, Call-Seite, Masterclass) wieder schwarz mit weißer Schrift, ohne dass jede Datei einzeln angefasst werden muss.
- Die Eyebrow über der Headline verliert die rote Farbe und wird in gedecktem Grau (`--muted-fg`) gesetzt, damit oben nur ein Farbton dominiert: Schwarz auf Weiß.

## 2. Hero: weniger Weißraum, klarer Rhythmus

- Der leere Platzhalter-Block unter dem Hero (`h-40` auf Mobile) wird entfernt. Er ist der Hauptgrund für die große leere Fläche im Screenshot.
- Die Mindesthöhe wird von 88/90vh auf ca. 78vh (mobil) bzw. 82vh (Desktop) reduziert, sodass der Hero die erste Ansicht füllt, aber nicht künstlich streckt.
- Abstände innerhalb des Hero werden zu einer klaren Staffel: Eyebrow → Headline (enger), Headline → kursive Subline (mittel), Subline → Fließtext (mittel), Fließtext → Button (etwas größer). Statt vieler großer Sprünge entsteht ein ruhiger Absatzfluss.
- Der Fließtext bekommt eine etwas breitere Textspalte, damit er nicht in viele kurze Zeilen bricht.
- Unter dem Button eine feine, kleine Zeile in Grau („Kostenlos und unverbindlich, 30 bis 45 Minuten“), damit der Hero unten nicht abrupt endet.

## 3. Reframe-Block: Boxen raus, Typografie rein

Die zwei Karten mit Rahmen, grauer Fläche und Ring werden ersetzt durch eine editoriale Gegenüberstellung im Stil der restlichen Seite:

```text
─────────────────────────────────────────────
WAS ALLE DENKEN            WAS WIRKLICH FUNKTIONIERT
Viral gehen, Follower      Eigenes Angebot bauen,
sammeln, auf Brand         Content, der verkauft,
Deals hoffen               erste Kundinnen in 12 Wochen
─────────────────────────────────────────────
```

- Zwei Spalten, getrennt nur durch eine Haarlinie (auf Mobile untereinander mit Trennlinie dazwischen), keine Kacheln, kein Grau-Hintergrund, kein Ring.
- Linke Spalte in Grau und weiterhin durchgestrichen, rechte Spalte in Schwarz und in Serif-Schrift, damit der Kontrast über Typografie statt über Boxen entsteht.
- Pfeile werden durch Kommas bzw. dezente Trennzeichen ersetzt, damit die Zeilen mobil nicht unschön umbrechen.
- Sektionsabstände oben/unten angeglichen an die übrigen Sektionen (ruhiger, aber nicht leer).

## 4. Feinschliff

- Prüfung der Übergänge Hero → Reframe → Belief-Shift, damit die Abstände zwischen den ersten drei Sektionen gleichmäßig wirken.
- Kontrolle auf Mobile (402px) und Desktop, dass der Hero ohne Scrollen vollständig lesbar ist und der Reframe-Block knapp darunter beginnt.

## Nicht Teil dieser Änderung

- Copy der übrigen Sektionen, Methode, Programm, FAQ, Laura-Sektion bleiben unverändert.
- Routen `/masterclass`, `/call`, `/apply` und die Legal-Seiten bleiben strukturell unverändert (übernehmen nur automatisch den schwarzen Button).
