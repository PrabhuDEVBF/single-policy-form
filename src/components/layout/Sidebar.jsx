import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Sidebar = () => {
  const { lang, t: translations } = useLanguage();
  const t = translations.nav;
  const role = sessionStorage.getItem("userRole"); // 'Agent' or 'Underwriter'

  const navItems = [
    {
      path: "/dashboard",
      label: t.dashboard,
      icon: "fa-table-columns",
      roles: ["Agent", "Underwriter"],
    },
    {
      path: "/eservices/quotations",
      label: t.quotationList,
      icon: "fa-file-invoice",
      roles: ["Agent", "Underwriter"],
    },
    {
      path: "/eservices/policies",
      label: t.policyList,
      icon: "fa-shield-halved",
      roles: ["Agent", "Underwriter"],
    },
    {
      path: "/approval",
      label: t.approval,
      icon: "fa-check-circle",
      roles: ["Underwriter"],
    },
    {
      path: "/reports",
      label: t.reports,
      icon: "fa-chart-pie",
      roles: ["Agent", "Underwriter"],
    },
    {
      path: "/masters",
      label: t.masters,
      icon: "fa-database",
      roles: ["Underwriter"],
    },
  ];

  const filteredNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="sidebar d-flex flex-column p-3 w-min-250px">
      <div className="d-flex align-items-center mb-4 ps-2">
        <svg
          width="30"
          height="30"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="me-2"
        >
          <rect width="100" height="100" fill="#60B7E1" />
          <path d="M20 50L50 20L80 50L50 80L20 50Z" fill="#ffffff" />
        </svg>
        <span className="fs-4 fw-bold text-white">orient</span>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        {filteredNav.map((item, idx) => (
          <li className="nav-item mb-2" key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link text-white d-flex align-items-center br-8px ${isActive ? "bg-secondary-blue" : ""}`
              }
            >
              <i
                className={`fa-solid ${item.icon} me-3 text-center w-20px ${lang === "ar" ? "ms-3 me-0" : ""}`}
              ></i>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
