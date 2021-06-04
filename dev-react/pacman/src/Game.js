import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.gif";
import coin from "./resources/coin-v3.png";
import wall from "./resources/wall.png";

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

function UnstyledCoin(props) {
  return <img className={props.className} src={coin} alt="coin sprite" />;
}

const Coin = styled(UnstyledCoin)`
  position: absolute;
  top: ${(props) => props.currentLocation[1] * props.size + "px"};
  left: ${(props) => props.currentLocation[0] * props.size + "px"};
  display: ${(props) => (props.eaten ? "none" : "initial")};
`;

function UnstyledWall(props) {
  return <img className={props.className} src={wall} alt="wall sprit" />;
}

const Wall = styled(UnstyledWall)`
  position: absolute;
  top: ${(props) => props.currentLocation[1] * props.size + "px"};
  left: ${(props) => props.currentLocation[0] * props.size + "px"};
`;

const Score = styled.h1`
  font-size: 20px;
  font-family: monospace;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 32px;
  z-index: 5;
`;

class UnstyledGame extends React.Component {
  constructor(props) {
    super(props);
    this.arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.gridSize = 32;
    this.walls = { level1: this.generateWalls() };
    this.state = {
      currentDirection: [1, 0],
      isPacmanMoving: false,
      currentLocation: [0, 0],
      level: 1,
      coins: this.generateCoins(1),
      score: 0,
    };
  }

  handleKey(event) {
    if (event.repeat) {
      return;
    }

    if (event.key === " ") {
      this.setState({ isPacmanMoving: false });
    }

    if (this.arrowKeys.includes(event.key)) {
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
    let nextLocation = this.state.currentLocation.slice(); // always make copies!! arrays are stored in the heap!!
    let coins = Object.assign({}, this.state.coins);
    let score = this.state.score;

    nextLocation[0] += this.state.currentDirection[0];
    nextLocation[1] += this.state.currentDirection[1];

    if (
      !(nextLocation[0] < 0) &&
      !(nextLocation[0] > 23) &&
      !(nextLocation[1] < 0) &&
      !(nextLocation[1] > 23)
    ) {
      let nextLocationString = `${nextLocation[0]}, ${nextLocation[1]}`;
      if (this.walls[`level${this.state.level}`][nextLocationString]) {
        this.setState({ isPacmanMoving: false });
        return;
      }

      if (
        coins[nextLocationString] === false
        /* we don't want it to succeed on a falsy value (such as undefined) 
        so we need to specifically check for false, rather than using !coins[nextLocationString] */
      ) {
        coins[nextLocationString] = true;
        const newCoinsNum = coins.coinsRemaining - 1;
        coins.coinsRemaining = newCoinsNum;
        score += 1;
      }

      if (coins.coinsRemaining > 0) {
        this.setState({
          currentLocation: nextLocation,
          coins: coins,
          score: score,
        });
        return;
      } else {
        this.props.changeGameState("won");
        return;
      }
    } else {
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

  generateWalls() {
    let output = {};

    const verticalDensity = 0.9;
    const horizontalDensity = 0.5;

    for (let i = 1; i <= 23; i += 2) {
      const offset = Math.round(Math.random());
      for (let j = 0; j < 23; j++) {
        const chance = Math.random();
        if (chance > verticalDensity) {
          output[`${i}, ${j + offset}`] = "wall";
        }
      }
    }

    for (let i = 1; i <= 23; i += 2) {
      const offset = Math.round(Math.random());
      for (let j = 0; j < 23; j++) {
        const chance = Math.random();
        if (chance > horizontalDensity) {
          output[`${j + offset}, ${i}`] = "wall";
        }
      }
    }

    return output;
  }

  generateCoins(level) {
    let output = {};
    for (let i = 1; i <= 60; i++) {
      const xval = Math.round(Math.random() * 22);
      const yval = Math.round(Math.random() * 22);

      const locationString = `${xval}, ${yval}`;

      if (
        !this.walls[`level${level}`][locationString] &&
        output[locationString] === undefined &&
        locationString !== "0, 0"
      ) {
        output[locationString] = false; // the boolean represents whether or not pacman has eaten the coin yet
      } else {
        i--;
      }
    }

    output.coinsRemaining = Object.keys(output).length;

    return output;
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
        <Score>Score: {this.state.score}</Score>
        {Object.keys(this.state.coins).map((coin) => {
          return (
            <Coin
              currentLocation={coin.split(", ")}
              eaten={this.state.coins[coin]}
              size={this.gridSize}
            />
          );
        })}
        {Object.keys(this.walls[`level${this.state.level}`]).map((wall) => {
          return (
            <Wall currentLocation={wall.split(", ")} size={this.gridSize} />
          );
        })}
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
  border-radius: 8px;
`;

export default Game;
