import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReadQuran from './pages/readquran';
import Surah from './pages/surah';
import PrayerTime from './pages/prayertime';
import './animations.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readquran" element={<ReadQuran />} />
        <Route path="/surah/:id" element={<Surah />} />
        <Route path="/prayertime" element={<PrayerTime />} />
      </Routes>
    </Router>
  );
}

export default App;
