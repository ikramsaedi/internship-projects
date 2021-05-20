import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Game extends React.Component {
  wordGenerator() {
    let wordList = ["fish", "rudesdsfjksk"];
    let wordIndex = Math.floor(Math.random() * wordList.length); //randomly generates an index in the array
    console.log(wordList[wordIndex]);
    return wordList[wordIndex];
  } //passing props
  //non deterministic -> like wordGenerator vs deterministic

  underscoreGenerator() {
    let word = this.wordGenerator();
    let underscoreNumber = word.length;
    console.log(underscoreNumber + "number");
    //Array(underscoreNumber);
    return underscoreNumber;
  }
  //underscoreNumber = wordList[wordIndex].length
  //using that number, make an underscore

  render() {
    return (
      <div>
        <h1 className="hangman-header">HANGMAN</h1>
        <Word className="word" wordGenerator={() => this.wordGenerator()} />
        <p>{this.wordGenerator()}</p>
        <p>{this.underscoreGenerator()}</p>
      </div>
    );
  }
}

class Word extends React.Component {
  render() {
    this.props.wordGenerator();
    return <p className={this.props.className}>_ _ _ _</p>; //replace this with actual amount of underscores for each character
  }
}

class Input extends React.Component {}

class WrongLetters extends React.Component {}

class HangmanDrawing extends React.Component {}

ReactDOM.render(<Game />, document.getElementById("root"));
