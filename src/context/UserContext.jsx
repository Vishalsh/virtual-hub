import React, { useState, createContext } from "react";

export const LOGGET_OUT_USER = {
  name: "",
  imageUrl: "",
  isLoggedIn: false,
};

export const UserContext = createContext({
  user: LOGGET_OUT_USER,
  setUser: () => {},
});

export default function ({ children }) {
  const [user, setUser] = useState(null);

  function setUserState(user) {
    setUser(user);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
