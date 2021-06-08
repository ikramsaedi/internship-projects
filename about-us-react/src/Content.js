import React from "react";
import vinylDisk from "./resources/vinyl-disk.png";

import foreverFallsApartCover from "./resources/till-forever-falls-apart-cover.jpeg";
import foreverFallsApartAudio from "./resources/till-forever-falls-apart-audio.mp3";

import transparentSoulAudio from "./resources/transparent-soul-audio.mp3";
import transparentSoulCover from "./resources/transparent-soul-cover.jpeg";

function HomeContent(props) {
  return (
    <div>
      <h2>About this internship</h2>
      <p>
        We are working as full time software engineering interns at Stile
        Education in Melbourne, Australia. This internship is primarily focused
        onto getting more young women into stem, specifically software
        engineering, which is a heavily male dominated field. We will be
        learning programming languages like HTML, CSS, JavaScript, and Ruby. We
        will also be learning how to implement these languages in a live
        application as well as working collaboratively in a team of engineers
        and with external departments.
      </p>
    </div>
  );
}

function ProjectContent(props) {
  return (
    <div>
      <h2>Our projects so far :D</h2>
      <ol>
        <li> This website in vanilla HTML and JavaScript </li>
        <li> Hangman game </li>
        <li> Pacman game</li>
        <li> This website in React </li>
      </ol>
    </div>
  );
}

class TwoTruthsOneLie extends React.Component {
  /*
  props looks something like this:
  formName: string
  options: [option 1, option 2, option 3, ... , option n]
  correctOption: index
  responseMessages: [array of messages corresponding to options]
*/

  constructor(props) {
    super(props);
    this.state = { submitted: false, optionChosen: null, correct: null };
  }

  verifySelection(event) {
    const correctOption =
      event.target.parentNode.childNodes[this.props.correctOption]
        .childNodes[0];

    let selectedOption;

    for (let child in event.target.parentNode.childNodes) {
      let childElem = event.target.parentNode.childNodes[child];

      if (child < this.props.options.length) {
        if (childElem.childNodes[0].checked) {
          selectedOption = child;
        }
      }
    }

    let wasCorrect;
    if (correctOption.checked) {
      console.log("correct!");
      wasCorrect = true;
    } else {
      console.log("nope");
      wasCorrect = false;
    }

    this.setState({
      submitted: true,
      optionChosen: selectedOption,
      correct: wasCorrect,
    });
  }

  render() {
    return (
      <div>
        <form>
          {this.props.options.map((option) => {
            return (
              <label key={option}>
                <input type="radio" name={this.props.formName} />
                {option}
              </label>
            );
          })}
          <input
            type="button"
            value="Submit"
            onClick={this.verifySelection.bind(this)}
          />
        </form>
        <p>{this.props.responseMessages[this.state.optionChosen]}</p>
      </div>
    );
  }
}

class MusicBox extends React.Component {
  /* 
  props required:
  songName: string (snake case) 
  albumCover: string (via react import)
  audioPath: string
  */

  playPauseMusic(event) {
    const audioElem = document.getElementById(`${this.props.songName}-audio`);
    console.log(audioElem);
    if (audioElem.paused) {
      console.log("inside the if clause");
      audioElem.play();
    } else {
      console.log("inside the else clause");
      audioElem.pause();
    }
  }

  diskAnimation(event) {
    console.log("move disk");
    // the actual code will be written when we do the css
  }

  render() {
    return (
      <div
        onClick={this.playPauseMusic.bind(this)}
        onMouseEnter={this.diskAnimation.bind(this)}
        onMouseLeave={this.diskAnimation.bind(this)}
      >
        <img src={vinylDisk} alt=" " id={this.props.songName + "-disk"} />
        <img src={this.props.albumCover} alt=" " />
        <audio src={this.props.audioPath} id={this.props.songName + "-audio"} />
      </div>
    );
  }
}

/* <MusicBox songName="cherry-bomb" -> id="cherry-bomb-disk"*/

function IkramContent(props) {
  return (
    <div>
      <h2>Who am I?</h2>
      <p>
        I’m Ikram Saedi, a 2020 graduate of Werribee Secondary College who has
        very little coding experience prior to this internship but am very eager
        to delve into the coding world. My true love is nature documentaries
        though, specifically marine ones!
      </p>
      <p>Guess which of these are a lie to get a hypothetical prize</p>
      <TwoTruthsOneLie
        formName="ikram-coffee"
        options={["I love cats", "I love tea", "I love coffee"]}
        correctOption={2}
        responseMessages={[
          "Wrong! How could you even guess that... I love cats.",
          "Wrong! Tea is amazing.",
          "Correct! Coffee is terrible, take that caffeine addicts!",
        ]}
      />
      <TwoTruthsOneLie
        formName="ikram-makeup"
        options={[
          "I love wearing eye makeup",
          "I love wearing full face makeup",
          "I love wearing lip gloss",
        ]}
        correctOption={2}
        responseMessages={[
          "Wrong, eyeliner is so fun!",
          "Correct! I am incredibly lazy.",
          "Wrong, it's hard to go wrong with lip gloss!",
        ]}
      />
      <MusicBox
        songName="transparent-soul"
        albumCover={transparentSoulCover}
        audioPath={transparentSoulAudio}
      />

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dSHjcbGMzwE"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}

function DevContent(props) {
  return (
    <div>
      <h2>Who am I?</h2>
      <p>
        I graduated from John Monash Science School last year, and started here
        at Stile in March! Throughout highschool I've done a fair bit of
        programming, from working with Lego Mindstorms to dabbling in games
        development using GameMaker Studio, and finally completing Algorithmics
        (HESS) in year 12. <br />
        I currently plan on doing Software Engineering at Swinburne University
        after this year, but I am also looking at other options to enter
        directly into the industry, or study overseas in Germany. <br />
        I'm really looking forward to learning what the software industry is
        like!
      </p>
      <p>
        Here's some facts about me, but not all of them are actually true. Can
        you guess which one's the lie?
      </p>
      <MusicBox
        songName="cherry-bomb"
        albumCover={foreverFallsApartCover}
        audioPath={foreverFallsApartAudio}
      />
      <TwoTruthsOneLie
        options={[
          "I've had surgery on my nose",
          "I've broken my arm twice",
          "I'm allergic to aloe vera",
        ]}
        formName="dev-med"
        correctOption={1}
        responseMessages={[
          "Incorrect! I had my adenoids (kinda like tonsils in your nose) taken out when I was about 10.",
          "Correct! I've never broken a bone in my life (touch wood)",
          "Incorrect! I am allergic to aloe vera, so is my mum (it sucks when we get sunburnt)",
        ]}
      />
      <TwoTruthsOneLie
        options={[
          "I've been to four schools since starting primary school",
          "I already have credits at university",
          "I did two maths subjects in year 11",
        ]}
        formName="dev-school"
        correctOption={2}
        responseMessages={[
          "Incorrect! I changed primary schools once, and then changed again in highschool (and of course moved from primary to secondary)",
          "Incorrect! Algorithmics is a HESS subject, which means some universities (such as Melbourne and Monash) recognise your studies as credits",
          "Correct! I picked up Specialist Maths in year 12, because I apparently hate myself. I only did Methods in year 11",
        ]}
      />
    </div>
  );
}

function Content(props) {
  switch (props.currentPage) {
    case "home":
      return <HomeContent />;
    case "about-dev":
      return <DevContent />;
    case "about-ikram":
      return <IkramContent />;
    case "our-projects":
      return <ProjectContent />;
    default: // pls don't get here
  }
}

export default Content;

/* 
in here we can have the content component, as well as all our actual components
*/
