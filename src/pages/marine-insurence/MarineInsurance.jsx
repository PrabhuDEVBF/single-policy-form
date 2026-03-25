import React, { useState } from "react";
import ProgressBar from "../../components/common/ProgressBar";
import ProductDetails from "../../components/marine_Quotation/PolicyDetails";
import Loader from "../../components/common/Loader";
import Header from "../../components/layout/Header";
import RiskDetail from "../../components/marine_Quotation/RiskDetails";
import CustomerInfoCard from "../../components/common/CustomerInfoCard";
import VesselVoyageDetail from "../../components/marine_Quotation/VesselVoyageDetails";
import PremiumPopup from "../../components/marine_Quotation/PremiumPopup";
import AdditionalFieldsPopup from "../../components/common/AdditionalFieldsPopup"
import { toast } from "react-toastify";
import QuotationSummary from "../../components/marine_Quotation/QuotationSummary";
import PolicySummary from "../../components/marine_Policy/PolicySummary";
import { SavePolicy } from "../../services/api"
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { buildMarineQuotationPayload } from "../../utils/buildMarineQuotationPayload";
import { SaveQuotation } from "../../services/api"
const Marineinsurence = () => {
  const [isloading] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [rateList, setRateList] = useState([]);
  const [step, setStep] = useState(1);
  const [showAdditional, setShowAdditional] = useState(false);
  const [additionalTab, setAdditionalTab] = useState("");
  const [calculatedRisks, setCalculatedRisks] = useState([]);
  const [policyData, setPolicyData] = useState(null);
  const { type } = useParams();

  const verifiedRisks = rateList
    .filter((r) => r.isVerified)
    .map((r) => ({
      ...r,
      modeOfTransportcode: r.modeOfTransport,
      rateCovercode: r.rateCover,
      materialCategorycode: r.materialCategory,
      voyageTypecode: r.voyageType,
      voyageTypelabel: r.voyageType
    }));

  // SH 
  // const handleRisksUpdate = (updatedRisks) => {
  //   setCalculatedRisks(updatedRisks);
  // };

  const handleRisksUpdate = (updatedRisks) => {
    setCalculatedRisks(updatedRisks);


    setRateList((prev) =>
      prev.filter((r) => updatedRisks.some((u) => u.id === r.id))
    );
  };

  // // //// //
  const [quotationData, setQuotationData] = useState(null);
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
    IncoTermDesc: "",
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
  // const handleSubmitQuotation = async () => {

  //   // Validate Step 1 mandatory fields again
  //   if (!validateStepOne()) return;

  //   // You can also validate Step 2 fields here if needed

  //   // Simulate API save delay
  //   await Swal.fire({
  //     title: "Quotation Saved Successfully!",
  //     text: "Your marine quotation has been saved.",
  //     icon: "success",
  //     confirmButtonColor: "#3085d6",
  //     confirmButtonText: "View Quotation"
  //   });

  //   // Redirect to Modern Quotation page
  //   setStep(4);
  // };
  const handleSubmitQuotation = async () => {

    if (!validateStepOne()) return;

    try {

      const payload = buildMarineQuotationPayload(formData, calculatedRisks);


      const res = await SaveQuotation(payload);
      const result = res?.data?.result;
      setQuotationData(result);

      await Swal.fire({
        title: "Success!",
        text: "Quotation submitted successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      setStep(4);

    } catch (err) {

      Swal.fire({
        title: "Quotation Failed!",
        text: err.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#d33",
      });

    }

  };
const handleIssuePolicy = async () => {
  try {
    const payload = {
      quotationNo: quotationData?.policyId
    };

    const res = await SavePolicy(payload);
console.log("policy response",res)
    const result = res?.data?.result || res?.data;

    setPolicyData(result[0]);

    //  Success alert
    await Swal.fire({
      icon: "success",
      title: "Policy Issued Successfully",
      text: `Policy No: ${result[0]?.policyNo}`,
      confirmButtonColor: "#3085d6"
    });

    setStep(5);

  } catch (err) {

    //  Error alert
    Swal.fire({
      icon: "error",
      title: "Policy Generation Failed",
      text: "Something went wrong. Please try again.",
      confirmButtonColor: "#d33"
    });

    console.error(err);
  }
};

  // const handleIssuePolicy = async () => {

  //   try {
  //     const payload = {
  //       quotationNo: quotationData?.policyId
  //     };

  //     const res = await SavePolicy(payload);

  //     const result = res?.data?.result || res?.data;

  //     setPolicyData(result[0]);

  //     setStep(5);

  //   } catch (err) {
  //     toast.error("Policy generation failed");
  //     console.error(err);
  //   }
  // };
  return (
    <>
      <Header />
      {isloading && <Loader />}

      <div className="container-fluid p-0 d-flex flex-column h-100">

        {/* Progress Bar */}
        <div className="flex-shrink-0">
          <ProgressBar
            // Tabname={
            //   step === 1
            //     ? "BasicInfo"
            //     : step === 2
            //       ? "BasicInfo"
            //       : step === 3
            //         ? "BasicInfo"
            //         : step === 4
            //           ? "Quotation"
            //           : "BasicInfo"
            // }
            Tabname={
              step === 1
                ? "BasicInfo"
                : step === 2
                  ? "BasicInfo"
                  : step === 4
                    ? "Quotation"
                    : step === 5
                      ? "PolicySummary"
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
                        type={type}
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
                  {/* STEP 2 */}
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

                        <div className="d-flex gap-2">

                          {/* SAVE QUOTATION BUTTON */}
                          <button
                            className="btn btn-success rounded-pill"
                            onClick={() => {

                              if (!calculatedRisks.length) {
                                toast.error("Please calculate premium before saving quotation");
                                return;
                              }

                              // Ensure every verified risk is calculated
                              const notCalculated = verifiedRisks.filter(vr => {
                                const found = calculatedRisks.find(cr => cr.id === vr.id);
                                return !found || !found.isCalculated;
                              });

                              if (notCalculated.length > 0) {
                                toast.error("Please calculate premium for all risks before saving quotation");
                                return;
                              }

                              handleSubmitQuotation();

                            }}
                          >
                            Save Quotation
                          </button>

                          {/* VIEW PREMIUM BUTTON */}
                          <button
                            className="btn btn-warning rounded-pill px-4"
                            onClick={() => {

                              const verified = rateList.filter((r) => r.isVerified);

                              if (verified.length === 0) {
                                toast.error("Please verify at least one risk before viewing premium");
                                return;
                              }

                              setShowPremium(true);

                            }}
                          >
                            View Premium Details
                          </button>

                        </div>

                      </div>
                    </>
                  )}

                  {/* ================= STEP 4 ================= */}
                  {step === 4 && (
                    <QuotationSummary
                      quotationData={quotationData}
                      formData={formData}
                      risks={verifiedRisks}
                      onIssuePolicy={handleIssuePolicy}
                    />
                  )}

                  {/* ================= STEP 5 ================= */}
                  {step === 5 && (
                    <PolicySummary
                      quotationData={quotationData}
                      policyData={policyData}
                      formData={formData}
                      risks={verifiedRisks}
                    />
                  )}

                </div>
              </div>
            </div>
            <PremiumPopup
              formData={formData}
              setFormData={setFormData}
              show={showPremium}
              onClose={() => setShowPremium(false)}
              risks={verifiedRisks}
              existingRisks={calculatedRisks}
              onRisksUpdate={handleRisksUpdate}
              onAddAdditional={(tab) => {
                setAdditionalTab(tab);
                setShowAdditional(true);
              }}
            />

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
    </>
  );
};

export default Marineinsurence;