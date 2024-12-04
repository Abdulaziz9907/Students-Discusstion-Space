import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState } from 'react';
import './Discussion.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const Discussion = () => {
  const [upvoteClicked, setUpvoteClicked] = useState(false);
  const [downvoteClicked, setDownvoteClicked] = useState(false);
  const [votes, setVotes] = useState(6);

  const handleUpvote = () => {
    if (!upvoteClicked) {
      setVotes(downvoteClicked ? votes + 2 : votes + 1);
      setUpvoteClicked(true);
      setDownvoteClicked(false);
    } else {
      setVotes(votes - 1);
      setUpvoteClicked(false);
    }
  };

  const handleDownvote = () => {
    if (!downvoteClicked) {
      setVotes(upvoteClicked ? votes - 2 : votes - 1);
      setDownvoteClicked(true);
      setUpvoteClicked(false);
    } else {
      setVotes(votes + 1);
      setDownvoteClicked(false);
    }
  };

  const handleReply = () => {
    window.location.href = 'Reply';
  };

  return (
    <>
      <header>
        <Navbar />
        <img src={account_logo3} alt="comp1" id="Dis_Vec3" className="DisImage" />
        <img src={account_logo4} alt="comp2" id="Dis_Vec4" className="DisImage" />
        <img src={account_logo6} alt="comp3" id="Dis_Vec6" className="DisImage" />
      </header>

      <main>
        <div className="space"></div>
        <section className="course-section">
          <h2>MATH208</h2>
          <div className="discussion">
            <div className="discussion-post">
              <p>
                <strong>ahmed</strong> <span>23 hour/s ago</span>
              </p>
              <p>Can I take this course with ENGL214 in summer?</p>
            </div>
            <button className="reply-btn" onClick={handleReply}>
              Reply
            </button>
          </div>

          <div className="reply-section">
            <p>
              <strong>zeyad</strong> <span>2 hour/s ago</span>
            </p>
            <p>
              Yes, you can take this course with ENGL 214 in the summer. If MATH 102 was easy for
              you, it should be manageable. Just make sure to stay organized with your assignments.
              This way, you can balance both courses effectively.
            </p>
            <div className="vote">
              <button
                className={`vote-up ${upvoteClicked ? 'clicked' : 'unclicked'}`}
                onClick={handleUpvote}
              >
                ⬆
              </button>
              <span>{votes}</span>
              <button
                className={`vote-down ${downvoteClicked ? 'clicked' : 'unclicked'}`}
                onClick={handleDownvote}
              >
                ⬇
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="pagination">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <span>…</span>
          <a href="#">6</a>
          <a href="#">{">"}</a>
        </div>
      </footer>
    </>
  );
};

export default Discussion;
