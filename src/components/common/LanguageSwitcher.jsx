import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import arabicIcon from "../../assets/img/arabic-icon.svg";
import englishIcon from "../../assets/img/english-icon.svg";

const LanguageSwitcher = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-info rounded-circle p-0 d-flex align-items-center justify-content-center shadow w-40px h-40px"
      title={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <img
        src={lang === "en" ? arabicIcon : englishIcon}
        alt={lang === "en" ? "Switch to Arabic" : "Switch to English"}
        className="w-35px h-35px object-contain"
      />
    </button>
  );
};

export default LanguageSwitcher;
