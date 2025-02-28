import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Card, ThreeDBook } from './index';

const App = () => (
  <div>
    <Button>Click Me</Button>
    <Card title="Sample Card" />

    {/* Wrap the ThreeDBook component in a div and set its size */}
    <div style={{ width: '800px', height: '800px' }}>  {/* Adjust size as needed */}
      <ThreeDBook />
    </div>
  </div>
);

createRoot(document.getElementById('root')!).render(<App />);
