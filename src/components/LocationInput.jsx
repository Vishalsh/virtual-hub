import React from "react";
import Autocomplete from "react-google-autocomplete";

export const LocationInput = () => {
  return (
    <Autocomplete
      apiKey={''}
      onPlaceSelected={(place) => {
        console.log(place);
      }}
    />
  );
};
