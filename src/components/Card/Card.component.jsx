import React from "react";

import "./Card.styles.css";

const Card = ({ type, value, lastUpdate, caption }) => {
  lastUpdate = new Date(lastUpdate).toDateString();
  return (
    <div className={`card ${type}`}>
      <h2>{type}</h2>
      <p>{value}</p>
      <p>{lastUpdate}</p>
      <span className="caption">
        <p>{caption}</p>
      </span>
    </div>
  );
};

export default Card;
