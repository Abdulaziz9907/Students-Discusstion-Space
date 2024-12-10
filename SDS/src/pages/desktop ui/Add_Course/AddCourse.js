import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/assests/Navbar/Navbar';
import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';
import './AddCourse.css';

const AddCourse = () => {
  const [form, setForm] = useState({ courseName: '', courseNumber: '' });
  const [errors, setErrors] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!form.courseName.trim()) {
      validationErrors.courseName = 'Course name is required.';
    }

    if (!form.courseNumber.trim()) {
      validationErrors.courseNumber = 'Course number is required.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('https://students-discussion-space.onrender.com/add-course', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseName: form.courseName,
            courseId: form.courseNumber,
          }),
        });

        if (response.ok) {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigate('/Main Webpage');
          }, 2000);
        } else {
          console.error('Error adding course');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <header className="add-course-header">
        <Navbar />
        <div className="add-course-header-container">
          <img src={account_logo3} alt="vector3" className="DisImage" />
          <img src={account_logo4} alt="vector4" className="DisImage" />
          <img src={account_logo6} alt="vector6" className="DisImage" />
        </div>
      </header>

      <main>
        <section className="add-course-section">
          <h2>Add New Course</h2>
          <form className="add-course-form" onSubmit={handleSubmit}>
            <label htmlFor="courseName">Course Name*</label>
            <input
              type="text"
              id="courseName"
              value={form.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              style={{ borderColor: errors.courseName ? 'red' : '' }}
            />
            {errors.courseName && (
              <small className="add-course-error-message">{errors.courseName}</small>
            )}

            <label htmlFor="courseNumber">Course Number*</label>
            <input
              type="text"
              id="courseNumber"
              value={form.courseNumber}
              onChange={handleChange}
              placeholder="Enter course number"
              style={{ borderColor: errors.courseNumber ? 'red' : '' }}
            />
            {errors.courseNumber && (
              <small className="add-course-error-message">{errors.courseNumber}</small>
            )}

            <button type="submit" className="add-course-submit-btn">
              Create Course
            </button>
          </form>
        </section>
      </main>

      {isModalVisible && (
        <div className="add-course-modal">
          <div className="add-course-modal-content">
            <span
              className="add-course-close-btn"
              onClick={() => setModalVisible(false)}
            >
              &times;
            </span>
            <p>Course successfully added!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCourse;
