import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./selectreader.css";

const SelectReader = () => {
  const [reciters, setReciters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Updated reciter data with new image URLs
  const reciterData = [
    {
      id: 1,
      name: "Abdul Baset",
      style: "Murattal",
      image: "https://imgs.search.brave.com/-P9XuMZ3iifHWkkAj8BLUZPZZ1thUjOL6-ad9AE6HFs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzUyLzk1/L2FlLzUyOTVhZTdj/MDhlNGViZGM3ZWRh/M2RkYjVjNmMwYTE5/LmpwZw",
      bio: "Abdul Baset Abdul Samad was an Egyptian Qari. He was notable for his recitation of the Qur'an, and had precise tajwid, or pronunciation, which followed the rules of recitation.",
      fullBio: "Sheikh Abdul Baset Abdul Samad was born in 1927 in a village in Nile Delta, Egypt. He is one of the most renowned reciters of the Quran in the 20th century. His captivating voice earned him the title 'The Golden Throat'. He memorized the Quran at an early age and mastered the art of recitation. He has recorded complete Quranic recitations in both Murattal (at normal pace) and Mujawwad (at a more detailed and artistic pace) styles."
    },
    {
      id: 3,
      name: "Abdurrahmaan As-Sudais",
      style: "Murattal",
      image: "https://imgs.search.brave.com/F1Hv8DEwoScMieEwl6f3OCoisnFRorqJhdxmMtz7Kvc/rs:fit:500:0:0:0/g:ce/aHR0cDovL3d3dy5h/c3NhamRhLmNvbS9t/ZWRpYS9wZXJzb24v/c3F1YXJlL2FiZHVs/LXJhaG1hbi1hbC1z/dWRhaXMuanBn",
      bio: "Sheikh Abdur-Rahman Al-Sudais is the current imam of the Grand Mosque in Mecca, Saudi Arabia. He is renowned for his beautiful voice in reciting the Quran.",
      fullBio: "Sheikh Abdur-Rahman Al-Sudais was born in 1960 in Riyadh, Saudi Arabia. He memorized the Quran at age 12 and graduated from Riyadh University with a degree in Sharia and later obtained a PhD. He was appointed as an imam of the Grand Mosque in Mecca in 1984. His emotional style of recitation has made him popular worldwide, and he has been appointed the head of the Presidency for the Two Holy Mosques."
    },
    {
      id: 4,
      name: "Abu Bakr Shatri",
      style: "Murattal",
      image: "https://imgs.search.brave.com/1bN-sVoJQnXkyisZSfRU-9zPKHMRcWeHCWLFfleSUWg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2L2M2/LzMzL2Q2YzYzM2Fh/ZGI4MmNlMmQ5NzRk/MTE0N2VkMDcxMDkw/LmpwZw",
      bio: "Sheikh Abu Bakr Al-Shatri is a Saudi Qari known for his melodious recitation style. He is one of the imams of the Grand Mosque in Mecca.",
      fullBio: "Sheikh Abu Bakr Al-Shatri was born in 1970 in Jeddah, Saudi Arabia. He memorized the Quran at an early age and has studied under several prominent scholars. His unique recitation style combines traditional tajweed rules with a distinctively emotional and melodious approach. He has led prayers at the Grand Mosque in Mecca and has recited at numerous international Islamic conferences."
    },
    {
      id: 5,
      name: "Hani Ar-Rifai",
      style: "Murattal",
      image: "https://imgs.search.brave.com/GLCiwqMk7PGxniiYHuWCg6MAixhnB0qHY2YnUxOYnOU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hcGky/LnF1cmFuLXByby5j/b20vaW1hZ2VzL2hh/bmktYXItcmlmYWkv/aGFuaS1hci1yaWZh/aS1tZWRpdW0ud2Vi/cD92ZXJzaW9uPTE2/ODY3Mzc5OTc5MDc",
      bio: "Sheikh Hani ibn Abdul-Aziz Ar-Rifai is a renowned Quran reciter born in 1941 in Riyadh, Saudi Arabia. He studied Quranic recitation under several prominent scholars and has served as an imam at various prestigious mosques.",
      fullBio: "Sheikh Hani ibn Abdul-Aziz Ar-Rifai was born in 1941 in Riyadh, Saudi Arabia. He began memorizing the Quran at an early age under the guidance of his father, who was also a scholar. He later studied Quranic sciences and recitation under Sheikh Abdullah Al-Khalaf and Sheikh Ibrahim Al-Akhdar. Sheikh Hani served as the imam of several mosques in Riyadh and later at the Prophet's Mosque in Medina. His beautiful voice and adherence to proper tajweed (recitation rules) made his recordings highly sought after throughout the Muslim world."
    },
    {
      id: 6,
      name: "Khalil Al-Husary",
      style: "Murattal",
      image: "https://imgs.search.brave.com/x0VCPoc-m0O8n0olcKA3s76o6Q20yREnnizgxeQX83o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hcGky/LnF1cmFuLXByby5j/b20vaW1hZ2VzL21h/aG1vdWQta2hhbGls/LWFsLWh1c3Nhcnkv/bWFobW91ZC1raGFs/aWwtYWwtaHVzc2Fy/eS1tZWRpdW0ud2Vi/cD92ZXJzaW9uPTE2/ODY3MzgxOTkwNjA",
      bio: "Mahmoud Khalil Al-Husary was an Egyptian Qur'an reciter and one of the most famous Qurra' of the 20th century.",
      fullBio: "Sheikh Mahmoud Khalil Al-Husary (1917-1980) was born in a village in Tanta, Egypt. He memorized the Quran at a young age and became renowned for his precise recitation and adherence to tajweed rules. He was appointed as a reciter at the Egyptian Radio in 1944 and made numerous recordings that are still widely used today."
    },
    {
      id: 7,
      name: "Mishari Al-Afasy",
      style: "Murattal",
      image: "https://imgs.search.brave.com/QyE872B75Ht0gkGiYAUgaloTDsbsby6NiLBVRG8kFXc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMucXVyYW5jZG4u/Y29tL2ltYWdlcy9y/ZWNpdGVycy82L21p/c2hhcnktcmFzaGlk/LWFsYWZhc3ktcHJv/ZmlsZS5qcGVnP3Y9/MQ",
      bio: "Mishari Rashid Al-Afasy is a Kuwaiti Qari and imam at the Grand Mosque of Kuwait.",
      fullBio: "Sheikh Mishari Rashid Al-Afasy was born in Kuwait in 1976. He is renowned for his beautiful voice and emotional style of recitation. He has memorized the Quran and studied Islamic Studies at the Islamic University of Madinah. Besides being a Quran reciter, he is also a renowned nasheed artist."
    },
    {
      id: 8,
      name: "Muhammad Siddiq Al-Minshawi",
      style: "Murattal",
      image: "https://imgs.search.brave.com/D_rI7yjsDAh8V4jUNyHytwOSi9mIp1wjoOJNpdlObNA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9lL2VlL0Vs/bWluc2h3ZXkuanBn/LzUxMnB4LUVsbWlu/c2h3ZXkuanBn",
      bio: "Muhammad Siddiq Al-Minshawi was an Egyptian Qari known for his melodious voice and mastery of maqamat.",
      fullBio: "Sheikh Muhammad Siddiq Al-Minshawi (1920-1969) was born in Egypt and began learning the Quran at a very young age. He became one of the most prominent Quran reciters in Egypt and the Islamic world. His unique style combined perfect tajweed with masterful use of Arabic maqamat (melodic modes)."
    },
    {
      id: 10,
      name: "Saud Al-Shuraim",
      style: "Murattal",
      image: "https://imgs.search.brave.com/3RBlwsbNgxv-Ihv_VbAjgDWYk8kaqsUJMkTmdnCiW-c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMucXVyYW5jZG4u/Y29tL2ltYWdlcy9y/ZWNpdGVycy84L3Nh/b3VkLXNodXJhaW0t/cHJvZmlsZS5qcGVn/P3Y9MQ",
      bio: "Dr. Saud Al-Shuraim is one of the imams of the Grand Mosque in Mecca and a renowned Quran reciter.",
      fullBio: "Sheikh Dr. Saud Al-Shuraim was born in 1966 in Riyadh, Saudi Arabia. He memorized the Quran in his youth and holds a doctorate in Islamic law. He has been serving as one of the imams of the Grand Mosque in Mecca since 1991. His distinctive voice and recitation style have made him one of the most recognized Quran reciters globally."
    }
  ];

  useEffect(() => {
    // Simulate API fetch - in a real app, replace with actual API call
    const fetchReciters = async () => {
      try {
        setLoading(true);
        // For demonstration, using our sample data
        // In a real app, you would fetch from an API:
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        
        // Simulating API delay
        setTimeout(() => {
          setReciters(reciterData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load reciters. Please try again later.");
        setLoading(false);
        console.error("Error fetching reciters:", err);
      }
    };

    fetchReciters();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Filter reciters based on search term
  const filteredReciters = reciters.filter(reciter =>
    reciter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle reciter selection
  const handleReciterClick = (reciter) => {
    // Navigate to the PlayQuran page with the reciter's details
    navigate(`/playquran/${reciter.id}`, { state: { reciter } });
  };

  return (
    <div className="select-reader-container">
      <div className="header-section">
        <h1>Quran Reciters</h1>
        <div className="new-search-container">
          <form className="new-search-form">
            <FaSearch className="new-search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Reciter"
              className="new-search-input"
            />
          </form>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading reciters...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="reciters-grid">
          {filteredReciters.map((reciter) => (
            <div
              key={reciter.id}
              className="reciter-card"
              onClick={() => handleReciterClick(reciter)}
            >
              <div className="reciter-image">
                <img src={reciter.image} alt={`${reciter.name}`} />
              </div>
              <div className="reciter-info">
                <h3>{reciter.name}</h3>
                <p>{reciter.style}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectReader;
