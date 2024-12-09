import './main_webpage.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import mw_logo3 from './elements/Vector3.png';
import mw_logo4 from './elements/Vector4.png';
import mw_logo5 from './elements/Vector5.png';
import mw_logo6 from './elements/Vector6.png';
import { useContext, useEffect, useState } from 'react';
import mw_search from './elements/search.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import addlogo from './elements/add.png';
import managelogo from './elements/manage.png';
import dashboardlogo from './elements/dashboard.png';
import { UserContext } from '../../../context/userContext';
import { ring2 } from 'ldrs';

ring2.register();

function Main_webpage() {
  const { userName } = useContext(UserContext);
  console.log(userName + " account in mainpage ");
  const [courseId, setSearchTerm] = useState('');
  const [topCourses, setTopCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const handleViewDetails = (courseId) => {
    navigate('/CourseDetails', { state: { courseId } }); // Navigate with courseName
  };

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3002/visits');
        const sortedCourses = response.data
          .sort((a, b) => b.visits - a.visits)
          .slice(0, 4);
        setTopCourses(sortedCourses);
      } catch (error) {
        console.error('Error fetching top courses:', error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };
    fetchTopCourses();
  }, []);

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
    <div className="main_webpage_body">
      <div id="mw_items">
        <div>
          <Navbar />
        </div>
        <div>
          <p id="mw_text">Discover Course Insights and Ratings</p>
        </div>
        <div className="sr_search-container">
          <input
            type="text"
            placeholder="search"
            className="mw_search-bar"
            value={courseId}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        {userName === 'admin' && (
          <div className="action-buttons">
            <button className="add-course-btn">
              <img src={addlogo} alt="add" id="add" className="ControlImage" /> Add new course
            </button>
            <button className="manage-users-btn">
              <img src={managelogo} alt="manage" id="manage" className="ControlImage" /> Manage Users
            </button>
          </div>
        )}
      </div>
      <img src={mw_logo3} alt="comp1" id="mw_Vec3" className="mw_LogImage" />
      <img src={mw_logo4} alt="comp1" id="mw_Vec4" className="mw_LogImage" />
      <img src={mw_logo5} alt="comp1" id="mw_Vec5" className="mw_LogImage" />
      <img src={mw_logo6} alt="comp1" id="mw_Vec6" className="mw_LogImage" />

      <div id="mw_suggestions_container">
        <div id="mw_suggestions">
          <p id="mw_text2">Most Visited Courses</p>
          {loading ? (
            <div className="loading-container-mainpage">
              <l-ring-2
                size="70"
                stroke="9"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="white"
              ></l-ring-2>
            </div>
          ) : (
            topCourses.map((course, index) => (
              <div key={index} id={`mw_sgst${index + 1}`}>
                <span className={`mw_sgst${index + 1}-text`}>{course.courseId}</span>
                <button
                  className="mw_sgst-button"
                  onClick={() => handleViewDetails(course.courseId)}
                >
                  View details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Main_webpage;
