import { useState } from 'react';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({});

  function getUserAddress(lat, lng) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${import.meta.env.VIRTUAL_HUB_GOOGLE_MAP_API_KEY}`)
      .then((results) => results.json())
      .then((data) => {
        setUserLocation({
          lat,
          lng,
          name: data.results[0].formatted_address,
        });
      });
  }

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        getUserAddress(data.coords.latitude, data.coords.longitude);
      });
    }
  }

  return [userLocation, getUserLocation, setUserLocation];
};
