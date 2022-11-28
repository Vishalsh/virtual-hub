import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

import Login from "./pages/Login/Login.jsx";
import RoutePlanner from "./pages/RoutePlanner/RoutePlanner.jsx";
import RouteDetail from "./pages/RouteDetail/RouteDetail.jsx";
import UserProvider from "./context/UserContext";
import {Layout} from "./components/Layout/Layout.jsx";
import {MsalProvider} from "@azure/msal-react";

const App = ({msalInstance}) => {
  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter history={history}>
        <UserProvider>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Login/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route path="/route-planner/:routeId">
                <RouteDetail/>
              </Route>
              <Route path="/route-planner">
                <RoutePlanner/>
              </Route>
            </Switch>
          </Layout>
        </UserProvider>
      </BrowserRouter>
    </MsalProvider>
  );
};

export default App;
