import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import AuthSidebar from "../../components/common/AuthSidebar";
import { useLoader } from "../../context/LoaderContext";
import { useLanguage } from "../../context/LanguageContext";

const OTPVerification = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const { lang, t: translations } = useLanguage();
  const t = translations.otp;
  const mobile = sessionStorage.getItem("tempMobile") || "0512345678";
  const role = sessionStorage.getItem("tempUserRole");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(150); // 2:30 in seconds

  useEffect(() => {
    if (!role) {
      navigate("/login");
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate, role]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      toast.error(
        lang === "ar"
          ? "الرجاء إدخال الرمز المكون من 4 أرقام"
          : "Please enter 4 digit code",
      );
      return;
    }

    // Dummy verify success
    sessionStorage.setItem("userRole", role);
    sessionStorage.removeItem("tempUserRole");

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const goBack = () => {
    sessionStorage.removeItem("tempUserRole");
    navigate("/login");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="container-fluid p-0 vh-100 overflow-hidden ltr">
      <div className="row g-0 h-100">
        {/* Left Side */}
        <AuthSidebar />

        {/* Right Side */}
        <div className="rtl log-box col-12 col-lg-6 d-flex flex-column justify-content-center position-relative px-4 px-md-5">
          <div className="position-absolute langy">
            <LanguageSwitcher />
          </div>

          <div className="w-100 mx-auto w-max-500px">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-secondary-blue me-3 w-4px h-35px"></div>
              <h2 className="mb-0 fw-bold">{t.title}</h2>
            </div>
            <p className="text-muted mb-3 fs-09rem">
              {t.description} <strong className="text-dark">{mobile}</strong>
            </p>

            <div className="auth-card pb-4 text-center position-relative pt-5 mt-5">
              {/* Icon overlay */}
              <div className="position-absolute top-0 start-50 translate-middle bg-white rounded-circle shadow d-flex align-items-center justify-content-center w-80px h-80px">
                <i className="fa-solid fa-mobile-screen-button text-orient fs-2"></i>
                <i
                  className="fa-solid fa-clock position-absolute text-secondary-blue bg-white rounded-circle fs-1rem"
                  style={{ bottom: "15px", right: "15px" }}
                ></i>
              </div>

              <p className="text-muted mt-3 mb-4 fs-085rem">
                {t.timer}{" "}
                <span className="text-danger ms-1">{formatTime(timeLeft)}</span>
              </p>

              <div className="d-flex justify-content-center mb-4 gap-3">
                {otp.map((data, index) => {
                  return (
                    <input
                      className="form-control text-center fw-bold fs-4 bg-light border-e2e8f0 w-50px h-60px br-8px"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>

              <p className="text-muted fs-085rem">
                {t.notReceived}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTimeLeft(150);
                  }}
                  className="text-secondary-blue text-decoration-none ms-1"
                >
                  {t.resend}
                </a>
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                type="button"
                onClick={goBack}
                className="btn btn-light rounded-pill px-4 py-2 border shadow-sm"
              >
                <i
                  className={`fa-solid fa-caret-${lang === "ar" ? "right ms-2" : "left me-2"}`}
                ></i>{" "}
                {t.back}
              </button>
              <button
                type="button"
                onClick={handleVerify}
                className="btn btn-primary-orient d-inline-flex align-items-center px-4 py-2"
              >
                {t.verify}{" "}
                <i
                  className={`fa-solid fa-caret-${lang === "ar" ? "left me-2" : "right ms-2"}`}
                ></i>
              </button>
            </div>
          </div>

          <div className="footy position-absolute bottom-0 start-0 end-0 text-center pb-3 text-muted fs-08rem">
            {t.copyright || "© Orient. All Rights Reserved 2026"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
