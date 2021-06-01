import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.gif";

class UnstyledPacman extends React.Component {
  componentDidUpdate() {
    if (this.props.isMoving && !this.timer) {
      this.timer = setInterval(() => this.props.move(), 100);
    }

    if (!this.props.isMoving) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
  top: ${(props) => props.currentLocation[1] * props.size + "px"};
  left: ${(props) => props.currentLocation[0] * props.size + "px"};
  height: ${(props) => props.size + "px"};
  width: ${(props) => props.size + "px"};
  transform: ${(props) => "rotate(" + props.calcAngle(props.dir) + "deg)"};
`;

class UnstyledGame extends React.Component {
  constructor(props) {
    super(props);
    this.arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.gridSize = 32;
    this.state = {
      currentDirection: [1, 0],
      isPacmanMoving: false,
      currentLocation: [0, 0],
    };
  }

  handleKey(event) {
    if (event.repeat) {
      return;
    }

    console.log(event.key);

    if (event.key === " ") {
      this.setState({ isPacmanMoving: false });
    }

    if (this.arrowKeys.includes(event.key)) {
      console.log("valid direction");
      let dir;
      switch (event.key) {
        case "ArrowUp":
          dir = [0, -1];
          break;
        case "ArrowDown":
          dir = [0, 1];
          break;
        case "ArrowLeft":
          dir = [-1, 0];
          break;
        case "ArrowRight":
          dir = [1, 0];
          break;
        default: // pass
      }

      if (
        this.state.currentLocation[0] >= 0 &&
        this.state.currentLocation[0] <= 23 &&
        this.state.currentLocation[1] >= 0 &&
        this.state.currentLocation[1] <= 23
      ) {
        this.setState({ isPacmanMoving: true, currentDirection: dir });
      }
    }
  }

  movePacman() {
    console.log("moving!");
    let nextLocation = this.state.currentLocation.slice(); // always make copies!! arrays are stored in the heap!!

    nextLocation[0] += this.state.currentDirection[0];
    nextLocation[1] += this.state.currentDirection[1];

    if (
      !(nextLocation[0] < 0) &&
      !(nextLocation[0] > 23) &&
      !(nextLocation[1] < 0) &&
      !(nextLocation[1] > 23)
    ) {
      console.log(nextLocation);
      this.setState({ currentLocation: nextLocation });
    } else {
      console.log("he's not goin");
      this.setState({ isPacmanMoving: false });
    }
  }

  calcAngle(dir) {
    let angle = Math.atan2(dir[1], dir[0]) / (Math.PI / 180);

    if (angle < 0) {
      angle += 360;
    }

    return angle;
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
          currentLocation={this.state.currentLocation}
          move={() => this.movePacman()}
          calcAngle={(dir) => this.calcAngle(dir)}
        />
      </div>
    );
  }
}

const Game = styled(UnstyledGame)`
  background-color: black;
  color: white;
  width: ${24 * 32 + "px" /* damn magic numbers */};
  height: ${24 * 32 + "px"};
  margin: auto;
  margin-top: 10px;
  position: relative;
  border: 10px black solid;
  border-radius: 5px;
`;

export default Game;
