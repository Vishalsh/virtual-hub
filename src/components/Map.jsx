import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { LocationInput } from "./LocationInput";

import { DirectionsService } from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "500px",
};

export const Map = ({ userLocation }) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={10}
    >
      <Marker position={userLocation} />
    </GoogleMap>
  );
};
