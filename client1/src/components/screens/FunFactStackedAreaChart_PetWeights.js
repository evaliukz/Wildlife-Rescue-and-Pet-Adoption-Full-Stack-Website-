import React from "react";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
/*tutorial: https://medium.com/@kevinlohier.kl/how-to-fetch-apis-in-react-and-effectively-use-data-responses-to-create-graphs-using-recharts-5a4eea4b5184
useState is a react hook which allows functional components to manage react states.
UseEffect is a functional implementation of componentDidMount,componentDidUpdate, and componentWillUnmount
Because of useEffect , the above code is only going to run when the variables specified in the corresponding array [] are modified.
In this case, the array is empty. This means that the code will only run once (At loading time).
*/
export default function FunFactStackedAreaChart() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const data = [];

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8081/query/funfact3", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json())
      .then(
        (result) => {
          for (var instance in result) {
            var mydata = result[instance];
            data.push(mydata);
          }
          setItems(data);
          //console.log(data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      <AreaChart
        width={1400}
        height={700}
        data={items}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='state' interval={0} name='State' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='indexScore'
          stackId='1'
          stroke='#ffb3d9'
          fill='#ffb3d9'
          name='Index Score'
        />

        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='state' interval={0} name='State' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='Size_Score'
          stackId='2'
          stroke='#8884d8'
          fill='#8884d8'
          name='Size Score'
        />

        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='state1' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='Family_Weight'
          stackId='1'
          stroke='#80ffbf'
          fill='#80ffbf'
          name='Family Weight'
        />

        <Legend />
      </AreaChart>
    </div>
  );
}
