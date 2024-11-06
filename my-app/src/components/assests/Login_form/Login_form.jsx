import React from 'react'
import "./Login_form.css"



const Login_form = () => {
  return (


    <div className='LF_box'>


      <div id='LF_login_text'>
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

      <button type='submit' id='LF_login_btn'>Login</button>
      <p id='LF_signup_btn'>Don't have an account? <strong><a href="https://example.com"><u>SignUp</u></a></strong></p>
      </form>
      

    </div>
    
  )
}

export default Login_form;
