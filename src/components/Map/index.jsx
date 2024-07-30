import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Sample data for users
const users = [
    { id: 1, name: 'Award Center name', position: [-1.286389, 36.817223] }, // Nairobi
    { id: 2, name: 'User 2', position: [-3.9381, 39.8554] }, // Mombasa
    { id: 3, name: 'User 3', position: [0.514277, 35.269779] }, // Eldoret
  ];

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const UserMap = () => {
  return (
    <MapContainer className='p-5 z-10' center={[51.505, -0.09]} zoom={13} style={{ height: '45vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=' <a href="https://www.openstreetmap.org/copyright">Presidents Awards Kenya</a> Award centers'
      />
      {users.map((user) => (
        <Marker key={user.id} position={user.position}>
          <Popup>
            {user.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default UserMap;
