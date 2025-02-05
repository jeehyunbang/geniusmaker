import React from "react";
import "../css/ConferenceCard.css";

const ConferenceCard = ({ category, title, location, mode, image }) => {
  return (
    <div className="conference-card">
      <div className="category">{category}</div>
      <img src={image} alt={title} className="conference-image" />
      <h3 className="conference-title">{title}</h3>
      <p className="conference-info">
        📍 {location} &nbsp; 👥 {mode}
      </p>
    </div>
  );
};

export default ConferenceCard;
