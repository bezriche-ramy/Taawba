import React from 'react';
import NavBarMain from '../components/navbar/NavBarMain';
import CardMain from '../components/cards/cardmain';
import FirstPart from '../components/homepage/firstpart/FirstPart';
import SecondPart from '../components/homepage/secondpart/secondpart';
import ThirdPart from '../components/homepage/3rdpart/3rdpart';
import Footer from '../components/homepage/fotter/fotter';
import './home.css';

const Home = () => {
  return (
    <div className="home-page">
      <NavBarMain />
      <FirstPart />
      <CardMain />
        
        <SecondPart />
        <ThirdPart />
        <Footer />
      </div>
    
  );
};

export default Home;
