import React, { useState, useMemo, useRef, useEffect } from "react";

const PremiumPopup = ({ show, onClose, risks , onAddAdditional= [] }) => {

    const exchangeRate = 3.75;
    const riskRefs = useRef({});
    const [riskList, setRiskList] = useState([]);

    useEffect(() => {
        console.log("risks",risks)
        if (risks?.length) {
            const mapped = risks.map(r => ({
                id: r.id,
                material: r.materialName || r.materialCategory,
                incoTerm: "FOB",
                incoRate: 20,
                sumInsured: 100,
                marineRate: r.marineRate || 0,
                warRate: r.warRate || 0,
                overage: "No",
                transhipment: "No",
                deductible: r.deductible || 0,
                
            }));
    console.log("mapped",mapped)
            setRiskList(mapped);
        }
    }, [risks]);

    const scrollToRisk = (id) => {
        riskRefs.current[id]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const calculateRisk = (risk) => {
        const overAgeRate = risk.overage === "Yes" ? 10 : 0;
        const transshipRate = risk.transhipment === "Yes" ? 5 : 0;

        const totalRate =
            Number(risk.marineRate || 0) +
            Number(risk.warRate || 0) +
            overAgeRate +
            transshipRate +
            Number(risk.deductible || 0);

        const premiumFC = (totalRate * Number(risk.sumInsured || 0)) / 100;
        const premiumSAR = premiumFC * exchangeRate;

        return { premiumFC, premiumSAR, overAgeRate, transshipRate };
    };

    const grandTotal = useMemo(() => {
        let totalFC = 0;
        let totalSAR = 0;

        riskList.forEach((risk) => {
            const calc = calculateRisk(risk);
            totalFC += calc.premiumFC;
            totalSAR += calc.premiumSAR;
        });

        return { totalFC, totalSAR };
    }, [riskList]);

    const updateRisk = (index, field, value) => {
        const updated = [...riskList];
        updated[index][field] = value;
        setRiskList(updated);
    };

    //if (!show) return null;

    return (
        <>
        <div className="card mt-4 shadow-sm border-0 rounded-3">
            <div className="modal-content">

                {/* <div className="modal-header">
                    <h5 className="modal-title"></h5>
                </div> */}
<div className="card-header bg-primary bg-opacity-10 border-bottom d-flex justify-content-between align-items-center py-3 px-4 shadow-sm rounded-top">

  {/* Left Section */}
  <div className="d-flex align-items-center">
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
      Premium Details
    </h5>
  </div>

  {/* Right Section Button */}
  <button
    type="button"
    className="btn btn-primary btn-sm px-3 rounded-pill"
    onClick={() => onAddAdditional?.("CurrencySumInsured")}
  >
    Add Additional Details (Optional)
  </button>

</div>
                <div className="modal-body p-0">
                            <div className="row g-0">

                                {/* LEFT */}
                                <div className="col-md-8 p-4 border-end bg-light">
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label">Currency *</label>
                                            <select className="form-select">
                                                <option>DOLLAR $</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Exchange Rate (SAR) *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={exchangeRate}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {riskList.map((risk, index) => {
                                        const calc = calculateRisk(risk);

                                        return (
                                            <div
                                                key={risk.id}
                                                ref={(el) => (riskRefs.current[risk.id] = el)}
                                                className="card shadow-sm mb-4"
                                            >
                                                <div
                                                    className="card-header text-white"
                                                    style={{ backgroundColor: "rgb(13, 75, 131)" }}
                                                >
                                                    {risk.material}
                                                </div>

                                                <div className="card-body">

                                                    {/* INCO TERM */}
                                                    <div className="row mb-3">
                                                        <div className="col-md-4">
                                                            <label className="form-label">Inco Term</label>
                                                            <select
                                                                className="form-select"
                                                                value={risk.incoTerm}
                                                                onChange={(e) =>
                                                                    updateRisk(index, "incoTerm", e.target.value)
                                                                }
                                                            >
                                                                <option>FOB</option>
                                                                <option>CIF</option>
                                                                <option>EXW</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="form-label">IncoTerm Rate</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    value={risk.incoRate}
                                                                    onChange={(e) =>
                                                                        updateRisk(index, "incoRate", e.target.value)
                                                                    }
                                                                />
                                                                <span className="input-group-text">%</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 d-flex align-items-end">
                                                            <strong>{risk.incoRate}%</strong>
                                                        </div>
                                                    </div>

                                                    {/* OVERAGE + TRANSHIP */}
                                                    <div className="row mb-4">
                                                        <div className="col-md-6">
                                                            <label className="form-label fw-semibold text-secondary mb-2">
                                                                Overage
                                                            </label>
                                                            <div className="d-flex gap-3">
                                                                <div className="form-check form-check-inline modern-radio">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        id={`overage-yes-${index}`}
                                                                        checked={risk.overage === "Yes"}
                                                                        onChange={() => updateRisk(index, "overage", "Yes")}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`overage-yes-${index}`}>
                                                                        Yes
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline modern-radio">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        id={`overage-no-${index}`}
                                                                        checked={risk.overage === "No"}
                                                                        onChange={() => updateRisk(index, "overage", "No")}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`overage-no-${index}`}>
                                                                        No
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="form-label fw-semibold text-secondary mb-2">
                                                                Transhipment
                                                            </label>
                                                            <div className="d-flex gap-3">
                                                                <div className="form-check form-check-inline modern-radio">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        id={`transhipment-yes-${index}`}
                                                                        checked={risk.transhipment === "Yes"}
                                                                        onChange={() => updateRisk(index, "transhipment", "Yes")}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`transhipment-yes-${index}`}>
                                                                        Yes
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline modern-radio">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        id={`transhipment-no-${index}`}
                                                                        checked={risk.transhipment === "No"}
                                                                        onChange={() => updateRisk(index, "transhipment", "No")}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`transhipment-no-${index}`}>
                                                                        No
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* RATES + FINANCIAL */}
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="border rounded p-3 bg-light">
                                                                <h6 className="fw-bold">Rates:</h6>
                                                                <div className="d-flex justify-content-between">
                                                                    <span>Marine Rate</span>
                                                                    <span>{risk.marineRate}%</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <span>War Rate</span>
                                                                    <span>{risk.warRate}%</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <span>Overage Rate</span>
                                                                    <span>{calc.overAgeRate}%</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <span>Tranship Rate</span>
                                                                    <span>{calc.transshipRate}%</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <span>Deductible</span>
                                                                    <span>{calc?.deductible || 0}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="border rounded p-3 bg-success bg-opacity-10">
                                                                <h6 className="fw-bold">Financial:</h6>

                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <span>Sum Insured ($)</span>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control form-control-sm w-50 text-end"
                                                                        value={risk.sumInsured}
                                                                        onChange={(e) =>
                                                                            updateRisk(index, "sumInsured", e.target.value)
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className="d-flex justify-content-between mt-2">
                                                                    <span>Premium ($)</span>
                                                                    <span>{calc.premiumFC.toFixed(2)}</span>
                                                                </div>

                                                                <div className="d-flex justify-content-between">
                                                                    <span>Premium (SAR)</span>
                                                                    <span>{calc.premiumSAR.toFixed(2)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>

                                {/* RIGHT */}
                                <div className="col-md-4 p-4">

                                    <div className="card mb-4 shadow-sm">
                                        <div className="card-body">
                                            <h6 className="fw-bold">Grand Summary</h6>
                                            <div className="d-flex justify-content-between">
                                                <span>Total Premium ($)</span>
                                                <span>{grandTotal.totalFC.toFixed(2)} $</span>
                                            </div>
                                            <div className="d-flex justify-content-between fw-bold">
                                                <span>Total (SAR)</span>
                                                <span>{grandTotal.totalSAR.toFixed(2)} ريال</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h6 className="fw-bold">Experts</h6>
                                    {riskList.map((risk) => (
                                        <div
                                            key={risk.id}
                                            className="border rounded p-3 mb-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => scrollToRisk(risk.id)}
                                        >
                                            {risk.material}
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            {/* <button className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                            <button className="btn btn-primary">
                                Save Changes
                            </button> */}
                        </div>

                    </div>
                </div>



        </>
    );
    
};

export default PremiumPopup;