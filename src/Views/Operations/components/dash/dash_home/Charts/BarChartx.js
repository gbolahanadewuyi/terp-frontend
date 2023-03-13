import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function BarChartx() {
    const datax = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
      
        datasets: [
          {
              label: "Approved",
              fillColor: "blue",
              backgroundColor: 'rgba(30, 12, 255, 1)',
              data: [2,5.8,5,4.3,7]
          },
          {
            label: "Pending",
            fillColor: "red",
            backgroundColor: 'rgba(135, 106, 255, 1)',
            data: [3,7,2,8,5,4]
          },
          {
            label: "Rejected",
            fillColor: "green",
            backgroundColor: 'rgba(0, 201, 255, 1)',
            data: [2,8,5,3,7,4]
          }
      ]
      }
  return (
    <Bar className=''
        data={datax}
        options={{
            title:{
            display:true,
            text:'Average Rainfall per month',
            fontSize:20
            },
            legend:{
            display:true,
            position:'right'
            }
        }}
    />
  )
}
