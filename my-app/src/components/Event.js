import React, { useState, useEffect } from "react";
import "../css/Event.css";
import EventCard from "./EventCard"; // 올바르게 임포트
import { FaSearch } from "react-icons/fa"; // 돋보기 아이콘 추가

const regions = [
  "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
  "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

const categories = [
  "컴퓨터 공학", "디자인", "기계 공학", "전자 공학",
  "생명 과학", "화학", "물리", "경제학", "경영학",
  "사회학", "심리학", "법학", "의학", "건축학"
];

const ITEMS_PER_PAGE = 12; // 한 페이지에 표시할 항목 수
const MAX_VISIBLE_PAGES = 5; // 최대 표시할 페이지 버튼 수

const Event = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [events, setEvents] = useState([]); // 이벤트 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [pageGroup, setPageGroup] = useState(0); // 현재 페이지 그룹 상태

  // API 호출
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = new URLSearchParams({
          keyword: search || "",
          region: selectedRegion || "",
          eventType: selectedCategory || "",
        }).toString();

        const url = `http://43.200.115.60/api/events/search?${query}`;
        console.log("API 요청 URL:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API 응답 데이터:", data);
          setEvents(data.data.events || []);
        } else {
          console.error("API 호출 실패:", response.statusText);
          setEvents([]);
        }
      } catch (error) {
        console.error("네트워크 에러 발생:", error.message || error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [search, selectedCategory, selectedRegion]);

  // 총 페이지 수
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  // 페이지 그룹 계산
  const totalGroups = Math.ceil(totalPages / MAX_VISIBLE_PAGES);
  const currStart = pageGroup * MAX_VISIBLE_PAGES + 1;
  const currEnd = Math.min(currStart + MAX_VISIBLE_PAGES - 1, totalPages);
  const visible = Array.from(
    { length: currEnd - currStart + 1 },
    (_, i) => currStart + i
  );

  // 현재 페이지에 해당하는 이벤트
  const currentEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 페이지 변경 핸들러
  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 페이지 그룹 변경 핸들러
  const changePageGroup = (direction) => {
    if (direction === "next" && pageGroup < totalGroups - 1) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * MAX_VISIBLE_PAGES + 1);
    } else if (direction === "prev" && pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage(pageGroup * MAX_VISIBLE_PAGES);
    }
  };

  return (
    <div className="event-page">
      {/* 검색창 추가 */}
      <div className="search-section">
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
        <div className="filter-group">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">📂 분야</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="">📍 지역</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 행사 정보 섹션 */}
      <div className="event-section">
        <h2 className="section-title">행사 정보</h2>
        <p className="subtitle">유용한 행사 정보를 모아봤어요</p>

        <div className="event-grid">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                imageUrl={event.imageUrl}
                region={event.region}
                category={event.eventType}
                offline={event.offline}
              />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => changePageGroup("prev")}
          disabled={pageGroup === 0}
        >
          &lt;
        </button>
        {visible.map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => changePageGroup("next")}
          disabled={pageGroup === totalGroups - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Event;
