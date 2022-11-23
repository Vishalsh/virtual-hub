import React, { useState } from "react";
import { LocationInput } from "./LocationInput";

export const Locations = ({ userLocation, onSelectLocation }) => {
  const [numberOfAddedLocations, setNumberOfAddedLocations] = useState(0);

  function addANewLocation() {
    if (numberOfAddedLocations < 3) {
      setNumberOfAddedLocations(numberOfAddedLocations + 1);
    }
  }

  return (
    <>
      <article>
        <span>Location A </span>
        <input value={`${userLocation?.lat}, ${userLocation?.lng}`} readOnly />
      </article>

      {["B", "C", "D"]
        .slice(0, numberOfAddedLocations)
        .map((locationSequence) => {
          return (
            <article key={locationSequence}>
              <span>Location {locationSequence}:</span>
              <LocationInput onSelectLocation={onSelectLocation}  />
            </article>
          );
        })}
      {numberOfAddedLocations < 3 && (
        <button onClick={addANewLocation}>Add a location +</button>
      )}
    </>
  );
};
