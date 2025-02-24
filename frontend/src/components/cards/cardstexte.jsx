import React from 'react';

const CardTexte = ({ title, description }) => {
  return (
    <div className="card-text">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardTexte;
