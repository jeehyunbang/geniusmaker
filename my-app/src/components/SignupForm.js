import React, { useState } from "react";
import "../css/SignupForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [customDomain, setCustomDomain] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setEmailDomain("");
    } else {
      setEmailDomain(value);
      setCustomDomain(""); // Reset custom domain input
    }
  };

  return (
    <div className="signupform-container">
      {/* Left Section */}
      <div className="signupform-left">
        <h1 className="signupform-title">회원가입</h1>
        <p className="signupform-subtitle">
          고객님의 회원정보를 입력해주세요
          <br />
          <span className="signupform-note">
            <span className="signupform-required">*</span> 필수 정보를 입력해야 회원가입이 가능해요
          </span>
        </p>
      </div>

      {/* Right Section */}
      <div className="signupform-right">
        <form>
          {/* Name */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>이름
            </label>
            <div className="signupform-input-group">
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                className="signupform-input-text"
              />
            </div>
          </div>

          {/* Email */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>이메일
            </label>
            <div className="signupform-input-group">
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                className="signupform-input-text"
              />
              <span className="signupform-email-domain">@</span>
              <select
                className="signupform-domain-select"
                value={emailDomain || "custom"}
                onChange={handleDomainChange}
              >
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="custom">직접 입력</option>
              </select>
              {emailDomain === "" && (
                <input
                  type="text"
                  placeholder="도메인을 입력해주세요"
                  className="signupform-custom-domain-input"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Password */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>비밀번호
            </label>
            <div className="signupform-input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="signupform-input-text"
              />
              <span
                className="signupform-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>비밀번호 확인
            </label>
            <div className="signupform-input-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="signupform-input-text"
              />
              <span
                className="signupform-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>분야
            </label>
            <div className="signupform-input-group">
              <select className="signupform2-domain-select">
                <option value="공학">공학</option>
                <option value="디자인">디자인</option>
                <option value="경제">경제</option>
                <option value="과학">과학</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="signupform-submit-button">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
