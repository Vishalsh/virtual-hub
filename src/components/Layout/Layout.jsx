import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { GoogleLogout } from "../GoogleLogout/GoogleLogout.jsx";
import { UserContext, LOGGET_OUT_USER } from "../../context/UserContext.jsx";
import * as storage from "../../utils/storage.js";
import {MsLogout} from "../MsLogout/MsLogout.jsx";
import {AUTH_PROVIDER} from "../../utils/constants.js";
import styles from './Layout.module.scss';

export const Layout = ({ children }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = storage.getItem("user");
    setUser(storedUser === null ? LOGGET_OUT_USER : storedUser);
  }, []);

  function clearUserDetails() {
    setUser(LOGGET_OUT_USER);
    storage.removeItem("user", null);
    history.push("/login");
  }

  return (
    <>
      {user !== null && (
        <>
          <header>
            {user.isLoggedIn && (
              user.authProvider === AUTH_PROVIDER.google
                ? <GoogleLogout onSuccessfulLogout={clearUserDetails} />
                : <MsLogout onSuccessfulLogout={clearUserDetails} />
            )}
          </header>
          <main className={styles.wrapper}>{children}</main>
        </>
      )}
    </>
  );
};
