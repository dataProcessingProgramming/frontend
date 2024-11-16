// Main.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../style/Main.css';

function Main() {
  const navigate = useNavigate(); 
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleStartClick = () => {
    navigate('/name'); 
  };

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.75 }}
    >
      <div className="top-bar">
        <div className="title">
          <h3 className="title-1">주식학습플랫폼</h3>
          <h1 className="title-2">RichReach</h1>
        </div>
      </div>
      
      <div className="content">
        <img 
          src={`${process.env.PUBLIC_URL}/image/title.png`} 
          alt="Title Graphic" 
          className={`top-image ${isImageLoaded ? 'fade-in' : ''}`} 
          onLoad={handleImageLoad} 
        />
        <br></br>
        <div className="text-1">RichReach</div>
        <div className="text-2">주식 학습 플랫폼</div>
        <br></br>
        <br></br>
        <button className="start-button-main" onClick={handleStartClick}>시작하기</button>
        <br></br>
        <br></br>
        <img src={`${process.env.PUBLIC_URL}/image/logo.png`} alt="" className="bottom-image" />
        <p className="footer-text-main">데이터처리프로그래밍 1조 - 박찬영, 최문영, 김채연</p>
      </div>

      <div className="bottom-bar">
        <p>NoInvestNoMoney company, All Right reserved</p>
      </div>
    </motion.div>
  );
}

export default Main;
