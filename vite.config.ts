import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const githubPages = process.env.NITRO_PRESET === "github_pages";
const ghBase = "/n-rma-artifacts/";

export default defineConfig(({ command }) => ({
  base: githubPages ? ghBase : "/",
  server: {
    port: 8080,
    strictPort: false,
  },
  plugins: [
    tanstackStart(
      githubPages
        ? {
            spa: {
              enabled: true,
            },
            router: {
              basepath: ghBase.replace(/\/$/, ""),
            },
          }
        : {
            server: { entry: "server" },
          },
    ),
    ...(command === "build" && !githubPages
      ? [nitro({ preset: "cloudflare_module" })]
      : []),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
}));
