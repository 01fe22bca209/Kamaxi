import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://kamaxi3-updated-api.vercel.app/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    const response = await fetch(`https://kamaxi3-updated-api.vercel.app/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers(users.filter(user => user._id !== id)); // Remove deleted user from state
    } else {
      alert('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add"><button>Add New User</button></Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/edit/${user._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
