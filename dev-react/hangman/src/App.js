import React from "react";
import img0 from "./resources/0-lives-left.png";
import img1 from "./resources/1-lives-left.png";
import img2 from "./resources/2-lives-left.png";
import img3 from "./resources/3-lives-left.png";
import img4 from "./resources/4-lives-left.png";
import img5 from "./resources/5-lives-left.png";
import img6 from "./resources/6-lives-left.png";
import img7 from "./resources/7-lives-left.png";
import img8 from "./resources/8-lives-left.png";
import img9 from "./resources/9-lives-left.png";
import img10 from "./resources/10-lives-left.png";
import img11 from "./resources/11-lives-left.png";
import img12 from "./resources/12-lives-left.png";

function NewGameButton(props) {
  return (
    <button className={"new-game-button " + props.type} onClick={props.onClick}>
      New Game
    </button>
  );
}

function LetterButton(props) {
  return (
    <button
      className="letter-button"
      onClick={props.onClick}
      disabled={!props.isActive}
    >
      {props.value}
    </button>
  );
}

class LetterSelectors extends React.Component {
  renderLetterButton(value) {
    const isActive = !this.props.lettersGuessed.includes(value);
    return (
      <LetterButton
        value={value}
        onClick={(i) => this.props.clickFunction(i)}
        isActive={isActive}
        key={value}
      />
    );
  }

  render() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    return (
      <div>{alphabet.map((letter) => this.renderLetterButton(letter))}</div>
    );
  }
}

class WordDisplay extends React.Component {
  render() {
    let displayArray = Array(this.props.gameWord.length).fill("_ ");

    for (let letter of this.props.lettersGuessed) {
      for (let index in this.props.gameWord) {
        if (this.props.gameWord[index] === letter) {
          displayArray[index] = letter;
        }
      }
    }

    return <div className="word-display">{displayArray}</div>;
  }
}

class Score extends React.Component {
  render() {
    let image;
    switch (this.props.livesRemaining) {
      case 0:
        image = img0;
        break;
      case 1:
        image = img1;
        break;
      case 2:
        image = img2;
        break;
      case 3:
        image = img3;
        break;
      case 4:
        image = img4;
        break;
      case 5:
        image = img5;
        break;
      case 6:
        image = img6;
        break;
      case 7:
        image = img7;
        break;
      case 8:
        image = img8;
        break;
      case 9:
        image = img9;
        break;
      case 10:
        image = img10;
        break;
      case 11:
        image = img11;
        break;
      case 12:
        image = img12;
        break;
      default:
        image = "pls don't come to this";
    }

    return (
      <div className={this.props.className}>
        <h4
          className={`score-text${
            this.props.livesRemaining <= 5 ? " colour-text" : ""
          }`}
        >
          {"Lives remaining: " + this.props.livesRemaining}
        </h4>
        <img src={image} alt="hangman" className="score-image" />
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersGuessed: [],
      livesRemaining: 12,
      displayArray: null,
    };
  }

  componentDidMount() {
    this.boundEventListener = (event) => this.handleKey(event);
    document.addEventListener("keydown", this.boundEventListener);

    let array = [];
    // eslint-disable-next-line
    for (let letter in this.props.gameWord) {
      array.push("_ ");
    }

    this.setState({ displayArray: array });
  }

  componentWillUnmount() {
    if (this.boundEventListener) {
      document.removeEventListener("keydown", this.boundEventListener);
    }
  }

  handleClick(event) {
    this.submitLetter(event.target.innerText);
  }

  submitLetter(letterValue) {
    const lettersGuessed = this.state.lettersGuessed.concat(letterValue);

    let displayArray = this.state.displayArray;
    let livesRemaining = this.state.livesRemaining;

    if (!this.props.gameWord.includes(letterValue)) {
      livesRemaining -= 1;
    }

    let gameWon = true;
    for (let letter of this.props.gameWord) {
      if (!lettersGuessed.includes(letter)) {
        gameWon = false;
      }
    }

    if (gameWon) {
      this.props.changeGameState("win");
    }

    if (livesRemaining === 0) {
      this.props.changeGameState("lose");
    }

    this.setState({
      lettersGuessed: lettersGuessed,
      displayArray: displayArray,
      livesRemaining: livesRemaining,
    });
  }

  handleKey(event) {
    if (event.repeat) {
      return;
    }

    if (this.state.lettersGuessed.includes(event.key)) {
      return;
    }

    const singleLetterRegex = /^[a-z]$/;

    if (singleLetterRegex.test(event.key)) {
      this.submitLetter(event.key);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <NewGameButton
          type="ingame-button"
          onClick={(i) => {
            this.props.startGame(i);
          }}
        />
        <Score className="score" livesRemaining={this.state.livesRemaining} />
        <WordDisplay
          gameWord={this.props.gameWord}
          displayArray={this.state.displayArray}
          lettersGuessed={this.state.lettersGuessed}
        />
        <LetterSelectors
          lettersGuessed={this.state.lettersGuessed}
          clickFunction={(i) => this.handleClick(i)}
        />
      </div>
    );
  }
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
      displayArray: null,
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
          <div className={this.props.className}>
            <h1 style={{ textAlign: "center" }}>Yay, you won!</h1>
            <h1 className="emoji">😄</h1>
            <NewGameButton
              type="end-screen-button"
              onClick={() => {
                this.startGame();
              }}
            />
          </div>
        );
      case "lose":
        return (
          <div className={this.props.className}>
            <h1 style={{ textAlign: "center" }}>Sorry, you lost!</h1>
            <h1 className="emoji">😞</h1>
            <h2 style={{ textAlign: "center" }}>
              The word was{" "}
              <span className="colour-text">{this.state.gameWord}</span>
            </h2>
            <NewGameButton
              type="end-screen-button"
              onClick={() => {
                this.startGame();
              }}
            />
          </div>
        );
      default:
        return <h1 id="game-error">Sorry, something's gone wrong :(</h1>;
    }
  }
}

export default App;
