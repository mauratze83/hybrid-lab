import type { APIRoute } from 'astro';
import { ogImage } from '../../lib/og';

export const GET: APIRoute = async () =>
  new Response(await ogImage({ title: 'Training für Leute, die mehr als eine Sportart lieben.', kicker: 'Marathon · Triathlon · Ausrüstung' }), {
    headers: { 'Content-Type': 'image/png' },
  });
