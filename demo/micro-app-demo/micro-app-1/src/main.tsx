import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    // 存在沙箱逃逸的问题，会导致 msg 的dom插入到主应用下，这里先兼容下
    // 存在沙箱逃逸的问题，会导致 msg 的dom插入到主应用下，这里先兼容下
    // 存在沙箱逃逸的问题，会导致 msg 的dom插入到主应用下，这里先兼容下
    getPopupContainer={() => {
      // 这里的 document 也是逃逸了，找到了外面去了
      // 这里的 document 也是逃逸了，找到了外面去了
      // 这里的 document 也是逃逸了，找到了外面去了
      return document.querySelector(
        'micro-app[name="micro-app-1"] micro-app-body'
      ) as HTMLElement;
    }}
    getTargetContainer={() => {
      // 这里的 document 也是逃逸了，找到了外面去了
      // 这里的 document 也是逃逸了，找到了外面去了
      // 这里的 document 也是逃逸了，找到了外面去了
      return document.querySelector(
        'micro-app[name="micro-app-1"] micro-app-body'
      ) as HTMLElement;
    }}
  >
    <App />
  </ConfigProvider>
);
