import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../resources/en.json";
import ar from "../resources/ar.json";

// The context holding both lang string and a translation object
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(sessionStorage.getItem("language") || "en");

  // Keep body classes synced on change
  useEffect(() => {
    applyLanguage(lang);
  }, [lang]);

  const applyLanguage = (newLang) => {
    sessionStorage.setItem("language", newLang);
    if (newLang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.body.classList.add("rtl-layout");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.body.classList.remove("rtl-layout");
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
  };

  // Select the correct dictionary
  const t = lang === "ar" ? ar : en;

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLanguage, changeLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
