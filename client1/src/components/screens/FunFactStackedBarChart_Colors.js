import React from "react";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
    fetch("http://localhost:8081/query/funfact2", {
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
      <BarChart
        width={1400}
        height={700}
        data={items}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='color' interval={0} name='color' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='cat' stackId='a' fill='#8884d8' />
        <Bar dataKey='dog' stackId='b' fill='#82ca9d' />
        <Bar dataKey='rabbit' stackId='c' fill='#ffb3d9' />
        <Bar dataKey='horse' stackId='d' fill='#ffc658' />
        <Legend />
      </BarChart>
    </div>
  );
}
