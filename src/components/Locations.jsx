import React, {useEffect, useState} from "react";
import { LocationInput } from "./LocationInput";

export const Locations = ({ userLocation, onSelectLocation }) => {
  const [numberOfAddedLocations, setNumberOfAddedLocations] = useState(0);
  const [userAddress, setUserAddress] = useState('');

  function addANewLocation() {
    if (numberOfAddedLocations < 3) {
      setNumberOfAddedLocations(numberOfAddedLocations + 1);
    }
  }

  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.lat},${userLocation.lng}&sensor=true&key=AIzaSyCstinGQ1lMWKrUQJ5kJgunSF-oI50MahY`)
      .then(results => results.json())
      .then(data => {
        setUserAddress(data.results[0].formatted_address);
      });
  }, []);

  return (
    <>
      <article>
        <span>Location A </span>
        {<input value={userAddress} readOnly />}
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
