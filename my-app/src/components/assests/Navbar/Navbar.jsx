import React from 'react'
import "./Navbar.css"
import logo1 from './elements/Home.png';
import logo2 from './elements/User.png';
import logo3 from './elements/Log out.png';



const Navbar = () => {
  return (
    <div className='navbar'>

      <div>
      <p id='text1'>Students Discussion Space</p>
</div>
<div>
      <img src={logo1} alt="home" id='home' className='logImage'/>
</div>
      <img src={logo2} alt="account" id='user' className='logImage'/>
<div>

      <img src={logo3} alt="logout" id='logout' className='logImage'/>
</div>

      

    </div>
    
  )
}

export default Navbar;
