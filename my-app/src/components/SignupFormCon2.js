import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignupFormCon2.css";

export default function SignupFormCon2() {
  const navigate = useNavigate();

  // formData 상태 추가
  const [formData, setFormData] = useState({
    researchType: "",
    address: "",
    conferenceFee: "",
    officialWebsite: "",
    sns: "",
  });

  // 논문 제출 가능 여부 상태 추가
  const [discussionSubmit, setDiscussionSubmit] = useState("");

  // 입력 변경 핸들러 추가
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 다음 단계로 이동
  const handleNext = (e) => {
    e.preventDefault();
    navigate("/signupformCon3");
  };

  // 이전 단계로 이동
  const handlePrevious = () => {
    navigate("/signup-con");
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
          {/* 연구 분야 */}
          <div className="signupformCon2-group">
            <label><span className="signupformCon2-required">*</span>연구 분야</label>
            <select
              name="researchType"
              className="signupformCon2-input-select"
              value={formData.researchType}
              onChange={handleChange}
              required
            >
              <option value="">연구 분야를 선택해주세요</option>
              <option value="컴퓨터 공학">컴퓨터 공학</option>
              <option value="디자인">디자인</option>
              <option value="기계 공학">기계 공학</option>
              <option value="전자 공학">전자 공학</option>
              <option value="생명 과학">생명 과학</option>
              <option value="화학">화학</option>
              <option value="물리">물리</option>
              <option value="경제학">경제학</option>
              <option value="경영학">경영학</option>
              <option value="사회학">사회학</option>
              <option value="심리학">심리학</option>
              <option value="법학">법학</option>
              <option value="의학">의학</option>
              <option value="건축학">건축학</option>
            </select>
          </div>

          {/* 주소 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>주소
            </label>
            <div className="signupformCon2-input-group">
              <input
                type="text"
                name="address"
                placeholder="주소를 입력해주세요"
                className="signupformCon2-input-text"
                value={formData.address}
                onChange={handleChange}
                required
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
                name="conferenceFee"
                placeholder="학회 참가비를 입력해주세요"
                className="signupformCon2-input-text"
                min="0"
                value={formData.conferenceFee}
                onChange={handleChange}
                required
              />
              <span className="signupformCon2-fixed-label">원</span>
            </div>
          </div>

          {/* 논문 제출 가능 여부 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>논문 제출 가능 여부
            </label>
            <div className="signupformCon2-radio-group">
              <label>
                <input
                  type="radio"
                  name="discussionSubmit"
                  value="가능"
                  checked={discussionSubmit === "가능"}
                  onChange={(e) => setDiscussionSubmit(e.target.value)}
                />
                가능
              </label>
              <label>
                <input
                  type="radio"
                  name="discussionSubmit"
                  value="불가능"
                  checked={discussionSubmit === "불가능"}
                  onChange={(e) => setDiscussionSubmit(e.target.value)}
                />
                불가능
              </label>
            </div>
          </div>

          {/* 공식 웹사이트 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>공식 웹사이트
            </label>
            <div className="signupformCon2-input-group">
              <input
                type="text"
                name="officialWebsite"
                placeholder="URL 주소를 입력해주세요"
                className="signupformCon2-input-text"
                value={formData.officialWebsite}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* SNS */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>SNS
            </label>
            <div className="signupformCon2-input-group">
              <input
                type="text"
                name="sns"
                placeholder="SNS URL을 입력해주세요"
                className="signupformCon2-input-text"
                value={formData.sns}
                onChange={handleChange}
                required
              />
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
