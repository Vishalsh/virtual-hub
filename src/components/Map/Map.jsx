import React, { useState, useEffect } from 'react';
import {
  GoogleMap, Marker, DirectionsService, DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export function Map({ userLocation, locationPoints, afterDrawingRoute }) {
  const [directions, setDirections] = useState(null);
  const [directionsResultLoaded, setDirectionsResultLoaded] = useState(false);

  useEffect(() => {
    setDirectionsResultLoaded(false);
  }, [locationPoints]);

  function directionsCallback(response) {
    if (response !== null && !directionsResultLoaded) {
      if (response.status === 'OK') {
        setDirections(response);
        setDirectionsResultLoaded(true);
        const { legs } = response.routes[0];
        afterDrawingRoute(
          legs.reduce((totalDistance, leg) => (totalDistance + leg.distance.value), 0),
          legs.reduce((totalTime, leg) => (totalTime + leg.duration.value), 0),
        );
      } else {
        alert('Something went wrong while drawing the route');
      }
    }
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={10}
    >
      <Marker position={userLocation} />
      {locationPoints.length > 0 && (
      <>
        <DirectionsService
          options={{
            origin: userLocation,
            destination: locationPoints[locationPoints.length - 1],
            waypoints: locationPoints
              .slice(0, locationPoints.length - 1)
              .map((point) => ({
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
      )}
    </GoogleMap>
  );
}
