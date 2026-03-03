import React, { useRef, useEffect, useState } from "react";
import Ship from "../../assets/img/CargoShip.png";
import bgcloud from "../../assets/img/carg.png";
import { useLanguage } from "../../context/LanguageContext";

const ProgressBar = ({ Tabname }) => {
  const { langData } = useLanguage();

  const steps = [
    { key: "BasicInfo", label: langData?.BasicInformation || "Product Information" },
  //  { key: "VoyageDetails", label: langData?.VoyageDetails || "Voyage & Vessel Details" },
  //  { key: "PremiumCalculation", label: langData?.PremiumCalculation || "Premium Calculation" },
    { key: "Quotation", label: langData?.Quotation || "Quotation Summary" },
    { key: "Payment", label: langData?.Payment || "Payment" },
    { key: "PolicySummary", label: langData?.PolicySummary || "Policy Summary" },
  ];

  const activeIndex = Math.max(
    steps.findIndex((step) => step.key === Tabname),
    0
  );

  const stepRefs = useRef([]);
  const containerRef = useRef(null);
  const [shipLeft, setShipLeft] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      if (!stepRefs.current[activeIndex] || !containerRef.current) return;

      const dot = stepRefs.current[activeIndex];
      const container = containerRef.current;

      const dotRect = dot.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const center =
        dotRect.left - containerRect.left + dotRect.width / 2;

      setShipLeft(center);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, [activeIndex]);

  return (
    <div
      className="w-100 position-relative text-white overflow-hidden"
      style={{
        background: `linear-gradient(to right, rgba(10,44,107,0.95), rgba(10,44,107,0.85)), url(${bgcloud})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // minHeight: "130px",
            height: "125px",
        padding: "35px 0 40px",
      }}
    >
      <div className="container w-75" ref={containerRef}>
        <div className="position-relative d-flex align-items-center justify-content-between">

          {/* 🚢 Ship */}
          <img
            src={Ship}
            alt="Ship"
            style={{
              position: "absolute",
              top: "-30px",
              left: shipLeft,
              transform: "translateX(-50%)",
              width: "50px",
              transition: "left 0.4s ease",
              zIndex: 10,
            }}
          />

          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="text-center flex-fill">
                <div
                  ref={(el) => (stepRefs.current[index] = el)}
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    backgroundColor:
                      index <= activeIndex ? "#00cfff" : "white",
                    boxShadow:
                      index === activeIndex
                        ? "0 0 10px #00cfff"
                        : "none",
                    margin: "0 auto",
                    transition: "all 0.3s ease",
                  }}
                />
                <div className="mt-2 small fw-medium">
                  {step.label}
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    background:
                      index < activeIndex
                        ? "#00cfff"
                        : "rgba(255,255,255,0.4)",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;