// Erzeugt das Logo-Set in public/brand/. Aufruf: node scripts/brand.mjs
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';

const L = '#c8f04b', D = '#14181f', W = '#f6f5f1';
const font = readFileSync('node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff');

// Bildmarke: H mit Puls-Linie als Querstrich (viewBox 512)
export const markPaths = (color) => `<g stroke="${color}" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <path d="M138 128V384M374 128V384" stroke-width="58"/>
  <path d="M138 262H194L230 188L282 334L318 262H374" stroke-width="36"/></g>`;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
const icon = (rx = 112) => svg(512, 512, `<rect width="512" height="512" rx="${rx}" fill="${D}"/>${markPaths(L)}`);
const png = (s, width) => new Resvg(s, { fitTo: { mode: 'width', value: width }, background: 'rgba(0,0,0,0)' }).render().asPng();
const out = (name, data) => writeFileSync(`public/brand/${name}`, data);

// 1) App-Icon (abgerundet)
out('hybrid-lab-icon.svg', icon());
out('hybrid-lab-icon-1024.png', png(icon(), 1024));
// 2) Profilbild Instagram/Pinterest (vollflächig, kreis-sicher)
const profile = svg(1080, 1080, `<rect width="1080" height="1080" fill="${D}"/><g transform="translate(540 540) scale(1.55) translate(-256 -256)">${markPaths(L)}</g>`);
out('hybrid-lab-profilbild-1080.png', png(profile, 1080));
// 3) Bildmarke freigestellt (für Overlays auf Fotos/Pins)
out('hybrid-lab-zeichen-lime.svg', svg(512, 512, markPaths(L)));
out('hybrid-lab-zeichen-lime-1024.png', png(svg(512, 512, markPaths(L)), 1024));
out('hybrid-lab-zeichen-dunkel-1024.png', png(svg(512, 512, markPaths(D)), 1024));

// 4) Logo quer: Zeichen + Schriftzug (Text als Pfade via satori)
async function lockup({ bg, text, mark, accentBg, accentText }) {
  const markUri = 'data:image/svg+xml;base64,' + Buffer.from(svg(512, 512, (mark.box ? `<rect width="512" height="512" rx="112" fill="${mark.box}"/>` : '') + markPaths(mark.color))).toString('base64');
  const el = { type: 'div', props: { style: { width: 1800, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 56, background: bg ?? 'transparent', fontFamily: 'SG' }, children: [
    { type: 'img', props: { src: markUri, width: 360, height: 360 } },
    { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: 30, fontSize: 190, fontWeight: 700, color: text, letterSpacing: -4 }, children: [
      { type: 'span', props: { children: 'Hybrid' } },
      { type: 'span', props: { style: { background: accentBg, color: accentText, padding: '0 34px 8px', borderRadius: 36 }, children: 'Lab' } },
    ] } },
  ] } };
  return satori(el, { width: 1800, height: 600, fonts: [{ name: 'SG', data: font, weight: 700 }] });
}
const variants = {
  'logo-dunkel': { bg: D, text: W, mark: { color: L }, accentBg: L, accentText: D },
  'logo-hell': { bg: W, text: D, mark: { color: L, box: D }, accentBg: L, accentText: D },
  'logo-transparent-fuer-dunkel': { text: W, mark: { color: L }, accentBg: L, accentText: D },
  'logo-transparent-fuer-hell': { text: D, mark: { color: L, box: D }, accentBg: L, accentText: D },
};
for (const [name, v] of Object.entries(variants)) {
  const s = await lockup(v);
  out(`hybrid-lab-${name}.svg`, s);
  out(`hybrid-lab-${name}.png`, png(s, 1800));
}
console.log('Brand-Set erzeugt');
