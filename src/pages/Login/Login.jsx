import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GoogleAuth } from '../../components/GoogleAuth/GoogleAuth';
import { UserContext } from '../../context/UserContext';
import * as storage from '../../utils/storage';
import { MsAuth } from '../../components/MsAuth/MsAuth';
import styles from './Login.module.scss';

function Login() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  function onSuccessfulLogin(updatedUser) {
    setUser({ ...updatedUser, isLoggedIn: true });
    storage.setItem('user', { ...updatedUser, isLoggedIn: true });
    history.push('/route-planner');
  }

  if (user.isLoggedIn) {
    return history.replace('/route-planner');
  }

  return (
    <div className={styles.login}>
      <div className={styles.login__buttons}>
        <MsAuth onSuccessfulLogin={onSuccessfulLogin} />
        <GoogleAuth onSuccessfulLogin={onSuccessfulLogin} />
      </div>
    </div>
  );
}

export default Login;
