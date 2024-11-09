import React, { useState } from "react";
import Navbar from '../../../components/assests/Navbar/Navbar';


import "./addRating.css";

function AddRating({ courseName }) {
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || summary.trim().length < 3) {
      setError("Please fill out both fields before submitting.");
    } else {
      setError("");
      // Submit logic here
      alert(`Rating submitted: ${rating} stars - ${summary}`);
    }
  };

  return (
    <div>
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