import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { UserContext } from '../../context/user/UserProvider';
import { FaUserCircle } from 'react-icons/fa';
import { USER_ACTION } from '../../context/user/UserReducer';

const Navbar = () => {
  // Global state variable
  const { user, dispatch } = useContext(UserContext);

  // Local state variables
  const [clicked, setClicked] = useState(false);

  // Function that handle the hamburger menu
  const handleClick = () => setClicked(!clicked);
  const openItem = () => {
    setClicked(false);
  };

  // Logout function
  const logout = () => {
    dispatch({ type: USER_ACTION.LOGOUT });
    localStorage.removeItem('user');
  };

  return (
    <nav className="navbar">
      <h2 className="title">
        <NavLink to={'/'} className={'title-link'}>
          LisaHotel
        </NavLink>
      </h2>
      <section
        className={clicked ? 'navbar-container activeMode' : 'navbar-container'}
      >
        {/* Navigation to home page, about page and Hotels page */}
        <ul className="items">
          <li onClick={openItem} className="item">
            <NavLink
              to={'/'}
              style={({ isActive }) => ({
                textDecoration: isActive && 'underline',
                color: isActive && 'red',
              })}
              className={'link'}
            >
              Home
            </NavLink>
          </li>

          <li onClick={openItem} className="item">
            <NavLink
              to={'/about'}
              style={({ isActive }) => ({
                textDecoration: isActive && 'underline',
                color: isActive && 'red',
              })}
              className={'link'}
            >
              About
            </NavLink>
          </li>

          <li onClick={openItem} className="item">
            <NavLink
              to={'/rooms'}
              style={({ isActive }) => ({
                textDecoration: isActive && 'underline',
                color: isActive && 'red',
              })}
              className={'link'}
            >
              Rooms
            </NavLink>
          </li>

          <li onClick={openItem} className="item">
            <NavLink
              to={'/contact'}
              style={({ isActive }) => ({
                textDecoration: isActive && 'underline',
                color: isActive && 'red',
              })}
              className={'link'}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Navigation to singup page and login page */}
        {user ? (
          <div className="user-info">
            <p className="userName">{user.firstName}</p>
            <FaUserCircle className="user-icon" onClick={logout} />
          </div>
        ) : (
          <ul className="signup-login">
            <li onClick={openItem} className="account-item">
              <NavLink to={'/register'} className={'link'}>
                Sign Up
              </NavLink>
            </li>
            <li onClick={openItem} className="account-item">
              <NavLink to={'/login'} className={'link'}>
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </section>

      <div onClick={handleClick} className="hamburger-icon">
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
    </nav>
  );
};

export default Navbar;
