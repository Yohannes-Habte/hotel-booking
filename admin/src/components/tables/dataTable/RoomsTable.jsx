import React, { useState } from 'react';
import './DataTable.scss';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';

const RoomsTable = () => {
  // Use location hook to specify the id of a room
  const location = useLocation();
  const path = location.pathname.split('/'[1]);
  console.log(path);

  // Local state variables
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(undefined)

  // useEffect to display products
  const { data, loading, error, reFetching } = useFetch(
    `http://localhost:9900/api/rooms`
  );

  // Delete a product from database
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9900/api/rooms/${hotelId}/${id}`);
      setRooms(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-data-table">
      <article className="add-user">
        <h3 className="add-title">Add New Room </h3>
        <NavLink to={'/rooms/new'} className={'link'}>
          Add New
        </NavLink>
      </article>

      <table className="users-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> Room ID </th>
            <th className="head-cell"> Title </th>
            <th className="head-cell"> Price </th>
            <th className="head-cell"> Action </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((room) => {
            return (
              <tr key={room._id} className="table-body-row">
                <td className="body-cell"> {room._id} </td>
                <td className="body-cell-user">{room.title}</td>
                <td className="body-cell-email"> ${room.price} </td>
                <td className="body-cell-action">
                  <div className="action-wrapper">
                    <NavLink to={'/rooms/roomId'} className={'link'}>
                      View
                    </NavLink>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
