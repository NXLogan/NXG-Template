import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  server: {
    port: 8080,
    strictPort: false,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    ...(command === "build"
      ? [nitro({ preset: "cloudflare_module" })]
      : []),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
}));
