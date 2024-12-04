import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState } from 'react';
import './Post.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const PostDiscussion = () => {
  const [postText, setPostText] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (postText.trim() === '') {
      setError(true);
    } else {
      setError(false);
      // Navigate to the discussion page
      window.location.href = 'Discussion';
    }
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
        <section className="post-section">
          <h2>Post discussion for: MATH208</h2>
          <div className="post-box">
            <label
              htmlFor="post-text"
              id="post-label"
              className={error ? 'error' : ''}
            >
              Write your discussion*
            </label>
            <textarea
              id="post-text"
              placeholder="Write your discussion here between 3-100 words"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            <button className="submit-btn" onClick={handleSubmit}>
              Post Discussion
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default PostDiscussion;
