import React from "react";
import favicon from "../../assets/img/favicon.png";

const Loader = () => {
  return (
    <div className="global-loader-overlay">
      <div className="loader-container">
        <div className="loader-ring"></div>
        <img src={favicon} alt="Loading..." className="loader-icon" />
      </div>
    </div>
  );
};

export default Loader;
