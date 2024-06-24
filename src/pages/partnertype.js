import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout';
import { addPartnerType, getPartnerTypes } from '../services/partnershipService';

const PartnerType = () => {
    const [partnerTypes, setPartnerTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newPartnerType, setNewPartnerType] = useState({
        typeID: '',
        typeName: '',
        notes: '',
    });

    useEffect(() => {
        const fetchPartnerTypes = async () => {
            try {
                const data = await getPartnerTypes();
                setPartnerTypes(data);
            } catch (error) {
                console.error('Error fetching partner types:', error);
            }
        };

        fetchPartnerTypes();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setNewPartnerType({
            typeID: '',
            typeName: '',
            notes: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPartnerType((prev) => ({ ...prev, [name]: value }));
    };

    const addNewPartnerType = async () => {
        try {
            const addedPartnerType = await addPartnerType(newPartnerType);
            setPartnerTypes([...partnerTypes, addedPartnerType]);
            closeModal();
        } catch (error) {
            console.error('Error adding partner type:', error);
        }
    };

    const filteredPartnerTypes = partnerTypes.filter((type) =>
        type.typeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="p-5">
                <h1 className="text-2xl mb-4">Partner Types</h1>
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
                        Add
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Type ID</th>
                                <th className="px-4 py-2 border">Type Name</th>
                                <th className="px-4 py-2 border">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPartnerTypes.map((type, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{type.typeID}</td>
                                    <td className="px-4 py-2 border">{type.typeName}</td>
                                    <td className="px-4 py-2 border">{type.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Partner Type"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <h2 className="text-xl mb-4">Add Partner Type</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="typeID"
                            placeholder="Type ID"
                            value={newPartnerType.typeID}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="typeName"
                            placeholder="Type Name"
                            value={newPartnerType.typeName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="notes"
                            placeholder="Notes"
                            value={newPartnerType.notes}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={addNewPartnerType}
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

export default PartnerType;
