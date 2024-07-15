import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {customStyles} from '../../styles/customStyles'
import DonorForm from '../../components/forms/donorsF';
import DonorTable from '../../components/tables/donorsT';
import { addDonor as addDonorService, getDonorById, updateDonor, deleteDonor, getDonor } from '../../services/donorsS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddDonor = () => {
    const [Donors, setDonors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDonor, setNewDonor] = useState({
        DonorID: '',
        DonorName: '',
        Contact: '',
        Notes: '',
    });
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [selectedDonorId, setSelectedDonorId] = useState(null);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const fetchedDonors = await getDonor();
                setDonors(fetchedDonors);
            } catch (error) {
                console.error('Error fetching Donors:', error.response.data);
            }
        };

        fetchDonors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDonor((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addNewDonor = async () => {
        try {
            const DonorPayload = { ...newDonor };

            console.log('New Donor Payload:', DonorPayload);
            const addedDonor = await addDonorService(DonorPayload);
            setDonors((prev) => [...prev, addedDonor]);
            setIsModalOpen(false);
            setErrors({});
        } catch (error) {
            console.error('Error adding Donor:', error.response.data);
            setErrors(error.response.data.errors || {});
            alert(`Failed to add Donor: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
        }
    };

    const openAddDonorModal = () => {
        setEditMode(false);
        setIsModalOpen(true);
        setNewDonor({
            DonorID: '',
            DonorName: '',
            Contact: '',
            Notes: '',
        });
    };

    const openEditDonorModal = async (Donor) => {
        try {
            console.log('Fetching Donor with ID:', Donor.DonorID);
            const fetchedDonor = await getDonorById(Donor.DonorID);
            console.log('Fetched Donor:', fetchedDonor); // Log the fetched Donor
            setEditMode(true);
            setIsModalOpen(true);
            setSelectedDonorId(Donor.DonorID);
            setNewDonor({
                ...fetchedDonor,
            });
        } catch (error) {
            console.error(`Error fetching Donor with ID ${Donor.DonorID}:`, error.response.data);
        }
    };

    const updateExistingDonor = async () => {
        try {
            const DonorPayload = { ...newDonor };

            console.log('Updated Donor Payload:', DonorPayload);

            const updatedDonor = await updateDonor(selectedDonorId, DonorPayload);
            setDonors((prev) => prev.map(inst => (inst.DonorID === selectedDonorId ? updatedDonor : inst)));
            setIsModalOpen(false);
            setErrors({});
        } catch (error) {
            console.error(`Error updating Donor with ID ${selectedDonorId}:`, error.response.data);
            setErrors(error.response.data.errors || {});
            alert(`Failed to update Donor: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
        }
    };

    const deleteExistingDonor = async (DonorID) => {
        try {
            await deleteDonor(DonorID);
            setDonors((prev) => prev.filter(inst => inst.DonorID !== DonorID));
        } catch (error) {
            console.error(`Error deleting Donor with ID ${DonorID}:`, error.response.data);
            alert(`Failed to delete Donor: ${error.response.data.title}`);
        }
    };

    const closeAddDonorModal = () => {
        setIsModalOpen(false);
        setEditMode(false);
        setErrors({});
    };

    const deleteDonorHandler = (DonorID) => {
        if (window.confirm(`Are you sure you want to delete Donor with ID ${DonorID}?`)) {
            deleteExistingDonor(DonorID);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Donors</h1>
            <div className="p-4">
                <button
                    onClick={openAddDonorModal}
                    className="bg-blue-500 text-white p-2 rounded mb-4"
                >
                    Add Donor
                </button>
                <DonorTable
                    Donors={Donors}
                    openEditModal={openEditDonorModal}
                    deleteDonor={deleteDonorHandler}
                />
            </div>
            <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddDonorModal} contentLabel={editMode ? "Edit Donor" : "Add Donor"}>
                <h2 className="subtitle2 mb-4">{editMode ? 'Edit Donor' : 'Add Donor'}</h2>
                <DonorForm
                    formValues={newDonor}
                    handleInputChange={handleInputChange}
                    errors={errors}
                />
                <div className="flex justify-end mt-4">
                    <button onClick={editMode ? updateExistingDonor : addNewDonor} className="bg-primary px-5 text-white p-2 rounded mr-2">
                        {editMode ? 'Update' : 'Save'}
                    </button>
                    <button onClick={closeAddDonorModal} className="outline outline-1 outline-primary px-5 text-primary p-2 rounded">
                        Cancel
                    </button>
                </div>
            </Modal>
        </Layout>
    );
};

export default AddDonor;
