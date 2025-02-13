import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/EventCard.css";

const EventCard = ({ id, category, title, location, mode, image }) => {
  const navigate = useNavigate();

  return (
    <div className="event-card" onClick={() => navigate(`/events/${id}`)}>
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
