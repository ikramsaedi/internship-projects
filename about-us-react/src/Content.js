import React from "react";
import "./App.css";

function Content(props) {
  switch (props.currentPage) {
    case "home":
      return <h3>home stuff</h3>;
    case "about-dev":
      return <h3>dev stuff</h3>;
    case "about-ikram":
      return <h3>ikram stuff</h3>;
    case "our-projects":
      return <h3>project stuff</h3>;
    default: // pls don't get here
  }
}

export default Content;

/* 
in here we can have the content component, as well as all our actual components
*/
