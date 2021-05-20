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
  constructor(props) {
    super(props);
    console.log("this.props:", this.props); // DEBUG
    this.state = {
      lettersActive: { a: true, b: true, c: true },
      lettersGuessed: [],
    };
  }
  renderLetterButton(value) {
    const isActive = this.state.lettersActive[value];
    return (
      <LetterButton
        value={value}
        onClick={(i) => this.submitLetter(i)}
        isActive={isActive}
      />
    );
  }
  submitLetter(event) {
    const letterValue = event.target.innerText;
    const lettersGuessed = this.state.lettersGuessed.concat(letterValue);
    this.setState({
      lettersActive: { [letterValue]: false },
      lettersGuessed: lettersGuessed,
    });
  }

  render() {
    return this.renderLetterButton("a");
  }
}
