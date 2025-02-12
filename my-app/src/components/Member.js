import React from "react";
import "../css/Member.css";

const Member = () => {
  const user = {
    nickname: "린",
    email: "abc123@naver.com",
    membership: "개인회원",
  };

  return (
    <div className="member-page">
      {/* 마이페이지 제목 */}
      <header className="member-header">마이페이지</header>
      {/* 회원 정보 */}
      <section className="member-info">
        {/* 회원정보 제목 + "정보 수정" 버튼 배치 */}
        <div className="info-header">
          <h2>회원정보</h2>
        </div>

        <div className="info-container">
          {/* 프로필 사진 박스 */}
          <div className="profile-section">
            <div className="profile-pic">{user.nickname}님</div>
          </div>

          {/* 회원 상세 정보 */}
          <div className="user-details">
            <div className="info-row">
              <span className="label">닉네임</span>
              <span className="info-box">{user.nickname}</span>
              <span className="label">회원분류</span>
              <span className="info-box">{user.membership}</span>
            </div>
            <div className="info-row">
              <span className="label">이메일</span>
              <span className="info-box">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="label">비밀번호</span>
              <span className="info-box">abc***</span>
            </div>
          </div>
        </div>
      </section>
      {/* 회원 탈퇴 버튼 추가*/}
      <button className="delete-button">회원탈퇴</button>
    </div>
  );
};

export default Member;
