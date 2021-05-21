import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.word = this.wordGenerator();
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
  //underscoreNumber = wordList[wordIndex].length
  //using that number, make an underscore

  render() {
    return (
      <div>
        <h1 className="hangman-header">HANGMAN</h1>
        <p>{this.word}</p>
        <p>{this.underscoreGenerator()}</p>
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

class WrongLetters extends React.Component {}

class HangmanDrawing extends React.Component {}

ReactDOM.render(<Game />, document.getElementById("root"));
