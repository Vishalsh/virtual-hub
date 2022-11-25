import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import Login from "./pages/Login";
import RoutePlanner from "./pages/RoutePlanner";
import RouteDetail from "./pages/RouteDetail.jsx";
import UserProvider from "./context/UserContext";
import { Layout } from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter history={history}>
      <UserProvider>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/route-planner/:routeId">
              <RouteDetail />
            </Route>
            <Route path="/route-planner">
              <RoutePlanner />
            </Route>
          </Switch>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
