import React, {useEffect} from "react";
import {usePlacesWidget} from "react-google-autocomplete";

export const LocationInput = ({ onSelectLocation, location }) => {
  function onPlaceSelect(place) {
    const {
      geometry: { location },
      formatted_address,
    } = place;

    onSelectLocation({
      lat: location.lat(),
      lng: location.lng(),
      name: formatted_address,
    });
  }

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VIRTUAL_HUB_GOOGLE_MAP_API_KEY,
    onPlaceSelected: onPlaceSelect,
    options: {
      types: ["(regions)"],
    },
  });

  useEffect(() => {
    if(location) {
      ref.current.value = location.name;
    }
  }, [location]);

  return <input ref={ref} />;
};
