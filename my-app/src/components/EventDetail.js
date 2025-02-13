import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EventDetail.css";
import LoginModal from "./LoginModal"; // ✅ 모달 import 추가

const EventDetail = () => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();

  // ✅ 로그인 상태 (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // ✅ 모달 상태 추가

  console.log("isLoggedIn 상태:", isLoggedIn);

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
    conference_description: "A conference to share the latest technologies in AI and machine learning.",
    official_website: "https://example.com",
    social_media_link: "https://example.com/join"
  };

  // ✅ 로그인 모달 열기
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // ✅ 로그인 모달 닫기
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="event-detail-container">
      {/* 🔹 학술 행사 정보 헤더 */}
      <div className="event-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h2>학술 행사 정보</h2>
      </div>

      {/* 🔹 로그인 안내 메시지 (블러 처리 없음) */}
      {!isLoggedIn && (
        <div className="login-overlay">
          <p>로그인 후 학술 행사 정보를 확인하세요.</p>
          <button className="login-button" onClick={openLoginModal}>
            로그인
          </button>
        </div>
      )}

      {/* 🔹 학술 행사 콘텐츠 레이아웃 */}
      <div className="event-content">
        {/* 🔹 왼쪽 썸네일 (포스터) */}
        <div className={`thumbnail-container ${!isLoggedIn ? "blurred" : ""}`}>
          <img src={eventData.thumbnail} alt={`${eventData.conference_name} 포스터`} />
        </div>

        {/* 🔹 오른쪽 학술 행사 정보 */}
        <div className="event-info">
          {/* 학술 행사 정보 (로그인하지 않으면 블러 처리) */}
          <div className={`event-details-container ${!isLoggedIn ? "blurred" : ""}`}>
            <h3 className="event-name">{eventData.conference_name}</h3>
            <p className="event-description">{eventData.conference_description}</p>

            <div className="info-header">행사 기본 정보</div>
            <ul className="event-details">
              <li><strong>개최기관:</strong> {eventData.conference_name}</li>
              <li><strong>분야:</strong> {eventData.category}</li>
              <li><strong>지역:</strong> {eventData.organization_location}</li>
              <li><strong>날짜:</strong> {eventData.conference_established_date}</li>
              <li><strong>논문 제출 가능 여부:</strong> {eventData.paper_submission_available}</li>
              <li><strong>참가비:</strong> {eventData.conference_fee}</li>
            </ul>

            <div className="info-header">참가 및 신청</div>
            <ul className="event-details">
              <li>
                <strong>공식 웹사이트:</strong>
                <a href={eventData.official_website} target="_blank" rel="noopener noreferrer">
                  {eventData.conference_name}
                </a>
              </li>
              <li>
                <strong>신청 사이트:</strong>
                <a href={eventData.social_media_link} target="_blank" rel="noopener noreferrer">
                  {eventData.conference_name}
                </a>
              </li>
            </ul>

            {/* 참가 버튼 */}
            <div className="apply-button-container">
              <button className="apply-button">지원하기</button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 로그인 모달 */}
      {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} toggleModal={closeLoginModal} />}
    </div>
  );
};

export default EventDetail;
