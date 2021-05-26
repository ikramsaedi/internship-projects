import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//assets
import pic9 from "./assets/9.png";
import pic8 from "./assets/8.png";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.word = this.wordGenerator();
    this.handleKey = this.handleKey.bind(this);
    //this.gameStatus = this.gameOutcome();

    this.state = {
      chosenLetters: [],
      correctLetters: [],
      incorrectLetters: [],
      remainingLives: 9,
      underscoreArray: this.underscoreGenerator(),
      //alreadyPressed: false,
    };
  }
  wordGenerator() {
    let wordList = ["fish", "rudesdsfjksk", "hello", "teehee"];
    let wordIndex = Math.floor(Math.random() * wordList.length); //randomly generates an index in the array
    console.log(wordList[wordIndex]);

    return wordList[wordIndex];
  } //passing props
  //non deterministic -> like wordGenerator vs deterministic

  underscoreGenerator() {
    let underscoreNumber = this.word.length;
    let underscoreArray = [];
    console.log(underscoreArray);
    let newUnderScoreArray = underscoreArray.concat(
      Array(underscoreNumber).fill("_ ")
    );
    console.log("this is the underscore generator");

    return newUnderScoreArray;
  }

  handleKey(event) {
    let letter = event.key;
    let incorrectLettersArray = this.state.incorrectLetters.slice();
    let correctLettersArray = this.state.correctLetters.slice();
    let chosenLettersArray = this.state.chosenLetters.slice();

    let remainingLives = this.state.remainingLives;

    if (
      //correct letter
      letter.match(/[a-z]/) &&
      letter.length === 1 &&
      !this.state.chosenLetters.includes(letter) &&
      this.word.includes(letter)
    ) {
      let newUnderscoreArray = this.letterReplacer(
        letter,
        this.word,
        this.state.underscoreArray
      );
      correctLettersArray.push(letter);
      this.setState({
        correctLetters: correctLettersArray,
        underscoreArray: newUnderscoreArray,
      });
    }
    if (
      letter.match(/[a-z]/) && //if its wrong
      letter.length === 1 &&
      !this.state.chosenLetters.includes(letter) &&
      !this.word.includes(letter) &&
      remainingLives > 0
    ) {
      incorrectLettersArray.push(letter);
      remainingLives -= 1;

      this.setState({
        incorrectLetters: incorrectLettersArray,
        remainingLives: remainingLives,
      });
    } else if (
      //alr chosen letter
      letter.match(/[a-z]/) &&
      letter.length === 1 &&
      this.state.chosenLetters.includes(letter)
    ) {
      console.log("You've already chosen this letter!");
    } else if (remainingLives === 0) {
      console.log("Game over!");
      //redirect to losing.jsx
    }
    this.gameOutcome(correctLettersArray);
    return this.state.chosenLetters;
  }

  letterReplacer(letter, word, underscoreArray) {
    let underscoreArrayCopy = underscoreArray;

    for (let i = 0; i < word.length; i++) {
      //iterating thru the indexes of the word (this needs to be string indexing)

      if (word.charAt(i) === letter) {
        console.log("this is the letter replacer");

        underscoreArrayCopy[i] = letter;
      }
    }
    console.log(underscoreArrayCopy + " this is the new underscoreArray");

    return underscoreArrayCopy;
  }

  gameOutcome(correctLettersArray) {
    let gameStatus;
    let wordArray = this.word.split("");
    console.log(correctLettersArray + "correct letters");
    console.log(
      wordArray.every((arrayElement) =>
        correctLettersArray.includes(arrayElement)
      )
    );

    console.log(this.state.remainingLives);
    if (
      this.state.remainingLives === 1 &&
      this.state.underscoreArray.includes("_ ")
    ) {
      gameStatus = "losing";
      console.log("You've lost. </3");
      //redirect to losing page
    } else if (
      this.state.remainingLives > 0 &&
      wordArray.every((arrayElement) =>
        correctLettersArray.includes(arrayElement)
      )
    ) {
      gameStatus = "winning";
      console.log("You've won! :D");
      //redirect to winning page
    } else {
      gameStatus = "playing";
      console.log("Keep playing");
    }
    this.props.onChangeGameState(gameStatus);
    return gameStatus;
  }

  render() {
    return (
      <div>
        <h1 className="hangman-header">HANGMAN</h1>
        <img src={pic9}></img>
        <p>{this.state.underscoreArray}</p>
        <p> {this.state.incorrectLetters}</p>
        <form>
          <input type="text" onKeyPress={this.handleKey} />
        </form>
        <p>{this.state.remainingLives}</p>
      </div>
    );
  }
}

class Winning extends React.Component {
  render() {
    return (
      <div>
        <p>You won!</p>
      </div>
    );
  }
}

class Losing extends React.Component {
  render() {
    return (
      <div>
        <p>You've lost!</p>
      </div>
    );
  }
}

class ChangeGameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: "playing",
    };
  }

  onChangeGameState(i) {
    console.log("this", this);
    this.setState({
      gameState: i,
    });
  }
  render() {
    if (this.state.gameState === "losing") {
      return <Losing />;
    }
    if (this.state.gameState === "winning") {
      return <Winning />;
    }
    if (this.state.gameState === "playing") {
      return <Game onChangeGameState={(i) => this.onChangeGameState(i)} />;
    }
  }
}

ReactDOM.render(<ChangeGameState />, document.getElementById("root"));
