import React, { useState } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import './courseRating.css';


function CourseRating() {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <Navbar />
      <div className='parent'>
        
        <h1 className='course-name'>MATH208</h1>

        <div className="course-header">
          <p>Course difficulty rating:</p>
          <StarRating rating={rating} onClick={handleRating} />
          <button className='add-rating-button'>Add Rating</button>
        </div>
        {/* Render reviews and pagination components here */}
        <Review author="Abdulaziz" timestamp="23 hours ago" content="One of the easiest math courses"/>
        <Review author="Rakan" timestamp="9 days ago" content="Needs a lot of practice"/>
        <Review author="Abdulah" timestamp="2 years ago" content="The course will introduce students to the basics of linear algebra in \( \mathbb{R}^n \). and the basic types of differential equations and some of the various techniques for solving them. Nothing too difficult."/>
      </div>
    </div>
  );
}

const Review = ({ author, timestamp, content }) => {
  return (
    <div className="review">
      <p>{content}</p>
      <div className="review-meta">
        <span>{author}</span> 
        &nbsp;
        <span>{timestamp}</span>
      </div>
    </div>
  );
};

const StarRating = ({ rating, onClick }) => {
  return (
    <div className="rating-stars">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => onClick(index)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default CourseRating;
