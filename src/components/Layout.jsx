import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { GoogleLogout } from "./GoogleLogout.jsx";
import { UserContext, LOGGET_OUT_USER } from "../context/UserContext";
import * as storage from "../utils/storage";
import {MsLogout} from "./MsLogout.jsx";
import {AUTH_PROVIDER} from "../utils/constants.js";

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
          <main>{children}</main>
        </>
      )}
    </>
  );
};
