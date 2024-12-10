import './Admin_search_main.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import mw_logo3 from './elements/Vector3.png';
import mw_logo4 from './elements/Vector4.png';
import mw_logo5 from './elements/Vector5.png';
import mw_logo6 from './elements/Vector6.png';
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
    if (searchTerm.trim()) {
      navigate('/Account search results', { state: { userName: searchTerm } }); // Pass the search term to SearchResults
    }
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
    <div className="main_webpage_body">
      <div id="mw_items">
        <div>
          <Navbar />
        </div>
        <div>
          <p id="mw_text">Search for a user</p>
        </div>
        <div className="sr_search-container">
          <input
            type="text"
            placeholder="Search by username"
            className="mw_search-bar"
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
      <img src={mw_logo3} alt="comp1" id="mw_Vec3" className="mw_LogImage" />
      <img src={mw_logo4} alt="comp1" id="mw_Vec4" className="mw_LogImage" />
      <img src={mw_logo5} alt="comp1" id="mw_Vec5" className="mw_LogImage" />
      <img src={mw_logo6} alt="comp1" id="mw_Vec6" className="mw_LogImage" />
    </div>
  );
}

export default Admin_search_main;
