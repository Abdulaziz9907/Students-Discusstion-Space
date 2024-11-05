import React from 'react'
import "./Navbar.css"
import logo1 from './elements/Home.png';
import logo2 from './elements/User.png';
import logo3 from './elements/Logout.png';



const Navbar = () => {
  return (
    <div className='navbar'>

<span id="site_name">Students Discussion Space</span>

<button class="navButtons">
    <img src={logo1} alt="home" id="home" class="logImageNav" />
    <span class="navText">Home</span>
  </button>
  <button class="navButtons">
    <img src={logo2} alt="account" id="user" class="logImageNav" />
    <span class="navText">Account</span>
  </button>
  <button class="navButtons">
    <img src={logo3} alt="logout" id="logout" class="logImageNav" />
    <span class="navText">Signout</span>
  </button>

      

    </div>
    
  )
}

export default Navbar;
