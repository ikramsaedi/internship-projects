// require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDom from "react-dom";
import Website from "./App";
import "./App.css";

ReactDom.render(<Website />, document.getElementById("app"));
