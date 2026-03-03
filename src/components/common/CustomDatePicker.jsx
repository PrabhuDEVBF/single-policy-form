import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export const CustomDatePicker = ({
  ismandatory = false,
  className = "",
  lang = "en",
  label,
  name,
  value,
  onChange,
  disabled = false,
  disabledDate = "",
  fullclassName = "",
  calendar = null,
  locale = null,
  minDate,
}) => {
  return (
    <div className={`relative w-full ${fullclassName}`}>
      <label htmlFor={name} className="form-label fw-semibold">
        {label} {ismandatory && <span className="star_ico">*</span>}
      </label>
      <div className="d-flex gap-2 align-items-center">
<DatePicker
  calendar={calendar}
  locale={locale}
  id={name}
  name={name}
  disabledDate={disabledDate}
  disabled={disabled}
  format="DD-MM-YYYY"
  className={`form-control form-control-sm ${className}`}
  value={value ? dayjs(value, "DD-MM-YYYY") : null}
  onChange={onChange}
  minDate={minDate}
  getPopupContainer={(trigger) => trigger.parentElement}
/>
      </div>
    </div>
  );
};
