import React from 'react';
import './List.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import HotelsTable from '../../components/tables/dataTable/HotelsTable';

const HotelList = () => {
  return (
    <main className="list-page">
      <Sidebar />

      <div className="list-container">
        <Navbar itemName={"hotels"}/>
        <HotelsTable />
      </div>
    </main>
  );
};

export default HotelList;
