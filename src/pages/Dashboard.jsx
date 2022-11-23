import React, { useEffect } from "react";
import { Locations } from "../components/Locations";
import { Map } from "../components/Map";
import { useUserLocation } from "../hooks/useUserLocation";

const Dashboard = () => {
  const [userLocation, getUserLocation] = useUserLocation();

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      {userLocation?.lat && (
        <>
          <Locations userLocation={userLocation} />
          <Map userLocation={userLocation} />
        </>
      )}
    </>
  );
};

export default Dashboard;
