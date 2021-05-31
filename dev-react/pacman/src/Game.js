import React from "react";
import styled from "styled-components";
import "./App.css";

import pacman from "./resources/pacman.png";

function Pacman(props) {
  return <img src={props.img} alt="pacman sprite" />;
}

class UnstyledGame extends React.Component {

  render() {
    return (
      <div id="game" className={this.props.className}>
        <Pacman img={pacman} />
      </div>
    );
  }
}

const Game = styled(UnstyledGame)`
  background-color: black;
  color: white;
  width: 60%;
  height: 800px;
  margin: 0 auto;
`;

export default Game;
