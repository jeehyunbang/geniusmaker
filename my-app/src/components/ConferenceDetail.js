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
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import "../css/ConferenceDetail.css";

const ConferenceDetail = () => {
  const { conferenceId } = useParams();
  const navigate = useNavigate(); // 뒤로 가기 기능을 위한 useNavigate 사용

  // 임시 데이터 (실제 API 연동 시 교체)
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
    website: "https://www.designsociety.or.kr"
  };

  return (
    <div className="conference-detail-container">
      {/* 학회 정보 헤더 */}
      <div className="conference-header">
        {/* 뒤로가기 버튼 추가 */}
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h2>학회정보</h2>
      </div>

      {/* 학회 로고 */}
      <div className="logo-container">
        <img src={conferenceData.logo} alt={`${conferenceData.name} 로고`} />
      </div>

      {/* 학회 상세 내용 */}
      <div className="conference-content">
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
