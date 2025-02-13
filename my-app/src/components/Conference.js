import React, { useState } from "react";
import "../css/Conference.css";
import ConferenceCard from "./ConferenceCard";
import { FaSearch } from "react-icons/fa"; // 돋보기 아이콘 추가

const conferences = Array(12).fill({
  category: "디자인",
  title: "한국디자인학회",
  location: "성남시",
  image: "/images/conference-logo.png",
});

const regions = [
  "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", 
  "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

const categories = [
  "컴퓨터 공학", "디자인", "기계 공학", "전자 공학",
  "생명 과학", "화학", "물리", "경제학", "경영학",
  "사회학", "심리학", "법학", "의학", "건축학"
];

const Conference = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="conference-page">
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
          <select>
            <option value="">📂 분야</option>
            {categories.map((category, index)=> (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <select>
            <option value="">📍 지역</option>
              {regions.map((region, index) => {
                console.log(`option: ${region}`); //콘솔 확인 -> 삭제해도 무방
                return <option key={index} value={region}>{region}</option>;
              })}
          </select>
        </div>
      </div>

      {/* 학회 정보 섹션 */}
      <div className="conference-section">
        <h2 className="section-title">학회정보</h2>
        <p className="subtitle">유용한 학회 정보를 모아봤어요</p>

        <div className="conference-grid">
          {conferences.map((conf, index) => (
            <ConferenceCard key={index} {...conf} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conference;
