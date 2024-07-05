import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Type ID', accessor: 'typeID' },
  { Header: 'Type Name', accessor: 'typeName' },
  { Header: 'Notes', accessor: 'notes' },
];

const TrainingTypeTable = ({ trainingtypes, openEditModal, deleteTrainingType }) => {
  const renderRowActions = ({ typeID }) => (
    <div>
      <button
        onClick={() => openEditModal({ typeID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteTrainingType(typeID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={trainingtypes}
      renderRowActions={renderRowActions}
    />
  );
};

export default TrainingTypeTable;
