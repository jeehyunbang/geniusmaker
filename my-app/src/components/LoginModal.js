import React from "react";
import "../css/LoginModal.css";

const LoginModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return (
    <div className="custom-modal-overlay" onClick={toggleModal}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>로그인</h2>
        <form>
          <div className="custom-input-container">
            <input
              type="email"
              placeholder="✉️ 이메일을 입력해주세요"
              className="custom-modal-input"
            />
          </div>
          <div className="custom-input-container">
            <input
              type="password"
              placeholder="🔒 비밀번호를 입력해주세요"
              className="custom-modal-input"
            />
          </div>
          <button type="submit" className="custom-login-button">로그인</button>
        </form>
        <div className="custom-extra-links">
          <a href="#signup" className="custom-left-link">회원가입</a>
          <div className="custom-right-links">
            <a href="#find-password">비밀번호 찾기</a>
          </div>
        </div>
        <div className="custom-social-login">
          <p className="custom-social-title">소셜 로그인</p>
          <div className="custom-social-icons">
            <div className="custom-social-icon">카카오톡</div>
            <div className="custom-social-icon">네이버</div>
            <div className="custom-social-icon">구글</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
