import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./app";
import app from "./store/AppStore";
import BrowserAppContainer from "./navigation/BrowserAppContainer";
// import './index.less';

const ClientApp = BrowserAppContainer(App);

ReactDOM.render(<ClientApp />, document.getElementById("app"));
