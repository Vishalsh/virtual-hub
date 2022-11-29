import React, { useState, createContext } from 'react';

export const ShowLocationPointsContext = createContext({
  showLocationPoints: true,
  setShowLocationPoints: () => {},
});

export default function ShowLocationPointsProvider({ children }) {
  const [showLocationPoints, setShowLocationPoints] = useState(true);

  function updateShowLocationPoints(show) {
    setShowLocationPoints(show);
  }

  return (
    <ShowLocationPointsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        showLocationPoints,
        setShowLocationPoints: updateShowLocationPoints,
      }}
    >
      {children}
    </ShowLocationPointsContext.Provider>
  );
}
