import React, { useState, createContext } from 'react';

export const LOGGET_OUT_USER = {
  name: '',
  imageUrl: '',
  isLoggedIn: false,
};

export const UserContext = createContext({
  user: LOGGET_OUT_USER,
  setUser: () => {},
});

export default function UserProvier({ children }) {
  const [user, setUser] = useState(null);

  function setUserState(updatedUser) {
    setUser(updatedUser);
  }

  return (
    <UserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        setUser: setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
