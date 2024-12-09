import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../../../components/assests/Navbar/Navbar';
import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';
import './AddCourse.css';

const AddCourse = () => {
  const [form, setForm] = useState({ courseName: '', courseNumber: '' });
  const [errors, setErrors] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate input fields
    if (!form.courseName.trim()) {
      validationErrors.courseName = 'Course name is required.';
    }

    if (!form.courseNumber.trim()) {
      validationErrors.courseNumber = 'Course number is required.';
    }

    setErrors(validationErrors);

    // If no validation errors, proceed with the API request
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Send POST request to add the course
        const response = await fetch('http://localhost:3002/add-course', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseName: form.courseName,
            courseId: form.courseNumber, // course number is the courseId in the backend
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Course added successfully:', data);

          // Show success modal and then navigate after delay
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigate('/Main Webpage'); // Navigate to /Main Webpage
          }, 2000);
        } else {
          const errorData = await response.json();
          console.error('Error adding course:', errorData.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <header>
        <Navbar />
        <img src={account_logo3} alt="comp1" id="Dis_Vec3" className="DisImage" />
        <img src={account_logo4} alt="comp1" id="Dis_Vec4" className="DisImage" />
        <img src={account_logo6} alt="comp1" id="Dis_Vec6" className="DisImage" />
      </header>

      <main>
        <div className="space"></div>
        <section className="add-course-section">
          <h2>Add new course</h2>
          <div className="space"></div>
          <form id="courseForm" onSubmit={handleSubmit}>
            <label htmlFor="course-name">Course name*</label>
            <input
              type="text"
              id="courseName"
              value={form.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              style={{
                borderColor: errors.courseName ? 'red' : '',
              }}
            />
            {errors.courseName && <small className="error-message">{errors.courseName}</small>}

            <label htmlFor="course-number">Course number*</label>
            <input
              type="text"
              id="courseNumber"
              value={form.courseNumber}
              onChange={handleChange}
              placeholder="Enter course number"
              style={{
                borderColor: errors.courseNumber ? 'red' : '',
              }}
            />
            {errors.courseNumber && <small className="error-message">{errors.courseNumber}</small>}

            <button type="submit" className="submit-btn">
              Create course
            </button>
          </form>
        </section>
      </main>

      {isModalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setModalVisible(false)}>
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
