import React from "react";
import { FaUser, FaShieldAlt } from "react-icons/fa";

const CustomerInforCard = ({ formData }) => {

  const customer = JSON.parse(sessionStorage.getItem("customerData") || "{}");

  const getPolicyLabel = (type) => {
    if (!type) return "Marine Insurance";
    if (type === "2000") return "Marine Cargo - Single Transit";
    return "Marine Insurance";
  };

  const customerName = customer?.fullName || "Customer Name";

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-body p-4">

        {/* Customer Header */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center rounded-3"
            style={{ width: "70px", height: "70px" }}
          >
            <FaUser size={26} />
          </div>

          <div>
            <h5 className="mb-1 fw-semibold">{customerName}</h5>
            <div className="text-muted small">
              {getPolicyLabel(formData?.product?.value)}
            </div>
          </div>
        </div>

        <hr />

        {/* Customer Information */}
        <div className="small mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">National ID</span>
            <span className="fw-semibold">{customer?.policyHolderID || "-"}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Phone</span>
            <span className="fw-semibold">{customer?.mobileNo || "-"}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span className="text-secondary">Email</span>
            <span className="fw-semibold">{customer?.email || "-"}</span>
          </div>
        </div>

        {/* Policy Details Header */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <FaShieldAlt className="text-primary" />
          <h6 className="mb-0 fw-semibold">Policy Details</h6>
        </div>

        <hr />

        {/* Policy Information */}
        <div className="small">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Product Name</span>
            <span className="fw-semibold">{formData?.product?.label || "-"}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Issue Date</span>
            <span className="fw-semibold">{formData?.issueDate || "-"}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span className="text-secondary">Expiry Date</span>
            <span className="fw-semibold">{formData?.expiryDate || "-"}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerInforCard;