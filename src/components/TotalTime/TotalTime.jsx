import React from "react";

export const TotalTime = ({ time }) => {
  const totalTime =
    time < 3600
      ? `${Math.floor(time / 60)} min`
      : `${Math.floor(time / 3600)} hours ${Math.floor(
          (time % 3600) / 60
        )} min`;

  return <h3>Total Time: {totalTime}</h3>;
};
