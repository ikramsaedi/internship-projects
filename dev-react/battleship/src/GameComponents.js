import React from "react";
import styled from "styled-components";
import "./App.css";

function UnstyledCell(props) {
  return (
    <button
      className={props.className}
      onClick={props.cellHandler}
      disabled={props.alreadyGuessed}
      value={props.value}
    >
      {props.content}
    </button>
  );
}

const Cell = styled(UnstyledCell)`
  min-width: 64px;
  height: 64px;
  border: 1px black solid;
  background-color: white;
  margin-right: -1px;
  margin-top: -3px;
  font-weight: bold;
  padding: 0px;
  vertical-align: top;

  &:hover {
    background-color: lightgrey;
  }
`;

function UnstyledRow(props) {
  let output = [];
  for (let j = 0; j < props.gridSize; j++) {
    // console.log(`rendering cell ${j}`);

    output.push(
      <Cell
        value={`${props.rowNum}, ${j}`}
        content={props.allCells[`${props.rowNum}, ${j}`]}
        cellHandler={props.clickHandler}
      />
    );
  }

  return <div className={props.className}>{output}</div>;
}

const Row = styled(UnstyledRow)`
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

class GameGrid extends React.Component {
  render() {
    let rowsArray = [];
    for (let i = 0; i < this.props.gridSize; i++) {
      rowsArray.push(i);
    }

    return (
      <div>
        {rowsArray.map((rownum) => {
          return (
            <Row
              rowNum={rownum}
              clickHandler={(i) => this.props.clickHandler(i)}
              allCells={this.props.allCells}
              gridSize={this.props.gridSize}
            />
          );
        })}
      </div>
    );
  }
}

class GameSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // maybe instead of dragging, you select the ship and then click the new space to put it? that might be easier with this cell grid
    // i think the best way will be to select a ship from a menu, select a direction then pick the start cell
    return (
      <div>
        <h1>This page will show the ships and allow them to be repositioned</h1>
        <h2>It is currently player {this.props.player}'s turn</h2>
      </div>
    );
  }
}

function GameBoard(props) {
  return (
    <div>
      <h1>This page will display the current hits and misses made</h1>
      <h2>It is currently player {props.player}'s turn</h2>
      <GameGrid
        gridSize={props.gridSize}
        allCells={props.allCells}
        clickHandler={(i) => props.clickHandler(i)}
      />
    </div>
  );
}

export { GameSetup, GameBoard };
