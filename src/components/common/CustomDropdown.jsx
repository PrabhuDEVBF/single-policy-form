import React from "react";
import Select from "react-select";

export const CustomDropDown = ({
  ismandatory = false,
  className = "",
  lang = "en",
  label,
  name,
  value,
  onChange,
  disabled = false,
  options = [],
  fullclassName = "",
  onBlur,
}) => {
  return (
    <div className={`relative w-full ${fullclassName}`}>
      <label htmlFor={name} className="form-label fw-semibold">
        {label} {ismandatory && <span className="star_ico">*</span>}
      </label>
      <div className="d-flex gap-2 align-items-center">
        <Select
          id={name}
          name={name}
          className={`w-100 ${className}`}
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
