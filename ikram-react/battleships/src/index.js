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
        <h1>Battleships!</h1>
        <Board />
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.shipsObject = {
      ship1: ["0, 1", "0, 2", "0, 3"],
      ship2: ["3, 2", "4, 2", "5, 2"],
      ship3: ["5, 6", "5, 7", "5, 8"],
    };

    this.state = {
      shipsCurrentlyGuessed: {},
      shipsGuessed: [],
      blankCellsGuessed: [],
    };
  }
  sendClickStatus(cellCoordinates) {
    this.state.blankCellsGuessed.push(cellCoordinates);
    console.log(this.state.blankCellsGuessed);
  }

  onGuessShip() {}

  render() {
    return (
      <div>
        <Grid
          shipsObject={this.shipsObject}
          sendClickStatus={(isSelected, cellCoordinates) =>
            this.sendClickStatus(isSelected, cellCoordinates)
          }
        />
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  isShip(column, row) {
    for (let shipNumber in this.props.shipsObject) {
      if (this.props.shipsObject[shipNumber].includes(`${column}, ${row}`)) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div className="grid-container">
        {[...Array(11).keys()].map((row) => {
          return (
            <div className="row">
              {[...Array(11).keys()].map((column) => {
                return (
                  <Cell
                    cellCoordinates={[column, row]}
                    sendClickStatus={this.props.sendClickStatus}
                    isShip={this.isShip(column, row)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.isShip = this.props.isShip;
    this.cellCoordinates = this.props.cellCoordinates;

    this.state = {
      isSelected: false,
    };
  }
  onClickCellHandler() {
    this.setState({
      isSelected: true,
    });
    this.props.sendClickStatus(this.props.cellCoordinates);
  }

  render() {
    let className = "cell";
    if (this.isShip && !this.state.isSelected) {
      className = "cell ship";
    }
    if (this.isShip && this.state.isSelected) {
      className = "cell selected-ship";
    }
    if (!this.isShip && this.state.isSelected) {
      className = "cell selected-cell";
    }

    return (
      <div
        className={className}
        onClick={() => this.onClickCellHandler()}
      ></div>
    );
  }
}

ReactDOM.render(<GameState />, document.getElementById("root"));
