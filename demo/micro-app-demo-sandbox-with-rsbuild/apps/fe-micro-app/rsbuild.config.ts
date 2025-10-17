import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  output: {
    assetPrefix: "/fe-micro-app/",
  },
  plugins: [pluginReact()],
  server: {
    port: 9001,
    base: "/fe-micro-app/",
  },
  html: {
    template: "./public/index.html",
  },
});
