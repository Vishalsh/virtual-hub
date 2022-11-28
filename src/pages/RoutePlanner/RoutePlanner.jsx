import React, {
  createRef, useContext, useEffect, useState,
} from 'react';
import { RWebShare } from 'react-web-share';
// import { MobileView } from 'react-device-detect';
import addNotification from 'react-push-notification';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons/faArrowsUpDown';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes';
import { Locations } from '../../components/Locations/Locations';
import { Map } from '../../components/Map/Map';
import { TotalDistance } from '../../components/TotalDistance/TotalDistance';
import { TotalTime } from '../../components/TotalTime/TotalTime';
import { useUserLocation } from '../../hooks/useUserLocation';
import { UserContext } from '../../context/UserContext';
import * as http from '../../utils/http';
import styles from './RoutePlanner.module.scss';

function RoutePlanner() {
  const [userLocation, getUserLocation, setUserLocation] = useUserLocation();
  const [locationPoints, setLocationPoints] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const { user } = useContext(UserContext);
  const fileInput = createRef();

  useEffect(() => {
    getUserLocation();
  }, []);

  function onSelectLocation(location) {
    setLocationPoints([...locationPoints, location]);
  }

  function showTotalDistanceAndTime(distance, time) {
    setTotalDistance(distance);
    setTotalTime(time);
  }

  function pushNotification() {
    addNotification({
      title: 'Success',
      subtitle: 'Successfully Saved',
      message: 'The route has been saved Successfully',
      theme: 'darkblue',
      native: true, // when using native, your OS will handle theming.
    });
  }

  async function saveRoute() {
    try {
      await http.post(
        'https://e-commerce-microfrontends-apis.herokuapp.com/products',
        {
          userName: user.name,
          image: fileInput.current.files[0],
          route: {
            origin: userLocation,
            destination: locationPoints[locationPoints.length - 1],
            wayPoints: locationPoints.slice(0, locationPoints.length - 1),
          },
        },
      );
      pushNotification();
    } catch (error) {
      alert('Something went erong while saving the route');
    }
  }

  if (!user.isLoggedIn) {
    return Redirect('/login');
  }

  function reverseLocations() {
    const points = [...locationPoints];
    setUserLocation(points.pop());
    setLocationPoints([...points.reverse(), userLocation]);
  }

  return (
    <div className={styles.routePlanner}>
      <div className={styles.routePlanner__locations}>
        <h2 className={styles.routePlanner__user}>
          Hello
          {' '}
          {user?.name}
        </h2>
        <div className={styles.routePlanner__points}>
          <Locations
            userLocation={userLocation}
            locationPoints={locationPoints}
            onSelectLocation={onSelectLocation}
          />
          {
            locationPoints.length > 0 && (
              <button type="button" onClick={reverseLocations} className={styles.routePlanner__reverse}>
                <FontAwesomeIcon icon={faArrowsUpDown} />
                <span>Reverse Route</span>
              </button>
            )
          }
        </div>
      </div>
      {userLocation?.lat && (
        <div className={styles.routePlanner__map}>
          {(!!totalDistance || !!totalTime) && (
            <div className={styles.stats}>
              {!!totalDistance && <TotalDistance distance={totalDistance} />}
              {!!totalTime && <TotalTime time={totalTime} />}
            </div>
          )}
          <Map
            userLocation={userLocation}
            locationPoints={locationPoints}
            afterDrawingRoute={showTotalDistanceAndTime}
          />

          <div className={styles.routePlanner__uploadImage}>
            <input type="file" ref={fileInput} accept=".png, .jpg, .jpeg" />
          </div>
          {locationPoints.length > 0 && (
            // <MobileView>
            //   <RWebShare
            //     data={{
            //       text: `Here is your shortest route`,
            //       url: `/route/some-route-id`,
            //       title: "Shortest Route Finder",
            //     }}
            //     onClick={() => console.log("shared successfully!")}
            //   >
            //     <button>Share 🔗</button>
            //   </RWebShare>
            // </MobileView>
            <div className={styles.routePlanner__actions}>
              <button type="button" onClick={saveRoute} className={styles.routePlanner__save}>Save</button>
              <RWebShare
                data={{
                  text: 'Here is your shortest route',
                  url: '/route-planner/some-route-id',
                  title: 'Shortest Route Finder',
                }}
              >
                <button type="button" className={styles.routePlanner__share}>
                  <FontAwesomeIcon icon={faShareNodes} className={styles.routePlanner__shareIcon} />
                  <span>Share</span>
                </button>
              </RWebShare>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RoutePlanner;
