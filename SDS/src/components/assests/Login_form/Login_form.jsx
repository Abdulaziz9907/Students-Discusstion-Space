import React from 'react'
import "./Login_form.css"
import { useNavigate, useLocation } from 'react-router-dom';
import lf_logo from './elements/Component 1.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login_form = () => {

const navigate = useNavigate();
const location = useLocation();


const[userName,setUserName]=useState();
const[password,setPassword]=useState();

useEffect(() => {
  if (location.state?.showSuccessToast) {
    toast.success('Account created successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  }
  else if(location.state?.showDeletedToast){
    toast.success('Account deleted successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  }
}, [location.state]);


const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post('http://localhost:3002/login',{userName,password}).then(result=>{
    console.log(result);
    if(result.data === "Success"){navigate('/Main Webpage')}
    else{

      toast.error('Username or password is not correct', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });

      document.querySelectorAll('.LF_input-box input').forEach(input => input.style.border = '2px solid red');
    }
    
   }).catch(err=>console.log(err))
}
  return (

    <div className='LF_box'>
      <ToastContainer />


      <div id='LF_login_text'>
      
      <p id='LF_text3'>Welcome to <br></br>
      <strong> Students<br></br> Discussion<br></br> Space</strong></p>
      <img src={lf_logo} alt="comp1" id='lf_logo' />
      <p id='LF_text1'>Login</p>
      <p id='LF_text2'>Enter your account details</p>
      </div>

    <form className="LF_form" onSubmit={handleSubmit}>
      
      <div className='LF_input-box'>
        <label id='LF_user_pass_labels'>Username*</label>
        <input type="text" required onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div className='LF_input-box'>
        <label id='LF_user_pass_labels'>Password*</label> 
        <input type="password" required onChange={(e)=>setPassword(e.target.value)}/>
        </div>

      <button type='submit' id='LF_login_btn' >Login</button>
      <p id='LF_signup_btn'>Don't have an account? <strong><a onClick={() => navigate('/SignUp')}><u>SignUp</u></a></strong></p>
      </form>
      

    </div>
    
  )
}

export default Login_form;
