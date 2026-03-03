import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
import "./assets/css/arabic.css";
function App() {
  // Initialize language from session storage or default to en
  useEffect(() => {
    const lang = sessionStorage.getItem("language") || "en";
    sessionStorage.setItem("language", lang);
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      // We will conditionally load arabic.css or use a class in a wrapper
      document.body.classList.add("rtl-layout");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.body.classList.remove("rtl-layout");
    }
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
