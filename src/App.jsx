import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
