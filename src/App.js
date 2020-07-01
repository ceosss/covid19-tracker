import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "./components/Card/Card.component.jsx";
import URL from "./BaseURL";

import "./App.css";

function App() {
  const [data, setDate] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await axios.get(URL);
      const data = response.data;

      setDate({
        confirmed: data.confirmed.value,
        recovered: data.recovered.value,
        deaths: data.deaths.value,
        lastUpdate: data.lastUpdate,
      });
    }
    getData();
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
    </div>
  );
}

export default App;
