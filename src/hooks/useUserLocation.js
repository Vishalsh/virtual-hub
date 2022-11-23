import { useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({});

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        setUserLocation({ lat: data.coords.latitude, lng: data.coords.longitude });
      });
    }
  };

  return [userLocation, getUserLocation];
}