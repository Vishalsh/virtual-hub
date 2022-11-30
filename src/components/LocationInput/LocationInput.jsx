import React, { useEffect } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

export function LocationInput({
  onSelectLocation,
  location,
  className,
  index,
}) {
  function onPlaceSelect(place) {
    const {
      geometry,
      // eslint-disable-next-line camelcase
      formatted_address,
    } = place;

    onSelectLocation(index, {
      lat: geometry.location.lat(),
      lng: geometry.location.lng(),
      // eslint-disable-next-line camelcase
      name: formatted_address,
    });
  }

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VIRTUAL_HUB_GOOGLE_MAP_API_KEY,
    onPlaceSelected: onPlaceSelect,
    options: {
      types: ['establishment'],
      componentRestrictions: { country: ['in', 'ae'] },
    },
  });

  useEffect(() => {
    if (location) {
      ref.current.value = location.name;
    }
  }, [location]);

  return <input ref={ref} className={className} />;
}
