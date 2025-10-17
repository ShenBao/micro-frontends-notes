import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  output: {
    assetPrefix: "/",
    legalComments: 'none',
    minify: true,
    sourceMap: false, // 👈 关键：关闭 source map
  },
  plugins: [pluginReact()],
  server: {
    port: 9000,
    base: "/",
  },
  html: {
    template: "./public/index.html",
  },
});
