import React from 'react';
import './NavBarButton.css';

const NavBarButton = ({ type, children, handleClick }) => {
  return (
    <button className={`nav-button ${type}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default NavBarButton;
