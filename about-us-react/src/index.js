import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Content from "./Content";

function Header(props) {
  return <h2>temp</h2>;
}

function Footer(props) {
  return <h2>more temp</h2>;
}

class Page extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));

/*
in here we can have the header and footer and import the content component?
*/
