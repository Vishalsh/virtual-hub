import React, { useEffect } from "react";
import { useUserLocation } from "./hooks/useUserLocation";

const App = () => {
  const [coordinates, getLocationCoordinates] = useUserLocation();

  useEffect(() => {
    getLocationCoordinates();
  }, []);

  return (
    <>
      <h1>Latitude: {coordinates.latitude}</h1>
      <h1>Longitude: {coordinates.longitude}</h1>;
    </>
  );
};

export default App;
