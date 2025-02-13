/*
const handleSubmit = async (e) => {
  e.preventDefault();

  // 필수 입력값 체크
  if (!eventName || !organizer || !entryFee || !website || !registrationSite) {
    setError(true);
    return;
  }
  setError(false);

  // API 요청 데이터 구성
  const eventData = {
    name: eventName,
    imageUrl: image || "",  // 이미지 URL (업로드 필요 시 별도 처리)
    organizer: organizer,
    eventType: eventCategory,
    region: eventLocation,
    eventStartAt: startDate,  // 날짜 포맷 주의
    eventEndAt: endDate,
    fee: Number(entryFee),  // 숫자로 변환
    officialUrl: website,
    joinUrl: registrationSite,
    description: eventDescription,
    offline: eventMode === "offline",  // 오프라인 여부 (Boolean)
  };

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${yourAuthToken}`,  // ✅ 토큰 필요
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("서버 응답 실패");
    }

    const result = await response.json();
    console.log("등록 성공:", result);
    alert("행사가 성공적으로 등록되었습니다!");
  } catch (error) {
    console.error("등록 실패:", error);
    alert("행사 등록 중 오류가 발생했습니다.");
  }
};

*/
import React, { useState } from "react";
import "../css/Register.css";

export default function EventForm() {
  const [eventName, setEventName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventCategory, setEventCategory] = useState("사회문화");
  const [eventLocation, setEventLocation] = useState("부산");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [website, setWebsite] = useState("");  // ✅ 공식 웹사이트 필수 입력
  const [registrationSite, setRegistrationSite] = useState("");  // ✅ 신청 사이트 필수 입력
  const [eventDescription, setEventDescription] = useState("");
  const [eventMode, setEventMode] = useState("online");  // ✅ 라디오 버튼으로 선택 (기본값: 온라인)
  const [image, setImage] = useState(null);  // ✅ 이미지 상태 추가
  const [error, setError] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventName || !organizer || !entryFee || !website || !registrationSite) {
      setError(true);
      return;
    }
    setError(false);
    alert("행사가 등록되었습니다!");
  };

  return (
    <div className="eventform-container">

      <h2 className="conference-header">학술 행사 등록</h2>

      <div className="eventform-content">
        <div className="eventform-left">
          <div className="image-upload-box">
            <label htmlFor="imageUpload">
              {image ? (
                <img src={image} alt="행사 이미지" className="uploaded-image" />
              ) : (
                <>
                  <span className="image-placeholder">+</span>
                  <p>행사 이미지를 등록해주세요</p>
                </>
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </div>
          <p className="eventform-note">*는 필수 정보입니다.</p>
        </div>

        <div className="eventform-right">
          <form onSubmit={handleSubmit}>
            <h2 className="section-title">기본정보</h2>

            <div className="eventform-group">
              <label>* 행사명</label>
              <input
                type="text"
                placeholder="학회명을 입력해주세요"
                className="eventform-input"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="eventform-group">
              <label>* 개최기관</label>
              <input
                type="text"
                placeholder="개최기관명을 입력해주세요"
                className="eventform-input"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
              />
            </div>

            <div className="eventform-group">
              <label>* 행사 분야</label>
              <select
                className="eventform-select"
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
              >
                {["디자인", "기계 공학", "전자 공학", "생명 과학", "화학", "물리", "경제학", "경영학","사회학","심리학", "법학","의학", "건축학"].map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="eventform-group">
              <label>* 개최 지역</label>
              <select
                className="eventform-select"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              >
                {["서울", "부산", "대구", "인천",
                  "광주", "대전", "울산", "세종",
                  "경기", "강원", "충북", "충남",
                  "전북", "전남", "경북", "경남", "제주"
                ].map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="eventform-group">
              <label>* 개최 날짜</label>
              <div className="eventform-date-group">
                <input
                  type="date"
                  className="eventform-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span> - </span>
                <input
                  type="date"
                  className="eventform-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="eventform-group">
              <label>* 온/오프라인</label>
              <div className="eventform-radio-group">
                <label>
                  <input
                    type="radio"
                    name="eventMode"
                    value="online"
                    checked={eventMode === "online"}
                    onChange={(e) => setEventMode(e.target.value)}
                  />
                  온라인
                </label>
                <label>
                  <input
                    type="radio"
                    name="eventMode"
                    value="offline"
                    checked={eventMode === "offline"}
                    onChange={(e) => setEventMode(e.target.value)}
                  />
                  오프라인
                </label>
              </div>
            </div>

            <h2 className="section-title">참가 및 지원</h2>

            <div className="eventform-group">
              <label>* 참가비</label>
              <div className="eventform-input-group">
                <input
                  type="text"
                  placeholder="참가비 입력"
                  className="eventform-input"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="eventform-group">
              <label>* 공식 웹사이트</label>
              <input
                type="text"
                placeholder="URL 주소를 입력해주세요"
                className="eventform-input"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="eventform-group">
              <label>* 신청 사이트</label>
              <input
                type="text"
                placeholder="URL 주소를 입력해주세요"
                className="eventform-input"
                value={registrationSite}
                onChange={(e) => setRegistrationSite(e.target.value)}
              />
            </div>

            <h2 className="section-title">추가정보</h2>

            <div className="eventform-group">
              <label>행사 소개</label>
              <textarea
                placeholder="행사에 대한 소개를 입력해주세요"
                className="eventform-textarea"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="eventform-submit-button">
              등록하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
