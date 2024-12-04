import './main_webpage.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import mw_logo3 from './elements/Vector3.png';
import mw_logo4 from './elements/Vector4.png';
import mw_logo5 from './elements/Vector5.png';
import mw_logo6 from './elements/Vector6.png';
import mw_search from './elements/search.png';

function main_webpage() {
  return (

    <div className='main_webpage_body'>

    <div id='mw_items'>

    <div>
      <Navbar/>
      </div>

      <div>
      <p id='mw_text'>Discover Course Insights and Ratings</p>
     </div> 

    

     <div class="sr_search-container">
      <input type="text" placeholder="search" class="mw_search-bar" ></input>
     
      </div>
 </div>
 
      <img src={mw_logo3} alt="comp1" id='mw_Vec3' className='mw_LogImage'/>
      <img src={mw_logo4} alt="comp1" id='mw_Vec4' className='mw_LogImage'/>
      <img src={mw_logo5} alt="comp1" id='mw_Vec5' className='mw_LogImage'/>
      <img src={mw_logo6} alt="comp1" id='mw_Vec6' className='mw_LogImage'/>
      

      <div id='mw_suggestions_container'>

        <div id='mw_suggestions'>
      <p id='mw_text2'>Most Visited Courses</p>
        

        <div id='mw_sgst1'> 
        <span class="mw_sgst1-text">Math208</span>
        <button class="mw_sgst-button">View details</button>
        

        </div>

        <div id='mw_sgst2'> 

        <span class="mw_sgst2-text">COE301</span>
        <button class="mw_sgst-button">View details</button>

        </div>

        <div id='mw_sgst3'> 

        <span class="mw_sgst3-text">ENGL214</span>
        <button class="mw_sgst-button">View details</button>

        </div>

        <div id='mw_sgst4'> 

        <span class="mw_sgst4-text">SWE363</span>
        <button class="mw_sgst-button">View details</button>

        </div>

        </div>

     </div>
      
      
    
    </div>
  );
}


export default main_webpage;
