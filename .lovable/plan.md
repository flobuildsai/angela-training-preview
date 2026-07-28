## Ziel

Eine neue, deutschsprachige Landingpage auf `/`, deren einziges Ziel eine Call-Buchung ist — gebaut für Traffic, der direkt aus einem Instagram-Reel kommt. Die aktuelle VSL-Homepage bleibt vollständig erhalten und zieht auf `/masterclass` um.

Design bleibt exakt das bestehende System (wine, cream, cream2, rose, ink, Cormorant Garamond + Inter, pill/eyebrow/serif-italic, .rv Reveals, grain, hero-glow). Keine neue Palette, keine neuen Fonts. Optik orientiert sich am premium-editorialen Look, aber komplett eigenständig aufgebaut.

## Routen-Umbau

```text
src/routes/index.tsx      -> Inhalt wandert nach masterclass.tsx (Pfad-String angepasst)
src/routes/masterclass.tsx -> bisherige VSL-Homepage, unverändert bis auf head() + Route-Pfad
src/routes/index.tsx      -> NEU: Call-Booking-Landingpage (Deutsch)
```

Interne Links, die vorher auf `/` als VSL zeigten (Header-Logo, Footer, /checkout- und /welcome-Rückwege), werden geprüft und auf das richtige Ziel gesetzt. `src/routeTree.gen.ts` wird nicht angefasst — der Generator übernimmt.

## Aufbau der neuen Startseite (alles Deutsch)

1. **Sticky Header** — Wortmarke „Creating Society“ links, rechts ein Button „Call buchen“ (scrollt zum Calendly-Anker). Auf Mobile nur der Button.
2. **Hero, above the fold** — kleine rose Eyebrow, große serifige Headline mit kursivem Akzent, ein Satz Subheadline, primärer CTA „Kostenloses Strategiegespräch buchen“, darunter eine Mikro-Zeile (kostenlos · 30 Min · Zoom). Rechts/darunter Porträtbild mit weichem Glow und Grain-Overlay. Radiale Rose-Glow-Ebene wie im bestehenden System.
3. **Zahlen-Leiste** — vier Kennzahlen, hairline-getrennt, auf wine-Hintergrund. Wird als eine `stats`-Konstante oben in der Datei definiert und zunächst mit klar markierten Platzhalterzahlen befüllt, damit du sie in einer Zeile durch die echten ersetzen kannst.
4. **„Kommt dir das bekannt vor?“** — drei bis vier Schmerzpunkte als asymmetrisches Karten-Raster, nicht mittig, mit großen Randziffern.
5. **Der Weg** — drei Schritte (Positionierung → Reichweite → Angebot & Verkauf) als versetzte Blöcke mit Trennlinien statt Boxen.
6. **Für wen / nicht für wen** — zwei kontrastierende Spalten, qualifiziert vor dem Call und hebt die Call-Qualität.
7. **Was im Call passiert** — drei nummerierte Punkte plus expliziter Satz, dass es kein Verkaufsgespräch mit Druck ist. Direkt darunter zweiter CTA.
8. **Proof-Sektion** — `testimonials`-Array bleibt vorerst leer und die Sektion rendert nur, wenn Einträge existieren (gleiche Schutzlogik wie auf der VSL-Seite, damit nichts Erfundenes live geht).
9. **Über Laura** — Bild plus editorialer Fließtext, kurze Version der Story.
10. **FAQ** — Accordion mit fünf typischen Einwänden (Kosten, Zeit, Follower-Anzahl, Nische, was danach passiert).
11. **Booking-Sektion mit Anker `#call`** — wine-Hintergrund, Headline, kurze Reassurance-Liste, darunter das bestehende `CalendlyEmbed`-Component inline eingebettet.
12. **Footer** — schlicht, mit Link zur Masterclass-Seite (`/masterclass`) und zum Quiz.
13. **Mobile Sticky Bottom Bar** — unter `md` sichtbar, ein Button „Call buchen“, scrollt zu `#call`; blendet aus, sobald die Booking-Sektion im Viewport ist.

## Technische Details

- Alle CTA-Klicks laufen über den bestehenden `trackEvent`-Stub aus `src/lib/track.ts` (`call_cta_click`, `call_section_view`, `calendly_view`).
- `CalendlyEmbed` wird wiederverwendet; die URL kommt weiterhin aus `src/config/calendly.ts`. Das Component bleibt Platzhalter — echtes Widget-Script erst, wenn du den finalen Link gibst.
- Ein neues Porträt-/Editorial-Asset wird generiert, falls die vorhandenen `mentor.jpg` / `opportunity.jpg` nicht passen; sonst Wiederverwendung.
- Eigene `head()`-Metadaten auf beiden Routen: neue deutsche Titel/Description für `/`, die bisherigen englischen wandern mit nach `/masterclass`.
- Jede Sektion bekommt `aria-labelledby`, Bilder Alt-Texte, genau ein `h1`.
- Reveal-Hook und Scroll-Progress-Logik werden aus der bestehenden Seite als geteiltes Hilfsmodul genutzt statt dupliziert.
- Getestet an 375px, 768px und 1440px per Browser-Screenshots.

## Was ich nicht anfasse

`/quiz`, `/apply`, `/waitlist`, `/checkout`, `/welcome` und `src/styles.css` (bis auf eventuell eine ergänzende Utility, falls nötig).
