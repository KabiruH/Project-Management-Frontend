import React from 'react';
import Table from '../common/Table'; // Assuming Table component handles empty data

const columns = [
  { Header: 'Status ID', accessor: 'projectStatusID' },
  { Header: 'Status Name', accessor: 'statusName' },
  { Header: 'Notes', accessor: 'notes' },
];

const ProjectStatusTable = ({ projectstatuses = [], openEditModal, deleteStatus }) => {

  // Console log data received for debugging
  console.log('Project statuses received:', projectstatuses);

  const renderRowActions = (status) => (
    <div>
      <button
        onClick={() => openEditModal(status)}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => deleteStatus(status.projectStatusID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      // Check if data exists before rendering rows
      data={projectstatuses}
      renderRowActions={renderRowActions}
    />
  );
};

export default ProjectStatusTable;
