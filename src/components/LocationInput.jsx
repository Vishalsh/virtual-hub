import React from "react";
import Autocomplete from "react-google-autocomplete";

export const LocationInput = ({ onSelectLocation }) => {
  function onPlaceSelect({ geometry: { location } }) {
    onSelectLocation({ lat: location.lat(), lng: location.lng() });
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
