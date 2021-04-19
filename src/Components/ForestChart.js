import React from "react";
import { Line } from "react-chartjs-2";

const ForestChart = ({ data }) => {
  data.shift();
  const LineChart = data.length ? (
    <Line
      data={{
        labels: data.map(({ timestep }) => timestep),
        datasets: [
          {
            data: data.map(({ density }) => density),
            label: "Density",
            borderColor: "#3333ff",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div>{LineChart}</div>;
};

export default ForestChart;
