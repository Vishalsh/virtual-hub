import React from "react";
import { useHistory } from "react-router-dom";

import { GoogleAuth } from '../components/GoogleAuth';

function Auth() {
  let history = useHistory();

  function onSuccessfulAuth() {
    history.push('/route-planner');
  }

  return (
    <GoogleAuth onSuccessfulAuth={onSuccessfulAuth} />
  )
}

export default Auth;
