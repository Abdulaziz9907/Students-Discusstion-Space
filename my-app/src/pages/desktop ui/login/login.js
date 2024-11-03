import './login.css';
import Login_signup_form from '../../../components/assests/Login_signup_form/Login_signup_form';
import logo1 from './elements/Vector1.png';
import logo2 from './elements/Vector2.png';
import logo3 from './elements/Vector3.png';
import logo4 from './elements/Vector4.png';
import logo5 from './elements/Vector5.png';
import logo6 from './elements/Vector6.png';
import logo from './elements/Component 1.png';

function Login() {
  return (
    <div >
      
      <p id='Welcome'>Welcome to <br></br>
      <strong> Students<br></br> Discussion<br></br> Space</strong></p>
      
      <img src={logo1} alt="comp1" id='vec1' className='logImage'/>
      <img src={logo2} alt="comp1" id='vec2' className='logImage'/>
      <img src={logo3} alt="comp1" id='vec3' className='logImage'/>
      <img src={logo4} alt="comp1" id='vec4' className='logImage'/>
      <img src={logo5} alt="comp1" id='vec5' className='logImage'/>
      <img src={logo6} alt="comp1" id='vec6' className='logImage'/>
      <img src={logo} alt="comp1" id='comp1' className='logImage'/>
      <Login_signup_form/>

      
      
      
    </div>
  );
}


export default Login;
