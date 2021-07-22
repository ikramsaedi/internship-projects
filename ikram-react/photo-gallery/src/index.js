import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import _, { range } from "underscore";

class Website extends React.Component {
  constructor(props) {
    super(props);
    this.buttonTexts = ["all habitats", "aquatic", "forest", "snow"];
    this.updateFilter = this.updateFilter.bind(this);
    this.state = {
      filter: "all habitats",
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
        <NavBar
          buttonTexts={this.buttonTexts}
          updateFilter={this.updateFilter.bind(this)}
        />
        <Gallery filter={this.state.filter} buttonTexts={this.buttonTexts} />
      </div>
    );
  }
}
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  //this was supposed to have the onclick

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
      {
        imgSrc: "./assets/snowshoe-hare.jpeg",
        habitat: "snow",
        fact: "Snowshoe hares have hind feet that are 117 to 147 mm long, acting like snowshoes so they can stay on top of the snow.",
      },
    ];

    this.state = {
      cellsDisplayed: this.cellsArray,
    };
  }

  filterCells() {
    let cellsDisplayed = [];

    if (this.props.filter === "all habitats") {
      return this.cellsArray;
    } else {
      for (let index = 0; index < this.cellsArray.length; index++) {
        if (this.cellsArray[index]["habitat"] === this.props.filter) {
          cellsDisplayed.push(this.cellsArray[index]);
        }
      }
      return cellsDisplayed;
    }
  }

  render() {
    console.log(this.props.filter, "in gallery render");
    return (
      <div>
        <h3>This is a gallery</h3>
        <Grid cellsArray={this.filterCells()} />
      </div>
    );
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
