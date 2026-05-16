import React, { useState, useEffect, useCallback } from 'react';
import TrafficMap from '../components/TrafficMap';
import Legend from '../components/Legend';
import SegmentDetails from '../components/SegmentDetails';
import { fetchTrafficData } from '../api/trafficApi';

export default function MapScreen() {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTrafficData();
      setSegments(data);
      setLastUpdated(new Date());
      setSelected((prev) =>
        prev ? data.find((s) => s.id === prev.id) || null : null
      );
    } catch (e) {
      setError(e.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '12px 14px 8px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <h1 style={{ margin: 0, fontSize: 18, color: '#222' }}>Карта дорожной обстановки</h1>
          <button 
            onClick={loadData} 
            disabled={loading}
            style={{ 
              padding: '6px 12px', 
              backgroundColor: loading ? '#ccc' : '#007bff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 4,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Загрузка...' : 'Обновить данные'}
          </button>
        </div>
        <Legend />
        {lastUpdated && !loading && (
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
            Последнее обновление: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
        {error && <div style={{ marginTop: 6, fontSize: 13, color: '#c62828' }}>⚠ {error}</div>}
      </div>

      <div style={{ flex: 1, position: 'relative', minHeight: 400 }}>
        <TrafficMap segments={segments} onSelect={setSelected} />
        {loading && (
          <div style={{ 
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(255,255,255,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ 
              padding: '10px 20px', 
              background: '#fff', 
              borderRadius: 8, 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              fontWeight: 'bold'
            }}>
              Загрузка данных...
            </div>
          </div>
        )}
      </div>

      {selected && (
        <SegmentDetails
          segment={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
