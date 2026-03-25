export const buildMarineQuotationPayload = (formData, calculatedRisks) => {
  const formatDate = (date) => {
    if (!date) return null;
    return date;
  };
  const safeString = (v) => (v !== undefined && v !== null && v !== "" ? String(v) : null);
  const safeNumber = (v) => {
    if (!v || v === " ") return 0;
    const num = Number(v);
    return isNaN(num) ? 0 : num;
  };
  const mobile = sessionStorage.getItem("tempMobile");
  const userName = sessionStorage.getItem("userName");
  const agentId = sessionStorage.getItem("agentId");
  const branchCode = sessionStorage.getItem("branchCode");
  const email = sessionStorage.getItem("email");

  const RiskAdds = (calculatedRisks || []).map((item) => ({
    riskID: safeString(item.id),

    fmodeoftransport: safeString(item.modeOfTransportcode),
    fmodeoftransportcode: safeString(item.modeOfTransportcode),

    fratecover: safeString(item.rateCovercode),
    fratecoverCode: safeString(item.rateCovercode),

    fmaterialcatagory: safeString(item.materialCategorycode),
    fmaterialcatagorycode: safeString(item.materialCategorycode),

    voyagecode: safeString(item.voyageTypecode),
    voyageDesc: safeString(item.voyageTypelabel),

    fmarinerate: safeString(item.marineRate || "0"),
    fwarrate: safeString(item.warRate || "0"),
    foveragearte: safeString(item.overAgeRate || "0"),
    ftranshiprate: safeString(item.transshipRate || "0"),
    fotherrate: safeString(item.otherRate || "0"),

    fminimurate: safeString(item.minimumPremium || "0"),
    fdeductible: safeString(item.deductible || "0"),
    fRemark: safeString(item.remarks || "-"),

    mrgShipmentValueFC: safeString(item.sumInsured || "0"),
    mrgShipmentValueLC: safeString(item.sumInsured || "0"),
    mrgTotalMRPremium: safeString(item.premiumFC || "0"),
  }));


  const v = formData;
console.log("form data quote",v)
  return {

    NationalId: safeString(v.idNumber || "7001847453"),
    CompanyName: safeString(v.firstName || "Al-Futtaim International Holding Company"),
    mobileNo: safeString(v.mobileNo || mobile),
    gmail: safeString(v.email || "testemail.com"),

    PolicyId: "",

    TerritorialLimits: safeString(v.TerritorialLimits),
    Jurisdiction: safeString(v.Jurisdiction),
    LossHistory: safeString(v.LossHistory),
    BusinessActivity: safeString(v.BusinessActivity),
    Remarks: safeString(v.Remarks),
    PayTerms: safeString(v.PayTerms),

    NatureOfRisk: safeString(v.NatureofRisk?.label || null),
    ScopeOfCover: safeString(v.ScopeofCover?.value),
    NatureOfRiskDescription: safeString(v.NatureofRiskDescription),
    ScopeOfCoverDescription: safeString(v.ScopeofCoverDescription),

    ProductId: safeNumber(v.product?.value),
    ProductName: safeString(v.product?.label),

    QuotationDate: formatDate(v.inceptionDate),
    InsurancePeriodUnit: safeString(v.poiYears?.label || "-"),
    InsurancePeriodValue: safeNumber(v.poiMonths || "-"),

    InceptionDate: formatDate(v.inceptionDate),
    ExpiryDate: formatDate(v.expiryDate),

    Units: "Percent",
    IndemnityPeriod: safeString(v.poiMonths || "-"),

    ModeOfShipment: safeString(v.ModeofShipment || "-"),

    FromCountry: safeString(v.FromCountry?.label),
    ViaCountry: safeString(v.ViaCountry?.label),
    ToCountry: safeString(v.ToCountry?.label),

    FromPort: safeString(v.FromPort?.label),
    ViaPort: safeString(v.ViaPort?.label),
    ToPort: safeString(v.ToPort?.label),

    FromLocation: safeString(v.FromLocation),
    ToLocation: safeString(v.ToLocation),

    PerilCode: safeString(v.PerilCode?.value),

    LCNumber: safeString(v.LCNumber),
    BillNumber: safeString(v.BLAWBillNumber),
    BL_AW_BillNumber: safeString(v.BLAWBillNumber),

    PurchaseOrderNumber: safeString(v.PurchaseOrderNumber),
    SupplierDescription: safeString(v.SupplierDescription),

    Bank: safeString(v.Bank?.label),

    LCDate: formatDate(v.LCDate),
    BillDate: formatDate(v.BillDate),
    BL_AW_BillDate: formatDate(v.BLAWBillDate),

    VesselName: safeString(v.VesselName),
    MaterialType: safeString(v.materialCategory?.label),

    Currency: safeString(v.Currency),
    ExchangeRate: safeNumber(v.ExchangeRate),

    IncoTermDesc: safeString(v.IncoTermDesc),
    IncoTermRate: safeNumber(v.IncoTermRate),
    IncoSumInsured: safeNumber(v.IncoSumIns),

    basepremium: safeNumber(v.minimumPremium),
    Coverpremium: safeNumber(v.Coverpremium),

    vat: 0,

    TotalPremium: safeNumber(v.TotalPremium),
    MinDeposit: safeNumber(v.minimumDepositAmount),
    DepositFee: safeNumber(v.depositFee),
    BalDeposit: safeNumber(v.balanceDepositAmount),

    PremiumFallDetailss: 0,

    RiskAdds: RiskAdds

  };

};