import React, { useEffect } from "react";
// import { FloatingSelect } from "../FloatingSelect";
// import { FloatingDatePicker } from "../FloatingDatePicker";
import { useLanguage } from "../../context/LanguageContext";
import { CustomTextbox } from "../../components/Common/CustomTextbox";
import { CustomDropDown } from "../../components/Common/CustomDropdown";
import { CustomDatePicker } from "../../components/Common/CustomDatePicker";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const PolicyDetail = ({
  formData,
  setFormData,
  validationErrors = {},
  setValidationErrors,
    onAddAdditional,
}) => {
  const { language, langData } = useLanguage();

const handleChange = (field, value, label) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
    ...(label && { [`${field}Label`]: label }),
  }));

  if (validationErrors[field] && setValidationErrors) {
    setValidationErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  }
};

useEffect(() => {

  const {
    issueDate,
    inceptionDate,
    period,
    periodNumber,
    expiryDate,
  } = formData;

  /* 1️⃣ Default Issue Date */
  if (!issueDate) {
    setFormData((prev) => ({
      ...prev,
      issueDate: dayjs().format("DD-MM-YYYY"),
    }));
    return;
  }

  /* 2️⃣ Validate Inception > Issue */
  if (issueDate && inceptionDate) {
    const issue = dayjs(issueDate, "DD-MM-YYYY", true);
    const inception = dayjs(inceptionDate, "DD-MM-YYYY", true);

    if (
      inception.isSame(issue, "day") ||
      inception.isBefore(issue, "day")
    ) {
      toast.error("Inception Date must be after Issue Date");

      setFormData((prev) => ({
        ...prev,
        inceptionDate: null,
        expiryDate: null,
      }));

      return;
    }
  }

  /* 3️⃣ Expiry Calculation */
  if (
    inceptionDate &&
    period?.value &&
    periodNumber &&
    Number(periodNumber) > 0
  ) {
    const start = dayjs(inceptionDate, "DD-MM-YYYY", true);
    if (!start.isValid()) return;

    const value = Number(periodNumber);
    let expiry;

    switch (period.value) {
      case "Y":
        expiry = start.add(value, "year");
        break;

      case "M":
        expiry = start.add(value, "month");
        break;

      case "W":
        expiry = start.add(value, "week");
        break;

      case "D":
        expiry = start.add(value, "day");
        break;

      default:
        return;
    }

    const calculatedExpiry = expiry
      .subtract(1, "day")
      .format("DD-MM-YYYY");

    if (expiryDate !== calculatedExpiry) {
      setFormData((prev) => ({
        ...prev,
        expiryDate: calculatedExpiry,
      }));
    }
  }

}, [
  formData.issueDate,
  formData.inceptionDate,
  formData.period,
  formData.periodNumber,
]);

  const ProductOptions = [
    { value: "CARGO", labeleng: "Marine Cargo" },
    { value: "HULL", labeleng: "Marine Hull" },
  ];
const PeriodOptions = [
  { value: "Y", labeleng: "Year" },
  { value: "M", labeleng: "Month" },
  { value: "W", labeleng: "Week" },
  { value: "D", labeleng: "Day" },
];

  const NumberOptions = [
    { value: "1", labeleng: "1" },
    { value: "2", labeleng: "2" },
    { value: "3", labeleng: "3" },
  ];

return (
  <div className="motor-relative">

    <div className="card shadow-sm rounded-3 border-0">

      {/* Header */}
<div className="card-header bg-primary bg-opacity-10 border-bottom d-flex justify-content-between align-items-center py-3 px-4 shadow-sm rounded-top">
  
  <div className="d-flex align-items-center">
    <div
      className="me-2 bg-primary rounded"
      style={{ width: "4px", height: "24px" }}
    ></div>

    <h5 className="mb-0 fw-semibold text-primary">
      {langData?.PolicyDetails || "Policy Details"}
    </h5>
  </div>

<button
  type="button"
  className="btn btn-primary btn-sm px-3 rounded-pill"
  onClick={() => onAddAdditional?.("TabOne")}
>
  Add Additional Details (Optional)
</button>

</div>

      {/* Body */}
      <div className="card-body px-4 py-4 form-section">
<div className="row">

  {/* Product */}
  <div className="col-lg-3 col-md-6" data-field="product">
    <CustomDropDown
      fullclassName="mb-3"
      ismandatory
      isInvalid={validationErrors.product}
      label="Product"
      value={formData.product}
      onChange={(val) => handleChange("product", val)}
      options={ProductOptions.map((item) => ({
        label: item.labeleng,
        value: item.value,
      }))}
    />
  </div>

  {/* Issue Date */}
  <div className="col-lg-3 col-md-6" data-field="issueDate">
    <CustomDatePicker
      fullclassName="mb-3"
      ismandatory
      isInvalid={validationErrors.issueDate}
      label="Issue Date"
      minDate={dayjs()}
      value={
        formData.issueDate
          ? dayjs(formData.issueDate, "DD-MM-YYYY")
          : null
      }
      onChange={(date) =>
        handleChange(
          "issueDate",
          date ? date.format("DD-MM-YYYY") : null
        )
      }
    />
  </div>

  {/* Period of Insurance */}
  <div className="col-lg-3 col-md-6" data-field="period">
    <CustomDropDown
      fullclassName="mb-3"
      ismandatory
      isInvalid={validationErrors.period}
      label="Period of Insurance"
      value={formData.period}
      onChange={(val) => handleChange("period", val)}
      options={PeriodOptions.map((item) => ({
        label: item.labeleng,
        value: item.value,
      }))}
    />
  </div>

  {/* Period Number */}
  <div className="col-lg-3 col-md-6" data-field="periodNumber">
    <CustomTextbox
      fullclassName="mb-3"
      ismandatory
      isInvalid={validationErrors.periodNumber}
      disabled={!formData.period}
      label="Periods Of Number"
      type="number"
      min="1"
      value={formData.periodNumber || ""}
      onChange={(e) =>
        handleChange("periodNumber", e.target.value)
      }
    />
  </div>

  {/* Inception Date */}
  <div className="col-lg-3 col-md-6" data-field="inceptionDate">
    <CustomDatePicker
      fullclassName="mb-3"
      ismandatory
      isInvalid={validationErrors.inceptionDate}
      label="Inception Date"
      value={
        formData.inceptionDate
          ? dayjs(formData.inceptionDate, "DD-MM-YYYY")
          : null
      }
      onChange={(date) =>
        handleChange(
          "inceptionDate",
          date ? date.format("DD-MM-YYYY") : null
        )
      }
    />
  </div>

  {/* Expiry Date */}
  <div className="col-lg-3 col-md-6" data-field="expiryDate">
    <CustomDatePicker
      fullclassName="mb-3"
      ismandatory
      isInvalid={validationErrors.expiryDate}
      disabled
      label="Expiry Date"
      value={
        formData.expiryDate
          ? dayjs(formData.expiryDate, "DD-MM-YYYY")
          : null
      }
    />
  </div>

</div>
      </div>

    </div>
  </div>
);
};

export default PolicyDetail;