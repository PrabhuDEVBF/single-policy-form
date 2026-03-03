import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dummyUsers from "../../data/dummyUser.json";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import AuthSidebar from "../../components/common/AuthSidebar";
import { useLoader } from "../../context/LoaderContext";
import { useLanguage } from "../../context/LanguageContext";
import md5 from "md5";
import { GetLogin } from "../../services/api";
const Login = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const { lang, t: translations } = useLanguage();
  const t = translations.login;

  const [form, setForm] = useState({
    username: "",
    password: "",
    mobile: "",
    captcha: "",
  });

  const generateCaptcha = () =>
    Math.floor(100000 + Math.random() * 900000).toString();
  const [captchaValue, setCaptchaValue] = useState(generateCaptcha());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Dummy login
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, mobile, captcha } = form;

    if (!username || !password || !mobile || !captcha) {
      toast.error(
        lang === "ar" ? "يرجى ملء جميع الحقول" : "Please fill all fields",
      );
      return;
    }

    if (!/^05\d{8}$/.test(mobile)) {
      toast.error(
        lang === "ar"
          ? "رقم الجوال غير صالح"
          : "Invalid mobile number. Must start with 05 and be 10 digits.",
      );
      return;
    }

    if (captcha !== captchaValue) {
      toast.error(lang === "ar" ? "رمز التحقق غير صحيح" : "Invalid Captcha");
      return;
    }

    setIsLoading(true);

    // Mock Auth Logic
    const user = dummyUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase(),
    );

    if (user) {
      sessionStorage.setItem("tempUserRole", user.role); // Store temp until OTP verified
      sessionStorage.setItem("tempMobile", mobile);
      toast.success(
        lang === "ar"
          ? "نجاح تسجيل الدخول"
          : "Login Success! Redirecting to OTP...",
      );
      setTimeout(() => {
        setIsLoading(false);
        navigate("/otp");
      }, 1000);
    } else {
      setIsLoading(false);
      toast.error(
        lang === "ar"
          ? "بيانات الاعتماد غير صالحة"
          : 'Invalid credentials. Use "agent" or "underwriter".',
      );
    }
  };

//Api wise login
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const { username, password, mobile, captcha } = form;

//   if (!username || !password || !mobile || !captcha) {
//     toast.error("Please fill all fields");
//     return;
//   }

//   if (!/^05\d{8}$/.test(mobile)) {
//     toast.error("Invalid mobile number");
//     return;
//   }

//   if (captcha !== captchaValue) {
//     toast.error("Invalid Captcha");
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const res = await GetLogin({
//       fUser: username,
//       fPassword: md5(password.trim()),
//       customerIp: "string",
//       ipdetails: "string",
//       createdby: username,
//       requestType: "web"
//     });

//     if (res.data?.message === "Login Success") {

//       const userData = res.data.user;


//       sessionStorage.setItem("tempUserRole", userData.companyCode);
//       sessionStorage.setItem("tempMobile", userData.mobile);
//       sessionStorage.setItem("empCode", userData.empCode);
//       sessionStorage.setItem("agentId", userData.agentid);
//       sessionStorage.setItem("branchCode", userData.branchCode);
//       sessionStorage.setItem("userName", userData.userName);
//       sessionStorage.setItem("levelCode", userData.levelCode);

//       toast.success("Login Success! Redirecting to OTP...");

//       setTimeout(() => {
//         navigate("/otp");
//       }, 800);
//     }

//   } catch (error) {
//     toast.error("Invalid Credentials");
//   } finally {
//     setIsLoading(false);
//   }
// };



  return (
    <div className="container-fluid p-0 vh-100 overflow-hidden ltr">
      <div className="row g-0 h-100">
        {/* Left Side Branding */}
        <AuthSidebar />

        {/* Right Side Form */}
        <div className="rtl log-box col-12 col-lg-6 d-flex align-items-center justify-content-center position-relative">
          <div className="position-absolute langy">
            <LanguageSwitcher />
          </div>

          <div className="w-100 log-card">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-secondary-blue me-3 w-4px h-35px"></div>
              <h2 className="mb-0 fw-bold">{t.title}</h2>
            </div>
            <p className="text-muted mb-3 fs-09rem">{t.description}</p>

            <form onSubmit={handleSubmit} className="auth-card pb-4">
              <div className="mb-3">
                <label className="form-label text-orient fw-semibold">
                  {t.username}
                </label>
                <input
                  type="text"
                  name="username"
                  maxLength={50}
                  className="form-control "
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-orient fw-semibold">
                  {t.password}
                </label>
                <input
                  type="password"
                  name="password"
                  maxLength={30}
                  className="form-control "
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-orient fw-semibold">
                  {t.mobile}
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control "
                  maxLength={10}
                  placeholder={t.mobilePlaceholder}
                  value={form.mobile}
                  onChange={handleChange}
                />
                <div className="form-text fs-075rem">{t.mobileHint}</div>
              </div>
              <div className="mb-4 d-flex align-items-end">
                <div className="flex-grow-1 me-3">
                  <label className="form-label text-orient fw-semibold">
                    {t.captcha}
                  </label>
                  <input
                    type="text"
                    name="captcha"
                    className="form-control "
                    maxLength={6}
                    placeholder={t.captchaPlaceholder}
                    value={form.captcha}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-secondary-blue text-white d-flex align-items-center justify-content-center rounded h-48px w-120px fs-125rem ls-4px">
                    {captchaValue}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center h-48px w-48px"
                    onClick={() => {
                      setCaptchaValue(generateCaptcha());
                      setForm({ ...form, captcha: "" }); // Clear input on refresh
                    }}
                    title={
                      lang === "ar" ? "تحديث رمز التحقق" : "Refresh Captcha"
                    }
                  >
                    <i className="fa-solid fa-arrows-rotate"></i>
                  </button>
                </div>
              </div>

              <div className="text-end mt-4">
                <button
                  type="submit"
                  className="btn btn-primary-orient d-inline-flex align-items-center"
                >
                  {t.submit}{" "}
                  <i
                    className={`fa-solid fa-arrow-${lang === "ar" ? "left me-2" : "right ms-2"}`}
                  ></i>
                </button>
              </div>
            </form>

            <div className="footy d-flex justify-content-between align-items-center mt-4 text-muted fs-08rem">
              <div>{t.copyright}</div>
              <a
                href="https://orientinsurance.com.sa/en/contact-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-muted"
              >
                {t.contactUs}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
