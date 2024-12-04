import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState } from 'react';
import './Reply.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const ReplyDiscussion = () => {
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim() === '') {
      setError(true);
    } else {
      setError(false);
      // Redirect to Discussion page
      window.location.href = 'Discussion';
    }
  };

  return (
    <>
      <header>
        <Navbar/>
        <img src={account_logo3} alt="comp1" id="Dis_Vec3" className="DisImage" />
        <img src={account_logo4} alt="comp2" id="Dis_Vec4" className="DisImage" />
        <img src={account_logo6} alt="comp3" id="Dis_Vec6" className="DisImage" />
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
