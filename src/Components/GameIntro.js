import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameIntro.css';

function GameIntro() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(3);
  const navigate = useNavigate();

  // 체크박스 상태 관리
  const [showMainSectorTitle, setShowMainSectorTitle] = useState(false);
  const [showFinancialData, setShowFinancialData] = useState(false);
  const [showOtherCharts, setShowOtherCharts] = useState(false);

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
    // 체크박스 상태를 localStorage에 저장
    localStorage.setItem('showMainSectorTitle', showMainSectorTitle);
    localStorage.setItem('showFinancialData', showFinancialData);
    localStorage.setItem('showOtherCharts', showOtherCharts);

    navigate('/gamemain');
  };

  return (
    <div className="app">
      <div className="top-bar">
      <div className="title">
          <h3 className="title-1">주식학습플랫폼</h3>
          <h1 className="title-2">RichReach</h1>
        </div>
        <div className="hearts">
          {renderHearts()}
        </div>
      </div>
      <div className="arrow-container">
        <img 
          src={`${process.env.PUBLIC_URL}/image/arrow.png`} 
          alt="" 
          className="back-arrow-intro" 
          onClick={handleBackClick} 
        />
      </div>

      <div className="content">
        <div className="container">
          <h2>안녕하세요, {name}님 <br /></h2>
          <p>게임 규칙을 알려드릴게요! <br/></p>
          <h3>
             주식 학습 게임 RichReach는 <br/>
             주식에 대한 기본적 지식은 존재하지만 <br/>
             실전 경험은 없는 초보자를 위한 학습 게임입니다. <br/><br/>
             주식 차트의 일부분을 보여드릴테니 <br/>이후에 일어날 변화를 예측해보세요.<br/>
             해당 차트에 대한 추가적인 정보를 함께 알고싶다면 <br/>
             밑의 체크박스에서 원하는 정보들을 체크해주시면 됩니다. <br/> <br/>
             게임의 생명은 3개가 주어지고, <br/>예측 점수가 70점 이하일시 생명은 깎이게 됩니다.<br/>
             생명이 모두 깎이기 전에 모든 단계를 통과해보세요! <br/><br/>
             </h3>

          <div className="rules">
            <p><input type="checkbox" checked={showMainSectorTitle} onChange={() => setShowMainSectorTitle(!showMainSectorTitle)} /> 문제에 주어진 차트의 종목명</p>
            <p><input type="checkbox" checked={showFinancialData} onChange={() => setShowFinancialData(!showFinancialData)} /> 문제에 주어진 차트의 재무제표</p>
            <p><input type="checkbox" checked={showOtherCharts} onChange={() => setShowOtherCharts(!showOtherCharts)} /> 동일 섹터군의 다른 종목의 이후 차트</p>
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