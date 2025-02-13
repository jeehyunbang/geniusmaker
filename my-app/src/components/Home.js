import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const user = { nickname: '린' };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState('학회정보');
  const [data, setData] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleRegisterClick = () => {
    setIsModalOpen(true);  // 로그인 모달 열기
  };
  
  
  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          selected === "학회정보"
            ? "http://localhost:3000/api/conferences" // 학회 정보 API
            : "http://localhost:3000/api/events"; // 행사 정보 API
        const response = await fetch(endpoint);
        const result = await response.json();

        if (response.ok) {
          setData(result.data); // API 응답 데이터 설정
        } else {
          console.error("API 호출 실패:", result.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [selected]); // selected가 변경될 때마다 API 호출

  const handleCardClick = (id) => {
    navigate(`/conferences/${id}`);
  };

  return (
    <div className="home-content">
      {/* 상단 배경 박스 */}
      <div className="top-container">
        <div className="gray-box L"></div>
      </div>

      <div className="login-section">
        <p className="login-tooltip">
          로그인 후 상세정보 조회가 가능해요 <span className="tooltip-icon">💬</span>
        </p>
        <button className="login-button" onClick={handleRegisterClick}>
          로그인
        </button>
      </div>


      {/* 로그인 모달 */}
      <LoginModal isOpen={isModalOpen} toggleModal={handleCloseModal} />

      {/* 글귀와 버튼 */}
      <div className="info-section">
        <p className="info-text">
          사용자님, 이 <span className="highlight">{selected}</span>는 어때요?
        </p>
        <div className="button-group">
          <button
            className={`conference-button ${selected === '학회정보' ? 'active' : ''}`}
            onClick={() => setSelected('학회정보')}
          >
            학회정보
          </button>
          <button
            className={`event-button ${selected === '학술행사' ? 'active' : ''}`}
            onClick={() => setSelected('학술행사')}
          >
            학술행사
          </button>
        </div>
      </div>

      {/* 여러 개의 학회/학술 행사 정보 표시 */}
      <div className="grid-container">
        {data.map((item) => (
          <div
            key={item.id}
            className="data-box"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="data-top">
              <span className="data-category">{item.category}</span>
              <img
                src={
                  selected === "학회정보"
                    ? item.thumbnail
                    : item.event_thumbnail
                }
                alt={
                  selected === "학회정보"
                    ? item.conference_name
                    : item.event_name
                }
                className="data-logo"
              />
            </div>
            <div className="data-bottom">
              <h3 className="data-title">
                {selected === "학회정보"
                  ? item.conference_name
                  : item.event_name}
              </h3>
              <div className="data-info">
                <p>
                  <span className="data-icon">📌</span>{" "}
                  {selected === "학회정보"
                    ? item.organization_location
                    : item.location}
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
