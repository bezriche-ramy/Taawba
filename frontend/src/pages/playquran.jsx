import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavBarMain from '../components/navbar/NavBarMain';
import ReciterProfile from '../components/playquran/ReciterProfile';
import ChapterList from '../components/playquran/ChapterList';
import AudioPlayer from '../components/playquran/AudioPlayer';
import SearchBar from '../components/playquran/SearchBar';
import quranData from './quran.json';
import './playquran.css';

const PlayQuran = () => {
  const { reciterId } = useParams();
  const location = useLocation();
  const reciterInfo = location.state?.reciter || {
    id: reciterId || 5, // Default to Hani Ar-Rifai if no reciter provided
    name: "Hani Ar-Rifai",
    style: "Murattal",
    image: "https://imgs.search.brave.com/GLCiwqMk7PGxniiYHuWCg6MAixhnB0qHY2YnUxOYnOU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hcGky/LnF1cmFuLXByby5j/b20vaW1hZ2VzL2hh/bmktYXItcmlmYWkv/aGFuaS1hci1yaWZh/aS1tZWRpdW0ud2Vi/cD92ZXJzaW9uPTE2/ODY3Mzc5OTc5MDc",
    bio: "Sheikh Hani ibn Abdul-Aziz Ar-Rifai is a renowned Quran reciter born in 1941 in Riyadh, Saudi Arabia. He studied Quranic recitation under several prominent scholars and has served as an imam at various prestigious mosques. His melodious recitation style has made him one of the most beloved reciters worldwide.",
    fullBio: "Sheikh Hani ibn Abdul-Aziz Ar-Rifai was born in 1941 in Riyadh, Saudi Arabia. He began memorizing the Quran at an early age under the guidance of his father, who was also a scholar. He later studied Quranic sciences and recitation under Sheikh Abdullah Al-Khalaf and Sheikh Ibrahim Al-Akhdar. Sheikh Hani served as the imam of several mosques in Riyadh and later at the Prophet's Mosque in Medina. His beautiful voice and adherence to proper tajweed (recitation rules) made his recordings highly sought after throughout the Muslim world. He has trained numerous students in the art of Quranic recitation and has participated in international Quranic conferences and competitions as a judge."
  };
  
  const [chapters, setChapters] = useState(quranData);
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch audio files for the selected reciter
  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterInfo.id}`);
        const data = await response.json();
        setAudioFiles(data.audio_files || []);
      } catch (error) {
        console.error('Error fetching audio files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFiles();
  }, [reciterInfo.id]);

  // Handle chapter search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setChapters(quranData);
    } else {
      const filtered = quranData.filter(
        chapter => 
          chapter.suraName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chapter.arabicName.includes(searchTerm) ||
          chapter.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chapter.id.toString() === searchTerm
      );
      setChapters(filtered);
    }
  }, [searchTerm]);

  const handlePlay = (chapter) => {
    const audioFile = audioFiles.find(file => file.chapter_id === chapter.id);
    if (audioFile) {
      setCurrentAudio({
        chapter,
        audioUrl: audioFile.audio_url
      });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="play-quran-page">
      <NavBarMain />
      <div className="quran-player-container">
        <div className="left-panel">
          <ReciterProfile reciter={reciterInfo} />
        </div>
        <div className="right-panel">
          <SearchBar onSearch={handleSearch} />
          <ChapterList 
            chapters={chapters} 
            onPlay={handlePlay} 
            loading={loading}
            audioFiles={audioFiles}
          />
        </div>
      </div>
      {currentAudio && (
        <AudioPlayer 
          audioUrl={currentAudio.audioUrl}
          chapter={currentAudio.chapter}
        />
      )}
    </div>
  );
};

export default PlayQuran;
