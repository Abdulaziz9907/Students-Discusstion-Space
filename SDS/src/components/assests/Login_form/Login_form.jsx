import React from 'react'
import "./Login_form.css"
import { useNavigate } from 'react-router-dom';
import lf_logo from './elements/Component 1.png';
import { useState } from 'react';
import axios from 'axios';

const Login_form = () => {

const navigate = useNavigate();

const[userName,setUserName]=useState();
const[password,setPassword]=useState();

const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post('http://localhost:3002/login',{userName,password}).then(result=>{
    console.log(result);
    if(result.data === "Success"){navigate('/Main Webpage')}
    else{
      document.querySelectorAll('.LF_input-box input').forEach(input => input.style.border = '2px solid red');
    }
    
   }).catch(err=>console.log(err))
}
  return (

    <div className='LF_box'>


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
