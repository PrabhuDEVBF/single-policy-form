import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import passico from "../../assets/Images/icons/password-reset.svg";
import shieldicon from "../../assets/Images/icons/securityShield.svg";

export default function MarineQuoteHeader({
  title,
  isprofilePage = false,
  Upbutton,
  Class = "",
  QuotationNo = "",
  subtitle = "",
  isback = false,
  handleback,
}) {
  const { auth } = useAuth();
  const { langData } = useLanguage();

  return (
    <div className={`main-bar-bg ${Class}`}>
      <div className="row align-items-center py-2">
        {/* LEFT SECTION */}
        <div className="col-sm-6 d-flex align-items-center gap-3">
          {isback && (
            <button
              type="button"
              onClick={handleback}
              className="btn bg-transparent border-0 p-2 d-flex align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Icon + Title */}
          <div className="d-flex align-items-center gap-2">
            <img src={shieldicon} alt="icon" className="w-6 h-6" />
            <h3
              className="text-lg font-bold italic m-0 progresstitle"
              style={{ fontWeight: 700 }}
            >
              ~ {title}
            </h3>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-sm-6 d-flex justify-content-end">
          {!isprofilePage ? (
            <div className="text-end">
              <div className="font-600 font-16">
                {subtitle || langData?.QuoteRequestNumber}
              </div>
              <div className="font-500">{QuotationNo}</div>
            </div>
          ) : (
            <button className="btn btn-light text-primary" onClick={Upbutton}>
              <div className="d-flex align-items-center">
                <img src={passico} alt="" width={23} className="me-2" />
                <span>Reset Password</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
