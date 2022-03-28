import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useState } from "react";
import Gallery from "./FunctionalGallery";

function Website(props) {
    let buttonTexts = ["all habitats", "aquatic", "forest", "snow"];
    const [filter, updateFilter] = useState("all habitats");

    return (
        <div>
            <div id="header">
                <p id="heading">Ikram's Animal Photo Gallery</p>
                <NavBar
                    buttonTexts={buttonTexts}
                    updateFilter={() => updateFilter()}
                />
            </div>
            <Gallery filter={filter} buttonTexts={buttonTexts} />
        </div>
    );
}

function NavBar(props) {
    return (
        <div className="navbar">
            {props.buttonTexts.map((element) => (
                <NavBarButton
                    text={element}
                    updateFilter={(filterName) =>
                        props.updateFilter(filterName)
                    }
                />
            ))}
        </div>
    );
}

function NavBarButton(props) {
    const onClickHabitat = () => {
        props.updateFilter(props.text);
    };

    return (
        <div>
            <button className="navbar-button" onClick={onClickHabitat}>
                {props.text}
            </button>
        </div>
    );
}
