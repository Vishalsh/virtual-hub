import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { GoogleAuth } from "../components/GoogleAuth";
import { UserContext } from "../context/UserContext";
import * as storage from "../utils/storage";

function Login() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  function onSuccessfulLogin(user) {
    setUser({ ...user, isLoggedIn: true });
    storage.setItem("user", { ...user, isLoggedIn: true });
    history.push("/route-planner");
  }

  return <GoogleAuth onSuccessfulLogin={onSuccessfulLogin} />;
}

export default Login;
