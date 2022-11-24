import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

import Auth from "./pages/Auth";
import RoutePlanner from "./pages/RoutePlanner";

const App = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route path="/route-planner">
          <RoutePlanner />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
