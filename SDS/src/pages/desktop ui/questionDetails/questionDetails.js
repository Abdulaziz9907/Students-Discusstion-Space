import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './questionDetails.css';

function QuestionDetails() {
  const { state } = useLocation();
  const  questionId  = state?.questionId || '123'; // Get the questionId from the URL
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the question details from the backend
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3002/questions/${questionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch question details');
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  // Handle vote updates
  const handleVote = async (replyId, voteType) => {
    try {
    
      const response = await fetch(`http://localhost:3002/questions/${questionId}/replies/${replyId}/vote`, {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      });

      if (!response.ok) {
        throw new Error('Failed to update vote');
        
      }

      const updatedReply = await response.json();

      // Update the question state to reflect the new vote count
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        replies: prevQuestion.replies.map((reply) =>
          reply._id === updatedReply._id ? updatedReply : reply
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!question) {
    return <p>Question not found</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="course-container">
        <h1>{question.courseName}</h1>
        <h2>Question</h2>
        <div className="question-wrapper">
          <div className="question-box">
            <p>{question.content}</p>
            <div className="question-footer">
              <span>{question.user} {question.createdAt}</span>
            </div>
          </div>
          <button
            className="reply-btn"
            onClick={() => navigate("/ReplyOnQuestion", { state: { questionId } })}
          >
            Reply
          </button>
        </div>
        <h2>Answers</h2>
        <div className="answer-list">
          {question.replies.map((reply) => (
            <div key={reply._id} className="answer-box">
              <p id="answer-content">{reply.content}</p>
              <div className="answer-footer">
                <span>{reply.user} {reply.createdAt}</span>
                <div className="vote-buttons">
                  <button
                    className="upvote-btn"
                    onClick={() => handleVote(reply._id, 'up')}
                  >
                    ▲
                  </button>
                  <span className="vote-count">{reply.votes}</span>
                  <button
                    className="downvote-btn"
                    onClick={() => handleVote(reply._id, 'down')}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetails;
