import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "src",
  // This tells Vite to use the Tailwind v4 plugin
  plugins: [tailwindcss()],
});
