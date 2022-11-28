import React, { useState, useEffect } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import * as http from '../../utils/http';

export function OptimalRouteDrawer({ origin, wayPoints, afterDrawingRoute }) {
  const [directions, setDirections] = useState(null);
  const [directionsResultLoaded, setDirectionsResultLoaded] = useState(false);
  const [route, setRoute] = useState(null);
  const url = `${import.meta.env.VIRTUAL_HUB_API_ENDPOINT}/journey/optimalPath`;

  async function fetchOptimalRoute() {
    try {
      const optimalRoute = await http.post(url, {
        origin,
        wayPoints,
      });
      setRoute(optimalRoute);
      setDirectionsResultLoaded(false);
    } catch (e) {
      alert('something went wrong while drawing the route');
      setRoute(null);
    }
  }

  useEffect(() => {
    if (wayPoints.length > 0) {
      fetchOptimalRoute();
    }
  }, [wayPoints]);

  function directionsCallback(response) {
    if (response !== null && !directionsResultLoaded) {
      if (response.status === 'OK') {
        setDirections(response);
        setDirectionsResultLoaded(true);
        const { legs } = response.routes[0];
        afterDrawingRoute(
          legs.reduce(
            (totalDistance, leg) => totalDistance + leg.distance.value,
            0,
          ),
          legs.reduce((totalTime, leg) => totalTime + leg.duration.value, 0),
        );
      } else {
        alert('Something went wrong while drawing the route');
      }
    }
  }

  if (route === null) {
    return null;
  }

  return (
    <>
      <DirectionsService
        options={{
          origin: route.origin,
          destination: route.destination,
          waypoints: route.wayPoints,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        }}
        callback={directionsCallback}
      />
      <DirectionsRenderer
        options={{
          directions,
        }}
      />
    </>
  );
}
