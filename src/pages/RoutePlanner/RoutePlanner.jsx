import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import addNotification from 'react-push-notification';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons/faArrowsUpDown';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { Locations } from '../../components/Locations/Locations';
import { Map } from '../../components/Map/Map';
import { TotalDistance } from '../../components/TotalDistance/TotalDistance';
import { TotalTime } from '../../components/TotalTime/TotalTime';
import { useUserLocation } from '../../hooks/useUserLocation';
import { UserContext } from '../../context/UserContext';
import * as http from '../../utils/http';
import styles from './RoutePlanner.module.scss';
import { ShareRoute } from '../../components/ShareRoute/ShareRoute';
import { UploadImage } from '../../components/UploadImage/UploadImage';
import { OptimalRouteContext } from '../../context/OptimalRoute';
import { OptimalRoute } from '../../components/OptimalRoute/OptimalRoute';

function RoutePlanner() {
  const [userLocation, getUserLocation, setUserLocation] = useUserLocation();
  const [routeSaved, setRouteSaved] = useState(false);
  const [locationPoints, setLocationPoints] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [showLocationPoints, setShowLocationPoints] = useState(true);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [routeSavedId, setRouteSavedId] = useState('');
  const { user } = useContext(UserContext);
  const fileInput = useRef();
  const { route, setRoute } = useContext(OptimalRouteContext);
  const saveUrl = `${import.meta.env.VIRTUAL_HUB_API_ENDPOINT}/journey/save/v1`;

  useEffect(() => {
    getUserLocation();
  }, []);

  function onSelectLocation(locationIndex, location) {
    const updatedLocations = [...locationPoints];
    updatedLocations[locationIndex] = location;

    setLocationPoints(updatedLocations);
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
      const formData = new FormData();
      formData.append('file', fileInput.current.files[0]);
      formData.append('userName', JSON.stringify(user.name));
      formData.append('optimalJourney', JSON.stringify({
        origin: route.origin,
        destination: route.destination,
        wayPoints: route.wayPoints,
      }));
      const response = await http.post(
        saveUrl,
        formData,
      );
      if (response.status > 400) {
        throw response.error;
      }
      setRouteSaved(true);
      setRouteSavedId(response);
      pushNotification();
    } catch (error) {
      alert('Something went wrong while saving the route. Please try again later');
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

  function planNewRoute() {
    setRouteSaved(false);
    setLocationPoints([]);
    setTotalTime(0);
    setTotalDistance(0);
    setRoute(null);
  }

  function toggleLocationPoints() {
    setShowLocationPoints(!showLocationPoints);
  }

  function changeIsImageUploaded(isUploaded) {
    setIsImageUploaded(isUploaded);
  }

  return routeSaved ? (
    <ShareRoute
      userName={user.name}
      uploadedImage={fileInput.current.files[0]}
      route={route}
      routeSavedId={routeSavedId}
      onPlanNewRoute={planNewRoute}
    />
  ) : (
    <div className={styles.routePlanner}>
      <div
        className={`${styles.routePlanner__locations} ${
          showLocationPoints
            ? styles.routePlanner__show
            : styles.routePlanner__hide
        }`}
      >
        <div className={styles.routePlanner__locationsWrapper}>
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
            {locationPoints.length > 0 && (
              <button
                type="button"
                onClick={reverseLocations}
                className={styles.routePlanner__reverse}
              >
                <FontAwesomeIcon icon={faArrowsUpDown} />
                <span>Reverse Route</span>
              </button>
            )}
          </div>
          {route && (
            <div className={styles.routePlanner__optimalRoute}>
              <OptimalRoute route={route} />
            </div>
          )}
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
      {userLocation?.lat && (
        <div
          className={`${styles.routePlanner__map} ${
            (!!totalDistance || !!totalTime) && styles.routePlanner__mapData
          }`}
        >
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
          <div className={styles.routePlanner__actions}>
            <UploadImage
              fileInputRef={fileInput}
              onUploadImage={changeIsImageUploaded}
            />
            <button
              type="button"
              disabled={locationPoints.length === 0 || !isImageUploaded}
              onClick={saveRoute}
              className={styles.routePlanner__save}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoutePlanner;
