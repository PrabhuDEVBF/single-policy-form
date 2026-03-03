import React from "react";
import Header from "../../components/layout/Header";

const Reports = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header />
      <div className="bg-orient-2 text-white py-3 px-4 px-lg-5">
        <h4 className="mb-0 fw-normal">Reports</h4>
      </div>
      <div className="container-fluid p-4 p-lg-5">
        <div className="bg-white p-5 rounded shadow-sm text-center">
          <h5 className="text-muted">Reports View (Static Placeholder)</h5>
        </div>
      </div>
    </div>
  );
};

export default Reports;
