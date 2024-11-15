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

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }

    const fetchChartData = async () => {
      try {
        const response = await fetch('http://localhost:8000/sectors-charts', {
          mode: 'cors'
        });
        const data = await response.json();
        setChartData(data);
        setFinancialData(data.financial_data); // Set initial financial data for main chart
      } catch (error) {
        console.error('차트 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchChartData();
  }, []);

  const renderHearts = () => {
    return Array.from({ length: lives }, (_, i) => <span key={i} className="heart">❤️</span>);
  };

  const renderFinancialTable = () => {
    if (!financialData) return <p>재무제표 데이터를 불러오는 중입니다...</p>;

    return (
      <table className="financial-table">
        <thead>
          <tr>
            <th>분기</th>
            <th>매출액</th>
            <th>순이익</th>
            <th>영업이익률</th>
            <th>부채비율</th>
            <th>EPS (주당순이익)</th>
            <th>ROE (자기자본이익률)</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((item, index) => (
            <tr key={index}>
              <td>{item.quarter}</td>
              <td>{item.revenue}</td>
              <td>{item.net_profit}</td>
              <td>{item.operating_margin}</td>
              <td>{item.debt_ratio}</td>
              <td>{item.eps}</td>
              <td>{item.roe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleNextClick = () => {
    if (scoreFeedback >= 80) {
      navigate('/PassResult');
    } else {
      setLives((prevLives) => {
      const updatedLives = prevLives - 1;
      localStorage.setItem('lives', updatedLives);
      return updatedLives;
    }); // 점수가 70점 미만일 경우 생명 차감
      navigate('/FailResult');
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
              <p>{feedback}</p> {/* ChatGPT 분석 내용 표시 */}
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
