import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'User ID', accessor: 'userID' },
  { Header: 'User Name', accessor: 'username' },
  { Header: 'Role', accessor: 'role' },
  { Header: 'Description', accessor: 'description' },
  { Header: 'Notes', accessor: 'notes' },
];

const TestimonialsTable = ({ testimonials = [], openEditModal, deleteTestimonial }) => {
  const renderRowActions = ({ UserID }) => (
    <div>
      <button
        onClick={() => openEditModal({ UserID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteTestimonial(UserID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={testimonials}
      renderRowActions={renderRowActions}
    />
  );
};

export default TestimonialsTable;
