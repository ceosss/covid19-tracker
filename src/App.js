import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card/Card.component.jsx";
import Chart from "./components/Chart/Chart.component.jsx";
import URL from "./BaseURL";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await axios.get(URL);
      const allData = response.data;

      setData((previousData) => {
        return {
          ...previousData,
          confirmed: allData.confirmed.value,
          recovered: allData.recovered.value,
          deaths: allData.deaths.value,
          lastUpdate: allData.lastUpdate,
        };
      });
    }
    async function dailyData() {
      const response = await axios.get(`${URL}/daily`);
      const dailyData = response.data.map((d) => ({
        confirmed: d.confirmed.total,
        deaths: d.deaths.total,
        date: d.reportDate,
      }));
      setData((previousData) => {
        return {
          ...previousData,
          dailyData,
        };
      });
    }
    getData();
    dailyData();
  }, []);
  const Caption = {
    confirmed: "Number of Active Cases of COVID-19",
    recovered: "Number of Recoveries from COVID-19",
    deaths: "Number of Deaths Caused by COVID-19",
  };
  return (
    <div className="App">
      <div className="header">
        <h1>
          C<img src={require("./favicon.png")} alt="logo" />
          VID-19 TRACKER
        </h1>
      </div>
      <div className="body">
        <Card
          type="confirmed"
          value={data.confirmed}
          lastUpdate={data.lastUpdate}
          caption={Caption.confirmed}
        />
        <Card
          type="recovered"
          value={data.recovered}
          lastUpdate={data.lastUpdate}
          caption={Caption.recovered}
        />
        <Card
          type="deaths"
          value={data.deaths}
          lastUpdate={data.lastUpdate}
          caption={Caption.deaths}
        />
      </div>
      <div className="chart">
        <Chart dailyData={data.dailyData} />
      </div>
    </div>
  );
}

export default App;
