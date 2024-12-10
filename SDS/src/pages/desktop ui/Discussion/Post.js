import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState } from 'react';
import './Post.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const PostDiscussion = () => {
  const [discussionContent, setDiscussionContent] = useState('');
  const [error, setError] = useState(false);

  const courseId = new URLSearchParams(window.location.search).get('id');
  const username = new URLSearchParams(window.location.search).get('username');
  const courseName = courseId;

  const handlePostSubmit = async () => {
    if (!discussionContent.trim()) {
      setError(true);
      return;
    }

    try {
      setError(false);
      await fetch('https://students-discussion-space.onrender.com/add-discussion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          courseName,
          user: username,
          content: discussionContent,
        }),
      });

      window.location.href = `/discussions?course=${courseId}&username=${username}`;
    } catch (error) {
      console.error('Error posting discussion:', error);
    }
  };

  return (
    <>
      <header id="post-discussion-header">
        <Navbar />
        <img src={account_logo3} alt="Vector 3" id="post-vector-3" className="post-image" />
        <img src={account_logo4} alt="Vector 4" id="post-vector-4" className="post-image" />
        <img src={account_logo6} alt="Vector 6" id="post-vector-6" className="post-image" />
      </header>

      <main id="post-discussion-main">
        <div id="post-discussion-space" className="space"></div>
        <section id="post-discussion-section">
          <h2 id="post-discussion-title">Post a New Discussion for: {courseId}</h2>
          <div id="post-discussion-box">
            <label
              htmlFor="post-discussion-textarea"
              id="post-discussion-label"
              className={error ? 'error' : ''}
            >
              Write your discussion*
            </label>
            <textarea
              id="post-discussion-textarea"
              placeholder="Write your discussion here between 3-100 words"
              value={discussionContent}
              onChange={(e) => setDiscussionContent(e.target.value)}
            ></textarea>
            <button id="post-discussion-submit" onClick={handlePostSubmit}>
              Post
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default PostDiscussion;
