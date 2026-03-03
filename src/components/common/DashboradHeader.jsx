import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../../assets/Images/orient/logo.png";
import user from "../../assets/Images/icons/user_ico.svg";
import Home from "../../assets/Images/icons/home.svg";
import langimg from "../../assets/Images/icons/lang_ico.svg";
import logoutimg from "../../assets/Images/icons/logout.png";
import Profile from "../../assets/Images/icons/account-settings.png";
import dashboardico from "../../assets/Images/icons/dashboard-svgrepo-com.svg";
import reportico from "../../assets/Images/icons/report-file-svgrepo-com.svg";
import serviceico from "../../assets/Images/icons/world-svgrepo-com.svg";
import approvedico from "../../assets/Images/icons/Dash-approved.svg";
import Endros from "../../assets/Images/icons/dashboard-svgrepo-com.svg";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const Header = ({ hideSubHead = false }) => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const { auth, logout } = useAuth();
  const { langData, toggleLanguage, language } = useLanguage();

  const handleLogout = async () => {
    logout();
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleshowProfile = async () => {
    navigate("/Profile");
  };

  const handleLanguageChange = async (newLang) => {
    try {
      toggleLanguage(newLang);
    } catch (error) {
      console.error("Language change failed:", error);
    }
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // auto hide logic for specific routes
  const showsubhead =
    location.pathname === "/MotorUWApproval" ||
    location.pathname === "/MotorMissingDoc" ||
    location.pathname === "/MotorUWRate" ||
    location.pathname === "/MotorBrokerMissing" ||
    location.pathname === "/PaymentSuccess" ||
    location.pathname === "/EndorsementApproval";

  const handleDashboardRedirect = () => {
    navigate("/");
  };

  const setlevelcode = "7";

  return (
    <header id="topnav" className={`${!showsubhead ? "top-h" : ""}`}>
      <div className="topbar-main">
        <div className="container-fluid">
          {/* Logo */}
          <div className="logo">
            <div
              onClick={handleDashboardRedirect}
              style={{ cursor: "pointer" }}
            >
              <img src={logo1} className="logo-small" alt="Logo" />
              <img src={logo1} alt="Logo" />
            </div>
          </div>

          <div className="menu-extras topbar-custom">
            <ul
              className={`list-unstyled mb-0 ${
                language === "ar" ? "direction" : ""
              }`}
            >
              {/* Home Icon */}
              <li className="dropdown notification-list header_ico">
                <div className="dropdown notification-list nav-pro-img">
                  <img
                    id="homeIcon"
                    className="rounded-circle cursor-pointer"
                    src={Home}
                    alt="Home"
                    style={{ height: "30px" }}
                    onClick={() => navigate("/")}
                  />
                </div>
              </li>

              {/* Language Switch */}
              <li className="dropdown notification-list header_ico">
                <div className="dropdown notification-list nav-pro-img">
                  {language === "ar" ? (
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("en")}
                      className="log_lang_btn btn_trans"
                    >
                      <img src={langimg} style={{ height: "30px" }} alt="EN" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("ar")}
                      className="log_lang_btn btn_trans"
                    >
                      <img src={langimg} style={{ height: "30px" }} alt="AR" />
                    </button>
                  )}
                </div>
              </li>

              {/* Profile */}
              <li className="dropdown notification-list header_ico user_lft">
                <div className="dropdown notification-list nav-pro-img">
                  <img
                    src={user}
                    style={{ height: "26px", width: "27px", marginTop: "2px" }}
                    className="rounded-circle nav-user cursor-pointer"
                    alt="User"
                    onClick={toggleProfileDropdown}
                  />

                  {/* Dropdown */}
                  <div
                    className={`dropdown-menu dropdown-menu-right profile-dropdown head_log_pop ${
                      showProfileDropdown ? "d-block" : "d-none"
                    }`}
                  >
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center justify-content-center"
                      onClick={handleshowProfile}
                    >
                      <img
                        src={Profile}
                        style={{ height: "20px" }}
                        className="me-1"
                      />
                      <span>{langData.userProfile}</span>
                    </button>

                    <button
                      type="button"
                      className="dropdown-item text-danger log log_out_head d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <img src={logoutimg} className="me-2 ms-2" />
                      <span>{langData.Logout}</span>
                    </button>
                  </div>
                </div>
              </li>

              {/* Username */}
              <li className="dropdown notification-list d-none d-sm-block">
                <div className="app-search user_rft">
                  <span className="name-text">{auth?.user}</span>
                  <div className="role-text">{auth?.userName}</div>
                </div>
              </li>

              {/* Mobile Toggle */}
              <li className="menu-item">
                <a className="navbar-toggle nav-link" id="mobileToggle">
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="clearfix"></div>
        </div>
      </div>

      {/* SUB HEADER MENU (only if NOT hidden by route AND NOT hidden by prop) */}
      {!hideSubHead && !showsubhead && (
        <div
          className={`navbar-custom ${
            language === "ar" ? "arabic" : "english"
          }`}
        >
          <div className="container-fluid">
            <div id="navigation">
              <ul className="navigation-menu">
                <li>
                  <Link to="/">
                    <img src={dashboardico} alt="" />
                    <span> {langData.Dashboard} </span>
                  </Link>
                </li>

                {/* eService */}
                <li className="has-submenu">
                  <a>
                    <img src={serviceico} alt="" />
                    {langData.EService}
                  </a>

                  <ul className="submenu">
                    <li>
                      <Link to="/QuotationList">{langData.QuotationList}</Link>
                    </li>
                    <li>
                      <Link to="/PolicyList">{langData.PolicyList}</Link>
                    </li>
                    <li>
                      <Link to="/Endorsement">{langData.Endorsement}</Link>
                    </li>

                    {setlevelcode !== "7" && (
                      <>
                        <li>
                          <Link to="/Claim">{langData.Claim}</Link>
                        </li>
                        <li>
                          <Link to="/ClaimTracking">
                            {langData.ClaimTracking}
                          </Link>
                        </li>
                      </>
                    )}

                    <li>
                      <Link to="/MotorRejectList">
                        {langData.BrokerProcess}
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Approval Menu (Only for level 7) */}
                {setlevelcode === "7" && (
                  <li className="has-submenu">
                    <a>
                      <img src={approvedico} alt="" />
                      {langData.Approval}
                    </a>
                    <ul className="submenu">
                      <li>
                        <Link to="/QuotationApproval">
                          {langData.QuotationRequestApprovel}
                        </Link>
                      </li>
                      <li>
                        <Link to="/UWFinalQuoteApprovel">
                          {langData.QuotationApproval}
                        </Link>
                      </li>
                      <li>
                        <Link to="/EndorsementApprovalList">
                          {langData.EndorsementApproval}
                        </Link>
                      </li>
                      <li>
                        <Link to="/CustomtosequenceApprovallist">
                          {langData.CustomtosequenceApproval}
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* Custom to Sequence (for other levels) */}
                {setlevelcode !== "7" && (
                  <li>
                    <Link to="/CustomtoSequence">
                      <img src={Endros} alt="" />
                      <span>{langData.CustomtoSequence}</span>
                    </Link>
                  </li>
                )}

                {/* Reports */}
                <li className="has-submenu">
                  <a>
                    <img src={reportico} alt="" />
                    {langData.Report}
                  </a>
                  <ul className="submenu">
                    <li>
                      <Link to="/DetailReport">{langData.DetailReport}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
