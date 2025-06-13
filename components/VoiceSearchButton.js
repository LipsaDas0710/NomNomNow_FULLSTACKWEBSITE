import { useState } from "react";
import { FaMicrophone } from 'react-icons/fa';

const VoiceSearchButton = ({ onResult }) => {
  const [listening, setListening] = useState(false);

  const handleVoiceSearch = () => {
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript); // Send the result to parent
      console.log(transcript);
    };

    recognition.onerror = (event) => {
  if (event.error === "aborted") {
    console.warn("Speech recognition was aborted (likely harmless).");
  } else {
    console.error("Speech recognition error:", event.error);
  }
  setListening(false);
};


    recognition.start();
    setTimeout(() => {
      if (listening) recognition.stop();
    }, 11000); // 8 seconds
    
  };

  return (
    <button
      onClick={!listening ? handleVoiceSearch : undefined}
      disabled={listening}
      className="mr-2"
    >
    {listening ? <FaMicrophone className="text-gray-500 text-lg" /> : <FaMicrophone className="text-gray-700 text-lg" />}
    </button>
  );
};

export default VoiceSearchButton;
