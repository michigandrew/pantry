import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Inventory from "../components/Inventory";
import Item from "../components/Item";
import NewItem from "../components/NewItem";
import ScanNewItem from "../components/ScanNewItem";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/inventory" exact component={Inventory} />
      <Route path="/item/:id" exact component={Item} />
      <Route path="/item" exact component={NewItem} />
      {/* <Route path="/scan-item" exact component={ScanNewItem} /> */}
    </Switch>
  </Router>
);
