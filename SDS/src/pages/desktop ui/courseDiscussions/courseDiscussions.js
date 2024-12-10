import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ring2 } from 'ldrs'; // Import the loader library
import './courseDiscussions.css';

// Register the loader component
ring2.register();

function CourseDiscussions() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const courseName = state?.courseName || '';

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('https://students-discussion-space.onrender.com/discussions', {
          params: { courseName },
        });
        setDiscussions(response.data);
      } catch (error) {
        setError('Error fetching discussions');
        console.error('Error fetching discussions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, [courseName]);

  const handlePostDiscussion = () => {
    navigate('/PostDiscussion', { state: { courseName } });
  };

  const handleReply = (discussionId) => {
    navigate('/replyondiscussion', { state: { discussionId } });
  };

  const handleDiscussionClick = (discussionId) => {
    navigate(`/Discussion?id=${discussionId}`);
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
        <h1 className="course-name-courseDiscussions-page">{courseName || 'All Courses'}</h1>
        <div className="discussion-header">
          <div className="discussion-count">{discussions.length} discussion/s</div>
          <button className="post-discussion-btn" onClick={handlePostDiscussion}>
            Post discussion
          </button>
        </div>
        <div className="discussion-list">
          {discussions.map((discussion) => (
            <div key={discussion._id} className="discussion-wrapper">
              <div className="discussion-box" onClick={() => handleDiscussionClick(discussion._id)}>
                <p>{discussion.content}</p>
                <div className="discussion-footer">
                  <span>
                    {discussion.user} {new Date(discussion.createdAt).toLocaleString()}
                  </span>
                  <span>{discussion.replies.length} reply/s</span>
                </div>
              </div>
              <button
                className="reply-btn"
                onClick={() => handleReply(discussion._id)}
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
