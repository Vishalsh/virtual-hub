import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

import { DirectionsService } from "@react-google-maps/api";
import { DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "500px",
};

export const Map = ({ userLocation, locationPoints }) => {
  const [directions, setDirections] = useState(null);
  const [directionsResultLoaded, setDirectionsResultLoaded] = useState(false);

  useEffect(() => {
    setDirectionsResultLoaded(false);
  }, [locationPoints]);

  function directionsCallback(response) {
    if (response !== null && !directionsResultLoaded) {
      if (response.status === "OK") {
        setDirections(response);
        setDirectionsResultLoaded(true);
      } else {
        alert("Something went wrong while drawing the route");
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
};
