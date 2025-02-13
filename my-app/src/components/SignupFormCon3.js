import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignupFormCon3.css";
import ConferenceContext from "../context/ConferenceContext";

export default function SignupFormCon3() {
  const { conferenceData, setConferenceData } = useContext(ConferenceContext);
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(conferenceData.imageUrl || "");
  const [description, setDescription] = useState(conferenceData.description || "");
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setThumbnail(imageUrl);
      setErrors((prev) => ({ ...prev, thumbnail: null })); // 에러 초기화
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!thumbnail) newErrors.thumbnail = "썸네일 이미지를 업로드해주세요.";
    if (!description.trim()) newErrors.description = "학회 소개를 입력해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrevious = () => {
    navigate("/signup-con2");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!document.getElementById("imageUpload").files[0]) {
      setErrors((prev) => ({ ...prev, thumbnail: "썸네일 이미지를 업로드해주세요." }));
      return;
    }
  
    try {
      // 1. 이미지 파일 업로드
      const formData = new FormData();
      formData.append("images", document.getElementById("imageUpload").files[0]); // S3 업로드에 필요한 'images' 필드로 파일 추가
  
      const uploadResponse = await fetch("http://43.200.115.60/api/s3/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("이미지 업로드 실패");
      }
  
      const uploadResult = await uploadResponse.json();
      console.log("S3 업로드 결과:", uploadResult);
      const imageUrl = uploadResult.data.imageUrls[0]; // S3에서 반환된 이미지 URL 사용
  
      // 2. 나머지 데이터와 함께 전송
      const formattedFoundedAt = `${conferenceData.foundedAt}T00:00:00`;
  
      const finalData = {
        ...conferenceData,
        foundedAt: formattedFoundedAt,
        imageUrl, // 업로드된 S3 URL
        description,
      };
  
      const response = await fetch("http://43.200.115.60/api/members/conference-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message || "학회 신청이 완료되었습니다!");
        navigate("/"); // 홈으로 이동
      } else {
        const errorData = await response.json();
        console.error("오류 발생:", errorData);
        alert(errorData.message || "학회 신청에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("서버와의 연결 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  
  

  return (
    <div className="signupformCon3-container">
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
                setErrors((prev) => ({ ...prev, description: null })); // 에러 초기화
              }}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          {/* 버튼 그룹 */}
          <div className="signupformCon3-button-group">
            <button
              type="button"
              className="signupformCon3-previous-button"
              onClick={handlePrevious}
            >
              이전
            </button>
            <button type="submit" className="signupformCon3-next-button">
              신청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}