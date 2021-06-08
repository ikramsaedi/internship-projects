import React from "react";
import ReactDOM from "react-dom";
import Content from "./Content";

function MenuButton(props) {
  return (
    <button onClick={props.onClick} value={props.value}>
      {props.content}
    </button>
  );
}

function Header(props) {
  return (
    <div>
      <h2>{props.pageName}</h2>
      <div>
        <a href="https://stileeducation.com/">
          <img
            src="https://www.google.com/s2/favicons?sz=64&domain_url=stileeducation.com"
            alt=""
          />
        </a>

        <MenuButton
          content="Home"
          value="home"
          onClick={(i) => props.changePage(i)}
        />
        <MenuButton
          content="About Dev"
          value="about-dev"
          onClick={(i) => props.changePage(i)}
        />
        <MenuButton
          content="About Ikram"
          value="about-ikram"
          onClick={(i) => props.changePage(i)}
        />
        <MenuButton
          content="Our Projects"
          value="our-projects"
          onClick={(i) => props.changePage(i)}
        />
      </div>
    </div>
  );
}

function Footer(props) {
  return (
    <div>
      <MenuButton
        content="Default Theme"
        onClick={(i) => props.changeTheme()}
      />
      <MenuButton
        content="Ikram's theme"
        onClick={(i) => props.changeTheme()}
      />
      <MenuButton content="Dev's theme" onClick={(i) => props.changeTheme()} />
      <a href="https://stileeducation.com/">
        <button>Stile</button>
      </a>
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageContent: "home" };
  }

  changePage(event) {
    const newPage = event.target.value;
    this.setState({ pageContent: newPage });
  }

  changeTheme() {
    console.log("this is a theme");
    // also do stuff here
    //change css file being used to appropriate one
  }

  render() {
    return (
      <div>
        <Header
          pageName={this.state.pageContent
            .split("-")
            .map((word) => {
              let working = word.split("");
              working[0] = working[0].toUpperCase();
              console.log(working);
              return working.join("");
            })
            .join(" ")}
          changePage={(i) => this.changePage(i)}
        />
        <Content currentPage={this.state.pageContent} />
        <Footer changeTheme={(i) => this.changeTheme(i)} />
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));

/*
in here we can have the header and footer and import the content component?
*/
