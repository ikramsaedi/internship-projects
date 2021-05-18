import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let squareClass = "square";

    if (this.props.winningCells && this.props.winningCells.includes(i)) {
      squareClass += " winning-cell";
    }

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
        className={squareClass}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className="time-travel-button"
          >
            {desc}
          </button>
        </li>
      );
    });

    const result = calculateWinner(current.squares);

    const winner = result.winner;
    let status;

    if (winner) {
      status = winner + " is the winner!";
    } else if (!winner && this.state.stepNumber >= 9) {
      status = "This game is a tie!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningCells={result.cells}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //
      return { winner: squares[a], cells: [a, b, c] };
    }
  }
  return { winner: null, cells: null };
}

/*
things needed
- a way to get the three winning cells 
  - return an object with squares[a] and [a,b,c]
  - use [a,b,c] to find the winning cells
  - apply the class to them?
    - can i use .add?
    - don't need to maybe? if the status is reset when time traveling, we can also just += the class 
      when it is a winning cell, and have a default case for when it isn't
      see https://reactjs.org/docs/faq-styling.html 
- a way to add a class on those cells
- a way to remove that class when time traveling
*/
