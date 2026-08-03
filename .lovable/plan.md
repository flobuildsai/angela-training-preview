## Ziel

Die Programm-Sektion auf der Startseite (`#society`) wirkt aktuell wie drei nackte Textzeilen: „Woche 1–4 / 5–8 / 9–12“, untereinander mit Trennlinien. Das ist inhaltsarm und sieht auf dem Handy nach Fließtext aus. Aus dem PDF-Curriculum kennen wir jetzt den echten Inhalt des Programms, den wir stattdessen zeigen.

Nur `src/routes/index.tsx` wird angefasst.

## Neuer Aufbau der Sektion

**Intro bleibt sinngemäß**, wird leicht gestrafft: was Creating Society ist und wohin es führt (eigenes digitales Produkt, verkauft über deinen Content).

**Statt der drei Wochenzeilen: das Curriculum in drei Phasen mit echten Modulen.** Jede Phase ist ein eigener Block mit großer Ziffer, Phasentitel, einem Satz Ergebnis und darunter die Module als kompakte Zeilen. Inhalte aus dem PDF:

```text
01  Fundament
    Mindset und Unternehmer 1x1
    Nische und perfekte Kundin finden
    Ziele und eigene Roadmap
    Ergebnis: Du weißt, was du verkaufst und an wen.

02  Produkt
    Dein digitales Produkt wählen (Kurs, Guide, Masterclass, Templates, Membership)
    Branding: Name, Logo, Farben
    Produkt aufbauen und fertigstellen
    Ergebnis: Dein Angebot existiert und ist verkaufbar.

03  Verkauf
    Social Media Bootcamp
    Storytelling und Vertrauen aufbauen
    Pre-Launch und Testphase
    Passiv verkaufen und Affiliate
    Ergebnis: Deine ersten zahlenden Kundinnen.
```

**Layout**
Desktop: dreispaltiges Raster, dünne senkrechte Linien dazwischen, Ziffer groß in Serif, Module als schmale Liste mit feinen Trennlinien. Mobil: gestapelt, Ziffer und Phasentitel in einer Zeile, Module darunter, deutlich gesetzte Abstände, damit es nicht mehr wie ein Absatz aussieht.

**Danach** die bestehende Zeile „funktioniert auch ohne große Reichweite, auf Wunsch faceless“ und der CTA bleiben.

## Was gleich bleibt

- Design-System: Farben, Cormorant-Headlines, `rv`-Animationen, schwarzer CTA-Button
- Alle anderen Sektionen der Startseite unverändert
- `/masterclass`, `/call`, `/apply` und Legal-Seiten unverändert
- Keine Preise, keine Em-Dashes, keine erfundenen Zahlen

## Offen

Die Wochen-Angaben (1–4, 5–8, 9–12) kann ich pro Phase als kleines Label behalten oder ganz weglassen. Vorschlag: behalten, weil es Struktur gibt, aber nur als feines Label über dem Phasentitel.
