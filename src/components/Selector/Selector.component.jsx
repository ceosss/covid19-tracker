import React from "react";

import "./Selector.styles.css";

const Selector = ({ handleCountryChange, countries }) => {
  return (
    <div className="selector">
      <select id="select" onChange={handleCountryChange} defaultValue="">
        <option value="global">Global</option>

        {countries
          ? countries.map((country, index) => (
              <option value={country} key={index}>
                {country}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default Selector;
