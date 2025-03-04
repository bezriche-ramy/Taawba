import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarMain from '../components/navbar/NavBarMain';
import { FiEdit2, FiMapPin, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { FaTrophy, FaRegCalendarCheck, FaBookOpen, FaMosque } from 'react-icons/fa';
import './profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get user data from session storage
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect if not logged in
      navigate('/authentication?mode=login');
    }
    setLoading(false);
  }, [navigate]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="profile-container">
        <NavBarMain />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by the useEffect
  }

  return (
    <div className="profile-container">
      <NavBarMain />
      
      <div className="profile-content">
        {/* Header Section - Remove back button since we have navbar */}
        <div className="profile-header-section">
          <div className="profile-banner">
            <div></div> {/* Empty div to maintain flex spacing */}
            <button className="edit-profile-button">
              <FiEdit2 /> Edit Profile
            </button>
          </div>

          <div className="profile-avatar-container">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="profile-avatar" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {getInitials(user.displayName || user.email)}
              </div>
            )}
            <div className="profile-avatar-edit">
              <FiEdit2 />
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="profile-user-info">
          <h1 className="profile-name">{user.displayName || 'User'}</h1>
          <p className="profile-username">@{user.displayName?.toLowerCase().replace(/\s/g, '_') || 'user'}</p>
          <div className="profile-bio">
            <p>Dedicated Muslim seeking knowledge and spiritual growth. Passionate about Quranic studies and daily Islamic practice.</p>
          </div>
          <div className="profile-meta">
            <span className="profile-meta-item"><FiMapPin /> Dubai, UAE</span>
            <span className="profile-meta-item"><FiCalendar /> Joined August 2023</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-section">
          <h2 className="section-title">Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">28</div>
              <div className="stat-label">Age</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">156</div>
              <div className="stat-label">Challenges</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">45</div>
              <div className="stat-label">Day Streak</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">85%</div>
              <div className="stat-label">Completion</div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="profile-section">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon gold">
                <FaTrophy />
              </div>
              <div className="achievement-name">First Prayer</div>
              <div className="achievement-progress">Completed</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon silver">
                <FaBookOpen />
              </div>
              <div className="achievement-name">Quran Reader</div>
              <div className="achievement-progress">Completed</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon bronze">
                <FaMosque />
              </div>
              <div className="achievement-name">Mosque Visit</div>
              <div className="achievement-progress">Completed</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <FaRegCalendarCheck />
              </div>
              <div className="achievement-name">Daily Dhikr</div>
              <div className="achievement-progress">23/30 days</div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="profile-section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-timeline">
            <div className="activity-item">
              <div className="activity-icon"><FaBookOpen /></div>
              <div className="activity-content">
                <h4>Completed Surah Al-Baqarah</h4>
                <p>Finished reading the entire surah with translation</p>
                <span className="activity-time">2 days ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><FaMosque /></div>
              <div className="activity-content">
                <h4>Attended Jummah Prayer</h4>
                <p>At Central Mosque Dubai</p>
                <span className="activity-time">5 days ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><FaRegCalendarCheck /></div>
              <div className="activity-content">
                <h4>Completed Ramadan Challenge</h4>
                <p>30 days of fasting and prayer</p>
                <span className="activity-time">2 months ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="profile-section">
          <h2 className="section-title">Community</h2>
          <p className="community-text">Connected with 245 other members</p>
          <div className="community-avatars">
            {Array(8).fill().map((_, i) => (
              <div key={i} className="community-avatar">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="community-avatar more">+237</div>
          </div>
          <button className="view-all-button">View All Connections</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;