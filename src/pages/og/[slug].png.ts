import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { ogImage } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('artikel', ({ data }) => !data.draft);
  return posts.map((p) => ({ params: { slug: p.id }, props: { title: p.data.title, kicker: p.data.category } }));
};

export const GET: APIRoute = async ({ props }) =>
  new Response(await ogImage({ title: props.title as string, kicker: props.kicker as string }), {
    headers: { 'Content-Type': 'image/png' },
  });
