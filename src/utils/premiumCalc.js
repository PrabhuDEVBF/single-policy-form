export const calculatePremiums = (row, exchangeRate = 1) => {
  const sumInsured = Math.max(0, Number(row.sumInsured || 0));

  const mrPremium  = (Number(row.marineRate || 0) * sumInsured) / 100;
  const wrPremium  = (Number(row.warRate || 0) * sumInsured) / 100;
  const oarPremium = (Number(row.overAgeRate || 0) * sumInsured) / 100;
  const tsrPremium = (Number(row.transshipRate || 0) * sumInsured) / 100;
  const dedPremium = (Number(row.deductible || 0) * sumInsured) / 100;

  const totalPremium =
    mrPremium + wrPremium + oarPremium + tsrPremium + dedPremium;

  const rate = Math.max(0, Number(exchangeRate || 1));

  return {
    mrPremium,
    wrPremium,
    oarPremium,
    tsrPremium,
    dedPremium,
    totalPremium,
    sumInsuredInSAR: sumInsured * rate,
    premiumInSAR: totalPremium * rate,
  };
};