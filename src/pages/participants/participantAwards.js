import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AwardsForm from '../../components/forms/participantAwardsF';
import AwardsTable from '../../components/tables/participantsAwardT';
import { addawardsService, getAwardsById, updateAwards, deleteAwards, getAwards } from '../../services/participantAwardS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddAwards = () => {
    const [awards, setAwards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAwards, setnewAwards] = useState({

        awardID: '',
        adminNo: '',
        name: '',
        institutionName: '',
        levelName: '',
        startDate: '',
        endDate: '',
        status: '',
        notes: '',
    });
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [selectedawardID, setSelectedawardID] = useState(null);

    useEffect(() => {
        const fetchedawards = async () => {
            try {
                const fetchedawards = await getAwards();
                setAwards(fetchedawards);
                console.log(fetchedawards)
            } catch (error) {
                console.error('Error fetching awards:', error.response.data);
            }
        };

        fetchedawards();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewAwards((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setnewAwards((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addnewAwards = async () => {
        try {
            const awardsPayload = {
                awardID: String(newAwards.awardID), // Ensure awardID is a string
                adminNo: newAwards.adminNo,
                name: newAwards.name,
                institutionName: newAwards.institutionName,
                levelName: newAwards.levelName,
                startDate: newAwards.startDate,
                endDate: newAwards.endDate,
                status: newAwards.status,
                notes: newAwards.notes,
            };

            console.log('New awards Payload:', awardsPayload);
            const addedawards = await addawardsService(awardsPayload);
            setAwards((prev) => [...prev, addedawards]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding awards:', error.response.data);
            setErrors(error.response.data.errors || {});
            alert(`Failed to add awards: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
        }
    };


    const openAddawardsModal = () => {
        setEditMode(false);
        setIsModalOpen(true);
        setnewAwards({
            awardID: '',
            adminNo: '',
            name: '',
            institutionName: '',
            levelName: '',
            startDate: '',
            endDate: '',
            status: '',
            notes: '',
        });
    };

    const openEditawardsModal = async (awards) => {
        try {
            const fetchedawards = await getAwardsById(String(awards.awardID));
            setEditMode(true);
            setIsModalOpen(true);
            setSelectedawardID(awards.awardID);
            setnewAwards({
                ...fetchedawards,
            });
        } catch (error) {
            console.error(`Error fetching awards with ID ${awards.awardID}:`, error.response.data);
        }
    };

    const updateExistingawards = async () => {
        try {
            const awardsPayload = { ...newAwards };

            console.log('Updated awards Payload:', awardsPayload);

            const updatedawards = await updateAwards(selectedawardID, awardsPayload);
            setAwards((prev) => prev.map(inst => (inst.awardID === selectedawardID ? updatedawards : inst)));
            setIsModalOpen(false);
        } catch (error) {
            console.error(`Error updating awards with ID ${selectedawardID}:`, error.response.data);
            setErrors(error.response.data.errors || {});
            alert(`Failed to update awards: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
        }
    };

    const deleteExistingawards = async (awardID) => {
        try {
            await deleteAwards(awardID);
            setAwards((prev) => prev.filter(inst => inst.awardID !== awardID));
        } catch (error) {
            console.error(`Error deleting awards with ID ${awardID}:`, error.response.data);
            alert(`Failed to delete awards: ${error.response.data.title}`);
        }
    };

    const closeAddawardsModal = () => {
        setIsModalOpen(false);
        setEditMode(false);
        setErrors({});
    };

    const deleteawardsHandler = (awardID) => {
        if (window.confirm(`Are you sure you want to delete awards with ID ${awardID}?`)) {
            deleteExistingawards(awardID);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Participant Awards</h1>
            <div className="p-4">
                <button
                    onClick={openAddawardsModal}
                    className="bg-blue-500 text-white p-2 rounded mb-4"
                >
                    Add awards
                </button>
              
                    <AwardsTable
                        awards={awards}
                        openEditModal={openEditawardsModal}
                        deleteawards={deleteawardsHandler}
                    />
              
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeAddawardsModal} contentLabel={editMode ? "Edit awards" : "Add awards"}>
                <h2 className="text-xl mb-4">{editMode ? 'Edit awards' : 'Add awards'}</h2>
                <AwardsForm
                    formValues={newAwards}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                    errors={errors}
                />
                <div className="flex justify-end mt-4">
                    <button onClick={editMode ? updateExistingawards : addnewAwards} className="bg-green-500 text-white p-2 rounded mr-2">
                        {editMode ? 'Update' : 'Save'}
                    </button>
                    <button onClick={closeAddawardsModal} className="bg-gray-500 text-white p-2 rounded">
                        Cancel
                    </button>
                </div>
            </Modal>
        </Layout>
    );
};

export default AddAwards;
