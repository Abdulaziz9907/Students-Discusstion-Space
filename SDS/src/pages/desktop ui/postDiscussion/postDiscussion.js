// postDiscussion.js
import React, { useState , useContext } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './postDiscussion.css';
import { UserContext } from '../../../context/userContext';

function PostDiscussion() {
  const { userName } = useContext(UserContext);
  
  const [discussionContent, setDiscussionContent] = useState('');
  const { state } = useLocation(); // Get state from navigation
  const navigate = useNavigate();

  const courseName = state?.courseName || 'All courses'; // Get course name from state

  // Handle the discussion submission
  const handlePostDiscussion = async () => {
    if (discussionContent.trim().length < 3 || discussionContent.trim().length > 100) {
      alert("Discussion must be between 3-100 words");
      return;
    }

    try {
      // Send POST request to backend to create new discussion
      await axios.post('https://students-discussion-space.onrender.com/add-discussion', {
        courseName,
        content: discussionContent,
        user: userName, // Replace this with actual logged-in user's data
      });

      // Navigate back to discussions page after posting
      navigate('/CourseDiscussions', { state: { courseName } });
    } catch (error) {
      console.error("Error posting discussion:", error);
      alert('Failed to post discussion');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="post-discussion-container">
        <h1>Enter discussion for {courseName}:</h1>
        <div className="post-discussion-box">
          <label htmlFor="discussion" className="discussion-label">Write a discussion</label>
          <textarea
            id="discussion"
            className="discussion-input"
            placeholder="Enter your discussion between 3-100 words"
            value={discussionContent}
            onChange={(e) => setDiscussionContent(e.target.value)} // Update state as user types
          ></textarea>
          <button className="post-btn" onClick={handlePostDiscussion}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default PostDiscussion;
