import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LEVEL_META } from '../api/trafficApi';

const MOSCOW_CENTER = [55.7558, 37.6173];

export default function TrafficMap({ segments, onSelect }) {
  return (
    <MapContainer
      center={MOSCOW_CENTER}
      zoom={11}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {segments.map((segment) => {
        const meta = LEVEL_META[segment.level];
        return (
          <CircleMarker
            key={segment.id}
            center={segment.coordinates}
            radius={12}
            pathOptions={{
              color: '#222',
              weight: 1.5,
              fillColor: meta.color,
              fillOpacity: 0.85,
            }}
            eventHandlers={{
              click: () => onSelect && onSelect(segment),
            }}
          >
            <Popup>
              <div style={{ minWidth: 200 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                  {segment.name}
                </div>
                <div style={{ fontSize: 13, color: '#444', marginBottom: 6 }}>
                  {segment.description}
                </div>
                <div style={{ fontSize: 13 }}>
                  <span style={{ color: meta.color, fontWeight: 600 }}>
                    {meta.label}
                  </span>{' '}
                  · {segment.speedKmh} км/ч
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
