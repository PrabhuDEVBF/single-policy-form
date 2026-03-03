import React from "react";

export const CustomTextbox = ({
  ismandatory = false,
  className = "",
  label,
  name,
  value,
  onChange,
  maxLength,
  type = "text",
  disabled = false,
  placeholder = "",
  fullclassName = "",
  readOnly = false,
  onBlur,
  tooltip = "",
}) => {
  return (
    <div className={`relative w-full ${fullclassName}`}>
      <label htmlFor={name} className="form-label fw-semibold">
        {label} {ismandatory && <span className="star_ico">*</span>}
      </label>

      <div className="position-relative">
        {/* Input */}
        <input
          readOnly={readOnly}
          id={name}
          type={type}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          className={`form-control form-control-sm pr-5 ${className}`}
          style={{ paddingRight: "35px" }} // space for icon
        />

        {/* ⭐ Tooltip Icon INSIDE input box */}
        {tooltip && (
          <span className="tooltip-inside" data-tooltip={tooltip}>
            ?
          </span>
        )}
      </div>

      {/* CSS */}
      <style>{`
        .tooltip-inside   
        {  position: absolute;
           right: 10px;
           top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #ffffff;
            color: #115192;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: solid 1px #115293;
              }
        .tooltip-inside:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          right: 25px;
          top: 50%;
          transform: translateY(-50%);
          background: #b8f1ffff;
          color: #115293;
          padding: 6px 10px;
          border-radius: 6px;
          white-space: nowrap;
          font-size: 12px;
          z-index: 10;
        }

        .tooltip-inside:hover::before {
          content: "";
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: transparent transparent transparent #000;
        }
      `}</style>
    </div>
  );
};
