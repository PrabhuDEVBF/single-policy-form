import React from "react";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";
import { FaUser, FaFileAlt, FaMoneyBillWave } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/img/logo/logo-orient.png";

const PolicySummary = ({ formData = {} ,policyData = {},quotationData={}, }) => {

  const customer = JSON.parse(sessionStorage.getItem("customerData") || "{}");
  console.log("policy data",policyData)
const downloadPDF = () => {
  const doc = new jsPDF();

  //  Logo
  doc.addImage(logo, "PNG", 14, 10, 40, 15);

  //  Title
  doc.setFontSize(16);
  doc.text("Policy Certificate", 105, 20, { align: "center" });

  //  Policy Info Table
  autoTable(doc, {
    startY: 35,
    head: [["Field", "Details"]],
    body: [
      ["Policy No", policyData?.policyNo],
      ["Customer Name", customer?.fullName || "-"],
      ["National ID", customer?.policyHolderID || "-"],
      ["Premium", policyData?.premium || "1500"],
      ["Balance", policyData?.balance || "1000"],
      ["Expiry", quotationData?.expiryDate]
    ],
    theme: "grid"
  });
  //  Footer
  doc.setFontSize(10);
  doc.text("This is a system generated policy.", 14, 290);

  //  Save
  doc.save(`Policy-${policyData?.policyNo}.pdf`);
};

//   if (!policyData) return null;
if (!policyData) {
  return <div className="text-center p-5">Loading policy...</div>;
}
  return (
    <div className="container-fluid py-3" style={{ maxWidth: "100%" }}>

      {/* HEADER */}
      <div className="bg-white border rounded-top px-3 py-2 d-flex justify-content-between align-items-center shadow-sm no-print">

        <div className="fw-semibold text-primary">
          <FaFileAlt />
          Marine Insurance Policy
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm rounded-pill px-3"
            onClick={() => window.print()}
          >
            Print
          </button>

          <button
            className="btn btn-success btn-sm rounded-pill px-3"
            onClick={downloadPDF}
          >
            Download Policy
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div
        id="policy-content"
        className="bg-white p-3 border rounded-bottom shadow-sm"
      >

        {/* POLICY INFO */}
        <div className="row g-2 mb-3 small">

          <div className="col-md-4">
            <div className="border rounded-3 p-2 shadow-sm">
              <div className="text-muted small">Policy Number</div>
              <div className="fw-bold text-success">
                {policyData?.policyNo || "-"}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 shadow-sm">
              <div className="text-muted small">Issue Date</div>
              <div>
                {dayjs(policyData?.issueDate).format("DD-MM-YYYY")}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 shadow-sm">
              <div className="text-muted small">Policy Status</div>
              <div className="text-success fw-semibold">
                Active
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 shadow-sm">
              <div className="text-muted small">Coverage From</div>
              <div>
                {dayjs(policyData?.inceptionDate).format("DD-MM-YYYY")}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 shadow-sm">
              <div className="text-muted small">Coverage To</div>
              <div>
                {dayjs(policyData?.expiryDate).format("DD-MM-YYYY")}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 shadow-sm">
              <div className="text-muted small">Product</div>
              <div>{formData.product?.label}</div>
            </div>
          </div>

        </div>

        <hr className="my-3" />

        {/* CUSTOMER + PREMIUM */}
        <div className="row g-3">

          {/* CUSTOMER */}
          <div className="col-md-7">
            <div className="border rounded-3 p-3 small shadow-sm h-100">

              <div className="fw-semibold text-primary mb-3 d-flex align-items-center gap-2">
                <FaUser /> Customer Details
              </div>

              <div className="row">

                <div className="col-6 mb-2">
                  <div className="text-muted">Name</div>
                  <div className="fw-semibold">
                    {customer?.fullName || "-"}
                  </div>
                </div>

                <div className="col-6 mb-2">
                  <div className="text-muted">Mobile</div>
                  <div>
                    {customer?.mobileNo || "-"}
                  </div>
                </div>

                <div className="col-6 mb-2">
                  <div className="text-muted">Email</div>
                  <div>
                    {customer?.email || "-"}
                  </div>
                </div>

                <div className="col-6 mb-2">
                  <div className="text-muted">ID / CR</div>
                  <div>
                    {customer?.policyHolderID || "-"}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* PREMIUM */}
          <div className="col-md-5">
            <div className="border rounded-3 p-3 small shadow-sm h-100">

              <div className="fw-semibold text-primary mb-3 d-flex align-items-center gap-2">
                <FaMoneyBillWave /> Premium Paid
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Base Premium</span>
                <span>{policyData?.basepremium || "0.00"}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">VAT</span>
                <span>{formData?.vat || "15%"}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <span className="fw-semibold">Total Paid</span>

                <span
                  className="fw-bold text-success px-3 py-1 rounded-pill"
                  style={{ background: "#eaf7ef" }}
                >
                  SAR {formData?.TotalPremium || "0.00"}
                </span>

              </div>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center text-muted small mt-3">
          This is a system generated policy document.
        </div>

      </div>

    </div>
  );
};

export default PolicySummary;