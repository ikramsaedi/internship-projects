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
    this.xCoordArray = [0, 1, 2];
    this.yCoordArray = this.xCoordArray;
    this.coordinatesArray = [
      [0, 0],
      [0, 1],
      [0, 2],
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

  renderCellType(coordinatesArray) {
    //renders cells based off their cell coords and displays their coin or pacman sstatus
    //shld actually be sth like coordinatesArray[unknown][0]
    if (
      coordinatesArray[0][0] === this.props.pacmanLocation[0] &&
      coordinatesArray[0][1] === this.props.pacmanLocation[1]
    ) {
      //if the x coordinate = the location
      return "pacman";
    }
    if (this.props.coinLocations.includes(coordinatesArray)) {
      return "coin";
    } else {
      return "blank";
    }
  }

  render() {
    console.log(this.coordinatesArray);
    return (
      //make a row here
      <div>
        <p>{this.renderCellType(this.coordinatesArray)}</p>

        <div className="grid">
          <p className="cell"> dskfjdls </p>
          <p className="cell"> heyooo </p>
          <p className="cell"> sjfkdfj </p>
        </div>
        <Cell coordinates={this.coordinatesArray} />
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
      cellContents: "blank",
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
    return <p>{this.display()}</p>;
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
