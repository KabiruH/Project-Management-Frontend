import React, { useState } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout';
import { addPartnerships } from '../services/partnershipService';

const Partnership = () => {
    const [partners, setPartners] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newPartner, setNewPartner] = useState({
        partnerID: '',
        partnerName: '',
        email: '',
        phoneNumber: '',
        partnerType: '',
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setNewPartner({
            partnerID: '',
            partnerName: '',
            email: '',
            phoneNumber: '',
            partnerType: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPartner((prev) => ({ ...prev, [name]: value }));
    };

    const addPartner = async () => {
        try {
            const addedPartner = await addPartnerships(newPartner);
            setPartners([...partners, addedPartner]);
            closeModal();
        } catch (error) {
            console.error('Error adding partner:', error);
        }
    };

    const filteredPartners = partners.filter((partner) =>
        partner.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="p-5">
                <h1 className="text-2xl mb-4">Partnership Page</h1>
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
                        Add Partner
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Partner ID</th>
                                <th className="px-4 py-2 border">Partner Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Phone Number</th>
                                <th className="px-4 py-2 border">Partner Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPartners.map((partner, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{partner.partnerID}</td>
                                    <td className="px-4 py-2 border">{partner.partnerName}</td>
                                    <td className="px-4 py-2 border">{partner.email}</td>
                                    <td className="px-4 py-2 border">{partner.phoneNumber}</td>
                                    <td className="px-4 py-2 border">{partner.partnerType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Partner"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <h2 className="text-xl mb-4">Add Partner</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="partnerID"
                            placeholder="Partner ID"
                            value={newPartner.partnerID}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="partnerName"
                            placeholder="Partner Name"
                            value={newPartner.partnerName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newPartner.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={newPartner.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <select
                            name="partnerType"
                            value={newPartner.partnerType}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Partner Type</option>
                            <option value="current">Current</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={addPartner}
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

export default Partnership;
