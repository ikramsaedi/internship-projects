import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import pacman from "./assets/pacman.png";
import coin from "./assets/coin.png";
import blank from "./assets/blank.png";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.grid = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //first row & associated y coordinates
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //second row & associated y coordinates
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //third row
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    ];

    this.state = {
      pacmanLocation: [0, 0],
      coinLocations: {
        [[0, 1]]: true,
        [[0, 5]]: true,
        [[5, 0]]: true,
        [[7, 4]]: true,
        [[3, 4]]: true,
        [[10, 11]]: true,
        [[8, 9]]: true,
      }, //coin location will need work
    };
    this.coordinatesArray = this.coordinatesArray;
  }

  coinCollisionChecker() {
    for (let coordinates in this.state.coinLocations) {
      if (this.state.pacmanLocation == coordinates) {
        this.state.coinLocations[coordinates] = false;
      }
    }
  }

  movementKeyHandler(event) {
    let arrow = event.key;
    if (arrow === "ArrowLeft" && !(this.state.pacmanLocation[0] === 0)) {
      this.setState({
        pacmanLocation: [
          this.state.pacmanLocation[0] - 1,
          this.state.pacmanLocation[1],
        ],
      });
    } else if (
      arrow === "ArrowRight" &&
      !(this.state.pacmanLocation[0] === this.grid.length - 1)
    ) {
      //&& not = to grid.length
      this.setState({
        pacmanLocation: [
          this.state.pacmanLocation[0] + 1,
          this.state.pacmanLocation[1],
        ],
      });
    } else if (arrow === "ArrowUp" && !(this.state.pacmanLocation[1] === 0)) {
      this.setState({
        pacmanLocation: [
          this.state.pacmanLocation[0],
          this.state.pacmanLocation[1] - 1,
        ],
      });
    } else if (
      arrow === "ArrowDown" &&
      !(this.state.pacmanLocation[1] === this.grid.length - 1)
    ) {
      this.setState({
        pacmanLocation: [
          this.state.pacmanLocation[0],
          this.state.pacmanLocation[1] + 1,
        ],
      });
    }
    this.coinCollisionChecker();
  }

  render() {
    console.log(this.state.pacmanLocation);
    return (
      <div>
        <h1> PACMAN </h1>
        <input onKeyDown={this.movementKeyHandler.bind(this)}></input>
        <Grid
          pacmanLocation={this.state.pacmanLocation}
          coinLocations={this.state.coinLocations}
          grid={this.grid}
        />
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.grid = this.props.grid;
  }

  renderCells() {
    let cellType;
    let cellCoordinates;
    //let ogCoordinatesArray = this.coordinatesArray;
    let coordinatesArray = [];
    let cellObject = {};
    for (let row = 0; row < this.grid.length; row++) {
      let rowArray = this.grid[row]; //iterate thru rowArray

      for (let column = 0; column < rowArray.length; column++) {
        cellCoordinates = [row, column];

        coordinatesArray.push([row, column]);
        if (
          row === this.props.pacmanLocation[0] &&
          column === this.props.pacmanLocation[1]
        ) {
          cellType = "pacman";
          cellObject[cellCoordinates] = cellType;
          //is pacman location = to row & y
        } else if (this.props.coinLocations[[row, column]] === true) {
          //coin location needs WORK
          cellType = "coin";
          cellObject[cellCoordinates] = cellType;
        } else {
          cellType = "blank";
          cellObject[cellCoordinates] = cellType;
        }
      }
    }
    this.coordinatesArray = coordinatesArray;

    return cellObject;
  }

  render() {
    return (
      <div className="grid-container">
        {[...Array(this.grid.length).keys()].map((row) => {
          return (
            <div className="row">
              {[...Array(this.grid.length).keys()].map((column) => {
                return (
                  <Cell
                    cellCoordinates={[column, row]}
                    cellType={this.renderCells()[[column, row]]}
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
  //needs to know about cell number
  constructor(props) {
    super(props);
    this.coordinates = this.props.celLCoordinates;
  }

  display() {
    let image;

    if (this.props.cellType === "pacman") {
      image = pacman;
    }
    if (this.props.cellType === "coin") {
      image = coin;
    }
    if (this.props.cellType === "blank") {
      image = blank;
    }

    return image;
  }

  render() {
    return (
      <div className="cell">
        <img src={this.display()}></img>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

// for eaach row create a new row
