import React, { Suspense } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import "./App.css";

// import LazyCom from "./LazyCom";
const LazyCom = React.lazy(() => import("./LazyCom"));

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage! micro App 1</h2>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>About - micro App 1</h2>
      </main>
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter basename="/micro-app-1">
        <div className="App">
          <h2>micro App 1</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/lazy">LazyCom</Link>
          </nav>
        </div>
        <Suspense fallback={"loading"} >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/lazy" component={LazyCom} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
