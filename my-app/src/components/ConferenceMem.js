import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ConferenceMem.css";

const ConferenceMem = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };
  const conference = {
    name: "린",
    institution: "루트임팩트",
    field: "사회문화",
    members: "1,234 명",
    papers: "34 권",
    fee: "1000",
    openAccess: "무료",
  };

  return (
    <div className="conference-page">
      {/* 마이페이지 제목 */}
      <header className="member-header">마이페이지</header>
      
      {/* 학술 행사 등록 안내 */}
      <div className="login-section">
        <p className="login-tooltip">
          학회의 학술행사 정보를 등록해주세요 <span className="tooltip-icon">💬</span>
        </p>
        <button className="login-button" onClick={handleRegisterClick}>
          학술 행사 등록
        </button>
      </div>

      {/* 학회 정보 */}
      <h2 className="conference-header">학회정보</h2>

      <section className="conference-container">
        {/* 학회 로고 */}
        <img 
          src="https://design-science.or.kr/media?key=designScience/homepage/logo/f7f69e79-435c-4a0d-8546-d17e70fed59a.png" 
          alt="학회 로고" 
          className="conference-logo" 
        />

        {/* 학회 정보 섹션 */}
        <div className="conference-info">
          {/* 기본정보 */}
          <div className="conference-section">
            <h3 className="section-title">기본정보</h3>
            <div className="info-row">
              <span className="label">학회명</span>
              <span className="info-box">{conference.name}</span>
            </div>
            <div className="info-row">
              <span className="label">소속 기관</span>
              <span className="info-box">{conference.institution}</span>
            </div>
            <div className="info-row">
              <span className="label">분야</span>
              <span className="info-box">{conference.field}</span>
            </div>
          </div>

          {/* 회원 및 논문 현황 */}
          <div className="conference-section">
            <h3 className="section-title">회원 및 논문 현황</h3>
            <div className="info-row">
              <span className="label">학회 회원 수</span>
              <span className="info-box">{conference.members}</span>
              <span className="label">발행 논문 수</span>
              <span className="info-box">{conference.papers}</span>
            </div>
          </div>

          {/* 참가 및 비용 */}
          <div className="conference-section">
            <h3 className="section-title">참가 및 비용</h3>
            <div className="info-row">
              <span className="label">학회 참가비</span>
              <span className="info-box">{conference.fee} 원</span>
            </div>
            <div className="info-row">
              <span className="label">논문 개제 비용</span>
              <div className="radio-group">
                <label>
                  <input type="radio" name="openAccess" value="무료" checked={conference.openAccess === "무료"} readOnly />
                  무료
                </label>
                <label>
                  <input type="radio" name="openAccess" value="유료" checked={conference.openAccess === "유료"} readOnly />
                  유료
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 회원탈퇴 버튼 */}
      <button className="delete-button">회원탈퇴</button>
    </div>
  );
};

export default ConferenceMem;
