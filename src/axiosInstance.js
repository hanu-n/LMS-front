import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "https://lms-vx2w.onrender.com/api"
 ,
  
});

// Automatically attach token
axiosInstance.interceptors.request.use((config) => {
  // Support both legacy key "token" and the auth key used in this app "sms-token"
  const token = localStorage.getItem("token") || localStorage.getItem("sms-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
  }
  return config;
});

export default axiosInstance;
