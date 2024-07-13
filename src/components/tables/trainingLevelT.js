import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Level ID', accessor: 'trainingLevelID' },
  { Header: 'Level Name', accessor: 'levelName' },
  { Header: 'Notes', accessor: 'notes' },
];

const TrainingLevelTable = ({ traininglevels, openEditModal, deleteTrainingLevel }) => {
  const renderRowActions = ({ trainingLevelID }) => (
    <div>
      <button
        onClick={() => openEditModal({ trainingLevelID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteTrainingLevel(trainingLevelID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={traininglevels}
      renderRowActions={renderRowActions}
    />
  );
};

export default TrainingLevelTable;
