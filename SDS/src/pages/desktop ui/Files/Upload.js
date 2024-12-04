import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState, useRef } from 'react';
import './Upload.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const UploadFilePage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files.length) {
      setError(false);
      // Redirect to Files page
      window.location.href = 'Files.html';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError(true);
    } else {
      setError(false);
      alert('File uploaded successfully!');
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
          <h2>Upload file for: MATH208</h2>
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
