import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import axios from 'axios';
import { userInputs } from '../../../data/DataFormSource';
import './NewUser.scss';

const NewUser = () => {
  const [file, setFile] = useState('');
  const [userInfo, setUserInfo] = useState({});

  // Handle change fuction
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Submit User Info
  const submitUserInfo = async (e) => {
    e.preventDefault();

    // Upload Image from the form data
    const data = new FormData();
    data.append('file', file);
    // upload preset
    data.append('upload_preset', 'upload');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
        data
      );
      const { url } = response.data;

      // New User
      const newUser = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        phone: userInfo.phone,
        city: userInfo.city,
        country: userInfo.country,
        image: url,
      };

      // Send the new user to backend
      await axios.post(`http://localhost:9900/api/users/register`, newUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="new-user-page">
      <Sidebar />
      <section className="new-user-container">
        <Navbar />
        <article className="add-user-container">
          <h3 className="title"> Add New User </h3>
        </article>
        <div className="form-container">
          <figure className="left-cotainer">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg'
              }
              alt=""
              className="image"
            />
          </figure>
          <div className="right-cotainer">
            <form onSubmit={submitUserInfo} action="" className="form">
              <div className="file-input-container">
                <input
                  type="file"
                  name="file"
                  id="file"
                  // upload only one image
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-field"
                />

                <label htmlFor="file" className="file-label">
                  Image: <FaCloudUploadAlt className="icon" />
                </label>
              </div>

              {userInputs.map((input) => {
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

              <div className="btn-container">
                <button className="btn">Send</button>
              </div>

              <div className="btn-container"></div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewUser;
