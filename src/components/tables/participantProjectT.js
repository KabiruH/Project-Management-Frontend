import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Participant ID', accessor: 'participantID' },
  { Header: 'Participant Name', accessor: 'participantName' },
  { Header: 'Institution Name', accessor: 'institutionName' },
  { Header: 'ProjectID', accessor: 'projectID' },
  {
    Header: 'Projects',
    accessor: 'projects', 
    Cell: ({ value }) => value.join(', ') // Join project names with comma
  },
];

const ParticipantProjectTable = ({ participantProjects, openEditModal, deleteParticipant }) => {
  const renderRowActions = ({ participantID }) => (
    <div>
      <button
        onClick={() => openEditModal({ participantID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteParticipant(participantID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={participantProjects}
      renderRowActions={renderRowActions}
    />
  );
};

export default ParticipantProjectTable;
