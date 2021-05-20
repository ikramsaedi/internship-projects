import React from "react";
import { Game, NewGameButton } from "./Game";

class GameBox extends React.Component {
  constructor(props) {
    super(props);
    this.words = ["test"];
    this.state = { gameState: "unstarted" };
  }

  startGame(i) {
    const word = this.words[Math.floor(Math.random() * this.words.length)];
    this.setState({ gameState: "playing", gameWord: word });
  }

  render() {
    switch (this.state.gameState) {
      case "playing":
        return (
          <div className={this.props.className}>
            <Game />
          </div>
        );
      case "unstarted":
        return (
          <div className={this.props.className}>
            <NewGameButton
              size="large"
              onClick={(i) => {
                this.startGame(i);
              }}
            />
          </div>
        );
      case "win":
        return (
          <div className={this.props.className}>
            <h1>temp</h1>
          </div>
        );
      case "lose":
        return (
          <div className={this.props.className}>
            <h1>temp</h1>
          </div>
        );
      default:
        return <h1 id="game-error">Sorry, something's gone wrong :(</h1>;
    }
  }
}

function App() {
  return <GameBox className="game-box" />;
}

export default App;
