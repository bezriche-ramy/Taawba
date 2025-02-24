import React from 'react';
import NavBarMain from '../components/navbar/NavBarMain';
import FirstPart from '../components/firstpart/FirstPart';
import CardMain from '../components/cards/cardmain';

const Home = () => {
  return (
    <div>
      <NavBarMain />
      <FirstPart />
      <CardMain />
    </div>
  );
};

export default Home;
