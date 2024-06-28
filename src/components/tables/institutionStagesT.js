import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Stage ID', accessor: 'stageID' },
  { Header: 'Stage Name', accessor: 'stageName' },
  { Header: 'Notes', accessor: 'notes' },
];

const StatusTable = ({ stages, openEditModal, deleteStages }) => {
  const renderRowActions = ({ stageID }) => (
    <div>
      <button
        onClick={() => openEditModal({ stageID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteStages(stageID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={stages}
      renderRowActions={renderRowActions}
    />
  );
};

export default StatusTable;
