import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.gif";
import coin from "./resources/coin-v3.png";

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
    this.state = {
      currentDirection: [1, 0],
      isPacmanMoving: false,
      currentLocation: [0, 0],
      coins: this.generateCoins(), // this will be an array of objects with the form {location: [x, y], eaten: bool}
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
    let coins = this.state.coins.slice();
    let score = this.state.score;

    nextLocation[0] += this.state.currentDirection[0];
    nextLocation[1] += this.state.currentDirection[1];

    if (
      !(nextLocation[0] < 0) &&
      !(nextLocation[0] > 23) &&
      !(nextLocation[1] < 0) &&
      !(nextLocation[1] > 23)
    ) {
      for (const coinNum in coins) {
        let coin = coins[coinNum];

        if (
          nextLocation[0] === coin.location[0] &&
          nextLocation[1] === coin.location[1] &&
          !coin.eaten
        ) {
          coin.eaten = true;
          coins.coinNum = coin;
          score += 1;
        }
      }
      this.setState({
        currentLocation: nextLocation,
        coins: coins,
        score: score,
      });
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

  generateCoins() {
    let output = [];
    for (let i = 1; i <= 20; i++) {
      const xval = Math.round(Math.random() * 22);
      const yval = Math.round(Math.random() * 22);

      output.push({ location: [xval, yval], eaten: false });
    }
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
        {this.state.coins.map((coin) => {
          return (
            <Coin
              currentLocation={coin.location}
              eaten={coin.eaten}
              size={this.gridSize}
            />
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
  border-radius: 5px;
`;

export default Game;
