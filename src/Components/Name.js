// Name.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../style/Name.css';

function Name() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name);
      navigate('/GameIntro');
    } else {
      alert('이름을 입력해 주세요.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.75 }}
    >
      <div className="top-bar">
        <div className="title">
          <h3 className="title-1">주식학습플랫폼</h3>
          <h1 className="title-2">RichReach</h1>
        </div>
      </div>
      
      <div className="content">
        <div className="text2">이름을 입력해주세요</div>
        
        <input 
          type="text" 
          className="name-input" 
          placeholder="이름을 입력하세요" 
          value={name} 
          onChange={handleInputChange} 
          onKeyPress={handleKeyPress} 
        />
        <button className="name-submit" onClick={handleSubmit}>제출</button>
      </div>

      <div className="bottom-bar"></div>
    </motion.div>
  );
}

export default Name;
