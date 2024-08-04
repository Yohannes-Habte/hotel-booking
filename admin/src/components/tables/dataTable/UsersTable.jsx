import React, { useEffect, useState } from 'react';
import './DataTable.scss';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

const UsersTable = ({ itemName, searching }) => {
  // Locat state variables for specific user, hotel or room
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // Use location hook to specify the id of the user
  const location = useLocation();
  const path = location.pathname.split('/'[1]);

  // useEffect to display users details
  // const { data, loading, error } = useFetch(
  //   `http://localhost:9900/api/users?search=${search}`
  // );
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9900/api/users?search=${search}`
        );
        setSearchResults(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchUsers();
  }, [searchResults]);

  // Delete a user from database
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9900/api${path}/${id}`);
      setSearchResults(searchResults.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-data-table">
      <article className="add-user">
        <h3 className="add-title">Add New User</h3>
        <NavLink to={'/users/new'} className={'link'}>
          Add New
        </NavLink>
      </article>

      <table className="users-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> User ID </th>
            <th className="head-cell"> User </th>
            <th className="head-cell"> Email </th>
            <th className="head-cell"> Phone </th>
            <th className="head-cell"> City </th>
            <th className="head-cell"> Country </th>
            <th className="head-cell"> Action </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {searchResults.map((user) => {
            return (
              <tr key={user._id} className="table-body-row">
                <td className="body-cell"> {user._id} </td>
                <td className="body-cell-user">
                  <div className="image-wrapper">
                    <img
                      src={
                        user.image || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'
                      }
                      alt={user.firstName}
                      className="image"
                    />
                    <p className="name">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </td>
                <td className="body-cell-email"> {user.email} </td>
                <td className="body-cell-age"> {user.phone} </td>
                <td className="body-cell-city"> {user.city} </td>
                <td className="body-cell-age"> {user.country} </td>
                <td className="body-cell-action">
                  <div className="action-wrapper">
                    <NavLink to={'/users/userId'} className={'link'}>
                      View
                    </NavLink>
                    <button
                      onClick={() => handleDelete(user._id)}
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

export default UsersTable;
