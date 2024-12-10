import './Admin_search_main.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import asm_logo3 from './elements/Vector3.png';
import asm_logo4 from './elements/Vector4.png';
import asm_logo5 from './elements/Vector5.png';
import asm_logo6 from './elements/Vector6.png';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import addlogo from './elements/add.png';
import managelogo from './elements/manage.png';
import { UserContext } from '../../../context/userContext';

function Admin_search_main() {
  const { userName } = useContext(UserContext);
  console.log(userName + " account in Admin_search_main ");
  const [searchTerm, setSearchTerm] = useState(''); // Updated variable name
  const navigate = useNavigate();

  const handleSearch = () => {
      navigate('/Account search results', { state: { userName: searchTerm } }); // Pass the search term to SearchResults
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  const handleAddCourse = () => {
    navigate('/AddCourse');
  };

  const handleManageUsers = () => {
    navigate('/Admin_search_main');
  };

  return (
    <div className="asm_body">
      <div id="asm_items">
        <div>
          <Navbar />
        </div>
        <div>
          <p id="asm_text">Search for a user</p>
        </div>
        <div className="asm_search-container">
          <input
            type="text"
            placeholder="Search by username"
            className="asm_search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {userName === 'admin' && (
          <div className="action-buttons">
            <button className="add-course-btn" onClick={handleAddCourse}>
              <img src={addlogo} alt="add" id="add" className="ControlImage" /> Add new course
            </button>
            <button className="manage-users-btn" onClick={handleManageUsers}>
              <img src={managelogo} alt="manage" id="manage" className="ControlImage" /> Manage Users
            </button>
          </div>
        )}
      </div>
      <img src={asm_logo3} alt="comp1" id="asm_Vec3" className="asm_LogImage" />
      <img src={asm_logo4} alt="comp1" id="asm_Vec4" className="asm_LogImage" />
      <img src={asm_logo5} alt="comp1" id="asm_Vec5" className="asm_LogImage" />
      <img src={asm_logo6} alt="comp1" id="asm_Vec6" className="asm_LogImage" />
    </div>
  );
}

export default Admin_search_main;
