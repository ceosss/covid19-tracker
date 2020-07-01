import React from "react";
import CountUp from "react-countup";

import "./Card.styles.css";

const Card = ({ type, value, lastUpdate, caption }) => {
  lastUpdate = new Date(lastUpdate).toDateString();

  return (
    <div className={`card ${type}`}>
      <h2>{type}</h2>
      <p> <strong>{value ? <CountUp start={0} end={value} separator="," /> : null}</strong></p>
      <span className="last-update">
      <p>{lastUpdate}</p>
      </span>
      
      <span className="caption">
        <p>{caption}</p>
      </span>
    </div>
  );
};

export default Card;
