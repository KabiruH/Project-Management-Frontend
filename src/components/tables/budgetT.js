import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Project ID', accessor: 'projectID' },
  { Header: 'Project Name', accessor: 'projectName' },
  { Header: 'Coordinator', accessor: 'coordinator' },
  { Header: 'Startdate', accessor: 'startDate' },
  { Header: 'Enddate', accessor: 'endDate' },
  { Header: 'Description', accessor: 'description' },
  { Header: 'Cost', accessor: 'cost' },
  { Header: 'Institution', accessor: 'institutionName' },
  { Header: 'County', accessor: 'county' },
  { Header: 'Sub-County', accessor: 'subCounty' },

  
  
 
];

const BudgetTable = ({ budget, openEditModal, deleteBudget }) => {
  const renderRowActions = ({ projectID }) => (
    <div>
      <button
        onClick={() => openEditModal({ projectID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteBudget(projectID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={budget}
      renderRowActions={renderRowActions}
    />
  );
};

export default BudgetTable;
