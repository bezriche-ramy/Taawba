import React from 'react';

const CardTexte = ({ title, description }) => {
  return (
    <div className="card-text" style={{
      display: 'block',
      visibility: 'visible',
      opacity: 1,
      background: 'white',
      padding: '10px',
      borderRadius: '8px',
      width: '100%',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{
        color: '#000000',
        fontSize: '1.35rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        display: 'block'
      }}>
        {title || "Title Goes Here"}
      </h3>
      <p style={{
        color: '#000000',
        fontSize: '0.95rem',
        lineHeight: 1.6,
        display: 'block'
      }}>
        {description || "Description text goes here. This is placeholder content."}
      </p>
    </div>
  );
};

export default CardTexte;
