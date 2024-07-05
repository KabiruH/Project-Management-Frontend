import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Category ID', accessor: 'categoryID' },
  { Header: 'Category Name', accessor: 'categoryName' },
  { Header: 'Notes', accessor: 'notes' },
];

const TrainingCategoryTable = ({ trainingcategory, openEditModal, deleteTrainingCategory }) => {
  const renderRowActions = ({ categoryID }) => (
    <div>
      <button
        onClick={() => openEditModal({ categoryID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteTrainingCategory(categoryID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={trainingcategory}
      renderRowActions={renderRowActions}
    />
  );
};

export default TrainingCategoryTable;
