import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/assests/Navbar/Navbar';
import axios from 'axios';
import './Files.css';

import account_logo3 from '../login/elements/Vector3.png';
import account_logo4 from '../login/elements/Vector4.png';
import account_logo6 from '../login/elements/Vector6.png';

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const courseId = new URLSearchParams(window.location.search).get('id'); // Extract courseId from URL

  useEffect(() => {
    fetchFiles();
  }, [courseId]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/files?courseId=${courseId}`);
      setFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleCopyLink = (fileId) => {
    navigator.clipboard.writeText(`http://localhost:3002/files/${fileId}`);
    const popup = document.getElementById('file-popup-copy');
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
  };

  const handleDownload = async (fileId) => {
    try {
      const popup = document.getElementById('file-popup-download');
      popup.style.display = 'block';

      const response = await axios.get(`http://localhost:3002/files/${fileId}/download`, {
        responseType: 'blob', // To download the file as a blob
      });

      // Create a temporary anchor element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileId}`); // Use the file name as the download name
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      setTimeout(() => {
        popup.style.display = 'none';
      }, 3000);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleUploadRedirect = () => {
    window.location.href = `/upload?id=${courseId}`; // Navigate to upload page with courseId
  };

  return (
    <>
      <header id="file-upload-header">
        <Navbar />
        <img src={account_logo3} alt="Vector 3" id="file-upload-vector3" className="DisImage" />
        <img src={account_logo4} alt="Vector 4" id="file-upload-vector4" className="DisImage" />
        <img src={account_logo6} alt="Vector 6" id="file-upload-vector6" className="DisImage" />
      </header>

      <main id="file-upload-main">
        <div className="space" id="file-upload-space"></div>
        <section className="file-section" id="file-upload-section">
          <h2 id="file-upload-title">{courseId}</h2>
          <div className="upload-section2" id="file-upload-section-container">
            <div className="file-count" id="file-upload-count">
              {files.length} file/s
            </div>
            <button
              className="upload-btn2"
              id="file-upload-button"
              onClick={handleUploadRedirect}
            >
              Upload
            </button>
          </div>

          <div className="file-list" id="file-upload-list">
            {files.map((file) => (
              <div key={file._id} className="file-item" id={`file-item-${file._id}`}>
                <p>{file.fileName}</p>
                <span>{new Date(file.uploadedAt).toLocaleString()}</span>
                <div className="file-actions" id={`file-actions-${file._id}`}>
                  <button
                    className="download-btn"
                    onClick={() => handleDownload(file._id)}
                  >
                    Download
                  </button>
                  <button
                    className="copy-link-btn"
                    onClick={() => handleCopyLink(file._id)}
                  >
                    Copy link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer id="file-upload-footer">
          <div className="pagination" id="file-pagination">
            <a href="#">1</a>
          </div>
        </footer>

        {/* Popup Containers */}
        <div id="file-popup-download" className="popup">
          <div className="popup-content">
            <p>File will download shortly</p>
            <div className="check-icon">✔</div>
          </div>
        </div>
        <div id="file-popup-copy" className="popup">
          <div className="popup-content">
            <p>Link copied to clipboard!</p>
            <div className="check-icon">✔</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FileUploadPage;
