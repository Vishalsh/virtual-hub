import React, { useState, createContext } from "react";

export const UserContext = createContext({
  user: {
    name: '',
    imageUrl: '',
  },
  setUser: () => {},
});

export default function ({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
