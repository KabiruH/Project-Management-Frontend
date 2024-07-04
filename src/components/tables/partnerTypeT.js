import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Type ID', accessor: 'typeID' },
  { Header: 'Type Name', accessor: 'typeName' },
  { Header: 'Notes', accessor: 'notes' },
];

const PartnerTypesTable = ({ partnertypes, openEditModal, deletePartnerTypes }) => {
  const renderRowActions = ({ typeID }) => (
    <div>
      <button
        onClick={() => openEditModal({ typeID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deletePartnerTypes(typeID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={partnertypes}
      renderRowActions={renderRowActions}
    />
  );
};

export default PartnerTypesTable;
