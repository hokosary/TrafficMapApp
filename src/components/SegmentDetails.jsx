import React from 'react';
import { LEVEL_META } from '../api/trafficApi';

export default function SegmentDetails({ segment, onClose }) {
  if (!segment) return null;
  const meta = LEVEL_META[segment.level];

  return (
    <div style={{ 
      padding: 14, 
      backgroundColor: '#fff', 
      borderTop: '1px solid #eee',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 17, color: '#222' }}>{segment.name}</h3>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: 18, color: '#888', cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>

      <p style={{ margin: '4px 0 0', fontSize: 14, color: '#555' }}>{segment.description}</p>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, gap: 12 }}>
        <div style={{ 
          backgroundColor: meta.color, 
          color: '#fff', 
          padding: '4px 10px', 
          borderRadius: 12,
          fontSize: 13,
          fontWeight: '600'
        }}>
          {meta.label}
        </div>
        <span style={{ fontSize: 14, color: '#333' }}>Скорость: {segment.speedKmh} км/ч</span>
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        Обновлено: {new Date(segment.updatedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
