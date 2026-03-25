import React, { useState, useMemo, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaChartLine, FaMoneyBillWave, FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import { GetMasterDetails } from "../../../src/services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PremiumPopup = ({ formData, setFormData, show, onClose, risks, onAddAdditional, onRisksUpdate, existingRisks }) => {

  const exchangeRate = 3.75;
  const [riskList, setRiskList] = useState([]);
  const [activeRiskIndex, setActiveRiskIndex] = useState(0);
  const initialized = useRef(false);
  const [Currency, setCurrency] = useState([]);
  const [IncoTerm, setIncoTerm] = useState([]);
  useEffect(() => {
    const loadMasterData = async () => {
      const res = await GetMasterDetails({});
      setCurrency(res?.currency || []);
      setIncoTerm(res?.incoTerms || []);
    };

    loadMasterData();
  }, []);
  const uniqueCurrencies = [
    ...new Map(
      Currency.map((item) => [item.fCurrencyName_En, item])
    ).values(),
  ];

  // useEffect(() => {

  //   if (!show) {
  //     initialized.current = false;
  //     return;
  //   }

  //   if (initialized.current) return;

  //   if (risks?.length) {

  //     const mapped = risks.map((r) => {

  //       const old = existingRisks?.find(x => x.id === r.id);

  //       return {
  //         id: r.id,
  //         material: r.materialName ?? r.materialDesc ?? "-",
  //         incoTerm: old?.incoTerm || "",
  //         incoRate: old?.incoRate || 0,
  //         sumInsured: old?.sumInsured || "",
  //         marineRate: Number(r.marineRate) || 0,
  //         warRate: Number(r.warRate) || 0,
  //         overage: old?.overage || "No",
  //         overageRate: old?.overageRate || 0,
  //         transhipment: old?.transhipment || "No",
  //         transshipRate: old?.transshipRate || 0,
  //         deductible: r.deductible ?? r.deductable ?? 0,
  //         isCalculated: old?.isCalculated || false,
  //         modeOfTransportcode: r.modeOfTransport,
  //         rateCovercode: r.rateCover,
  //         materialCategorycode: r.materialCategory,
  //         voyageTypecode: r.voyageType,
  //         voyageTypelabel: r.voyageType
  //       };

  //     });

  //     setRiskList(mapped);
  //     setActiveRiskIndex(0);
  //     const defaultInco = IncoTerm.find(i => i.fIncoCode === mapped[0]?.incoTerm);

  //     if (defaultInco) {
  //       setFormData(prev => ({
  //         ...prev,
  //         IncoTermDesc: defaultInco.fIncoDesc,
  //         IncoTermRate: defaultInco.fRate
  //       }));
  //     }
  //     initialized.current = true;
  //   }

  // }, [show, risks, existingRisks]);


useEffect(() => {

  if (!show) {
    initialized.current = false;
    return;
  }

  if (initialized.current) return;
  if (!risks?.length) return;
  if (!IncoTerm.length) return;

  const mapped = risks.map((r) => {

    const old = existingRisks?.find(x => x.id === r.id);

    return {
      id: r.id,
      material: r.materialName ?? r.materialDesc ?? "-",
      incoTerm: old?.incoTerm || "",
      incoRate: old?.incoRate || 0,
      sumInsured: old?.sumInsured || "",
      marineRate: Number(r.marineRate) || 0,
      warRate: Number(r.warRate) || 0,
      overage: old?.overage || "No",
      overageRate: old?.overageRate || 0,
      transhipment: old?.transhipment || "No",
      transshipRate: old?.transshipRate || 0,
      deductible: r.deductible ?? r.deductable ?? 0,
      isCalculated: old?.isCalculated || false,
      modeOfTransportcode: r.modeOfTransport,
      rateCovercode: r.rateCover,
      materialCategorycode: r.materialCategory,
      voyageTypecode: r.voyageType,
      voyageTypelabel: r.voyageType
    };

  });

  setRiskList(mapped);
  setActiveRiskIndex(0);

  const defaultInco = IncoTerm.find(i => i.fIncoCode === mapped[0]?.incoTerm);

  if (defaultInco) {
    setFormData(prev => ({
      ...prev,
      IncoTermDesc: defaultInco.fIncoDesc,
      IncoTermRate: defaultInco.fRate
    }));
  }

  initialized.current = true;

}, [show, risks, existingRisks, IncoTerm]);

  
  // const calculateRisk = (risk) => {

  //   // const overAgeRate = risk.overage === "Yes" ? 10 : 0;
  //   // const transshipRate = risk.transhipment === "Yes" ? 5 : 0;

  //   const overAgeRate = risk.overage === "Yes" ? Number(risk.overageRate || 0) : 0;
  //   const transshipRate = risk.transhipment === "Yes" ? Number(risk.transshipRate || 0) : 0;

  //   const totalRate =
  //     Number(risk.marineRate || 0) +
  //     Number(risk.warRate || 0) +
  //     overAgeRate +
  //     transshipRate +
  //     Number(risk.deductible || 0);

  //   const premiumFC = (totalRate * Number(risk.sumInsured || 0)) / 100;
  //   const premiumSAR = premiumFC * exchangeRate;

  //   return { premiumFC, premiumSAR, overAgeRate, transshipRate };
  // };
  // // //
 
 const calculateRisk = (risk) => {

  const sumInsured = Number(risk.sumInsured || 0);

  const marineRate = Number(risk.marineRate || 0);
  const warRate = Number(risk.warRate || 0);

  const overAgeRate = risk.overage === "Yes"
    ? Number(risk.overageRate || 0)
    : 0;

  const transshipRate = risk.transhipment === "Yes"
    ? Number(risk.transshipRate || 0)
    : 0;

  const marinePremium = (sumInsured * marineRate) / 100;
  const warPremium = (sumInsured * warRate) / 100;
  const overagePremium = (sumInsured * overAgeRate) / 100;
  const transshipPremium = (sumInsured * transshipRate) / 100;

  const premiumFC =
    marinePremium +
    warPremium +
    overagePremium +
    transshipPremium;

  const premiumSAR = premiumFC * exchangeRate;

  return {
    marinePremium,
    warPremium,
    overagePremium,
    transshipPremium,
    premiumFC,
    premiumSAR
  };
};
 
  const deleteRisk = (index) => {
    setRiskList((prev) => {
      const updated = prev.filter((_, i) => i !== index);


      if (onRisksUpdate) {
        onRisksUpdate(updated);
      }

      return updated;
    });
  };
  // // //
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

    setRiskList((prev) => {

      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value
      };

      if (field === "sumInsured") {
        const amount = Number(value);
        updated[index].isCalculated = amount > 0;
      }

      onRisksUpdate?.(updated);

      return updated;
    });

  };

  if (!show) return null;

  const activeRisk = riskList[activeRiskIndex];

  const calc = activeRisk
    ? calculateRisk(activeRisk)
    : { premiumFC: 0, premiumSAR: 0, overAgeRate: 0, transshipRate: 0 };

  //SH
  const validateBeforeEdit = () => {

    if (!formData.Currency) {
      toast.warning("Please select Currency first");
      return false;
    }

    if (!activeRisk?.incoTerm) {
      toast.warning("Please select Inco Term first");
      return false;
    }

    return true;
  };


  const confirmDeleteRisk = (index) => {
    Swal.fire({
      title: "Delete Risk",
      text: "Are you sure you want to delete this risk from the premium calculation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRisk(index);

        Swal.fire({
          icon: "success",
          title: "Risk Deleted",
          text: "Risk deleted successfully",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // // /// /// 

  return (
    <>
      <div className="modal fade show d-block" style={{ zIndex: 1040 }}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content" >

            <div className="card border-0" style={{ padding: "10px", borderRadius: "18px" }}>



              <div className="card-header bg-primary bg-opacity-10 d-flex justify-content-between align-items-center">

                <h5 className="text-primary fw-semibold mb-0">Premium Details</h5>

                <div className="d-flex align-items-center gap-2">

                  <button
                    className="btn btn-primary btn-sm rounded-pill"
                    onClick={() => onAddAdditional?.("CurrencySumInsured")}
                  >
                    Add Additional Details
                  </button>
                  <button
                    onClick={onClose}
                    className="premium-close-btn"
                  >
                    <IoClose size={14} />
                  </button>

                </div>

              </div>

              <div className="modal-body">

                <div className="row">

                  <div className="col-md-8 border-end">

                    <div className="row mb-4">

                      <div className="col-md-6">
                        <label className="form-label">Currency</label>

                        <select
                          className="form-select"
                          value={formData.Currency || ""}
                          onChange={(e) => {
                            const selectedCode = e.target.value;

                            const selectedCurrency = uniqueCurrencies.find(
                              (c) => c.fCurrencyCode === selectedCode
                            );

                            setFormData({
                              ...formData,
                              Currency: selectedCode,
                              ExchangeRate: selectedCurrency?.fExchange_Rate || ""
                            });
                          }}
                        >
                          <option value="">Select Currency</option>

                          {uniqueCurrencies.map((item) => (
                            <option key={item.fCurrencyCode} value={item.fCurrencyCode}>
                              {item.fCurrencyName_En}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Exchange Rate</label>
                        <input className="form-control" value={formData.ExchangeRate || ""} disabled />
                      </div>

                    </div>

                    {activeRisk && (

                      <div className="card shadow-sm">

                        <div className="card-header text-white"
                          style={{ backgroundColor: "rgb(13,75,131)" }}>
                          {activeRisk.material}
                        </div>

                        <div className="card-body">

                          <div className="row mb-3">

                            <div className="col-md-4">
                              <label className="form-label">Inco Term</label>

                              <select
                                className="form-select"
                                value={activeRisk.incoTerm || ""}
                                onChange={(e) => {
                                  const selectedCode = e.target.value;

                                  const selectedItem = IncoTerm.find(
                                    (item) => item.fIncoCode === selectedCode
                                  );
                                  // update risk
                                  updateRisk(activeRiskIndex, "incoTerm", selectedCode);
                                  updateRisk(activeRiskIndex, "incoRate", selectedItem?.fRate || "");

                                  // update formData (for API payload)
                                  setFormData(prev => {
                                    const updated = {
                                      ...prev,
                                      IncoTermDesc: selectedItem?.fIncoDesc || "FOB",
                                      IncoTermRate: selectedItem?.fRate || ""
                                    };
                                    return updated;
                                  });
                                }}
                              >
                                <option value="">Select Inco Term</option>

                                {IncoTerm.map((item) => (
                                  <option key={item.fIncoCode} value={item.fIncoCode}>
                                    {item.fIncoDesc}
                                  </option>
                                ))}
                              </select>
                            </div>


                            <div className="col-md-4">
                              <label className="form-label">Inco Rate</label>

                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={activeRisk.incoRate || ""}
                                  disabled
                                  onChange={(e) => {
                                    const rate = e.target.value;

                                    updateRisk(activeRiskIndex, "incoRate", rate);

                                    setFormData((prev) => ({
                                      ...prev,
                                      IncoTermRate: rate
                                    }));
                                  }}
                                />

                                <span className="input-group-text">%</span>
                              </div>
                            </div>

                          </div>

                          <div className="row mb-4">

                            <div className="col-md-6">

                              <label className="fw-semibold">Overage</label>

                              <div className="d-flex gap-3">

                                <div className="form-check">
                                  <input
                                    type="radio"
                                    name={`overage-${activeRisk.id}`}
                                    checked={activeRisk.overage === "Yes"}
                                    onChange={() => {
                                      if (!validateBeforeEdit()) return;
                                      updateRisk(activeRiskIndex, "overage", "Yes");
                                    }}
                                  />
                                  <label className="ms-1">Yes</label>
                                </div>

                                <div className="form-check">
                                  <input
                                    type="radio"
                                    name={`overage-${activeRisk.id}`}
                                    checked={activeRisk.overage === "No"}
                                    onChange={() => {
                                      updateRisk(activeRiskIndex, "overage", "No");
                                    }}
                                  />
                                  <label className="ms-1">No</label>
                                </div>

                              </div>

                            </div>

                            <div className="col-md-6">

                              <label className="fw-semibold">Transhipment</label>

                              <div className="d-flex gap-3">

                                <div className="form-check">
                                  <input
                                    type="radio"
                                    name={`trans-${activeRisk.id}`}
                                    checked={activeRisk.transhipment === "Yes"}
                                    onChange={() => {
                                      if (!validateBeforeEdit()) return;
                                      updateRisk(activeRiskIndex, "transhipment", "Yes");
                                    }}
                                  />
                                  <label className="ms-1">Yes</label>
                                </div>

                                <div className="form-check">
                                  <input
                                    type="radio"
                                    name={`trans-${activeRisk.id}`}
                                    checked={activeRisk.transhipment === "No"}
                                    onChange={() => {
                                      updateRisk(activeRiskIndex, "transhipment", "No");
                                    }}
                                  />
                                  <label className="ms-1">No</label>
                                </div>

                              </div>

                            </div>

                          </div>

                          {/* RATES + FINANCIAL */}
                          <div className="row g-3">

                            <div className="col-md-6">

                              <div className="card shadow-sm border-0 h-100">

                                <div className="card-body">

                                  <h6 className="fw-semibold mb-3 d-flex align-items-center">
                                    <FaChartLine className="me-2 text-primary" />
                                    <span className="ms-2">Rates</span>
                                  </h6>

                                  {/* Marine Rate */}
<div className="d-flex justify-content-between align-items-center mb-2">
  <span className="text-muted">Marine Rate</span>

  <div className="d-flex align-items-center gap-2">

    <div className="input-group input-group-sm" style={{ width: "100px" }}>
      <input
        type="number"
        min="0"
        className="form-control text-end"
        value={activeRisk.marineRate}
        onChange={(e) => {
          if (!validateBeforeEdit()) return;
          updateRisk(activeRiskIndex, "marineRate", e.target.value);
        }}
      />
      <span className="input-group-text">%</span>
    </div>

    {/* Dummy Premium */}
    <span
      className="badge bg-success bg-opacity-10 text-success fw-semibold text-center"
      style={{ minWidth: "90px", display: "inline-block" }}
    >
      ${calc.marinePremium.toFixed(2)}
    </span>

  </div>
</div>

                                  {/* War Rate */}
<div className="d-flex justify-content-between align-items-center mb-2">
  <span className="text-muted">War Rate</span>

  <div className="d-flex align-items-center gap-2">

    <div className="input-group input-group-sm" style={{ width: "100px" }}>
      <input
        type="number"
        min="0"
        className="form-control text-end"
        value={activeRisk.warRate}
        onChange={(e) => {
          if (!validateBeforeEdit()) return;
          updateRisk(activeRiskIndex, "warRate", e.target.value);
        }}
      />
      <span className="input-group-text">%</span>
    </div>

    <span className="badge bg-success bg-opacity-10 text-success fw-semibold text-center"
    style={{ minWidth: "90px", display: "inline-block" }}>
${calc.warPremium.toFixed(2)}
    </span>

  </div>
</div>

                                  {/* Overage Rate */}
<div className="d-flex justify-content-between align-items-center mb-2">
  <span className="text-muted">Overage Rate</span>

  <div className="d-flex align-items-center gap-2">

    {activeRisk.overage === "Yes" ? (
      <div className="input-group input-group-sm" style={{ width: "100px" }}>
        <input
          type="number"
          min="0"
          className="form-control text-end"
          value={activeRisk.overageRate}
          onChange={(e) => {
            if (!validateBeforeEdit()) return;
            updateRisk(activeRiskIndex, "overageRate", e.target.value);
          }}
        />
        <span className="input-group-text">%</span>
      </div>
    ) : (
      <span className="badge bg-secondary bg-opacity-10 text-secondary">
        0%
      </span>
    )}

    <span className="badge bg-success bg-opacity-10 text-success fw-semibold text-center"
    style={{ minWidth: "90px", display: "inline-block" }}>
${calc.overagePremium.toFixed(2)}
    </span>

  </div>
</div>
                                  {/* Tranship Rate */}
<div className="d-flex justify-content-between align-items-center mb-2">
  <span className="text-muted">Tranship Rate</span>

  <div className="d-flex align-items-center gap-2">

    {activeRisk.transhipment === "Yes" ? (
      <div className="input-group input-group-sm" style={{ width: "100px" }}>
        <input
          type="number"
          min="0"
          className="form-control text-end"
          value={activeRisk.transshipRate}
          onChange={(e) => {
            if (!validateBeforeEdit()) return;
            updateRisk(activeRiskIndex, "transshipRate", e.target.value);
          }}
        />
        <span className="input-group-text">%</span>
      </div>
    ) : (
      <span className="badge bg-secondary bg-opacity-10 text-secondary">
        0%
      </span>
    )}

    <span className="badge bg-success bg-opacity-10 text-success fw-semibold text-center"
    style={{ minWidth: "90px", display: "inline-block" }}>
${calc.transshipPremium.toFixed(2)}
    </span>

  </div>
</div>
<div className="d-flex justify-content-between align-items-center mt-2">
  <span className="text-muted">Deductible</span>

  <div style={{ width: "200px" }} className="d-flex">
    <select
      className="form-select form-select-sm text-end"
      style={{ width: "100px" }}
      value={activeRisk.deductible || ""}
      onChange={(e) =>
        updateRisk(activeRiskIndex, "deductible", e.target.value)
      }
    >
      <option value="">Select</option>
      <option value="100">100</option>
      <option value="200">200</option>
      <option value="300">300</option>
    </select>
  </div>
</div>
                                </div>
                              </div>

                            </div>

                            <div className="col-md-6">

                              <div className="card shadow-sm border-0 h-100 bg-success bg-opacity-10">

                                <div className="card-body">

                                  <h6 className="fw-semibold mb-3 d-flex align-items-center">
                                    <FaMoneyBillWave className="me-2 text-success" />
                                    <span className="ms-2">Financial</span>
                                  </h6>

                                  <div className="mb-3">

                                    <label className="form-label text-muted">
                                      Sum Insured ($)
                                    </label>

                                    <input
                                      type="number"
                                      min="0"
                                      className="form-control text-end"
                                      value={activeRisk?.sumInsured || ""}
                                      onChange={(e) => {

                                        if (!validateBeforeEdit()) return;

                                        updateRisk(activeRiskIndex, "sumInsured", e.target.value);

                                      }}
                                    />

                                  </div>

                                  <div className="d-flex justify-content-between py-1">
                                    <span className="text-muted">Premium ($)</span>
                                    <span className="fw-semibold text-success">
                                      {calc.premiumFC.toFixed(2)}
                                    </span>
                                  </div>

                                  <div className="d-flex justify-content-between py-1">
                                    <span className="text-muted">Premium (SAR)</span>
                                    <span className="fw-semibold text-success">
                                      {calc.premiumSAR.toFixed(2)}
                                    </span>
                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                  <div className="col-md-4">

                    <div className="card mb-3 shadow-sm">
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

                    <h6 className="fw-bold">Risks</h6>

                    {riskList.map((risk, index) => {

                      const rCalc = calculateRisk(risk);

                      return (

                        <div
                          key={risk.id}
                          className={`border rounded p-3 mb-2 ${activeRiskIndex === index ? "risk-card-active" : ""}`} style={{ cursor: "pointer" }}
                          onClick={() => setActiveRiskIndex(index)}
                        >

                          <div className="d-flex justify-content-between align-items-center">

                            <div>

                              <div>{risk.material}</div>

                              {/* <small className="d-flex align-items-center gap-1">
                                {risk.isCalculated ? (
                                  <>
                                    <FaCheckCircle className="text-success" size={12} />
                                    <span className="text-success">Calculated</span>
                                  </>
                                ) : (
                                  <>
                                    <FaExclamationCircle className="text-warning" size={12} />
                                    <span className="text-warning">Pending</span>
                                  </>
                                )}
                              </small> */}

                              <small className="d-flex align-items-center gap-2">
                                {risk.isCalculated ? (
                                  <>
                                    <FaCheckCircle
                                      size={12}
                                      className={activeRiskIndex === index ? "text-white" : "text-success"}
                                    />

                                    <span className="badge rounded-pill bg-success text-white px-2 py-1">
                                      Calculated
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FaExclamationCircle
                                      size={12}
                                      className={activeRiskIndex === index ? "text-white" : "text-warning"}
                                    />

                                    <span className="badge rounded-pill bg-warning text-white">
                                      Pending
                                    </span>
                                  </>
                                )}
                              </small>

                            </div>

                            <div className="d-flex align-items-center gap-2">

                              <span className="fw-semibold">
                                ${rCalc.premiumFC.toFixed(2)}
                              </span>
                              {/* SH */}
                              <button
                                className="risk-delete-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDeleteRisk(index);
                                }}
                              >
                                <FaTrash size={12} />
                              </button>

                              {/* //// // /// // */}

                            </div>

                          </div>

                        </div>

                      );

                    })}

                    <div className="mt-4 d-flex justify-content-between">

                      {/* <button className="btn btn-secondary" onClick={onClose}>
                        Close
                      </button> */}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>


    </>
  );
};

export default PremiumPopup;