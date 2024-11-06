import './login.css';
import Login_form from '../../../components/assests/Login_form/Login_form';

import logo1 from './elements/Vector1.png';
import logo2 from './elements/Vector2.png';
import logo3 from './elements/Vector3.png';
import logo4 from './elements/Vector4.png';
import logo5 from './elements/Vector5.png';
import logo6 from './elements/Vector6.png';
import logo from './elements/Component 1.png';

function Login() {
  return (

    <body className='login_body'>
    <div >

      
      <p id='loginWelcome'>Welcome to <br></br>
      <strong> Students<br></br> Discussion<br></br> Space</strong></p>
      
      <img src={logo1} alt="comp1" id='loginVec1' className='loginLogImage'/>
      <img src={logo2} alt="comp1" id='loginVec2' className='loginLogImage'/>
      <img src={logo3} alt="comp1" id='loginVec3' className='loginLogImage'/>
      <img src={logo4} alt="comp1" id='loginVec4' className='loginLogImage'/>
      <img src={logo5} alt="comp1" id='loginVec5' className='loginLogImage'/>
      <img src={logo6} alt="comp1" id='loginVec6' className='loginLogImage'/>
      <img src={logo} alt="comp1" id='loginComp1' className='loginLogImage'/>
      
      <Login_form/>

      
      
      
    </div>
    </body>
  );
}


export default Login;
