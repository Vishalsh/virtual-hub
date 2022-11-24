import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import Auth from "./pages/Auth";
import RoutePlanner from "./pages/RoutePlanner";
import RouteDetail from "./pages/RouteDetail.jsx";
import UserProvider  from './context/UserContext';

const App = () => {
  return (
    <BrowserRouter history={history}>
      <UserProvider>
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route path="/route-planner/:routeId">
            <RouteDetail />
          </Route>
          <Route path="/route-planner">
            <RoutePlanner />
          </Route>
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
