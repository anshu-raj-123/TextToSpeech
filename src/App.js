import React from 'react';
import ChatBox from './components/ChatBox';

const App = () => {
  return (
    <div style={{ padding: '16px', backgroundColor: 'lightblue' }}>
  <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Select Characters</h1>
  <ChatBox />
</div>

  );
};

export default App;
