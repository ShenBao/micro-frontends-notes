import { Button, Input, Modal, App as AntdApp } from "antd";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import TestModal from "./TestModal";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    // console.log("window.microApp:", window.microApp);

    // @ts-ignore
    function dataListener(data) {
      console.log("来自主应用的数据", data);
      if (data?.pathname?.includes("/micro-app/")) {
        console.log((data?.pathname || "")?.replace("/micro-app", ""));

        navigate(
          (data?.pathname || "")?.replace("/micro-app", ""),
          data?.orgLocation || {}
        );
      }
    }
    // @ts-ignore
    window.microApp.addDataListener(dataListener);
  }, []);

  return (
    <div>
      <div>
        <h1>micro app</h1>
        <nav className="nav">
          <Link to={"/home"}>Home</Link>
          <Link to={"/about"}>about</Link>
          <Link to={"/test"}>Test</Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

const Home = () => {
  const { message, notification } = AntdApp.useApp();

  return (
    <div>
      <h4>Home page</h4>
      <div>
        <Button
          onClick={() => {
            console.log(123);
            message.success("success");
          }}
        >
          show message
        </Button>
        <Button
          onClick={() => {
            console.log(123);
            notification.info({
              message: 'notification msg'
            });
          }}
        >
          show notification
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
          show Modal
        </Button>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return <div>AboutPage</div>;
};

const TestPage = () => {
  return (
    <div>
      <h3>TestPage</h3>
      <Input />
      <TestModal />
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/home",
          element: <Home></Home>,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/test",
          element: <TestPage />,
        },
      ],
    },
  ],
  {
    basename: "micro-app",
  }
);

function App() {
  return (
    <AntdApp>
      <RouterProvider router={router}></RouterProvider>
    </AntdApp>
  );
}

export default App;
