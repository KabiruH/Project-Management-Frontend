import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Donor ID', accessor: 'donorID' },
  { Header: 'Donor Name', accessor: 'donorName' },
  { Header: 'Contact', accessor: 'contact' },
  { Header: 'Notes', accessor: 'notes' },
];

const DonorTable = ({ Donors, openEditModal, deleteDonor }) => {
    const renderRowActions = ({ DonorID }) => (
        <div>
            <button
                onClick={() => openEditModal({ DonorID })}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
                Edit
            </button>
            <button
                onClick={() => deleteDonor(DonorID)}
                className="bg-red-500 text-white p-1 rounded"
            >
                Delete
            </button>
        </div>
    );

    // Conditional rendering to handle undefined or empty Donor array
    if (!Donors) {
        return <div>Loading...</div>; // or handle loading state
    }

    return (
        <Table
            columns={columns}
            data={Donors}
            renderRowActions={renderRowActions}
        />
    );
};


export default DonorTable;
