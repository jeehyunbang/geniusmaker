import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Conference from './components/Conference';
import ConferenceMem from './components/ConferenceMem';
import Register from "./components/Register";
import Event from './components/Event';
import Home from './components/Home';
import Member from './components/Member';
import SignupForm from './components/SignupForm';
import LoginModal from './components/LoginModal';
import ConferenceDetail from "./components/ConferenceDetail";
import EventDetail from "./components/EventDetail";
import Select from './components/Select';
import SignupFormCon from './components/SignupFormCon';
import SignupFormCon2 from './components/SignupFormCon2';
import SignupFormCon3 from './components/SignupFormCon3';
import logoImage from './logo.png';


function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      {/* 🔹 상단 회원가입 / 로그인 */}
      <div className="top-header">
        <div className="auth-links">
          <Link to="/signup" className="auth-link">회원가입</Link>
          <button className="nav-login-btn" onClick={toggleModal}>로그인</button>
        </div>
      </div>

      {/* 🔹 메인 헤더 (로고 + 네비게이션) */}
      <header className="main-header">
        <Link to="/" className="logo">
          <img src={logoImage} alt="천재창조 로고" className="logo-image" />
        </Link>
        <nav className="nav-container">
          <ul className="nav">
            <li><Link to="/conferences">학회정보</Link></li>
            <li><Link to="/events">학술행사정보</Link></li>
            <li><Link to="/register">정보 등록</Link></li>
            <li><Link to="/members">마이페이지</Link></li>

          </ul>
        </nav>
      </header>

      {/* 🔹 로그인 모달 */}
      <LoginModal isOpen={isModalOpen} toggleModal={toggleModal} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conferences" element={<Conference />} />
        <Route path="/conferences/:id" element={<ConferenceDetail toggleModal={toggleModal} />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/members" element={<ConferenceMem />} />
        <Route path="/members/info" element={<Member />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select" element={<Select />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup-con" element={<SignupFormCon/>} />
        <Route path="/signup-con2" element={<SignupFormCon2/>} />
        <Route path="/signup-con3" element={<SignupFormCon3/>} />
      </Routes>
    </div>
  );
}

export default App;
