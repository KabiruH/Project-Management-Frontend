import React, { useState } from 'react';
import Modal from 'react-modal';

const InstitutionsPage = () => {
  const [institutions, setInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    email: '',
    contact: '',
    subcounty: '',
    county: '',
    contactPerson: '',
    contactNumber: '',
    awardLeader: '',
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewInstitution({
      name: '',
      email: '',
      contact: '',
      subcounty: '',
      county: '',
      contactPerson: '',
      contactNumber: '',
      awardLeader: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({ ...prev, [name]: value }));
  };

  const addInstitution = () => {
    setInstitutions([...institutions, newInstitution]);
    closeModal();
  };

  const filteredInstitutions = institutions.filter((institution) =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">Institutions</h1>
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
          Add Institution
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Stage</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Subcounty</th>
              <th className="px-4 py-2 border">County</th>
              <th className="px-4 py-2 border">Contact Person</th>
              <th className="px-4 py-2 border">Contact Number</th>
              <th className="px-4 py-2 border">License Start</th>
              <th className="px-4 py-2 border">License End</th>
              <th className="px-4 py-2 border">Award Leader</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstitutions.map((institution, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{institution.name}</td>
                <td className="px-4 py-2 border">{institution.stage}</td>
                <td className="px-4 py-2 border">{institution.status}</td>
                <td className="px-4 py-2 border">{institution.email}</td>
                <td className="px-4 py-2 border">{institution.contact}</td>
                <td className="px-4 py-2 border">{institution.subcounty}</td>
                <td className="px-4 py-2 border">{institution.county}</td>
                <td className="px-4 py-2 border">{institution.contactPerson}</td>
                <td className="px-4 py-2 border">{institution.contactNumber}</td>
                <td className="px-4 py-2 border">{institution.licenseStart}</td>
                <td className="px-4 py-2 border">{institution.licenseEnd}</td>
                <td className="px-4 py-2 border">{institution.awardLeader}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Institution"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-4">Add Institution</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Institution Name"
            value={newInstitution.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Institution Email"
            value={newInstitution.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contact"
            placeholder="Institution Contact"
            value={newInstitution.contact}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="subcounty"
            placeholder="Subcounty"
            value={newInstitution.subcounty}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="county"
            placeholder="County"
            value={newInstitution.county}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contactPerson"
            placeholder="Contact Person"
            value={newInstitution.contactPerson}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={newInstitution.contactNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="awardLeader"
            placeholder="Award Leader"
            value={newInstitution.awardLeader}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={addInstitution}
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
  );
};

export default InstitutionsPage;
