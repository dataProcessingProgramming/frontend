import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameIntro.css';

function GameIntro() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(<span key={i} className="heart">❤️</span>);
    }
    return hearts;
  };

  const handleBackClick = () => {
    navigate('/name');
  };

  const handleSubmitClick = () => {
    navigate('/gamemain'); 
  };

  return (
    <div className="app">
      <div className="top-bar">
        <div className="title">
          <h1>RichReach</h1>
        </div>
        <div className="hearts">
          {renderHearts()}
        </div>
      </div>
      <div className="arrow-container">
        <img 
          src={`${process.env.PUBLIC_URL}/image/arrow.png`} 
          alt="" 
          className="back-arrow" 
          onClick={handleBackClick} 
        />
      </div>

      <div className="content">
        <div className="container">
          <h2>안녕하세요, {name}님</h2>
          <p>게임 규칙을 알려드릴게요</p>

          <div className="rules">
            <p><input type="checkbox" /> 문제에 주어진 차트의 종목명</p>
            <p><input type="checkbox" /> 문제에 주어진 차트의 이후 1년간의 재무제표</p>
            <p><input type="checkbox" /> 동일 섹터군의 다른 종목의 특정 시점 이후의 차트</p>
          </div>

          <button className="submit-button" onClick={handleSubmitClick}>
            제출
          </button>
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default GameIntro;
