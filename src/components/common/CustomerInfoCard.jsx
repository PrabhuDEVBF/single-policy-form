import React from "react";
import { FaUser } from "react-icons/fa";

const CustomerInforCard = ({ formData }) => {

  const getPolicyLabel = (type) => {
    if (!type) return "Marine Insurance";
    if (type === "2000") return "Marine Cargo - Single Transit";
    return "Marine Insurance";
  };

  const customerName =
    `${formData?.firstName || ""} ${formData?.lastName || ""}`.trim();

return (
  <div className="card shadow-sm border-0 rounded-4 mb-4">

    <div className="card-body p-4">

      {/* Top Section */}
      <div className="d-flex align-items-center gap-3">

        <div className="bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center rounded-3"
             style={{ width: "70px", height: "70px" }}>
          <FaUser size={28} />
        </div>

        <div>
          <h5 className="mb-1 fw-semibold">
            {customerName || "Customer Name"}
          </h5>
          <div className="text-muted small">
            {getPolicyLabel(formData?.product?.value)}
          </div>
        </div>

      </div>

      <hr className="my-3" />

      {/* Customer Info */}
      <div className="small">

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">National ID</span>
          <span className="fw-semibold">
            {formData?.idNumber || "-"}
          </span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">Phone</span>
          <span className="fw-semibold">
            {formData?.mobileNo || "-"}
          </span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">Email</span>
          <span className="fw-semibold">
            {formData?.email || "-"}
          </span>
        </div>

      </div>
          <h5 className="mb-1 fw-semibold">
            {customerName || "Policy Details"}
          </h5>
      <hr className="my-3" />

      {/* Policy Info */}
      <div className="small">

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">Product Name</span>
          <span className="fw-semibold">
            {formData?.product?.label || "-"}
          </span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">Issue Date</span>
          <span className="fw-semibold">
            {formData?.issueDate || "-"}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="text-secondary">Expiry Date</span>
          <span className="fw-semibold">
            {formData?.expiryDate || "-"}
          </span>
        </div>

      </div>

    </div>
  </div>
);
};

export default CustomerInforCard;