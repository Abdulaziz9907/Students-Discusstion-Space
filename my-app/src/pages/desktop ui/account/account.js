import './account.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import DeleteBtn from '../../../components/assests/DeleteBtn/DeleteBtn';

import account_logo3 from './elements/Vector3.png';
import account_logo4 from './elements/Vector4.png';
import account_logo5 from './elements/Vector5.png';
import account_logo6 from './elements/Vector6.png';

function account() {
  return (

    <div className='account_body'>

    <div id='account_items'>

    <div>
      <Navbar/>
      </div>

      <div>
      <p id='account_text'>Account</p>
     </div> 

     </div>



      <img src={account_logo3} alt="comp1" id='account_Vec3' className='account_LogImage'/>
      <img src={account_logo4} alt="comp1" id='account_Vec4' className='account_LogImage'/>
      <img src={account_logo5} alt="comp1" id='account_Vec5' className='account_LogImage'/>
      <img src={account_logo6} alt="comp1" id='account_Vec6' className='account_LogImage'/>
      

      <div id='account_details_container'>

        <div id='account_details'>

          <div >
      <p id='account_text2'>Personal Info</p>

          <div id='account_details1'></div>


      </div>


      <div >

        <p id='account_text2'>Contributions</p>
         <div id='account_details2'></div>
          {/*<button id='account_delete_btn'>Delete account</button>*/}

          <span id='account_delete_btn'>
          <DeleteBtn/>
          </span>


       </div>

        </div>

     </div>
      
      
    
    </div>
  );
}


export default account;
