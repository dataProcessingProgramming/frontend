import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameMain.css';

function GameMain() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(3);
  const [chartData, setChartData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const navigate = useNavigate();

  // 체크박스 상태 불러오기
  const showMainSectorTitle = localStorage.getItem('showMainSectorTitle') === 'true';
  const showFinancialData = localStorage.getItem('showFinancialData') === 'true';
  const showOtherCharts = localStorage.getItem('showOtherCharts') === 'true';

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
        setFinancialData(data.financial_data);
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
        <div className="chart-grid">
          {showOtherCharts && chartData && chartData.other_charts_images
            ? chartData.other_charts_images.map((img, index) => (
                <div
                  key={index}
                  className="chart-card"
                  onClick={() => handleChartClick(index)}
                >
                  <img src={`data:image/png;base64,${img}`} alt={`Chart ${index + 1}`} className="chart-image" />
                </div>
              ))
            : !showOtherCharts && Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="chart-card">
                  <h3>주식차트 {index + 1}</h3>     
                </div>
              ))}
        </div>

        <div className="right-panel">
          <div className="chart-detail">
            <h3>문제의 차트</h3>
              {showMainSectorTitle && chartData && chartData.main_sector_title && <h4>{chartData.main_sector_title}</h4>}
              {chartData && chartData.main_chart_image ? (
                <img src={`data:image/png;base64,${chartData.main_chart_image}`} alt="Main Chart" className="main-chart-image" />
              ) : (
                <p>메인 차트 이미지를 불러오는 중입니다...</p>
              )}
              {showFinancialData && (
                <div className="financial-data">
                  <h5>재무제표:</h5>
                  {renderFinancialTable()}
                </div>
              )}
          </div>

          <div className="analysis-container">
            <h3>분석</h3>
            <textarea
              className="analysis-input"
              placeholder="분석 내용을 입력하세요"
            />
            <button className="submit-button">제출</button>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default GameMain;
