import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Respondent', accessor: 'respondentID' },
  { Header: 'Title', accessor: 'titleName' },
  { Header: 'Description', accessor: 'description' },
  { Header: 'Type', accessor: 'respondentType' },
  { Header: 'Phone Number', accessor: 'phoneNo' },
  { Header: 'Email', accessor: 'respondentEmail' },
];

const FeedbackTable = ({ feedback, openEditModal, deleteFeedback }) => {
  const renderRowActions = ({ respondentID }) => (
    <div>
      <button
        onClick={() => openEditModal({ respondentID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteFeedback(respondentID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={feedback}
      renderRowActions={renderRowActions}
    />
  );
};

export default FeedbackTable;
