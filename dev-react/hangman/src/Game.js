import React from "react";

export function NewGameButton(props) {
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

export class Game extends React.Component {
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
