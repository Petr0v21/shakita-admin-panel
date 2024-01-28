import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieComponent = (props: { data: number[] }) => {
  return (
    <Pie
      data={{
        labels: ['Authorized', 'Unauthorized'],
        datasets: [
          {
            label: 'Amount of Applications',
            data: props.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      }}
      className="dashboard-pie"
      // style={{ width: 400 }}
    />
  );
};

export default PieComponent;

// import { Chart } from 'react-google-charts';

// const optionsPie = {
//   title: 'Applications',
//   colors: ['rgba(52, 182, 88, 1)', 'rgba(232, 57, 57, 1)'],
//   titleTextStyle: {
//     color: 'white',
//   },
//   textStyle: {
//     color: 'white',
//   },
//   legend: {
//     textStyle: {
//       color: 'white',
//     },
//   },
// };

// const Pie: React.FC = () => {
//   const data = [
//     ['Applications', 'Percents'],
//     ['Authorized', 11],
//     ['Unauthorized', 2],
//   ];

//   return (
//     <div>
//       <Chart
//         chartType="PieChart"
//         data={data}
//         width="400px"
//         height="250px"
//         options={{ ...optionsPie, backgroundColor: 'black' }}
//       />
//     </div>
//   );
// };
