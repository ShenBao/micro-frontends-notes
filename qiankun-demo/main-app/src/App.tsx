import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import "./App.css";

const handleToApp = () => {
  window.singleSpaNavigate("/micro-app-0/about");
};

const handleToApp1 = () => {
  window.singleSpaNavigate("/micro-app-1/about");
};

const handleToApp2 = () => {
  window.singleSpaNavigate("/micro-app-2/about");
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>React App</h1>
        <div id="main-container">
          <h3>main container</h3>
        </div>
        <div>
          <nav>
            <Link to="/micro-app-0/">react Home</Link>
            <Link to="/micro-app-0/about">react About</Link>{" "}
            <Link to="/micro-app-0/lazy">react Lazy</Link>{" "}
            <Link to="/micro-app-1/">app1 Home</Link>
            <Link to="/micro-app-1/about">app1 About</Link>
            <Link to="/micro-app-1/lazy">app1 Lazy</Link>
            <Link to="/micro-app-2/">app2 Home</Link>
            <Link to="/micro-app-2/about">app2 About</Link>
            <Link to="/micro-app-2/lazy">app2 Lazy</Link>
          </nav>
          <br />
          <nav>
            <span onClick={handleToApp}>js to app0 About</span>
            <span onClick={handleToApp1}>js app1 About</span>
            <span onClick={handleToApp2}>js app2 About</span>
          </nav>
        </div>
        <div id="micro-app-container"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
