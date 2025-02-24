import React from 'react';
import NavBarMain from '../components/navbar/NavBarMain';
import FirstPart from '../components/firstpart/FirstPart';
import Cards from '../components/cards/Cards';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <NavBarMain />
      <FirstPart />
      <Cards />
    </div>
  );
};

export default Home;
