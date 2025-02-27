import React from 'react';

const ReciterCard = ({ reciter, onClick }) => {
  return (
    <div 
      className="reciter-card"
      onClick={onClick}
    >
      <div className="reciter-image">
        <img src={reciter.image} alt={`${reciter.name}`} />
      </div>
      <div className="reciter-info">
        <h3>{reciter.name}</h3>
        <p>{reciter.style}</p>
      </div>
    </div>
  );
};

export default ReciterCard;
