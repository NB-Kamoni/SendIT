import React, { useState } from 'react';
import './TrackingTool.css'; // Ensure you create this CSS file for styling
import { FaMicrophone, FaSearch } from 'react-icons/fa'; // Import microphone icon from react-icons
import TrackingPopCard from './TrackingPopCard'; // Import PopCard component

const TrackingTool = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [results, setResults] = useState(null);
  const [showPopCard, setShowPopCard] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Initialize SpeechRecognition API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Handle voice search
  const startVoiceSearch = () => {
    if (!recognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    recognition.lang = 'en-US';
    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTrackingNumber(transcript);
      handleSearch(transcript); // Perform search with voice input
      setIsRecording(false); // Stop recording after getting the result
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://sendit-server-j68q.onrender.com//client/parcels/track/${query}`);
      const data = await response.json();
      setResults(data);
      setShowPopCard(true); //  PopCard with search results
    } catch (error) {
      console.error('Error fetching tracking results:', error);
      setResults(null); 
      setShowPopCard(true); 
    }
  };

  const handleCloseCard = () => {
    setShowPopCard(false);
  };

  return (
    <div className="tracking-tool">
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter Tracking Number"
      />
      <button onClick={() => handleSearch(trackingNumber)}><FaSearch /></button>
      <button
        className={`voice-button ${isRecording ? 'recording' : ''}`}
        onClick={startVoiceSearch}
        aria-label="Start voice search"
      >
        <FaMicrophone />
      </button>
      
      {showPopCard && <TrackingPopCard results={results} onClose={handleCloseCard} />}
    </div>
  );
};

export default TrackingTool;
