import React from "react";
import { Line, defaults } from "react-chartjs-2";

import "./Chart.styles.css";

defaults.global.animation.duration = 5000;

const Chart = ({ dailyData }) => {
  const data = dailyData ? dailyData : null;

  return (
    <div className="chart-holder">
      <h1>GRAPH</h1>
      {data ? (
        <Line
          data={{
            labels: data.map(({ date }) => date),
            datasets: [
              {
                data: data.map(({ confirmed }) => confirmed),
                label: "Infected",
                borderColor: "#3333ff",
                fill: true,
              },
              {
                data: data.map(({ deaths }) => deaths),
                label: "Infected",
                borderColor: "red",
                backgroundColor: "#ff7979",
                fill: true,
              },
            ],
          }}
        />
      ) : null}
    </div>
  );
};

export default Chart;
