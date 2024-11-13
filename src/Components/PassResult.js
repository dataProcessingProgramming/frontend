import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/PassResult.css';

function PassResult() {
  const [name, setName] = useState('');
  const [lives, setLives] = useState(3);
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

  const handleBackClick = () => {
    navigate('/name');
  };

  const handleNextClick = () => {
    navigate('/gamemain'); 
  };

  return (
    <div className="app">
      <div className="top-bar">
      <div className="title">
          <h3 className="title-1">주식학습플랫폼</h3>
          <h1 className="title-2">RichReach</h1>
        </div>
        <div className="hearts"><span className="passed-count">통과 개수: {passedCount}</span>
          {renderHearts()}
        </div>
      </div>

      <div className="content">
        <div className="container-pass">
          <h1>채점 결과 <br/></h1>
          <p>축하합니다. <br />
            80점을 넘었습니다! <br /> <br />
            현재 통과한 문제 개수: {passedCount}</p>

          <button className="next-button" onClick={handleNextClick}>다음 라운드 진행</button>
        </div>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </div>
  );
}

export default PassResult;
