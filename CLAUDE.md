# hybrid-lab.org

Astro-Website (statisch), deployt per GitHub Actions auf GitHub Pages, Domain hybrid-lab.org (DNS bei united-domains).
Sprache der Seite: Deutsch, Du-Ansprache, Ich-Perspektive des Betreibers.

## Ton: der Bad Guy mit Augenzwinkern
Hybrid Lab ist die ehrliche Gegenseite zu Hochglanz-Fitness-Instagram, wo alles schön und mühelos aussieht.
- Selbstironie und trockener Witz, vor allem in Einstieg, Übergängen und Fazit. Bewährtes Muster: „Auf Instagram sieht das so aus: … Bei mir: …“.
- Der Witz geht auf Kosten des Hochglanz-Genres oder auf eigene Kosten – nie auf Kosten von Anfängern, Langsamen, Körpern oder namentlich genannten Personen und Marken.
- Selbstironie nur über echte Erlebnisse des Betreibers; nichts erfinden. Ohne echtes Erlebnis: allgemeine Beobachtung statt Ich-Anekdote.
- Fakten bleiben ernst: Zahlen, Produktdaten, Sicherheit, Gesundheit, Supplements (HCVO-Regeln unten) und Werbekennzeichnung nicht ins Lächerliche ziehen.
- Augenzwinkern, kein Zynismus: Jeder Artikel muss am Ende trotzdem echt weiterhelfen. Etwa ein bis drei Pointen pro Artikel reichen.

## Neuen Artikel anlegen
- Datei `src/content/artikel/<slug>.md` (Slug = URL, kleingeschrieben, Bindestriche, keine Umlaute).
- Frontmatter (Schema in `src/content.config.ts`): `title`, `description` (≤170 Zeichen, SEO), `date`, `category`
  (Laufen | Rad | Schwimmen | Triathlon | Ausrüstung | Hybrid-Training | Ernährung), `tags`, optional `affiliate: true`, `draft: true`.
- Struktur: kurzer Einstieg, H2-Abschnitte, Fazit. Keine Produkterfahrungen erfinden – nur behaupten, was der Betreiber selbst getestet hat.

## Amazon-Links
- `[Name*](amazon:ASIN)` oder `[Name*](amazon-suche:suchbegriff)`; Affiliate-Links immer mit * markieren und `affiliate: true` setzen.
- In Markdown-Links Leerzeichen im Suchbegriff als `%20` schreiben (`[Lauftights*](amazon-suche:Lauftights%20Herren)`), sonst wird kein Link erzeugt. Im HTML-`href` der Produktbox sind Leerzeichen erlaubt. Nach dem Build prüfen, dass jeder `*`-Link in `dist/` ein `href="https://www.amazon.de…tag=…"` hat.
- Partner-ID zentral in `site.config.mjs` (`AMAZON_TAG`); `plugins/rehype-affiliate.mjs` hängt sie an und setzt rel="sponsored nofollow".
- Produktbox als HTML: `<div class="product"><div class="p-label">…</div><h4>…</h4><ul>…</ul><a class="btn" href="amazon:ASIN">Ansehen* <small>Amazon</small></a></div>`.
- Keine Preise oder Amazon-Bilder fest einbauen (Partnerprogramm-Richtlinien).

## Prüfen & veröffentlichen
`npm run build` muss fehlerfrei durchlaufen; Push auf `main` deployt automatisch.

## Gesundheit & Supplements
- Nur von der EU zugelassene Health Claims verwenden (HCVO); keine Heil-, Leistungs- oder Wirkversprechen darüber hinaus.
- Bei Nahrungsergänzungsmitteln immer Hinweis auf BfR-Höchstmengen und ärztliche Abklärung; keine persönlichen Dosierungsempfehlungen.

## Icons & Vorschaubilder
- Vorschaubilder für Link-Vorschauen entstehen automatisch beim Build (`src/lib/og.ts`, `/og/<slug>.png`) – nichts manuell zu tun.
- Logo-Set (Profilbild, Logos, Bildmarke) liegt in `public/brand/`, erzeugt mit `node scripts/brand.mjs`.
- Favicons/App-Icons: nach Logo-Änderung `node scripts/icons.mjs` ausführen und die Dateien in `public/` committen.

## Kategorien & Navigation
- Kategorien (Reihenfolge, Intro-Text) zentral in `src/lib/categories.ts`; neue Kategorie dort UND im Schema in `src/content.config.ts` ergänzen.
- Kategorieseiten `/kategorie/<slug>` und Header-Navigation entstehen automatisch – nur für Kategorien mit mindestens einem Artikel.
- Startseite zeigt die 5 neuesten Artikel (der neueste groß).
- Zeitstrahl „Road to 70.3“ (Rennen, Status, „Jetzt“-Marker) und die Liste „Im Einsatz, nicht im Regal“ werden in `src/lib/road.ts` gepflegt; nur Ausrüstung eintragen, zu der es einen Erfahrungsbericht gibt.

## Animationen
- Nur `transform`/`opacity` animieren, UI-Bewegungen unter 300 ms, Kurven `--ease-out`/`--ease-in-out` aus `global.css`.
- Hover-Effekte nur im Block `@media (hover: hover) and (pointer: fine)`; jede neue Bewegung braucht eine Variante im `prefers-reduced-motion`-Block.
- Kein Einblenden beim Scrollen, keine Dauerschleifen.
