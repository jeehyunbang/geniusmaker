import React, { useState, useEffect } from "react";
import "../css/Home.css";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("학회정보");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null); // 사용자 상태 관리

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loginToken"); // JWT 토큰 삭제
    setUser(null); // 사용자 상태 초기화
  };

  useEffect(() => {
    // JWT 토큰으로 사용자 정보 조회
    const token = localStorage.getItem("loginToken");
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch("http://43.200.115.60/api/members/my-info", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            setUser(result.data); // 사용자 정보 설정
          } else {
            console.error("사용자 정보 조회 실패:", response.statusText);
          }
        } catch (error) {
          console.error("사용자 정보 조회 중 오류 발생:", error);
        }
      };

      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          selected === "학회정보"
            ? "http://43.200.115.60/api/conference/search"
            : "http://43.200.115.60/api/events/search";

        const response = await fetch(endpoint);
        if (response.ok) {
          const result = await response.json();
          const items = selected === "학회정보" ? result.data.conferences : result.data.events;
          setData(items || []);
        } else {
          console.error("API 호출 실패:", response.statusText);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [selected]);

  const handleCardClick = (id) => {
    navigate(selected === "학회정보" ? `/conferences/${id}` : `/events/${id}`);
  };

  return (
    <div className="home-content">
      <div className="top-container">
        <div className="gray-box L"></div>
      </div>

      <div className="login-section">
        {user ? (
          <div className="welcome-message">
            <p>
              안녕하세요, <span className="highlight">{user.name}</span>님! ({user.email})
            </p>
            <button className="logout-button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <p className="login-tooltip">
              로그인 후 상세정보 조회가 가능해요{" "}
              <span className="tooltip-icon">💬</span>
            </p>
            <button className="login-button" onClick={handleOpenModal}>
              로그인
            </button>
          </>
        )}
      </div>

      <LoginModal
        isOpen={isModalOpen}
        toggleModal={handleCloseModal}
        setUser={setUser}
      />

      <div className="info-section">
        <p className="info-text">
          {user
            ? `${user.name}님, 이 ${selected}는 어때요?`
            : `사용자님, 이 ${selected}는 어때요?`}
        </p>
        <div className="button-group">
          <button
            className={`conference-button ${
              selected === "학회정보" ? "active" : ""
            }`}
            onClick={() => setSelected("학회정보")}
          >
            학회정보
          </button>
          <button
            className={`event-button ${
              selected === "학술행사" ? "active" : ""
            }`}
            onClick={() => setSelected("학술행사")}
          >
            학술행사
          </button>
        </div>
      </div>

      <div className="grid-container">
        {data.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="data-box"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="data-top">
              <span className="data-category">{item.eventType || item.category}</span>
              <img
                src={item.imageUrl || item.thumbnail}
                alt={item.name || item.conferenceName}
                className="data-logo"
              />
            </div>
            <div className="data-bottom">
              <h3 className="data-title">{item.name || item.conferenceName}</h3>
              <p className="data-location">
                <span className="data-icon">📌</span>{" "}
                {item.region || item.organizationLocation}
              </p>
            </div>
          </div>
        ))}
      </div>



      <div className="popular-section">
        <div className="popular-text">
          <h3>
            오늘의 인기
            <br />
            학회&학술행사
            <br />
            정보예요 👀
          </h3>
        </div>
        <div className="popular-box gray-box"></div>
      </div>
    </div>
  );
}

export default Home;
