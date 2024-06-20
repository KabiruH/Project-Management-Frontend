import React, { useState } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout';
import { addInstitution as addInstitutionService } from '../services/institutionService';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [newInstitution, setNewInstitution] = useState({
    institutionID: '',
    institutionName: '',
    stageID: '',
    statusID: '',
    institutionEmail: '',
    institutionContact: '',
    subCounty: '',
    countyID: 0,
    contactPerson: '',
    contactNumber: '',
    licenseStartDate: '',
    licenseEndDate: '',
    awardLeader: '',
    notes: '',
  });
  const [currentInstitution, setCurrentInstitution] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    resetNewInstitution();
  };

  const openEditModal = (institution) => {
    setCurrentInstitution(institution);
    setNewInstitution(institution);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    resetNewInstitution();
    setCurrentInstitution(null);
  };

  const resetNewInstitution = () => {
    setNewInstitution({
      institutionID: '',
      institutionName: '',
      stageID: '',
      statusID: '',
      institutionEmail: '',
      institutionContact: '',
      subCounty: '',
      countyID: 0,
      contactPerson: '',
      contactNumber: '',
      licenseStartDate: '',
      licenseEndDate: '',
      awardLeader: '',
      notes: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({ ...prev, [name]: value }));
  };

  const addInstitution = async () => {
    try {
      await addInstitutionService(newInstitution);
      setInstitutions([...institutions, newInstitution]);
      closeModal();
    } catch (error) {
      console.error('Error adding institution:', error);
    }
  };

  const updateInstitution = () => {
    const updatedInstitutions = institutions.map((inst) =>
      inst === currentInstitution ? newInstitution : inst
    );
    setInstitutions(updatedInstitutions);
    closeEditModal();
  };

  const filteredInstitutions = institutions.filter((institution) =>
    institution.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
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
              <th className="px-4 py-2 border">ID</th>
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
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutions.map((institution, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{institution.institutionID}</td>
                  <td className="px-4 py-2 border">{institution.institutionName}</td>
                  <td className="px-4 py-2 border">{institution.stageID}</td>
                  <td className="px-4 py-2 border">{institution.statusID}</td>
                  <td className="px-4 py-2 border">{institution.institutionEmail}</td>
                  <td className="px-4 py-2 border">{institution.institutionContact}</td>
                  <td className="px-4 py-2 border">{institution.subCounty}</td>
                  <td className="px-4 py-2 border">{institution.countyID}</td>
                  <td className="px-4 py-2 border">{institution.contactPerson}</td>
                  <td className="px-4 py-2 border">{institution.contactNumber}</td>
                  <td className="px-4 py-2 border">{institution.licenseStartDate}</td>
                  <td className="px-4 py-2 border">{institution.licenseEndDate}</td>
                  <td className="px-4 py-2 border">{institution.awardLeader}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => openEditModal(institution)}
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      Edit
                    </button>
                  </td>
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
              name="institutionID"
              placeholder="Institution ID"
              value={newInstitution.institutionID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="institutionName"
              placeholder="Institution Name"
              value={newInstitution.institutionName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="stageID"
              placeholder="Stage ID"
              value={newInstitution.stageID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="statusID"
              placeholder="Status ID"
              value={newInstitution.statusID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="institutionEmail"
              placeholder="Institution Email"
              value={newInstitution.institutionEmail}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="institutionContact"
              placeholder="Institution Contact"
              value={newInstitution.institutionContact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="subCounty"
              placeholder="Subcounty"
              value={newInstitution.subCounty}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="countyID"
              placeholder="County ID"
              value={newInstitution.countyID}
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
              type="datetime-local"
              name="licenseStartDate"
              placeholder="License Start Date"
              value={newInstitution.licenseStartDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="datetime-local"
              name="licenseEndDate"
              placeholder="License End Date"
              value={newInstitution.licenseEndDate}
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
            <textarea
              name="notes"
              placeholder="Notes"
              value={newInstitution.notes}
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
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Institution"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-xl mb-4">Edit Institution</h2>
          <div className="space-y-4">
          <input
              type="text"
              name="institutionID"
              placeholder="Institution ID"
              value={newInstitution.institutionID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="institutionName"
              placeholder="Institution Name"
              value={newInstitution.institutionName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="stageID"
              placeholder="Stage ID"
              value={newInstitution.stageID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="statusID"
              placeholder="Status ID"
              value={newInstitution.statusID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="institutionEmail"
              placeholder="Institution Email"
              value={newInstitution.institutionEmail}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="institutionContact"
              placeholder="Institution Contact"
              value={newInstitution.institutionContact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="subCounty"
              placeholder="Subcounty"
              value={newInstitution.subCounty}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="countyID"
              placeholder="County ID"
              value={newInstitution.countyID}
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
              type="datetime-local"
              name="licenseStartDate"
              placeholder="License Start Date"
              value={newInstitution.licenseStartDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="datetime-local"
              name="licenseEndDate"
              placeholder="License End Date"
              value={newInstitution.licenseEndDate}
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
            <textarea
              name="notes"
              placeholder="Notes"
              value={newInstitution.notes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={updateInstitution}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={closeEditModal}
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

export default Institutions;
