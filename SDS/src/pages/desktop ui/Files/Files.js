import Navbar from '../../../components/assests/Navbar/Navbar';
import React from 'react';
import './Files.css';

import account_logo3 from '../login/elements/Vector3.png';
import account_logo4 from '../login/elements/Vector4.png';
import account_logo6 from '../login/elements/Vector6.png';

const FileUploadPage = () => {
  const handleCopyLink = () => {
    const popup = document.getElementById('file-popup-copy');
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
  };

  const handleDownload = () => {
    const popup = document.getElementById('file-popup-download');
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
  };

  const handleUploadRedirect = () => {
    window.location.href = 'Upload';
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
          <h2 id="file-upload-title">MATH208</h2>
          <div className="upload-section2" id="file-upload-section-container">
            <div className="file-count" id="file-upload-count">2 file/s</div>
            <button
              className="upload-btn2"
              id="file-upload-button"
              onClick={handleUploadRedirect}
            >
              Upload
            </button>
          </div>

          <div className="file-list" id="file-upload-list">
            <div className="file-item" id="file-item-1">
              <p>MATH208-T232-Final.pdf</p>
              <span>3 month/s ago</span>
              <div className="file-actions" id="file-actions-1">
                <button className="download-btn" onClick={handleDownload}>
                  Download
                </button>
                <button className="copy-link-btn" onClick={handleCopyLink}>
                  Copy link
                </button>
              </div>
            </div>

            <div className="file-item" id="file-item-2">
              <p>Major1_T222.pdf</p>
              <span>2 year/s ago</span>
              <div className="file-actions" id="file-actions-2">
                <button className="download-btn" onClick={handleDownload}>
                  Download
                </button>
                <button className="copy-link-btn" onClick={handleCopyLink}>
                  Copy link
                </button>
              </div>
            </div>
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
