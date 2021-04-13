import React from "react";
import FunFactPercentRadarChart from "./FunFactPercentRadarChart";
import FunFactScatterChartLine from "./FunFactScatterChartLine";
import FunFactStackedAreaChart from "./FunFactStackedAreaChart";
import FunfactPie from "./FunFactPie";

const FunFact = () => {
  return (
    <div>
      <h1>this is the fun facts page</h1>
      <h2> 1. Radar distribution</h2>
      <FunFactPercentRadarChart/>

      <h2> 2. ScatterChartLine</h2>
      <FunFactScatterChartLine/>

      <h2> 3. StackedAreaChart</h2>
      <FunFactStackedAreaChart/>
      
      <h2> 4. Pie</h2>
      <FunfactPie/>
    </div>
  );
};

export default FunFact;
