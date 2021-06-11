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
    };

    this.state = {
      shipsCurrentlyGuessed: {},
      shipsGuessed: [],
    };
  }

  onClickCellHandler() {}

  onGuessShip() {}

  render() {
    return (
      <div>
        <Grid shipsObject={this.shipsObject} />
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

  renderCells() {
    //this is just making the cells object & cell type
    let cellType;
    let cellsObject = {};
    let rowArray = [];

    for (let row = 0; row <= 10; row++) {
      rowArray.push(rowArray[row]);
      for (let column = 0; column < 10; column++) {
        cellType = "blank";
        cellsObject[[column, row]] = cellType;

        if (this.props.shipsObject["ship1"].includes((column, row))) {
          console.log("congrats this is the if statement");
        }
      }
      return cellsObject;
    }
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
                    cellType={this.renderCells()}
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
    this.cellType = this.props.cellType;
  }

  render() {
    return <div className="cell"></div>;
  }
}

ReactDOM.render(<GameState />, document.getElementById("root"));
