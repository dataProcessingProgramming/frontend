// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import Name from './Components/Name';
import GameIntro from './Components/GameIntro';
import GameMain from './Components/GameMain';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Name" element={<Name />} />
        <Route path="/GameIntro" element={<GameIntro />} />
        <Route path="/GameMain" element={<GameMain />} />
      </Routes>
    </Router>
  );
}

export default App;
