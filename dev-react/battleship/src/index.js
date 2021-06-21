import React from "react";
import ReactDOM from "react-dom";
import deepClone from "deep-clone";
import "./index.css";
import { GameSetup, GameBoard } from "./GameComponents";

class Player {
  constructor(shipTypes, gridSize) {
    this.ships = {};
    this.shipCells = {};
    this.allCells = this.generateAllCells(gridSize);
    this.shipsRemaining = 5;
  }

  generateShips(shipTypes, gridSize, shipsSave, shipsCellsSave) {
  }

  generateAllCells(gridSize) {
    let cells = {};

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        cells[`${i}, ${j}`] = " ";
      }
    }

    return cells;
  }
}

function EndScreen(props) {
  return (
    <div>
      <h1>This screen will show the end of game stuff</h1>
    </div>
  );
}

function SwitchScreen(props) {
  return (
    <div>
      <h1>This screen will show when switching players</h1>
      <h2>This is to keep the players ships secret from each other</h2>
      <h3>The next player is: Player {props.player}</h3>
    </div>
  );
}

class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.shipTypes = [2, 2, 3, 3, 3, 4];
    this.gridSize = 10;
    this.state = {
      gameState: "playing",
      currentPlayer: 1,
      switching: false,
      player1: new Player(this.shipTypes, this.gridSize),
      player2: new Player(this.shipTypes, this.gridSize),
    };
  }

  inGameClickHandler(event) {
    console.log("click");
    const cellClicked = event.target.value;

    console.log("cellClicked:", cellClicked); // DEBUG

    let player = deepClone(this.state[`player${this.state.currentPlayer}`]);

    player.allCells[cellClicked] = "x";

    this.setState({ [`player${this.state.currentPlayer}`]: player });
  }

  render() {
    /*
    logic for which screen to show (this is gonna be messy, ugh)
    if gamestate is setup
      show setup for currentplayer
    if gamestate is playing
      if switch is true
        show switch screen for currentplayer
      else show game board for currentplayer
    if gamestate is endgame
      show win/lose screen
    */
    if (this.state.gameState === "setup") {
      return (
        <GameSetup player={this.state.currentPlayer} gridSize={this.gridSize} />
      );
    } else if (this.state.gameState === "playing") {
      if (this.state.switching) {
        return <SwitchScreen player={this.state.currentPlayer} />;
      } else {
        return (
          <GameBoard
            player={this.state.currentPlayer}
            gridSize={this.gridSize}
            allCells={this.state[`player${this.state.currentPlayer}`].allCells}
            clickHandler={(i) => this.inGameClickHandler(i)}
          />
        );
      }
    } else if (this.state.gameState === "endgame") {
      return <EndScreen />;
    }
  }
}

ReactDOM.render(<GameController />, document.getElementById("root"));
