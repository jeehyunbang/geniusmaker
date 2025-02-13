import React, { useState } from "react";
import "../css/LoginModal.css";

const LoginModal = ({ isOpen, toggleModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // 에러 메시지 초기화

    try {
      const response = await fetch("http://43.200.115.60/api/members/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("로그인 성공:", data);
        alert(data.message); // 성공 메시지 출력
        toggleModal(); // 모달 닫기
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "로그인 실패"); // 에러 메시지 설정
      }
    } catch (error) {
      console.error("로그인 요청 에러:", error);
      setErrorMessage("네트워크 에러가 발생했습니다.");
    }
  };

  return (
    <div className="custom-modal-overlay" onClick={toggleModal}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="custom-input-container">
            <input
              type="email"
              placeholder="✉️ 이메일을 입력해주세요"
              className="custom-modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="custom-input-container">
            <input
              type="password"
              placeholder="🔒 비밀번호를 입력해주세요"
              className="custom-modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="custom-login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
