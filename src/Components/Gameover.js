import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Gameover.css';

function Gameover() {
  const [name, setName] = useState('');
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

  const handleBackClick = () => {
    navigate('/name');
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
        <div className="passed-info">
          <span className="passed-count-over">통과 개수: {passedCount}</span>
        </div>
      </div>

      <div className="content">
        <div className="container-over">
          <h1>게임 오버</h1>
          <p>모든 생명이 소모되어<br />
            게임이 종료되었습니다. <br /> <br />
            열심히 공부하여 <br />
            다음엔 통과해보아요!</p>

          <button className="over-button" onClick={handleNextClick}>게임 종료</button>
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default Gameover;
