import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { FaSearch } from 'react-icons/fa';
import { MdLanguage, MdMessage } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';
import { VscColorMode } from 'react-icons/vsc';
import { BackgroundContext } from '../../context/background/BgProvider';
import { BACKGROUND_ACTION } from '../../context/background/BgReducer';
import { AdminContext } from '../../context/admin/AdminProvider';
import { CgProfile } from 'react-icons/cg';
import { ADMIN_ACTION } from '../../context/admin/AdminReducer';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import Users from '../listItems/userList/Users';

const Navbar = ({ itemName }) => {
  // Locat state variables for specific user, hotel or room
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===============================================
  // Handle search for users
  // ===============================================
  const handleUser = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:9900/api/users?search=${search}`
      );
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Global function used to delete all users, hotels or rooms
  const { dispatch } = useContext(BackgroundContext);
  const { user, dispatch: adminDispatch } = useContext(AdminContext);
  const { deleteData: users } = useFetch(`http://localhost:9900/api/users`);
  const { deleteData: hotels } = useFetch(`http://localhost:9900/api/hotels`);
  const { deleteData: rooms } = useFetch(`http://localhost:9900/api/rooms`);

  // Change background color
  const dynamicColor = () => {
    dispatch({ type: BACKGROUND_ACTION.TOGGLE });
  };

  // Admin logout
  const logoutAdmin = () => {
    adminDispatch({ type: ADMIN_ACTION.ADMIN_LOG_OUT });
    localStorage.removeItem('user');
  };

  return (
    <nav className="navbar">
      <div className="wrapper">
        {/* Search container */}
        <div className="search">
          <input
            type="text"
            onChange={(e) => handleUser(e.target.value)}
            placeholder="Search..."
            className="navbar-input"
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="search-result">
          {/* Render searched users that display 10 users */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResults
              ?.slice(0, 10) // Question mark (?) is optional chaining
              .map((user) => <Users key={user._id} user={user} />)
          )}
        </div>

        <div className="button-container">
          {itemName === 'users' && (
            <button onClick={users} className="delete-all">
              Delet All Users
            </button>
          )}
          {itemName === 'hotels' && (
            <button onClick={hotels} className="delete-all">
              Delet All Hotels
            </button>
          )}
          {itemName === 'rooms' && (
            <button onClick={rooms} className="delete-all">
              Delet All Rooms
            </button>
          )}
        </div>

        {/* Items container */}
        <div className="items">
          <div className="item">
            <MdLanguage className="navbar-icon" />
          </div>

          <div className="item">
            <VscColorMode className="navbar-icon" onClick={dynamicColor} />
          </div>

          <div className="item">
            <IoMdNotifications className="navbar-icon" />
            <div className="counter">1</div>
          </div>

          <div className="item">
            <MdMessage className="navbar-icon" />
            <div className="counter">1</div>
          </div>

          <div className="item">
            {user ? (
              <div className="logout-admin">
                <span className="first-name"> {user.firstName} </span>
                <CgProfile onClick={logoutAdmin} className="profile-icon" />
              </div>
            ) : (
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                alt="Profile"
                className="navbar-profile"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
