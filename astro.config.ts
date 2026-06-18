import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://www.casadelaire.es",
  integrations: [sitemap()],
});
