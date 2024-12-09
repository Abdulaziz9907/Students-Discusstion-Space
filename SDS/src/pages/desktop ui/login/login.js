import './login.css';
import Login_form from '../../../components/assests/Login_form/Login_form';

import login_logo1 from './elements/Vector1.png';
import login_logo2 from './elements/Vector2.png';
import login_logo3 from './elements/Vector3.png';
import login_logo4 from './elements/Vector4.png';
import login_logo5 from './elements/Vector5.png';
import login_logo6 from './elements/Vector6.png';
import login_logo from './elements/Component 1.png';

function Login() {
  return (
    <div className="login_body">
      {/* Welcome text */}
      <p id="loginWelcome">
        Welcome to <br />
        <strong>
          Students<br />
          Discussion<br />
          Space
        </strong>
      </p>

      {/* Login form container */}
      <div className="login_items">
        <Login_form />
      </div>

      {/* Decorative images */}
      <img src={login_logo1} alt="vector1" id="loginVec1" className="loginLogImage" />
      <img src={login_logo2} alt="vector2" id="loginVec2" className="loginLogImage" />
      <img src={login_logo3} alt="vector3" id="loginVec3" className="loginLogImage" />
      <img src={login_logo4} alt="vector4" id="loginVec4" className="loginLogImage" />
      <img src={login_logo5} alt="vector5" id="loginVec5" className="loginLogImage" />
      <img src={login_logo6} alt="vector6" id="loginVec6" className="loginLogImage" />
      <img src={login_logo} alt="component" id="loginComp1" className="loginLogImage" />
    </div>
  );
}

export default Login;
