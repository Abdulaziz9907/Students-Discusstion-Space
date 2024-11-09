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

          <div id='account_details1'>

            
              <form>

    <div id='account_details_list' className='account_underline'>
  <label for="account_username">Username:</label>
  <input type="text" id="account_username" name="account_username" value="Abdullaziz363" readonly></input>
  <button type="button" onclick="editField('username')">Edit</button>
  </div>


  <div id='account_details_list' className='account_underline'>
  <label for="account_first-name">first name:</label>
  <input type="text" id="account_first-name" name="account_first-name" value="Abdullaziz" readonly></input>
  <button type="button" onclick="editField('first-name')">Edit</button>
  </div>


  <div id='account_details_list' className='account_underline'>
  <label for="account_last-name" >last name:</label>
  <input type="text" id="account_last-name" name="account_last-name" value="Hakami" readonly></input>
  <button type="button" onclick="editField('last-name')">Edit</button>
  </div>


  <div id='account_details_list' className='account_underline'>
  <label for="account_major">major:</label>
  <input type="text" id="account_major" name="account_major" value="CS" readonly></input>
  <button type="button" onclick="editField('major')">Edit</button>
  </div>


  <div id='account_details_list' className='account_underline'>
  <label for="account_level">level:</label>
  <input type="text" id="account_level" name="account_level" value="Junior" readonly></input>
  <button type="button" onclick="editField('level')">Edit</button>
  </div>


  <div id='account_details_list' >
  <label for="account_password">password:</label>
  <input type="password" id="account_password" name="account_password" value="stu-ccm123" readonly></input>
  <button type="button" onclick="editField('password')">Edit</button>
  </div>




              </form>

          </div>


      </div>


      <div >

        <p id='account_text2'>Contributions</p>
         <div id='account_details2'>

         <div id='account_details_list' className='account_underline'>
         <label for="account_ratings">2 rating/s</label>
         </div>

         <div id='account_details_list' className='account_underline'>
         <label for="account_questions">5 question/s</label>
         </div>

         <div id='account_details_list' className='account_underline'>
         <label for="account_answers">1 answers/s</label>
          </div>

         <div id='account_details_list' className='account_underline'>
         <label for="account_files">2 file/s uploaded</label>
        </div>


         <div id='account_details_list' >
         <label for="account_discussions">0 discussion/s</label>
          </div>

         </div>
         
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
