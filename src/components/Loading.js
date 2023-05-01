import React from "react";
import "../styles/Styles.css";

const Loading = () => {
  return (
    <div className="loader">
      <div
        className="spinner-border text-warning"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
