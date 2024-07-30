import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TypingEffect = ({ texts = [], speed = 100, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState(''); // Track displayed text
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index in the current text
  const [currentSentence, setCurrentSentence] = useState(0); // Track which sentence is being typed
  const [typing, setTyping] = useState(true); // Track if typing or pausing

  useEffect(() => {
    const handleTyping = () => {
      if (currentIndex < texts[currentSentence].length && typing) {
        // Add the next character
        setDisplayedText((prevText) => prevText + texts[currentSentence][currentIndex]);
        setCurrentIndex(currentIndex + 1);
      } else if (typing) {
        // Pause after finishing typing
        setTyping(false);
        setTimeout(() => {
          setTyping(true); // Resume typing
          setDisplayedText(''); // Clear the text for next sentence
          setCurrentIndex(0); // Reset the current index
          setCurrentSentence((currentSentence + 1) % texts.length); // Move to the next sentence
        }, pause); // Pause before restarting
      }
    };

    const typingTimeout = setTimeout(handleTyping, speed); // Control typing speed

    return () => {
      clearTimeout(typingTimeout); // Clean up the timeout on unmount
    };
  }, [currentIndex, texts, currentSentence, typing, pause, speed]); // Correct dependencies

  return <span style={{}}><h1>{displayedText}</h1></span>; // Display the typing effect
};

TypingEffect.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string), // Ensure texts is an array of strings
  speed: PropTypes.number, // Ensure speed is a number
  pause: PropTypes.number, // Ensure pause is a number for delay after typing
};

// Example usage
const App = () => (
  <div>
    <TypingEffect
      texts={["kkkk", "nnn", "kkk"]}
      speed={100} // Speed in milliseconds
      pause={1000} // Pause for 1 second after typing
    />
  </div>
);

export default TypingEffect;