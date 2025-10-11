import { createRoot } from "react-dom/client";
import '@ant-design/v5-patch-for-react-19';
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";
import microApp from "@micro-zoe/micro-app";

microApp.start({
  "router-mode": "native",
  iframeSrc: location.origin + '/empty.html',
  // disableScopecss: true, // 默认值false
  // disableIframeRootDocument: true
});

createRoot(document.getElementById("root")!).render(<App />);
