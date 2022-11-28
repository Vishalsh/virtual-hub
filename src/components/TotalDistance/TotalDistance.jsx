import React from 'react';

export function TotalDistance({ distance }) {
  const totalDistance = parseFloat(distance / 1000).toFixed(1);

  return (
    <h3>
      Total Distance:
      {totalDistance}
      {' '}
      Km
    </h3>
  );
}
