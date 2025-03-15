import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

let root: ReactDOM.Root | null = null;

if (window.__POWERED_BY_QIANKUN__) {
  // @ts-ignore
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

function appRender(props: any) {
  root = ReactDOM.createRoot(
    document.getElementById("micro-app-container-0") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

function appUnmount() {
  root?.unmount();
}

if (!window.__POWERED_BY_QIANKUN__) {
  appRender({});
}

export async function bootstrap() {
  console.log("react app 1 bootstraped");
}

export async function mount(props: any) {
  appRender(props);
}

export async function unmount(props: any) {
  appUnmount();
}
