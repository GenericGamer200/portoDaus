import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  assetsInclude: ["**/*.glb"], // biar Vite ngerti kalo file .glb itu aset yang harus diproses, jadi nanti pas diimport di script.js bisa dapet path yang bener
  // This tells Vite to use the Tailwind v4 plugin
  plugins: [tailwindcss()],
});
