import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'AwardID', accessor: 'awardID' },
  { Header: 'AdminNo', accessor: 'adminNo' },
  { Header: 'Student Name', accessor: 'studentName' },
  { Header: 'Institution Name', accessor: 'institutionName' },
  { Header: 'Level Name', accessor: 'levelName' },
  { Header: 'Start Date', accessor: 'startDate' },
  { Header: 'End Date', accessor: 'endDate' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Notes', accessor: 'notes' }
];

const AwardsTable = ({ awards, openEditModal, deleteAwards }) => {
  const renderRowActions = ({ awardID }) => (
    <div>
      <button
        onClick={() => openEditModal({ awardID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteAwards(awardID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={awards}
      renderRowActions={renderRowActions}
    />
  );
};

export default AwardsTable;
