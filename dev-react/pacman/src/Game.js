import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.png";

class UnstyledPacman extends React.Component {
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
        className={this.props.className}
        src={this.props.img}
        alt="pacman sprite"
      />
    );
  }
}

const Pacman = styled(UnstyledPacman)`
  position: absolute;
  top: 0px;
  left: 0px;
  height: ${(props) => props.size + "px"};
  width: ${(props) => props.size + "px"};
  transform: ${(props) => "rotate(" + props.dir + ")"};
`;

class UnstyledGame extends React.Component {
  constructor(props) {
    super(props);
    this.arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.gridSize = 32;
    this.state = { /* currentDirection: "0deg", */ isPacmanMoving: false };
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

    // if (this.arrowKeys.includes(event.key)) {
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
  background-color: black;
  color: white;
  width: 60%;
  height: 800px;
  margin: 0 auto;
  position: relative;
  border: 10px black solid;
  border-radius: 5px;
`;

export default Game;
