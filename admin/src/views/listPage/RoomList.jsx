import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import RoomsTable from '../../components/tables/dataTable/RoomsTable';

const RoomList = () => {
  return (
    <main className="list-page">
      <Sidebar />

      <div className="list-container">
        <Navbar itemName={'rooms'} />
        <RoomsTable />
      </div>
    </main>
  );
};

export default RoomList;
