import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card/Card.component.jsx";
import Selector from "./components/Selector/Selector.component.jsx";
import Chart from "./components/Chart/Chart.component.jsx";
import URL from "./BaseURL";

import "./App.css";

function App() {
  const [data, setData] = useState({ currentCountry: "global" });
  useEffect(() => {
    async function getData() {
      let extend;
      if (!data.currentCountry || data.currentCountry === "global") extend = "";
      else extend = `countries/${data.currentCountry}`;
      const response = await axios.get(`${URL}/${extend}`);
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
    async function getCountry() {
      const response = await axios.get(`${URL}/countries`);
      const data = response.data.countries.map(({ name }) => name);
      setData((previousData) => {
        return {
          ...previousData,
          countries: data,
        };
      });
    }

    getData();
    dailyData();
    getCountry();
  }, [data.currentCountry]);
  const Caption = {
    confirmed: "Number of Active Cases of COVID-19",
    recovered: "Number of Recoveries from COVID-19",
    deaths: "Number of Deaths Caused by COVID-19",
  };

  const handleCountryChange = (event) => {
    const value = event.target.value || null;
    setData((previousData) => {
      return {
        ...previousData,
        currentCountry: value,
      };
    });
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
      <div className="selector">
        <Selector
          handleCountryChange={handleCountryChange}
          countries={data.countries}
        />
      </div>
      <div className="chart">
        <Chart
          dailyData={data.dailyData}
          countryData={{
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
          }}
          country={data.currentCountry}
        />
      </div>
      <div className="footer">
        <p>
          MADE WITH 🧡 by{" "}
          <a href="https://www.instagram.com/ceo.sss/" target="blank">
            ceo.sss
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
