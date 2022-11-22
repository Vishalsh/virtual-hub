import { useState } from "react";

export const useUserLocation = () => {
  const [coordinates, setCoordinates] = useState({});

  function getLocationCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        console.log(data);
        setCoordinates({ latitude: data.coords.latitude, longitude: data.coords.longitude });
      });
    }
  };

  return [ coordinates, getLocationCoordinates ];
}