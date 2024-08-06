const TextToSpeechButton = ({ text, audioCache }) => {
  const handleClick = async () => {
    const audioUrl = audioCache[text];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      console.error("Audio URL not found in cache.");
    }
  };

  return (
    <button onClick={handleClick} className='p-2 bg-green-500 text-white rounded'>
      Play
    </button>
  );
};

export default TextToSpeechButton;
