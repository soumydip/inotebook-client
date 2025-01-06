import React from "react";
import "../CSS/LoadingSkeleton.css"; // CSS file for styling

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-container">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="skeleton-box"></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
