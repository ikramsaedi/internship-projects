import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./index.css";
import Game from "./Game";

import pacman from "./resources/pacman-large.gif";

function UnstyledWin(props) {
  return (
    <div className={props.className}>
      <div
        style={{
          margin: "0px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img src={pacman} alt={"pacman sprite"} style={{}} />
        <h1
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          You won!
        </h1>
      </div>
    </div>
  );
}

const Win = styled(UnstyledWin)`
  font-size: 40px;
  text-align: center;
  font-family: "Phosphate", sans-serif;
  color: rgb(45, 45, 255);
  background-color: black;
  width: ${24 * 32 + "px" /* damn magic numbers */};
  height: ${24 * 32 + "px"};
  margin: auto;
  margin-top: 10px;
  position: relative;
  border: 10px black solid;
  border-radius: 8px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameState: "playing" };
  }

  changeGameState(state) {
    this.setState({ gameState: state });
  }

  render() {
    switch (this.state.gameState) {
      case "playing":
        return (
          <Game changeGameState={(state) => this.changeGameState(state)} />
        );
      case "won":
        return <Win />;

      default: // nothinggg
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
