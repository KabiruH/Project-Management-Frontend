import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Full Names', accessor: 'name' },
  { Header: 'Username', accessor: 'username' },
  { Header: 'Role', accessor: 'roleID' },
  { Header: 'Gender', accessor: 'gender' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Id Number', accessor: 'idNo' },
  { Header: 'Phone Number', accessor: 'phoneNo' },
];

const UserTable = ({ Users, openEditModal, deleteUser }) => {
  const renderRowActions = ({ username }) => (
    <div>
      <button
        onClick={() => openEditModal({ username })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteUser(username)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={Users}
      renderRowActions={renderRowActions}
    />
  );
};

export default UserTable;
