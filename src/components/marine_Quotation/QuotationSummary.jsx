import React, { useState } from "react";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";

const QuotationSummary = ({ formData, risks = [] }) => {
  const [accepted, setAccepted] = useState(false);

  const quotationNumber = `MQ-${dayjs().format("YYYYMMDD-HHmmss")}`;
  const validTill = dayjs().add(7, "day").format("DD-MM-YYYY");

  const totalPremium = Number(formData.TotalPremium || 0).toFixed(2);

  const downloadPDF = () => {
    const element = document.getElementById("quotation-content");
    html2pdf().from(element).save(`Quotation-${quotationNumber}.pdf`);
  };

  return (
    <div className="container py-4">

 {/* HEADER */}
<div className="card-header bg-primary bg-opacity-10 border-bottom d-flex justify-content-between align-items-center py-3 px-4 shadow-sm rounded-top no-print">

  {/* LEFT TITLE */}
  <div className="d-flex align-items-center">
    <div
      className="me-2 bg-primary rounded"
      style={{ width: "4px", height: "24px" }}
    ></div>

    <h5 className="mb-0 fw-semibold text-primary">
      Marine Insurance Quotation Summary
    </h5>
  </div>

  {/* RIGHT ACTION BUTTONS */}
  <div className="d-flex align-items-center gap-2">

    <button
      type="button"
      className="btn btn-outline-secondary btn-sm rounded-pill px-3"
      onClick={() => window.print()}
    >
      Print
    </button>

    <button
      type="button"
      className="btn btn-primary btn-sm rounded-pill px-3"
      onClick={downloadPDF}
    >
      Download PDF
    </button>

  </div>

</div>

      {/* MAIN CARD */}
      <div
        id="quotation-content"
        className="bg-white p-4 shadow rounded-4"
      >


        {/* INFO ROW */}
        <div className="row mb-4">
          <div className="col-md-6">
            <p><strong>Quotation No:</strong> {quotationNumber}</p>
            <p><strong>Issue Date:</strong> {formData.issueDate}</p>
            <p><strong>Valid Till:</strong> {validTill}</p>
          </div>

          <div className="col-md-6">
            <p><strong>Coverage From:</strong> {formData.inceptionDate}</p>
            <p><strong>Coverage To:</strong> {formData.expiryDate}</p>
            <p><strong>Product:</strong> {formData.product?.label}</p>
          </div>
        </div>

        <hr />

        {/* CUSTOMER + PREMIUM SECTION */}
        <div className="row mb-4">

          {/* CUSTOMER */}
          <div className="col-md-7">
            <h6 className="fw-bold mb-3">Customer Details</h6>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Mobile:</strong> {formData.mobileNo}</p>
            <p><strong>ID/CR:</strong> {formData.idNumber}</p>
          </div>

          {/* PREMIUM BOX */}
          <div className="col-md-5">
            <div className="bg-light p-3 rounded-4 border">
              <h6 className="fw-bold mb-3">Premium Summary</h6>

              <div className="d-flex justify-content-between">
                <span>Base Premium</span>
                <span>{formData.marineRate || "0.00"}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>War Premium</span>
                <span>{formData.warRate || "0.00"}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>VAT</span>
                <span>{formData.vat || "0.00"}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span className="text-success">
                  SAR {totalPremium}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MULTI RISK TABLE */}
        {risks.length > 0 && (
          <>
            <h6 className="fw-bold mb-3">Risk Details</h6>

            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Risk</th>
                    <th>Marine</th>
                    <th>War</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {risks.map((risk, index) => (
                    <tr key={index}>
                      <td>{risk.materialName}</td>
                      <td>{risk.marineRate}</td>
                      <td>{risk.warRate}</td>
                      <td>{risk.totalPremium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TERMS */}
        <div className="bg-light p-3 rounded-4 mb-4">
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
      <div className="text-center mt-4 no-print">
        <button
          className="btn btn-primary px-5 rounded-pill"
          disabled={!accepted}
        >
          Proceed To Pay
        </button>
      </div>

    </div>
  );
};

export default QuotationSummary;