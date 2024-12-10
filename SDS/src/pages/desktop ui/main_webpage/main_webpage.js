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
import { ToastContainer, toast, Flip } from 'react-toastify';

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



  const handleDeleteClick = async (courseId) => {
    console.log("Attempting to delete course with courseId:", courseId);
      try {
        const response = await fetch(`http://localhost:3002/delete-course/${courseId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        console.log("Response from server:", data);
        if (response.ok) {
          
          toast.success('Course deleted successfully', {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Flip,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1200); 
          
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error while deleting course:", error);
        alert("An error occurred while deleting the course.");
      }
    };
  



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

  const handleAddCourse= () =>{
    navigate('/AddCourse');
  }

  const handleManageUsers= () =>{
    navigate('/Admin_search_main');
  }

  return (
    <div className="main_webpage_body">
      <ToastContainer />
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
            <button className="add-course-btn" onClick={() => handleAddCourse()}>
              <img src={addlogo} alt="add" id="add" className="ControlImage" /> Add new course
            </button>
            <button className="manage-users-btn" onClick={() => handleManageUsers()}>
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

                <div id='sr_btns'> 

                {userName === 'admin' && (
                  <button className="sr_Delete-button" onClick={() => handleDeleteClick(course.courseId)}>Delete course</button>
                  )}

                <button
                  className="mw_sgst-button"
                  onClick={() => handleViewDetails(course.courseId)}
                >
                  View details
                </button>

                  </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Main_webpage;
