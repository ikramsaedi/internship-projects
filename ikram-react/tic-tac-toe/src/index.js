import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  console.log("in square function :D");
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
    //doesnt need brackets in the onClick function... bc alr a functionn?
    //wld normally b onClick={() => this.props.onClick()
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let squareClass;
    if (this.props.winner) {
      squareClass = "winning-squares square";
    } else {
      squareClass = "square";
    }
    console.log("board renderSquare function");

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        className={squareClass}
      />
    );
    //passing in a prop(erty) called value to Square
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
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0, //gets updated by the jumpTo method
      xIsNext: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    console.log("the jumpto function");
  }

  handleClick(i) {
    console.log(i + "yooo");
    console.log(this.state.history[0].squares + "yoohoo"); //this is undefined
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    console.log(current);
    console.log(current.squares);

    const squares = current.squares.slice(); //new squares array
    console.log("game handleclick");
    console.log(squares[i] + "yoohoo");
    if (calculateWinner(squares) || squares[i]) {
      return; //returns nothing because we dont want it to go on to the next move, so this pretty much ends the game
    }
    squares[i] = this.state.xIsNext ? "X" : "O"; //if state is next is true -> X, if not -> O
    this.setState({
      history: history.concat([
        {
          squares: squares, //sets original squares array to b equivalent to new squares array
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, //sets isNext to be the opposite (false in this case) to allow for switching between X and O
    });
  }
  render() {
    console.log("game render");
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    //store the result of calculateWinner into the winner variable

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      console.log(history);
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}> {desc}</button>
        </li>
      );
    });
    console.log(winner);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (!winner && this.state.stepNumber === 9) {
      status = "It's a draw!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  console.log("calculateWinner");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //first vertical
    [1, 4, 7], //second vertical
    [2, 5, 8], //third vertical
    [0, 4, 8], //top left diagonal
    [2, 4, 6], //top right diagonal
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
