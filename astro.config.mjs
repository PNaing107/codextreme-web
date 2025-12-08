import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // GitHub Pages configuration
  base: "/codextreme-web/",
  site: "https://PNaing107.github.io",
  output: "static",
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
});
