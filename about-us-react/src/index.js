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

const StyledSelect = styled.select`
  background-color: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  border-radius: 4px;
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    color: ${(props) => props.theme.buttonHoverColor};
  }
`;

const StyledLabel = styled.label`
  background-color: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonTextColor};
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
`;

function UnstyledFooter(props) {
  return (
    <div id="footer" className={props.className}>
      <StyledLabel htmlFor="themes">
        Select a theme: {""}
        <StyledSelect
          name="themes"
          theme={props.theme}
          onChange={props.changeTheme}
        >
          <option value="default">Default</option>
          <option value="dev">Dev's</option>
          <option value="ikram">Ikram's</option>
        </StyledSelect>
      </StyledLabel>
      <a href="https://stileeducation.com/">
        <StyledButton theme={props.theme}>Stile's website</StyledButton>
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
        pageBg: "rgb(245, 254, 254)",
        bgColor: "rgb(200, 240, 244)",
        textColor: "rgb(104, 188, 196);",
        buttonBgColor: "rgb(104, 188, 196)",
        buttonTextColor: "rgb(200, 240, 244)",
        buttonHoverColor: "rgb(245, 254, 254)",
        contentTextColor: "rgb(104, 188, 196)",
        truthsLiesBg: "rgb(64, 150, 158)",
        truthsLiesText: "rgb(200, 240, 244)",
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
    this.setState({ theme: event.target.value });
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
          changeTheme={(i) => this.changeTheme(i)}
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
