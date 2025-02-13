import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignupFormCon2.css";
import ConferenceContext from "../context/ConferenceContext";

export default function SignupFormCon2() {
  const { conferenceData, setConferenceData } = useContext(ConferenceContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    researchType: conferenceData.researchType || "",
    conferenceAddress: conferenceData.conferenceAddress || "",
    joinFee: conferenceData.joinFee || "",
    officialUrl: conferenceData.officialUrl || "",
    socialMediaUrl: conferenceData.socialMediaUrl || "",
  });

  const [discussionSubmit, setDiscussionSubmit] = useState(
    conferenceData.discussionSubmit || ""
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.researchType) newErrors.researchType = "연구 분야를 선택해주세요.";
    if (!formData.conferenceAddress)
      newErrors.conferenceAddress = "주소를 입력해주세요.";
    if (!formData.officialUrl) newErrors.officialUrl = "공식 웹사이트를 입력해주세요.";
    
    // discussionSubmit이 null 또는 undefined일 때만 에러로 처리
    if (discussionSubmit === null || discussionSubmit === undefined)
      newErrors.discussionSubmit = "논문 제출 가능 여부를 선택해주세요.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };
  

  const handleNext = (e) => {
    e.preventDefault();
  
    // "가능"은 true, "불가능"은 false로 변환
    const booleanDiscussionSubmit = discussionSubmit === "가능";
  
    if (validateForm()) {
      setConferenceData({ 
        ...conferenceData, 
        ...formData, 
        discussionSubmit: booleanDiscussionSubmit 
      });
      navigate("/signup-con3");
    } else {
      alert("모든 필수 정보를 입력해주세요!");
    }
  };
  

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
            <label>
              <span className="signupformCon2-required">*</span>연구 분야
            </label>
            <div className="signupformCon2-input-group">
              <select
                name="researchType"
                className="signupformCon2-input-text"
                value={formData.researchType}
                onChange={handleChange}
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
            {errors.researchType && (
              <p className="error-message">{errors.researchType}</p>
            )}
          </div>

          {/* 주소 */}
          <div className="signupformCon2-group">
            <label>
              <span className="signupformCon2-required">*</span>주소
            </label>
            <div className="signupformCon2-input-group">
              <input
                type="text"
                name="conferenceAddress"
                placeholder="주소를 입력해주세요"
                className="signupformCon2-input-text"
                value={formData.conferenceAddress}
                onChange={handleChange}
              />
            </div>
            {errors.conferenceAddress && (
              <p className="error-message">{errors.conferenceAddress}</p>
            )}
          </div>

          {/* 학회 참가비 */}
          <div className="signupformCon2-group">
            <label>학회 참가비</label>
            <div className="signupformCon2-input-group">
              <input
                type="number"
                name="joinFee"
                placeholder="학회 참가비를 입력해주세요"
                className="signupformCon2-input-text"
                min="0"
                value={formData.joinFee}
                onChange={handleChange}
              />
              <span className="signupformCon2-fixed-label">원</span>
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
                name="officialUrl"
                placeholder="URL 주소를 입력해주세요"
                className="signupformCon2-input-text"
                value={formData.officialUrl}
                onChange={handleChange}
              />
            </div>
            {errors.officialUrl && (
              <p className="error-message">{errors.officialUrl}</p>
            )}
          </div>

          {/* SNS */}
          <div className="signupformCon2-group">
            <label>SNS</label>
            <div className="signupformCon2-input-group">
              <input
                type="text"
                name="socialMediaUrl"
                placeholder="SNS URL을 입력해주세요"
                className="signupformCon2-input-text"
                value={formData.socialMediaUrl}
                onChange={handleChange}
              />
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
                  value="true"
                  checked={discussionSubmit === true}
                  onChange={() => setDiscussionSubmit(true)} // Boolean 값을 설정
                />
                가능
              </label>
              <label>
                <input
                  type="radio"
                  name="discussionSubmit"
                  value="false"
                  checked={discussionSubmit === false}
                  onChange={() => setDiscussionSubmit(false)} // Boolean 값을 설정
                />
                불가능
              </label>
            </div>
            {errors.discussionSubmit && (
              <p className="error-message">{errors.discussionSubmit}</p>
            )}
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