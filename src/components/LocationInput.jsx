import React, {useEffect, useState} from "react";
import Autocomplete from "react-google-autocomplete";

export const LocationInput = ({ onSelectLocation, location }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(location?.name);
  }, [location]);

  function onPlaceSelect(place) {
    const {
      geometry: { location },
      formatted_address,
    } = place;

    setValue(formatted_address);

    onSelectLocation({
      lat: location.lat(),
      lng: location.lng(),
      name: formatted_address,
    });
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <>
      <Autocomplete
        apiKey={import.meta.env.VIRTUAL_HUB_GOOGLE_MAP_API_KEY}
        onPlaceSelected={onPlaceSelect}
        onChange={handleChange}
        options={{
          types: ["(regions)"],
        }}
        value={value}
      />
    </>
  );
};
