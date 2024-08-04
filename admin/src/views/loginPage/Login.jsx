import React, { useContext, useRef, useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';
import { AdminContext } from '../../context/admin/AdminProvider';
import ErrorMessage from '../../utiles/ErrorMessage';
import Loading from '../../utiles/Loading';
import AlertMessageBox from '../../utiles/AlertMessageBox';
import { ADMIN_ACTION } from '../../context/admin/AdminReducer';

const Login = () => {
  const navigate = useNavigate();

  // Global state variables
  const { loading, error, user, dispatch } = useContext(AdminContext);

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailChange, setEmailChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  // useRef hook to focus on specific issues
  const emailRef = useRef();

  // Function handling Email Validation
  const checkEmailFormat = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    if (emailRegex) {
      emailRef.current.className = 'errorInvisible';
      //emailRef.current.style.display = "none"
    } else {
      emailRef.current.className = 'errorVisible';
      //passwordRef.current.style.display = "block"
    }
  };

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        setEmailChange(true);
        break;
      case 'password':
        setPassword(event.target.value);
        setPasswordChange(true);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const resetVariables = () => {
    setEmail('');
    setEmailChange(false);
    setPassword('');
    setPasswordChange(false);
  };

  // Login and Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: ADMIN_ACTION.LOGIN_START });
    try {
      // The body
      const currentUser = {
        email: email,
        password: password,
      };

      const { data } = await axios.post(
        `http://localhost:9900/api/users/login`,
        currentUser
      );

      if (data.isAdmin) {
        dispatch({ type: ADMIN_ACTION.LOGIN_SUCCESS, payload: data.details });
        navigate('/');
        // Save admin in the local storage
        localStorage.setItem('user', JSON.stringify(data.details));
      } else {
        dispatch({
          type: ADMIN_ACTION.LOGIN_FAILED,
          payload: alert('You are unauthorized!'),
        });
      }

      resetVariables();
    } catch (err) {
      dispatch({ type: ADMIN_ACTION.LOGIN_FAILED, payload: ErrorMessage(err) });
    }
  };

  return (
    <main className="lagin-page">
      <Helmet>
        <title> Log In </title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessageBox> {error} </AlertMessageBox>
      ) : (
        <div className="login-container">
          <figure className="login-icon-container">
            <FaUserAlt className="login-icon" />
          </figure>
          <fieldset className="login-fieldset">
            <legend className="login-legend"> Admin Login </legend>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-container">
                <FaUserAlt className="icon" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={updateData}
                  onBlur={checkEmailFormat}
                  placeholder="Enter Email"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Email Address
                </label>
                <div
                  className={
                    emailChange && email.trim().length === 0
                      ? 'errorVisible'
                      : 'errorInvisible'
                  }
                  ref={emailRef}
                >
                  Email is required
                </div>
                <div className="errorInvisible" ref={emailRef}>
                  Incorrect email format!
                </div>
              </div>

              <div className="input-container">
                <RiLockPasswordFill className="icon" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={updateData}
                  placeholder="Enter Password"
                  className="input-field"
                />
                <label htmlFor="" className="input-label">
                  Password
                </label>
              </div>

              <div className="login-checkbox-forget-password">
                <div className="login-checkbox-keep-signed-in">
                  <input
                    type="checkbox"
                    name="login"
                    className="login-checkbox"
                  />
                  <span>Keep me signed in</span>
                </div>
                <div className="forget-password">
                  <a
                    href="https://www.youtube.com/watch?v=k3Vfj-e1Ma4&t=10686s"
                    className="link"
                  >
                    Forget your password?
                  </a>
                </div>
              </div>

              <div className="btn-signup-container">
                <button className="login-button"> Log In</button>
                <p className="haveNoAccount">
                  Don't have an account?{' '}
                  <NavLink to="/register">Sign Up</NavLink>
                </p>
              </div>
            </form>
          </fieldset>
        </div>
      )}
    </main>
  );
};

export default Login;
