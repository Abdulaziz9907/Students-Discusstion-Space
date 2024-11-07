import './main_webpage.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import mw_logo3 from './elements/Vector3.png';
import mw_logo4 from './elements/Vector4.png';
import mw_logo5 from './elements/Vector5.png';
import mw_logo6 from './elements/Vector6.png';

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

     </div>

<div class="mw_search-container">
      <input type="text" placeholder="Search" class="mw_search-bar"></input>
      </div>

      <img src={mw_logo3} alt="comp1" id='mw_Vec3' className='mw_LogImage'/>
      <img src={mw_logo4} alt="comp1" id='mw_Vec4' className='mw_LogImage'/>
      <img src={mw_logo5} alt="comp1" id='mw_Vec5' className='mw_LogImage'/>
      <img src={mw_logo6} alt="comp1" id='mw_Vec6' className='mw_LogImage'/>
      

      <div id='mw_suggestions'>
      <p id='mw_text'>Most Visited Courses</p>

     </div>
      
      
    
    </div>
  );
}


export default main_webpage;
