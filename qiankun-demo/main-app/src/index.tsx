import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Entry, registerMicroApps, start } from "qiankun";

const apps = [
  {
    name: "MicroApp",
    domain: "localhost:9001",
    entry: {
      scripts: ["//localhost:9001/micro-app-0/static/js/bundle.js"],
      html: `<div id="micro-app-container-0"></div>`,
    },
    container: "#micro-app-container",
    activeRule: "/micro-app-0",
  },
  {
    name: "MicroApp1",
    domain: "localhost:9002",
    entry: {
      scripts: ["//localhost:9002/micro-app-1/static/js/bundle.js"],
      html: `<div id="micro-app-container-1"></div>`,
    },
    container: "#micro-app-container",
    activeRule: "/micro-app-1",
  },
  {
    name: "MicroApp2",
    domain: "localhost:9003",
    entry: {
      scripts: ["//localhost:9003/micro-app-2/static/js/bundle.js"],
      html: `<div id="micro-app-container-2"></div>`,
    },
    container: "#micro-app-container",
    activeRule: "/micro-app-2",
  },
];
registerMicroApps(apps);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const MainApp: React.FC = () => {
  useEffect(() => {
    start({
      prefetch: false,
      getPublicPath: (entry: Entry) => {
        const appBasePath = window.location.pathname?.split("/")[1];
        const curSubApp = apps?.find((it) =>
          it.activeRule?.includes(appBasePath)
        );
        //  TODO 区分：开发和生产
        if (curSubApp) {
          const b = `${window.location.protocol}//${curSubApp.domain}/`;
          console.log(b);
          return b;
        }
        return window.location.origin;
      },
    });
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(<MainApp />);
