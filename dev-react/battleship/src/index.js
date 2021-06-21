import React from "react";
import ReactDOM from "react-dom";
import deepClone from "deep-clone";
import "./index.css";
import { GameSetup, GameBoard } from "./GameComponents";

class Player {
  constructor(shipTypes, gridSize) {
    this.ships = {};
    this.shipCells = this.generateShips(gridSize);
    this.allCells = this.generateAllCells(gridSize);
    this.shipsRemaining = 5;
  }

  generateShips(gridSize) {
    // const orientations = ["vertical", "horizontal"];
    // let ships = {};
    // let shipCells = {};
    // for (let i in shipTypes) {
    //   const orientation = orientations[Math.round(Math.random())];
    //   const startCell = [Math.round(Math.random() * gridSize - 1)];
    //   let ship = [];
    //   for (let j = 1; j < shipTypes[i]; j++) {
    //     if (orientation === "vertical") {
    //       if (!shipCells[[startCell[0], startCell[1] + j]]) {
    //         ship.push([startCell[0], startCell[1] + j]);
    //       } else {
    //         break;
    //       }
    //     } else if (orientation === "horizontal") {
    //       if (!shipCells[[startCell[0] + j, startCell[1]]]) {
    //         ship.push([startCell[0] + j, startCell[1]]);
    //       } else {
    //         break;
    //       }
    //     }
    //   }
    //   if (ship.length === shipTypes[i]) {
    //     shipsSave = ships;
    //     shipsCellsSave = shipCells;
    //   }
    //}

    let shipsCells = {};

    for (let i = 0; i < 20; i++) {
      const x = Math.round(Math.random() * (gridSize - 1));
      const y = Math.round(Math.random() * (gridSize - 1));

      shipsCells[`${x}, ${y}`] = "ship";
    }

    return shipsCells;
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

    console.log("cellClicked:", cellClicked, typeof cellClicked); // DEBUG

    let player = deepClone(this.state[`player${this.state.currentPlayer}`]);

    console.log(
      "player.shipCells[cellClicked]:",
      player.shipCells[cellClicked]
    ); // DEBUG

    if (player.shipCells[cellClicked]) {
      player.allCells[cellClicked] = "X";
    } else {
      player.allCells[cellClicked] = "·";
    }

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
