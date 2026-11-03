import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const srcRoot = resolve(projectRoot, "src");

export default defineConfig({
  root: srcRoot,

  envDir: resolve(projectRoot),

  plugins: [
    {
      name: "inject-global-script",

      transformIndexHtml() {
        return {
          tags: [
            {
              tag: "script",
              attrs: {
                type: "module",
                src: "/js/scripts/global.js",
              },
              injectTo: "head",
            },
          ],
        };
      },
    },
  ],

  build: {
    outDir: resolve(projectRoot, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(srcRoot, "index.html"),
        signIn: resolve(srcRoot, "sign-in/index.html"),
      },
    },
  },
});
