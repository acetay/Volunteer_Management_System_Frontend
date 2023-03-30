import { Bar } from 'react-chartjs-2';
import { data } from '../../../data';
import { useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

function Barchart() {
  const [userData, setUserData] = useState({
    labels: data.map((d) => d.year),
    datasets: [
      {
        label: 'Volunteers gained',
        data: data.map((d) => d.volunteerGain),
        backgroundColor: ['green', 'teal', 'blue', 'red', 'orange', 'purple'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });
  return (
    <div style={{ width: 500 }}>
      <Bar data={userData} />
    </div>
  );
}

export default Barchart;
