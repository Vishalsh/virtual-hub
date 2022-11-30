import React from 'react';
import { Link } from 'react-router-dom';
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

  const shareMessageText = `${userName} has shared a route with you! Preview route ${route.origin.name.split(',')[0]}, ${route.origin.name.split(',')[1]} > ${route.wayPoints.map((wp) => `${wp.name.split(',')[0]}, ${wp.name.split(',')[1]}`).join('>')} > ${route.destination.name.split(',')[0]}, ${route.destination.name.split(',')[1]}`;

  return (
    <div className={styles.shareRoute}>
      <div className={styles.shareRoute__wrapper}>
        <div className={styles.shareRoute__details}>
          <img
            src={URL.createObjectURL(uploadedImage)}
            className={styles.shareRoute__image}
            alt="route"
          />
          <p>
            <Link target="_blank" to={`/route-planner/${routeSavedId}`}>{`${userName}'s route`}</Link>
            <span>has been saved successfully</span>
          </p>
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
