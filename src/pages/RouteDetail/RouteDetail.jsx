import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

import { Map } from '../../components/Map/Map';
import { TotalDistance } from '../../components/TotalDistance/TotalDistance';
import { TotalTime } from '../../components/TotalTime/TotalTime';
import * as http from '../../utils/http';

import styles from '../RoutePlanner/RoutePlanner.module.scss';

function RouteDetail() {
  const [route, setRoute] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showLocationPoints, setShowLocationPoints] = useState(true);
  const { routeId } = useParams();
  const routeDetailsUrl = `${
    import.meta.env.VIRTUAL_HUB_API_ENDPOINT
  }/journey/fetch/${routeId}`;

  async function getRouteDetails() {
    try {
      const response = await http.get(routeDetailsUrl);
      if (response > 400) {
        throw response.error;
      }
      setRoute(response);
    } catch (error) {
      alert('Something went wrong whille fetching the route. Please try again after sometime');
    }
  }

  useEffect(() => {
    getRouteDetails();
  }, []);

  function showTotalDistanceAndTime(distance, time) {
    setTotalDistance(distance);
    setTotalTime(time);
  }

  function toggleLocationPoints() {
    setShowLocationPoints(!showLocationPoints);
  }

  return (
    route && (
      <div className={styles.routePlanner}>
        <div className={`${styles.routePlanner__locations} ${showLocationPoints ? styles.routePlanner__show : styles.routePlanner__hide}`}>
          <div className={styles.routePlanner__locationsWrapper}>
            <h2 className={styles.routePlanner__user}>
              {route.userName}
              {' '}
              Route
            </h2>
            <img
              src={route.routeImageUrl}
              alt="routeImage"
              className={styles.routePlanner__image}
            />
          </div>
        </div>
        <div className={styles.routePlanner__collapse}>
          <button
            type="button"
            onClick={toggleLocationPoints}
            className={styles.routePlanner__collapseBtn}
          >
            {showLocationPoints ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </button>
        </div>
        <div className={styles.routePlanner__map}>
          <div className={styles.stats}>
            {!!totalDistance && <TotalDistance distance={totalDistance} />}
            {!!totalTime && <TotalTime time={totalTime} />}
          </div>
          <Map
            userLocation={route.journey.origin}
            locationPoints={[
              ...route.journey.wayPoints,
              route.journey.destination,
            ]}
            afterDrawingRoute={showTotalDistanceAndTime}
            showStaticRoute
          />
        </div>
      </div>
    )
  );
}

export default RouteDetail;
