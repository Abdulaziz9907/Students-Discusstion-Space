import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import './Reply.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const ReplyDiscussion = () => {
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState(false);

  // Extract discussion ID from the URL query parameter
  const discussionId = new URLSearchParams(window.location.search).get('id');

  const handleReplySubmit = async () => {
    if (replyText.trim() === '') {
      setError(true);
      return;
    }

    setError(false);

    try {
      // Send reply to backend
      await axios.post(`http://localhost:3002/discussions/${discussionId}/reply`, {
        user: 'current_user', // Replace with actual user information
        content: replyText,
      });

      // Redirect back to the discussion page
      window.location.href = `/discussion?id=${discussionId}`;
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
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
        <section className="reply-section2">
          <h2>Reply for discussion:</h2>
          <div className="reply-box">
            <label
              htmlFor="reply-text"
              id="reply-label"
              className={error ? 'error' : ''}
            >
              Write your reply*
            </label>
            <textarea
              id="reply-text"
              placeholder="Write your reply here between 3-100 words"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            <button className="submit-btn" onClick={handleReplySubmit}>
              Reply
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ReplyDiscussion;
