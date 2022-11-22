import React, { useEffect, useState } from "react";
import { useUserLocation } from "../hooks/useUserLocation";
import { LocationInput } from "./LocationInput";

export const Locations = () => {
  const [userLocation, getUserLocation] = useUserLocation();
  const [numberOfAddedLocations, setNumberOfAddedLocations] = useState(0);

  useEffect(() => {
    getUserLocation();
  }, []);

  function addANewLocation() {
    if (numberOfAddedLocations < 3) {
      setNumberOfAddedLocations(numberOfAddedLocations + 1);
    }
  }

  return (
    <>
      <article>
        <span>Location A </span>
        <input
          value={userLocation?.latitude ? `${userLocation?.latitude}, ${userLocation?.longitude}` : ''}
          readOnly
        />
      </article>

      {["B", "C", "D"]
        .slice(0, numberOfAddedLocations)
        .map((locationSequence) => {
          return (
            <article key={locationSequence}>
              <span>Location {locationSequence}:</span> <LocationInput />
            </article>
          );
        })}
      {numberOfAddedLocations < 3 && (
        <button onClick={addANewLocation}>Add a location +</button>
      )}
    </>
  );
};
