import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import "./App.css";

// import LazyCom from "./LazyCom";
const LazyCom = React.lazy(() => import('./LazyCom'))

function Home() {
  return (
    <>
      <main>
        <h2>this is the homepage! micro App 2</h2>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>About - micro App 2</h2>
      </main>
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter basename="/micro-app-2">
        <div className="App">
          <h2>micro App 2</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/lazy">Lazy</Link>
          </nav>
        </div>
        <React.Suspense fallback="loading">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/lazy" component={LazyCom} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
