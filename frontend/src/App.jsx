import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './animations.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
