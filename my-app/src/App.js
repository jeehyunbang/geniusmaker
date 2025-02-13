import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import Conference from './components/Conference';
import ConferenceMem from './components/ConferenceMem'; // ConferenceMem 추가
import Event from './components/Event';
import Home from './components/Home';
import Member from './components/Member'; // 기존 Member 유지, 새로운 경로로 이동
import SignupForm from './components/SignupForm';
import LoginModal from './components/LoginModal';
import ConferenceDetail from "./components/ConferenceDetail";
import Select from './components/Select'; // Select 컴포넌트 추가
import SignupFormCon from './components/SignupFormCon';

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
            <Link to="/select" className="auth-link">회원가입</Link> {/* 회원가입 경로 수정 */}
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
        <Route path="/conferences/:conferenceId" element={<ConferenceDetail toggleModal={toggleModal} />} />
        <Route path="/events" element={<Event />} />
        
        {/* 마이페이지에서 ConferenceMem으로 연결 */}
        <Route path="/members" element={<ConferenceMem />} /> 

        {/* 기존 Member.js가 필요하면 새로운 경로로 이동 */}
        <Route path="/members/info" element={<Member />} />

        <Route path="/select" element={<Select />} /> {/* Select 컴포넌트 라우트 추가 */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup-con" element={<SignupFormCon/>} />
      </Routes>
    </div>
  );
}

export default App;
