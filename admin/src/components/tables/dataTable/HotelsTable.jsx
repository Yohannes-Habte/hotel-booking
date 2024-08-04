import React, { useEffect, useState } from 'react';
import './DataTable.scss';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

const HotelsTable = () => {
  // Use location hook to specify the id of a hotel
  const location = useLocation();
  const path = location.pathname.split('/'[1]);
  console.log(path);

  // State variables for fetching array data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect to display products
  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:9900/api/hotels`);
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchingData();
  }, []);

  // Delete a product from database
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9900/api${path}/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-data-table">
      <article className="add-user">
        <h3 className="add-title">Add New Hotel </h3>
        <NavLink to={'/hotels/new'} className={'link'}>
          Add New
        </NavLink>
      </article>

      <table className="users-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> Hotel ID </th>
            <th className="head-cell"> Hotel Name </th>
            <th className="head-cell"> Type </th>
            <th className="head-cell"> Title </th>
            <th className="head-cell"> City </th>
            <th className="head-cell"> Action </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((hotel) => {
            return (
              <tr key={hotel._id} className="table-body-row">
                <td className="body-cell"> {hotel._id} </td>
                <td className="body-cell-user">
                  <p className="name">{hotel.name}</p>
                </td>
                <td className="body-cell-email"> {hotel.type} </td>
                <td className="body-cell-age"> {hotel.title} </td>
                <td className="body-cell-age"> {hotel.city} </td>
                <td className="body-cell-action">
                  <div className="action-wrapper">
                    <NavLink to={'/users/userId'} className={'link'}>
                      View
                    </NavLink>
                    <button
                      onClick={() => handleDelete(hotel._id)}
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

export default HotelsTable;
