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
      coinLocations: [[0, 1]], //coin location will need work
    };
    this.coordinatesArray = this.coordinatesArray;
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

  renderCells() {
    let cellType;
    let cellCoordinates;
    //let ogCoordinatesArray = this.coordinatesArray;
    let coordinatesArray = [];
    let cellObject = {};
    for (let x = 0; x < this.grid.length; x++) {
      let xArray = this.grid[x]; //iterate thru xArray

      for (let y = 0; y < xArray.length; y++) {
        console.log(this.props.pacmanLocation, "location");
        cellCoordinates = [x, y];

        coordinatesArray.push([x, y]);
        if (
          x === this.props.pacmanLocation[0] &&
          y === this.props.pacmanLocation[1]
        ) {
          console.log("first if");
          cellType = "pacman";
          cellObject[cellCoordinates] = cellType;
          //is pacman location = to x & y
        } else if (
          x === this.props.coinLocations[0][0] &&
          y === this.props.coinLocations[0][1]
        ) {
          //coin location needs WORK
          console.log("second if");
          cellType = "coin";
          cellObject[cellCoordinates] = cellType;
        } else {
          console.log("else");
          cellType = "blank";
          cellObject[cellCoordinates] = cellType;
        }
      }
    }
    this.coordinatesArray = coordinatesArray;

    return cellObject;
  }

  //   render() {
  //     return (
  //       //make a row here
  //       <div className="grid-container">
  //         <div className="row">
  //           {(() => {
  //             let cellObject = this.renderCell();
  //             //extra for loop in here 2 make rows
  //             //row 1 and all its cells etc
  //             console.log(this.coordinatesArray, "coordinatesArray");
  //             let cells = [];
  //             for (let coordinate in cellObject) {
  //               cells.push(
  //                 <Cell
  //                   key={coordinate}
  //                   coordinates={coordinate}
  //                   cellType={cellObject[coordinate]}
  //                 />
  //               );
  //             }
  // {/*             console.log(cells, "cellss");
  //             let rowsArray = [];
  //             let row = []; //this shld be redefined in every iteration of this loop
  //             let newRow = "row" + rowsArray.length;
  //             for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
  //               console.log("if condition", !(row.length === this.grid.length)); //currently is always true
  //               console.log("grid length", this.grid.length); //is correctly evaluating to 3
  //               if (!(row.length === this.grid.length)) {
  //                 row.push(cells[cellIndex]); //satisfies the condition of pushing onto a row until it hits max number of cells
  //                 rowsArray.push(row);
  //               } else {
  //                 console.log(newRow);
  //               }
  //               console.log(row, "row");
  //               console.log(rowsArray, "rowArray");
  //             }
  //             return cells; */}
  //           })()}
  //         </div>
  //       </div>
  //     );
  //   }

  render() {
    return (
      <div className="grid-container">
        {/* {(() => {
          let cellsObject = this.renderCells();
          //get x and y coordinates
          let rowsArray = [];
          let cellsArray = []; //in the row??

          for (let x = 0; x < this.grid.length; x++) {
            console.log(this.grid.length, "grid length");

            rowsArray.push(
              <div className="row">
                {(() => {
                  for (let y = 0; y < this.grid.length; y++) {
                    let cellCoordinates = [x, y];
                    cellsArray.push(
                      <Cell
                        cellCoordinates={cellCoordinates}
                        cellType={cellsObject[cellCoordinates]}
                      />
                    );
                  }
                  return cellsArray;
                })()}
              </div>
            );
          }
          console.log(rowsArray);
          return rowsArray;
        })()} */}

        {[...Array(this.grid.length).keys()].map((x) => {
          return (
            <div className="row">
              {[...Array(this.grid.length).keys()].map((y) => {
                return (
                  <Cell
                    cellCoordinates={[x, y]}
                    cellType={this.renderCells()[[x, y]]}
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

// for eaach row create a new row
