import React, { useState, useEffect } from "react";
import "../css/Home.css";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("학회정보");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [eventImages, setEventImages] = useState([]); // 최신 행사 이미지 상태 추가

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
  };

  // ✅ 최신 학술 행사 이미지 API 호출
  useEffect(() => {
    const fetchLatestEventImages = async () => {
      try {
        const response = await fetch("http://43.200.115.60/api/events/expose", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ API 응답 데이터:", result);

        if (result.data?.images?.length > 1) {
          setEventImages(result.data.images.slice(0, 2)); // ✅ 최신 이미지 2개 저장
          console.log("✅ 최신 행사 이미지 가져옴:", result.data.images.slice(0, 2));
        } else {
          console.warn("🚨 최신 행사 이미지 데이터가 부족함");
        }
      } catch (error) {
        console.error("❌ 최신 행사 이미지 가져오는 중 오류 발생:", error);
      }
    };

    fetchLatestEventImages();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/conferences/${id}`);
  };

  return (
    <div className="home-content">
      {/* ✅ 상단 배경 박스에 최신 행사 이미지 적용 */}
      <div className="top-container">
        <div
          className="gray-box L"
          style={{
            backgroundImage: eventImages[0] ? `url(${eventImages[0]})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
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

      <LoginModal isOpen={isModalOpen} toggleModal={handleCloseModal} setUser={setUser} />

      <div className="info-section">
        <p className="info-text">
          {user
            ? `${user.name}님, 이 ${selected}는 어때요?`
            : `사용자님, 이 ${selected}는 어때요?`}
        </p>
        <div className="button-group">
          <button
            className={`conference-button ${selected === "학회정보" ? "active" : ""}`}
            onClick={() => setSelected("학회정보")}
          >
            학회정보
          </button>
          <button
            className={`event-button ${selected === "학술행사" ? "active" : ""}`}
            onClick={() => setSelected("학술행사")}
          >
            학술행사
          </button>
        </div>
      </div>

      <div className="grid-container">
        {data.map((item) => (
          <div key={item.id} className="data-box" onClick={() => handleCardClick(item.id)}>
            <div className="data-top">
              <span className="data-category">{item.category}</span>
              <img
                src={selected === "학회정보" ? item.thumbnail : item.event_thumbnail}
                alt={selected === "학회정보" ? item.conference_name : item.event_name}
                className="data-logo"
              />
            </div>
            <div className="data-bottom">
              <h3 className="data-title">
                {selected === "학회정보" ? item.conference_name : item.event_name}
              </h3>
              <div className="data-info">
                <p>
                  <span className="data-icon">📌</span>{" "}
                  {selected === "학회정보" ? item.organization_location : item.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ 최신 학술 행사 정보 영역에 최신 행사 이미지 적용 */}
      <div className="popular-section">
        <div className="popular-text">
          <h3>
            최신
            <br />
            학술행사
            <br />
            정보예요 👀
          </h3>
        </div>
        <div
          className="popular-box gray-box"
          style={{
            backgroundImage: eventImages[1] ? `url(${eventImages[1]})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Home;
