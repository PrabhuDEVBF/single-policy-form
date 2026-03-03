import React, { useState } from "react";
import ProgressBar from "../../components/common/ProgressBar";
import ProductDetails from "../../components/marine_Quotation/PolicyDetails";
import Loader from "../../components/common/Loader";
import Header from "../../components/layout/Header";
import RiskDetail from "../../components/marine_Quotation/RiskDetails";
import CustomerInfoCard from "../../components/common/CustomerInfoCard";
import VesselVoyageDetail from "../../components/marine_Quotation/VesselVoyageDetails";
import PremiumPopup from "../../components/marine_Quotation/PremiumPopup";
import testData from "../../../src/data/Test.json";
import AdditionalFieldsPopup from "../../components/common/AdditionalFieldsPopup"
import { toast } from "react-toastify";
import QuotationSummary from "../../components/marine_Quotation/QuotationSummary";
import Swal from "sweetalert2";

const Marineinsurence = () => {
  const [isloading] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [rateList, setRateList] = useState([]);
  const [step, setStep] = useState(1);
  const [showAdditional, setShowAdditional] = useState(false);
  const [additionalTab, setAdditionalTab] = useState("");

  //  Convert material code → name here (parent level)
  const { materialCategories } = testData;

  const getMaterialLabel = (code) =>
    materialCategories.find((m) => m.code === code)?.name || code;

  const verifiedRisks = rateList
    .filter((r) => r.isVerified)
    .map((r) => ({
      ...r,
      materialName: getMaterialLabel(r.materialCategory),
    }));

  const [formData, setFormData] = useState({
    product: null,
    issueDate: "",
    inceptionDate: "",
    poiYears: "",
    poiMonths: "",
    expiryDate: "",

    firstName: "",
    middleName: "",
    lastName: "",
    idNumber: "",
    mobileNo: "",
    email: "",

    NatureofRisk: null,
    ScopeofCover: null,
    NatureofRiskDescription: "",
    ScopeofCoverDescription: "",
    TerritorialLimits: "",
    Jurisdiction: "",
    LossHistory: "",
    BusinessActivity: "",
    Remarks: "",
    PayTerms: "",

    PurchaseOrderNumber: "",
    BLAWBillNumber: "",
    BLAWBillDate: null,
    SupplierDescription: "",

    ConveyanceType: "",
    DescConvTyp: "",
    Descvessnm: "",
    ApprVessel: "",
    VesselArrived: "",
    SurveyAgent: "",

    IncoSumIns: "",
    TotalPremium: "",
    BasisofValuation: "",
    InvoiceValue: "",
    Value: "",
    SICURRCODE: "",
    LC: "",
    FC: "",

    ExtimatedAnnualTransit: "",
    LimitPerTransit: "",
    Location: "",

    modeOfTransport: "",
    rateCover: null,
    voyageType: null,
    materialCategory: null,

    marineRate: "",
    warRate: "",
    overAgeRate: "",
    transshipRate: "",
    otherRate: "",
    deductible: "",
    minimumPremium: "",
    Coverpremium: "",
    vat: "",
    MinDeposit: "",
    DepositFee: "",
    BalDeposit: "",
    remarks: "",

    // Vessel & Voyage
    PerilCode: null,
    Bank: null,
    VesselName: "",
    LCNumber: "",
    LCDate: null,
    IMONumber: "",
    BillNumber: "",
    BillDate: null,
    RiskId: "",
    VoyageNumber: "",
    SailingDate: null,
    RiskAddress: "",
    VoyageDescription: "",
    Overage: "",
    DateofShipment: null,
    Transhipment: "",
    TranshipmentAt: "",
    TranshippedDate: null,
    Storage: "",
    StoragePeriod: "",
    StoragePeriodUnit: "",

    ModeofShipment: "",
    FromCountry: null,
    ViaCountry: null,
    ToCountry: null,
    FromLocation: "",
    ToLocation: "",
    FromPort: null,
    ViaPort: null,
    ToPort: null,

    Currency: null,
    ExchangeRate: "",
    IncoTermDesc: null,
    IncoTermRate: "",

    minimumDepositAmount: "",
    depositFee: "",
    balanceDepositAmount: "",

    RiskAdds: [
      {
        riskID: "",
        fmodeoftransport: "",
        fmodeoftransportcode: "",
        fratecover: "",
        fratecoverCode: "",
        fmaterialcatagory: "",
        fmaterialcatagorycode: "",
        voyagecode: "",
        voyageDesc: "",
        fmarinerate: "",
        fwarrate: "",
        foveragearte: "",
        ftranshiprate: "",
        fotherrate: "",
        fminimurate: "",
        fdeductible: "",
        fRemark: "",
        mrgShipmentValueFC: "",
        mrgShipmentValueLC: "",
        mrgTotalMRPremium: 0,
      }
    ],
  });

  const [validationErrors, setValidationErrors] = useState({});


  const validateStepOne = () => {
    const errors = {};

    const fieldLabels = {
      product: "Product",
      issueDate: "Issue Date",
      period: "Period of Insurance",
      periodNumber: "Periods Of Number",
      inceptionDate: "Inception Date",
      // expiryDate: "Expiry Date",
    };

    if (!formData.product) errors.product = true;
    if (!formData.issueDate) errors.issueDate = true;
    if (!formData.period?.value) errors.period = true;
    if (!formData.periodNumber || Number(formData.periodNumber) <= 0)
      errors.periodNumber = true;
    if (!formData.inceptionDate) errors.inceptionDate = true;
    //if (!formData.expiryDate) errors.expiryDate = true;

    setValidationErrors(errors);

    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];

      toast.error(`${fieldLabels[firstErrorField]} is required`);

      setTimeout(() => {
        const element = document.querySelector(
          `[data-field="${firstErrorField}"]`
        );

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          element.classList.add("field-error");

          setTimeout(() => {
            element.classList.remove("field-error");
          }, 400);

          const input =
            element.querySelector("input") ||
            element.querySelector(".ant-select-selector") ||
            element.querySelector(".ant-picker-input input");

          input?.focus();
        }
      }, 150);

      return false;
    }

    return true;
  };
  const handleSubmitQuotation = async () => {

    // Validate Step 1 mandatory fields again
    if (!validateStepOne()) return;

    // You can also validate Step 2 fields here if needed

    // Simulate API save delay
    await Swal.fire({
      title: "Quotation Saved Successfully!",
      text: "Your marine quotation has been saved.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "View Quotation"
    });

    // Redirect to Modern Quotation page
    setStep(4);
  };
  return (
    <>
      <Header />
      {isloading && <Loader />}

      <div className="container-fluid p-0 d-flex flex-column h-100">

        {/* Progress Bar */}
        <div className="flex-shrink-0">
          <ProgressBar
            Tabname={
              step === 1
                ? "BasicInfo"
                : step === 2
                  ? "BasicInfo"
                  : step === 3
                    ? "BasicInfo"
                    : step === 4
                      ? "Quotation"
                      : "BasicInfo"
            }
          />
        </div>

        {/* Main Area */}
        <div className="flex-grow-1 container-fluid mt-n5">
          <div className="row min-h-0">

            {/* LEFT SIDEBAR */}
            <div className="col-lg-3 col-md-4 p-3">
              <div
                className="position-sticky bg-light border rounded-4 shadow-sm p-3"
                style={{
                  top: "20px",
                  marginTop: "21px"
                }}
              >
                <CustomerInfoCard formData={formData} />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-lg-9 col-md-8 d-flex flex-column min-h-0"
              style={{ marginTop: "31px" }}>
              <div className="flex-grow-1 overflow-auto p-3">
                <div className="card shadow-sm rounded-4 p-4">

                  {/* ================= STEP 1 ================= */}
                  {step === 1 && (
                    <>
                      <ProductDetails
                        formData={formData}
                        setFormData={setFormData}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        onAddAdditional={(tab) => {
                          setAdditionalTab(tab);
                          setShowAdditional(true);
                        }}
                      />

                      <RiskDetail
                        formData={formData}
                        setFormData={setFormData}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        rateList={rateList}
                        setRateList={setRateList}
                      />

                      <div className="d-flex justify-content-end mt-4">
                        <button
                          className="btn btn-primary rounded-pill px-4"
                          onClick={() => {
                            if (!validateStepOne()) return;
                            setStep(2);
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}

                  {/* ================= STEP 2 ================= */}
                  {step === 2 && (
                    <>
                      <VesselVoyageDetail
                        formData={formData}
                        setFormData={setFormData}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        onAddAdditional={(tab) => {
                          setAdditionalTab(tab);
                          setShowAdditional(true);
                        }}
                      />

                      <div className="d-flex justify-content-between mt-4">
                        <button
                          className="btn btn-secondary rounded-pill px-4"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </button>

                        <button
                          className="btn btn-warning rounded-pill px-4"
                          onClick={() => setStep(3)}
                        >
                          View Premium Details
                        </button>
                      </div>
                    </>
                  )}

                  {/* ================= STEP 3 ================= */}
                  {step === 3 && (
                    <>
                      <PremiumPopup
                        risks={verifiedRisks}
                        formData={formData}
                        onAddAdditional={(tab) => {
                          setAdditionalTab(tab);
                          setShowAdditional(true);
                        }}
                      />

                      <div className="d-flex justify-content-between mt-4">
                        <button
                          className="btn btn-secondary rounded-pill px-4"
                          onClick={() => setStep(2)}
                        >
                          Back
                        </button>

                        <button
                          className="btn btn-success px-4 rounded-pill"
                          onClick={handleSubmitQuotation}
                        >
                          Submit Quotation
                        </button>
                      </div>
                    </>
                  )}
                  {/* ================= STEP 4 ================= */}
                  {step === 4 && (
                    <QuotationSummary
                      formData={formData}
                      risks={verifiedRisks}
                    />
                  )}

                </div>
              </div>
            </div>

            <AdditionalFieldsPopup
              open={showAdditional}
              onClose={() => setShowAdditional(false)}
              activeTab={additionalTab}
              formData={formData}
              setFormData={setFormData}
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default Marineinsurence;