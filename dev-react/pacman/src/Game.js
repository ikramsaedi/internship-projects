import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.png";

class Pacman extends React.Component {
  componentDidUpdate() {
    if (this.props.isMoving) {
      this.timer = setInterval(() => this.move(), 1000);
    }

    if (!this.props.isMoving) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  move() {
    console.log("moving!");

    // inside this, will need to run my collision checker and update pacmans position
  }

  render() {
    if (this.props.isMoving) {
      console.log("it's alIVE");
    }

    return (
      <img
        src={this.props.img}
        alt="pacman sprite"
        height={this.props.size}
        width={this.props.size}
        style={{ transform: "rotate(" + this.props.dir + ")" }}
      />
    );
  }
}

class UnstyledGame extends React.Component {
  constructor(props) {
    super(props);
    this.validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.gridSize = 32;
    this.state = { currentDirection: 0, isPacmanMoving: false };
  }

  handleKey(event) {
    if (event.repeat) {
      return;
    }

    console.log(event.key);

    if (event.key === " ") {
      console.log("space bar");
      this.setState({ isPacmanMoving: !this.state.isPacmanMoving });
    }

    // if (this.validKeys.includes(event.key)) {
    //   console.log("valid");
    //   let dir;
    //   switch (event.key) {
    //     case "ArrowUp":
    //       dir = "270deg";
    //       break;
    //     case "ArrowDown":
    //       dir = "90deg";
    //       break;
    //     case "ArrowLeft":
    //       dir = "180deg";
    //       break;
    //     case "ArrowRight":
    //       dir = "0deg";
    //       break;
    //     default: // pass
    //   }

    //   this.setState({ currentDirection: dir });
    // }
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
        <Pacman
          img={pacman}
          dir={this.state.currentDirection}
          size={this.gridSize}
          isMoving={this.state.isPacmanMoving}
        />
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
