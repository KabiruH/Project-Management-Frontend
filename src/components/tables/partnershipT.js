import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Partner ID', accessor: 'partnerID' },
  { Header: 'Partner Name', accessor: 'partnerName' },
  { Header: 'Email', accessor: 'partnerEmail' },
  { Header: 'Phone Number', accessor: 'phoneNo' },
  { Header: 'Partner Type', accessor: 'partnerType' },
];

const PartnershipTable = ({ partnerships, openEditModal, deleteParticipant }) => {
  const renderRowActions = ({ partnerID }) => (
    <div>
      <button
        onClick={() => openEditModal({ partnerID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteParticipant(partnerID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={partnerships}
      renderRowActions={renderRowActions}
    />
  );
};

export default PartnershipTable;
