import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import dummyData from "../../data/dummyDashboard.json";
import rightCurl from "../../assets/img/dashboard-rigth-curl.png";
import { useLanguage } from "../../context/LanguageContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { lang, t: translations } = useLanguage();
  const t = translations.dashboard;
  const role = sessionStorage.getItem("userRole"); // 'Agent' or 'Underwriter'

  const isUnderwriter = role === "Underwriter";

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header />

      {/* Dashboard Title Bar */}
      <div className="bg-orient-2 text-white position-relative py-3 px-4 px-lg-5 h-min-80px overflow-hidden">
        <div className="d-flex justify-content-between align-items-center position-relative z-2">
          <div className="d-flex align-items-center">
            <div className="bg-secondary-blue me-3 w-4px h-24px"></div>
            <h4 className="mb-0 fw-normal">{t.title}</h4>
          </div>
          <div>
            <select className="form-select form-select-sm bg-transparent text-white border-light-color rounded-pill px-3 w-120px">
              <option value="today" className="text-dark">
                Today
              </option>
              <option value="week" className="text-dark">
                This Week
              </option>
              <option value="month" className="text-dark">
                This Month
              </option>
            </select>
          </div>
        </div>
        <img
          src={rightCurl}
          alt="curl"
          className="position-absolute end-0 top-0 h-100 opacity-08 object-cover w-max-300px"
        />
      </div>

      {/* Dashboard Content */}
      <div className="container-fluid flex-grow-1 p-4 p-lg-5 overflow-auto">
        <div className="row g-4">
          {/* Left Panel Cards */}
          <div className="col-12 col-lg-3">
            <div className="bg-white rounded-3 shadow-sm p-4 h-100 d-flex flex-column gap-4">
              {/* Quotations Card */}
              <div className="d-flex align-items-center justify-content-between p-3 rounded bg-card-gray">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-white p-2 rounded shadow-sm text-warning fs-3 d-flex align-items-center justify-content-center w-50px h-50px">
                    <i className="fa-solid fa-clipboard-list"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-orient">{t.quotations}</h6>
                    <small className="text-muted">{t.quotations}</small>
                  </div>
                </div>
                <h3 className="mb-0 fw-bold text-orient ms-2">
                  {dummyData.quotations}
                </h3>
              </div>

              {/* Policies Card */}
              <div className="d-flex align-items-center justify-content-between p-3 rounded bg-card-gray">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-white p-2 rounded shadow-sm text-info fs-3 d-flex align-items-center justify-content-center w-50px h-50px">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-orient">{t.policies}</h6>
                    <small className="text-muted">{t.policies}</small>
                  </div>
                </div>
                <h3 className="mb-0 fw-bold text-orient ms-2">
                  {dummyData.policies}
                </h3>
              </div>

              {/* Issued Certificates Card (Underwriter Only) */}
              {isUnderwriter && (
                <div className="d-flex align-items-center justify-content-between p-3 rounded bg-card-gray">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-white p-2 rounded shadow-sm text-primary fs-3 d-flex align-items-center justify-content-center w-50px h-50px">
                      <i className="fa-solid fa-file-contract"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold text-orient">
                        {t.issuedCertificates}
                      </h6>
                      <small className="text-muted">
                        {t.issuedCertificates}
                      </small>
                    </div>
                  </div>
                  <h3 className="mb-0 fw-bold text-orient ms-2">
                    {dummyData.issuedCertificates}
                  </h3>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel Cards */}
          <div className="col-12 col-lg-9">
            <div className="row g-4">
              {/* Single Policy */}
              <div className="col-12 col-md-6">
                <div className="bg-white rounded-3 shadow-sm p-4 d-flex justify-content-between align-items-center position-relative overflow-hidden h-100 min-vh-25">
                  <div className="z-2">
                    <h5 className="text-dark mb-1">{t.singlePolicy}</h5>
                    <p className="text-muted small mb-4">
                      {t.singlePolicyDesc}
                    </p>
                    <button
                      onClick={() => navigate("/eservices/policy-login/single")}
                      className="btn btn-sm btn-primary py-2 px-4 rounded-pill shadow-sm opacity-75 bg-light-blue text-orient-blue border-0"
                    >
                      {t.issuePolicyBtn}
                    </button>
                  </div>

                  {/* Abstract Blue Shape */}
                  <div className="position-absolute end-0 top-0 h-100 w-40pct bg-gradient-blue z-1 shape-left-rounded"></div>

                  <div className="position-relative z-2">
                    <h1 className="display-4 fw-normal text-orient m-0 me-3">
                      {dummyData.singlePolicyId}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Open Cover Policy (Underwriter Only) */}
              {isUnderwriter && (
                <div className="col-12 col-md-6">
                  <div className="bg-white rounded-3 shadow-sm p-4 d-flex justify-content-between align-items-center position-relative overflow-hidden h-100 min-vh-25">
                    <div className="z-2">
                      <h5 className="text-dark mb-1">{t.openCover}</h5>
                      <p className="text-muted small mb-4">{t.openCoverDesc}</p>
                      <div className="d-flex gap-2">
                        <button
                          onClick={() =>
                            navigate("/eservices/policy-login/open")
                          }
                          className="btn btn-sm btn-primary py-2 px-4 rounded-pill shadow-sm bg-light-indigo text-orient-blue border-0"
                        >
                          {t.issuePolicyBtn}
                        </button>
                        <button className="btn btn-sm btn-info py-2 px-4 rounded-pill shadow-sm bg-light-teal text-teal border-0">
                          {t.issueCertBtn}
                        </button>
                      </div>
                    </div>

                    {/* Abstract Teal Shape */}
                    <div className="position-absolute end-0 top-0 h-100 w-40pct bg-gradient-teal z-1 shape-left-rounded"></div>

                    <div className="position-relative z-2">
                      <h1 className="display-4 fw-normal text-orient m-0 me-3">
                        {dummyData.openCoverId}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
