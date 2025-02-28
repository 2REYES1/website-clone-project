import React from 'react';

export const Button = ({ children }: { children: React.ReactNode }) => {
  return <button style={{ padding: '10px', background: 'transparent', color: 'white', border: '1px solid white' }}>{children}</button>;
};