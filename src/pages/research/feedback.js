import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../styles/customStyles';
import FeedbackForm from '../../components/forms/feedbackF';
import FeedbackTable from '../../components/tables/feedbackT';
import { addFeedback as addFeedbackService, getFeedbackById, updateFeedback, deleteFeedback, getFeedback } from '../../services/feedbackS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');
const AddFeedback = () => {
  const [feedback, setFeedbacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ 
      
      respondentID: '',
      titleName: '',
      description: '',
      respondentType: '',
      phoneNo: '',
      respondentEmail: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const fetchedFeedbacks = await getFeedback();
        setFeedbacks(fetchedFeedbacks);
      } catch (error) {
        console.error('Error fetching Feedbacks:', error.response.data);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewFeedback = async () => {
    try {
      const feedbackPayload = { ...newFeedback };

      console.log('New Feedback Payload:', feedbackPayload);
      const addedFeedback = await addFeedbackService(feedbackPayload);
      setFeedbacks((prev) => [...prev, addedFeedback]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding respondent:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add respondent: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddFeedbackModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewFeedback({
      respondentID: '',
      titleName: '',
      description: '',
      respondentType: '',
      phoneNo: '',
      respondentEmail: '',
    });
  };

  const openEditFeedbackModal = async (respondent) => {
    try {
      console.log('Fetching respondent with ID:', respondent.respondentID);
      const fetchedFeedback = await getFeedbackById(respondent.respondentID);
      console.log('Fetched Feedback:', fetchedFeedback);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedFeedbackId(respondent.respondentID);
      setNewFeedback({
        ...fetchedFeedback,
     
      });
    } catch (error) {
      console.error(`Error fetching respondent with ID ${respondent.respondentID}:`, error.response.data);
    }
  };
  
  const updateExistingFeedback = async () => {
    try {
      const feedbackPayload = { ...newFeedback };
  
      console.log('Updated Feedback Payload:', feedbackPayload);
  
      const updatedFeedback = await updateFeedback(selectedFeedbackId, feedbackPayload);
      setFeedbacks((prev) => prev.map(inst => (inst.respondentID === selectedFeedbackId ? updatedFeedback : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating respondent with ID ${selectedFeedbackId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update respondent: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingFeedback = async (respondentID) => {
    try {
      await deleteFeedback(respondentID);
      setFeedbacks((prev) => prev.filter(inst => inst.respondentID !== respondentID));
    } catch (error) {
      console.error(`Error deleting respondent with ID ${respondentID}:`, error.response.data);
      alert(`Failed to delete respondent: ${error.response.data.title}`);
    }
  };

  const closeAddFeedbackModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteFeedbackHandler = (respondentID) => {
    if (window.confirm(`Are you sure you want to delete respondent with ID ${respondentID}?`)) {
      deleteExistingFeedback(respondentID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>
      <div className="p-4">
        <button
          onClick={openAddFeedbackModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Feedback
        </button>
        <FeedbackTable
          feedback={feedback}
          openEditModal={openEditFeedbackModal}
          deleteFeedback={deleteFeedbackHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddFeedbackModal} contentLabel={editMode ? "Edit Feedback" : "Add Feedback"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit Feedback' : 'Add Feedback'}</h2>
        <FeedbackForm
          formValues={newFeedback} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingFeedback : addNewFeedback} className="bg-primary px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddFeedbackModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddFeedback;
