import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";

class App extends React.Component {
  render() {
    return <Game />;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
