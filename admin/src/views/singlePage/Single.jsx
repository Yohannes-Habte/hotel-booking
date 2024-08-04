import React, { useEffect, useState } from 'react';
import './Single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/charts/chart/Chart';
import TableReact from '../../components/tables/table/Table';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const Single = () => {
  // Local state variable
  const [search, setSearch] = useState('');
  const [index, setIndex] = useState(0)
  const [data, setData] = useState([])

  // Global useEffect function
useEffect(() => {
  const fetchUser = async () => {
    try {
      const {data}  = await axios.get(`http://localhost:9900/api/users?search=${search}`)
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchUser()
}, [search]) 


  return (
    <main className="single-page">
      <Sidebar />

      <div className="single-page-contianer">
        <Navbar />

        <div className="top">
          {data[index] && (
            <article className="left">
              <button className="edit-button">Edit</button>
              <h1 className="title">Information</h1>
              <div className="user-info">
                <img
                  src={
                    data
                      ? data[index].image
                      : 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
                  }
                  alt=""
                  className="user-image"
                />

                <section className="details">
                  <h2 className="detail-title">
                    {data[index].firstName} {data[index].lastName}
                  </h2>
                  <div className="detail-info">
                    <span> Email: </span>
                    <span> {data[index].email} </span>
                  </div>

                  <div className="detail-info">
                    <span> Phone: </span>
                    <span> {data[index].phone} </span>
                  </div>

                  <div className="detail-info">
                    <span> Adddress: </span>
                    <span>{data[index].city} </span>
                  </div>

                  <div className="detail-info">
                    <span> Country: </span>
                    <span> {data[index].country} </span>
                  </div>
                </section>
              </div>
            </article>
          )}

          <div className="right">
            <Chart />
          </div>
        </div>

        <div className="bottom">
          <TableReact />
        </div>
      </div>
    </main>
  );
};

export default Single;
