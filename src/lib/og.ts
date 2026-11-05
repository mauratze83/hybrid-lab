// Erzeugt Vorschaubilder (1200×630) für Link-Vorschauen (WhatsApp, Pinterest, Slack, Facebook …)
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';

const f = (p: string) => readFileSync(new URL(`../../node_modules/${p}`, import.meta.url));
const fonts = [
  { name: 'Space Grotesk', data: f('@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff'), weight: 700 as const },
  { name: 'Inter', data: f('@fontsource/inter/files/inter-latin-500-normal.woff'), weight: 500 as const },
];

const markUri = 'data:image/svg+xml;base64,' + Buffer.from(readFileSync(new URL('../../public/brand/hybrid-lab-zeichen-lime.svg', import.meta.url))).toString('base64');
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export async function ogImage({ title, kicker }: { title: string; kicker: string }) {
  const size = title.length > 70 ? 58 : title.length > 45 ? 68 : 80;
  const tree = h('div', {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    padding: '64px 72px', background: '#14181f', color: '#f6f5f1', fontFamily: 'Inter',
  }, [
    h('div', { display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Space Grotesk', fontSize: 40, fontWeight: 700 }, [
      { type: 'img', props: { src: markUri, width: 64, height: 64 } },
      h('span', {}, 'Hybrid'),
      h('span', { background: '#c8f04b', color: '#14181f', padding: '2px 14px', borderRadius: 10 }, 'Lab'),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
      h('div', { display: 'flex', fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: '#c8f04b' }, kicker),
      h('div', { display: 'flex', fontFamily: 'Space Grotesk', fontSize: size, fontWeight: 700, lineHeight: 1.08, maxWidth: 1050 }, title),
    ]),
    h('div', { display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#a5abb5' }, [
      h('span', {}, 'hybrid-lab.org'),
      h('span', {}, 'Marathon · Triathlon · Ausrüstung'),
    ]),
  ]);
  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
