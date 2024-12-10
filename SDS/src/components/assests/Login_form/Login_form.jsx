import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { UserContext } from '../../../context/userContext';
import './Login_form.css';
import lf_logo from './elements/Component 1.png';

const Login_form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserName } = useContext(UserContext); // Access context setter
  const [userName, setUserNameLocal] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (location.state?.showSuccessToast) {
      toast.success('Account created successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Flip,
      });
    }

    else if(location.state?.showDeletedToast){
      toast.success('Account deleted successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Flip,
    });}


  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://students-discussion-space.onrender.com/login', { userName, password })
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          setUserName(userName); // Store userName in global context
          navigate('/Main Webpage');
        } else {
          toast.error('Username or password is not correct', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Flip,
          });
          document.querySelectorAll('.LF_input-box input').forEach(input => input.style.border = '2px solid red');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="LF_box">
      <ToastContainer />

      <div id="LF_login_text">
        <p id="LF_text3">
          Welcome to <br />
          <strong>Students<br />Discussion<br />Space</strong>
        </p>
        <img src={lf_logo} alt="logo" id="lf_logo" />
        <p id="LF_text1">Login</p>
        <p id="LF_text2">Enter your account details</p>
      </div>

      <form className="LF_form" onSubmit={handleSubmit}>
        <div className="LF_input-box">
          <label id="LF_user_pass_labels">Username*</label>
          <input
            type="text"
            required
            onChange={(e) => setUserNameLocal(e.target.value)}
          />
        </div>
        <div className="LF_input-box">
          <label id="LF_user_pass_labels">Password*</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" id="LF_login_btn">
          Login
        </button>
        <p id="LF_signup_btn">
          Don't have an account?{' '}
          <strong>
            <a onClick={() => navigate('/SignUp')}>
              <u>SignUp</u>
            </a>
          </strong>
        </p>
      </form>
    </div>
  );
};

export default Login_form;
