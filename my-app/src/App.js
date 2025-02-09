import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import Conference from './components/Conference';
import Event from './components/Event';
import Home from './components/Home';
import Member from './components/Member';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="top-header">
          <div className="auth-links">
            <Link to="/signup" className="auth-link">회원가입</Link>
            <button className="nav-login-btn" onClick={toggleModal}>로그인</button>
          </div>
        </div>
        <div className="main-header">
          <Link to="/" className="logo">Logo</Link>
          <div className="nav-container">
            <ul className="nav">
              <li><Link to="/conferences">학회정보</Link></li>
              <li><Link to="/events">학술행사정보</Link></li>
              <li><Link to="/members">마이페이지</Link></li>
            </ul>
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>
        </div>
      </header>

      {/* 모달 */}
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={toggleModal}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>로그인</h2>
            <form>
              <div className="custom-input-container">
                <input
                  type="email"
                  placeholder="✉️ 이메일을 입력해주세요"
                  className="custom-modal-input"
                />
              </div>
              <div className="custom-input-container">
                <input
                  type="password"
                  placeholder="🔒 비밀번호를 입력해주세요"
                  className="custom-modal-input"
                />
              </div>
              <button type="submit" className="custom-login-button">로그인</button>
            </form>
            <div className="custom-extra-links">
              <a href="#signup" className="custom-left-link">회원가입</a>
              <div className="custom-right-links">
                <a href="#find-id">아이디 찾기</a> | <a href="#find-password">비밀번호 찾기</a>
              </div>
            </div>
            <div className="custom-social-login">
              <p className="custom-social-title">소셜 로그인</p>
              <div className="custom-social-icons">
                <div className="custom-social-icon">카카오톡</div>
                <div className="custom-social-icon">네이버</div>
                <div className="custom-social-icon">구글</div>
              </div>
            </div>
          </div>
        </div>
      )}

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
