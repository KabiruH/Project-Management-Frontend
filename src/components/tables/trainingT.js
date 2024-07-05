import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Training ID', accessor: 'trainingID' },
  { Header: 'Training Name', accessor: 'trainingName' },
  { Header: 'Institution Name', accessor: 'institutionName' },
  { Header: 'venue', accessor: 'venue' },
  { Header: 'Date', accessor: 'date' },
  { Header: 'Categories', accessor: 'categories' },
  { Header: 'Sub-County', accessor: 'subCounty' },
  { Header: 'County', accessor: 'county' },
  { Header: 'Coordinator', accessor: 'coordinator' },
  { Header: 'Training Level', accessor: 'trainingLevel' },
  { Header: 'Training Type', accessor: 'trainingType' },
  { Header: 'Notes', accessor: 'notes' },
];

const TrainingTable = ({ trainings, openEditModal, deleteTraining }) => {
  const renderRowActions = ({ trainingID }) => (
    <div>
      <button
        onClick={() => openEditModal({ trainingID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteTraining(trainingID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={trainings}
      renderRowActions={renderRowActions}
    />
  );
};

export default TrainingTable;
