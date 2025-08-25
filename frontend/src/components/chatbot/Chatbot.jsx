import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import { sendMessage, getQuickResponse } from './chatbotService';
import { FaMosque, FaMoon, FaSun } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message in Arabic
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: 'السلام عليكم! أنا تَوْبَة، مساعدك الذكي الإسلامي. أبحث على الويب من مواقع السنة الموثوقة لتقديم معلومات دقيقة لك. كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      timestamp: new Date(),
      isWelcome: true
    };
    setMessages([welcomeMessage]);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Check for quick response first
    const quickResponse = getQuickResponse(messageText);
    if (quickResponse) {
      const botMessage = {
        id: Date.now() + 1,
        text: quickResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    // Show loading message
    setIsLoading(true);
    const loadingMessage = {
      id: Date.now() + 2,
      text: 'تَوْبَة يفكر...',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Get AI response with timeout
      const response = await Promise.race([
        sendMessage(messageText),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 35000)
        )
      ]);
      
      // Remove loading message and add AI response
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      
      if (response) {
        const botMessage = {
          id: Date.now() + 3,
          text: response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // If no response, show error
        const errorMessage = {
          id: Date.now() + 4,
          text: 'عذراً، لم أتمكن من الحصول على إجابة. يرجى المحاولة مرة أخرى أو التأكد من صياغة سؤالك.',
          isUser: false,
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Remove loading message and add error message
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      
      let errorText = 'عذراً، حدث خطأ في الحصول على الإجابة. يرجى المحاولة مرة أخرى.';
      
      if (error.message === 'Request timeout') {
        errorText = 'عذراً، استغرق البحث وقتاً طويلاً. يرجى المحاولة مرة أخرى أو إعادة صياغة سؤالك.';
      } else if (error.message.includes('API')) {
        errorText = 'عذراً، أعاني من مشكلة في خدمة البحث. يرجى المحاولة مرة أخرى بعد قليل.';
      }
      
      const errorMessage = {
        id: Date.now() + 4,
        text: errorText,
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`modern-chatbot-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header Section */}
      <div className="chatbot-header">
        <div className="header-content">
          <div className="header-icon">
            <div className="icon-circle">
              <FaMosque className="icon-svg" />
            </div>
          </div>
          <div className="header-text">
            <h1>تَوْبَة</h1>
            <p>المساعد الذكي الإسلامي - يبحث في مواقع السنة الموثوقة</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="theme-toggle-btn" onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
          </button>
        </div>
        
        <div className="header-decoration">
          <div className="geometric-pattern"></div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="chat-header">
          <h3>محادثة مع تَوْبَة</h3>
        </div>

        {/* Messages Container */}
        <div className="messages-container">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isDarkMode={isDarkMode}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} isDarkMode={isDarkMode} />
      </div>

      {/* Footer */}
      <div className="chatbot-footer">
        <div className="footer-content">
          <div className="disclaimer">
            <FaMosque className="footer-icon" />
            <span>تَوْبَة يبحث في مواقع السنة الموثوقة لتقديم معلومات دقيقة. للحكم المحدد، استشر العلماء المؤهلين.</span>
          </div>
          <div className="footer-links">
            <button className="footer-btn">مواقع موثوقة</button>
            <button className="footer-btn">عن تَوْبَة</button>
            <button className="footer-btn">المساعدة</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
