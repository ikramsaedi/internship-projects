import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//assets
import pic9 from "./assets/9.png";
import pic8 from "./assets/8.png";
import pic7 from "./assets/7.png";
import pic6 from "./assets/6.png";
import pic5 from "./assets/5.png";
import pic4 from "./assets/4.png";
import pic3 from "./assets/3.png";
import pic2 from "./assets/2.png";
import pic1 from "./assets/1.png";
import pic0 from "./assets/0.png";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.picturesArray = [
      pic0,
      pic1,
      pic2,
      pic3,
      pic4,
      pic5,
      pic6,
      pic7,
      pic8,
      pic9,
    ];

    this.state = {
      chosenLetters: [],
      correctLetters: [],
      incorrectLetters: [],
      remainingLives: 9,
      underscoreArray: this.underscoreGenerator(),
      //alreadyPressed: false,
    };

    this.gameStatus = this.gameOutcome(this.state.correctLetters);
  }

  underscoreGenerator() {
    console.log(this.props.word, "this is word");
    let underscoreNumber = this.props.word.length;
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
    console.log(remainingLives, "remaining lives");
    if (
      //correct letter
      letter.match(/[a-z]/) &&
      letter.length === 1 &&
      !chosenLettersArray.includes(letter) &&
      this.props.word.includes(letter)
    ) {
      let newUnderscoreArray = this.letterReplacer(
        letter,
        this.props.word,
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
      !chosenLettersArray.includes(letter) &&
      !this.props.word.includes(letter) &&
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
      chosenLettersArray.includes(letter)
    ) {
      console.log("You've already chosen this letter!");
    } else if (remainingLives === 0) {
      console.log("Game over!");
      //redirect to losing.jsx
    }
    this.gameOutcome(correctLettersArray);
    return chosenLettersArray;
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
    let wordArray = this.props.word.split("");
    console.log(correctLettersArray + "correct letters");
    console.log(
      wordArray.every((arrayElement) =>
        correctLettersArray.includes(arrayElement)
      )
    );

    console.log(this.state.remainingLives);
    if (
      this.state.remainingLives === 0 &&
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

  hangmanDrawing() {
    let renderedPicture;
    console.log(this.state.remainingLives);
    for (let picIndex = 9; picIndex >= 0; picIndex--) {
      if (picIndex === this.state.remainingLives) {
        console.log(picIndex, "picIndex");
        renderedPicture = this.picturesArray[picIndex];
        console.log("this is the rendered picture", renderedPicture);
      } else {
        console.log(renderedPicture, "cryyy");
      }
    }
    return renderedPicture;
  }

  render() {
    return (
      <div className="centre">
        <h1 className="hangman-header">HANGMAN</h1>
        <p className="remaining-lives">
          {this.state.remainingLives} lives remaining.
        </p>
        <img className="image" src={this.hangmanDrawing()}></img>
        <p className="incorrect-letters"> {this.state.incorrectLetters}</p>
        <p className="underscores">{this.state.underscoreArray}</p>
        <form>
          <input type="text" onKeyPress={this.handleKey} />
        </form>
      </div>
    );
  }
}

class Winning extends React.Component {
  render() {
    return (
      <div>
        <p>You won! The word is {this.props.word} :D</p>
      </div>
    );
  }
}

class Losing extends React.Component {
  render() {
    return (
      <div>
        <p>You've lost! The word was {this.props.word} :( </p>
      </div>
    );
  }
}

class ResetGame extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>Reset Game</button>;
  }
}

class ChangeGameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: "playing",
      word: this.wordGenerator(),
    };
  }

  onChangeGameState(i) {
    console.log("this", this);
    this.setState({
      gameState: i,
    });
  }
  wordGenerator() {
    let wordList = [
      "nymph",
      "banjo",
      "vixen",
      "phlegm",
      "zigzagging",
      "wyvern",
      "witchcraft",
      "injury",
      "ivory",
      "agnostic",
      "microwave",
      "cobweb",
      "conscience",
      "conglomerate",
      "socialist",
      "accumulation",
      "helicopter",
      "dreary",
      "apathetic",
      "fallacious",
    ];
    let wordIndex = Math.floor(Math.random() * wordList.length); //randomly generates an index in the array
    console.log(wordList[wordIndex]);

    return wordList[wordIndex];
  }

  clickHandler(event) {
    this.setState({
      gameState: "playing",
      word: this.wordGenerator(),
    });
  }
  render() {
    console.log(this.state.word, "gamestate");
    if (this.state.gameState === "losing") {
      return (
        <div>
          <Losing word={this.state.word} />
          <ResetGame onClick={(event) => this.clickHandler(event)} />
        </div>
      );
    }
    if (this.state.gameState === "winning") {
      return (
        <div>
          <Winning word={this.state.word} />
          <ResetGame onClick={(event) => this.clickHandler(event)} />
        </div>
      );
    }
    if (this.state.gameState === "playing") {
      return (
        <Game
          onChangeGameState={(i) => this.onChangeGameState(i)}
          word={this.state.word}
        />
      );
    }
  }
}

ReactDOM.render(<ChangeGameState />, document.getElementById("root"));
