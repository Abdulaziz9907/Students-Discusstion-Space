import './Account_info.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import DeleteBtn from '../../../components/assests/DeleteBtn/DeleteBtn';
import { useState } from 'react';
import account_info_logo3 from './elements/Vector3.png';
import account_info_logo4 from './elements/Vector4.png';
import account_info_logo5 from './elements/Vector5.png';
import account_info_logo6 from './elements/Vector6.png';

function Account_info() {





  
    const [isAssigned, setIsAssigned] = useState(false);
  
    function handleClick() {
      setIsAssigned(!isAssigned);
    };




  return (

    <div className='account_info_body'>

    <div id='account_info_items'>

    <div>
      <Navbar/>
      </div>

      <div>
      <p id='account_info_text'>Mohammed Ahmed</p>
     </div> 

     </div>



      <img src={account_info_logo3} alt="comp1" id='account_info_Vec3' className='account_info_LogImage'/>
      <img src={account_info_logo4} alt="comp1" id='account_info_Vec4' className='account_info_LogImage'/>
      <img src={account_info_logo5} alt="comp1" id='account_info_Vec5' className='account_info_LogImage'/>
      <img src={account_info_logo6} alt="comp1" id='account_info_Vec6' className='account_info_LogImage'/>
      

      <div id='account_info_details_container'>

        <div id='account_info_details'>

          <div >
      <p id='account_info_text2'>Personal Info</p>

          <div id='account_info_details1'>

            
              <form>

    <div id='account_info_details_list' className='account_info_underline'>
  <label for="account_info_username">Username:</label>
  <input type="text" id="account_info_username" name="account_info_username" value="Mohammed Ahmed" readonly></input>
  </div>


  <div id='account_info_details_list' className='account_info_underline'>
  <label for="account_info_first-name">first name:</label>
  <input type="text" id="account_info_first-name" name="account_info_first-name" value="Mohammed" readonly></input>
  </div>


  <div id='account_info_details_list' className='account_info_underline'>
  <label for="account_info_last-name" >last name:</label>
  <input type="text" id="account_info_last-name" name="account_info_last-name" value="Ahmed" readonly></input>
  </div>


  <div id='account_info_details_list' className='account_info_underline'>
  <label for="account_info_major">major:</label>
  <input type="text" id="account_info_major" name="account_info_major" value="CS" readonly></input>
  </div>


  <div id='account_info_details_list' className='account_underline'>
  <label for="account_info_level">level:</label>
  <input type="text" id="account_info_level" name="account_info_level" value="Junior" readonly></input>
  </div>


  <div id='account_info_details_list' >
  <label for="account_info_role">Role:</label>
  <input type="text" id="account_info_role" name="account_info_role" value="Not Moderator" readonly></input>
  </div>




              </form>

          </div>


      </div>


      <div >

        <p id='account_info_text2'>Contributions</p>
         <div id='account_details2'>

         <div id='account_info_details_list' className='account_info_underline'>
         <label for="account_info_ratings">2 rating/s</label>
         </div>

         <div id='account_info_details_list' className='account_info_underline'>
         <label for="account_info_questions">5 question/s</label>
         </div>

         <div id='account_info_details_list' className='account_info_underline'>
         <label for="account_info_answers">1 answers/s</label>
          </div>

         <div id='account_info_details_list' className='account_info_underline'>
         <label for="account_info_files">2 file/s uploaded</label>
        </div>


         <div id='account_info_details_list' >
         <label for="account_info_discussions">0 discussion/s</label>
          </div>

         </div>
         
          <div id='account_info_delete_btn'>
          <DeleteBtn/>

          <button class="account_info_assign-button" onClick={handleClick}>
          {isAssigned ? 'Unassign as moderator' : 'Assign as moderator'}
          </button>




          </div>


       </div>

        </div>

     </div>
      
      
    
    </div>
  );
}


export default Account_info;
