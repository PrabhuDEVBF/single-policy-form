import React from "react";
import { CustomDropDown } from "../../components/Common/CustomDropdown";
import { CustomTextbox } from "../../components/Common/CustomTextbox";
import { CustomDatePicker } from "../../components/Common/CustomDatePicker";

const AdditionalFieldsPopup = ({
  open,
  onClose,
  activeTab,
  formData,
  setFormData,
}) => {
  if (!open) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const natureOfRiskOptions = [
    { label: "Select", value: "" },
    { label: "Fire", value: "FIRE" },
    { label: "Marine Transit", value: "MARINE" },
    { label: "General Cargo", value: "CARGO" },
  ];

  return (
<div className="modal fade show d-block modal-backdrop-blur">
        <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content rounded-4 shadow-lg border-0">

          {/* Header */}
          <div className="modal-header border-0">
            <h5 className="modal-title fw-semibold">
              Additional Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          {/* Body */}
          <div className="modal-body form-section">
            <div className="row">

              {/* ================= TAB ONE ================= */}
{activeTab === "TabOne" && (
  <>
    <div className="col-lg-3 col-md-6">
      <CustomDropDown
        fullclassName="mb-3"
        label="Nature of Risk"
        value={formData.NatureofRisk}
        onChange={(val) =>
          setFormData((prev) => ({
            ...prev,
            NatureofRisk: val,
          }))
        }
        options={natureOfRiskOptions}
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomDropDown
        fullclassName="mb-3"
        label="Scope of Cover"
        value={formData.ScopeofCover}
        onChange={(val) =>
          setFormData((prev) => ({
            ...prev,
            ScopeofCover: val,
          }))
        }
        options={[
          { label: "Select", value: "0" },
          { label: "Full Cover", value: "full" },
          { label: "Partial Cover", value: "partial" },
        ]}
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Nature of Risk Description"
        value={formData.NatureofRiskDescription}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            NatureofRiskDescription: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Scope of Cover Description"
        value={formData.ScopeofCoverDescription}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            ScopeofCoverDescription: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Territorial Limits"
        value={formData.TerritorialLimits}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            TerritorialLimits: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Jurisdiction"
        value={formData.Jurisdiction}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            Jurisdiction: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Loss History"
        value={formData.LossHistory}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            LossHistory: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Business Activity"
        value={formData.BusinessActivity}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            BusinessActivity: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Remarks"
        value={formData.Remarks}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            Remarks: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Pay Terms"
        value={formData.PayTerms}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            PayTerms: e.target.value,
          }))
        }
      />
    </div>
  </>
)}

              {/* ================= VESSEL ================= */}
              {activeTab === "VESSEL" && (
                <>
<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="B/L AW Bill Number"
    value={formData.BLAWBillNumber}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        BLAWBillNumber: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomDatePicker
    fullclassName="mb-3"
    label="B/L AW Bill Date"
    value={formData.BLAWBillDate}
    onChange={(date) =>
      setFormData((prev) => ({
        ...prev,
        BLAWBillDate: date,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Supplier Description"
    value={formData.SupplierDescription}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        SupplierDescription: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Conveyance Type"
    value={formData.ConveyanceType}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        ConveyanceType: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Desc-Conv Type"
    value={formData.DescConvTyp}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        DescConvTyp: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Appr Vessel(Y/N)"
    value={formData.ApprVessel}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        ApprVessel: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Desc vessnm"
    value={formData.Descvessnm}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Descvessnm: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Vessel Arrived(Y/N)"
    value={formData.VesselArrived}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        VesselArrived: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Survey Agent"
    value={formData.SurveyAgent}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        SurveyAgent: e.target.value,
      }))
    }
  />
</div>

<div className="col-lg-3 col-md-6">
  <CustomTextbox
    fullclassName="mb-3"
    label="Settling Agent"
    value={formData.SettlingAgent}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        SettlingAgent: e.target.value,
      }))
    }
  />
</div>
                </>
              )}

              {/* ================= VOYAGE ================= */}
              {activeTab === "VOYAGE" && (
                <>
{/* Storage */}
<div className="col-lg-3 col-md-6">
  <CustomDropDown
    fullclassName="mb-3"
    label="Storage"
    value={
      [
        { label: "Yes", value: "Y" },
        { label: "No", value: "N" },
      ].find((o) => o.value === formData.Storage) || null
    }
    onChange={(opt) => {
      setFormData((prev) => ({
        ...prev,
        Storage: opt?.value,
        ...(opt?.value === "N" && {
          StoragePeriod: "",
          StoragePeriodUnit: "",
        }),
      }));
    }}
    options={[
      { label: "Yes", value: "Y" },
      { label: "No", value: "N" },
    ]}
  />
</div>

{formData.Storage === "Y" && (
  <>
    {/* Storage Period Of Day */}
    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        type="number"
        label="Storage Period Of Day"
        value={formData.StoragePeriod}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            StoragePeriod: e.target.value,
          }))
        }
      />
    </div>
  </>
)}

{/* Sailing Date */}
<div className="col-lg-3 col-md-6">
  <CustomDatePicker
    fullclassName="mb-3"
    label="Sailing Date"
    value={formData.SailingDate}
    onChange={(date) =>
      setFormData((prev) => ({
        ...prev,
        SailingDate: date,
      }))
    }
  />
</div>
                </>
              )}
{/* ================= Currency ================= */}
{activeTab === "CurrencySumInsured" && (
  <>
    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Inco Sum Ins"
        value={formData.IncoSumIns}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            IncoSumIns: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Total Premium"
        value={formData.TotalPremium}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            TotalPremium: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Basis of Valuation"
        value={formData.BasisofValuation}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            BasisofValuation: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Invoice Value"
        value={formData.InvoiceValue}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            InvoiceValue: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Value %"
        value={formData.Value}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            Value: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="SI CURR CODE"
        value={formData.SICURRCODE}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            SICURRCODE: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="PREM CURR CODE"
        value={formData.PREMCURRCODE}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            PREMCURRCODE: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="LC"
        value={formData.LC}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            LC: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="FC"
        value={formData.FC}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            FC: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Estimated Annual Transit"
        value={formData.ExtimatedAnnualTransit}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            ExtimatedAnnualTransit: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Limit Per Transit"
        value={formData.LimitPerTransit}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            LimitPerTransit: e.target.value,
          }))
        }
      />
    </div>

    <div className="col-lg-3 col-md-6">
      <CustomTextbox
        fullclassName="mb-3"
        label="Location"
        value={formData.Location}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            Location: e.target.value,
          }))
        }
      />
    </div>
  </>
)}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-0">
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={onClose}
            >
              Save & Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdditionalFieldsPopup;