// courseDiscussions.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './courseDiscussions.css';

function CourseDiscussions() {
  const [discussions, setDiscussions] = useState([]); // State to store discussions
  const navigate = useNavigate(); // Initialize navigate

  // Fetch discussions from backend when component mounts
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('http://localhost:3002/discussions'); 
        setDiscussions(response.data); // Update the state with fetched discussions
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions(); // Call the function to fetch discussions
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const courseName = 'MATH208'; // Set course name here, could also be dynamic based on context

  const handlePostDiscussion = () => {
    // Pass course name to the next page
    navigate('/PostDiscussion', { state: { courseName } });
  };

  return (
    <div>
      <Navbar />
      <div className="course-container">
        <h1 className='course-name-courseDiscussions-page'>{courseName}</h1>
        <div className="discussion-header">
          <div className="discussion-count">{discussions.length} discussion/s</div>
          <button className="post-discussion-btn" onClick={handlePostDiscussion}>Post discussion</button>
        </div>
        <div className="discussion-list">
          {discussions.map((discussion) => (
            <div key={discussion._id} className="discussion-wrapper">
              <div className="discussion-box">
                <p>{discussion.content}</p>
                <div className="discussion-footer">
                  <span>{discussion.user} {discussion.createdAt}</span>
                  <span>{discussion.replys || 0} reply/s</span>
                </div>
              </div>
              <button className="reply-btn">Reply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDiscussions;
