import React from 'react';

const NavBarButton = ({ type, children }) => {
  return (
    <button className={`nav-button ${type}`}>
      {children}
    </button>
  );
};

export default NavBarButton;
