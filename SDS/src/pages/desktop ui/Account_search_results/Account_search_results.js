import './Account_search_results.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import FooterNav from '../../../components/assests/FooterNav/FooterNav';
import asr_logo3 from './elements/Vector3.png';
import asr_logo4 from './elements/Vector4.png';
import asr_logo5 from './elements/Vector5.png';
import asr_logo6 from './elements/Vector6.png';
import { useState } from 'react';

function Account_search_results() {
  const Search = "Mohammed";
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
  };

  // Array state to track each button's state
  const [isAssignedArray, setIsAssignedArray] = useState(
    new Array(5).fill(false) // Adjust the array size as per the number of results
  );

  const handleAssignClick = (index) => {
    setIsAssignedArray((prev) => {
      const newAssignedArray = [...prev];
      newAssignedArray[index] = !newAssignedArray[index];
      return newAssignedArray;
    });
  };

  return (
    <div className='asr_body'>
      <div id='asr_items'>
        <div>
          <Navbar />
        </div>
        <div>
          <p id='asr_text'>Search Results For: {Search}</p>
        </div>
        <div className="asr_search-container">
          <input type="text" placeholder="Search" className="asr_search-bar" value={Search} />
        </div>
      </div>

      <img src={asr_logo3} alt="comp1" id='asr_Vec3' className='asr_LogImage' />
      <img src={asr_logo4} alt="comp1" id='asr_Vec4' className='asr_LogImage' />
      <img src={asr_logo5} alt="comp1" id='asr_Vec5' className='asr_LogImage' />
      <img src={asr_logo6} alt="comp1" id='asr_Vec6' className='asr_LogImage' />

      <div id='asr_results_container'>
        <div id='asr_results'>
          {['1-Mohammed Ahmed', '2-Mohammed Emad', '3-Mohammed Sultan', '4-Mohammed Ali', '5-Mohammed Thabit'].map((name, index) => (
            <div id={`asr_result${index + 1}`} key={index}>
              <span className={`asr_result${index + 1}-text`}>{name}</span>
              <button className="asr_Delete-button" onClick={handleClick}>Delete account</button>
              <button className="asr_Assign_Unassign-button" onClick={() => handleAssignClick(index)}>
                {isAssignedArray[index] ? 'Unassign as moderator' : 'Assign as moderator'}
              </button>
              <button className="asr_result-button">View details</button>
            </div>
          ))}
        </div>
      </div>

      <div className='asr_results-footer'>
        <FooterNav
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Account_search_results;
