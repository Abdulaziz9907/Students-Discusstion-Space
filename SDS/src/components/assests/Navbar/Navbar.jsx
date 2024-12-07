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

<button className="navButtons" onClick={() => navigate('/Main Webpage')}>
    <img src={logo_h} alt="home" id="home" className="logImageNav" />
    <span className="navText" >Home</span>
  </button>
  <button className="navButtons" onClick={() => navigate('/Account')}>
    <img src={logo_u} alt="account" id="user" className="logImageNav" />
    <span className="navText">Account</span>
  </button>
  <button className="navButtons" onClick={() => navigate('/')}>
    <img src={logo_l} alt="logout" id="logout" className="logImageNav" />
    <span className="navText">Signout</span>
  </button>

      

    </div>
    
  )
}

export default Navbar;
