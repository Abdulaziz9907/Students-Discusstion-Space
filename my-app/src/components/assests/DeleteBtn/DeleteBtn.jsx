import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './DeleteBtn.css'; 

function DeleteBtn() {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 

  const handleClick = () => {
    if (!expanded) {
      setExpanded(true); 
    } else {
      const confirmDelete = window.confirm("This account has been deleted. Click Ok to logout");
      if (confirmDelete) {
        setShowModal(true); 
        setTimeout(() => {
          navigate('/'); 
        }, 200); 
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <div>
      <button
        id="account_delete_btn"
        className={`delete-account-btn ${expanded ? 'expanded' : ''}`}
        onClick={handleClick}
        onMouseLeave={() => setExpanded(false)}
      >
        {expanded ? '' : 'Delete account'}
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>This account has been deleted.</p>
            {handleCloseModal}
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteBtn;
