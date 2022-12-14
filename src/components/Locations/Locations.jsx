import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faCar } from '@fortawesome/free-solid-svg-icons/faCar';
import { LocationInput } from '../LocationInput/LocationInput';
import styles from './Locations.module.scss';
import { Loader } from '../Loader/Loader';

export function Locations({ userLocation, locationPoints, onSelectLocation }) {
  const [numberOfAddedLocations, setNumberOfAddedLocations] = useState(0);
  const locationSequence = ['B', 'C', 'D'];

  function addANewLocation() {
    if (numberOfAddedLocations < 3) {
      setNumberOfAddedLocations(numberOfAddedLocations + 1);
    }
  }

  return (
    <div className={styles.locations}>
      <article className={styles.location}>
        <span className={styles.location__label}>
          <FontAwesomeIcon icon={faCar} />
        </span>
        <input value={userLocation.name || ''} readOnly className={styles.location__input} />
        {!userLocation?.name && <div><Loader /></div>}
      </article>
      {
        Array.from({ length: numberOfAddedLocations }, (v, i) => i).map((_, index) => (
          <article key={locationSequence[index]} className={styles.location}>
            <span className={styles.location__label}>
              <FontAwesomeIcon icon={faCar} />
            </span>
            <LocationInput
              index={index}
              onSelectLocation={onSelectLocation}
              location={locationPoints[index]}
              className={styles.location__input}
            />
          </article>
        ))
      }

      {numberOfAddedLocations < 3 && (
        <button
          type="button"
          onClick={addANewLocation}
          className={styles.locations__add}
          disabled={numberOfAddedLocations !== locationPoints.length}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
    </div>
  );
}
