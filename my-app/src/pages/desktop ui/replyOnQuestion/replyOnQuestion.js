// replyOnQuestion.js
import React from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './replyOnQuestion.css';

function ReplyOnQuestion() {
  return (
    <div>
      <Navbar />
      <div className="reply-container">
        <h1>Reply For Question:</h1>
        <div className="reply-box">
          <label htmlFor="answer" className="answer-label">Write an answer</label>
          <textarea
            id="answer"
            className="answer-input"
            placeholder="Enter your answer between 3-100 words"
          ></textarea>
          <button className="reply-btn">Reply</button>
        </div>
      </div>
    </div>
  );
}

export default ReplyOnQuestion;
