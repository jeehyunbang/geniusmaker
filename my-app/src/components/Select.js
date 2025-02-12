import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Select.css";

export default function RoundedBox() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToConferenceSignup = () => {
    navigate("/conference-signup");
  };

  return (
    <div className="container">
      <div className="box" onClick={goToSignup}>
        <span>개인</span>
      </div>
      <div className="box" onClick={goToConferenceSignup}>
        <span>학회</span>
      </div>
    </div>
  );
}
