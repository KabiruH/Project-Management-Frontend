import { useState } from 'react';
import Table from '../common/Table'; // Assuming Table component handles empty data

const columns = [
  { Header: 'Status ID', accessor: 'ProjectStatusID' },
  { Header: 'Status Name', accessor: 'StatusName' },
  { Header: 'Notes', accessor: 'Notes' },
];

const ProjectStatusTable = ({ status = [], openEditModal, deleteStatus }) => {
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Console log data received for debugging
  console.log('Project statuses received:', status);

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
      // Check if data exists before rendering rows
      data={status.length > 0 ? status : []}
      renderRowActions={renderRowActions}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default ProjectStatusTable;
