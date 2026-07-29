## Ziel

Die komplette Masterclass-Seite (`/masterclass`) wird nach dem Aufbau einer klassischen Long-Form-VSL-Seite umgebaut, wie sie coursecreator.co nutzt, aber visuell und sprachlich im ruhigen, femininen Editorial-Look von angelagiakas.com. Alles zieht auf ein Ziel: Strategiegespräch buchen für Early Access.

Wichtig: Die gezeigte fremde Copy dient nur als Struktur- und Tonalitätsvorlage. Geschrieben wird komplett neu, auf Deutsch, in Lauras Ich-Stimme, ohne fremde Zahlen, Screenshots oder Behauptungen.

## Neue Seitenstruktur

```text
1  Hero            kurze Headline, eine Unterzeile, Video 1, ein CTA
2  Vertrauenszeile Marquee bleibt
3  Das Problem     verdichtet, weniger Text, ein starkes Zitat
4  Was du bekommst klare Liste statt Fließtext (Early Access Programm)
5  Video 2         Einblick in die Methode
6  Die TCS-Methode bleibt, nur straffer und ohne Nummernwust
7  Für wen         zwei Spalten: passt / passt nicht
8  Ablauf          12 Wochen, kompakte Timeline
9  Proof           bleibt guarded, nur echte Inhalte
10 Video 3 + Call  Early-Access-Sektion mit klarem CTA
11 Lauras Story    lange Erzählung im Sander-Aufbau (siehe unten)
12 FAQ             bleibt, leicht gekürzt
13 PS              persönliche Schlussnote
14 Footer          unverändert
```

Der Block "Drei Wege, mit Content Geld zu verdienen" entfällt ersatzlos. Die Sektionsnummern werden neu durchgezählt.

## Anfang der Seite

**Hero:** Headline kürzer und konkreter, darunter genau eine kursive Unterzeile, dann sofort Video 1, direkt darunter ein einzelner CTA. Kein zweiter Button, keine Aufzählung von Trust-Punkten im ersten Viewport. Video bleibt im ersten Blickfeld.

**Problem:** Von drei Absätzen auf zwei kurze runter, plus das Zitat. Weniger Erklärung, mehr Wiedererkennung.

**Was du bekommst:** Neu. Direkt nach dem Problem, damit früh klar ist, worum es geht. Eine ruhige Liste mit Haarlinien statt Karten, gegliedert in Programm, Begleitung, Werkzeuge. Kein Preis, Zugang läuft über das Gespräch.

## Lauras Story (Erzählbogen)

Schmale Lesespalte, kurze Absätze, viel Luft, dazwischen große Bilder mit kursiver Bildunterschrift.

```text
Anrede und Versprechen einer kurzen Geschichte
  ↓  Bild: Laura beim Arbeiten
Vorher: Reichweite, aber kein Business
  ↓
Der Wendepunkt: aufhören, auf Views zu optimieren
  ↓  Bild: Laura unterwegs
Was sich verändert hat: Angebot, Struktur, Freiheit
  ↓  Platzhalter für echten Proof, sobald vorhanden
Warum ich das weitergebe: Creating Society
  ↓
Für wen das gedacht ist
  ↓
CTA: Strategiegespräch buchen
```

## PS-Sektion

Greift die stille Frage der Leserin auf ("Warum gibst du das dann überhaupt weiter?") und beantwortet sie ehrlich in Lauras Worten, plus Hinweis auf die begrenzte erste Gruppe und abschließender CTA.

## Early-Access-Rahmen

Call-Sektion und untere CTAs werden auf Early Access gedreht: die erste Gruppe ist begrenzt, der Zugang läuft über das Gespräch. Buttonlabel bleibt "Strategiegespräch buchen", Ziel weiterhin `/call`.

## Design

- Ruhiger Wechsel zwischen Creme, Weiß und der dunklen Wine-Sektion für die Methode
- Serif-Headlines (Cormorant Garamond), kursive Akzentzeilen, viel Weißraum
- Keine Karten mit harten Rahmen, stattdessen Haarlinien und Typografie
- Bilder groß, abgerundet, mit kleiner kursiver Caption
- Bestehende `rv`-Reveal-Animationen und Utilities bleiben
- Keine Em-Dashes, keine AI-typischen Floskeln, keine erfundenen Zahlen

## Technisch

Nur `src/routes/masterclass.tsx` wird angefasst. Vorhandene Imports (`lauraImg`, `workImg`, `walkImg`) und Komponenten (`CallButton`, `VideoBlock`, `SectionIndex`, `Marquee`, Accordion) werden wiederverwendet. Keine neuen Abhängigkeiten, keine Änderungen an Homepage, `/call`, `/apply` oder am Design-System.

## Offen

Falls du echte Proof-Screenshots hast, baue ich sie an den vorgesehenen Stellen ein. Ohne die bleiben dort dezente Platzhalter, die den Lesefluss nicht stören.
