import React from "react";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import { useLanguage } from "../../context/LanguageContext";

const RateMaster = () => {
  const { lang } = useLanguage();

  // Dummy translations for this page if they don't exist in en.json/ar.json
  const tTitle = lang === "ar" ? "قائمة الأسعار" : "Rate Master";
  const tDesc =
    lang === "ar"
      ? "هذه صفحة تجريبية لقائمة الأسعار."
      : "This is a dummy page for the Rate Master.";

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <div className="flex-grow-1 p-4 overflow-auto">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h4 className="fw-bold mb-3 text-orient">{tTitle}</h4>
            <div className="alert alert-secondary border-0 br-8px fs-09rem">
              {tDesc}
            </div>

            {/* Dummy Table */}
            <div className="table-responsive mt-4">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Type</th>
                    <th scope="col">Base Rate</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="fs-09rem">
                  <tr>
                    <td>#RM-001</td>
                    <td>Single Policy</td>
                    <td>1.5%</td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary border-0">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>#RM-002</td>
                    <td>Open Cover</td>
                    <td>2.0%</td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary border-0">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>#RM-003</td>
                    <td>Marine Hull</td>
                    <td>3.2%</td>
                    <td>
                      <span className="badge bg-secondary">Draft</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary border-0">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateMaster;
