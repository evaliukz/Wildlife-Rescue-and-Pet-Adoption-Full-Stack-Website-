import React from "react";
import FunFactStackedAreaChart from "./FunFactStackedAreaChart";
import FunFactStackedAreaChartPetWeights from "./FunFactStackedAreaChart_PetWeights";
import FunFactStackedAreaChartPetName from "./FunFactStackedAreaChart_PetName";
import FunFactStackedBarChartColors from "./FunFactStackedBarChart_Colors";
const FunFact = () => {
  return (
    <div>
      <h1>
        If you’re looking for the most interesting list of animal facts, you’re
        at the right place!
      </h1>

      <h5> Here are the most common names for Dogs and Cats!!!</h5>
      <FunFactStackedAreaChartPetName />

      <h5>Do people abandon their pets because of colors? </h5>
      <FunFactStackedBarChartColors />

      <h5> Which states have more over-sized animals being abandoned?</h5>
      <FunFactStackedAreaChartPetWeights />

      <h5>
        {" "}
        Let's explore the relation among the Annual Gross Income, Population,
        and Pets for Adoption in each state!
      </h5>
      <FunFactStackedAreaChart />
    </div>
  );
};

export default FunFact;
