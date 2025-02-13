import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EventDetail.css";

const EventDetail = ({ toggleModal }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // ✅ 로그인 여부 확인 (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // ✅ 테스트용 (true: 로그인 상태)

  // ✅ console.log로 상태 확인
  console.log("isLoggedIn 상태:", isLoggedIn);

  // ✅ 이벤트 상세 정보 (API 데이터 예시)
  const eventData = {
    id: 1,
    event_name: "AI Technology Conference 2025",
    event_thumbnail: "https://example.com/event1_thumbnail.jpg",
    organization: "AI Research Institute",
    category: "Technology",
    location: "Seoul, South Korea",
    event_start_date: "2025-06-15T10:00:00Z",
    event_end_date: "2025-06-17T18:00:00Z",
    entry_fee: 50000,
    official_website: "https://example.com",
    registration_site: "https://example.com/join",
    description: "A conference to share the latest technologies in AI and machine learning.",
    is_online: false,
  };

  return (
    <div className="event-detail-container">
      {/* 이벤트 정보 헤더 */}
      <div className="event-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h2>학술행사 정보</h2>
      </div>

      {/* 행사 썸네일 */}
      <div className="logo-container">
        <img src={eventData.event_thumbnail} alt={`${eventData.event_name} 이미지`} />
      </div>

      {/* 로그인 안내 메시지 및 버튼 (로그인 상태가 false일 때만 표시) */}
      {!isLoggedIn && (
        <div className="login-overlay">
          <p>로그인 후 학술행사 정보를 확인하세요.</p>
          <button className="login-button" onClick={toggleModal}>
            로그인
          </button>
        </div>
      )}

      {/* 행사 상세 내용 (로그인하지 않으면 블러 처리) */}
      <div className={`event-content ${isLoggedIn ? "" : "blurred"}`}>
        <h3 className="event-name">{eventData.event_name}</h3>
        <p className="event-description">{eventData.description}</p>
        <ul className="event-details">
          <li><strong>주최기관 :</strong> {eventData.organization}</li>
          <li><strong>분야 :</strong> {eventData.category}</li>
          <li><strong>개최 지역 :</strong> {eventData.location}</li>
          <li><strong>개최 일정 :</strong> {eventData.event_start_date.split("T")[0]} ~ {eventData.event_end_date.split("T")[0]}</li>
          <li><strong>참가비 :</strong> {eventData.entry_fee.toLocaleString()} 원</li>
          <li><strong>온/오프라인 :</strong> {eventData.is_online ? "온라인" : "오프라인"}</li>
          <li>
            <strong>공식 웹사이트 :</strong> 
            <a href={eventData.official_website} target="_blank" rel="noopener noreferrer">
              공식 웹사이트 방문
            </a>
          </li>
          <li>
            <strong>참가 신청 :</strong> 
            <a href={eventData.registration_site} target="_blank" rel="noopener noreferrer">
              참가 신청하기
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EventDetail;
