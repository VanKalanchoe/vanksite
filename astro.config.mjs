// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "server",
  adapter: cloudflare(),
  integrations: [preact(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    }
  },
});
