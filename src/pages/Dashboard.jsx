import React, { useState, useEffect } from "react";
import { Locations } from "../components/Locations";
import { Map } from "../components/Map";
import { useUserLocation } from "../hooks/useUserLocation";

const Dashboard = () => {
  const [userLocation, getUserLocation] = useUserLocation();
  const [locationPoints, setLocationPoints] = useState([]);

  useEffect(() => {
    getUserLocation();
  }, []);

  function onSelectLocation(location) {
    setLocationPoints([...locationPoints, location]);
  }

  return (
    <>
      {userLocation?.lat && (
        <>
          <Locations
            userLocation={userLocation}
            onSelectLocation={onSelectLocation}
          />
          <Map
            userLocation={userLocation}
            locationPoints={locationPoints}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
