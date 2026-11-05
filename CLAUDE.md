# hybrid-lab.org

Astro-Website (statisch), deployt per GitHub Actions auf GitHub Pages, Domain hybrid-lab.org (DNS bei united-domains).
Sprache der Seite: Deutsch, Du-Ansprache, Ich-Perspektive des Betreibers.

## Neuen Artikel anlegen
- Datei `src/content/artikel/<slug>.md` (Slug = URL, kleingeschrieben, Bindestriche, keine Umlaute).
- Frontmatter (Schema in `src/content.config.ts`): `title`, `description` (≤170 Zeichen, SEO), `date`, `category`
  (Laufen | Rad | Schwimmen | Triathlon | Ausrüstung | Hybrid-Training | Ernährung), `tags`, optional `affiliate: true`, `draft: true`.
- Struktur: kurzer Einstieg, H2-Abschnitte, Fazit. Keine Produkterfahrungen erfinden – nur behaupten, was der Betreiber selbst getestet hat.

## Amazon-Links
- `[Name*](amazon:ASIN)` oder `[Name*](amazon-suche:suchbegriff)`; Affiliate-Links immer mit * markieren und `affiliate: true` setzen.
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
