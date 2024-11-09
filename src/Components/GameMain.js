import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameMain.css';

function GameMain() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(3);
  const [chartData, setChartData] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }

    const fetchChartData = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://api.example.com/chart1'),
          fetch('https://api.example.com/chart2'),
          fetch('https://api.example.com/chart3'),
          fetch('https://api.example.com/chart4'),
          fetch('https://api.example.com/chart5'),
          fetch('https://api.example.com/chart6'),
        ]);
        const data = await Promise.all(responses.map((response) => response.json()));
        setChartData(data);
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

  const handleChartClick = async (chartId) => {
    const selected = chartData.find((chart) => chart.id === chartId);
    setSelectedChart(selected || null);
    setFinancialData(null);

    if (selected) {
      try {
        const response = await fetch(`https://api.example.com/financialData/${chartId}`);
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error('재무제표 데이터를 불러오는데 실패했습니다:', error);
        setFinancialData(null);
      }
    }
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
          {chartData.length === 6
            ? chartData.map((chart, index) => (
                <div
                  key={chart.id || index}
                  className="chart-card"
                  onClick={() => handleChartClick(chart.id)}
                >
                  <h3>{chart.name}</h3>
                </div>
              ))
            : Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="chart-card">
                  <h3>주식차트 {index + 1}</h3>     
                </div>
              ))}
        </div>

        <div className="right-panel">
          <div className="chart-detail">
            <h3>선택한 주식 차트 및 재무제표</h3>
            {selectedChart ? (
              <div className="chart-info">
                <div className="chart-image">
                  <img
                    src={selectedChart.chartImageUrl || `${process.env.PUBLIC_URL}/image/default_chart.png`}
                    alt={`${selectedChart.name} 차트`}
                    className="selected-chart-image"
                  />
                </div>
                <h4>{selectedChart.name}</h4>
                <div className="financial-data">
                  <h5>재무제표:</h5>
                  {financialData ? (
                    <pre>{JSON.stringify(financialData, null, 2)}</pre>
                  ) : (
                    <p>재무제표 데이터를 불러오는 중입니다...</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="chart-info">차트를 선택해 주세요</div>
            )}
          </div>

          <div className="analysis-container">
            <h3>입력창</h3>
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
