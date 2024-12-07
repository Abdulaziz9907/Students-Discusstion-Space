import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState } from 'react';
import './Post.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const PostDiscussion = () => {
  const [discussionContent, setDiscussionContent] = useState('');
  const [error, setError] = useState(false);

  // Extract courseId from the URL (e.g., /post?id=MATH208)
  const courseId = new URLSearchParams(window.location.search).get('id');
  const courseName = courseId; // Assuming course name matches course ID (MATH208)

  const handlePostSubmit = async () => {
    if (!discussionContent.trim()) {
      setError(true);
      return;
    }

    try {
      setError(false);
      // Post the new discussion to the backend
      await fetch('http://localhost:3002/add-discussion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          courseName,
          user: 'current_user', // Replace with actual user info
          content: discussionContent,
        }),
      });

      // Navigate to the course's discussions page
      window.location.href = `/discussions?course=${courseId}`;
    } catch (error) {
      console.error('Error posting discussion:', error);
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
          <h2>Post a New Discussion for: {courseId}</h2>
          <div className="post-box">
            <label
              htmlFor="discussion-text"
              id="post-label"
              className={error ? 'error' : ''}
            >
              Write your discussion*
            </label>
            <textarea
              id="discussion-text"
              placeholder="Write your discussion here between 3-100 words"
              value={discussionContent}
              onChange={(e) => setDiscussionContent(e.target.value)}
            ></textarea>
            <button className="submit-btn" onClick={handlePostSubmit}>
              Post
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default PostDiscussion;
