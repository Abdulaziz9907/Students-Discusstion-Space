import Navbar from '../../../components/assests/Navbar/Navbar';
import React from 'react';
import './Admin_main.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

import addlogo from './Elements/add.png';
import managelogo from './Elements/manage.png';
import dashboardlogo from './Elements/dashboard.png';

const AdminMain = () => {
  const handleAddCourse = () => {
    window.location.href = '../Add_Course/AddCourse';
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
        <section className="insights-section">
          <h2>Discover Course Insights and Ratings</h2>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="action-buttons">
            <button className="add-course-btn" onClick={handleAddCourse}>
              <img src={addlogo} alt="add" id="add" className="ControlImage" /> Add new course
            </button>
            <button className="manage-users-btn">
              <img src={managelogo} alt="manage" id="manage" className="ControlImage" /> Manage Users
            </button>
            <button className="dashboard-btn">
              <img src={dashboardlogo} alt="dashboard" id="dashboard" className="ControlImage" /> Dashboard
            </button>
          </div>
        </section>

        <section className="courses-section">
          <div className="course-list">
            <h3>Most Visited Courses</h3>
            <div className="course-item">
              <span>MATH208</span>
              <div className="course-actions">
                <button className="delete-btn">Delete course</button>
                <button className="details-btn">View details</button>
              </div>
            </div>
            <div className="course-item">
              <span>COE301</span>
              <div className="course-actions">
                <button className="delete-btn">Delete course</button>
                <button className="details-btn">View details</button>
              </div>
            </div>
            <div className="course-item">
              <span>ENGL214</span>
              <div className="course-actions">
                <button className="delete-btn">Delete course</button>
                <button className="details-btn">View details</button>
              </div>
            </div>
            <div className="course-item">
              <span>SWE363</span>
              <div className="course-actions">
                <button className="delete-btn">Delete course</button>
                <button className="details-btn">View details</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminMain;
