import React, { useState } from "react";
import ReactDOM from "react-dom";

const Popup = ({ message, type = "default", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const getStyleByType = () => {
    switch (type) {
      case "success":
        return {
          icon: "✓",
          iconColor: "text-success",
          buttonColor: "btn btn-success",
          titleColor: "text-success",
        };
      case "error":
        return {
          icon: "✘",
          iconColor: "text-danger",
          buttonColor: "btn btn-danger",
          titleColor: "text-danger",
        };
      case "warning":
        return {
          icon: "!",
          iconColor: "text-warning",
          buttonColor: "btn btn-warning",
          titleColor: "text-warning",
        };
      default:
        return {
          icon: "i",
          iconColor: "text-primary",
          buttonColor: "btn btn-primary",
          titleColor: "text-primary",
        };
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose(); // This will trigger the refresh functionality
    }
  };

  if (!isVisible) return null;

  const styles = getStyleByType();

  return ReactDOM.createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white rounded shadow p-4 text-center">
        <div
          className={`d-flex align-items-center justify-content-center rounded-circle border border-4 border-${styles.iconColor.split("-")[1]} mb-4`}
          style={{
            width: "64px",
            height: "64px",
            fontSize: "2rem",
            color: styles.iconColor,
          }}
        >
          {styles.icon}
        </div>
        <h3 className={`mb-4 ${styles.titleColor}`}>{message}</h3>
        <button
          className={`${styles.buttonColor} fw-bold px-4 py-2`}
          onClick={handleClose}
        >
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
