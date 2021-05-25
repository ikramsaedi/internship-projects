import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.word = this.wordGenerator();
    this.handleKey = this.handleKey.bind(this);

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
    //this.setState({ underscoreArray: Array(underscoreNumber).fill("_ ") });
    //let underscoreArray = underscoreArray(underscoreNumber).fill("_ ");
    //let underscore = underscoreArray.join(" ");

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
        //returns undefined
        letter,
        this.word,
        this.state.underscoreArray
      );
      this.setState({
        correctLetters: correctLettersArray,
        chosenLetters: chosenLettersArray,
        underscoreArray: newUnderscoreArray, //here it is getting undefined
      });

      console.log(this.state.correctLetters);
      console.log(this.state.underscoreArray + "newArray");
    } else if (
      letter.match(/[a-z]/) && //if its wrong
      letter.length === 1 &&
      !this.state.chosenLetters.includes(letter) &&
      !this.word.includes(letter) &&
      remainingLives > 0
    ) {
      chosenLettersArray.push(letter);
      incorrectLettersArray.push(letter);
      remainingLives -= 1;

      this.setState({
        chosenLetters: chosenLettersArray,
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
    } else if (remainingLives <= 0) {
      console.log("Game over!");
    }
    return this.state.chosenLetters;
  }

  letterReplacer(letter, word, underscoreArray) {
    let underscoreArrayCopy = underscoreArray;

    for (let i = 0; i < word.length; i++) {
      //iterating thru the indexes of the word (this needs to be string indexing)

      if (word.charAt(i) === letter) {
        console.log(word + "word");

        underscoreArrayCopy[i] = letter;
      }
    }
    return underscoreArrayCopy;
    //return (underscoreArray[letterIndex] = letter); // then change the underscore at the same index to be the letter
  }

  render() {
    return (
      <div>
        <h1 className="hangman-header">HANGMAN</h1>
        <p>{this.word}</p>
        <p>{this.state.underscoreArray}</p>
        <p> {this.state.incorrectLetters}</p>
        <form>
          <input type="text" onKeyPress={this.handleKey} />
        </form>
        <p>{this.state.remainingLives}</p>
        <p>{}</p>
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
