import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EventDetail.css";

const EventDetail = ({ toggleModal }) => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();

  // ✅ isLoggedIn 상태 (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const eventData = {
    id: 1,
    conference_name: "AI Technology Conference 2025",
    conference_established_date: "2025년 6월 15일",
    email: "ai_conference2025@example.com",
    category: "Technology",
    organization_location: "Seoul, South Korea",
    thumbnail: "https://example.com/event1_thumbnail.jpg",
    paper_submission_available: "불가능",
    conference_fee: "50,000원",
    conference_description:
      "A conference to share the latest technologies in AI and machine learning.",
    official_website: "https://example.com",
    social_media_link: "https://example.com/join",
  };

  return (
    <div className="event-detail-container">
      {/* 뒤로 가기 버튼 */}
      <div className="event-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h2>학술 행사 정보</h2>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="event-content">
        {/* 왼쪽 썸네일 */}
        <div className="thumbnail-container">
          <img src={eventData.thumbnail} alt={`${eventData.conference_name} 포스터`} />
        </div>

        {/* 오른쪽 학회 정보 */}
        <div className="event-info">
          <h3 className="event-name">{eventData.conference_name}</h3>
          <p className="event-description">{eventData.conference_description}</p>

          <h4 className="info-header">행사 기본 정보</h4>
          <ul className="event-details">
            <li><strong>개최기관:</strong> {eventData.conference_name}</li>
            <li><strong>분야:</strong> {eventData.category}</li>
            <li><strong>지역:</strong> {eventData.organization_location}</li>
            <li><strong>날짜:</strong> {eventData.conference_established_date}</li>
            <li><strong>논문 제출:</strong> {eventData.paper_submission_available}</li>
            <li><strong>참가비:</strong> {eventData.conference_fee}</li>
          </ul>

          <h4 className="info-header">참가 및 신청</h4>
          <ul className="event-details">
            <li>
              <strong>공식 웹사이트:</strong>{" "}
              <a href={eventData.official_website} target="_blank" rel="noopener noreferrer">
                {eventData.official_website}
              </a>
            </li>
            <li>
              <strong>신청 사이트:</strong>{" "}
              <a href={eventData.social_media_link} target="_blank" rel="noopener noreferrer">
                {eventData.social_media_link}
              </a>
            </li>
          </ul>

          {/* 지원하기 버튼 */}
          <div className="apply-button-container">
            <button className="apply-button">지원하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
