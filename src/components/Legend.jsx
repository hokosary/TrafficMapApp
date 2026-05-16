import React from 'react';
import { LEVEL_META } from '../api/trafficApi';

export default function Legend() {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '6px 0' }}>
      {Object.entries(LEVEL_META).map(([key, meta]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: 14, 
            height: 14, 
            borderRadius: '50%', 
            backgroundColor: meta.color,
            marginRight: 6,
            border: '1px solid #222'
          }} />
          <span style={{ fontSize: 13, color: '#333' }}>{meta.label}</span>
        </div>
      ))}
    </div>
  );
}
