import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import pacman from "./assets/pacman.png";
import coin from "./assets/coin.png";
import blank from "./assets/blank.png";

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
  /* 
  assignCellCoordinates(grid) {
    let cellCoordinates;
    for (let x = 0; x < grid.length; x++) {
      console.log("x array for loop has been entered");
      let xArray = grid[x]; //iterate thru xArray

      for (let y = 0; y < xArray.length; y++) {
        let cellXCoordinate = grid.indexOf(grid[x]);
        let cellYCoordinate = xArray.indexOf(xArray[y]);
        cellCoordinates = [cellXCoordinate, cellYCoordinate];
      }
    }
    console.log(cellCoordinates, "cellCoordinates");
    return cellCoordinates;
  } */

  render() {
    console.log(this.grid);

    return (
      //make a row here
      <div className="grid-container">
        {(() => {
          let cellType;
          let cellCoordinates;
          let coordinatesArray = [];
          for (let x = 0; x < this.grid.length; x++) {
            console.log("x array for loop has been entered");
            let xArray = this.grid[x]; //iterate thru xArray

            for (let y = 0; y < xArray.length; y++) {
              console.log("y array for loop getting entered");

              console.log(x, y, "xy");
              console.log(this.props.pacmanLocation, "location");
              cellCoordinates = [x, y];

              coordinatesArray.push([x, y]);
              if (
                x === this.props.pacmanLocation[0] &&
                y === this.props.pacmanLocation[1]
              ) {
                console.log("first if");
                cellType = "pacman";
                //is pacman location = to x & y
              } else if (this.props.coinLocations.includes(x, y)) {
                console.log("second if");
                cellType = "coin";
              } else {
                console.log("else");
                cellType = "blank";
              }
            }
          }
          console.log(coordinatesArray, "coordinatesArray");

          let cells = coordinatesArray.map((coord) => (
            <Cell key={coord} coordinates={coord} cellType={cellType} />
          ));

          console.log(cells);
          return cells;
        })()}
      </div>
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
    let image;
    console.log(this.props.cellType, "cellType");

    if (this.state.cellContents === "pacman") {
      image = pacman;
    }
    if (this.state.cellContents === "coin") {
      image = coin;
    }
    if (this.state.cellContents === "blank") {
      image = blank;
    }

    return image;
  }

  render() {
    console.log(this.coordinates, "cell");
    return (
      <div className="cell">
        <img src={this.display()}></img>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
