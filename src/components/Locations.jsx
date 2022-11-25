import React, { useState } from "react";
import { LocationInput } from "./LocationInput";

export const Locations = ({ userLocation, onSelectLocation, locationPoints }) => {
  const [numberOfAddedLocations, setNumberOfAddedLocations] = useState(0);
  const locationSequence = ["B", "C", "D"];

  function addANewLocation() {
    if (numberOfAddedLocations < 3) {
      setNumberOfAddedLocations(numberOfAddedLocations + 1);
    }
  }

  return (
    <>
      <article>
        <span>Location A </span>
        <input value={userLocation.name} readOnly />
      </article>
      {
        Array.from({ length: numberOfAddedLocations }, (v, i) => i).map((_, index) => (
          <article key={locationSequence[index]}>
            <span>Location {locationSequence[index]}:</span>
            <LocationInput onSelectLocation={onSelectLocation} location={locationPoints[index]} />
          </article>
        ))
      }

      {/*{["B", "C", "D"]*/}
      {/*  .slice(0, numberOfAddedLocations)*/}
      {/*  .map((locationSequence) => {*/}
      {/*    return (*/}
      {/*      <article key={locationSequence}>*/}
      {/*        <span>Location {locationSequence}:</span>*/}
      {/*        <LocationInput onSelectLocation={onSelectLocation} />*/}
      {/*      </article>*/}
      {/*    );*/}
      {/*  })}*/}
      {numberOfAddedLocations < 3 && (
        <button onClick={addANewLocation}>Add a location +</button>
      )}
    </>
  );
};
