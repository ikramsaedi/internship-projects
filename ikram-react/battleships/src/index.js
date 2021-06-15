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
    };

    this.state = {
      shipsCurrentlyGuessed: {},
      shipsGuessed: [],
      blankCellsGuessed: [],
    };
  }

  onClickCellHandler() {
    //needs work
    console.log("this is a cell");
    let className;
    className = "selected-cell";
    this.onGuessShip();
    return className;
  }

  onGuessShip() {}

  render() {
    return (
      <div>
        <Grid
          shipsObject={this.shipsObject}
          onClickCellHandler={() => this.onClickCellHandler()}
        />
      </div>
    );
  }
}

// shipsGuessed ={
//  ship1: [[0,1], [0,2]]
//}

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
                    onClick={this.props.onClickCellHandler}
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
  }

  render() {
    let className = "cell";
    if (this.isShip) {
      className = "cell ship";
    }
    return <div className={className} onClick={this.props.onClick}></div>;
  }
}

ReactDOM.render(<GameState />, document.getElementById("root"));
