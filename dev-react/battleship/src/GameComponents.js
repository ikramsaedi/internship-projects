import React from "react";
import "./App.css";

function Cell(props) {
  return (
    <button onClick={props.cellHandler} disabled={props.alreadyGuessed}>
      {props.value}
    </button>
  );
}

class GameGrid extends React.Component {
  renderRow(rowNum) {
    // do stuff
  }

  render() {
    // also do stuff
    return <h4>temp</h4>;
  }
}

class GameSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // maybe instead of dragging, you select the ship and then click the new space to put it? that might be easier with this cell grid
    return (
      <div>
        <h1>This page will show the ships and allow them to be repositioned</h1>
        <h2>It is currently player {this.props.player}'s turn</h2>
      </div>
    );
  }
}

function GameBoard(props) {
  return (
    <div>
      <h1>This page will display the current hits and misses made</h1>
      <h2>It is currently player {this.props.player}'s turn</h2>
    </div>
  );
}

export { GameSetup, GameBoard };
