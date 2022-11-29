import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes';
import { RWebShare } from 'react-web-share';
import { MobileView } from 'react-device-detect';
import styles from './ShareRoute.module.scss';

export function ShareRoute({
  userName, routeSavedId, route, uploadedImage, onPlanNewRoute,
}) {
  function planNewRoute() {
    onPlanNewRoute();
  }

  const shareMessageText = `${userName} shortest route starting from ${
    route.origin.name
  } covering ${route.wayPoints.map(
    (wp) => wp.name,
  ).join(',')} and ${route.destination.name}`;

  return (
    <div className={styles.shareRoute}>
      <div className={styles.shareRoute__wrapper}>
        <div className={styles.shareRoute__details}>
          <img
            src={URL.createObjectURL(uploadedImage)}
            className={styles.shareRoute__image}
            alt="route"
          />
          <p>{`${userName}'s route has been saved successfully`}</p>
        </div>
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
        <button
          type="button"
          onClick={planNewRoute}
          className={styles.shareRoute__link}
        >
          Plan a new Route
        </button>
      </div>
    </div>
  );
}
