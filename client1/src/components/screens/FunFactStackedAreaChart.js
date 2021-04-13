import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    name: "Below $60,000",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "$60,000 - 100,000",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "$100,001 - $150,000",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "$150,001 - $200,000",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Above $200,000",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  
];

export default function FunFactStackedAreaChart() {
  return (
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="pv"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
      <Area
        type="monotone"
        dataKey="amt"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
      
    </AreaChart>
  );
}