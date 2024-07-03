import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'County ID', accessor: 'countyID' },
  { Header: 'County Name', accessor: 'countyName' },
  { Header: 'Sub-County', accessor: 'subCounty' },
  { Header: 'Region', accessor: 'region' },
  { Header: 'Notes', accessor: 'notes' },
];

const CountyTable = ({ counties, openEditModal, deleteCounty }) => {
  const renderRowActions = ({ countyID }) => (
    <div>
      <button
        onClick={() => openEditModal({ countyID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteCounty(countyID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={counties}
      renderRowActions={renderRowActions}
    />
  );
};

export default CountyTable;