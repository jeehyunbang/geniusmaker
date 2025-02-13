//API 사용
/*
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/ConferenceDetail.css";

const ConferenceDetail = () => {
  const { conferenceId } = useParams();
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConferenceDetail = async () => {
      try {
        const token = localStorage.getItem("token"); // 토큰 저장 방식에 따라 변경 가능
        const response = await fetch(`/api/conferences/${conferenceId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("학회 정보를 불러오지 못했습니다.");
        }

        const result = await response.json();

        if (result.data && result.data.conferences.length > 0) {
          setConference(result.data.conferences[0]); // 첫 번째 학회 데이터 사용
        } else {
          throw new Error("학회 정보가 없습니다.");
        }

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConferenceDetail();
  }, [conferenceId]);

  if (loading) {
    return <div className="conference-detail">로딩 중...</div>;
  }

  if (error) {
    return <div className="conference-detail error-message">{error}</div>;
  }

  if (!conference) {
    return <div className="conference-detail">학회 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="conference-detail">
      <h2 className="conference-title">{conference.name}</h2>
      <img src={conference.thumbnail_url} alt={`${conference.name} 로고`} className="conference-logo" />
      <p className="conference-description">{conference.description}</p>

      <div className="conference-info">
        <p><strong>분야:</strong> {conference.category}</p>
        <p><strong>지역:</strong> {conference.region}</p>
        <p><strong>참가비:</strong> {conference.fee.toLocaleString()} 원</p>
        <p><strong>문의:</strong> <a href={`mailto:${conference.contact}`}>{conference.contact}</a></p>
        <p>
          <strong>참가 신청:</strong>{" "}
          <a href={conference.join_path} target="_blank" rel="noopener noreferrer">
            참가하기
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConferenceDetail;
*/

//로그인 처리가 안 됨됨
/*
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/ConferenceDetail.css";

const ConferenceDetail = () => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 여부 확인 (토큰 존재 여부)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰이 존재하면 true, 없으면 false
  }, []);

  const handleLogin = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  const conferenceData = {
    logo: "https://design-science.or.kr/media?key=designScience/homepage/logo/f7f69e79-435c-4a0d-8546-d17e70fed59a.png",
    name: conferenceId || "한국디자인학회",
    description:
      "(사)한국디자인학회1978년 10월 설립 이후, 현재(2019년 7월 기준) 6,500여명의 회원이 각 계에서 활동하고 있습니다. (사)한국디자인학회는 디자인분야 내 학회로서는 가장 유서 깊은 역사와 전통을 보유한 단체로, 디자인 전 영역에 걸쳐 이론과 실천적 학문 탐구 활동을 이어 나가고 있습니다.",
    established: "1978년 10월",
    field: "예술 디자인",
    rank: "상위 등급",
    location: "경기도 성남시 분당구 양현로 322, 410호 (야탑동, 코리아디자인센터)",
    online: "온라인",
    offline: "오프라인",
    website: "https://www.designsociety.or.kr",
  };

  return (
    <div className="conference-detail-container">
      <div className="conference-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h2>학회정보</h2>
      </div>

      <div className="logo-container">
        <img src={conferenceData.logo} alt={`${conferenceData.name} 로고`} />
      </div>

      <div className={`conference-content ${!isLoggedIn ? "blurred" : ""}`}>
        {!isLoggedIn && (
          <div className="login-overlay">
            <p>로그인 후 학회 정보를 확인하세요.</p>
            <button className="login-button" onClick={handleLogin}>
              로그인
            </button>
          </div>
        )}
        <h3 className="conference-name">{conferenceData.name}</h3>
        <p className="conference-description">{conferenceData.description}</p>
        <ul className="conference-details">
          <li><strong>연혁 : </strong> {conferenceData.established}</li>
          <li><strong>분야 : </strong> {conferenceData.field}</li>
          <li><strong>학회 등급 : </strong> {conferenceData.rank}</li>
          <li><strong>지역 : </strong> {conferenceData.location}</li>
          <li><strong>온/오프라인 : </strong> {conferenceData.online} · {conferenceData.offline}</li>
          <li>
            <strong>공식 웹사이트 연락처 : </strong> 
            <a href={conferenceData.website} target="_blank" rel="noopener noreferrer">
              {conferenceData.name}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConferenceDetail;
*/
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
