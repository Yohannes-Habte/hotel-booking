import React, { useContext, useState } from 'react';
import './Sidebar.scss';
import { MdDashboard, MdSettingsSystemDaydream } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { MdOutlineBedroomParent } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { ImStatsBars2 } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';
import { SiLogstash } from 'react-icons/si';
import { AiFillSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { BackgroundContext } from '../../context/background/BgProvider';
import { BACKGROUND_ACTION } from '../../context/background/BgReducer';
import { AdminContext } from '../../context/admin/AdminProvider';
import { ADMIN_ACTION } from '../../context/admin/AdminReducer';

const Sidebar = () => {
  // Global variables
  const { dispatch } = useContext(BackgroundContext);
  const { user, dispatch: adminDispatch } = useContext(AdminContext);

  // local variable for hamburger menu
  const [open, setOpen] = useState(false);

  // Admin logout
  const logoutAdmin = () => {
    adminDispatch({ type: ADMIN_ACTION.ADMIN_LOG_OUT });
    localStorage.removeItem('user');
  };

  return (
    <header className="sidebar-header">
      <nav className={open ? 'sidebar active-sidebar' : 'sidebar'}>
        <div className="sidbar-logo">
          <NavLink to={'/'}>
            <span className="logo">LisaBooking</span>
          </NavLink>
        </div>
        <hr className="horizontal-line" />
        <div className="sidbar-lists">
          <ul className="list-items">
            <p className="sub-title"> Main </p>
            <li className="item">
              <MdDashboard className="sidebar-icon" />
              <NavLink to={'/'} className="span-text">
                Dashboard
              </NavLink>
            </li>

            <p className="sub-title"> Lists </p>
            <NavLink to={'/users'}>
              <li className="item">
                <FaUserAlt className="sidebar-icon" />
                <span className="span-text"> Users </span>
              </li>
            </NavLink>

            <NavLink to={'/hotels'}>
              <li className="item">
                <FaProductHunt className="sidebar-icon" />
                <span className="span-text"> Hotels </span>
              </li>
            </NavLink>

            <NavLink to={'/rooms'}>
              <li className="item">
                <MdOutlineBedroomParent className="sidebar-icon" />
                <span className="span-text"> Rooms </span>
              </li>
            </NavLink>

            <p className="sub-title"> Demonstration </p>
            <li className="item">
              <ImStatsBars2 className="sidebar-icon" />
              <span className="span-text"> Statistics </span>
            </li>

            <li className="item">
              <IoIosNotifications className="sidebar-icon" />
              <span className="span-text"> Notifications </span>
            </li>
            <p className="sub-title"> Services </p>
            <li className="item">
              <MdSettingsSystemDaydream className="sidebar-icon" />
              <span className="span-text"> System Health </span>
            </li>

            <li className="item">
              <SiLogstash className="sidebar-icon" />
              <span className="span-text"> Logs </span>
            </li>

            <li className="item">
              <AiFillSetting className="sidebar-icon" />
              <span className="span-text"> Settings </span>
            </li>
            <p className="sub-title"> User </p>
            <li className="item">
              <CgProfile className="sidebar-icon" onClick={logoutAdmin} />
              <span className="span-text">
                {user.firstName}
              </span>
            </li>

            <li className="item">
              <AiOutlineLogout onClick={logoutAdmin} className="sidebar-icon" />
              <span onClick={logoutAdmin} className="span-text">
                Logout
              </span>
            </li>
          </ul>
        </div>
        <article className="backgroung-color">
          <h4 className="bg-title"> Background Color</h4>
          <div className="color-options">
            <div
              className="color-option"
              onClick={() => dispatch({ type: BACKGROUND_ACTION.LIGHT })}
            ></div>

            <div
              className="color-option"
              onClick={() => dispatch({ type: BACKGROUND_ACTION.GRAY })}
            ></div>

            <div
              onClick={() => dispatch({ type: BACKGROUND_ACTION.DARK })}
              className="color-option"
            ></div>
          </div>
        </article>
      </nav>
      <div className="hamburger-menu" onClick={() => setOpen(!open)}>
        <i className={open ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
    </header>
  );
};

export default Sidebar;
