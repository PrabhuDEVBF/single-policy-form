import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dummyUsers from "../../data/dummyUser.json";
import LanguageSwitcher from "../common/LanguageSwitcher";
import Logo from "../../assets/img/logo.png";
import { useLanguage } from "../../context/LanguageContext";

const Header = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const role = sessionStorage.getItem("userRole");
  const user = dummyUsers.find((u) => u.role === role);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const isAllowed = (allowedRoles) => allowedRoles.includes(role);

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    navigate("/login");
  };

  // Nav items mapping
  const navItems = [
    {
      path: "/dashboard",
      label: t.nav.dashboard,
      roles: ["Agent", "Underwriter"],
      hasDropdown: false,
    },
    {
      path: "#",
      label: t.nav.eservices,
      roles: ["Agent", "Underwriter"],
      hasDropdown: true,
      subItems: [
        { label: "Policy List", path: "/eservices/policies" },
        { label: "Quotation List", path: "/eservices/quotations" },
      ],
    },
    {
      path: "#",
      label: t.nav.approval,
      roles: ["Underwriter"],
      hasDropdown: false, // Update this if approval needs dropdown later
    },
    {
      path: "#",
      label: t.nav.masters,
      roles: ["Underwriter"],
      hasDropdown: true,
      subItems: [{ label: "Rate Master", path: "/masters/rate-master" }],
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg px-3 px-lg-5 bg-orient-blue text-white z-1000 position-relative">
      <div className="container-fluid m-0 p-0">
        {/* Logo */}
        <NavLink
          className="navbar-brand d-flex align-items-center text-white me-5"
          to="/dashboard"
        >
          <img src={Logo} alt="orient" height={50} />
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-light-color"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")",
            }}
          ></span>
        </button>

        {/* Nav Links */}
        <div
          className={`collapse justify-content-end navbar-collapse ${isNavOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav  mb-2 mb-lg-0 gap-3">
            {navItems
              .filter((item) => isAllowed(item.roles))
              .map((item, idx) => (
                <li
                  className={`nav-item ${item.hasDropdown ? "dropdown" : ""}`}
                  key={idx}
                >
                  {item.hasDropdown ? (
                    <a
                      className="nav-link text-white d-flex align-items-center"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {item.label}{" "}
                      <i
                        className={`fa-solid fa-caret-down ms-1 ${lang === "ar" ? "me-1 ms-0" : ""}`}
                        style={{ fontSize: "0.8rem" }}
                      ></i>
                    </a>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link text-white ${isActive ? "fw-bold" : ""}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {item.hasDropdown && item.subItems && (
                    <ul className="dropdown-menu shadow-sm">
                      {item.subItems.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <NavLink className="dropdown-item" to={sub.path}>
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>

          {/* Right Side: User & Lang */}
          <div
            className={`d-flex align-items-center ${lang === "ar" ? " ms-lg-3 pe-lg-3" : " ps-lg-3 ms-lg-3"}`}
          >
            <LanguageSwitcher />

            {/* User Dropdown */}
            <div className="dropdown ms-3">
              <button
                className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border-0 shadow-sm w-40px h-40px"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user text-orient fs-5"></i>
              </button>
              <ul
                className={`dropdown-menu ${lang === "ar" ? "dropdown-menu-start" : "dropdown-menu-end"} shadow border-0 mt-2 w-min-220px br-10px`}
              >
                <li className="px-4 py-3 border-bottom text-center">
                  <div className="d-flex justify-content-center mb-2">
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-orient w-45px h-45px fs-15rem">
                      <i className="fa-solid fa-user"></i>
                    </div>
                  </div>
                  <div className="fw-bold text-dark fs-6">
                    {user?.name || "User"}
                  </div>
                  <div className="text-muted small">{role}</div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-danger d-flex align-items-center justify-content-center py-2 mt-2 fw-medium"
                  >
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    {lang === "ar" ? "تسجيل الخروج" : "Logout"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
