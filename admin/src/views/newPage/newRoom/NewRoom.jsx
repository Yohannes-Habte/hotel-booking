import React, { useState } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import { roomInputs } from '../../../data/DataFormSource';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';
import './NewRoom.scss';

const NewRoom = () => {
  // Local state variables
  const [roomInfo, setRoomInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  // Global state variables. This is used to fetch hotel ID
  const { data, loading, error } = useFetch(`http://localhost:9900/api/hotels`);

  // Handle change fuction
  const handleChange = (e) => {
    setRoomInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Submit room info
  const submitRoomInfo = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(',').map((room) => ({ number: room }));

    try {
      // New User
      const newRoom = {
        title: roomInfo.title,
        maxPeople: roomInfo.maxPeople,
        price: roomInfo.price,
        description: roomInfo.description,
        roomNumbers: roomNumbers,
      };

      await axios.post(
        `http://localhost:9900/api/rooms/${hotelId}/createRoom`,
        newRoom
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="new-room-page">
      <Sidebar />
      <section className="new-room-container">
        <Navbar />
        <article className="add-room-container">
          <h3 className="title"> Add New Room </h3>
        </article>

        <form onSubmit={submitRoomInfo} action="" className="new-room-form">
          {roomInputs.map((input) => {
            return (
              <div key={input.id} className="input-container">
                <input
                  type={input.type}
                  name={input.name}
                  id={input.id}
                  onChange={handleChange}
                  placeholder={input.placeholder}
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  {input.label}
                </label>
                <span className="input-highlight"></span>
              </div>
            );
          })}

          <div className="textarea-container">
            <label htmlFor="rooms"> Rooms </label>
            <textarea
              name="rooms"
              id="rooms"
              onChange={(e) => setRooms(e.target.value)}
              placeholder="Give comma between room numbers"
              className="textarea-field"
            />
          </div>

          <div className="select-hotel">
            <label htmlFor="hotelId"> Choose Hotel </label>
            <select
              id="hotelId"
              onChange={(e) => setHotelId(e.target.value)}
              className="selct-option"
            >
              {loading ? (
                'Loading...'
              ) : error ? (
                <div> {error} </div>
              ) : (
                data.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="btn-container">
            <button className="btn">Send</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewRoom;
