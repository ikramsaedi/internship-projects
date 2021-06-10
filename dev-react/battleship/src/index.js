import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { GameSetup, GameBoard } from "./GameComponents";

class Player {
  constructor() {
    this.ships = {};
    this.shipsRemaining = 5;
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
    this.state = {
      gameState: "playing",
      currentPlayer: 1,
      switching: true,
      player1: new Player(),
      player2: new Player(),
    };
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
      return <GameSetup player={this.state.currentPlayer} />;
    } else if (this.state.gameState === "playing") {
      if (this.state.switching) {
        return <SwitchScreen player={this.state.currentPlayer} />;
      } else {
        return <GameBoard player={this.state.currentPlayer} />;
      }
    } else if (this.state.gameState === "endgame") {
      return <EndScreen />;
    }
  }
}

ReactDOM.render(<GameController />, document.getElementById("root"));
