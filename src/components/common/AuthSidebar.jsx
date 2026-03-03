import React from "react";
import circleBg from "../../assets/img/marine-circle-bg.png";
import curlBg from "../../assets/img/login-curl-design.png";
import logo from "../../assets/img/logo.png";

const AuthSidebar = () => {
  return (
    <div className="col-12 col-lg-6 bg-orient position-relative d-lg-flex align-items-center justify-content-center">
      <img
        src={curlBg}
        alt="curl"
        className="position-absolute top-0 end-0 curl w-100 h-auto h-max-50vh"
      />

      <div className="position-absolute top-0 start-0 p-4 logobox">
        <img src={logo} alt="logo" height={55} />
      </div>

      <img src={circleBg} alt="ORIENT" className="position-absolute ship-bg" />
    </div>
  );
};

export default AuthSidebar;
