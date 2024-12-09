import './CourseDetails.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import mw_logo3 from './elements/Vector3.png';
import mw_logo4 from './elements/Vector4.png';
import mw_logo5 from './elements/Vector5.png';
import mw_logo6 from './elements/Vector6.png';
import mw_search from './elements/search.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function CourseDetails() {


  const [courseId, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (courseId.trim()) {
      navigate('/Search Results', { state: { courseId } }); // Pass the search term to SearchResults
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };


  return (

    <div className='cd_body'>

    <div id='cd_items'>

    <div>
      <Navbar/>
      </div>

      <div>
      <p id='cd_text'>Discover Course Insights and Ratings</p>
     </div> 

    
 </div>
 
      <img src={mw_logo3} alt="comp1" id='mw_Vec3' className='mw_LogImage'/>
      <img src={mw_logo4} alt="comp1" id='mw_Vec4' className='mw_LogImage'/>
      <img src={mw_logo5} alt="comp1" id='mw_Vec5' className='mw_LogImage'/>
      <img src={mw_logo6} alt="comp1" id='mw_Vec6' className='mw_LogImage'/>
      

      <div id='cd_details_container'>

        <div id='cd_details'>
      
        

        <div id='cd_details1'> 
        <span class="cd_details1-text">Course Difficulty Rating:</span>
        <button class="cd_details-button">View details</button>
        

        </div>

        <div id='cd_details2'> 

        <span class="cd_details2-text">Questions section:</span>
        <button class="cd_details-button">View details</button>

        </div>

        <div id='cd_details3'> 

        <span class="cd_details3-text">Discussions section:</span>
        <button class="cd_details-button">View details</button>

        </div>

        <div id='cd_details4'> 

        <span class="cd_details4-text">Files:</span>
        <button class="cd_details-button">View details</button>

        </div>

        </div>

     </div>
      
      
    
    </div>
  );
}


export default CourseDetails;
