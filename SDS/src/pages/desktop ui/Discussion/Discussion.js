import axios from 'axios';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './Discussion.css';

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/userContext';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const Discussion = () => {
  const [discussion, setDiscussion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const discussionId = new URLSearchParams(window.location.search).get('id');
  const { username } = useContext(UserContext);

  useEffect(() => {
    if (discussionId) {
      fetchDiscussion();
      fetchReplies();
    }
  }, [discussionId, currentPage]);

  const fetchDiscussion = async () => {
    try {
      const response = await axios.get(`https://students-discussion-space.onrender.com/discussions/${discussionId}`);
      setDiscussion(response.data);
    } catch (error) {
      console.error('Error fetching discussion:', error);
    }
  };

  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `https://students-discussion-space.onrender.com/discussions/${discussionId}`
        ///https://students-discussion-space.onrender.com/discussions/${discussionId}/replies?page=${currentPage}
      );
      setReplies(response.data.replies || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching replies:', error);
      alert("error")
    }
  };

  const handleVote = async (replyId, voteType) => {
    try {
      const response = await axios.post(
        `https://students-discussion-space.onrender.com/discussions/${discussionId}/replies/${replyId}/vote`,
        {
          username,
          voteType,
        }
      );
      fetchReplies();
    } catch (error) {
      console.error('Error voting on reply:', error);
      alert('Failed to cast vote. Please try again.');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReplyRedirect = () => {
    window.location.href = `/reply?id=${discussionId}&username=${username}`;
  };

  return (
    <>
      <header id="discussion-header">
        <Navbar />
        <img src={account_logo3} alt="Vector 3" id="Dis_Vec3" className="DisImage" />
        <img src={account_logo4} alt="Vector 4" id="Dis_Vec4" className="DisImage" />
        <img src={account_logo6} alt="Vector 6" id="Dis_Vec6" className="DisImage" />
      </header>

      <main id="discussion-main">
        <div id="discussion-space"></div>
        <section id="discussion-course-section">
          {discussion && (
            <>
              <h2 id="discussion-title">{discussion.courseName}</h2>
              <h3 id="discussion-heading">Discussion:</h3>
              <div id="discussion-container">
                <div id="discussion-post">
                  <p id="discussion-user-info">
                    <strong>{discussion.user}</strong>
                    <span>{new Date(discussion.createdAt).toLocaleString()}</span>
                  </p>
                  <p id="discussion-content">{discussion.content}</p>
                </div>
                <button id="discussion-reply-btn" onClick={handleReplyRedirect}>
                  Reply
                </button>
              </div>
            </>
          )}

          {replies.length > 0 && (
            <>
              <h3 id="replies-heading">Reply/s:</h3>
              {replies.map((reply) => (
                <div key={reply._id} id="reply-section321">
                  <div id="reply-content">
                    <p id="reply-user-info">
                      <strong>{reply.user}</strong>
                      <span>{new Date(reply.createdAt).toLocaleString()}</span>
                    </p>
                    <p id="reply-text">{reply.content}</p>
                  </div>
                  <div id="reply-vote">
                    <button
                      id="reply-vote-up"
                      onClick={() => handleVote(reply._id, 'up')}
                    >
                      ⬆
                    </button>
                    <span id="reply-vote-count">{reply.votes}</span>
                    <button
                      id="reply-vote-down"
                      onClick={() => handleVote(reply._id, 'down')}
                    >
                      ⬇
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      </main>
      <footer id="discussion-pagination-footer">
      <div id="pagination-container">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            id={`pagination-btn-${idx + 1}`}
            className={currentPage === idx + 1 ? 'active' : ''}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </footer>

    </>
  );
};

export default Discussion;