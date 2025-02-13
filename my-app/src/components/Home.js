import React, { useState } from 'react';
import '../css/Home.css';
import LoginModal from './LoginModal';
import { FaSearch } from "react-icons/fa";

function Home() {
  const user = { nickname: '린' };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState('학회정보');

  // 🔹 로그인 모달 열기
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  // 🔹 학회 정보 데이터 (API 형식에 맞춤)
  const conferenceData = [
    {
      id: 1,
      thumbnail: "https://example.com/event1_thumbnail.jpg",
      conference_name: "치킨",
      organization_location: "대구",
      category: "디자인",
    },
    {
      id: 2,
      thumbnail: "https://example.com/event2_thumbnail.jpg",
      conference_name: "AI 학회",
      organization_location: "서울",
      category: "기술",
    },
    {
      id: 3,
      thumbnail: "https://example.com/event3_thumbnail.jpg",
      conference_name: "의료 기술 포럼",
      organization_location: "부산",
      category: "의학",
    },
    {
      id: 4,
      thumbnail: "https://example.com/event4_thumbnail.jpg",
      conference_name: "건축 디자인 학회",
      organization_location: "광주",
      category: "건축",
    }
  ];

  // 🔹 학술 행사 데이터 (API 형식에 맞춤)
  const eventData = [
    {
      id: 1,
      event_name: "AI Technology Conference 2025",
      event_thumbnail: "https://example.com/event1_thumbnail.jpg",
      location: "Seoul, South Korea",
      category: "Technology",
      is_online: false,
    },
    {
      id: 2,
      event_name: "블록체인 포럼 2025",
      event_thumbnail: "https://example.com/event2_thumbnail.jpg",
      location: "부산, South Korea",
      category: "Blockchain",
      is_online: true,
    },
    {
      id: 3,
      event_name: "환경 지속가능성 컨퍼런스",
      event_thumbnail: "https://example.com/event3_thumbnail.jpg",
      location: "대전, South Korea",
      category: "Environment",
      is_online: false,
    },
    {
      id: 4,
      event_name: "미래 모빌리티서밋",
      event_thumbnail: "https://example.com/event4_thumbnail.jpg",
      location: "인천, South Korea",
      category: "Mobility",
      is_online: true,
    }
  ];

  // 🔹 선택된 데이터 표시 (학회정보 또는 학술행사)
  const data = selected === "학회정보" ? conferenceData : eventData;

  return (
    <div className="home-content">
      {/* 상단 배경 박스 */}
      <div className="top-container">
        <div className="gray-box L"></div>
      </div>

      {/* 검색창 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="정보를 입력해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button">
          <FaSearch />
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
          <div key={item.id} className="data-box">
            <div className="data-top">
              <span className="data-category">{item.category}</span>
              <img 
                src={selected === "학회정보" ? item.thumbnail : item.event_thumbnail} 
                alt={`${selected === "학회정보" ? item.conference_name : item.event_name} 로고`} 
                className="data-logo" 
              />
            </div>
            <div className="data-bottom">
              <h3 className="data-title">
                {selected === "학회정보" ? item.conference_name : item.event_name}
              </h3>
              <div className="data-info">
                <p>
                  <span className="data-icon">📌</span> {selected === "학회정보" ? item.organization_location : item.location}
                </p>
                {selected === "학술행사" && (
                  <p>
                    <span className="data-icon">💻</span> {item.is_online ? "온라인" : "오프라인"}
                  </p>
                )}
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
