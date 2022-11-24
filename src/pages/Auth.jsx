import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { GoogleAuth } from '../components/GoogleAuth';
import { UserContext } from "../context/UserContext";

function Auth() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  function onSuccessfulAuth(user) {
    setUser(user);
    history.push('/route-planner');
  }

  return (
    <GoogleAuth onSuccessfulAuth={onSuccessfulAuth} />
  )
}

export default Auth;
