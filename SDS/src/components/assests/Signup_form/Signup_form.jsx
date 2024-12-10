import React from 'react'
import "./Signup_form.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup_form = () => {

  const[userName,setUserName]=useState();
  const[fName,setFname]=useState();
  const[lName,setLname]=useState();
  const[major,setMajor]=useState();
  const[password,setPassword]=useState();
  let ratings = 0, 
    questions = 0, 
    answers = 0, 
    files = 0, 
    discussions = 0;

  const navigate = useNavigate();


  const [year, setYear] = useState("");
  const validOptions = ["1", "2", "3", "4", "5", "5+"];

  function handleInputChange (e) {
    setYear(e.target.value); // Update the input value
  };

  function handleInputBlur  () {
    if (!validOptions.includes(year)) {
      alert("Please select a valid option from the list.");
      setYear(""); // Reset the input if invalid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://students-discussion-space.onrender.com/signup', { userName, fName, lName, major, year, password, ratings, questions, answers, files, discussions })
      .then((result) => {
        console.log(result);
        if(result.data === "Username already exists"){
          toast.error('Username already exists please choose another.', {
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
          document.querySelector('.SF_input-box input').style.border = '2px solid red';
          
        }
        
        else{

        

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
            navigate('/', { state: { showSuccessToast: true } });
        }
      })
      .catch((err) => console.log(err));
  };
  


  return (

    <div className='SF_box'>
      <ToastContainer />
      <div id='SF_login_text'>
        <p id='SF_text1'>Signup</p>
        <p id='SF_text2'>Create your account</p>
      </div>

      <form className="SF_form" onSubmit={handleSubmit}>
        <div className='SF_input-box'>
          <label id='SF_user_pass_labels'>Username*</label>
          <input type="text" required 
          onChange={(e)=>setUserName(e.target.value)}
          
          />
        </div>


        <div className='SF_names'>

        <div className='SF_input-box'>
          <label htmlFor="SF_fname_box" id='SF_fname_text'>First name*</label>
          <input id='SF_fname_box' type="text" required 
          onChange={(e)=>setFname(e.target.value)}/>
        </div>
        
        <div className='SF_input-box'>
          <label htmlFor="SF_lname_box" id='SF_lname_text'>Last name*</label>
          <input id='SF_lname_box' type="text" required
          onChange={(e)=>setLname(e.target.value)} />
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
<input type="text" list="SF_major" name="major" autoComplete="on" required 
onChange={(e)=>setMajor(e.target.value)}/>


        </div>

        <div className="SF_input-box">
      <label id="SF_year_label">Year*</label>
      <input
        type="text"
        list="SF_year"
        id="SF_year_input"
        name="year"
        value={year}
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
          <input type="password" required 
          onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        

        <button type='submit' id='SF_create_account_btn'>Create account</button>
        <p id='SF_login_btn'>Already have an account? <strong><a onClick={() => navigate('/')}><u>Login</u></a></strong></p>
      </form>

    </div>
    
  )
}

export default Signup_form;
