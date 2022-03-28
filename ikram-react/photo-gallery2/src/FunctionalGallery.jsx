import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import _, { range } from "underscore";
import { useState } from "react";

const cellsArray = [
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
        imgSrc: "./assets/blanket-octopus.jpeg",
        habitat: "aquatic",
        fact: "Female blanket octopus (as displayed) can be long as 1.8metres whereas their male counterparts are the size of a walnut!",
    },
    {
        imgSrc: "./assets/vogelkop.png",
        habitat: "forest",
        fact: "This male vogelkop (a bird of paradise) here is enacting his courtship dance.",
    },
    {
        imgSrc: "./assets/bigfin-squid.jpeg",
        habitat: "aquatic",
        fact: "Bigfin squid are up to 7 metres long!",
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
        fact: "Raccoons wash their food before they eat it! Cleaner than you may think!",
    },
    {
        imgSrc: "./assets/snowshoe-hare.jpeg",
        habitat: "snow",
        fact: "Snowshoe hares have hind feet that are 117 to 147 mm long, acting like snowshoes so they can stay on top of the snow.",
    },
];
function Gallery(props) {
    const filterCells = () => {
        let cellsDisplayed = [];

        if (props.filter === "all habitats") {
            return cellsArray;
        } else {
            for (let index = 0; index < cellsArray.length; index++) {
                if (cellsArray[index]["habitat"] === props.filter) {
                    cellsDisplayed.push(cellsArray[index]);
                }
            }
            return cellsDisplayed;
        }
    };

    const mouseOverPic = (fact) => {
        return true;
    };

    return (
        <div>
            <Grid
                cellsArray={filterCells()}
                mouseOverPic={(fact) => mouseOverPic(fact)}
            />
        </div>
    );
}

function Grid(props) {
    let cellsLength = cellsArray.length;
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
                                        imgSrc={
                                            cellsArray[row * 3 + column][
                                                "imgSrc"
                                            ]
                                        }
                                        className="cell"
                                        mouseOverPic={(fact) =>
                                            props.mouseOverPic(fact)
                                        }
                                        fact={
                                            cellsArray[row * 3 + column]["fact"]
                                        }
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

function Cell(props) {
    [showFact, setFactBool] = useState(false);

    const MouseEnterPic = (fact) => {
        setFactBool(true);
    };

    const mouseLeavePic = (fact) => {
        setFactBool(false);
    };

    return (
        <div
            className="cell-container"
            onMouseEnter={(fact) => mouseEnterPic(props.fact)}
            onMouseLeave={(fact) => mouseLeavePic(props.fact)}
        >
            <img
                className={
                    showFact ? `${props.className} dark-cell` : props.className
                }
                src={require(`${props.imgSrc}`)}
            ></img>
            <div className="fact">
                {(() => {
                    return showFact ? <p>{props.fact}</p> : null;
                })()}
            </div>
        </div>
    );
}

export default Gallery;
