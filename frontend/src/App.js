import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import UserList from './components/UserList';

const App = () => {
  return (
    <div>
      <h1>User Management</h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
};

export default App;
