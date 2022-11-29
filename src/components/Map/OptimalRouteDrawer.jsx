import React, { useState, useEffect, useContext} from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import * as http from '../../utils/http';
import { OptimalRouteContext } from '../../context/OptimalRoute';

export function OptimalRouteDrawer({ origin, wayPoints, afterDrawingRoute }) {
  const [directions, setDirections] = useState(null);
  const [directionsResultLoaded, setDirectionsResultLoaded] = useState(false);
  const { route, setRoute } = useContext(OptimalRouteContext);
  const url = `${import.meta.env.VIRTUAL_HUB_API_ENDPOINT}/journey/optimal-path`;

  async function fetchOptimalRoute() {
    try {
      const optimalRoute = await http.post(url, JSON.stringify({
        origin,
        wayPoints,
      }), { headers: { 'Content-Type': 'application/json' } });
      setRoute(optimalRoute);
      setDirectionsResultLoaded(false);
    } catch (e) {
      alert('something went wrong while drawing the route');
      setRoute(null);
    }
  }

  function drawPathLocally() {
    setRoute({
      origin,
      destination: wayPoints[0],
      wayPoints: [],
    });
  }

  useEffect(() => {
    if (wayPoints.length === 1) {
      drawPathLocally();
    }
    if (wayPoints.length > 1) {
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
          waypoints: route.wayPoints.map((point) => ({
            location: { lat: point.lat, lng: point.lng },
          })),
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
