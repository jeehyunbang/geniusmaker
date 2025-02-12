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
      setCustomDomain(""); // 직접 입력 필드 초기화
    }
  };

  return (
    <div className="container">
      {/* 왼쪽 설명 영역 */}
      <div className="form-left">
        <h1 className="title">회원가입</h1>
        <p className="subtitle">
          고객님의 회원정보를 입력해주세요
          <br />
          <span className="note">
            <span className="required-star">*</span> 필수 정보를 입력해야 회원가입이 가능해요
          </span>
        </p>
      </div>

      {/* 오른쪽 입력 영역 */}
      <div className="form-right">
        <form>
          {/* 이름 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>이름
            </label>
            <div className="input-group">
              <input type="text" placeholder="이름을 입력해주세요" className="input-text" />
            </div>
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>이메일
            </label>
            <div className="input-group">
              <input type="text" placeholder="이메일을 입력해주세요" className="input-text" />
              <span className="email-domain">@</span>
              <select
                className="domain-select"
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
                  className="custom-domain-input"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>비밀번호
            </label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="input-text"
              />
              <span className="icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>비밀번호 확인
            </label>
            <div className="input-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="input-text"
              />
              <span className="icon" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* 가입하기 버튼 */}
          <button type="submit" className="submit-button">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
