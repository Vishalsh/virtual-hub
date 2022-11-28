import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons/faCar';
import styles from './TotalDistance.module.scss';

export function TotalDistance({ distance }) {
  const totalDistance = parseFloat(distance / 1000).toFixed(1);

  return (
    <div className={styles.totalDistance}>
      <FontAwesomeIcon icon={faCar} className={styles.totalDistance__icon} />
      <span className={styles.totalDistance__value}>
        {totalDistance}
        {' '}
        Km
      </span>
    </div>
  );
}
