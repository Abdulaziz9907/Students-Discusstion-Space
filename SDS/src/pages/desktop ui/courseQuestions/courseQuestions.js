// courseQuestions.js
import React from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './courseQuestions.css';

function CourseQuestions() {
  const questions = [
    {
      id: 1,
      author: 'Mohammed',
      timestamp: '2 hours ago',
      content: 'A particular solution of the differential equation A\'\' + 4A\' - 59 = 8e3, is',
      answers: 0,
    },
    {
      id: 2,
      author: 'Ahmed',
      timestamp: '23 hours ago',
      content: 'In a certain culture of bacteria, the initial amount was 2000. If the number of bacteria doubled after 8 hours, then the number of bacteria present after 24 hours is (Assume the rate of change of population is proportional to the population present at time t)',
      answers: 2,
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="course-container">
        <h1 className='course-name-courseQuestions-page'>MATH208</h1>
        <div className="question-header">
          <div className="question-count">{questions.length} Question/s</div>
          <button className="post-question-btn">Post question</button>
        </div>
        <div className="question-list">
          {questions.map((question) => (
            <div key={question.id} className="question-wrapper">
              <div className="question-box">
                <p>{question.content}</p>
                <div className="question-footer">
                  <span>{question.author} {question.timestamp}</span>
                  <span>{question.answers} answer/s</span>
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

export default CourseQuestions;
