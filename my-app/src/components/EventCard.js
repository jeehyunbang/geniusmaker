import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/EventCard.css";

const EventCard = ({ id, category, name, region, imageUrl, offline }) => {
  const navigate = useNavigate();

  return (
    <div className="event-card" onClick={() => navigate(`/events/${id}`)}>
      <div className="category">{category}</div>
      <img src={imageUrl} alt={name} className="event-image" />
      <h3 className="event-title">{name}</h3>
      <p className="event-info">
        📍 {region} &nbsp; 👥 {offline ? "오프라인" : "온라인"}
      </p>
    </div>
  );
};

export default EventCard;
