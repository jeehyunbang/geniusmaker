import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ConferenceCard.css";

const ConferenceCard = ({ id, category, title, location, mode, image }) => {
  const navigate = useNavigate();

  return (
    <div className="conference-card" onClick={() => navigate(`/conferences/${id}`)}>
      <div className="category">{category}</div>
      <img src={image} alt={title} className="conference-image" />
      <h3 className="conference-title">{title}</h3>
      <p className="conference-info">
        📍 {location} &nbsp;
      </p>
    </div>
  );
};

export default ConferenceCard;
