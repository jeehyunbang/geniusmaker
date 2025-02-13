/*import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Select.css";

export default function RoundedBox() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToConferenceSignup = () => {
    navigate("/conference-signup");
  };

  return (
    <div className="container">
      <div className="box" onClick={goToSignup}>
        <span>개인</span>
      </div>
      <div className="box" onClick={goToConferenceSignup}>
        <span>학회</span>
      </div>
    </div>
  );
}
```
*/
import React from "react";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅 사용
import "../css/Select.css"; // Select 전용 CSS 파일

export default function Select() {
  const navigate = useNavigate(); // navigate 함수 생성

  const handleNavigation = (path) => {
    navigate(path); // 지정된 경로로 이동
  };

  return (
    <div className="select-container">
      {/* 왼쪽 설명 영역 */}
      <div className="select-left">
        <h1 className="select-title">회원가입</h1>
        <p className="select-subtitle">
          고객님의 회원유형을 선택해주세요
          <br />
          <span className="select-note">
            <span className="select-required">*</span> 선택 후 계속 진행할 수 있습니다.
          </span>
        </p>
      </div>

      {/* 오른쪽 선택 영역 */}
      <div className="select-right">
        <button
          className="select-button"
          onClick={() => handleNavigation("/signup")} // 개인 경로로 이동
        >
          개인
        </button>
        <button
          className="select-button"
          onClick={() => handleNavigation("/signup-con")} // 학회 경로로 이동
        >
          학회
        </button>
      </div>
    </div>
  );
}
