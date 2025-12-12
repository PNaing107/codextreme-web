import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Only use base path for GitHub Pages in production builds
const isProduction = process.env.NODE_ENV === "production" || process.env.CI === "true";

export default defineConfig({
  // GitHub Pages configuration - only use base path in production
  base: isProduction ? "/codextreme-web/" : "/",
  site: "https://PNaing107.github.io",
  output: "static",
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
});
