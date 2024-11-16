import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Gameend.css';

function Gameend() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(() => Number(localStorage.getItem('lives')) || 3);
  const [passedCount, setPassedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }

    const storedPassedCount = localStorage.getItem('passedCount');
    if (storedPassedCount) {
      setPassedCount(Number(storedPassedCount));
    }
  }, []);

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(<span key={i} className="heart">❤️</span>);
    }
    return hearts;
  };

  const handleNextClick = () => {
    navigate('/');
  };

  return (
    <div className="app">
      <div className="top-bar">
      <div className="title">
          <h3 className="title-1">주식학습플랫폼</h3>
          <h1 className="title-2">RichReach</h1>
        </div>
        <div className="hearts">
          <span className="passed-count">통과 개수: {passedCount}</span>
          {renderHearts()}
        </div>
      </div>
      
      <div className="content">
        <div className="container-over">
          <h1>게임 종료</h1>
          <p>축하합니다.<br />
            모든 문제를 <br />
            통과하셨습니다. <br /> <br />
            이젠 실전입니다!</p>

          <button className="over-button" onClick={handleNextClick}>게임 종료</button>
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default Gameend;
