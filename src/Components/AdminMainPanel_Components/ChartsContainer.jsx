import React from 'react';
import Barchart from './Charts/Barchart';
import LineChart from './Charts/LineChart';

function ChartsContainer() {
  return (
    <div className="flex w-screen h-auto justify-center items-center space-x-6">
      <Barchart />
      <LineChart />
    </div>
  );
}

export default ChartsContainer;
