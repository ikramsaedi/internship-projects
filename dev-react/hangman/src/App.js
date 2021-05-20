import React from "react";

function NewGameButton(props) {
  return (
    <button className={"new-game-button " + props.size} onClick={props.onClick}>
      New Game
    </button>
  );
}

function LetterButton(props) {
  if (props.isActive) {
    return (
      <button className="letter-button" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button className="letter-button" onClick={props.onClick} disabled>
        {props.value}
      </button>
    );
  }
}

class LetterSelectors extends React.Component {
  renderLetterButton(value) {
    const isActive = this.props.lettersActive[value];
    return (
      <LetterButton
        value={value}
        onClick={(i) => this.props.clickFunction(i)}
        isActive={isActive}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderLetterButton("a")}
        {this.renderLetterButton("b")}
        {this.renderLetterButton("c")}
        {this.renderLetterButton("d")}
        {this.renderLetterButton("e")}
        {this.renderLetterButton("f")}
        {this.renderLetterButton("g")}
        {this.renderLetterButton("h")}
        {this.renderLetterButton("i")}
        {this.renderLetterButton("j")}
        {this.renderLetterButton("k")}
        {this.renderLetterButton("l")}
        {this.renderLetterButton("m")}
        {this.renderLetterButton("n")}
        {this.renderLetterButton("o")}
        {this.renderLetterButton("p")}
        {this.renderLetterButton("q")}
        {this.renderLetterButton("r")}
        {this.renderLetterButton("s")}
        {this.renderLetterButton("t")}
        {this.renderLetterButton("u")}
        {this.renderLetterButton("v")}
        {this.renderLetterButton("w")}
        {this.renderLetterButton("x")}
        {this.renderLetterButton("y")}
        {this.renderLetterButton("z")}
      </div>
    );
  }
}

class WordDisplay extends React.Component {
  render() {
    return (
      <div className={this.props.className}>{this.props.displayArray}</div>
    );
  }
  }

class Score extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
    for (let element in this.wordArray) {
      if (this.props.lettersGuessed.includes(this.wordArray[element])) {
        this.blankArray[element] = this.wordArray[element];
      }
    }
    return <div className={this.props.className}>{this.blankArray}</div>;
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <Score className="score" livesRemaining={this.props.livesRemaining} />
        <WordDisplay
          className="word-display"
          gameWord={this.props.gameWord}
          displayArray={this.props.displayArray}
          lettersGuessed={this.props.lettersGuessed}
          loseLife={() => this.props.loseLife()}
        />
        <LetterSelectors
          lettersActive={this.props.lettersActive}
          clickFunction={(i) => this.props.letterSubmit(i)}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.words = ["test"];
    this.state = {
      gameState: "unstarted",
      gameWord: null,
      lettersActive: {
        a: true,
        b: true,
        c: true,
        d: true,
        e: true,
        f: true,
        g: true,
        h: true,
        i: true,
        j: true,
        k: true,
        l: true,
        m: true,
        n: true,
        o: true,
        p: true,
        q: true,
        r: true,
        s: true,
        t: true,
        u: true,
        v: true,
        w: true,
        x: true,
        y: true,
        z: true,
      },
      lettersGuessed: [],
      livesRemaining: null,
      displayArray: null,
    };
  }

  startGame(i) {
    const word = this.words[Math.floor(Math.random() * this.words.length)];

    let array = [];
    for (let letter in word) {
      array.push("_ ");
    }

    this.setState({
      gameState: "playing",
      gameWord: word,
      livesRemaining: 15,
      displayArray: array,
    });
  }

  submitLetter(event) {
    const letterValue = event.target.innerText;
    const lettersGuessed = this.state.lettersGuessed.concat(letterValue);
    const lettersActive = this.state.lettersActive;
    let displayArray = this.state.displayArray;
    let livesRemaining = this.state.livesRemaining;

    lettersActive[letterValue] = false;

    if (this.state.gameWord.includes(letterValue)) {
      for (let index in this.state.gameWord) {
        if (this.state.gameWord[index] === letterValue) {
          displayArray[index] = letterValue;
        }
      }
    } else {
      livesRemaining -= 1;
    }

    this.setState({
      lettersActive: lettersActive,
      lettersGuessed: lettersGuessed,
      displayArray: displayArray,
      livesRemaining: livesRemaining,
    });
  }

  render() {
    switch (this.state.gameState) {
      case "playing":
        return (
          <div className={this.props.className}>
            <Game
              className="game"
              gameWord={this.state.gameWord}
              displayArray={this.state.displayArray}
              livesRemaining={this.state.livesRemaining}
              lettersActive={this.state.lettersActive}
              lettersGuessed={this.state.lettersGuessed}
              letterSubmit={(i) => this.submitLetter(i)}
              loseLife={() => this.loseLife()}
            />
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

export default App;
