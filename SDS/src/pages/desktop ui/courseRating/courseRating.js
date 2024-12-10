import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../../components/assests/Navbar/Navbar";
import "./courseRating.css";
import axios from "axios";
import { ring2 } from "ldrs";

ring2.register();

function CourseRating() {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [courseName, setCourseName] = useState("Introduction to MongoDB"); // Default course name
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const course = location.state?.courseName || "Introduction to MongoDB";
    setCourseName(course);

    // Fetch course details when the page loads
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `https://students-discussion-space.onrender.com/courses/${course}`
        );
        const courseData = response.data;

        // Set the rating and reviews based on the course data
        setRating(Math.round(courseData.courseRating)); // Rounded to nearest integer
        setReviews(courseData.ratings);
      } catch (error) {
        console.error("Error fetching course data:", error.message);
        alert("Error loading course data. Please try again.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchCourseData();
  }, [location.state]);

  return (
    <div>
      <Navbar />
      <div className="parent">
        {loading ? (
          <div className="loading-container-rating">
            <l-ring-2
              size="70"
              stroke="9"
              stroke-length="0.25"
              bg-opacity="0.1"
              speed="0.8"
              color="white"
            ></l-ring-2>
          </div>
        ) : (
          <>
            <h1 className="course-name">{courseName}</h1>

            <div className="course-header">
              <p>Course difficulty rating:</p>
              <StarRating rating={rating} /> {/* Static rating */}
              <button
                className="add-rating-button"
                onClick={() => navigate("/addrating", { state: { courseName } })}
              >
                Add Rating
              </button>
            </div>

            <div className="reviews">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Review
                    key={index}
                    author={review.user}
                    timestamp={new Date(review.timestamp).toLocaleString()}
                    content={review.comment || "No comment provided."}
                  />
                ))
              ) : (
                <p>No reviews available for this course.</p>
              )}
            </div>
          </>
        )}
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

const StarRating = ({ rating }) => {
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <span key={index} className={index <= rating ? "on" : "off"}>
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default CourseRating;
