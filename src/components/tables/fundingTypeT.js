import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Funding ID', accessor: 'fundingID' },
  { Header: 'Funding Name', accessor: 'fundingName' },
  { Header: 'Notes', accessor: 'notes' },
];

const FundingTypeTable = ({ fundingtype, openEditModal, deleteFundingType }) => {
  const renderRowActions = ({ fundingID }) => (
    <div>
      <button
        onClick={() => openEditModal({ fundingID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteFundingType(fundingID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={fundingtype}
      renderRowActions={renderRowActions}
    />
  );
};

export default FundingTypeTable;
