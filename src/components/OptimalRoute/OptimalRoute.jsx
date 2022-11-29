import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import styles from './OptimalRoute.module.scss';

export function OptimalRoute({ route }) {
  return (
    <div className={styles.optimalRoute}>
      <div className={styles.optimalRoute__name}>{route.origin.name}</div>
      <span className={styles.optimalRoute__arrowDown}>
        <FontAwesomeIcon icon={faArrowDown} />
      </span>
      {
        route.wayPoints.map((wayPoint) => (
          <>
            <div className={styles.optimalRoute__name}>
              {wayPoint.name}
            </div>
            <span className={styles.optimalRoute__arrowDown}>
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </>
        ))
      }
      <div className={styles.optimalRoute__name}>
        {route.destination.name}
      </div>
    </div>
  );
}
