import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes';
import { RWebShare } from 'react-web-share';
import { MobileView } from 'react-device-detect';
import styles from './ShareRoute.module.scss';

export function ShareRoute({ routeSavedId, route, onPlanNewRoute }) {
  function planNewRoute() {
    onPlanNewRoute();
  }

  const shareMessageText = `Here is your shortest route starting from ${
    route.origin.name
  } covering ${route.wayPoints.map(
    (wp) => wp.name,
  ).join(',')} and ${route.destination.name}`;

  return (
    <div className={styles.shareRoute}>
      <div className={styles.shareRoute__wrapper}>
        <p>Route has been saved successfully</p>
        <MobileView>
          <RWebShare
            data={{
              text: shareMessageText,
              url: `${window.location.origin}/route-planner/${routeSavedId}`,
              title: 'Shortest Route Finder',
            }}
          >
            <button type="button" className={styles.shareRoute__button}>
              <FontAwesomeIcon
                icon={faShareNodes}
                className={styles.shareRoute__btnIcon}
              />
              <span>Share</span>
            </button>
          </RWebShare>
        </MobileView>
        <button type="button" onClick={planNewRoute} className={styles.shareRoute__link}>Plan a new Route</button>
      </div>
    </div>
  );
}
