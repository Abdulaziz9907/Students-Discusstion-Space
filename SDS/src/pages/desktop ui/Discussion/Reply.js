import Navbar from '../../../components/assests/Navbar/Navbar';
import axios from 'axios';
import './Reply.css';

import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/userContext';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const ReplyDiscussion = () => {
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState(false);

  const discussionId = new URLSearchParams(window.location.search).get('id');
  const username = useContext(UserContext).userName;

  const handleReplySubmit = async () => {
    if (replyText.trim() === '') {
      setError(true);
      return;
    }

    setError(false);

    try {
      await axios.post(`https://students-discussion-space.onrender.com/discussions/${discussionId}/reply`, {
        user: username,
        content: replyText,
      });

      window.location.href = `/discussion?id=${discussionId}`;
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  return (
    <>
      <header id="reply-header">
        <Navbar />
        <img src={account_logo3} alt="Vector 3" id="reply-vector-3" className="reply-image" />
        <img src={account_logo4} alt="Vector 4" id="reply-vector-4" className="reply-image" />
        <img src={account_logo6} alt="Vector 6" id="reply-vector-6" className="reply-image" />
      </header>

      <main id="reply-main">
        <div id="reply-space"></div>
        <section id="reply-section123">
          <h2 id="reply-heading">Reply for discussion:</h2>
          <div id="reply-box">
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
            <button id="reply-submit-btn" onClick={handleReplySubmit}>
              Reply
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ReplyDiscussion;
