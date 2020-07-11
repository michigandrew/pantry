import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Inventory from "../components/Inventory";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/inventory" exact component={Inventory} />
    </Switch>
  </Router>
);
