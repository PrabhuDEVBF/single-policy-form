import React, { useState, useEffect } from "react";
import Header from "../layout/Header"
const IssueCertificateForm = ({ policy, balance, onClose, onSave }) => {

  const [showMoreModal, setShowMoreModal] = useState(false);

  const [formData, setFormData] = useState({
    product: "",
    issueDate: "",
    inceptionDate: "",
    expiryDate: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    mobileNo: "",
    ModeofShipment: "",
    FromPort: "",
    ToPort: "",
    SailingDate: "",
    VesselName: "",
    IMONumber: "",
    BillNumber: "",
    BillDate: "",
    InvoiceValue: "",
    RiskAdds: [
      {
        fmaterialcatagory: "",
        mrgShipmentValueFC: "",
        fmarinerate: "",
        fwarrate: "",
        foverageRate: "",
        ftranshipRate: "",
        fdeductibleRate: "",
        fotherrate: "",
        mrgTotalMRPremium: 0,
      },
    ],
  });

  useEffect(() => {
    if (policy) {
      setFormData((prev) => ({
        ...prev,
        product: policy.product || "",
        ModeofShipment: policy.modeOfShipment || "",
      }));
    }
  }, [policy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...formData.RiskAdds];
    updated[index][field] = value;

    const r = updated[index];
    const totalRate =
      Number(r.fmarinerate || 0) +
      Number(r.fwarrate || 0) +
      Number(r.foverageRate || 0) +
      Number(r.ftranshipRate || 0) +
      Number(r.fdeductibleRate || 0) +
      Number(r.fotherrate || 0);

    const si = Number(r.mrgShipmentValueFC || 0);
    r.mrgTotalMRPremium = (si * totalRate) / 100;

    setFormData({ ...formData, RiskAdds: updated });
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      RiskAdds: [
        ...formData.RiskAdds,
        {
          fmaterialcatagory: "",
          mrgShipmentValueFC: "",
          fmarinerate: "",
          fwarrate: "",
          foverageRate: "",
          ftranshipRate: "",
          fdeductibleRate: "",
          fotherrate: "",
          mrgTotalMRPremium: 0,
        },
      ],
    });
  };
  const removeMaterial = (index) => {
    const updated = formData.RiskAdds.filter((_, i) => i !== index);
    setFormData({ ...formData, RiskAdds: updated });
  };

  const totalPremium = formData.RiskAdds.reduce(
    (sum, r) => sum + r.mrgTotalMRPremium,
    0
  );

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <div className="container-fluid px-3 px-md-4 py-4 issue-certificate-wrapper">

        {/* Main Card with subtle gradient border */}
        <div className="card border-0 shadow-xl rounded-4 overflow-hidden">
          {/* Header with gradient background */}
          <div className="card-header bg-gradient-primary text-white py-3 px-4 border-0">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h2 className="h4 mb-0 fw-bold">
                  Issue Certificate
                </h2>
                <p className="text-white-50 small mb-0 mt-1">Marine Cargo Insurance</p>
              </div>
              <div className="d-flex gap-2">
                <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                  <i className="fas fa-file-alt me-1"></i> {policy?.policyNo || "N/A"}
                </span>
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                  <i className="fas fa-ship me-1"></i> {policy?.modeOfShipment || "Air"}
                </span>
              </div>
            </div>
          </div>

          <div className="card-body p-4 p-lg-5">

            <div className="row g-3">
              {/* LEFT COLUMN - Form Sections */}
              <div className="col-lg-8">

                {/* Shipment & Vessel Section */}
                <div className="form-section mb-3">
                  <div className="section-header d-flex align-items-center gap-2 mb-3">
                    <div className="section-icon bg-warning bg-opacity-10 rounded-circle p-2">
                      <i className="fas fa-ship text-warning"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Shipment & Vessel</h5>
                  </div>

                  <div className="row g-2">

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Mode of Shipment
                      </label>
                      <input
                        className="form-control form-control-sm bg-light"
                        value={formData.ModeofShipment}
                        readOnly
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Sailing Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        name="SailingDate"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold text-secondary">
                        From Port
                      </label>
                      <input
                        className="form-control form-control-sm"
                        placeholder="Enter origin port"
                        name="FromPort"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold text-secondary">
                        To Port
                      </label>
                      <input
                        className="form-control form-control-sm"
                        placeholder="Enter destination port"
                        name="ToPort"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3 mt-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Vessel Name
                      </label>
                      <input
                        className="form-control form-control-sm"
                        placeholder="Enter vessel name"
                        name="VesselName"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3 mt-3">
                      <label className="form-label small fw-semibold text-secondary">
                        IMO Number
                      </label>
                      <input
                        className="form-control form-control-sm"
                        placeholder="Enter IMO number"
                        name="IMONumber"
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                </div>

                {/* Documents Section */}
                <div className="form-section mb-3">
                  <div className="section-header d-flex align-items-center gap-2 mb-3">
                    <div className="section-icon bg-danger bg-opacity-10 rounded-circle p-2">
                      <i className="fas fa-file-invoice text-danger"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Documents</h5>
                  </div>

                  <div className="row g-2">

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Bill of Lading / AWB
                      </label>
                      <input
                        className="form-control form-control-sm"
                        placeholder="Enter bill number"
                        name="BillNumber"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Bill Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        name="BillDate"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold text-secondary">
                        Invoice Value (USD)
                      </label>
                      <input
                        className="form-control form-control-sm"
                        placeholder="Enter invoice value"
                        name="InvoiceValue"
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="section-icon bg-dark bg-opacity-10 rounded-circle p-2">
                        <i className="fas fa-cubes text-dark"></i>
                      </div>
                      <h5 className="fw-bold mb-0">Materials & Rates</h5>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                      onClick={addMaterial}
                    >
                      <i className="fas fa-plus me-1"></i> Add Item
                    </button>
                  </div>

                  <div className="accordion" id="materialsAccordion">
                    {formData.RiskAdds.map((m, i) => (
                      <div className="accordion-item mb-2 border rounded" key={i}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed bg-light"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${i}`}
                          >
                            <div className="d-flex justify-content-between w-100 me-3">
                              <span>
                                <i className="fas fa-box me-2"></i>
                                {m.fmaterialcatagory || `Material Item ${i + 1}`}
                              </span>
                              <span className="text-success fw-bold me-5">
                                Premium: ${Number(m.mrgTotalMRPremium || 0).toFixed(2)}
                              </span>
                              <span
                                className="text-danger p-0 me-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (formData.RiskAdds.length > 1) {
                                    removeMaterial(i);
                                  }
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </span>
                            </div>
                          </button>
                        </h2>

                        <div id={`collapse${i}`} className="accordion-collapse collapse" data-bs-parent="#materialsAccordion">
                          <div className="accordion-body">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label">Material Category</label>
                                <input
                                  className="form-control"
                                  placeholder="e.g., Electronics"
                                  value={m.fmaterialcatagory}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "fmaterialcatagory", e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-6">
                                <label className="form-label">Sum Insured (USD)</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount"
                                  value={m.mrgShipmentValueFC}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "mrgShipmentValueFC", e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="form-label">Marine (%)</label>
                                <input
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  value={m.fmarinerate}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "fmarinerate", e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="form-label">War (%)</label>
                                <input
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  value={m.fwarrate}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "fwarrate", e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="form-label">Over Age (%)</label>
                                <input
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  value={m.foverageRate}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "foverageRate", e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="form-label">Tranship (%)</label>
                                <input
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  value={m.ftranshipRate}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "ftranshipRate", e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="form-label">Deductible (%)</label>
                                <input
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  value={m.fdeductibleRate}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "fdeductibleRate", e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="form-label">Other (%)</label>
                                <input
                                  type="number"
                                  step="any"
                                  className="form-control"
                                  value={m.fotherrate}
                                  onChange={(e) =>
                                    handleMaterialChange(i, "fotherrate", e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Summary Cards */}
              <div className="col-lg-4">
                <div
                  className="form-section mb-3 p-3 rounded-4 border d-flex justify-content-between align-items-center"
                  style={{
                    background: "#f8fff8",
                    borderColor: "rgba(13,110,253,0.15)",
                    maxWidth: "500px",
                    cursor: "pointer"

                  }}
                  onClick={() => setShowMoreModal(true)}
                >

                  <div className="d-flex align-items-center gap-2">
                    <div className="section-icon bg-primary bg-opacity-10 rounded-circle p-2">
                      <i className="fas fa-layer-group text-primary"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Additional Details</h6>
                      <small className="text-danger">Click to view more information</small>
                    </div>
                  </div>

                  <i className="fas fa-chevron-right text-primary"></i>

                </div>
                {/* Premium Summary Card */}
                <div className="summary-card rounded-4 p-4 mb-4" style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)", border: "1px solid rgba(0,123,255,0.1)" }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fas fa-chart-line text-primary fs-4"></i>
                    <h5 className="fw-bold mb-0">Grand Summary</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-end border-bottom pb-3 mb-3">
                    <span className="text-secondary">Total Premium</span>
                    <span className="fs-2 fw-bold text-success">${totalPremium.toFixed(2)}</span>
                  </div>
                  <div className="small text-secondary mb-2">
                    <i className="fas fa-info-circle me-1"></i> Based on current rates
                  </div>
                  <div className="progress mt-2" style={{ height: "6px" }}>
                    <div
                      className="bg-success"
                      style={{ width: `${Math.min((totalPremium / (balance || 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2 small">
                    <span>Premium Used</span>
                    <span>{balance > 0 ? ((totalPremium / balance) * 100).toFixed(1) : 0}% of balance</span>
                  </div>
                </div>

                {/* Materials Breakdown */}
                <div className="summary-card rounded-4 p-4" style={{ background: "#ffffff", border: "1px solid #e9ecef" }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fas fa-boxes text-secondary fs-4"></i>
                    <h5 className="fw-bold mb-0">Materials Breakdown</h5>
                  </div>
                  {formData.RiskAdds.length === 0 ? (
                    <div className="text-center text-secondary py-4">
                      <i className="fas fa-inbox fa-2x mb-2 d-block"></i>
                      <small>No materials added</small>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {formData.RiskAdds.map((m, i) => (
                        <div key={i} className="list-group-item px-0 d-flex justify-content-between align-items-center border-0 py-2">
                          <div>
                            <span className="fw-semibold">{m.fmaterialcatagory || `Item ${i + 1}`}</span>
                            <div className="small text-secondary">
                              SI: ${Number(m.mrgShipmentValueFC || 0).toLocaleString()}
                            </div>
                          </div>
                          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold">
                            ${m.mrgTotalMRPremium.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 pt-2 border-top">
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total Items</span>
                      <span>{formData.RiskAdds.length}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Info Note */}
                <div className="mt-4 p-3 rounded-3 bg-info bg-opacity-10 border-start border-3 border-info">
                  <div className="d-flex gap-2">
                    <i className="fas fa-lightbulb text-info"></i>
                    <div>
                      <strong className="small d-block">Premium Calculation</strong>
                      <small className="text-secondary">Premium = SI × (All Rates Combined) / 100</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-5 pt-3 border-top">
              <button
                className="btn btn-outline-secondary px-4 py-2 rounded-pill"
                onClick={onClose}
              >
                <i className="fas fa-times me-2"></i>Cancel
              </button>
              <button
                className="btn btn-primary px-5 py-2 rounded-pill shadow-sm"
                onClick={() => onSave(formData)}
              >
                <i className="fas fa-check-circle me-2"></i>Issue Certificate
              </button>
            </div>
          </div>
        </div>
        {showMoreModal && (
          <>
            <div
              className="modal fade show d-block"
              style={{ zIndex: 1055 }}
              onClick={() => setShowMoreModal(false)} // outside click close
            >
              <div
                className="modal-dialog modal-xl modal-dialog-centered"
                onClick={(e) => e.stopPropagation()} // inside click safe
              >
                <div className="modal-content rounded-4">

                  {/* Header */}
                  <div className="modal-header bg-light">
                    <h5 className="fw-bold mb-0">More Information</h5>
                    <button
                      className="btn-close"
                      onClick={() => setShowMoreModal(false)}
                    ></button>
                  </div>

                  {/* Body */}
                  <div className="modal-body">

                    {/* Basic Info */}
                    <div className="mb-4">
                      
                      <h6 className="fw-bold text-primary mb-3"><i className="fas fa-info-circle text-primary"></i> Basic Information</h6>

                      <div className="row g-2">
                        <div className="col-md-3">
                          <label className="form-label small">Product</label>
                          <input
                            className="form-control form-control-sm"
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label small">Issue Date</label>
                          <input type="date" className="form-control form-control-sm" name="issueDate" onChange={handleChange} />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label small">Inception Date</label>
                          <input type="date" className="form-control form-control-sm" name="inceptionDate" onChange={handleChange} />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label small">Expiry Date</label>
                          <input type="date" className="form-control form-control-sm" name="expiryDate" onChange={handleChange} />
                        </div>
                      </div>
                    </div>

                    {/* Customer */}
                    <div>
                      <h6 className="fw-bold text-primary mb-3"><i className="fas fa-user-circle text-primary"></i> Customer Details</h6>

                      <div className="row g-2">
                        <div className="col-md-3">
                          <input className="form-control" placeholder="First Name" name="firstName" onChange={handleChange} />
                        </div>

                        <div className="col-md-3">
                          <input className="form-control" placeholder="Last Name" name="lastName" onChange={handleChange} />
                        </div>

                        <div className="col-md-3">
                          <input className="form-control" placeholder="ID Number / Passport" name="idNumber" onChange={handleChange} />
                        </div>

                        <div className="col-md-3">
                          <input className="form-control" placeholder="Mobile Number" name="mobileNo" onChange={handleChange} />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setShowMoreModal(false)}
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* backdrop */}
            <div
              className="modal-backdrop fade show"
              style={{ zIndex: 1050 }}
              onClick={() => setShowMoreModal(false)}
            ></div>
          </>
        )}
        {/* Custom CSS for additional styling (can be moved to separate CSS file) */}
        <style>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0b3c81 0%, #0b5ed7 100%);
        }
        .shadow-xl {
          box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.15);
        }
        .metric-card {
          transition: all 0.2s ease;
          background: #fefefe;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .form-section {
          background: #ffffff;
          border-radius: 1rem;
          padding: 0.5rem 0;
        }
        .section-icon {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .form-control, .form-select {
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          transition: all 0.2s;
        }
        .form-control:focus, .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 3px rgba(13,110,253,0.1);
        }
        .table th {
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: #4a5568;
          border-bottom-width: 1px;
        }
        .summary-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .summary-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .btn-primary {
          background: linear-gradient(135deg, #0d6efd, #0b5ed7);
          border: none;
          font-weight: 500;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #0b5ed7, #0a58ca);
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(13,110,253,0.3);
        }
        .btn-outline-secondary:hover {
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .card-body {
            padding: 1.5rem !important;
          }
          .table-responsive {
            font-size: 0.85rem;
          }
        }
      `}

        </style>
      </div>
    </div>
  );
};

export default IssueCertificateForm;