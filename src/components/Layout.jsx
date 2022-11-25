import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Logout } from "./Logout";
import { UserContext } from "../context/UserContext";

export const Layout = ({ children }) => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  function clearUserDetails() {
    setUser({});
    history.push("/login");
  }

  return (
    <>
      <header>
        <Logout onSuccessfulLogout={clearUserDetails} />
      </header>
      <main>{children}</main>
    </>
  );
};
