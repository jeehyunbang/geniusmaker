import React from "react";
import "../css/EventCard.css";

const EventCard = ({ category, title, location, mode, image }) => {
  return (
    <div className="event-card">
      <div className="category">{category}</div>
      <img src={image} alt={title} className="event-image" />
      <h3 className="event-title">{title}</h3>
      <p className="event-info">
        📍 {location} &nbsp; 👥 {mode}
      </p>
    </div>
  );
};

export default EventCard;
