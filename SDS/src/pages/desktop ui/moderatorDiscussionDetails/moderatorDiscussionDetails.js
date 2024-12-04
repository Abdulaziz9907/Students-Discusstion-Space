import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './moderatorDiscussionDetails.css';

function ModeratorDiscussionDetails() {
  const [isPinned, setIsPinned] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const question = {
    author: 'Ahmed',
    timestamp: '23 hours ago',
    content: 'In a certain culture of bacteria, the initial amount was 2000. If the number of bacteria doubled after 8 hours, then the number of bacteria present after 24 hours is (Assume the rate of change of population is proportional to the population present at time t)',
    answers: [
      {
        id: 1,
        author: 'Mohammed',
        timestamp: '2 hours ago',
        content: 'To determine the number of bacteria after 24 hours, we start with the initial amount of 2000 bacteria. The problem states that the population doubles every 8 hours. Number of doublings = 24 hours / 8 hours per doubling = 3 doublings. Population after 24 hours = 2000 × 2^3 = 2000 × 8 = 16,000. Thus, the number of bacteria present after 24 hours is 16,000.',
        upvotes: 5,
        downvotes: 2,
      },
      {
        id: 2,
        author: 'Sara',
        timestamp: '1 hour ago',
        content: 'The number of bacteria is 2000. It doubles every 8 hours, so after 24 hours, it probably just gets really big. I think it might be around 100,000 or something. It’s just a lot of bacteria, you know?',
        upvotes: 3,
        downvotes: 1,
      }
    ]
  };

  const handlePinClick = () => {
    setIsPinned(!isPinned);
  };

  const handleBanClick = () => {
    setShowBanModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const closeBanModal = () => {
    setShowBanModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    navigate('/CourseDiscussions'); // Redirect to CourseDiscussions page after closing
  };

  return (
    <div>
      <Navbar />
      <div className="course-container">
        <h1>MATH208</h1>
        <h2>Discussion</h2>
        <div className="question-wrapper">
          <div className="action-buttons">
            <button onClick={handlePinClick} className={isPinned ? "active" : ""}>Pin</button>
            <button onClick={handleDeleteClick}>Delete</button>
            <button onClick={handleBanClick}>Ban</button>
          </div>
          <div className="question-box">
            <p>{question.content}</p>
            <div className="question-footer">
              <span>{question.author} {question.timestamp}</span>
              {isPinned && (
                <div className="pin-status">
                  📌 <span>This discussion is pinned</span>
                </div>
              )}
            </div>
          </div>
          <button className="reply-btn">Reply</button>
        </div>
        <h2>Replies</h2>
        <div className="answer-list">
          {question.answers.map((answer) => (
            <div key={answer.id} className="answer-box">
              <p id='answer-content'>{answer.content}</p>
              <div className="answer-footer">
                <span>{answer.author} {answer.timestamp}</span>
                <div className="vote-buttons">
                  <button className="upvote-btn">▲</button>
                  <span className="vote-count">{answer.upvotes - answer.downvotes}</span>
                  <button className="downvote-btn">▼</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Ban Confirmation Modal */}
        {showBanModal && (
          <div className="ban-modal">
            <div className="ban-modal-content">
              <p>User is banned successfully</p>
              <div className="checkmark">✓</div>
              <button onClick={closeBanModal} className="close-modal-btn">Close</button>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="ban-modal">
            <div className="ban-modal-content">
              <p>Question is removed successfully</p>
              <div className="checkmark">✓</div>
              <button onClick={closeDeleteModal} className="close-modal-btn">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModeratorDiscussionDetails;
