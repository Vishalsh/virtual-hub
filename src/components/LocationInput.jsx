import React from "react";
import Autocomplete from "react-google-autocomplete";

export const LocationInput = ({ onSelectLocation }) => {
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

  return (
    <Autocomplete
      apiKey={"AIzaSyCstinGQ1lMWKrUQJ5kJgunSF-oI50MahY"}
      onPlaceSelected={onPlaceSelect}
      options={{
        types: ["(regions)"],
      }}
    />
  );
};
