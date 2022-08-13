import React, { Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./App.css";

// import LazyCom from "./LazyCom";
const LazyCom = React.lazy(() => import("./LazyCom"));

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage! micro App</h2>
        <p>You can do this, I believe in you.</p>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we? micro App</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter basename="/micro-app-0">
        <div className="App">
          <h2>micro App</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/lazy">Lazy</Link>
          </nav>
        </div>
        <Suspense fallback="loading">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="lazy" element={<LazyCom />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
