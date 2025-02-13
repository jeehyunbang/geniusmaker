import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 아이콘 추가
import "../css/SignupFormCon.css";

export default function SignupFormCon() {
  const navigate = useNavigate();

  // 이메일 도메인 상태 관리
  const [emailDomain, setEmailDomain] = useState("custom");
  const [customDomain, setCustomDomain] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleDomainChange = (e) => {
    setEmailDomain(e.target.value);
    if (e.target.value !== "custom") {
      setCustomDomain(""); // 직접 입력 필드 초기화
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup-con2");
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
                placeholder="소속기관을 입력해주세요"
                className="signupformCon-input-text"
              />
            </div>
          </div>

          {/* 담당자 */}
          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>담당자 성함
            </label>
            <div className="signupformCon-input-group">
              <input
                type="text"
                placeholder="담당자 성함을 입력해주세요"
                className="signupformCon-input-text"
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>이메일
            </label>
            <div className="signupformCon-input-group">
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                className="signupformCon-input-text"
              />
              <span className="signupformCon-email-domain">@</span>
              <select
                className="signupformCon-domain-select"
                value={emailDomain}
                onChange={handleDomainChange}
              >
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="custom">직접 입력</option>
              </select>
              {emailDomain === "custom" && (
                <input
                  type="text"
                  placeholder="도메인을 입력해주세요"
                  className="signupformCon-custom-domain-input"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>비밀번호
            </label>
            <div className="signupformCon-input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="signupformCon-input-text"
              />
              <span
                className="signupformCon-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
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
