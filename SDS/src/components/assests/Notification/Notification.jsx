import React from "react";

const Notification = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div style={styles.notification}>
      {message}
    </div>
  );
};

// Inline styles for the notification
const styles = {
  notification: {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    fontSize: "16px",
  },
};

export default Notification;
