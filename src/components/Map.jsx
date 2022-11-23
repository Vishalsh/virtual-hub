import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { LocationInput } from "./LocationInput";

import { DirectionsService } from "@react-google-maps/api";
import { DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "500px",
};

export const Map = ({ userLocation, locationPoints }) => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const waypoints = locationPoints.map((point) => ({
      location: { lat: point.lat, lng: point.lng },
      stopover: true,
    }));

    const origin = userLocation;
    const destination = waypoints.pop()?.location;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints,
      },
      (result, status) => {
        console.log(result);
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  });

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={10}
    >
      <Marker position={userLocation} />
      <DirectionsRenderer
        containerStyle={containerStyle}
        directions={directions}
      />
    </GoogleMap>
  );
};
