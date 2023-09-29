import React, { useEffect } from "react";
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./api/App";
import Login from "./authenticate/Login";
import Empty404page from "./commonLink/Empty404page";

export default function Index() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/app">
            <App />
          </Route>
          <Route path="/app/*">
            <Empty404page />
          </Route>
        </Switch>
      </Router>
    </>
  );
}


