import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/ConferenceDetail.css";

const ConferenceDetail = () => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();
  const [conferenceData, setConferenceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConferenceData = async () => {
      try {
        const token = localStorage.getItem("loginToken"); // JWT 토큰 가져오기
        const response = await fetch(
          `http://43.200.115.60/api/conference/${conferenceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("학회 정보를 불러오지 못했습니다.");
        }

        const result = await response.json();
        setConferenceData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConferenceData();
  }, [conferenceId]);

  if (loading) {
    return <div className="conference-detail">로딩 중...</div>;
  }

  if (error) {
    return <div className="conference-detail error-message">{error}</div>;
  }

  if (!conferenceData) {
    return <div className="conference-detail">학회 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="conference-detail-container">
      {/* 학회 정보 헤더 */}
      <div className="conference-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h2>학회정보</h2>
      </div>

      {/* 학회 썸네일 */}
      <div className="logo-container">
        <img
          src={conferenceData.imageUrl}
          alt={`${conferenceData.name} 로고`}
        />
      </div>

      {/* 학회 상세 내용 */}
      <div className="conference-content">
        <h3 className="conference-name">{conferenceData.name}</h3>
        <p className="conference-description">
          {conferenceData.description}
        </p>
        <ul className="conference-details">
          <li>
            <strong>분야:</strong> {conferenceData.researchType}
          </li>
          <li>
            <strong>연혁:</strong> {conferenceData.foundedAt}
          </li>
          <li>
            <strong>이메일:</strong>{" "}
            <a href={`mailto:${conferenceData.email}`}>
              {conferenceData.email}
            </a>
          </li>
          <li>
            <strong>주소:</strong> {conferenceData.conferenceAddress}
          </li>
          <li>
            <strong>논문 제출 가능 여부:</strong>{" "}
            {conferenceData.discussionSubmit ? "가능" : "불가능"}
          </li>
          <li>
            <strong>학회 참여비:</strong> {conferenceData.joinFee.toLocaleString()} 원
          </li>
          <li>
            <strong>공식 웹사이트:</strong>{" "}
            <a
              href={conferenceData.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {conferenceData.officialUrl}
            </a>
          </li>
          <li>
            <strong>소셜 미디어:</strong>{" "}
            <a
              href={conferenceData.socialMediaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {conferenceData.socialMediaUrl}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConferenceDetail;
