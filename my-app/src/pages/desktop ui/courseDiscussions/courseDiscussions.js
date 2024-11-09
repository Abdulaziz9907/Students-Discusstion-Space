// courseDiscussions.js
import React from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './courseDiscussions.css';

function CourseDiscussions() {
  const discussions = [
    {
      id: 1,
      author: 'Mohammed',
      timestamp: '2 hours ago',
      content: 'A particular solution of the differential equation A\'\' + 4A\' - 59 = 8e3, is',
      replys: 0,
    },
    {
      id: 2,
      author: 'Ahmed',
      timestamp: '23 hours ago',
      content: 'In a certain culture of bacteria, the initial amount was 2000. If the number of bacteria doubled after 8 hours, then the number of bacteria present after 24 hours is (Assume the rate of change of population is proportional to the population present at time t)',
      replys: 2,
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="course-container">
        <h1 className='course-name-courseDiscussions-page'>MATH208</h1>
        <div className="discussion-header">
          <div className="discussion-count">{discussions.length} discussion/s</div>
          <button className="post-discussion-btn">Post discussion</button>
        </div>
        <div className="discussion-list">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="discussion-wrapper">
              <div className="discussion-box">
                <p>{discussion.content}</p>
                <div className="discussion-footer">
                  <span>{discussion.author} {discussion.timestamp}</span>
                  <span>{discussion.replys} reply/s</span>
                </div>
              </div>
              <button className="reply-btn">Reply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDiscussions;
