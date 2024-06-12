import React, { useState } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout'

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    institutionName: '',
    subCounty: '',
    county: '',
    awardLevel: '',
    awardLeader: '',
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewParticipant({
      name: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      email: '',
      institutionName: '',
      subCounty: '',
      county: '',
      awardLevel: '',
      awardLeader: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant((prev) => ({ ...prev, [name]: value }));
  };

  const addParticipant = () => {
    setParticipants([...participants, newParticipant]);
    closeModal();
  };

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
    <div className="p-5">
      <h1 className="text-2xl mb-4">Participants</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-1/3"
        />
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Participant
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Date of Birth</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Institution Name</th>
              <th className="px-4 py-2 border">Sub County</th>
              <th className="px-4 py-2 border">County</th>
              <th className="px-4 py-2 border">Award Level</th>
              <th className="px-4 py-2 border">Award Leader</th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.map((participant, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{participant.name}</td>
                <td className="px-4 py-2 border">{participant.dateOfBirth}</td>
                <td className="px-4 py-2 border">{participant.gender}</td>
                <td className="px-4 py-2 border">{participant.phoneNumber}</td>
                <td className="px-4 py-2 border">{participant.email}</td>
                <td className="px-4 py-2 border">{participant.institutionName}</td>
                <td className="px-4 py-2 border">{participant.subCounty}</td>
                <td className="px-4 py-2 border">{participant.county}</td>
                <td className="px-4 py-2 border">{participant.awardLevel}</td>
                <td className="px-4 py-2 border">{participant.awardLeader}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Participant"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-4">Add Participant</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newParticipant.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={newParticipant.dateOfBirth}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={newParticipant.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newParticipant.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newParticipant.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="institutionName"
            placeholder="Institution Name"
            value={newParticipant.institutionName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="subCounty"
            placeholder="Sub County"
            value={newParticipant.subCounty}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="county"
            placeholder="County"
            value={newParticipant.county}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="awardLevel"
            placeholder="Award Level"
            value={newParticipant.awardLevel}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="awardLeader"
            placeholder="Award Leader"
            value={newParticipant.awardLeader}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={addParticipant}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Add
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
    </Layout>
  );
};

export default Participants;
