import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import Conference from './components/Conference';
import ConferenceDetail from './components/ConferenceDetail'; // 학회 상세 페이지 추가
import Event from './components/Event';
import Home from './components/Home';
import Member from './components/Member';
import SignupForm from './components/SignupForm';
import LoginModal from './components/LoginModal';

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

      {/* 모달 컴포넌트 */}
      <LoginModal isOpen={isModalOpen} toggleModal={toggleModal} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conferences" element={<Conference />} />
        <Route path="/conferences/:conferenceId" element={<ConferenceDetail />} /> {/* 학회 상세 페이지 추가 */}
        <Route path="/events" element={<Event />} />
        <Route path="/members" element={<Member />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
