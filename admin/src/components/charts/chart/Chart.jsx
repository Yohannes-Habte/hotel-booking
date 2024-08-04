import React from 'react';
import './Chart.scss';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const Chart = () => {
  // aspect is used to control the size of the diagram
  const data = [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 2400 },
    { name: 'Mar', total: 3000 },
    { name: 'Apr', total: 2900 },
    { name: 'May', total: 3200 },
    { name: 'Jun', total: 4500 },
    { name: 'Jul', total: 5200 },
    { name: 'Aug', total: 6400 },
    { name: 'Sep', total: 6800 },
    { name: 'Oct', total: 6500 },
    { name: 'Nov', total: 6000 },
    { name: 'Dec', total: 5500 },
  ];

  return (
    <section className="chart">
      <h3 className="revenue"> Title of chart </h3>
      <ResponsiveContainer width="100%" aspect={2/1} >
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" className='axis' />
          <YAxis  className='axis'/>
          <CartesianGrid strokeDasharray="3 3" className="chart-Grid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Chart;
