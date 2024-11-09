import './signup.css';
import Signup_form from '../../../components/assests/Signup_form/Signup_form';

import signup_logo1 from './elements/Vector7.png';
import signup_logo2 from './elements/Vector2.png';
import signup_logo3 from './elements/Vector3.png';
import signup_logo4 from './elements/Vector4.png';
import signup_logo5 from './elements/Vector5.png';
import signup_logo6 from './elements/Vector6.png';

function Signup() {
  return (

    <body className='signup_body'>
    <div >

      
      <img src={signup_logo1} alt="comp1" id='signup_Vec1' className='signup_LogImage'/>
      <img src={signup_logo2} alt="comp1" id='signup_Vec2' className='signup_LogImage'/>
      <img src={signup_logo3} alt="comp1" id='signup_Vec3' className='signup_LogImage'/>
      <img src={signup_logo4} alt="comp1" id='signup_Vec4' className='signup_LogImage'/>
      <img src={signup_logo5} alt="comp1" id='signup_Vec5' className='signup_LogImage'/>
      <img src={signup_logo6} alt="comp1" id='signup_Vec6' className='signup_LogImage'/>
      
      
      <Signup_form/>

      
      
      
    </div>
    </body>
  );
}


export default Signup;
