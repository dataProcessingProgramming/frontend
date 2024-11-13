import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="app">
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


        <button className="submit-name" onClick={handleSubmit}>제출</button>
      </div>

      <div className="bottom-bar">
      </div>
    </div>
  );
}

export default Name;
