import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map } from '../../components/Map/Map';
import { TotalDistance } from '../../components/TotalDistance/TotalDistance';
import { TotalTime } from '../../components/TotalTime/TotalTime';
import * as http from '../../utils/http';

import styles from './RouteDetail.module.scss';

const DUMMY_DATA = {
  id: '71e4ee43-054e-4863-9265-daea29fb0fb0',
  userName: 'Prashant Tomer',
  routeImageUrl: 'https://difcvh.s3.ap-south-1.amazonaws.com/1669707866040_browerify.png',
  journey: {
    origin: { lat: 28.5076444, lng: 77.0522823, name: 'Somewhere in NCR' },
    wayPoints: [
      {
        lat: 28.632047,
        lng: 77.1389094,
        name: 'Naraina, New Delhi, Delhi, India',
      },
      {
        lat: 28.5503314,
        lng: 77.2501893,
        name: 'Nehru Place, New Delhi, Delhi, India',
      },
    ],
    destination: {
      lat: 28.4594965,
      lng: 77.0266383,
      name: 'Gurugram, Haryana, India',
    },
  },
};

function RouteDetail() {
  const [route, setRoute] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const { routeId } = useParams();
  const routeDetailsUrl = `${import.meta.env.VIRTUAL_HUB_API_ENDPOINT}/journey/fetch/${routeId}`;

  async function getRouteDetails() {
    try {
      const response = await http.get(routeDetailsUrl);
      if (response > 400) {
        throw response.error;
      }
      setRoute(response);
    } catch (error) {
      setRoute(DUMMY_DATA);
      // alert('Something went wrong whille fetching the route. Please try again after sometime');
    }
  }

  useEffect(() => {
    getRouteDetails();
  }, []);

  function showTotalDistanceAndTime(distance, time) {
    setTotalDistance(distance);
    setTotalTime(time);
  }

  return (
    route && (
    <div className={styles.routeDetail}>
      <div className={styles.user}>
        <img
          src={route.routeImageUrl}
          alt="profile-pic"
          style={{ maxWidth: '100%' }}
          className={styles.user__image}
        />
        <div className={styles.user__name}>{route.userName}</div>
      </div>
      <div className={styles.routeDetail__map}>
        <div className={styles.stats}>
          {!!totalDistance && <TotalDistance distance={totalDistance} />}
          {!!totalTime && <TotalTime time={totalTime} />}
        </div>
        <Map
          userLocation={route.journey.origin}
          locationPoints={[...route.journey.wayPoints, route.journey.destination]}
          afterDrawingRoute={showTotalDistanceAndTime}
          showStaticRoute
        />
      </div>
    </div>
    )
  );
}

export default RouteDetail;
