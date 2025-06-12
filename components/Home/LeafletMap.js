'use client';

import { MapContainer, TileLayer, Marker, Popup , useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useContext } from 'react';
import { UserLocationContext } from '../../context/UserlocationContext';
import Markers from './Markers';

// Fix missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl:          'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl:        'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});
const userIcon = L.icon({
  iconUrl: '/user-location.png', // Image path from public/
  iconSize: [50, 50],            // Size of the icon
  iconAnchor: [25, 50],          // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -50]          // Point from which the popup should open
});




export default function LeafletMap({ zoom = 16,businessList }) {
  const {userLocation,setUserLocation}=useContext(UserLocationContext)
  return (
    <MapContainer center={userLocation} zoom={zoom} style={{ height: '100vh', width: '100%',zIndex: 0  }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userLocation} icon={userIcon}>
        <Popup>You are here!</Popup>
      </Marker>

      <Markers businessList={businessList} />


    </MapContainer>
  );
}
