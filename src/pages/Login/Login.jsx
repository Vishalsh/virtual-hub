import React, {useContext} from "react";
import {Redirect, useHistory} from "react-router-dom";

import {GoogleAuth} from "../../components/GoogleAuth/GoogleAuth.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import * as storage from "../../utils/storage.js";
import {MsAuth} from "../../components/MsAuth/MsAuth.jsx";
import styles from './Login.module.scss';

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
    <div className={styles.login}>
      <div className={styles.login__buttons}>
        <MsAuth onSuccessfulLogin={onSuccessfulLogin}/>
        <GoogleAuth onSuccessfulLogin={onSuccessfulLogin}/>
      </div>
    </div>
  );
}

export default Login;
