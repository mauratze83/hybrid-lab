// Erzeugt Favicons & App-Icons aus dem Logo. Aufruf: node scripts/icons.mjs
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';

const mark = (pad) => `
  <path d="M${8+pad} ${7+pad}v${18-2*pad}M${8+pad} 16h9M${17} ${7+pad}v${18-2*pad}" stroke="#c8f04b" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  <circle cx="24" cy="${23-pad}" r="2.6" fill="#c8f04b"/>`;
// Vollflächig (für Apple/Android, die selbst abrunden) – Logo etwas kleiner für die Safe-Zone
const full = (scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#14181f"/><g transform="translate(16 16) scale(${scale}) translate(-16 -16)">${mark(0)}</g></svg>`;
const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#14181f"/>${mark(0)}</svg>`;

const png = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

writeFileSync('public/apple-touch-icon.png', png(full(0.8), 180));
writeFileSync('public/icon-192.png', png(rounded, 192));
writeFileSync('public/icon-512.png', png(rounded, 512));
writeFileSync('public/icon-maskable-512.png', png(full(0.7), 512));

// favicon.ico mit eingebetteten PNGs (16, 32, 48)
const sizes = [16, 32, 48];
const imgs = sizes.map((s) => png(rounded, s));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(imgs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += imgs[i].length; return e;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...dir, ...imgs]));
console.log('Icons erzeugt');
