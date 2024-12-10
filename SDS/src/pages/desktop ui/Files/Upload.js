import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Upload.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const UploadFilePage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Extract course ID from URL
  const courseId = new URLSearchParams(window.location.search).get('id');
  const username = new URLSearchParams(window.location.search).get('username');

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        setError(true);
        alert('Invalid file type. Only JPG, PNG, or PDF files are allowed.');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError(true);
        alert('File size exceeds 10MB.');
        return;
      }

      setFile(selectedFile);
      setError(false);
    }
  };

  // Handle file upload submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', courseId);

    try {
      setIsUploading(true);
      const response = await axios.post('https://students-discussion-space.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('File uploaded successfully!');
        window.location.href = `/files?id=${courseId}&username=${username}`;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <header id="upload-file-header">
        <Navbar />
        <img
          src={account_logo3}
          alt="Vector 3"
          id="upload-file-vector3"
          className="DisImage"
        />
        <img
          src={account_logo4}
          alt="Vector 4"
          id="upload-file-vector4"
          className="DisImage"
        />
        <img
          src={account_logo6}
          alt="Vector 6"
          id="upload-file-vector6"
          className="DisImage"
        />
      </header>

      <main id="upload-file-main">
        <div className="space" id="upload-file-space"></div>
        <section className="upload-section" id="upload-file-section">
          <h2>Upload file for: {courseId || 'Course'}</h2>
          <form id="upload-file-form" onSubmit={handleSubmit}>
            <label
              htmlFor="upload-file-input"
              id="upload-file-label"
              className={error ? 'error' : ''}
            >
              Upload your file*
            </label>
            <div className="upload-box" id="upload-file-box">
              <input
                type="file"
                id="upload-file-input"
                hidden
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className="drag-area">
                <p>Select a file or drag and drop here</p>
                <small>JPG, PNG or PDF, file size no more than 10MB</small>
                <button
                  type="button"
                  className="select-btn"
                  onClick={handleSelectFile}
                >
                  Select file
                </button>
              </div>
            </div>
            <button type="submit" className="upload-btn" id="upload-file-submit">
              Upload
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default UploadFilePage;
