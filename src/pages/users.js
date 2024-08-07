import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaPlus } from "react-icons/fa6";

import { customStyles } from '../styles/customStyles';
import UserForm from '../components/forms/usersF';
import UserTable from '../components/tables/usersT';
import { addUsers as addUsersService, getUsersById, updateUsers, deleteUsers, getUsers } from '../services/usersS';
import Layout from '../components/layout';

Modal.setAppElement('#root');

const AddUser = () => {
  const [Users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ 
      username: '',
      name: '',
      roleID: '',
      gender: '',
      idNo: '',
      PhoneNo: '',
      email: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching Users:', error.response.data);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewUser = async () => {
    try {
      const UserPayload = { ...newUser };

      console.log('New User Payload:', UserPayload);
      const addedUser = await addUsersService(UserPayload);
      setUsers((prev) => [...prev, addedUser]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding User:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add User: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddUserModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewUser({
      username: '',
      name: '',
      roleID: '',
      gender: '',
      idNo: '',
      PhoneNo: '',
      email: '',
    });
  };

  const openEditUserModal = async (User) => {
    try {
      console.log('Fetching User with ID:', User.username);
      const fetchedUser = await getUsersById(User.username);
      console.log('Fetched User:', fetchedUser); // Log the fetched User
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedUserId(User.username);
      setNewUser({
        ...fetchedUser,
      });
    } catch (error) {
      console.error(`Error fetching User with ID ${User.username}:`, error.response.data);
    }
  };

  const updateExistingUser = async () => {
    try {
      const UserPayload = { ...newUser };

      console.log('Updated User Payload:', UserPayload);

      const updatedUser = await updateUsers(selectedUserId, UserPayload);
      setUsers((prev) => prev.map(inst => (inst.userID === selectedUserId ? updatedUser : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating User with ID ${selectedUserId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update User: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingUser = async (username) => {
    try {
      await deleteUsers(username);
      setUsers((prev) => prev.filter(inst => inst.username !== username));
    } catch (error) {
      console.error(`Error deleting User with ID ${username}:`, error.response.data);
      alert(`Failed to delete User: ${error.response.data.title}`);
    }
  };
  const closeAddUserModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteUserHandler = (username) => {
    if (window.confirm(`Are you sure you want to delete User with ID ${username}?`)) {
      deleteExistingUser(username);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="p-4">
        <button
          onClick={openAddUserModal}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex justify-center items-center mr-auto gap-2"
        >
             <FaPlus /><span>User</span>  
        </button>
        <UserTable
          Users={Users}
          openEditModal={openEditUserModal}
          deleteUser={deleteUserHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddUserModal} contentLabel={editMode ? "Edit User" : "Add User"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit User' : 'Add User'}</h2>
        <UserForm 
          formValues={newUser} 
          handleInputChange={handleInputChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingUser : addNewUser} className="bg-primary px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddUserModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddUser;
