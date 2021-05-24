import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.word = this.wordGenerator();
    this.handleKey = this.handleKey.bind(this);
    /*     this.chosenLetters = [];
    this.correctLetters = [];
    this.incorrectLetters = []; */

    this.state = {
      chosenLetters: [],
      correctLetters: [],
      incorrectLetters: [],
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
    console.log(underscoreNumber + "number");
    let underscoreArray = Array(underscoreNumber).fill("_");
    let underscore = underscoreArray.join(" ");
    console.log(underscore);
    return underscore;
  }

  handleKey(event) {
    let letter = event.key;

    if (
      //correct letter
      letter.match(/[a-z]/) &&
      letter.length === 1 &&
      !this.state.chosenLetters.includes(letter) &&
      this.word.includes(letter)
    ) {
      /* this.state.chosenLetters.push(letter);
      this.state.correctLetters.push(letter); */

      this.setState({
        correctLetters: [].push(letter),
        chosenLetters: [].push(letter),
      });

      console.log(this.state.correctLetters);
    } else if (
      letter.match(/[a-z]/) && //if its wrong
      letter.length === 1 &&
      !this.state.chosenLetters.includes(letter) &&
      !this.word.includes(letter)
    ) {
      /*  this.state.chosenLetters.push(letter);
      this.state.incorrectLetters.push(letter); */

      /*  this.setState({
        incorrectLetters: this.incorrectLetters,
      }); */

      this.setState({
        incorrectLetters: [].push(letter),
      });
      console.log(this.state.incorrectLetters);
    } else if (
      //alr chosen letter
      letter.match(/[a-z]/) &&
      letter.length === 1 &&
      this.state.chosenLetters.includes(letter)
    ) {
      console.log("You've already chosen this letter!");
      /* this.setState({
        alreadyPressed: true,
      });
      if (alreadyPressed["true"]) {
        return "You've already chosen this letter";
      } */
    }
    return this.state.chosenLetters;
  }

  /* stringifyIncorrect() {
    let stringifiedIncorrect = this.incorrectLetters.join(" ");
    console.log(stringifiedIncorrect);
    return stringifiedIncorrect;
  } */

  /*   counter() {
    if (this.incorrectLetters.length === this.incorrectLetters + 1) {
    }
    for (lives = 9; lives > 0; lives--) {}
  } */

  //underscoreNumber = wordList[wordIndex].length
  //using that number, make an underscore

  render() {
    return (
      <div>
        <h1 className="hangman-header">HANGMAN</h1>
        <p>{this.word}</p>
        <p>{this.underscoreGenerator()}</p>
        <p> {this.state.incorrectLetters}</p>
        <form>
          <input type="text" onKeyPress={this.handleKey} />
        </form>
      </div>
    );
  }
}

class Word extends React.Component {
  /*   render() {
    this.props.wordGenerator();
    return <p className={this.props.className}>_ _ _ _</p>; //replace this with actual amount of underscores for each character
  } */
}

class Input extends React.Component {}

class WrongLetters extends React.Component {
  constructor(props) {
    super(props);
  }
}

class HangmanDrawing extends React.Component {}

ReactDOM.render(<Game />, document.getElementById("root"));
