import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import { hotelInputs } from '../../../data/DataFormSource';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';
import './NewHotel.scss';

const NewHotel = () => {
  // Global state variables
  const { data, loading, error, reFetching } = useFetch(
    `http://localhost:9900/api/rooms`
  );
  // Local state variables
  const [files, setFiles] = useState('');
  const [hotelInfo, setHotelInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  // Handle change fuction
  const handleChange = (e) => {
    setHotelInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle select
  const handleSelect = (e) => {
    // Selected option that shows HTMLCollection
    const selected = e.target.selectedOptions;
    // Transform the selected options into an array
    const value = Array.from(selected, (option) => option.value);
    setRooms(value);
  };

  // Sumbit Product
  const submit = async (e) => {
    e.preventDefault();

    try {
      // Uploading multiple images
      const photos = await Promise.all(
        // Since files are objects, you need to transform into an array using "Object.values"
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          // upload preset
          data.append('upload_preset', 'upload');

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
            data
          );
          const { url } = response.data;
          return url;
        })
      );

      // New Hotel
      const newHotel = {
        name: hotelInfo.name,
        type: hotelInfo.type,
        city: hotelInfo.city,
        address: hotelInfo.address,
        distance: hotelInfo.distance,
        photos: photos,
        title: hotelInfo.title,
        description: hotelInfo.description,
        rating: hotelInfo.rating,
        rooms: hotelInfo.rooms,
        cheapestPrice: hotelInfo.cheapestPrice,
        featured: hotelInfo.featured,
      };

      // Send the new Product to the backend
      await axios.post(
        'http://localhost:9900/api/hotels/createHotel',
        newHotel
      );
    } catch (error) {}
  };

  return (
    <main className="new-hotel-page">
      <Sidebar />
      <section className="new-hotel-container">
        <Navbar />
        <article className="add-hotel-container">
          <h3 className="title"> Add New Hotel </h3>
        </article>
        <div className="form-container">
          {/* Left container */}
          <figure className="left-cotainer">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg'
              }
              alt=""
              className="image"
            />
          </figure>

          {/* Right container */}
          <div className="right-cotainer">
            <form onSubmit={submit} action="" className="form">
              {hotelInputs.map((input) => {
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

              {/* Photos input */}
              <div className="files-input-container">
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="file-field"
                />

                <label htmlFor="file" className="file-label">
                  Photos: <FaCloudUploadAlt className="icon" />{' '}
                </label>
              </div>

              {/* Select input for featured */}
              <div className="featured-container">
                <label htmlFor="featured" className="label">
                  Featured
                </label>
                <select
                  name="featured"
                  id="featured"
                  onChange={handleChange}
                  className="select"
                >
                  <option value={'default'}> Select Hotel Feature </option>
                  <option value={false}>No </option>
                  <option value={true}> Yes </option>
                </select>
              </div>

              {/* Select rooms */}
              <div className="section-rooms">
                <label htmlFor="rooms" className="label">
                  Rooms
                </label>
                <select
                  name="rooms"
                  id="rooms"
                  multiple
                  onChange={handleSelect}
                  className="selct-options"
                >
                  {loading ? (
                    'Loading...'
                  ) : error ? (
                    <div> {error} </div>
                  ) : (
                    data.map((room) => {
                      return (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>

              <div className="btn-container">
                <button className="btn">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewHotel;
