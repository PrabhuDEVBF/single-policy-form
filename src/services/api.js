import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PROXY_URL,
  withCredentials: true
});

export const GetLogin = async (userData) => {
  const response = await api.post("auth/login", userData);
  return response;
};

// Master Details
export const GetMasterDetails = async () => {
  const response = await api.get("GetMasterDetails");
  return response.data;
};
//get rate details 
export const GetRateDetails = async (userData) => {
  const response = await api.post("GetRateDetails", userData);
  return response;
};
// save uoation
 export const SaveQuotation = async (userData) => {
  const response = await api.post("SaveQuote", userData);
  return response;
};
// MarineExistCustomer
export const GetExistCustomer = async (userData) => {
  const response = await api.post("GetExistCustomer", userData);
  return response.data;
};

// Save Policy
export const SavePolicy = async (userData) => {
  const response = await api.post("SavePolicy", userData);
  return response.data;
};
//getOpenCoverPolicy 
export const GetOpenCoverPolicies = async (userData) => {
  const response = await api.get("GetOpenCoverPolicy");
  return response.data;
};
// BoardReport
export const BoardReport = async (userData) => {
  const response = await api.post("GetBoardReport", userData);
  return response.data;
};

// Wathiq
export const GetWathiq = async (userData) => {
  const response = await api.post("Wathiq", userData);
  return response.data;
};

export default api;