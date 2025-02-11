import React, { useState } from 'react';
import '../css/Home.css';
import LoginModal from './LoginModal'; // LoginModal 컴포넌트 추가

function Home() {
  const user = { nickname: '린' };
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [selected, setSelected] = useState('학회정보'); // 초기 상태는 '학회정보'

  const handleButtonClick = (type) => {
    setSelected(type);
  };

  const [data] = useState([
    {
      id: 1,
      category: '디자인',
      logo: 'https://design-science.or.kr/media?key=designScience/homepage/logo/f7f69e79-435c-4a0d-8546-d17e70fed59a.png',
      title: '한국디자인학회',
      location: '성남시',
      type: '오프라인',
    },
    {
      id: 2,
      category: '디자인',
      logo: 'https://design-science.or.kr/media?key=designScience/homepage/logo/f7f69e79-435c-4a0d-8546-d17e70fed59a.png',
      title: '한국디자인학회',
      location: '성남시',
      type: '오프라인',
    },
    {
      id: 3,
      category: '디자인',
      logo: 'https://design-science.or.kr/media?key=designScience/homepage/logo/f7f69e79-435c-4a0d-8546-d17e70fed59a.png',
      title: '한국디자인학회',
      location: '성남시',
      type: '오프라인',
    },
    {
      id: 4,
      category: '디자인',
      logo: 'https://design-science.or.kr/media?key=designScience/homepage/logo/f7f69e79-435c-4a0d-8546-d17e70fed59a.png',
      title: '한국디자인학회',
      location: '성남시',
      type: '오프라인',
    },
  ]);

  return (
    <div className="home-content">
      {/* 상단 두 개 박스 */}
      <div className="top-container">
        <div className="gray-box L"></div>
      </div>

      {/* 로그인 섹션 */}
      <div className="login-section">
        <p className="login-tooltip">
          로그인 후 상세정보 조회가 가능해요<span className="tooltip-icon">💬</span>
        </p>
        <button className="login-button" onClick={handleOpenModal}>
          로그인
        </button>
      </div>

      {/* 로그인 모달 */}
      <LoginModal isOpen={isModalOpen} toggleModal={handleCloseModal} />

      {/* 글귀와 버튼 */}
      <div className="info-section">
        <p className="info-text">
          {user.nickname}님, 이 <span className="highlight">{selected}</span>는 어때요?
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
        {data.map((item) => (
          <div key={item.id} className="data-box">
            <div className="data-top">
              <span className="data-category">{item.category}</span>
              <img src={item.logo} alt={`${item.title} 로고`} className="data-logo" />
            </div>
            <div className="data-bottom">
              <h3 className="data-title">{item.title}</h3>
              <div className="data-info">
                <p>
                  <span className="data-icon">📌</span> {item.location}
                </p>
                <p>
                  <span className="data-icon">👥</span> {item.type}
                </p>
              </div>
            </div>
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
