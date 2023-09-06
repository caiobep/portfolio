import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  integrations: [tailwind(), mdx({ wrap: true }), sitemap()],
})
