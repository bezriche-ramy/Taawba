import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReadQuran from './pages/readquran';
import Surah from './pages/surah';
import './animations.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readquran" element={<ReadQuran />} />
        <Route path="/surah/:id" element={<Surah />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
