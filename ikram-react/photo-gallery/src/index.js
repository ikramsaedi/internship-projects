import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Website extends React.Component {
  constructor(props) {
    super(props);
    this.buttonTexts = ["all habitats", "aquatic", "forest", "snowy"];
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
        <NavBar buttonTexts={this.buttonTexts} />
        <Gallery />
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
      <div className="navbar">
        {this.props.buttonTexts.map((element, index) => (
          <NavBarButton text={element} />
        ))}
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
        <button>{this.props.text}</button>
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

  render() {
    return (
      <div className="grid-container">
        {this.props.cellsArray.map((element, cellindex) => {
          if (cellindex % 3 === 0) {
            return (
              <div className="row">
                {[...Array(3).keys()].map((x) => {
                  //iterating up until 3
                  if (this.props.cellsArray[cellindex + x] !== undefined) {
                    //cellindex + x is cellindex + 0, +1, +2, and this number is used to access the objs in cellsArray
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
    console.log(this.props.number); //require("./assets/rusty-spotted-cat.jpeg").default is the syntax
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
