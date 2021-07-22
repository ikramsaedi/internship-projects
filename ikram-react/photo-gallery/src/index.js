import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import _, { range } from "underscore";

class Website extends React.Component {
  constructor(props) {
    super(props);
    this.buttonTexts = ["all habitats", "aquatic", "forest", "snowy"];
    this.updateFilter = this.updateFilter.bind(this);
    this.state = {
      filter: "no filter",
    };
  }

  updateFilter(filterName) {
    console.log(filterName, "in update filter");
    this.setState({
      filter: filterName,
    });
  }

  render() {
    return (
      <div>
        <h1>Animal Gallery</h1>
        <NavBar
          buttonTexts={this.buttonTexts}
          updateFilter={this.updateFilter}
        />
        <Gallery filter={this.state.filter} />
      </div>
    );
  }
}
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  /*  onClickHabitat() {
    if(){

    }
    this.props.updateFilter("aquatic");
  }
 */

  render() {
    return (
      <div className="navbar">
        {this.props.buttonTexts.map((element) => (
          <NavBarButton
            text={element}
            updateFilter={(filterName) => this.props.updateFilter(filterName)}
          />
        ))}
      </div>
    );
  }
}

class NavBarButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHabitat() {
    this.props.updateFilter(this.props.text);
  }
  render() {
    return (
      <div>
        <button onClick={this.onClickHabitat.bind(this)}>
          {this.props.text}
        </button>
      </div>
    );
  }
}
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.cellsArray = [
      {
        imgSrc: "./assets/rusty-spotted-cat.jpeg",
        habitat: "forest",
        fact: "The rusty spotted cat is the smallest adult cat species in the world, weighing 1.4kg on average!",
      },
      {
        imgSrc: "./assets/beaver.jpeg",
        habitat: "aquatic",
        fact: "Beavers have orange teeth because of the iron present in them, allowing them to cut down trees!",
      },
      {
        imgSrc: "./assets/blanket-squid.jpeg",
        habitat: "aquatic",
        fact: "Female blanket squid (as displayed) can be long as 1.8metres whereas their male counterparts are the size of a walnut!",
      },
      {
        imgSrc: "./assets/vogelkop.png",
        habitat: "forest",
        fact: "This is their courtship dance",
      },
      {
        imgSrc: "./assets/bigfin-squid.jpeg",
        habitat: "aquatic",
        fact: "Up to 7 metres long",
      },
      {
        imgSrc: "./assets/macgregor-bowerbird.jpeg",
        habitat: "forest",
        fact: "Male MacGregor's bowerbirds make towers of sticks, dead flowers of up to a metre tall that they maintain and decorate for up to 7 years to attract a mate.",
      },
      {
        imgSrc: "./assets/vampire-squid.jpeg",
        habitat: "aquatic",
        fact: "Vampire squid are not threatening and are like the vaccuum of the ocean as they consume small particles like dead plankton and fecal pellets.",
      },
      {
        imgSrc: "./assets/raccoon.jpeg",
        habitat: "forest",
        fact: "Raccoons wash their food before they eat it!",
      },
    ];

    this.state = {
      cellsDisplayed: [],
    };
  }

  filterCells() {
    let cellsDisplayed = [];
    for (let index = 0; index < this.cellsArray.length; index++) {
      if (this.cellsArray[index]["habitat"] === "aquatic") {
        cellsDisplayed.push(this.cellsArray[index]);
      }
    }
    this.setState({
      cellsDisplayed: cellsDisplayed,
    });

    console.log(cellsDisplayed);
    return "hi";
  }

  render() {
    console.log(this.props.filter, "in render");
    return (
      <div>
        <h3>This is a gallery</h3>
        <Grid cellsArray={this.cellsArray} />
        <Button filterCells={this.filterCells.bind(this)} />
      </div>
    );
  }
}
class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.filterCells.bind(this)}>hii</button>;
  }
}
class Grid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cellsLength = this.props.cellsArray.length;
    let rowsAmount = Math.ceil(cellsLength / 3);

    return (
      <div className="grid-container">
        {(() => {
          return range(0, rowsAmount).map((row) => {
            let rowLength = Math.min(cellsLength - row * 3, 3);

            return (
              <div className="row">
                {range(0, rowLength).map((column) => {
                  return (
                    <Cell
                      imgSrc={this.props.cellsArray[row * 3 + column]["imgSrc"]}
                      className="cell"
                    />
                  );
                })}
              </div>
            );
          });
        })()}
      </div>
    );
  }
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //require("./assets/rusty-spotted-cat.jpeg").default is the syntax
    return (
      <div>
        <img
          className={this.props.className}
          src={require(`${this.props.imgSrc}`).default}
        ></img>
      </div>
    );
  }
}

ReactDOM.render(<Website />, document.getElementById("root"));
