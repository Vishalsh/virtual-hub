import React, {useContext} from "react";
import {Redirect, useHistory} from "react-router-dom";

import {GoogleAuth} from "../components/GoogleAuth";
import {UserContext} from "../context/UserContext";
import * as storage from "../utils/storage";
import {MsAuth} from "../components/MsAuth.jsx";

function Login() {
  const history = useHistory();
  const {user, setUser} = useContext(UserContext);

  function onSuccessfulLogin(user) {
    setUser({...user, isLoggedIn: true});
    storage.setItem("user", {...user, isLoggedIn: true});
    history.push("/route-planner");
  }

  if(user.isLoggedIn) {
    return history.replace('/route-planner');
  }

  return (
    <>
      <MsAuth onSuccessfulLogin={onSuccessfulLogin}/>
      <GoogleAuth onSuccessfulLogin={onSuccessfulLogin}/>
    </>
  );
}

export default Login;
