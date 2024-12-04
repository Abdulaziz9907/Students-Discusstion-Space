// postQuestion.js
import React from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './postQuestion.css';

function PostQuestion() {
  return (
    <div>
      <Navbar />
      <div className="post-question-container">
        <h1>Enter Question:</h1>
        <div className="post-question-box">
          <label htmlFor="question" className="question-label">Write a question</label>
          <textarea
            id="question"
            className="question-input"
            placeholder="Enter your question between 3-100 words"
          ></textarea>
          <button className="post-btn">Post</button>
        </div>
      </div>
    </div>
  );
}

export default PostQuestion;
