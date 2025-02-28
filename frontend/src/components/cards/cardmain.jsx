import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CardLogo from './cardlogo';
import CardTexte from './cardstexte';
import NavBarButton from '../navbar/NavBarButton';
import './cards.css';

const CardMain = () => {
  const navigate = useNavigate();
  const cardsRef = useRef(null);
  
  const cardsData = [
    {
      image: "https://c1.wallpaperflare.com/preview/682/173/209/quran-ramadhan-muslim-islamic-religious-mubarak.jpg",
      title: "Read the Quran Anytime, Anywhere",
      description: "Access the Quran with ease and convenience.",
      onClick: () => navigate('/readquran')
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Yasser_Al-Dosari.jpg/330px-Yasser_Al-Dosari.jpg",
      title: "Listen to Renowned Quran Reciters",
      description: "Enjoy beautiful recitations by top reciters.",
      onClick: () => navigate('/selectreader')
    },
    {
      image: "https://imgs.search.brave.com/ghAwSf8UNrV9iSQCPdmRB1qUmZD0WgoYqggoWj6gOb0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzFGOXBmU2d2YUwu/anBn",
      title: "Join Exciting Ramadan Challenges",
      description: "Participate in fun challenges to enhance your Ramadan.",
      onClick: () => navigate('/challenges')
    },
    {
      image: "https://imgs.search.brave.com/qZRwHhTAnttHrwPM1VuyTyNFHPhZXDGZXyFfU2_-99Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NzNiNWU0ODM5YTZh/ZDFlODNjZjNhMGUv/Njc1YzY0NTA0MmRl/NzBkNjQ2ZjFkOGM1/X2hhcXFib3Qud2Vi/cA", // Updated image URL for AI Assistant
      title: "Islamic AI Assistant",
      description: "Get answers to your Islamic questions with our AI chatbot assistant.",
      onClick: () => navigate('/chatbot')
    },
    {
      image: "https://img.freepik.com/free-photo/muslim-boy-learning-how-make-dua-allah_53876-25223.jpg",
      title: "Prayer Times",
      description: "Stay updated with accurate prayer times and notifications.",
      onClick: () => navigate('/prayertime')
    }
  ];

  return (
    <section className="features-section">
      <div className="features-header">
        <span className="welcome-text">Welcome</span>
        <h2>Explore Our Unique Ramadan Experience</h2>
        <p>Immerse yourself in the spiritual journey of Ramadan with our dedicated features. From reading the Quran to engaging challenges, we have everything you need.</p>
      </div>
      
      <div className="cards-container" ref={cardsRef}>
        {cardsData.map((card, index) => (
          <div 
            key={index} 
            className="feature-card"
            onClick={card.onClick}
            style={{ 
              cursor: card.onClick ? 'pointer' : 'default',
              backgroundColor: '#ffffff',
              position: 'relative',
              overflow: 'visible'
            }}
            role="button"
            tabIndex={0}
            aria-label={`Feature: ${card.title}`}
          >
            <CardLogo imageSrc={card.image} altText={card.title} />
            <div style={{position: 'relative', zIndex: 20, width: '100%'}}>
              <CardTexte title={card.title} description={card.description} />
            </div>
          </div>
        ))}
      </div>

      <div className="features-buttons">
        <NavBarButton type="explore">Learn More</NavBarButton>
        <NavBarButton type="signup">Sign Up →</NavBarButton>
      </div>
    </section>
  );
};

export default CardMain;
