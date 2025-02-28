import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardLogo from './cardlogo';
import CardTexte from './cardstexte';
import NavBarButton from '../navbar/NavBarButton';
import './cards.css';

const CardMain = () => {
  const navigate = useNavigate();
  
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
      description: "Participate in fun challenges to enhance your Ramadan."
    },
    {
      image: "https://images.pexels.com/photos/2989625/pexels-photo-2989625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Join Our Community",
      description: "Connect with others and share your Ramadan journey progress and challenges."
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
      
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <div 
            key={index} 
            className="feature-card"
            onClick={card.onClick}
            style={{ 
              cursor: card.onClick ? 'pointer' : 'default',
              margin: window.innerWidth <= 768 ? '0 0 1rem 0' : '0 auto 1rem auto' // Left alignment on mobile
            }}
          >
            <CardLogo imageSrc={card.image} altText={card.title} />
            <CardTexte title={card.title} description={card.description} />
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
