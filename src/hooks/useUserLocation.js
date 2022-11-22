import { useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({});

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        setUserLocation({ latitude: data.coords.latitude, longitude: data.coords.longitude });
      });
    }
  };

  return [userLocation, getUserLocation];
}