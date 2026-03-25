import React, { useState } from "react";

import dayjs from "dayjs";

import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { FaUser, FaMoneyBillWave } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/img/logo/logo-orient.png";

const QuotationSummary = ({ formData, risks,onIssuePolicy , quotationData = {} }) => {

  const [accepted, setAccepted] = useState(false);

  const quotationNumber = `MQ-${dayjs().format("YYYYMMDD-HHmmss")}`;

  const validTill = dayjs().add(7, "day").format("DD-MM-YYYY");

  const totalPremium = Number(formData.TotalPremium || 0).toFixed(2);

  const customer = JSON.parse(sessionStorage.getItem("customerData") || "{}");

const downloadPDF = () => {
  const doc = new jsPDF();

  //  Logo
  doc.addImage(logo, "PNG", 14, 10, 40, 15);

  //  Title
  doc.setFontSize(16);
  doc.text("Marine Insurance Quotation", 105, 20, { align: "center" });

  //  Quotation Info Table
  autoTable(doc, {
    startY: 35,
    head: [["Field", "Details"]],
    body: [
      ["Quotation No", quotationData?.policyId],
      ["Issue Date", dayjs(quotationData?.createdDate).format("DD-MM-YYYY")],
      ["Valid Till", dayjs(quotationData?.expiryDate).format("DD-MM-YYYY")],
      ["Coverage From", dayjs(quotationData?.inceptionDate).format("DD-MM-YYYY")],
      ["Coverage To", dayjs(quotationData?.expiryDate).format("DD-MM-YYYY")],
      ["Product", formData.product?.label]
    ],
    theme: "grid"
  });

  //  Customer Table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Customer Details", ""]],
    body: [
      ["Name", customer?.fullName || "-"],
      ["Mobile", customer?.mobileNo || "-"],
      ["Email", customer?.email || "-"],
      ["ID / CR", customer?.policyHolderID || "-"]
    ],
    theme: "grid"
  });

  //  Premium Table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Premium Details", ""]],
    body: [
      ["Base Premium", quotationData?.basepremium || "10000.00"],
      ["VAT", formData.vat || "15%"],
      ["Total Premium", `SAR ${formData.TotalPremium || "11500"}`]
    ],
    theme: "grid"
  });

  //  Footer
  doc.setFontSize(10);
  doc.text("This is a system generated quotation.", 14, 290);

  //  Save
  doc.save(`Quotation-${quotationData?.policyId}.pdf`);
};

  if (!quotationData) return null;

  return (
    <div className="container-fluid py-3" style={{ maxWidth: "100%" }}>

      {/* HEADER */}
      <div className="bg-white border rounded-top px-3 py-2 d-flex justify-content-between align-items-center shadow-sm no-print">
        <div className="fw-semibold text-primary">

          Marine Insurance Quotation
        </div>

        <div className="d-flex gap-2">
          <button

            className="btn btn-outline-secondary btn-sm rounded-pill px-3"

            onClick={() => window.print()}
          >

            Print
          </button>

          <button

            className="btn btn-primary btn-sm rounded-pill px-3"

            onClick={downloadPDF}
          >

            Download PDF
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div

        id="quotation-content"

        className="bg-white p-3 border rounded-bottom shadow-sm"
      >

        {/* TOP INFO */}
        <div className="row g-2 mb-3 small">

          <div className="col-md-4">
            <div className="border rounded-3 p-2 bg-white shadow-sm">
              <div className="text-muted small">Quotation No</div>
              <div className="fw-bold text-success">{quotationData?.policyId}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 bg-white shadow-sm">
              <div className="text-muted small">Issue Date</div>
              <div className="fw-semibold">  {dayjs(quotationData?.createdDate).format("DD-MM-YYYY")}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 bg-white shadow-sm">
              <div className="text-muted small">Valid Till</div>
              <div className="fw-semibold">{dayjs(quotationData?.expiryDate).format("DD-MM-YYYY")}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 bg-white shadow-sm">
              <div className="text-muted small">Coverage From</div>
              <div>{dayjs(quotationData?.inceptionDate).format("DD-MM-YYYY")}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 bg-white shadow-sm">
              <div className="text-muted small">Coverage To</div>
              <div>{dayjs(quotationData?.expiryDate).format("DD-MM-YYYY")}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-3 p-2 bg-white shadow-sm">
              <div className="text-muted small">Product</div>
              <div>{formData.product?.label}</div>
            </div>
          </div>

        </div>

        <hr className="my-3" />

        {/* CUSTOMER + PREMIUM */}
        <div className="row g-3 mb-3">

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
                <FaMoneyBillWave /> Premium Summary
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Base Premium</span>
                <span>{quotationData?.basepremium || "10000.00"}</span>
              </div>

              {/* <div className="d-flex justify-content-between mb-2">
<span className="text-muted">War Premium</span>
<span>{formData.warRate || "0.00"}</span>
</div> */}

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">VAT</span>
                <span>{formData.vat || "15%"}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">

                <span className="fw-semibold">Total Premium</span>

                <span

                  className="fw-bold text-success px-3 py-1 rounded-pill"

                  style={{ background: "#eaf7ef" }}
                >

                  SAR {formData.TotalPremium || "11,500"}
                </span>

              </div>

            </div>
          </div>

        </div>

        {/* TERMS */}
        <div className="border rounded-3 p-2 small mb-3">
          <div className="form-check">
            <input

              type="checkbox"

              className="form-check-input"

              checked={accepted}

              onChange={() => setAccepted(!accepted)}

            />
            <label className="form-check-label">

              I agree to the Terms & Conditions
            </label>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-muted small">

          This is a system generated quotation.
        </div>

      </div>

      {/* PAY BUTTON */}
      {/* <div className="text-center mt-3 no-print">
        <button

          className="btn btn-primary px-5 py-2 rounded-pill shadow-sm"

          disabled={!accepted}
        >

          Proceed To Pay
        </button>
      </div> */}
{/* PAY BUTTON */}
<div className="text-center mt-3 no-print">
  <button
    className="btn btn-primary px-5 py-2 rounded-pill shadow-sm"
    disabled={!accepted}
    onClick={onIssuePolicy}
  >
    Proceed To Pay
  </button>
</div>
    </div>

  );

};

export default QuotationSummary;

