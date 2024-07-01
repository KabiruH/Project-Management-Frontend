import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Status ID', accessor: 'ProjectStatusID' },
  { Header: 'Status Name', accessor: 'StatusName' },
  { Header: 'Notes', accessor: 'Notes' },
];

const ProjectStatusTable = ({ status = [], openEditModal, deleteStatus }) => {
  const renderRowActions = ({ ProjectStatusID }) => (
    <div>
      <button
        onClick={() => openEditModal({ ProjectStatusID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteStatus(ProjectStatusID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={status}
      renderRowActions={renderRowActions}
    />
  );
};

export default ProjectStatusTable;
