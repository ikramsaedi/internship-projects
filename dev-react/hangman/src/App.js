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

class Game extends React.Component {
  renderLetterButton(value) {
    const isActive = this.props.lettersActive[value];
    return (
      <LetterButton
        value={value}
        onClick={(i) => this.props.letterSubmit(i)}
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
    };
  }

  startGame(i) {
    const word = this.words[Math.floor(Math.random() * this.words.length)];
    this.setState({ gameState: "playing", gameWord: word });
  }

  submitLetter(event) {
    const letterValue = event.target.innerText;
    const lettersGuessed = this.state.lettersGuessed.concat(letterValue);
    const lettersActive = this.state.lettersActive;
    lettersActive[letterValue] = false;
    this.setState({
      lettersActive: lettersActive,
      lettersGuessed: lettersGuessed,
    });
  }

  render() {
    switch (this.state.gameState) {
      case "playing":
        return (
          <div className={this.props.className}>
            <Game
              gameWord={this.state.gameWord}
              lettersActive={this.state.lettersActive}
              lettersGuessed={this.state.lettersGuessed}
              letterSubmit={(i) => this.submitLetter(i)}
            />
            <p>{this.state.lettersGuessed}</p>
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
