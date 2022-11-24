import React, { useState, useEffect } from "react";
import { Locations } from "../components/Locations";
import { Map } from "../components/Map";
import { TotalDistance } from "../components/TotalDistance";
import { TotalTime } from "../components/TotalTime";
import { useUserLocation } from "../hooks/useUserLocation";

const RoutePlanner = () => {
  const [userLocation, getUserLocation] = useUserLocation();
  const [locationPoints, setLocationPoints] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    getUserLocation();
  }, []);

  function onSelectLocation(location) {
    setLocationPoints([...locationPoints, location]);
  }

  function showTotalDistanceAndTime(distance, time) {
    setTotalDistance(distance);
    setTotalTime(time);
  }

  return (
    <>
      {userLocation?.lat && (
        <>
          <Locations
            userLocation={userLocation}
            onSelectLocation={onSelectLocation}
          />
          {!!totalDistance && <TotalDistance distance={totalDistance} />}
          {!!totalTime && <TotalTime time={totalTime} />}        
          <Map
            userLocation={userLocation}
            locationPoints={locationPoints}
            afterDrawingRoute={showTotalDistanceAndTime}
          />
        </>
      )}
    </>
  );
};

export default RoutePlanner;
