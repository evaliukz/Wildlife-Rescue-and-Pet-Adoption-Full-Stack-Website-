import React from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
  {
    subject: 'Baby',
    A: 4267,
    B: 8987,
    C:176,
    fullMark: 150,
  },
  {
    subject: 'Young',
    A: 11316,
    B: 14123,
    C: 946,
    fullMark: 150,
  },
  {
    subject: 'Adult',
    A: 17325,
    B: 25644,
    fullMark: 900,
  },
  {
    subject: 'Senior',
    A: 3073,
    B: 3966,
    C: 30,
    fullMark: 150,
  },

];

export default function FunFactPercentRadarChart() {
  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      
      <Radar name="Dog" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      <Radar name="Cat" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="Rabbit" dataKey="C" stroke="#ffcc99" fill="#ffcc99" fillOpacity={0.6} />
      <Legend />
    </RadarChart>
  );
}

