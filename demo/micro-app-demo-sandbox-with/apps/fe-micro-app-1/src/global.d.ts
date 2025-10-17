// types/global.d.ts
// 为 @micro-zoe/micro-app 微前端框架注入的全局变量提供 TypeScript 类型声明，
// 便于在子应用或主应用中安全访问运行时注入的 window 属性。

declare global {
  interface Window {
    /**
     * 判断当前是否处于微前端环境中。
     * 子应用可通过该变量判断自身是否被 micro-app 加载。
     * @example
     * if (window.__MICRO_APP_ENVIRONMENT__) {
     *   console.log('我在微前端环境中');
     * }
     */
    __MICRO_APP_ENVIRONMENT__?: boolean;

    /**
     * 当前子应用的名称，对应 <micro-app name="xxx" /> 中的 name 属性。
     * 用于在子应用内部识别自身身份。
     */
    __MICRO_APP_NAME__?: string;

    /**
     * 子应用的静态资源公共路径（publicPath）。
     * 通常用于动态设置 __webpack_public_path__，确保子应用资源能正确加载。
     * @example
     * // public-path.js
     * if (window.__MICRO_APP_ENVIRONMENT__) {
     *   __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__;
     * }
     */
    __MICRO_APP_PUBLIC_PATH__?: string;

    /**
     * 子应用在主应用中的基础路由前缀。
     * 用于路由隔离，确保子应用路由与主应用或其他子应用不冲突。
     * 详情参考：https://micro-zoe.github.io/micro-app/zh-cn/native-mode?id=基础路径
     */
    __MICRO_APP_BASE_ROUTE__?: string;

    /**
     * 判断当前应用是否为主应用。
     * 仅在调用 microApp.start() 后生效。
     * @example
     * if (window.__MICRO_APP_BASE_APPLICATION__) {
     *   console.log('我是主应用');
     * }
     */
    __MICRO_APP_BASE_APPLICATION__?: boolean;

    /**
     * 获取真实的 window 对象（即主应用的 window）。
     * 默认情况下，子应用中的 window 是代理对象，通过 rawWindow 可访问原始 window。
     * @example
     * const realWindow = window.rawWindow;
     */
    rawWindow?: Window;

    /**
     * 获取真实的 document 对象（即主应用的 document）。
     * 默认情况下，子应用中的 document 是代理对象，通过 rawDocument 可访问原始 document。
     * @example
     * const realDocument = window.rawDocument;
     */
    rawDocument?: Document;
  }
}

// 导出空对象，使该文件成为模块，避免全局作用域污染
export {};