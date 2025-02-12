import React, { useState } from "react";
import "../css/SignupForm.css";

export default function SignupForm() {
  const [userType, setUserType] = useState("개인");

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

      {/* 오른쪽 입력 폼 영역 */}
      <div className="form-right">
        <form>
          {/* 회원 구분 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>회원 구분
            </label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="개인"
                  checked={userType === "개인"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                개인
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="학회"
                  checked={userType === "학회"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                학회
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="기업"
                  checked={userType === "기업"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                기업
              </label>
            </div>
          </div>

          {/* 아이디 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>아이디
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                className="input-text"
              />
              <span className="email-domain">@naver.com</span>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="input-text"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group">
            <label>
              <span className="required">*</span>비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="input-text"
            />
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
