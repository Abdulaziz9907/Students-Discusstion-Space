import React, { useState } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate, useLocation } from 'react-router-dom'; // Import for navigation
import './postQuestion.css';

function PostQuestion() {
  const [questionContent, setQuestionContent] = useState(''); // State to store question content
  const navigate = useNavigate(); // Initialize navigate
  const { state } = useLocation(); // Get state from navigation (the courseName)
  const courseName = state?.courseName || 'testCourse'; // Get course name from state, or empty string if not provided

  // Handle the question submission
  const handlePostQuestion = async () => {
    if (questionContent.trim().length < 3 || questionContent.trim().length > 100) {
      alert("Question must be between 3-100 characters");
      return;
    }

    try {
      // Send the question to the backend
      
      await axios.post('https://students-discussion-space.onrender.com/add-question', {
        courseName: courseName, // Send the courseName
        content: questionContent, // Send the question content
        user: 'CurrentUser', // Replace with actual user data (e.g. from auth context or state)
      });

      alert('Question posted successfully!');
      navigate('/courseQuestions', { state: { courseName } }); // Navigate back to the course questions page with courseName

    } catch (error) {
      console.error("Error posting question:", error);
      alert('Failed to post question');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="post-question-container">
        <h1>Enter Question:</h1>
        <div className="post-question-box">
          <label htmlFor="question" className="question-label">Write a question</label>
          <textarea
            id="question"
            className="question-input"
            placeholder="Enter your question between 3-100 words"
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)} // Update question content as user types
          ></textarea>
          <button className="post-btn" onClick={handlePostQuestion}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default PostQuestion;
