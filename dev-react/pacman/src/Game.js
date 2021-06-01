import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.png";

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
  transform: ${(props) => "rotate(" + props.dir + ")"};
`;

class UnstyledGame extends React.Component {
  constructor(props) {
    super(props);
    this.arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.gridSize = 32;
    this.state = {
      /* currentDirection: "0deg", */ isPacmanMoving: false,
      currentLocation: [0, 0],
    };
  }

  handleKey(event) {
    if (event.repeat) {
      return;
    }

    console.log(event.key);

    if (event.key === " ") {
      console.log("space bar");
      if (this.state.currentLocation[0] < 23) {
        this.setState({ isPacmanMoving: !this.state.isPacmanMoving });
      }
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

  movePacman() {
    console.log("moving!");
    let nextLocation = this.state.currentLocation;
    nextLocation[0] += 1;

    if (nextLocation[0] < 23 /* magic number here lads */) {
      console.log(nextLocation);
      this.setState({ currentLocation: nextLocation });
    } else {
      this.setState({ isPacmanMoving: false });
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
        <Pacman
          img={pacman}
          dir={this.state.currentDirection}
          size={this.gridSize}
          isMoving={this.state.isPacmanMoving}
          currentLocation={this.state.currentLocation}
          move={() => this.movePacman()}
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
