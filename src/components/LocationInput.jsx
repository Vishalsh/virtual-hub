import React from "react";
import Autocomplete from "react-google-autocomplete";

export const LocationInput = () => {
  return (
    <Autocomplete
      apiKey={'AIzaSyCstinGQ1lMWKrUQJ5kJgunSF-oI50MahY'}
      onPlaceSelected={(place) => {
        console.log(place);
      }}
    />
  );
};
