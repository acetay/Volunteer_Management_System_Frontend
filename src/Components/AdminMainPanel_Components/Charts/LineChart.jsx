import { Line } from 'react-chartjs-2';
import { data } from '../../../data';
import { useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

function LineChart() {
  const [userData, setUserData] = useState({
    labels: data.map((d) => d.year),
    datasets: [
      {
        label: 'Volunteers Lost',
        data: data.map((d) => d.volunteerLost),
        backgroundColor: ['red', 'teal', 'green', 'orange', 'purple'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });
  return (
    <div style={{ width: 500 }}>
      <Line data={userData} />
    </div>
  );
}

export default LineChart;
