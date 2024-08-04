import React from 'react';
import './List.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import UsersTable from '../../components/tables/dataTable/UsersTable';

const UserList = () => {
  return (
    <main className="list-page">
      <Sidebar />

      <div className="list-container">
        <Navbar itemName={'users'} />
        <UsersTable searching={'users'} />
      </div>
    </main>
  );
};

export default UserList;
