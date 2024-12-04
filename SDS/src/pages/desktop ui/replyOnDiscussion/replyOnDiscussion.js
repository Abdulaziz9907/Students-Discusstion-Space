// replyOnDiscussion.js
import React from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './replyOnDiscussion.css';

function ReplyOnDiscussion() {
  return (
    <div>
      <Navbar />
      <div className="reply-container">
        <h1>Reply On Discussion:</h1>
        <div className="reply-box">
          <label htmlFor="reply" className="reply-label">Write a reply</label>
          <textarea
            id="reply"
            className="reply-input"
            placeholder="Enter your reply between 3-100 words"
          ></textarea>
          <button className="reply-on-btn ">Reply</button>
        </div>
      </div>
    </div>
  );
}

export default ReplyOnDiscussion;
