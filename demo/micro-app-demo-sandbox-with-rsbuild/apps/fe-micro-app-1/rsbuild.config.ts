import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  output: {
    assetPrefix: "/fe-micro-app-1/",
  },
  plugins: [pluginReact()],
  server: {
    port: 9002,
    base: "/fe-micro-app-1/",
  },
  html: {
    template: "./public/index.html",
  },
});
