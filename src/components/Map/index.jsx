import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Sample data for users
const users = [
  { id: 1, name: "Award Center name", position: [-1.286389, 36.817223] }, // Nairobi
  { id: 2, name: "Nicholas Njeru", position: [-1.170913937641522, 36.9785798900255] }, // Mombasa
  { id: 3, name: "Nicks silver", position: [-1.1701074292677678, 36.976588537675944] }, // Eldoret
];

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const UserMap = () => {
  return (
    <MapContainer
      className="p-5 z-10 rounded-md"
      center={[users[0].position[0], users[0].position[1]]}
      zoom={13}
      style={{
        height: "45vh",
        width: "100%",
        boxShadow:
          "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
      }}>
      <TileLayer
        className=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=' <a href="#">Presidents Awards Kenya</a> Award centers'
      />

      {users.map((user) => (
        <Marker key={user.id} position={user.position}>
          <Popup>{user.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default UserMap;
