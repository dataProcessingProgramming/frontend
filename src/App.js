// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Main from './Components/Main';
import Name from './Components/Name';
import GameIntro from './Components/GameIntro';
import GameMain from './Components/GameMain';
import GameResult from './Components/GameResult';
import PassResult from './Components/PassResult';
import FailResult from './Components/FailResult';
import Gameover from './Components/Gameover';
import Gameend from './Components/Gameend';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main />} />
        <Route path="/Name" element={<Name />} />
        <Route path="/GameIntro" element={<GameIntro />} />
        <Route path="/GameMain" element={<GameMain />} />
        <Route path="/GameResult" element={<GameResult />} />
        <Route path="/PassResult" element={<PassResult />} />
        <Route path="/FailResult" element={<FailResult />} />
        <Route path="/Gameover" element={<Gameover />} />
        <Route path="/Gameend" element={<Gameend />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
