import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import rustySpottedCat from "./assets/rusty-spotted-cat.jpeg";
import beaver from "./assets/beaver.jpeg";
import blanketSquid from "./assets/blanket-squid.jpeg";
import vogelkop from "./assets/vogelkop.png";

class Website extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "no filter",
    };
  }

  updateFilter(filterName) {
    this.setState({
      filter: filterName,
    });
  }

  render() {
    return (
      <div>
        <h1>Animal Gallery</h1>
        <NavBar />
        <Gallery />
        <img src={require("./assets/rusty-spotted-cat.jpeg").default} alt="" />
      </div>
    );
  }
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.cellsArray = [
      {
        imgSrc: rustySpottedCat,
        habitat: "forest",
        fact: "The rusty spotted cat is the smallest adult cat species in the world, weighing 1.4kg on average!",
      },
      {
        imgSrc: beaver,
        habitat: "aquatic",
        fact: "Beavers have orange teeth because of the iron present in them, allowing them to cut down trees!",
      },
      {
        imgSrc: blanketSquid,
        habitat: "aquatic",
        fact: "Female blanket squid (as displayed) can be long as 1.8metres whereas their male counterparts are the size of a walnut!",
      },
      {
        imgSrc: vogelkop,
        habitat: "forest",
        fact: "This is their courtship dance",
      },
    ];
  }

  render() {
    return (
      <div>
        <h3>This is a gallery</h3>
        <Grid cellsArray={this.cellsArray} />
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  loopy() {
    for (let x = 0; x < 3; x++) {
      <div />;
    }
    return <div />;
  }
  render() {
    console.log(this.props.cellsArray[0]["imgSrc"]);
    return (
      <div className="grid-container">
        {/*         {(() => {
         for (let x = 0; x < Math.ceil(this.props.cellsArray / 3); x++) {
            <div className="row">{(() => {})()}</div>;
          }
          return <div />;
        })()} */}

        {/* {(() => {
          for (
            let cellindex = 0;
            cellindex < this.props.cellsArray.length;
            cellindex++
          ) {
            if (cellindex % 3 === 0) {
              return (
                <div className="row" key={cellindex}>
                  <Cell
                    className="cell"
                    imgSrc={this.props.cellsArray[cellindex]["imgSrc"]}
                  />
                  <Cell
                    className="cell"
                    imgSrc={this.props.cellsArray[cellindex]["imgSrc"]}
                  />
                </div>
              );
            }
          }
        })()} */}

        {this.props.cellsArray.map((element, cellindex) => {
          if (cellindex % 3 === 0) {
            return (
              <div className="row">
                {[...Array(3).keys()].map((x) => {
                  console.log(cellindex, "cellindex");
                  console.log(cellindex + x, "+x");
                  if (this.props.cellsArray[cellindex + x] !== undefined) {
                    return (
                      <Cell
                        className="cell"
                        imgSrc={this.props.cellsArray[cellindex + x]["imgSrc"]}
                      />
                    );
                  }
                })}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.number);
    return (
      <div>
        <img className={this.props.className} src={this.props.imgSrc}></img>
      </div>
    );
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2> NavBar</h2>
        <NavBarButton />
      </div>
    );
  }
}

class NavBarButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button>Navbar button</button>
      </div>
    );
  }
}

ReactDOM.render(<Website />, document.getElementById("root"));
