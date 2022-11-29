import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { MsalProvider } from '@azure/msal-react';
import Login from './pages/Login/Login';
import RoutePlanner from './pages/RoutePlanner/RoutePlanner';
import RouteDetail from './pages/RouteDetail/RouteDetail';
import UserProvider from './context/UserContext';
import OptimalRouteProvider from './context/OptimalRoute';
import { Layout } from './components/Layout/Layout';

const history = createBrowserHistory();

function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
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
              <OptimalRouteProvider>
                <Route path="/route-planner">
                  <RoutePlanner />
                </Route>
              </OptimalRouteProvider>
            </Switch>
          </Layout>
        </UserProvider>
      </BrowserRouter>
    </MsalProvider>
  );
}

export default App;
