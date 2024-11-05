import React from 'react'
import "./Login_signup_form.css"



const Login_signup_form = () => {
  return (
    <div className='LS_box'>


      <div id='login_text'>
      <p id='text1'>Login</p>
      <p id='text2'>Enter your account details</p>
      </div>

    <form action=''>
      
      <div className='input-box'>
        <label id='user_pass_labels'>Username*</label>
        <input type="text" required />
        </div>
        <div className='input-box'>
        <label id='user_pass_labels'>Password*</label> 
        <input type="password" required />
        </div>

      <button type='submit'>Login</button>
      <p id='signup_btn'>Don't have an account? <strong><a href="https://example.com"><u>SignUp</u></a></strong></p>
      </form>
      

    </div>
    
  )
}

export default Login_signup_form;
