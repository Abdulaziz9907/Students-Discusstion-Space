import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation from react-router-dom
import axios from 'axios'; // Import axios
import { ring2 } from 'ldrs'; // Import the loader library
import './courseQuestions.css';

// Register the loader component
ring2.register();

function CourseQuestions() {
  const [questions, setQuestions] = useState([]); // State to store questions
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const navigate = useNavigate(); // Initialize navigate
  const { state } = useLocation(); // Get state from navigation (the courseName)
  const courseName = state?.courseName || ''; // Get course name from state, or empty string if not provided

  // Fetch questions for the specific course when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://students-discussion-space.onrender.com/questions', {
          params: { courseName }, // Pass courseName as query parameter, empty string will fetch all
        });
        setQuestions(response.data); // Update the state with fetched questions
      } catch (error) {
        setError('Error fetching questions'); // Set error state if there's an issue
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchQuestions(); // Call the function to fetch questions
  }, [courseName]); // Dependency array includes courseName to re-fetch if it changes

  const handlePostQuestion = () => {
    // Pass course name to the next page for posting a new question
    navigate('/PostQuestion', { state: { courseName } });
  };

  const handleReply = (questionId) => {
    navigate('/replyonquestion', { state: { questionId } });
  };

  const handleQuestionClick = (questionId) => {
    // Navigate to the question page with the questionId as a query parameter
    navigate(`/questionDetails`, { state: { questionId } });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <l-ring-2
          size="70"
          stroke="9"
          stroke-length="0.25"
          bg-opacity="0.1"
          speed="0.8"
          color="white"
        ></l-ring-2>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="course-container">
        <h1 className="course-name-courseQuestions-page">{courseName || 'All Courses'}</h1>
        <div className="question-header">
          <div className="question-count">{questions.length} Question/s</div>
          <button className="post-question-btn" onClick={handlePostQuestion}>
            Post question
          </button>
        </div>
        <div className="question-list">
          {questions.map((question) => (
            <div key={question.id} className="question-wrapper">
              <div className="question-box" onClick={() => handleQuestionClick(question._id)}>
                <p>{question.content}</p>
                <div className="question-footer">
                  <span>
                    {question.author} {new Date(question.createdAt).toLocaleString()}
                  </span>
                  <span>{question.replies.length} answer/s</span>
                </div>
              </div>
              <button className="reply-btn" onClick={() => handleReply(question._id)}>
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseQuestions;
