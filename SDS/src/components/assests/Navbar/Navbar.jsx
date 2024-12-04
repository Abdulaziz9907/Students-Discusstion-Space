import React from 'react'
import "./Navbar.css"
import logo_h from './elements/Home.png';
import logo_u from './elements/User.png';
import logo_l from './elements/Logout.png';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {


  const navigate = useNavigate();


  return (
    <div className='navbar'>

<span id="site_name">Students Discussion Space</span>

<button class="navButtons" onClick={() => navigate('/Main Webpage')}>
    <img src={logo_h} alt="home" id="home" class="logImageNav" />
    <span class="navText" >Home</span>
  </button>
  <button class="navButtons" onClick={() => navigate('/Account')}>
    <img src={logo_u} alt="account" id="user" class="logImageNav" />
    <span class="navText">Account</span>
  </button>
  <button class="navButtons" onClick={() => navigate('/')}>
    <img src={logo_l} alt="logout" id="logout" class="logImageNav" />
    <span class="navText">Signout</span>
  </button>

      

    </div>
    
  )
}

export default Navbar;
