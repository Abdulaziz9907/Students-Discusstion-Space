import React from 'react'
import "./Login_form.css"
import { useNavigate } from 'react-router-dom';


const Login_form = () => {

const navigate = useNavigate();


  return (


    <div className='LF_box'>


      <div id='LF_login_text'>
      
      <p id='LF_text3'>Students<br></br> Discussion Space</p>
      <p id='LF_text1'>Login</p>
      <p id='LF_text2'>Enter your account details</p>
      </div>

    <form className="LF_form" action=''>
      
      <div className='LF_input-box'>
        <label id='LF_user_pass_labels'>Username*</label>
        <input type="text" required />
        </div>
        <div className='LF_input-box'>
        <label id='LF_user_pass_labels'>Password*</label> 
        <input type="password" required />
        </div>

      <button type='submit' id='LF_login_btn' >Login</button>
      <p id='LF_signup_btn'>Don't have an account? <strong><a onClick={() => navigate('/SignUp')}><u>SignUp</u></a></strong></p>
      </form>
      

    </div>
    
  )
}

export default Login_form;
