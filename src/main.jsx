import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </LanguageProvider>
  </StrictMode>,
);
