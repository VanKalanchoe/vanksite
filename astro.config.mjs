// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://vanksite.vankalanchoe.workers.dev",
  output: "server",
  adapter: cloudflare(),
  integrations: [preact(), mdx(), sitemap(), clerk()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@clerk/astro", "@clerk/astro/internal"],
    }
  },

  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    }
  },
});
