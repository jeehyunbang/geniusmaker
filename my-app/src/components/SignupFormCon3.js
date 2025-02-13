import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignupFormCon3.css";

export default function SignupFormCon3() {
  const navigate = useNavigate();

  // 상태 관리
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, thumbnail: false })); // 에러 초기화
    }
  };

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    
    if (!thumbnail) newErrors.thumbnail = "썸네일 이미지를 업로드해주세요.";
    if (!description.trim()) newErrors.description = "학회 소개를 입력해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 이전 버튼 클릭 시
  const handlePrevious = () => {
    navigate("/signup-con2");
  };

  // 신청하기 버튼 클릭 시
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("학회 신청이 완료되었습니다!");
      navigate("/"); // 홈으로 이동
    } else {
      alert("모든 필수 정보를 입력해주세요!");
    }
  };

  return (
    <div className="signupformCon3-container">
      {/* 왼쪽 설명 영역 */}
      <div className="signupformCon3-left">
        <h1 className="signupformCon3-title">회원가입</h1>
        <p className="signupformCon3-subtitle">
          학회 정보를 입력해주세요
          <br />
          <span className="signupformCon3-note">
            <span className="signupformCon3-required">*</span> 필수 정보를 입력해야 회원가입이 가능해요
          </span>
        </p>
      </div>

      {/* 오른쪽 입력 폼 영역 */}
      <div className="signupformCon3-right">
        <form onSubmit={handleSubmit}>
          {/* 썸네일 이미지 */}
          <div className="signupformCon3-group">
            <label className="signupformCon3-required">* 썸네일 이미지</label>
            <div className={`image-upload-box ${errors.thumbnail ? "error" : ""}`}>
              <label htmlFor="imageUpload">
                {thumbnail ? (
                  <img src={thumbnail} alt="썸네일 미리보기" className="uploaded-image" />
                ) : (
                  <>
                    <span className="image-placeholder">📷</span>
                    <p>행사 이미지를 등록해주세요</p>
                  </>
                )}
              </label>
              <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} hidden />
            </div>
            {errors.thumbnail && <p className="error-text">{errors.thumbnail}</p>}
          </div>

          {/* 학회 소개 */}
          <div className="signupformCon3-group">
            <label className="signupformCon3-required">* 학회 소개</label>
            <textarea
              placeholder="학회 소개를 입력해주세요"
              className={`signupformCon3-textarea ${errors.description ? "error" : ""}`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: false })); // 에러 초기화
              }}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          {/* 버튼 그룹 */}
          <div className="signupformCon3-button-group">
            {/* ✅ 이전 버튼 */}
            <button type="button" className="signupformCon3-previous-button" onClick={handlePrevious}>
              이전
            </button>

            {/* ✅ 신청하기 버튼 */}
            <button type="submit" className="signupformCon3-next-button">
              신청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
