import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

function appRender(props: any) {
  if (window.__POWERED_BY_QIANKUN__) {
    // @ts-ignore
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
  const container: HTMLElement = document.getElementById(
    "micro-app-container-1"
  ) as HTMLElement;
  ReactDOM.render(<App {...props} />, container);
}

function appUnmount() {
  const container: HTMLElement = document.getElementById(
    "micro-app-container-1"
  ) as HTMLElement;
  ReactDOM.unmountComponentAtNode(container);
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
