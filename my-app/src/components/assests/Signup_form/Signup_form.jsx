import React from 'react'
import "./Signup_form.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



;
const Signup_form = () => {

const navigate = useNavigate()


  const [inputValue, setInputValue] = useState("");
  const validOptions = ["1", "2", "3", "4", "5", "5+"];

  function handleInputChange (e) {
    setInputValue(e.target.value); // Update the input value
  };

  function handleInputBlur  () {
    if (!validOptions.includes(inputValue)) {
      alert("Please select a valid option from the list.");
      setInputValue(""); // Reset the input if invalid
    }
  };


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


        <div className='SF_names'>

        <div className='SF_input-box'>
          <label for="SF_fname_box" id='SF_fname_text'>First name*</label>
          <input id='SF_fname_box' type="text" required />
        </div>
        
        <div className='SF_input-box'>
          <label for="SF_lname_box" id='SF_lname_text'>Last name*</label>
          <input id='SF_lname_box' type="text" required />
        </div>

        </div>

<div className='SF_lists_selectors'>

        <div className='SF_input-box'>
          <label id='SF_major_label'>Major*</label>

          <datalist id="SF_major" name="major"  required>
          <option value="AE"></option>
          <option value="EE"></option>
          <option value="ME"></option>
          <option value="PHYS"></option>
          <option value="CIE"></option>
          <option value="EEPH"></option>
          <option value="CHE"></option>
          <option value="MSE"></option>
          <option value="CHEM"></option>
          <option value="BIOE"></option>
          <option value="CE"></option>
          <option value="ARE"></option>
          <option value="ITD"></option>
          <option value="SSC"></option>
          <option value="ESE"></option>
          <option value="CS"></option>
          <option value="SWE"></option>
          <option value="COE"></option>
          <option value="ISE"></option>
          <option value="MATH"></option>
          <option value="AS"></option>
          <option value="PETE"></option>
          <option value="GEOP"></option>
          <option value="GEOL"></option>
          <option value="MINE"></option>
          <option value="HRM"></option>
          <option value="FIN"></option>
          <option value="MKT"></option>
          <option value="ACCT"></option>
          <option value="MIS"></option>
</datalist>
<input type="text" list="SF_major" name="major" autoComplete="on" required />


        </div>

        <div className="SF_input-box">
      <label id="SF_year_label">Year*</label>
      <input
        type="text"
        list="SF_year"
        id="SF_year_input"
        name="year"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur} 
        required
      />
      <datalist id="SF_year">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="5+">5+</option>
      </datalist>
    </div>

      </div>
      

        <div className='SF_input-box'>
          <label id='SF_password'>Password*</label>
          <input type="password" required />
        </div>
        

        <button type='submit' id='SF_create_account_btn'>Create account</button>
        <p id='SF_login_btn'>Already have an account? <strong><a onClick={() => navigate('/')}><u>Login</u></a></strong></p>
      </form>

    </div>
    
  )
}

export default Signup_form;
