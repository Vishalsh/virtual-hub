import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import styles from './TotalTime.module.scss';

export function TotalTime({ time }) {
  const totalTime = time < 3600
    ? `${Math.floor(time / 60)} min`
    : `${Math.floor(time / 3600)} hours ${Math.floor(
      (time % 3600) / 60,
    )} min`;

  return (
    <div className={styles.totalTime}>
      <FontAwesomeIcon icon={faClock} className={styles.totalTime__icon} />
      <span className={styles.totalTime__value}>{totalTime}</span>
    </div>
  );
}
