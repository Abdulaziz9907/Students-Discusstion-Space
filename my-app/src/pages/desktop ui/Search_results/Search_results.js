import './Search_results.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import FooterNav from '../../../components/assests/FooterNav/FooterNav';
import sr_logo3 from './elements/Vector3.png';
import sr_logo4 from './elements/Vector4.png';
import sr_logo5 from './elements/Vector5.png';
import sr_logo6 from './elements/Vector6.png';
import { useState } from 'react';

function Search_results() {

  var Search="math"

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };




  return (

    <div className='sr_body'>

    <div id='sr_items'>

    <div>
      <Navbar/>
      </div>

      <div>
      <p id='sr_text'>Search Results For: {Search}</p>
     </div> 

     

     <div class="sr_search-container">
      <input type="text" placeholder="Search" class="sr_search-bar" value="Math208" ></input>
     
      </div>
      
</div>

      <img src={sr_logo3} alt="comp1" id='sr_Vec3' className='sr_LogImage'/>
      <img src={sr_logo4} alt="comp1" id='sr_Vec4' className='sr_LogImage'/>
      <img src={sr_logo5} alt="comp1" id='sr_Vec5' className='sr_LogImage'/>
      <img src={sr_logo6} alt="comp1" id='sr_Vec6' className='sr_LogImage'/>
      

      

<div id='sr_results_container'>

  <div id='sr_results'>

      <div id='sr_result1'> 
      <span class="sr_result1-text">1-Math208</span>
      <button class="sr_result-button">View details</button>


      </div>

        <div id='sr_result2'> 

        <span class="sr_result2-text">2-COE301</span>
        <button class="sr_result-button">View details</button>

        </div>

        <div id='sr_result3'> 

        <span class="sr_result3-text">3-ENGL214</span>
        <button class="sr_result-button">View details</button>

        </div>

        <div id='sr_result4'> 

        <span class="sr_result4-text">4-SWE363</span>
        <button class="sr_result-button">View details</button>

        </div>

        <div id='sr_result5'> 

        <span class="sr_result5-text">5-MATH101</span>
        <button class="sr_result-button">View details</button>
</div>



    </div>




        </div>

        <div className='sr_results-footer'>
        <FooterNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>


</div>


  );
}


export default Search_results;
