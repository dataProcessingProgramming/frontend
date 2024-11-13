import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameResult.css';

function GameResult() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(3);
  const [chartData, setChartData] = useState(null); // Main chart and other charts
  const [financialData, setFinancialData] = useState(null); // Financial data for main chart
  const navigate = useNavigate();

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

  const handleBackClick = () => {
    navigate('/GameIntro');
  };

  const handleChartClick = (index) => {
    if (chartData && chartData.other_charts_images && chartData.other_charts_images[index]) {
      console.log(`Chart ${index + 1} clicked`);
    }
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

  return (
    <div className="app">
      <div className="top-bar">
        <div className="title">
          <h1>RichReach</h1>
        </div>
        <div className="hearts">{renderHearts()}</div>
      </div>

      <div className="arrow-container">
        <img
          src={`${process.env.PUBLIC_URL}/image/arrow.png`}
          alt="Back Arrow"
          className="back-arrow"
          onClick={handleBackClick}
        />
      </div>

      <div className="content-main">

        <div className="right-panel">
          <div className="chart-detail">
            <h3>사용자가 분석한 내용</h3>
            <div className="chart-info"> 
              
            </div>
          </div>

          <div className="chart-detail">
            <h3>챗GPT를 통한 분석 내용</h3>
            <div className="chart-info"> 
              
            </div>
          </div>
          
          <button className="submit-button">다음</button>
          
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default GameResult;