// postDiscussion.js
import React from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './postDiscussion.css';

function PostDiscussion() {
  return (
    <div>
      <Navbar />
      <div className="post-discussion-container">
        <h1>Enter discussion:</h1>
        <div className="post-discussion-box">
          <label htmlFor="discussion" className="discussion-label">Write a discussion</label>
          <textarea
            id="discussion"
            className="discussion-input"
            placeholder="Enter your discussion between 3-100 words"
          ></textarea>
          <button className="post-btn">Post</button>
        </div>
      </div>
    </div>
  );
}

export default PostDiscussion;
