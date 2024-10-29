import React from 'react'
import "./Login_signup_form.css"

const Login_signup_form = () => {
  return (
    <div className='box'>

    <form action=''>
      
      <h1>Login</h1>
      <h5>Enter your account details</h5>
      

      <div className='input-box'>
        <input type="text" placeholder="Username" required />
        </div>

        <div className='input-box'>
        <input type="password" placeholder="Password" required />
        </div>
      


      <button type='submit'>Login</button>
      <p>Don't have an account? <strong><a href="https://example.com">SignUp</a></strong></p>
      </form>
      

    </div>
    
  )
}

export default Login_signup_form;
