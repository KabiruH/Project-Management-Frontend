import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from '../components/layout'

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTraining, setNewTraining] = useState({
    trainingName: '',
    institution: '',
    venue: '',
    date: new Date(),
    categories: 'Award Leaders', // Default category
    subCounty: '',
    county: '',
    regionalCoordinator: '',
    trainingLevel: 'Introductory',
    trainingType: 'Virtual',
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewTraining({
      trainingName: '',
      institution: '',
      venue: '',
      date: new Date(),
      categories: 'Award Leaders', // Reset to default category
      subCounty: '',
      county: '',
      regionalCoordinator: '',
      trainingLevel: 'Introductory',
      trainingType: 'Virtual',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewTraining((prev) => ({ ...prev, date }));
  };

  const addTraining = () => {
    setTrainings([...trainings, newTraining]);
    closeModal();
  };

  const filteredTrainings = trainings.filter((training) =>
    training.trainingName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
    <div className="p-5">
      <h1 className="text-2xl mb-4">Trainings</h1>
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
          Add Training
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Training Name</th>
              <th className="px-4 py-2 border">Institution</th>
              <th className="px-4 py-2 border">Venue</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Categories</th>
              <th className="px-4 py-2 border">Sub County</th>
              <th className="px-4 py-2 border">County</th>
              <th className="px-4 py-2 border">Regional Coordinator</th>
              <th className="px-4 py-2 border">Training Level</th>
              <th className="px-4 py-2 border">Training Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainings.map((training, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{training.trainingName}</td>
                <td className="px-4 py-2 border">{training.institution}</td>
                <td className="px-4 py-2 border">{training.venue}</td>
                <td className="px-4 py-2 border">{training.date.toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{training.categories}</td>
                <td className="px-4 py-2 border">{training.subCounty}</td>
                <td className="px-4 py-2 border">{training.county}</td>
                <td className="px-4 py-2 border">{training.regionalCoordinator}</td>
                <td className="px-4 py-2 border">{training.trainingLevel}</td>
                <td className="px-4 py-2 border">{training.trainingType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Training"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-4">Add Training</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="trainingName"
            placeholder="Training Name"
            value={newTraining.trainingName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={newTraining.institution}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={newTraining.venue}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="w-full p-2 border border-gray-300 rounded">
            <label htmlFor="date"></label>
            <DatePicker
              id="date"
              selected={newTraining.date}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="categories">Categories</label>
            <select
              id="categories"
              name="categories"
              value={newTraining.categories}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Award Leaders">Award Leaders</option>
              <option value="Volunteers">Volunteers</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <input
            type="text"
            name="subCounty"
            placeholder="Sub County"
            value={newTraining.subCounty}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="county"
            placeholder="County"
            value={newTraining.county}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="regionalCoordinator"
            placeholder="Regional Coordinator"
            value={newTraining.regionalCoordinator}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div>
            <label htmlFor="trainingLevel">Training Level</label>
            <select
              id="trainingLevel"
              name="trainingLevel"
              value={newTraining.trainingLevel}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Introductory">Introductory</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="trainingType">Training Type</label>
            <select
              id="trainingType"
              name="trainingType"
              value={newTraining.trainingType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Virtual">Virtual</option>
              <option value="Physical">Physical</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={addTraining}
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

export default Trainings;
