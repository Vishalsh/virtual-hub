import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import styles from './OptimalRoute.module.scss';

const WAYPOINTS_LABELS = ['A', 'B', 'C', 'D'];

export function OptimalRoute({ route }) {
  const optimalRoute = [route.origin, ...route.wayPoints, route.destination];
  return (
    <div className={styles.optimalRoute}>
      <h2 className={styles.optimalRoute__heading}>Optimal Route</h2>
      {
        optimalRoute.map((wayPoint, index) => (
          <>
            <div className={styles.optimalRoute__name}>
              <span className={styles.optimalRoute__label}>{WAYPOINTS_LABELS[index]}</span>
              <span className={styles.optimalRoute__text}>{wayPoint.name}</span>
            </div>
            {
              index < optimalRoute.length - 1 && (
              <span className={styles.optimalRoute__arrowDown}>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
              )
            }
          </>
        ))
      }
    </div>
  );
}
