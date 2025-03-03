import React from 'react';
import './challanges.css';
import ProgressTracker from '../components/challenges/ProgressTracker';
import ChallengeCard from '../components/challenges/ChallengeCard';
import CommunityStats from '../components/challenges/CommunityStats';

const ChallangesPage = () => {
  // Mock data - would come from database in production
  const progressData = {
    achievementLevel: 3, // 3 stars
    totalDays: 30
  };

  const challenges = [
    {
      id: 1,
      name: 'Daily Quran Reading',
      description: 'Read and reflect daily',
      icon: 'quran',
      progress: 75,
      isCompleted: true,
      xpReward: 50
    },
    {
      id: 2,
      name: 'Dawn Prayer',
      description: 'Start your day with Fajr prayer',
      icon: 'prayer-mat',
      progress: 60,
      isCompleted: false,
      xpReward: 75
    },
    {
      id: 3,
      name: 'Dhikr Practice',
      description: 'Remember Allah throughout your day',
      icon: 'dhikr-beads',
      progress: 90,
      isCompleted: true,
      xpReward: 40
    }
  ];

  const communityData = {
    participants: 1234,
    startDate: 'Jan 1, 2025',
    endDate: 'Jan 30, 2025'
  };

  return (
    <div className="challenges-container">
      <header className="challenges-header">
        <h1>30-Day Challenge</h1>
        <p className="subtitle">Begin your spiritual journey today</p>
      </header>

      <ProgressTracker 
        achievementLevel={progressData.achievementLevel}
        totalDays={progressData.totalDays}
      />

      <div className="challenge-cards-container">
        {challenges.map(challenge => (
          <ChallengeCard 
            key={challenge.id}
            name={challenge.name}
            description={challenge.description}
            icon={challenge.icon}
            progress={challenge.progress}
            isCompleted={challenge.isCompleted}
            xpReward={challenge.xpReward}
          />
        ))}
      </div>

      <CommunityStats
        participants={communityData.participants}
        startDate={communityData.startDate}
        endDate={communityData.endDate}
      />

      <div className="action-button-container">
        <button className="join-button">Join Challenge</button>
      </div>
    </div>
  );
};

export default ChallangesPage;
