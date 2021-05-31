import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.png";

function Pacman(props) {
  return (
    <img
      src={props.img}
      alt="pacman sprite"
      style={{ transform: "rotate(" + props.dir + ")" }}
    />
  );
}

class UnstyledGame extends React.Component {
  constructor(props) {
    super(props);
    this.validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.state = { currentDirection: 0 };
  }

  handleKey(event) {
    console.log(event.key);
    if (this.validKeys.includes(event.key)) {
      console.log("valid");
      let dir;
      switch (event.key) {
        case "ArrowUp":
          dir = "270deg";
          break;
        case "ArrowDown":
          dir = "90deg";
          break;
        case "ArrowLeft":
          dir = "180deg";
          break;
        case "ArrowRight":
          dir = "0deg";
          break;
      }

      this.setState({ currentDirection: dir });
    }
  }

  componentDidMount() {
    this.boundEventListener = (event) => this.handleKey(event);
    document.addEventListener("keydown", this.boundEventListener);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.boundEventListener);
  }

  render() {
    return (
      <div id="game" className={this.props.className}>
        <Pacman img={pacman} dir={this.state.currentDirection} />
      </div>
    );
  }
}

const Game = styled(UnstyledGame)`
  box-sizing: border-box;
  background-color: black;
  color: white;
  width: 60%;
  height: 800px;
  margin: 0 auto;
  padding: 10px;
`;

export default Game;
