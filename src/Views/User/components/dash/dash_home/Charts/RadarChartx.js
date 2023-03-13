import React, { PureComponent } from 'react';
// import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const data = [
  {
    name: 'Ongoing',
    uv: 70,
    pv: 2400,
    fill: '#138FFF',
  },
  {
    name: 'Completed',
    uv: 90,
    pv: 567,
    fill: '#152C5B',
  }
];

const style = {
  bottom: '2%',
  left: '2%',
  transform: 'translate(0, -0%)',
  lineHeight: '24px',
};

export default class RadarChartx extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-radial-bar-chart-qf8fz';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" className='xmx-auto xbg-slate-600'>
        <RadialBarChart cx="50%" cy="40%" innerRadius="70%" outerRadius="90%" barSize={10} data={data}>
          {/* <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="uv"
          /> */}
          <PolarAngleAxis type="number" domain={[0, 100]} dataKey={'pct'} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="uv" angleAxisId={0} data={data} />

          <Legend iconSize={10} layout="horizontal" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>

    );
  }
}




// export default function RadarChartx() {

// const data = [
//   {
//     name: '18-24',
//     uv: 31.47,
//     pv: 2400,
//     fill: '#8884d8',
//   },
//   {
//     name: '25-29',
//     uv: 26.69,
//     pv: 4567,
//     fill: '#83a6ed',
//   },
//   {
//     name: '30-34',
//     uv: 15.69,
//     pv: 1398,
//     fill: '#8dd1e1',
//   },
//   {
//     name: '35-39',
//     uv: 8.22,
//     pv: 9800,
//     fill: '#82ca9d',
//   },
//   {
//     name: '40-49',
//     uv: 8.63,
//     pv: 3908,
//     fill: '#a4de6c',
//   },
//   {
//     name: '50+',
//     uv: 2.63,
//     pv: 4800,
//     fill: '#d0ed57',
//   },
//   {
//     name: 'unknow',
//     uv: 6.67,
//     pv: 4800,
//     fill: '#ffc658',
//   },
// ];

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };

//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
//           <RadialBar
//             minAngle={15}
//             label={{ position: 'insideStart', fill: '#fff' }}
//             background
//             clockWise
//             dataKey="uv"
//           />
//           <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//         </RadialBarChart>
//       </ResponsiveContainer>
//     );
//   }



// const data = [
//   {
//     name: '18-24',
//     uv: 31.47,
//     pv: 2400,
//     fill: '#8884d8',
//   },
//   {
//     name: '25-29',
//     uv: 26.69,
//     pv: 4567,
//     fill: '#83a6ed',
//   },
//   {
//     name: '30-34',
//     uv: 15.69,
//     pv: 1398,
//     fill: '#8dd1e1',
//   },
//   {
//     name: '35-39',
//     uv: 8.22,
//     pv: 9800,
//     fill: '#82ca9d',
//   },
//   {
//     name: '40-49',
//     uv: 8.63,
//     pv: 3908,
//     fill: '#a4de6c',
//   },
//   {
//     name: '50+',
//     uv: 2.63,
//     pv: 4800,
//     fill: '#d0ed57',
//   },
//   {
//     name: 'unknow',
//     uv: 6.67,
//     pv: 4800,
//     fill: '#ffc658',
//   },
// ];

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };

// export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/simple-radial-bar-chart-qf8fz';

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
//           <RadialBar
//             minAngle={15}
//             label={{ position: 'insideStart', fill: '#fff' }}
//             background
//             clockWise
//             dataKey="uv"
//           />
//           <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//         </RadialBarChart>
//       </ResponsiveContainer>
//     );
//   }
// }


