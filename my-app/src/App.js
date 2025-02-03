import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Conference from './components/Conference';
import Event from './components/Event';
import Home from './components/Home';
import Member from './components/Member';

function App() {
  return (
    <div className="App">
        {/* 헤더 */}
        <header className="header">
          {/* 로고 - 누르면 메인 페이지로 이동) */}
          <Link to="/" className="logo">Logo</Link>
          
          {/* 네비게이션 메뉴 */}
          <ul className="nav">
            <li><Link to="/conferences">학회 검색</Link></li>
            <li><Link to="/events">행사 검색</Link></li>
            <li><Link to="/members">마이 페이지</Link></li>
          </ul>
        </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conferences" element={<Conference />} />
        <Route path="/events" element={<Event />} />
        <Route path="/members" element={<Member />} />
      </Routes>
    </div>
  );
}

export default App;
