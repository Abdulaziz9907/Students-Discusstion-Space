import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './Discussion.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const Discussion = () => {
  const [discussion, setDiscussion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Extract ID from URL (assuming React Router is used)
  const discussionId = new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    if (discussionId) {
      fetchDiscussion();
      fetchReplies();
    }
  }, [discussionId, currentPage]);

  const fetchDiscussion = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/discussions/${discussionId}`);
      setDiscussion(response.data);
    } catch (error) {
      console.error('Error fetching discussion:', error);
    }
  };

  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/discussions/${discussionId}/replies?page=${currentPage}`
      );
      setReplies(response.data.replies || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleVote = async (replyId, voteType) => {
    try {
      await axios.post(`http://localhost:3002/discussions/${discussionId}/replies/${replyId}/vote`, {
        voteType,
      });
      fetchReplies(); // Refresh replies after voting
    } catch (error) {
      console.error('Error voting on reply:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReplyRedirect = () => {
    window.location.href = `/reply?id=${discussionId}`;
  };

  return (
    <>
      <header>
        <Navbar />
        <img src={account_logo3} alt="Vector 3" id="Dis_Vec3" className="DisImage" />
        <img src={account_logo4} alt="Vector 4" id="Dis_Vec4" className="DisImage" />
        <img src={account_logo6} alt="Vector 6" id="Dis_Vec6" className="DisImage" />
      </header>

      <main>
        <div className="space"></div>
        <section className="course-section">
          {discussion && (
            <>
              <h2>{discussion.courseName}</h2>
              <h3>Discussion:</h3>
              <div className="discussion">
                <div className="discussion-post">
                  <p className="user-info">
                    <strong>{discussion.user}</strong>
                    <span>{new Date(discussion.createdAt).toLocaleString()}</span>
                  </p>
                  <p>{discussion.content}</p>
                </div>
                <button className="reply-btn" onClick={handleReplyRedirect}>
                  Reply
                </button>
              </div>
            </>
          )}

          {replies.length > 0 && (
            <>
              <h3>Reply/s:</h3>
              {replies.map((reply) => (
                <div key={reply._id} className="reply-section">
                  <div className="reply-content">
                    <p className="user-info">
                      <strong>{reply.user}</strong>
                      <span>{new Date(reply.createdAt).toLocaleString()}</span>
                    </p>
                    <p>{reply.content}</p>
                  </div>
                  <div className="vote">
                    <button
                      className="vote-up"
                      onClick={() => handleVote(reply._id, 'up')}
                    >
                      ⬆
                    </button>
                    <span>{reply.votes}</span>
                    <button
                      className="vote-down"
                      onClick={() => handleVote(reply._id, 'down')}
                    >
                      ⬇
                    </button>
                  </div>
                </div>
              ))}

              <div className="pagination">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    className={currentPage === idx + 1 ? 'active' : ''}
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Discussion;
