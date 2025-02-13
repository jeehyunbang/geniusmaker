import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import "../css/SignupFormCon.css";

export default function SignupFormCon() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 동작 방지
    navigate("/signup-con2"); // signupFormCon2로 이동
  };

  return (
    <div className="signupformCon-container">
      {/* Left Section */}
      <div className="signupformCon-left">
        <h1 className="signupformCon-title">회원가입</h1>
        <p className="signupformCon-subtitle">
          학회 정보를 입력해주세요
          <br />
          <span className="signupformCon-note">
            <span className="signupformCon-required">*</span> 필수 정보를 입력해야 회원가입이 가능해요
          </span>
        </p>
      </div>

      {/* Right Section */}
      <div className="signupformCon-right">
        <form onSubmit={handleSubmit}>
          {/* 학회명 */}
          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>학회명
            </label>
            <div className="signupformCon-input-group">
              <input
                type="text"
                placeholder="학회명을 입력해주세요"
                className="signupformCon-input-text"
              />
            </div>
          </div>

          {/* 소속기관 */}
          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>소속기관
            </label>
            <div className="signupformCon-input-group">
              <input
                type="text"
                placeholder="소속기관명을 입력해주세요"
                className="signupformCon-input-text"
              />
            </div>
          </div>

          {/* 분야 */}
          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>분야
            </label>
            <div className="signupformCon-input-group">
              <select className="signupformCon-domain-select">
                <option value="공학">공학학</option>
                <option value="예술">예술</option>
                <option value="과학">과학</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>

          {/* 학회 회원 수 */}
          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>학회 회원 수
            </label>
            <div className="signupformCon-input-group">
              <input
                type="number"
                placeholder="학회 회원 수를 입력해주세요"
                className="signupformCon-input-text"
                min="1"
              />
              <span className="signupformCon-fixed-label">명</span>
            </div>
          </div>
          <button type="submit" className="signupformCon-submit-button">
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
