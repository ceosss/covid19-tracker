import React, { useState, useEffect } from "react";
import Card from "./components/Card/Card.component.jsx";
import URL from "./BaseURL";

import "./App.css";

function App() {
  const [data, setDate] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await (await fetch(`${URL}`)).json();
      console.log(response);
      setDate({
        confirmed: response.confirmed.value,
        recovered: response.recovered.value,
        deaths: response.deaths.value,
        lastUpdate: response.lastUpdate,
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
