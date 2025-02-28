import React from 'react';

export const Card = ({ title }: { title: string }) => {
  return (
    <div style={{ border: '1px solid gray', padding: '20px' }}>
      <h2>{title}</h2>
    </div>
  );
};