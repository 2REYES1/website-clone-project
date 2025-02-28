import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Card } from './index';

const App = () => (
  <div>
    <Button>Click Me</Button>
    <Card title="Sample Card" />
  </div>
);

createRoot(document.getElementById('root')!).render(<App />);