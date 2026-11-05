// Wandelt Kurz-Links in Amazon-Affiliate-Links um:
//   [Produkt*](amazon:B0ABC12345)        → https://www.amazon.de/dp/B0ABC12345?tag=…
//   [Suche*](amazon-suche:smart trainer) → https://www.amazon.de/s?k=smart+trainer&tag=…
// Funktioniert für Markdown-Links und für rohes HTML (Produktboxen).
// Setzt rel="sponsored nofollow noopener" + target="_blank".
import { AMAZON_TAG } from '../site.config.mjs';

const REL = 'sponsored nofollow noopener';

export function resolveAmazon(href) {
  let url;
  if (href.startsWith('amazon:')) {
    url = new URL(`https://www.amazon.de/dp/${href.slice(7).trim()}`);
  } else if (href.startsWith('amazon-suche:')) {
    url = new URL('https://www.amazon.de/s');
    url.searchParams.set('k', decodeURIComponent(href.slice(13)).trim());
  } else if (/^https:\/\/(www\.)?amazon\.de\//.test(href)) {
    url = new URL(href);
  } else return null;
  if (AMAZON_TAG) url.searchParams.set('tag', AMAZON_TAG);
  return url.toString();
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function walk(node, fn) {
  fn(node);
  if (node.children) node.children.forEach((c) => walk(c, fn));
}

export default function rehypeAffiliate() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const url = resolveAmazon(String(node.properties?.href ?? ''));
        if (!url) return;
        node.properties.href = url;
        node.properties.rel = REL.split(' ');
        node.properties.target = '_blank';
      } else if (node.type === 'raw' && typeof node.value === 'string') {
        node.value = node.value.replace(/<a\b([^>]*?)\shref="([^"]+)"([^>]*)>/g, (m, pre, href, post) => {
          const url = resolveAmazon(href.replace(/&amp;/g, '&'));
          if (!url) return m;
          return `<a${pre} href="${escapeAttr(url)}" rel="${REL}" target="_blank"${post}>`;
        });
      }
    });
  };
}
