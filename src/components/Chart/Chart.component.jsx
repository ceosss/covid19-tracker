import React from "react";
import { Line, Bar, defaults } from "react-chartjs-2";

import "./Chart.styles.css";

defaults.global.animation.duration = 5000;

const Chart = ({ dailyData, countryData, country }) => {
  const data =
    country !== "global" ? countryData : dailyData ? dailyData : null;
  console.log(data);

  const BarChart = countryData ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              countryData.confirmed,
              countryData.recovered,
              countryData.deaths,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current State in ${country}` },
      }}
    />
  ) : null;

  const LineChart =
    dailyData && country === "global" ? (
      <Line
        data={{
          labels: data.map(({ date }) => date),
          datasets: [
            {
              data: data.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              backgroundColor: "rgba(121,142,252,0.2)",
              fill: true,
            },
            {
              data: data.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(253,120,120,0.7)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  return (
    <div className="chart-holder">
      <h1>VISUALIZATION</h1>
      {country !== "global" ? (
        <div className="bar-chart">{BarChart}</div>
      ) : (
        <div classsname="line-chart">{LineChart}</div>
      )}
    </div>
  );
};

export default Chart;
