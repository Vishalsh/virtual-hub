import {Map} from "../../components/Map/Map.jsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TotalDistance} from "../../components/TotalDistance/TotalDistance.jsx";
import {TotalTime} from "../../components/TotalTime/TotalTime.jsx";

const DUMMY_DATA = {
  UUID: 'some-uuid-string',
  route: {
    origin: {lat: 28.5076444, lng: 77.0522823, name: "Somewhere in NCR"},
    wayPoints: [
      {
        "lat": 28.632047,
        "lng": 77.1389094,
        "name": "Naraina, New Delhi, Delhi, India"
      },
      {
        "lat": 28.5503314,
        "lng": 77.2501893,
        "name": "Nehru Place, New Delhi, Delhi, India"
      },
    ],
    destination: {
      "lat": 28.4594965,
      "lng": 77.0266383,
      "name": "Gurugram, Haryana, India"
    },
    totalDistance: '200km',
  },
  userName: 'Prashant',
  image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
}

const RouteDetail = ({match}) => {
  const [routeData, setRouteData] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const {routeId} = useParams();

  useEffect(() => {
    fetch(`/route-planner/${routeId}`)
      .then(results => results.json())
      .then(routeData => {
        setRouteData(routeData);
      })
      .catch(() => {
        setRouteData(DUMMY_DATA);
      });
  }, []);

  function showTotalDistanceAndTime(distance, time) {
    setTotalDistance(distance);
    setTotalTime(time);
  }

  return (
    routeData && <div className="route-detail">
      <div className="profile-info">
        <div className="profile-image" style={{width: '60px'}}>
          <img src={routeData.image} alt="profile-pic" style={{maxWidth: '100%'}  }/>
        </div>
        <div className="userName">{routeData.userName}</div>
      </div>
      <div className="route-map">
        {!!totalDistance && <TotalDistance distance={totalDistance} />}
        {!!totalTime && <TotalTime time={totalTime} />}
        <Map
          userLocation={routeData.route.origin}
          locationPoints={[...routeData.route.wayPoints, routeData.route.destination]}
          afterDrawingRoute={showTotalDistanceAndTime}
        />
      </div>
    </div>
  )
};

export default RouteDetail;