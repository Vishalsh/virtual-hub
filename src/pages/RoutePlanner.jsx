import React, { useState, useEffect } from "react";
import { RWebShare } from "react-web-share";
import { MobileView } from "react-device-detect";

import { Locations } from "../components/Locations";
import { Map } from "../components/Map";
import { TotalDistance } from "../components/TotalDistance";
import { TotalTime } from "../components/TotalTime";
import { useUserLocation } from "../hooks/useUserLocation";
import * as http from "../utils/http";

const RoutePlanner = () => {
  const [userLocation, getUserLocation] = useUserLocation();
  const [locationPoints, setLocationPoints] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

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

  async function saveRoute() {
    try {
      await http.post("https://e-commerce-microfrontends-apis.herokuapp.com/products", {
        route: {
          origin: userLocation,
          destination: locationPoints[locationPoints.length - 1],
          wayPoints: locationPoints.slice(0, locationPoints.length - 1),
        },
      });
    } catch (error) {
      alert("Something went erong while saving the route");
    }
  }

  return (
    <>
      {userLocation?.lat && (
        <>
          <Locations
            userLocation={userLocation}
            onSelectLocation={onSelectLocation}
          />
          {!!totalDistance && <TotalDistance distance={totalDistance} />}
          {!!totalTime && <TotalTime time={totalTime} />}
          <Map
            userLocation={userLocation}
            locationPoints={locationPoints}
            afterDrawingRoute={showTotalDistanceAndTime}
          />
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
              <button onClick={saveRoute}>Save 🔗</button>
              <RWebShare
                data={{
                  text: `Here is your shortest route`,
                  url: `/route-planner/some-route-id`,
                  title: "Shortest Route Finder",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button>Share 🔗</button>
              </RWebShare>
            </>
          )}
        </>
      )}
    </>
  );
};

export default RoutePlanner;
