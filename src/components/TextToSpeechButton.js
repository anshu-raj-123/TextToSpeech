import { useState } from 'react';

const TextToSpeechButton = ({ text }) => {
  const handleClick = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Microsoft Indian English');
    speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleClick}
      className='p-2 bg-green-500 text-white rounded'
    >
      Play
    </button>
  );
};

export default TextToSpeechButton;
