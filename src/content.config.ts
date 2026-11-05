import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['Laufen', 'Rad', 'Schwimmen', 'Triathlon', 'Ausrüstung', 'Hybrid-Training', 'Ernährung']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // true = Artikel enthält Affiliate-Links → Hinweis wird automatisch angezeigt
    affiliate: z.boolean().default(false),
  }),
});

export const collections = { artikel };
