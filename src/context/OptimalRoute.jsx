import React, { useState, createContext } from 'react';

export const OptimalRouteContext = createContext({
  route: null,
  setRoute: () => {},
});

export default function OptimalRouteProvider({ children }) {
  const [route, setRoute] = useState(null);

  return (
    <OptimalRouteContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        route,
        setRoute,
      }}
    >
      {children}
    </OptimalRouteContext.Provider>
  );
}
