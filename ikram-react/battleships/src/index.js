import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class GameState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: "start",
    };
  }
  //do logic to figure oout which component it wants to render
  onClickStartButton() {
    this.setState({
      gameState: "playing",
    });
  }
  onChangeGameState() {
    if (this.state.gameState === "start") {
      return <Start onClick={(event) => this.onClickStartButton(event)} />;
    }
    if (this.state.gameState === "playing") {
      return <GameReferee />;
    }
    if (this.state.gameState === "end") {
      return <End />;
    }
  }
  render() {
    return this.onChangeGameState();
  }
}

function Start(props) {
  //receives onclick from gameState
  return (
    <div>
      <button onClick={props.onClick}>New Game</button>
    </div>
  );
}

function End(props) {
  return (
    <div>
      <p> Winnner prop won</p>
    </div>
  );
}

class GameReferee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerTurn: 1,
    };
  }

  playerSwitch() {}

  gameOutcome() {
    //maybe not going to be in this
  }

  render() {
    return (
      <div>
        <Board />
        <Board />
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickCellHandler() {}

  onGuessShip() {}

  render() {
    return (
      <div>
        <Grid />
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCells() {}

  render() {
    return (
      <div>
        <Cell />
      </div>
    );
  }
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="cell"></div>;
  }
}

ReactDOM.render(<GameState />, document.getElementById("root"));
