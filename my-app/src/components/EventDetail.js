import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EventDetail.css";
import LoginModal from "./LoginModal"; // ✅ 모달 import 추가

const EventDetail = () => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();

  // ✅ 로그인 상태 (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // ✅ 모달 상태 추가

  console.log("isLoggedIn 상태:", isLoggedIn);

  const eventData = {
    id: 1,
    name: "후라이드 치킨 시연회",
    imageUrl: "https://rootimpact4.s3.ap-northeast-2.amazonaws.com/images/38a7ec7d-e5ff-406e-a94f-8ae7972c3f79.png",
    organizer: "후라이드 학회",
    eventType: "치킨 연구",
    region: "부산",
    eventStartAt: "2025년 02월 10일",
    eventEndAt: "2025년 02월 17일",
    fee: "100,000원",
    officalUrl: "https://chikcen.site",
    joinUrl: "https://join.com",
    description: "후라이드 치킨 냠냠",
    offline: true
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
          <img src={eventData.imageUrl} alt={`${eventData.name} 포스터`} />
        </div>

        {/* 🔹 오른쪽 학술 행사 정보 */}
        <div className="event-info">
          {/* 학술 행사 정보 (로그인하지 않으면 블러 처리) */}
          <div className={`event-details-container ${!isLoggedIn ? "blurred" : ""}`}>
            <h3 className="event-name">{eventData.name}</h3>
            <p className="event-description">{eventData.description}</p>

            <div className="info-header">행사 기본 정보</div>
            <ul className="event-details">
              <li><strong>개최기관:</strong> {eventData.organizer}</li>
              <li><strong>분야:</strong> {eventData.eventType}</li>
              <li><strong>지역:</strong> {eventData.region}</li>
              <li><strong>기간:</strong> {eventData.eventStartAt} ~ {eventData.eventEndAt}</li>
              <li><strong>오프라인 여부:</strong> {eventData.offline ? "오프라인" : "온라인"}</li>
              <li><strong>참가비:</strong> {eventData.fee}</li>
            </ul>

            <div className="info-header">참가 및 신청</div>
            <ul className="event-details">
              <li>
                <strong>공식 웹사이트:</strong>
                <a href={eventData.officalUrl} target="_blank" rel="noopener noreferrer">
                  {eventData.officalUrl}
                </a>
              </li>
              <li>
                <strong>신청 사이트:</strong>
                <a href={eventData.joinUrl} target="_blank" rel="noopener noreferrer">
                  참가 신청
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
