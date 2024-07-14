import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Program ID', accessor: 'programID' },
  { Header: 'Program Name', accessor: 'programName' },
  { Header: 'Institution', accessor: 'institutionName' },
  { Header: 'Startdate', accessor: 'startDate' },
  { Header: 'Sub-County', accessor: 'subCounty' },
  { Header: 'County', accessor: 'county' },
  { Header: 'Description', accessor: 'description' },
  { Header: 'Coordinator', accessor: 'coordinator' },
];

const ProgramTable = ({ programs, openEditModal, deletePrograms }) => {
  const renderRowActions = ({ programID }) => (
    <div>
      <button
        onClick={() => openEditModal({ programID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deletePrograms(programID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={programs}
      renderRowActions={renderRowActions}
    />
  );
};

export default ProgramTable;
