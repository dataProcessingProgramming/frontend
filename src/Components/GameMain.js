import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameMain.css';

function GameMain() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(3);
  const [chartData, setChartData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [analysis, setAnalysis] = useState(''); // 사용자가 입력한 분석 내용을 저장하는 상태 변수
  const [error, setError] = useState(''); // 에러 메시지 상태 변수
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [scoreFeedback, setScoreFeedback] = useState('');

  // 체크박스 상태 불러오기
  const showMainSectorTitle = localStorage.getItem('showMainSectorTitle') === 'true';
  const showFinancialData = localStorage.getItem('showFinancialData') === 'true';

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

  const handleSubmit = async () => {
    if (!analysis.trim()) {  // 분석 내용이 비어 있는지 확인
      alert('분석 내용을 입력해 주세요.');  // 경고 메시지 띄우기
      return;
    }

    try {
      setError('');  // 제출 시 에러 메시지 초기화

      const selectedOptions = {
        mainSectorTitle: showMainSectorTitle,
        financialData: showFinancialData,
      };

      const requestData = {
        user_analysis: analysis,  // 사용자가 입력한 분석 내용
        main_sector_title: chartData?.main_sector_title || "N/A",  // 메인 섹터 타이틀
        main_chart_image: chartData?.main_chart_image || "N/A",  // 메인 차트 이미지
        financial_data: chartData?.financial_data || [],  // 재무 데이터
        selected_options: selectedOptions,
      };

      const response = await fetch('http://localhost:8000/analyze-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log('서버로부터 받은 분석 피드백:', result);
    } catch (error) {
      console.error('피드백 요청에 실패했습니다:', error);
    }
  };

  const renderHearts = () => {
    return Array.from({ length: lives }, (_, i) => <span key={i} className="heart">❤️</span>);
  };

  const handleBackClick = () => {
    navigate('/GameIntro');
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
          <h3 className="title-1">주식학습플랫폼</h3>
          <h1 className="title-2">RichReach</h1>
        </div>
        <div className="hearts">{renderHearts()}</div>
      </div>

      <div className="content-main">
        <div className="chart-grid">
          {chartData && chartData.other_charts_images
            ? chartData.other_charts_images.map((img, index) => (
                <div key={index} className="chart-card-static">
                  <img src={`data:image/png;base64,${img}`} alt={`Chart ${index + 1}`} className="chart-image" />
                </div>
              ))
            : Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="chart-card-static">
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
              value={analysis} 
              onChange={(e) => setAnalysis(e.target.value)} 
            />
            {error && <p className="error-message">{error}</p>} {/* 에러 메시지 표시 */}
            <button className="submit-button" onClick={handleSubmit}>제출</button>
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
