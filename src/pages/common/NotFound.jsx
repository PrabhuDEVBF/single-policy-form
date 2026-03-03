import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const fullText = "Page Not Found";

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
    return () => clearInterval(typingEffect);
  }, []);

  const handleReturn = () => {
    // Navigate home, which ProtectedRoute will correctly handle (redirect to dashboard or login)
    navigate("/");
  };

  return (
    <div className="not-found-wrapper bg-card-gray">
      <div className="not-found-content">
        <h1 className="not-found-title text-orient-blue">404</h1>
        <h2 className="not-found-subtitle text-teal">
          {typedText}
          <span className="cursor-blink">|</span>
        </h2>
        <p className="not-found-desc text-secondary-blue mt-3">
          Oops! It seems the page you are looking for has drifted off track.
        </p>
        <button
          className="btn-primary-orient not-found-btn"
          onClick={handleReturn}
        >
          Return to Safe Harbor
        </button>
      </div>
    </div>
  );
};

export default NotFound;
