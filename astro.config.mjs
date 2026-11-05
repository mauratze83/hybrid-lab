import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeAffiliate from './plugins/rehype-affiliate.mjs';

export default defineConfig({
  site: 'https://hybrid-lab.org',
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeAffiliate],
  },
});
