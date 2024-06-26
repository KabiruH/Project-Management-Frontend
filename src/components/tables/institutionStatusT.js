import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'County ID', accessor: 'statusID' },
  { Header: 'County Name', accessor: 'statusName' },
  { Header: 'Notes', accessor: 'notes' },
];

const StatusTable = ({ Statuses, openEditModal, deleteStatus }) => {
  const renderRowActions = ({ statusID }) => (
    <div>
      <button
        onClick={() => openEditModal({ statusID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteStatus(statusID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={Statuses}
      renderRowActions={renderRowActions}
    />
  );
};

export default StatusTable;
