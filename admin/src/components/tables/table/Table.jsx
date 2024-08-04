import React from 'react';
import './Table.scss';
import useFetch from '../../../hooks/useFetch';

const TableReact = () => {
  const { data, loading, error } = useFetch('http://localhost:9900/api/hotels');
  console.log("Latest transaction is:", data)

  return (
    <section className="table-container">
      <h4 className="table-title"> Latest Transactions</h4>
      <table className="table">
        <thead className="table-header">
          <tr className="header-row">
            <td className="table-header-id"> ID </td>
            <td className="table-header-hotel"> Hotel </td>
            <td className="table-header-type"> Type </td>
            <td className="table-header-city"> City </td>
            <td className="table-header-price"> Price </td>
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map((item) => (
            <tr key={item._id}>
              <td className="hotel-id">{item._id}</td>
              <td className="hotel-name">{item.name}</td>
              <td className="hotel-type">{item.type}</td>
              <td className="hotel-location">{item.city}</td>
              <td className="hotel-price">${item.cheapestPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableReact;
