import React from 'react'
import "./Signup_form.css"

const Signup_form = () => {
  return (

    <div className='SF_box'>

      <div id='SF_login_text'>
        <p id='SF_text1'>Signup</p>
        <p id='SF_text2'>Create your account</p>
      </div>

      <form className="SF_form" action=''>
        <div className='SF_input-box'>
          <label id='SF_user_pass_labels'>Username*</label>
          <input type="text" required />
        </div>

        
       
        <div className='SF_input-box'>
          <label id='SF_fname'>First name*</label>
          <input type="text" required />
        </div>

        <div className='SF_input-box'>
          <label id='SF_lname'>Last name*</label>
          <input type="text" required />
        </div>

        <div className='SF_input-box'>
          <label id='SF_major'>Major*</label>
          <select name="major" required>
  <option value="coe">COE</option>
  <option value="cs">CS</option>
  
</select>
        </div>

        <div className='SF_input-box'>
          <label id='SF_year'>Year*</label>
          <select name="year" required>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">5+</option>
</select>
        </div>

        <div className='SF_input-box'>
          <label id='SF_password'>Password*</label>
          <input type="password" required />
        </div>
        

        <button type='submit' id='SF_create_account_btn'>Create account</button>
        <p id='SF_login_btn'>Already have an account? <strong><a href="https://example.com"><u>Login</u></a></strong></p>
      </form>

    </div>
    
  )
}

export default Signup_form;
