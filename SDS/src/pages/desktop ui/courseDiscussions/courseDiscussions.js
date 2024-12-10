import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation from react-router-dom
import axios from 'axios'; // Import axios
import './courseDiscussions.css';

function CourseDiscussions() {
  const [discussions, setDiscussions] = useState([]); // State to store discussions
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const navigate = useNavigate(); // Initialize navigate
  const { state } = useLocation(); // Get state from navigation (the courseName)
  const courseName = state?.courseName || ''; // Get course name from state, or empty string if not provided

  // Fetch discussions for the specific course when component mounts
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('https://students-discussion-space.onrender.com/discussions', {
          params: { courseName } // Pass courseName as query parameter, empty string will fetch all
        });
        setDiscussions(response.data); // Update the state with fetched discussions
      } catch (error) {
        setError('Error fetching discussions'); // Set error state if there's an issue
        console.error("Error fetching discussions:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchDiscussions(); // Call the function to fetch discussions
  }, [courseName]); // Dependency array includes courseName to re-fetch if it changes

  const handlePostDiscussion = () => {
    // Pass course name to the next page for posting a new discussion
    navigate('/PostDiscussion', { state: { courseName } });
  };

  const handleReply = (discussionId) => {
    navigate('/replyondiscussion', { state: { discussionId } });
  };

  const handleDiscussionClick = (discussionId) => {
    // Navigate to the Discussion page with the discussionId as a query parameter
    navigate(`/Discussion?id=${discussionId}`);
  };

  if (loading) {
    return <div>Loading discussions...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an issue fetching discussions
  }

  return (
    <div>
      <Navbar />
      <div className="course-container">
        <h1 className='course-name-courseDiscussions-page'>{courseName || 'All Courses'}</h1>
        <div className="discussion-header">
          <div className="discussion-count">{discussions.length} discussion/s</div>
          <button className="post-discussion-btn" onClick={handlePostDiscussion}>Post discussion</button>
        </div>
        <div className="discussion-list">
          {discussions.map((discussion) => (
            <div key={discussion._id} className="discussion-wrapper">
              <div className="discussion-box" onClick={() => handleDiscussionClick(discussion._id)}>
                <p>{discussion.content}</p>
                <div className="discussion-footer">
                  <span>{discussion.user} {new Date(discussion.createdAt).toLocaleString()}</span>
                  <span>{discussion.replies.length} reply/s</span>
                </div>
              </div>
              <button
                className="reply-btn"
                onClick={() => handleReply(discussion._id)} // Navigate to reply page with discussion ID
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDiscussions;
