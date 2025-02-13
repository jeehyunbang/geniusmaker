import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router에서 페이지 이동을 위한 훅
import "../css/SignupForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [customDomain, setCustomDomain] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    interestResearch: "공학", // 기본값
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일 완성
    const completeEmail = `${formData.email}@${emailDomain || customDomain}`;

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // API 호출
    try {
      console.log("Sending data to API:", {
        email: completeEmail,
        password: formData.password,
        name: formData.name,
        team: "default",
        interestResearch: formData.interestResearch,
      });

      const response = await fetch("http://43.200.115.60/api/members/private-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: completeEmail,
          password: formData.password,
          name: formData.name,
          team: "default",
          interestResearch: formData.interestResearch,
        }),
      });

      // 응답 처리
      const result = await response.json();

      if (response.ok) {
        console.log("API response data:", result);
        setSuccessMessage(result.message || "회원가입에 성공했습니다!");
        setErrorMessage("");

        // 성공 후 입력 필드 초기화
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          interestResearch: "공학",
        });
        setEmailDomain("naver.com");
        setCustomDomain("");

        // 1초 후 메인 페이지로 이동
        setTimeout(() => {
          navigate("/"); // React Router를 사용하는 경우
        }, 1000);
      } else {
        console.error("API Error:", result);
        setErrorMessage(result.message || "회원가입에 실패했습니다.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setErrorMessage("네트워크 오류 또는 서버와의 연결 문제입니다.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="signupform-container">
      <div className="signupform-left">
        <h1 className="signupform-title">회원가입</h1>
        <p className="signupform-subtitle">
          고객님의 회원정보를 입력해주세요
          <br />
          <span className="signupform-note">
            <span className="signupform-required">*</span> 필수 정보를 입력해야
            회원가입이 가능해요
          </span>
        </p>
      </div>

      <div className="signupform-right">
        <form onSubmit={handleSubmit}>
          {/* 이름 */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>이름
            </label>
            <div className="signupform-input-group">
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                className="signupform-input-text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>이메일
            </label>
            <div className="signupform-input-group">
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                className="signupform-input-text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                  required
                />
              )}
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>비밀번호
            </label>
            <div className="signupform-input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="signupform-input-text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="signupform-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>비밀번호 확인
            </label>
            <div className="signupform-input-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                className="signupform-input-text"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="signupform-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* 분야 */}
          <div className="signupform-group">
            <label>
              <span className="signupform-required">*</span>분야
            </label>
            <div className="signupform-input-group">
              <select
                className="signupform2-domain-select"
                name="interestResearch"
                value={formData.interestResearch}
                onChange={handleChange}
              >
                <option value="공학">공학</option>
                <option value="디자인">디자인</option>
                <option value="경제">경제</option>
                <option value="과학">과학</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>

          {/* 에러 메시지 */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* 성공 메시지 */}
          {successMessage && <p className="success-message">{successMessage}</p>}

          {/* 가입하기 버튼 */}
          <button type="submit" className="signupform-submit-button">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
