import React, { useState } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout'

const Research = () => {
  const [researches, setResearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newResearch, setNewResearch] = useState({
    respondentName: '',
    complaintOrCompliment: '',
    respondentType: '',
    phoneNumber: '',
    email: '',
    attachments: [],
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewResearch({
      respondentName: '',
      complaintOrCompliment: '',
      respondentType: '',
      phoneNumber: '',
      email: '',
      attachments: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewResearch((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const addResearch = () => {
    setResearches([...researches, newResearch]);
    closeModal();
  };

  const filteredResearches = researches.filter((research) =>
    research.respondentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
    <div className="p-5">
      <h1 className="text-2xl mb-4">Research Page</h1>
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
          Add Comment
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Respondent Name</th>
              <th className="px-4 py-2 border">Complaint/Compliment</th>
              <th className="px-4 py-2 border">Respondent Type</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Attachments</th>
            </tr>
          </thead>
          <tbody>
            {filteredResearches.map((research, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{research.respondentName}</td>
                <td className="px-4 py-2 border">{research.complaintOrCompliment}</td>
                <td className="px-4 py-2 border">{research.respondentType}</td>
                <td className="px-4 py-2 border">{research.phoneNumber}</td>
                <td className="px-4 py-2 border">{research.email}</td>
                <td className="px-4 py-2 border">
                  {research.attachments.map((file, idx) => (
                    <div key={idx}>
                      <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                        {file.name}
                      </a>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Comment"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-4">Add Comment</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="respondentName"
            placeholder="Respondent Name"
            value={newResearch.respondentName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="complaintOrCompliment"
            placeholder="Complaint or Compliment"
            value={newResearch.complaintOrCompliment}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="respondentType"
            value={newResearch.respondentType}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Respondent Type</option>
            <option value="partners">Partners</option>
            <option value="mentors">Mentors</option>
            <option value="donors">Donors</option>
            <option value="sponsors">Sponsors</option>
            <option value="awardLeader">Award Leader</option>
            <option value="alumni">Alumni</option>
            <option value="participant">Participant</option>
          </select>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newResearch.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newResearch.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={addResearch}
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

export default Research;
