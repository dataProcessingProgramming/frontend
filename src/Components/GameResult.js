import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/GameResult.css';

function GameResult() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(() => Number(localStorage.getItem('lives')) || 3);
  const [chartData, setChartData] = useState(null); // Main chart and other charts
  const [financialData, setFinancialData] = useState(null); // Financial data for main chart
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 데이터를 가져옵니다.
  const { userAnalysis, feedback, scoreFeedback } = location.state || {};

  const feedbackText = feedback.replace(/평가 점수: \d+ 점$/, '').trim(); // 평가 점수 부분 제거
  const feedbackscore = feedback.match(/평가 점수: \d+ 점$/)?.[0] || ''; // 평가 점수 추출

  const renderHearts = () => {
    return Array.from({ length: lives }, (_, i) => <span key={i} className="heart">❤️</span>);
  };

  const handleNextClick = () => {
    const score = parseInt(scoreFeedback.match(/\d+/)[0], 10);
    const result = feedback.match(/\d+\s*점/)[0];

    if (score >= 70) {
      navigate('/PassResult', {
        state: {
          scoreFeedback: result
        }
      });
    } else {
      setLives((prevLives) => {
      const updatedLives = prevLives - 1;
      localStorage.setItem('lives', updatedLives);
      return updatedLives;
    }); // 점수가 70점 미만일 경우 생명 차감
      navigate('/FailResult', {
        state: {
          scoreFeedback: result
        }
      });
    }
  };

  return (
    <div className="app">
      <div className="top-bar">
      <div className="title">
          <h3 className="title-1">주식학습플랫폼</h3>
          <h1 className="title-2">RichReach</h1>
        </div>
        <div className="hearts">{renderHearts()}</div>
      </div>

      <div className="content-main">
        <div className="right-panel">
          <div className="chart-detail">
            <h3>사용자가 분석한 내용</h3>
            <div className="chart-info"> 
              <p>{userAnalysis}</p> {/* 사용자가 분석한 내용 표시 */}
            </div>
          </div>

          <div className="chart-detail">
            <h3>챗GPT를 통한 분석 내용</h3>
            <div className="chart-info"> 
              {/* 분석 내용과 평가 점수 분리 */}
              <p>{feedbackText}</p>
              <p className="score">{feedbackscore}</p>
            </div>
          </div>
          
          <button className="nextgame-button" onClick={handleNextClick}>다음</button>
          
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default GameResult;
