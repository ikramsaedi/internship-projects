import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import pacman from "./assets/pacman.png";
import coin from "./assets/coin.png";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pacmanLocation: [0, 0],
      coinLocations: [], //coin location will need work
    };
  }

  movementKeyHandler() {
    //if they press the right arrow key
    //add 1 to pacmans x coordinate
    //if they press left arrow key, -1 to the pacman location
    //then set limits on how they can move -> like cant move out too far left or too far right (like less than zero or more than 3)
  }
  render() {
    return (
      <div>
        <h1> PACMAN </h1>
        <input onKeyDown={this.movementKeyHandler}></input>

        <Grid
          pacmanLocation={this.state.pacmanLocation}
          coinLocations={this.state.coinLocations}
        />
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.grid = [
      [0, 1, 2], //first row & associated y coordinates
      [0, 1, 2], //second row & associated y coordinates
      [0, 1, 2], //third row
    ];

    this.renderedGrid = this.renderCellType(this.grid);
  }

  /* renderCellCoordinates() {
    let coordinatesArray = this.coordinatesArray;
    for (let xCoord = 0; xCoord <= this.xCoordArray.length; xCoord++) { //replace this with mappping
      for (let yCoord = 0; yCoord <= this.yCoordArray.length; yCoord++) {
        coordinatesArray[xCoord] = yCoord;
      }
      //for every x coord, assign all the y coords
    }
    //make a coords array

    this.coordinatesArray.concat(coordinatesArray);
    console.log(this.coordinatesArray, "render cell coords");
    return this.coordinatesArray;
  } */

  renderCellType(grid) {
    //using the grid, itll iterate thru the grid and grab the coordinates
    //then itll render each cell with these coordinates and pass it the cell type and its coordinates
    console.log("the function is getting called");
    let cellType;

    for (let x = 0; x < grid.length; x++) {
      console.log("x array for loop has been entered");
      let xArray = grid[x]; //iterate thru xArray

      for (let y = 0; y < xArray.length; y++) {
        console.log("y array for loop getting entered");
        let cellCoordinates = grid[x][y];
        console.log(cellCoordinates);
        if (cellCoordinates === this.props.pacmanLocation[(x, y)]) {
          console.log("first if");
          cellType = "pacman";
        }
        if (this.props.coinLocations.includes(cellCoordinates)) {
          console.log("second if");
          cellType = "coin";
        } else {
          console.log("else");
          cellType = "blank";
        }
      }
    }
    return cellType;
  }

  render() {
    console.log(this.grid);

    return (
      //make a row here
      <div className="grid-container">
        <Cell cellType={this.renderedGrid} />
        <Cell cellType={this.renderedGrid} />
        <Cell cellType={this.renderedGrid} />
      </div>
      //the p is temporary
      //pass x coords and y coords down to cell
    );
  }
}

class Cell extends React.Component {
  //needs to know about cell number
  constructor(props) {
    super(props);
    this.coordinates = this.props.coordinates;

    this.state = {
      cellContents: this.props.cellType,
    };
  }

  display() {
    if (this.state.cellContents === "pacman") {
      return <img src={pacman}> </img>;
    }
    if (this.state.cellContents === "coin") {
      return <img src={coin}></img>;
    }
    if (this.state.cellContents === "blank") {
      return "blank";
    }
  }

  render() {
    console.log(this.coordinates, "cell");
    return <div className="cell"></div>;
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
