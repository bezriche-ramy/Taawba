import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./selectreader.css";

const SelectReader = () => {
  const [reciters, setReciters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Updated reciter data with only the 4 requested reciters
  const reciterData = [
    {
      id: 1,
      name: "Abdul Baset",
      style: "Murattal",
      image: "https://i.imgur.com/jTtdN2P.jpg"
    },
    {
      id: 3,
      name: "Abdurrahmaan As-Sudais",
      style: "Murattal",
      image: "https://i.imgur.com/XlgCJYN.jpg"
    },
    {
      id: 4,
      name: "Abu Bakr Shatri",
      style: "Murattal",
      image: "https://i.imgur.com/eCCeOZu.jpg"
    },
    {
      id: 5,
      name: "Hani Ar-Rifai",
      style: "Murattal",
      image: "https://i.imgur.com/JWUXiKR.jpg"
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
    setSearchTerm(e.target.value);
  };

  // Filter reciters based on search term
  const filteredReciters = reciters.filter(reciter =>
    reciter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle reciter selection
  const handleReciterClick = (reciterId) => {
    console.log(`Selected reciter: ${reciterId}`);
    // Navigate to reciter details or handle selection
    // In a real app, you would navigate to a page with the reciter's content
    // Example: history.push(`/reciter/${reciterId}`);
  };

  return (
    <div className="select-reader-container">
      <div className="header-section">
        <h1>Quran Reciters</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Reciter"
            value={searchTerm}
            onChange={handleSearch}
          />
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
              onClick={() => handleReciterClick(reciter.id)}
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
