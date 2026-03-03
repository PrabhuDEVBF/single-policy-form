import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useLanguage } from "../../context/LanguageContext";
import { useLoader } from "../../context/LoaderContext";

import logo from "../../assets/img/logo.png";
import watermarkBg from "../../assets/img/login-policy-watermark.png";
import curveBg from "../../assets/img/login-policy-curv.png";

const PolicyLogin = () => {
  const { type } = useParams(); // 'single' or 'open'
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const { lang, t: translations } = useLanguage();
  const t = translations.policyLogin;
  const tLogin = translations.login;

  const isSingle = type === "single";
  const title = isSingle ? t.singleTitle : t.openTitle;

  const [form, setForm] = useState({
    crNumber: "",
    mobile: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { crNumber, mobile, agree } = form;

    if (!crNumber || !mobile) {
      toast.error(t.fillFieldsError);
      return;
    }

    if (!/^\d{10}$/.test(crNumber)) {
      toast.error(t.invalidCrError);
      return;
    }

    if (!/^05\d{8}$/.test(mobile)) {
      toast.error(t.invalidMobileError);
      return;
    }

    if (!agree) {
      toast.error(t.acceptTermsError);
      return;
    }

    setIsLoading(true);

    // Mock Navigation Logic
    setTimeout(() => {
      setIsLoading(false);
      toast.success(t.loginSuccess);
      // Navigate somewhere as a mock for now
      navigate("/MaineQuotation")
    }, 1000);
  };

  return (
    <div className="container-fluid p-0 vh-100 overflow-hidden ltr bg-orient position-relative">
      {/* Background Images */}
      <div className="position-absolute pl-langy z-2 ltr d-flex align-items-center gap-3">
        <button
          type="button"
          className="d-none btn btn-light shadow-sm rounded-circle d-flex align-items-center justify-content-center bg-white border-0"
          style={{ width: "40px", height: "40px" }}
          onClick={() => navigate("/dashboard")}
          title={lang === "ar" ? "الصفحة الرئيسية" : "Home"}
        >
          <i className="fa-solid fa-house text-orient"></i>
        </button>
        <LanguageSwitcher />
      </div>
      <img src={watermarkBg} alt="watermark" className="lp-wmark" />
      <img src={curveBg} alt="curve" className="lp-curve" />

      <div className="row g-0 h-100 position-relative z-1">
        {/* Left Side Branding */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-5">
          <div className="position-absolute top-0 start-0 p-4">
            <img src={logo} alt="logo" height={55} />
          </div>

          <div className="no-show-mob text-white mt-5 pt-5 px-lg-4 z-1">
            <h2 className="display-4 fw-normal mb-0 text-info">Orient</h2>
            <h1 className="display-3 fw-bold mb-4">{title}</h1>
            <p className="fs-6 fw-light opacity-75 pe-lg-5">
              {tLogin.description}
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="rtl log-box col-12 col-lg-6 d-flex align-items-center justify-content-center ">
          <div
            className="bg-white rounded-1 shadow-lg position-relative d-flex flex-column justify-content-between p-4 p-md-5"
            style={{ width: "90%", maxWidth: "480px" }}
          >
            {/* Top Border */}
            <div
              className="position-absolute top-0 start-0 w-100 bg-secondary-blue"
              style={{
                height: "6px",
                borderTopLeftRadius: "0.25rem",
                borderTopRightRadius: "0.25rem",
              }}
            ></div>

            <div className="mb-4">
              <button
                type="button"
                className="btn btn-link text-muted p-0 text-decoration-none mb-3 d-inline-flex align-items-center gap-2 fs-09rem fw-medium"
                onClick={() => navigate("/dashboard")}
              >
                <i
                  className={`fa-solid fa-arrow-${lang === "ar" ? "right" : "left"}`}
                ></i>
                {lang === "ar" ? "رجوع إلى لوحة القيادة" : "Back to Dashboard"}
              </button>
              <h3 className="mb-2 fw-semibold text-orient">{title}</h3>
              <p className="text-muted mb-0 fs-09rem">{t.desc}</p>
            </div>

            <form onSubmit={handleSubmit} className="pb-2">
              <div className="mb-3">
                <label className="form-label text-orient fw-semibold fs-09rem">
                  {t.crNumber}
                </label>
                <input
                  type="text"
                  name="crNumber"
                  maxLength={10}
                  className="form-control text-muted"
                  placeholder={t.crPlaceholder}
                  value={form.crNumber}
                  onChange={handleChange}
                />
                <div className="form-text fs-07rem mt-2 text-muted-light">
                  {t.crHint}
                </div>
              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-orient fw-semibold fs-09rem">
                  {t.mobile}
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control text-muted"
                  maxLength={10}
                  placeholder={t.mobilePlaceholder}
                  value={form.mobile}
                  onChange={handleChange}
                />
                <div className="form-text fs-07rem mt-2 text-muted-light">
                  {t.mobileHint}
                </div>
              </div>

              <div className="mb-4 form-check d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input mt-0 border-secondary"
                  id="agreeTerms"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  style={{ width: "1.2rem", height: "1.2rem" }}
                />
                <label
                  className="form-check-label fs-08rem text-muted"
                  htmlFor="agreeTerms"
                >
                  {t.agreeTerms}{" "}
                  <a
                    href="#"
                    className="text-secondary-blue text-decoration-none"
                  >
                    {t.terms}
                  </a>{" "}
                  {t.ofProgram}
                </label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary-orient d-inline-block w-100 py-2 fs-09rem fw-semibold"
                >
                  {t.submit}
                </button>
              </div>
            </form>

            <div className="text-center mt-4 text-muted fs-075rem">
              <div>{t.copyright}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLogin;
