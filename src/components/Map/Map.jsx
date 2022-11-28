import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { OptimalRouteDrawer } from './OptimalRouteDrawer';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export function Map({ userLocation, locationPoints, afterDrawingRoute }) {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={10}
    >
      <Marker position={userLocation} />
      <OptimalRouteDrawer
        origin={userLocation}
        wayPoints={locationPoints}
        afterDrawingRoute={afterDrawingRoute}
      />
    </GoogleMap>
  );
}
