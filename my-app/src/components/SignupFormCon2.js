import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignupFormCon2.css";

export default function SignupFormCon2() {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState("무료");

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/signupformCon3"); // 다음 페이지로 이동
  };

  const handlePrevious = () => {
    navigate("/signup-con"); // 이전 페이지로 이동
  };

  return (
    <div className="signupformCon2-container">
      <div className="signupformCon2-left">
        <h1 className="signupformCon2-title">회원가입</h1>
        <p className="signupformCon2-subtitle">
          학회 정보를 입력해주세요
          <br />
          <span className="signupformCon2-note">
            <span className="signupformCon2-required">*</span> 필수 정보를 입력해야 회원가입이 가능해요
          </span>
        </p>
      </div>

      <div className="signupformCon2-right">
        <form onSubmit={handleNext}>
          {/* 발행 논문 수 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>발행 논문 수
            </label>
            <div className="signupformCon2-input-group">
              <input
                type="number"
                placeholder="발행 논문 수를 입력해주세요"
                className="signupformCon2-input-text"
                min="0"
              />
              <span className="signupformCon2-fixed-label">편</span>
            </div>
          </div>

          {/* 학회 설립일 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>학회 설립일
            </label>
            <div className="signupformCon2-input-group">
              <input
                type="date"
                className="signupformCon2-input-text"
              />
            </div>
          </div>

          {/* 학회 참가비 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>학회 참가비
            </label>
            <div className="signupformCon2-input-group">
              <input
                type="number"
                placeholder="학회 참가비를 입력해주세요"
                className="signupformCon2-input-text"
                min="0"
              />
              <span className="signupformCon2-fixed-label">원</span>
            </div>
          </div>

          {/* 논문 개제 비용 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>논문 개제 비용
            </label>
            <div className="signupformCon2-radio-group">
              <label>
                <input
                  type="radio"
                  name="isPaid"
                  value="무료"
                  checked={isPaid === "무료"}
                  onChange={(e) => setIsPaid(e.target.value)}
                />
                무료
              </label>
              <label>
                <input
                  type="radio"
                  name="isPaid"
                  value="유료"
                  checked={isPaid === "유료"}
                  onChange={(e) => setIsPaid(e.target.value)}
                />
                유료
              </label>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="signupformCon2-button-group">
            <button
              type="button"
              className="signupformCon2-previous-button"
              onClick={handlePrevious}
            >
              이전
            </button>
            <button type="submit" className="signupformCon2-next-button">
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
