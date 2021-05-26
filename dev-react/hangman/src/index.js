import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Game, NewGameButton } from "./Game";

function WinPage(props) {
  return (
    <div className={props.className}>
      <h1 style={{ textAlign: "center" }}>Yay, you won!</h1>
      <h1 className="emoji">😄</h1>
      <NewGameButton
        type="end-screen-button"
        onClick={() => {
          props.startGame();
        }}
      />
    </div>
  );
}

function LosePage(props) {
  return (
    <div className={props.className}>
      <h1 style={{ textAlign: "center" }}>Sorry, you lost!</h1>
      <h1 className="emoji">😞</h1>
      <h2 style={{ textAlign: "center" }}>
        The word was <span className="colour-text">{props.gameWord}</span>
      </h2>
      <NewGameButton
        type="end-screen-button"
        onClick={() => {
          props.startGame();
        }}
      />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.words = [
      "frozen",
      "locate",
      "butterfly",
      "marine",
      "reflection",
      "resort",
      "ceiling",
      "convict",
      "barrier",
      "confrontation",
      "behave",
      "appeal",
      "ignore",
      "opinion",
      "cheque",
      "mature",
      "cylinder",
      "strain",
      "accurate",
      "conversation",
    ];
    this.state = {
      gameState: "unstarted",
      gameWord: null,
      lettersGuessed: [],
      livesRemaining: null,
    };
  }

  startGame(i) {
    const word = this.words[Math.floor(Math.random() * this.words.length)];

    this.setState({
      gameState: "playing",
      gameWord: word,
    });
  }

  changeGameState(state) {
    this.setState({ gameState: state });
  }

  render() {
    switch (this.state.gameState) {
      case "playing":
        return (
          <div className={this.props.className}>
            <Game
              className="game"
              gameWord={this.state.gameWord}
              startGame={() => this.startGame()}
              changeGameState={(s) => this.changeGameState(s)}
              key={this.state.gameWord}
            />
          </div>
        );
      case "unstarted":
        return (
          <div className={this.props.className}>
            <NewGameButton
              type="start-screen-button"
              onClick={(i) => {
                this.startGame(i);
              }}
            />
          </div>
        );
      case "win":
        return (
          <WinPage
            startGame={() => this.startGame()}
            className={this.props.className}
          />
        );
      case "lose":
        return (
          <LosePage
            startGame={() => this.startGame()}
            className={this.props.className}
            gameWord={this.state.gameWord}
          />
        );
      default:
        return <h1 id="game-error">Sorry, something's gone wrong :(</h1>;
    }
  }
}

ReactDOM.render(<App className="app" />, document.getElementById("root"));
