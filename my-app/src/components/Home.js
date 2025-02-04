import React, { useState } from 'react';
import '../css/Home.css';

function Home() {
  const [selected, setSelected] = useState('학회정보'); // 초기 상태는 '학회정보'

  const handleButtonClick = (type) => {
    setSelected(type); // 버튼 클릭 시 상태 변경
  };

  return (
    <div className="home-content">
      {/* 상단 두 개 박스 */}
      <div className="top-container">
        <div className="gray-box L"></div>
        <div className="gray-box S"></div>
      </div>

      {/* 글귀와 버튼 */}
      <div className="info-section">
        <p className="info-text">
          린님, 이 <span className="highlight">{selected}</span>는 어때요?
        </p>
        <div className="button-group">
          <button
            className={`conference-button ${selected === '학회정보' ? 'active' : ''}`}
            onClick={() => handleButtonClick('학회정보')}
          >
            학회정보
          </button>
          <button
            className={`event-button ${selected === '학술행사' ? 'active' : ''}`}
            onClick={() => handleButtonClick('학술행사')}
          >
            학술행사
          </button>
        </div>
      </div>

      {/* 네 개 박스 */}
      <div className="grid-container">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="gray-box small">
            <div className="top-part"></div>
            <div className="bottom-part"></div>
          </div>
        ))}
      </div>

      {/* 오늘의 인기 학회&학술행사 섹션 */}
      <div className="popular-section">
        <div className="popular-text">
          <h3>오늘의 인기<br />학회&학술행사<br />정보예요 👀</h3>
          <button className="more-button">더보러가기 &gt;</button>
        </div>
        <div className="popular-box gray-box"></div>
      </div>

      {/* 프로모션 박스 */}
      <div className="promotion-section">
        <div className="promotion-box gray-box">
          <p className="promotion-text">프로모션</p>
        </div>
        <div className="promotion-box gray-box"></div>
      </div>
    </div>
  );
}

export default Home;
