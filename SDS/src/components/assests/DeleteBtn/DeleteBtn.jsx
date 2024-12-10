import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteBtn.css';
import { UserContext } from '../../../context/userContext';

function DeleteBtn() {
  const [expanded, setExpanded] = useState(false);
  const { userName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log("Attempting to delete user with userName:", userName);
    if (!expanded) {
      setExpanded(true);
    } else {
      try {
        const response = await fetch(`https://students-discussion-space.onrender.com/delete-account/${userName}`, {
          method: "DELETE",
        });

        const data = await response.json();
        console.log("Response from server:", data);
        if (response.ok) {
          
          navigate('/', { state: { showDeletedToast: true } });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error while deleting account:", error);
        alert("An error occurred while deleting the account.");
      }
    }
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
    </div>
  );
}

export default DeleteBtn;