import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../style/Main.css';

function Main() {
  const navigate = useNavigate(); 

  const handleStartClick = () => {
    navigate('/name'); 
  };

  return (
    <div className="app">
      <div className="top-bar">
        <div className="title">
          <h1>RichReach</h1>
        </div>
      </div>
      
      <div className="content">
        <img src={`${process.env.PUBLIC_URL}/image/title.png`} alt="Title Graphic" className="top-image" />
        <div className="text">RichReach</div>
        <div className="text2">주식 학습 플랫폼</div>
        <button className="start-button" onClick={handleStartClick}>시작하기</button>
        <img src={`${process.env.PUBLIC_URL}/image/logo.png`} alt="" className="bottom-image" />
        <p className="footer-text">데이터처리프로그래밍 1조 - 박찬영, 최문영, 김채연</p>
      </div>

      <div className="bottom-bar">
      </div>
    </div>
  );
}

export default Main;
