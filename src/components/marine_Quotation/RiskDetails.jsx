import React, { useState, useMemo, useEffect } from "react";
import { CustomDropDown } from "../../components/Common/CustomDropdown";
import { FaTrashAlt } from "react-icons/fa";
import testData from "../../../src/data/Test.json";

const RateDetails = ({ rateList, setRateList }) => {

  const [selected, setSelected] = useState({
    modeOfTransport: null,
    rateCover: null,
    voyageType: null,
    materialCategory: null,
  });

  const {
    modeOfTransport,
    voyageTypes,
    materialCategories,
    iccCoverTypes,
    rates,
  } = testData;

  // Filter ICC based on Mode
  const filteredICC = useMemo(() => {
    if (!selected.modeOfTransport?.value) return [];

    return iccCoverTypes.filter(
      (i) => i.MotransportCode === selected.modeOfTransport.value
    );
  }, [selected.modeOfTransport, iccCoverTypes]);

  const handleChange = (field, value) => {
    setSelected((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getModeLabel = (code) =>
    modeOfTransport.find((m) => m.code === code)?.name || "-";

  const getMaterialLabel = (code) =>
    materialCategories.find((m) => m.code === code)?.name || "-";

  // AUTO ADD
  useEffect(() => {
    if (
      !selected.modeOfTransport?.value ||
      !selected.rateCover?.value ||
      !selected.voyageType?.value ||
      !selected.materialCategory?.value
    ) {
      return;
    }

    const matched = rates.find(
      (r) =>
        r.modeOfTransport === selected.modeOfTransport.value &&
        r.voyageType === selected.voyageType.value &&
        r.materialCategory === selected.materialCategory.value &&
        r.rateCover === selected.rateCover.value
    );

    if (!matched) return;

    setRateList((prev) => {
      const exists = prev.some(
        (r) =>
          r.modeOfTransport === matched.modeOfTransport &&
          r.voyageType === matched.voyageType &&
          r.materialCategory === matched.materialCategory &&
          r.rateCover === matched.rateCover
      );

      if (exists) return prev;
return [
  ...prev,
  {
    id: Date.now(),
    ...matched,
    materialName: getMaterialLabel(matched.materialCategory),
    modeName: getModeLabel(matched.modeOfTransport),
    isVerified: false,
  },
  
];
    });

    // Reset dependent dropdowns
    setSelected((prev) => ({
      ...prev,
      rateCover: null,
      voyageType: null,
      materialCategory: null,
    }));

  }, [
    selected.modeOfTransport,
    selected.rateCover,
    selected.voyageType,
    selected.materialCategory,
    rates,
    setRateList
  ]);

  const removeRate = (id) => {
    setRateList((prev) => prev.filter((r) => r.id !== id));
  };

  const verifyRate = (id) => {
    setRateList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isVerified: true } : r
      )
    );
  };

  return (
    <div className="card mt-4 shadow-sm border-0 rounded-3 form-section">

      <div className="card-header bg-primary bg-opacity-10 border-bottom d-flex align-items-center py-3 px-4 shadow-sm">
        <div
          className="me-2"
          style={{
            width: "4px",
            height: "24px",
            background: "#0d6efd",
            borderRadius: "4px",
          }}
        ></div>
        <h5 className="mb-0 fw-semibold text-primary">
          Rate Details
        </h5>
      </div>

      <div className="card-body">

        <div className="row">

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              label="Mode of Transport"
              fullclassName="mb-3"
              value={selected.modeOfTransport}
              onChange={(v) => handleChange("modeOfTransport", v)}
              options={modeOfTransport.map((i) => ({
                label: i.name,
                value: i.code,
              }))}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="Rate Cover"
              value={selected.rateCover}
              onChange={(v) => handleChange("rateCover", v)}
              options={filteredICC.map((i) => ({
                label: i.name,
                value: i.code,
              }))}
              isDisabled={!selected.modeOfTransport}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="Voyage Type"
              value={selected.voyageType}
              onChange={(v) => handleChange("voyageType", v)}
              options={voyageTypes.map((i) => ({
                label: i.name,
                value: i.code,
              }))}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="Material Category"
              value={selected.materialCategory}
              onChange={(v) => handleChange("materialCategory", v)}
              options={materialCategories.map((i) => ({
                label: i.name,
                value: i.code,
              }))}
            />
          </div>

        </div>

        {/* TABLE */}
<style>
{`
/* ===== HEADER STYLES (FIXED) ===== */
.custom-rate-table thead th {
  background: linear-gradient(180deg, #0a3c6e 0%, #083155 100%) !important;
  color: #ffffff !important;
  font-weight: 600;
  font-size: 12.5px;
  letter-spacing: 0.3px;
  padding: 16px 8px;
  text-transform: uppercase;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 2px solid #fdb913;
  white-space: normal !important;

}

  .rate-pill.dark {
    background: #0a3c6e;
    color: white;
    font-weight: 600;
    border: none;
  }

  /* ===== BADGES ===== */
  .badge.bg-success {
    background: #e4f5e8 !important;
    color: #0f6e3f !important;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 12px;
    border: 1px solid #b8dec6;
    box-shadow: 0 2px 4px rgba(0,80,30,0.05);
  }

  /* ===== BUTTONS ===== */
  .btn-outline-danger {
    border-radius: 30px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    border: 1.5px solid #ffcdd6;
    color: #b02a37;
    background: white;
    transition: all 0.15s ease;
  }

  .btn-outline-danger:hover {
    background: #dc3545;
    color: white;
    border-color: #dc3545;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(220,53,69,0.2);
  }

  .btn-outline-primary {
    border-radius: 30px;
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 500;
    border: 1.5px solid #c7daf0;
    color: #0a4b8c;
    background: white;
  }

  .btn-outline-primary:hover {
    background: #0a4b8c;
    color: white;
    border-color: #0a4b8c;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(10,75,140,0.15);
  }

  /* ===== RATE COLUMN HIGHLIGHTS (BODY ONLY) ===== */
  /* Marine Rate */
  .custom-rate-table tbody td:nth-child(6) {
    background: #fff8f8;
  }

  /* War Rate */
  .custom-rate-table tbody td:nth-child(7) {
    background: #ffffff;
  }

  /* OverAge */
  .custom-rate-table tbody td:nth-child(8) {
    background: #f8fbff;
  }

  /* Tranship */
  .custom-rate-table tbody td:nth-child(9) {
    background: #ffffff;
  }

  /* Deductible - Highlighted */
  .custom-rate-table tbody td:nth-child(10) {
    background: #fff7e6;
    font-weight: 600;
  }

  /* Min Premium - Most Important */
  .custom-rate-table tbody td:nth-child(11) {
    background: #e2efff;
    font-weight: 700;
    color: #083155;
    position: relative;
  }

  /* ===== EMPTY STATE ===== */
  .custom-rate-table tbody tr td[colspan] {
    padding: 40px;
    color: #6c7a92;
    font-size: 14px;
    background: #f9fcff;
    text-align: center;
  }

  /* ===== VERIFIED COLUMN ===== */
  .custom-rate-table tbody td:last-child {
    min-width: 100px;
  }

  /* ===== TEXT COLUMNS ===== */
  .custom-rate-table tbody td:nth-child(2),
  .custom-rate-table tbody td:nth-child(3),
  .custom-rate-table tbody td:nth-child(4),
  .custom-rate-table tbody td:nth-child(5) {
    color: #2c3d5c;
    font-weight: 500;
  }

  /* ===== FOOTER NOTE ADDITION (Optional) ===== */
  .table-footer-note {
    margin-top: 12px;
    padding: 10px 16px;
    background: #f1f7fe;
    border-radius: 10px;
    font-size: 12px;
    color: #2d4b75;
    border-left: 4px solid #291764;
  }
    .responsive{
overflow-x: hidden;
    }
`}
</style>

<div className="mt-4">
  <div className="table-responsive">
    <table className="table align-middle text-center mb-0 custom-rate-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Mode Of Transport</th>
          <th>Rate Cover</th>
          <th>Voyage Type</th>
          <th>Material Category</th>
          <th>Marine Rate</th>
          <th>War Rate</th>
          <th>OverAge Rate</th>
          <th>Tranship Rate</th>
          <th>Deductible</th>
          <th>Min Premium</th>
          <th>Remove</th>
          <th>Verify</th>
        </tr>
      </thead>

      <tbody>
        {rateList.length === 0 && (
          <tr>
            <td colSpan={13} className="py-4 text-muted">
              No marine rates added yet.
            </td>
          </tr>
        )}

        {rateList.map((row, index) => (
          <tr key={row.id}>
            <td>{String(index + 1).padStart(2, "0")}</td>
            <td>{getModeLabel(row.modeOfTransport)}</td>
            <td>{row.rateCover}</td>
            <td>
              {voyageTypes.find(v => v.code === row.voyageType)?.name || "-"}
            </td>
            <td>{getMaterialLabel(row.materialCategory)}</td>

            <td><span className="rate-pill red">{row.marineRate}</span></td>
            <td><span className="rate-pill gray">{row.warRate}</span></td>
            <td><span className="rate-pill blue">{row.overAgeRate}</span></td>
            <td><span className="rate-pill gray">{row.transshipRate}</span></td>
            <td><span className="rate-pill blue">{row.deductible}</span></td>
            <td><span className="rate-pill dark">{row.minimumPremium}</span></td>

            <td>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeRate(row.id)}
              >
                <FaTrashAlt size={14} />
              </button>
            </td>

            <td>
              {row.isVerified ? (
                <span className="badge bg-success px-3">✓ Verified</span>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => verifyRate(row.id)}
                >
                  Verify
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
          </div>
        </div>

  );
};

export default RateDetails;