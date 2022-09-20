import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import "normalize.css";
import GlobalStyle from "./globalStyles";

import { ContextProvider } from "./api/logics"

ReactDOM.render(
  <ContextProvider>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </ContextProvider>,
  document.getElementById("root")
);
