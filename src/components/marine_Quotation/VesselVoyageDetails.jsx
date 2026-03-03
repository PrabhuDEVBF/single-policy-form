import React from "react";
import { CustomTextbox } from "../../components/Common/CustomTextbox";
import { CustomDropDown } from "../../components/Common/CustomDropdown";
import { CustomDatePicker } from "../../components/Common/CustomDatePicker";

const VesselVoyageDetail = ({
  formData,
  setFormData,
  validationErrors = {},
  setValidationErrors,
    onAddAdditional,
}) => {

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (validationErrors[field] && setValidationErrors) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // 🔹 Dummy Dropdown Data
  const PerilOptions = [
    { label: "ICC A", value: "A" },
    { label: "ICC B", value: "B" },
  ];

  const BankOptions = [
    { label: "SABB", value: "SABB" },
    { label: "ENBD", value: "ENBD" },
  ];

  const CountryOptions = [
    { label: "Saudi Arabia", value: "SA" },
    { label: "UAE", value: "UAE" },
  ];

  const PortOptions = [
    { label: "Abu Dhabi", value: "AUH" },
    { label: "Sharjah", value: "SHJ" },
  ];

return (
  <>

    {/* ---------------- VESSEL DETAILS ---------------- */}
    <div className="card shadow-sm border-0 rounded-3">
      
<div className="card-header bg-primary bg-opacity-10 border-bottom d-flex justify-content-between align-items-center py-3 px-4 shadow-sm rounded-top">

  <div className="d-flex align-items-center">
    <div
      className="me-2 bg-primary rounded"
      style={{ width: "4px", height: "24px" }}
    ></div>

    <h5 className="mb-0 fw-semibold text-primary">
      Vessel Details
    </h5>
  </div>

  <button
    type="button"
    className="btn btn-primary btn-sm px-3 rounded-pill"
    onClick={() => onAddAdditional?.("VESSEL")}
  >
    Add Additional Details (Optional)
    
  </button>

</div>


      <div className="card-body">
        <div className="row">

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="Peril Code"
              value={formData?.PerilCode}
              onChange={(v) => handleChange("PerilCode", v)}
              options={PerilOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="Bank"
              value={formData?.Bank}
              onChange={(v) => handleChange("Bank", v)}
              options={BankOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="Vessel Name"
              value={formData?.VesselName}
              onChange={(e) =>
                handleChange("VesselName", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="LC Number"
              value={formData?.LCNumber}
              onChange={(e) =>
                handleChange("LCNumber", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDatePicker
              fullclassName="mb-3"
              label="LC Date"
              value={formData?.LCDate}
              onChange={(date) =>
                handleChange("LCDate", date)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="IMO Number"
              value={formData?.IMONumber}
              onChange={(e) =>
                handleChange("IMONumber", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="Bill Number"
              value={formData?.BillNumber}
              onChange={(e) =>
                handleChange("BillNumber", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="Purchase Order Number"
              value={formData?.PurchaseOrderNumber}
              onChange={(e) =>
                handleChange("PurchaseOrderNumber", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDatePicker
              fullclassName="mb-3"
              label="Bill Date"
              value={formData?.BillDate}
              onChange={(date) =>
                handleChange("BillDate", date)
              }
              ismandatory
            />
          </div>

        </div>
      </div>
    </div>


    {/* ---------------- VOYAGE DETAILS ---------------- */}
    <div className="card mt-4 shadow-sm border-0 rounded-3">

<div className="card-header bg-primary bg-opacity-10 border-bottom d-flex justify-content-between align-items-center py-3 px-4 shadow-sm rounded-top">

  <div className="d-flex align-items-center">
    <div
      className="me-2 bg-primary rounded"
      style={{ width: "4px", height: "24px" }}
    ></div>

    <h5 className="mb-0 fw-semibold text-primary">
      Voyage Details
    </h5>
  </div>

  <button
    type="button"
    className="btn btn-primary btn-sm px-3 rounded-pill"
    onClick={() => onAddAdditional?.("VOYAGE")}
  >
    Add Additional Details (Optional)
  </button>

</div>
      <div className="card-body form-section">
        <div className="row">

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="Voyage Number"
              value={formData?.VoyageNumber}
              onChange={(e) =>
                handleChange("VoyageNumber", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="Voyage Description"
              value={formData?.VoyageDescription}
              onChange={(e) =>
                handleChange("VoyageDescription", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDatePicker
              fullclassName="mb-3"
              label="Date of Shipment"
              value={formData?.DateofShipment}
              onChange={(date) =>
                handleChange("DateofShipment", date)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="Transhipment At"
              value={formData?.TranshipmentAt}
              onChange={(e) =>
                handleChange("TranshipmentAt", e.target.value)
              }
              ismandatory
            />
          </div>


          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="From Country"
              value={formData?.FromCountry}
              onChange={(v) => handleChange("FromCountry", v)}
              options={CountryOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="Via Country"
              value={formData?.ViaCountry}
              onChange={(v) => handleChange("ViaCountry", v)}
              options={CountryOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="To Country"
              value={formData?.ToCountry}
              onChange={(v) => handleChange("ToCountry", v)}
              options={CountryOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="From Port"
              value={formData?.FromPort}
              onChange={(v) => handleChange("FromPort", v)}
              options={PortOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="Via Port"
              value={formData?.ViaPort}
              onChange={(v) => handleChange("ViaPort", v)}
              options={PortOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomDropDown
              fullclassName="mb-3"
              label="To Port"
              value={formData?.ToPort}
              onChange={(v) => handleChange("ToPort", v)}
              options={PortOptions}
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="From Location"
              value={formData?.FromLocation}
              onChange={(e) =>
                handleChange("FromLocation", e.target.value)
              }
              ismandatory
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <CustomTextbox
              fullclassName="mb-3"
              label="To Location"
              value={formData?.ToLocation}
              onChange={(e) =>
                handleChange("ToLocation", e.target.value)
              }
              ismandatory
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <CustomDatePicker
              fullclassName="mb-3"
              label="Transhipped Date"
              value={formData?.TranshippedDate}
              onChange={(date) =>
                handleChange("TranshippedDate", date)
              }
              ismandatory
            />
          </div>
        </div>
      </div>
    </div>

  </>
);
};

export default VesselVoyageDetail;