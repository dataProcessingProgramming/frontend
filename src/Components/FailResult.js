import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/FailResult.css';

function FailResult() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(() => Number(localStorage.getItem('lives')) || 3);
  const [passedCount, setPassedCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 데이터를 가져옵니다.
  const { scoreFeedback } = location.state || {};

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }

    const storedPassedCount = localStorage.getItem('passedCount');
    if (storedPassedCount) {
      setPassedCount(Number(storedPassedCount));
    }

    // 생명 1개 차감
    setLives((prevLives) => {
      const updatedLives = prevLives - 1;
      localStorage.setItem('lives', updatedLives); // localStorage에 반영
      return updatedLives;
    });
  }, []);

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(<span key={i} className="heart">❤️</span>);
    }
    return hearts;
  };

  const handleNextClick = () => {
    if (lives <= 0) {
      // 생명이 0 이하일 경우 GameOver 페이지로 이동
      navigate('/gameover');
    } else {
      // 생명이 남아있으면 다음 라운드 진행
      navigate('/gamemain'); 
    }
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
        <div className="container-fail">
          <h1><br/>채점 결과</h1>
          <p>점수: {scoreFeedback}<br/><br/>
            아쉽지만 <br />
            70점을 넘지 못했습니다. <br /> <br />
            생명 1개가 차감됩니다. <br /> <br />
            현재 통과한 문제 개수: {passedCount}<br/><br/><br/></p>

          {/* 버튼 텍스트를 동적으로 설정 */}
          <button className="next-button" onClick={handleNextClick}>
            {lives <= 0 ? '다음' : '다음 라운드 진행'}
          </button>
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default FailResult;
