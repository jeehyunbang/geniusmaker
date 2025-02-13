import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "../css/SignupFormCon.css";

export default function SignupFormCon() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    manager: "",
    email: "",
    password: "",
  });

  const [emailDomain, setEmailDomain] = useState("custom");
  const [customDomain, setCustomDomain] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleDomainChange = (e) => {
    setEmailDomain(e.target.value);
    if (e.target.value !== "custom") {
      setCustomDomain(""); // 직접 입력 필드 초기화
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "학회명을 입력해주세요.";
    if (!formData.organization) newErrors.organization = "소속기관을 입력해주세요.";
    if (!formData.manager) newErrors.manager = "담당자 성함을 입력해주세요.";
    if (!formData.email) newErrors.email = "이메일을 입력해주세요.";
    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/signup-con2");
    } else {
      alert("모든 필수 정보를 입력해주세요!");
    }
  };

  return (
    <div className="signupformCon-container">
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

      <div className="signupformCon-right">
        <form onSubmit={handleSubmit}>
          {/* 학회명 */}
          <div className="signupformCon-group">
            <label><span className="signupformCon-required">*</span>학회명</label>
            <div className={`signupformCon-input-group ${errors.name ? "error" : ""}`}>
              <input
                type="text"
                name="name"
                placeholder="학회명을 입력해주세요"
                className="signupformCon-input-text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="signupformCon-group">
            <label>
              <span className="signupformCon-required">*</span>설립일
            </label>
            <div className={`signupformCon-input-group ${errors.foundedAt ? "error" : ""}`}>
              <input
                type="date"
                name="foundedAt"
                className="signupformCon-input-text"
                value={formData.foundedAt}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 담당자 */}
          <div className="signupformCon-group">
            <label><span className="signupformCon-required">*</span>담당자 성함</label>
            <div className={`signupformCon-input-group ${errors.manager ? "error" : ""}`}>
              <input
                type="text"
                name="manager"
                placeholder="담당자 성함을 입력해주세요"
                className="signupformCon-input-text"
                value={formData.manager}
                onChange={handleChange}
              />
            </div>
            {errors.manager && <p className="error-message">{errors.manager}</p>}
          </div>

          {/* 이메일 */}
          <div className="signupformCon-group">
            <label><span className="signupformCon-required">*</span>이메일</label>
            <div className={`signupformCon-input-group ${errors.email ? "error" : ""}`}>
              <input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요"
                className="signupformCon-input-text"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="signupformCon-email-domain">@</span>
              <select
                className="signupformCon-domain-select"
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
                  className="signupformCon-custom-domain-input"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              )}
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* 비밀번호 */}
          <div className="signupformCon-group">
            <label><span className="signupformCon-required">*</span>비밀번호</label>
            <div className={`signupformCon-input-group ${errors.password ? "error" : ""}`}>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="비밀번호를 입력해주세요"
                className="signupformCon-input-text"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="signupformCon-icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <button type="submit" className="signupformCon-submit-button">
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
