import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TestimonialsForm from '../../components/forms/testimonialsF';
import TestimonialsTable from '../../components/tables/testimonialsT';
import { addTestimonial as addTestimonialService, getTestimonialById, updateTestimonial, deleteTestimonial, getTestimonial } from '../../services/testimonialsS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddTestimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        UserID: '',
        Username: '',
        Role: '',
        Description: '',
        Notes: '',
    });
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [selectedTestimonialId, setSelectedTestimonialId] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const fetchedTestimonials = await getTestimonial();
                console.log('Fetched Testimonials:', fetchedTestimonials); // Log the fetched data
                setTestimonials(fetchedTestimonials);
            } catch (error) {
                console.error('Error fetching Testimonials:', error.response?.data || error.message);
            }
        };

        fetchTestimonials();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTestimonial((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addNewTestimonial = async () => {
        try {
            const TestimonialPayload = { ...newTestimonial };

            console.log('New Testimonial Payload:', TestimonialPayload);
            const addedTestimonial = await addTestimonialService(TestimonialPayload);
            setTestimonials((prev) => [...prev, addedTestimonial]);
            setIsModalOpen(false);
            setErrors({});
        } catch (error) {
            console.error('Error adding Testimonial:', error.response?.data || error.message);
            setErrors(error.response?.data?.errors || {});
            alert(`Failed to add Testimonial: ${error.response?.data?.title}\nDetails: ${JSON.stringify(error.response?.data?.errors, null, 2)}`);
        }
    };

    const openAddTestimonialModal = () => {
        setEditMode(false);
        setIsModalOpen(true);
        setNewTestimonial({
            UserID: '',
            Username: '',
            Role: '',
            Description: '',
            Notes: '',
        });
    };

    const openEditTestimonialModal = async (testimonial) => {
        try {
            console.log('Fetching Testimonial with ID:', testimonial.UserID);
            const fetchedTestimonial = await getTestimonialById(testimonial.UserID);
            console.log('Fetched Testimonial:', fetchedTestimonial);
            setEditMode(true);
            setIsModalOpen(true);
            setSelectedTestimonialId(testimonial.UserID);
            setNewTestimonial({
                ...fetchedTestimonial,
            });
        } catch (error) {
            console.error(`Error fetching Testimonial with ID ${testimonial.UserID}:`, error.response?.data || error.message);
        }
    };

    const updateExistingTestimonial = async () => {
        try {
            const TestimonialPayload = { ...newTestimonial };

            console.log('Updated Testimonial Payload:', TestimonialPayload);

            const updatedTestimonial = await updateTestimonial(selectedTestimonialId, TestimonialPayload);
            setTestimonials((prev) => prev.map(inst => (inst.UserID === selectedTestimonialId ? updatedTestimonial : inst)));
            setIsModalOpen(false);
            setErrors({});
        } catch (error) {
            console.error(`Error updating Testimonial with ID ${selectedTestimonialId}:`, error.response?.data || error.message);
            setErrors(error.response?.data?.errors || {});
            alert(`Failed to update Testimonial: ${error.response?.data?.title} ${JSON.stringify(error.response?.data?.errors, null, 2)}`);
        }
    };

    const deleteExistingTestimonial = async (UserID) => {
        try {
            await deleteTestimonial(UserID);
            setTestimonials((prev) => prev.filter(inst => inst.UserID !== UserID));
        } catch (error) {
            console.error(`Error deleting Testimonial with ID ${UserID}:`, error.response?.data || error.message);
            alert(`Failed to delete Testimonial: ${error.response?.data?.title}`);
        }
    };

    const closeAddTestimonialModal = () => {
        setIsModalOpen(false);
        setEditMode(false);
        setErrors({});
    };

    const deleteTestimonialHandler = (UserID) => {
        if (window.confirm(`Are you sure you want to delete Testimonial with ID ${UserID}?`)) {
            deleteExistingTestimonial(UserID);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Testimonials</h1>
            <div className="p-4">
                <button
                    onClick={openAddTestimonialModal}
                    className="bg-blue-500 text-white p-2 rounded mb-4"
                >
                    Add Testimonial
                </button>
                <TestimonialsTable
                    testimonials={testimonials}
                    openEditModal={openEditTestimonialModal}
                    deleteTestimonial={deleteTestimonialHandler}
                />
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeAddTestimonialModal} contentLabel={editMode ? "Edit Testimonial" : "Add Testimonial"}>
                <h2 className="text-xl mb-4">{editMode ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <TestimonialsForm
                    formValues={newTestimonial}
                    handleInputChange={handleInputChange}
                    errors={errors}
                />
                <div className="flex justify-end mt-4">
                    <button onClick={editMode ? updateExistingTestimonial : addNewTestimonial} className="bg-green-500 text-white p-2 rounded mr-2">
                        {editMode ? 'Update' : 'Save'}
                    </button>
                    <button onClick={closeAddTestimonialModal} className="bg-gray-500 text-white p-2 rounded">
                        Cancel
                    </button>
                </div>
            </Modal>
        </Layout>
    );
};

export default AddTestimonial;
