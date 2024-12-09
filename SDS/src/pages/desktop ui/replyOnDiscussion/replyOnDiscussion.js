import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'; // UseLocation to get the discussion ID
import axios from 'axios'; // Import axios
import './replyOnDiscussion.css';

function ReplyOnDiscussion() {
  const [replyContent, setReplyContent] = useState(''); // State to store the reply content
  const [discussionId, setDiscussionId] = useState(null); // Store the discussion ID from the previous page (passed in state)
  
  // Get the discussionId from the location state passed when navigating to this page
  const location = useLocation();
  const { discussionId: passedDiscussionId } = location.state || {};
  
  // If the discussionId is passed, set it to state
  useEffect(() => {
    if (passedDiscussionId) {
      setDiscussionId(passedDiscussionId);
    }
  }, [passedDiscussionId]);

  const navigate = useNavigate(); // Initialize useNavigate for redirecting after reply

  // Handle the reply submission
  const handleReplySubmit = async () => {
    if (replyContent.trim().length < 3 || replyContent.trim().length > 100) {
      alert("Reply must be between 3-100 characters");
      return;
    }

    try {
      // Send the reply content to the backend
      await axios.post('http://localhost:3002/reply-to-discussion', {
       
        discussionId: discussionId,  // Passing the discussionId
        content: replyContent,        // Passing the reply content
        user: 'CurrentUser',          // Replace with actual user data (e.g. from auth context or state)
      });


      
      
      // Navigate back to the CourseDiscussions page after posting the reply
      navigate(`/Discussion?id=${discussionId}`);
    } catch (error) {
      console.error("Error posting reply:", error);
      alert('Failed to post reply');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reply-container">
        <h1>Reply On Discussion:</h1>
        <div className="reply-box">
          <label htmlFor="reply" className="reply-label">Write a reply</label>
          <textarea
            id="reply"
            className="reply-input"
            placeholder="Enter your reply between 3-100 words"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)} // Update reply content as user types
          ></textarea>
          <button className="reply-on-btn" onClick={handleReplySubmit}>Reply</button>
        </div>
      </div>
    </div>
  );
}

export default ReplyOnDiscussion;
