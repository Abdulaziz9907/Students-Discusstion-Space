import './signup.css';
import Signup_form from '../../../components/assests/Signup_form/Signup_form';

import logo1 from './elements/Vector1.png';
import logo2 from './elements/Vector2.png';
import logo3 from './elements/Vector3.png';
import logo4 from './elements/Vector4.png';
import logo5 from './elements/Vector5.png';
import logo6 from './elements/Vector6.png';

function Signup() {
  return (

    <body className='signup_body'>
    <div >

      
      <img src={logo1} alt="comp1" id='signup_Vec1' className='signup_LogImage'/>
      <img src={logo2} alt="comp1" id='signup_Vec2' className='signup_LogImage'/>
      <img src={logo3} alt="comp1" id='signup_Vec3' className='signup_LogImage'/>
      <img src={logo4} alt="comp1" id='signup_Vec4' className='signup_LogImage'/>
      <img src={logo5} alt="comp1" id='signup_Vec5' className='signup_LogImage'/>
      <img src={logo6} alt="comp1" id='signup_Vec6' className='signup_LogImage'/>
      
      
      <Signup_form/>

      
      
      
    </div>
    </body>
  );
}


export default Signup;
