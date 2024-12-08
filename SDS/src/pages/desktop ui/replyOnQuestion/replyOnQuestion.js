import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'; // UseLocation to get the discussion ID
import axios from 'axios'; // Import axios
import './replyOnQuestion.css';

function ReplyOnQuestion() {

  const [replyContent, setReplyContent] = useState(''); // State to store the reply content
  const [questionId, setQuestionId] = useState(null); // Store the discussion ID from the previous page (passed in state)
  
  // Get the questionId from the location state passed when navigating to this page
  const location = useLocation();
  const { questionId: passedQuestionId } = location.state || {};
  
  // If the questionId is passed, set it to state
  useEffect(() => {
    if (passedQuestionId) {
      setQuestionId(passedQuestionId);
    }
  }, [passedQuestionId]);

  const navigate = useNavigate(); // Initialize useNavigate for redirecting after reply

  // Handle the reply submission
  const handleReplySubmit = async () => {
    if (replyContent.trim().length < 3 || replyContent.trim().length > 100) {
      alert("Reply must be between 3-100 characters");
      return;
    }

    try {
      // Send the reply content to the backend
      await axios.post('http://localhost:3002/reply-to-question', {
        questionId: questionId,  // Passing the questionId
        content: replyContent,        // Passing the reply content
        user: 'CurrentUser',          // Replace with actual user data (e.g. from auth context or state)
      });

      
      
      // Navigate back to the Coursequestions page after posting the reply
      navigate("/questionDetails" , { state: { questionId } });
    } catch (error) {
      console.error("Error posting reply:", error);
      alert('Failed to post reply');
    }
  };
  return (
    <div>
      <Navbar />
      <div className="reply-container">
        <h1>Reply For Question:</h1>
        <div className="reply-box">
          <label htmlFor="answer" className="answer-label">Write an answer</label>
          <textarea
            id="answer"
            className="answer-input"
            placeholder="Enter your answer between 3-100 words"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)} // Update reply content as user types
          ></textarea>
          <button className="reply-on-btn" onClick={handleReplySubmit}>Reply</button>
        </div>
      </div>
    </div>
  );
}

export default ReplyOnQuestion;
