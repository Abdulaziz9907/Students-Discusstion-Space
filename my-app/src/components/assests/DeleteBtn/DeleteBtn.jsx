import React, { useState } from 'react';
import './DeleteBtn.css'; // For custom styling

function DeleteBtn() {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      id="account_delete_btn"
      className={`delete-account-btn ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {expanded ? '' : 'Delete account'}
    </button>
  );
}

export default DeleteBtn;