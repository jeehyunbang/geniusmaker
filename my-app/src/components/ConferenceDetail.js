//강제로 비로그인
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/ConferenceDetail.css";

const ConferenceDetail = ({ toggleModal }) => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();

  // ✅ isLoggedIn 상태 (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  console.log("isLoggedIn 상태:", isLoggedIn);

  const conferenceData = {
    id: 1,
    conference_name: "루트임팩트",
    conference_established_date: "1946년 1월 1일",
    email: "ai_conference2025@example.com",
    category: "디자인",
    organization_location: "서울, 대한민국",
    thumbnail: "https://example.com/confe1_thumbnail.jpg",
    paper_submission_available: "가능",
    conference_fee: "0원",
    conference_description: "(사)한국디자인학회1978년 10월 설립 이후, 현재(2019년 7월 기준) 6,500여명의 회원이 각 계에서 활동하고 있습니다. (사)한국디자인학회는 디자인분야 내 학회로서는 가장 유서 깊은 역사와 전통을 보유한 단체로, 디자인 전 영역에 걸쳐 이론과 실천적 학문 탐구 활동을 이어 나가고 있습니다.",
    official_website: "https://example.com/join_ai_conference",
    social_media_link: "https://example.com"
  };

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
        <img src={conferenceData.thumbnail} alt={`${conferenceData.conference_name} 로고`} />
      </div>

      {/* 로그인 안내 메시지 및 버튼 */}
      {!isLoggedIn && (
        <div className="login-overlay">
          <p>로그인 후 학회 정보를 확인하세요.</p>
          <button className="login-button" onClick={toggleModal}>
            로그인
          </button>
        </div>
      )}

      {/* 학회 상세 내용 (로그인하지 않으면 블러 처리) */}
      <div className={`conference-content ${isLoggedIn ? "" : "blurred"}`}>
        <h3 className="conference-name">{conferenceData.conference_name}</h3>
        <p className="conference-description">{conferenceData.conference_description}</p>
        <ul className="conference-details">
          <li><strong>분야 : </strong> {conferenceData.category}</li>
          <li><strong>연혁 : </strong> {conferenceData.conference_established_date}</li>
          <li><strong>이메일 : </strong> {conferenceData.email}</li>
          <li><strong>주소 : </strong> {conferenceData.organization_location}</li>
          <li><strong>논문 제출 가능 여부 : </strong> {conferenceData.paper_submission_available}</li>
          <li><strong>학회 참여여비 : </strong> {conferenceData.conference_fee}</li>
          <li>
            <strong>공식 웹사이트 : </strong> 
            <a href={conferenceData.official_website} target="_blank" rel="noopener noreferrer">
              {conferenceData.official_website}
            </a>
          </li>
          <li>
            <strong>소셜 미디어 : </strong> 
            <a href={conferenceData.social_media_link} target="_blank" rel="noopener noreferrer">
              {conferenceData.social_media_link}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConferenceDetail;
