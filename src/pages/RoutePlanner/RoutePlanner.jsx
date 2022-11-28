import React, {
  useState, useEffect, useContext, createRef,
} from 'react';
import { RWebShare } from 'react-web-share';
// import { MobileView } from 'react-device-detect';
import addNotification from 'react-push-notification';
import { Redirect } from 'react-router-dom';

import { Locations } from '../../components/Locations/Locations';
import { Map } from '../../components/Map/Map';
import { TotalDistance } from '../../components/TotalDistance/TotalDistance';
import { TotalTime } from '../../components/TotalTime/TotalTime';
import { useUserLocation } from '../../hooks/useUserLocation';
import { UserContext } from '../../context/UserContext';
import * as http from '../../utils/http';

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
    <>
      <h2>
        Hello
        {user?.name}
      </h2>
      {userLocation?.lat && (
        <>
          <Locations
            userLocation={userLocation}
            locationPoints={locationPoints}
            onSelectLocation={onSelectLocation}
          />
          {
            locationPoints.length > 0 && <button type="button" onClick={reverseLocations}>Reverse</button>
          }
          {!!totalDistance && <TotalDistance distance={totalDistance} />}
          {!!totalTime && <TotalTime time={totalTime} />}
          <Map
            userLocation={userLocation}
            locationPoints={locationPoints}
            afterDrawingRoute={showTotalDistanceAndTime}
          />

          <input type="file" ref={fileInput} accept=".png, .jpg, .jpeg" />
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
            <>
              <button type="button" onClick={saveRoute}>Save 🔗</button>
              <RWebShare
                data={{
                  text: 'Here is your shortest route',
                  url: '/route-planner/some-route-id',
                  title: 'Shortest Route Finder',
                }}
              >
                <button type="button">Share 🔗</button>
              </RWebShare>
            </>
          )}
        </>
      )}
    </>
  );
}

export default RoutePlanner;
