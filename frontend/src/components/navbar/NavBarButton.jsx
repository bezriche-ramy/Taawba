import React from 'react';
import './NavBarButton.css';

const NavBarButton = ({ type, children }) => {
  return (
    <button className={`nav-button ${type}`}>
      {children}
    </button>
  );
};

export default NavBarButton;
