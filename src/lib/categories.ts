import { getCollection } from 'astro:content';

// Reihenfolge = Reihenfolge in der Navigation
export const CATEGORIES = [
  { name: 'Laufen', intro: 'Trainingspläne, Laufschuhe und Tipps vom Halbmarathon bis zum Marathon.' },
  { name: 'Rad', intro: 'Rennrad, Rollentraining und Indoor-Setup – für Grundlage und Triathlon.' },
  { name: 'Schwimmen', intro: 'Technik, Ausrüstung und Training im Becken und im Freiwasser.' },
  { name: 'Triathlon', intro: 'Auf dem Weg zum IRONMAN 70.3: Planung, Wechsel und Rennen.' },
  { name: 'Hybrid-Training', intro: 'Mehrere Sportarten, ein Plan: Periodisierung, Kraft und Alltag.' },
  { name: 'Ausrüstung', intro: 'Ausrüstung, die ich selbst nutze – mit Daten, Vor- und Nachteilen.' },
  { name: 'Ernährung', intro: 'Ernährung und Supplements – sachlich, mit Quellen und ohne Wunderversprechen.' },
] as const;

export const catSlug = (name: string) =>
  name.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const catUrl = (name: string) => `/kategorie/${catSlug(name)}`;

export async function getPosts() {
  return (await getCollection('artikel', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title, 'de'),
  );
}

// Nur Kategorien mit mindestens einem Artikel (leere Seiten vermeiden)
export async function getActiveCategories() {
  const posts = await getPosts();
  return CATEGORIES.map((c) => ({ ...c, slug: catSlug(c.name), url: catUrl(c.name), count: posts.filter((p) => p.data.category === c.name).length }))
    .filter((c) => c.count > 0);
}
