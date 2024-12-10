import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../../../components/assests/Navbar/Navbar';
import "./addRating.css";
import axios from 'axios';
import  {  useEffect, useContext } from 'react';
import { UserContext } from '../../../context/userContext';

function AddRating() {
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const courseName = location.state?.courseName || "Unknown Course"; // Get courseName from navigation state
  const courseId = location.state?.courseId || "null";

  const { userName } = useContext(UserContext);
  console.log(userName + " account");
  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || summary.trim().length < 3) {
      setError("Please fill out both fields before submitting.");
    
      return;
    }

    setError("");

    try {
      // Send the rating to the backend
      const response = await axios.post(`https://students-discussion-space.onrender.com/courses/${courseName}/rating`, {
        user: "Anonymous User", // Replace with an actual user identifier in a real-world application
        comment: summary,
        value: rating,
      });

      alert("Rating submitted successfully!");
      // Redirect back to the course page
      navigate(-1);
    } catch (err) {
      console.error("Error submitting rating:", err.message);
      setError("Failed to submit the rating. Please try again later.");
    }

    try {
      console.log("updating "+userName+" visits")
      await axios.put("https://students-discussion-space.onrender.com/ratingVisits", { 
        userName: userName 
      });
    
    } catch (error) {
      console.error('Error incrementing user ratings: ', error.response?.data || error.message);
      navigate('/CourseDetails', { state: { courseId } });
    }

  };

  return (
    
    <div className="add-rating-wrapper">
      <Navbar />
      <div className="container">
        <h2 className="course-title">Add rating for: {courseName}</h2>
        <div className="rating-box">
          <div className="rating-section">
            <p className="rating-question">How would you rate the course difficulty from 1-5 stars?</p>
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${index < rating ? "selected" : ""}`}
                  onClick={() => handleRatingClick(index)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="summary-section">
            <label className="summary-label">Write brief summary*</label>
            <textarea
              placeholder="How would you evaluate the course? Write a brief summary from 3-100 words"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleSubmit} className="submit-button">
            Add Rating
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRating;
