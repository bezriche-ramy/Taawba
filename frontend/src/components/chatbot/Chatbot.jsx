import React, { useState, useEffect, useRef } from 'react';
import ChatMessage, { LoadingMessage } from './ChatMessage';
import MessageInput from './MessageInput';
import ContentCard from './ContentCard';
import { sendMessage } from './chatbotService';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Content cards data - keeping the same icon type names
  const contentCards = [
    {
      id: 1,
      title: "Dua to Make",
      subtitle: "Dua for Forgiveness",
      icon: "prayer"
    },
    {
      id: 2,
      title: "Fasting Tips",
      subtitle: "Stay Healthy in Ramadan",
      icon: "crescent"
    },
    {
      id: 3,
      title: "Prayer Times",
      subtitle: "Calculate Your Schedule",
      icon: "mosque"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(text);
      
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble processing your request right now.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="islamic-app-container">
      <div className="islamic-app-header">
        <div className="header-content">
          <div className="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
              <path d="M12 8c-2.8 0-5 1.6-5 4s2.2 4 5 4 5-1.6 5-4-2.2-4-5-4z"></path>
              <path d="M8 16l-1.2 4.8M16 16l1.2 4.8"></path>
              <path d="M12 2v4M4 6l2 2M2 12h4M4 18l2-2M20 6l-2 2M22 12h-4M20 18l-2-2"></path>
            </svg>
          </div>
          <h1>Ramadan Assistant</h1>
        </div>
        <div className="geometric-pattern"></div>
      </div>
      
      <div className="content-section">
        <div className="content-section-header">
          <h2>Ramadan Resources</h2>
        </div>
        <div className="content-cards-container">
          {contentCards.map(card => (
            <ContentCard 
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              iconType={card.icon}
            />
          ))}
        </div>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message card-text">
            As-salamu alaykum! How can I assist you with Ramadan-related questions?
          </div>
        ) : (
          messages.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isUser={message.isUser} 
            />
          ))
        )}
        {isLoading && <LoadingMessage />}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="app-footer">
        <div className="disclaimer-text">
          Always consult qualified Islamic scholars for religious guidance.
        </div>
        <div className="footer-links">
          <a href="#subscribe" className="subscribe-link">Subscribe for Daily Reminders</a>
          <span className="guest-mode">Guest Mode</span>
        </div>
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Chatbot;
