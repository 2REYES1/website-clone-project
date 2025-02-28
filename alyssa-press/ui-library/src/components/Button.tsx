import React from 'react';

export const Button = ({ children }: { children: React.ReactNode }) => {
  return <button style={{ padding: '10px', background: 'blue', color: 'white' }}>{children}</button>;
};