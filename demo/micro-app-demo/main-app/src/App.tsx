// /** @jsxRuntime classic */
// /** @jsx jsxCustomEvent */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsxCustomEvent from "@micro-zoe/micro-app/polyfill/jsx-custom-event";
void jsxCustomEvent;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
void React;

import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import microApp from "@micro-zoe/micro-app";
import { Button, message, Modal, notification } from "antd";

const MainLayout = () => {
  return (
    <div>
      <div>
        <h1>Main App nav</h1>
        <nav className="nav">
          <Link to={"/"}>home</Link>
          <Link to={"/login"}>login</Link>
          <Link to={"/about"}>about</Link>
        </nav>
        <div>
          <h2>micro-app nav</h2>
          <nav className="nav">
            <Link to={"/micro-app/home"}>Home</Link>
            <Link to={"/micro-app/about"}>about</Link>
            <Link to={"/micro-app/test"}>Test</Link>
          </nav>
        </div>
        <div>
          <h2>micro-app 1 nav</h2>
          <nav className="nav">
            <Link to={"/micro-app-1/home"}>Home</Link>
            <Link to={"/micro-app-1/about"}>about</Link>
            <Link to={"/micro-app-1/test"}>Test</Link>
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const Main = () => {
  return (
    <div>
      <h4>Home page</h4>
      <div>
        <Button
          onClick={() => {
            message.success("success");
          }}
        >
          show msg
        </Button>
        <Button
          onClick={() => {
            notification.info({
              message: "notification msg",
            });
          }}
        >
          show msg
        </Button>
        <Button
          onClick={() => {
            Modal.info({
              title: "This is a notification message",
              content: (
                <div>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                </div>
              ),
              onOk() {},
            });
          }}
        >
          show dialog
        </Button>
      </div>
    </div>
  );
};

const MicroAppPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("location pathname:", location.pathname);

    microApp.setData("micro-app", {
      type: "changePath",
      pathname: location.pathname,
      orgLocation: location,
    });
  }, [location]);

  return (
    <div>
      <micro-app
        name="micro-app"
        baseroute="/micro-app"
        // keep-alive
        url={
          import.meta.env.DEV
            ? "http://localhost:9001/micro-app/"
            : "/micro-app/index.html"
        }
        iframe
      ></micro-app>
    </div>
  );
};

const MicroAppPage2 = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("location pathname:", location.pathname);

    microApp.setData("micro-app-1", {
      type: "changePath",
      pathname: location.pathname,
      orgLocation: location,
    });
  }, [location]);

  return (
    <div>
      <micro-app
        name="micro-app-1"
        baseroute="/micro-app-1"
        // keep-alive
        // url="http://localhost:9002/micro-app-1/"
        url={
          import.meta.env.DEV
            ? "http://localhost:9002/micro-app-1/"
            : "/micro-app-1/index.html"
        }
        iframe
      ></micro-app>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Main></Main>,
      },
      {
        path: "/login",
        element: <div>login</div>,
      },
      {
        path: "/about",
        element: <div>about</div>,
      },
      {
        path: "/micro-app/*",
        element: <MicroAppPage />,
      },
      {
        path: "/micro-app-1/*",
        element: <MicroAppPage2 />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
