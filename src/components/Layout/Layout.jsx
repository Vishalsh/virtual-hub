import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { GoogleLogout } from '../GoogleLogout/GoogleLogout';
import { UserContext, LOGGET_OUT_USER } from '../../context/UserContext';
import * as storage from '../../utils/storage';
import { MsLogout } from '../MsLogout/MsLogout';
import { AUTH_PROVIDER } from '../../utils/constants';
import styles from './Layout.module.scss';

export function Layout({ children }) {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = storage.getItem('user');
    setUser(storedUser === null ? LOGGET_OUT_USER : storedUser);
  }, []);

  function clearUserDetails() {
    setUser(LOGGET_OUT_USER);
    storage.removeItem('user', null);
    history.push('/login');
  }

  if (user === null) {
    return null;
  }

  return (
    <>
      <header className={styles.header}>
        <h1
          className={user.isLoggedIn ? styles.header__title : styles.header__titleMobile}
        >
          Virtual Hub V2
        </h1>
        {user.isLoggedIn && (
          user.authProvider === AUTH_PROVIDER.google
            ? (
              <div className={styles.logoutButton}>
                <GoogleLogout onSuccessfulLogout={clearUserDetails} />
              </div>
            )
            : (
              <div className={styles.logoutButton}>
                <MsLogout onSuccessfulLogout={clearUserDetails} />
              </div>
            )
        )}
      </header>
      <main className={styles.content}>{children}</main>
    </>
  );
}
