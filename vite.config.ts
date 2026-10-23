import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readdirSync } from "node:fs";
// Only filenames are bundled; public photos are served once, without duplicate assets.
const photos = readdirSync(new URL("./public/photos", import.meta.url))
  .filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name))
  .map((name) => `/photos/${name}`);
export default defineConfig({
  base: process.env.DEPLOY_BASE || "/",
  plugins: [react()],
  define: { __PHOTO_PATHS__: JSON.stringify(photos) },
});
