import React from 'react';
import NavBarMain from '../components/navbar/NavBarMain';
import FirstPart from '../components/homepage/firstpart/FirstPart';
import Cards from '../components/cards/cardmain';
import SecondPart from '../components/homepage/secondpart/secondpart';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <NavBarMain />
      <FirstPart />
      <Cards />
      <SecondPart />
    </div>
  );
};

export default Home;
