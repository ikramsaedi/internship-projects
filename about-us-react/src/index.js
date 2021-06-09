import React from "react";
import ReactDOM from "react-dom";
import Content from "./Content";

import styled from "styled-components";

import "./styles.css";

function UnstyledMenuButton(props) {
  return (
    <button
      onClick={props.onClick}
      value={props.value}
      className={props.className}
    >
      {props.content}
    </button>
  );
}

const MenuButton = styled(UnstyledMenuButton)`
  background-color: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonTextColor};

  &:hover {
    color: ${(props) => props.theme.buttonHoverColor};
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonTextColor};

  &:hover {
    color: ${(props) => props.theme.buttonHoverColor};
  }
`;

function UnstyledHeader(props) {
  return (
    <div id="header" className={props.className}>
      <a href="https://stileeducation.com/">
        <img
          src="https://www.google.com/s2/favicons?sz=64&domain_url=stileeducation.com"
          alt=""
        />
      </a>

      <div id="header-text">
        <h1>{props.pageName}</h1>

        <MenuButton
          theme={props.theme}
          content="Home"
          value="home"
          onClick={(i) => props.changePage(i)}
        />
        <MenuButton
          theme={props.theme}
          content="About Dev"
          value="about-dev"
          onClick={(i) => props.changePage(i)}
        />
        <MenuButton
          theme={props.theme}
          content="About Ikram"
          value="about-ikram"
          onClick={(i) => props.changePage(i)}
        />
        <MenuButton
          theme={props.theme}
          content="Our Projects"
          value="our-projects"
          onClick={(i) => props.changePage(i)}
        />
      </div>
    </div>
  );
}

const Header = styled(UnstyledHeader)`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

function UnstyledFooter(props) {
  return (
    <div id="footer" className={props.className}>
      <MenuButton
        theme={props.theme}
        content="Default Theme"
        value="default"
        onClick={(i) => props.changeTheme(i)}
      />
      <MenuButton
        theme={props.theme}
        content="Ikram's theme"
        value="ikram"
        onClick={(i) => props.changeTheme(i)}
      />
      <MenuButton
        theme={props.theme}
        content="Dev's theme"
        value="dev"
        onClick={(i) => props.changeTheme(i)}
      />
      <a href="https://stileeducation.com/">
        <StyledButton theme={props.theme}>Stile</StyledButton>
      </a>
    </div>
  );
}

const Footer = styled(UnstyledFooter)`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.themes = {
      default: {
        pageBg: "rgb(231, 252, 231)",
        bgColor: "rgb(199, 235, 199)",
        textColor: "rgb(66, 178, 66);",
        buttonBgColor: "rgb(105, 207, 105)",
        buttonTextColor: "rgb(231, 252, 231)",
        buttonHoverColor: "rgb(190, 241, 190)",
        contentTextColor: "rgb(66, 178, 66)",
        truthsLiesBg: "rgb(105, 207, 105)",
        truthsLiesText: "rgb(231, 252, 231)",
      },
      dev: {
        pageBg: "rgb(106 204 204)",
        bgColor: "rgb(156 251 255)",
        textColor: "rgb(0 155 156);",
        buttonBgColor: "rgb(104 207 207)",
        buttonTextColor: "rgb(241 255 254)",
        buttonHoverColor: "rgb(16 138 158)",
        contentTextColor: "rgb(241 255 254)",
        truthsLiesBg: "rgb(156 251 255)",
        truthsLiesText: "rgb(0 155 156)",
      },
      ikram: {
        pageBg: "rgb(254, 234, 239)",
        bgColor: "rgb(249, 197, 211)",
        textColor: "rgb(206, 78, 112)",
        buttonBgColor: "rgb(234, 119, 150)",
        buttonTextColor: "rgb(254, 234, 239)",
        buttonHoverColor: "rgb(249, 197, 211)",
        contentTextColor: "rgb(234, 119, 150)",
        truthsLiesBg: "rgb(234, 119, 150)",
        truthsLiesText: "rgb(254, 234, 239)",
      },
    };
    this.state = { pageContent: "home", theme: "default" };
  }

  componentDidMount() {
    document.body.style.backgroundColor = this.themes[this.state.theme].pageBg;
  }

  componentDidUpdate() {
    document.body.style.backgroundColor = this.themes[this.state.theme].pageBg;
  }

  changePage(event) {
    const newPage = event.target.value;
    this.setState({ pageContent: newPage });
  }

  changeTheme(event) {
    console.log("this is a theme");
    let newTheme = event.target.value;
    console.log(newTheme, "newTHeme");
    if (newTheme === "ikram") {
      this.setState({
        theme: "ikram",
      });
    }
    if (newTheme === "dev") {
      this.setState({
        theme: "dev",
      });
    }
    if (newTheme === "default") {
      this.setState({
        theme: "default",
      });
    }
  }

  render() {
    return (
      <div id="page">
        <Header
          theme={this.themes[this.state.theme]}
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
        <Content
          currentPage={this.state.pageContent}
          theme={this.themes[this.state.theme]}
          contentTextColor={this.themes[this.state.theme]["contentTextColor"]}
        />
        <Footer
          theme={this.themes[this.state.theme]}
          changeTheme={(i) => this.changeTheme(i)}
        />
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));
