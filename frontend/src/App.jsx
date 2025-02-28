import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ReadQuran from './pages/readquran';
import Surah from './pages/surah';
import PrayerTime from './pages/prayertime';
import SelectReaderPage from './pages/SelectReaderPage';
import PlayQuran from './pages/playquran';
import Chatbot from './pages/chatbot';
import Auth from './pages/auth/AuthPage';
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
        <Route path="/selectreader" element={<SelectReaderPage />} />
        <Route path="/playquran/:reciterId" element={<PlayQuran />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path='/authentication' element={<Auth />} />
      </Routes>
    </Router>

  );
}

export default App;
