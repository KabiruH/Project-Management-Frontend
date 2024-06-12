import React, { useState } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout'

const Helper = () => {
  const [helpers, setHelpers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newHelper, setNewHelper] = useState({
    name: '',
    institution: '',
    gender: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    subCounty: '',
    county: '',
    helperType: 'Volunteer',
    regionalCoordinator: '',
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewHelper({
      name: '',
      institution: '',
      gender: '',
      idNumber: '',
      phoneNumber: '',
      email: '',
      subCounty: '',
      county: '',
      helperType: 'Volunteer',
      regionalCoordinator: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHelper((prev) => ({ ...prev, [name]: value }));
  };

  const addHelper = () => {
    setHelpers([...helpers, newHelper]);
    closeModal();
  };

  const filteredHelpers = helpers.filter((helper) =>
    helper.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
    <div className="p-5">
      <h1 className="text-2xl mb-4">Helpers</h1>
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
          Add Helper
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Institution</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">ID Number</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Sub County</th>
              <th className="px-4 py-2 border">County</th>
              <th className="px-4 py-2 border">Helper Type</th>
              <th className="px-4 py-2 border">Regional Coordinator</th>
            </tr>
          </thead>
          <tbody>
            {filteredHelpers.map((helper, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{helper.name}</td>
                <td className="px-4 py-2 border">{helper.institution}</td>
                <td className="px-4 py-2 border">{helper.gender}</td>
                <td className="px-4 py-2 border">{helper.idNumber}</td>
                <td className="px-4 py-2 border">{helper.phoneNumber}</td>
                <td className="px-4 py-2 border">{helper.email}</td>
                <td className="px-4 py-2 border">{helper.subCounty}</td>
                <td className="px-4 py-2 border">{helper.county}</td>
                <td className="px-4 py-2 border">{helper.helperType}</td>
                <td className="px-4 py-2 border">{helper.regionalCoordinator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Helper"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-4">Add Helper</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newHelper.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={newHelper.institution}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={newHelper.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={newHelper.idNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newHelper.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newHelper.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="subCounty"
            placeholder="Sub County"
            value={newHelper.subCounty}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="county"
            placeholder="County"
            value={newHelper.county}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div>
            <label htmlFor="helperType">Helper Type</label>
            <select
              id="helperType"
              name="helperType"
              value={newHelper.helperType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Volunteer">Volunteer</option>
              <option value="Award Leader">Award Leader</option>
            </select>
          </div>
          <input
            type="text"
            name="regionalCoordinator"
            placeholder="Regional Coordinator"
            value={newHelper.regionalCoordinator}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={addHelper}
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

export default Helper;
