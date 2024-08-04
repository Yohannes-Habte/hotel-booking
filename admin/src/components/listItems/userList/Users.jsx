import React from 'react';
import './Users.scss';
import { NavLink } from 'react-router-dom';

const Users = ({ user }) => {
  return (
    <div className="user-name-email">
      <NavLink to={`/users/${user._id}`}>
        <span>First Name: {user.firstName} </span>
        <span>Email: {user.email}</span>
      </NavLink>
    </div>
  );
};

export default Users;
