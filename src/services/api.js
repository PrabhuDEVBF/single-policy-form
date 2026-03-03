import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PROXY_URL,
  withCredentials: true
});

export const GetLogin = async (userData) => {
  const response = await api.post("auth/login", userData);
  return response;
};

export default api;