// Erzeugt Favicons & App-Icons aus der Bildmarke. Aufruf: node scripts/icons.mjs
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';

const L = '#c8f04b', D = '#14181f';
const mark = `<g stroke="${L}" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <path d="M138 128V384M374 128V384" stroke-width="58"/>
  <path d="M138 262H194L230 188L282 334L318 262H374" stroke-width="36"/></g>`;
// kleine Größen: dickere Linien, damit das Zeichen bei 16 px lesbar bleibt
const markSmall = `<g stroke="${L}" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <path d="M132 120V392M380 120V392" stroke-width="76"/>
  <path d="M132 262H192L232 176L282 340L322 262H380" stroke-width="50"/></g>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${body}</svg>`;
const rounded = (m) => svg(`<rect width="512" height="512" rx="112" fill="${D}"/>${m}`);
const full = (scale) => svg(`<rect width="512" height="512" fill="${D}"/><g transform="translate(256 256) scale(${scale}) translate(-256 -256)">${mark}</g>`);
const png = (s, size) => new Resvg(s, { fitTo: { mode: 'width', value: size } }).render().asPng();

writeFileSync('public/favicon.svg', rounded(mark));
writeFileSync('public/apple-touch-icon.png', png(full(1), 180));
writeFileSync('public/icon-192.png', png(rounded(mark), 192));
writeFileSync('public/icon-512.png', png(rounded(mark), 512));
writeFileSync('public/icon-maskable-512.png', png(full(0.72), 512));

const sizes = [16, 32, 48];
const imgs = sizes.map((s) => png(rounded(mark), s));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(imgs[i].length, 8); e.writeUInt32LE(offset, 12); offset += imgs[i].length; return e;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...dir, ...imgs]));
console.log('Icons erzeugt');
